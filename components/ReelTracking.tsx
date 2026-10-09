"use client";

import { useEffect } from "react";
import { Analytics, type BeforeSendEvent } from "@vercel/analytics/next";

// Which reel sold? ManyChat sends a different link per reel (?utm_content=reelB, reelC...).
// 1. The page they land on remembers the utm_* tags for 30 days (the latest tagged link wins).
// 2. Any buy link (/api/checkout...) gets those tags added when clicked, and the checkout
//    route saves them on the Polar order as metadata.
// 3. Vercel Analytics only shows UTM tags on a paid plan, so a landing view with utm_content
//    is recorded as e.g. /edit-bestie/from-reelB, which shows up in the free Pages panel.

const KEY = "aib_utm";
const MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000;
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];

function readTags(search: string): Record<string, string> {
  const params = new URLSearchParams(search);
  const tags: Record<string, string> = {};
  for (const k of UTM_KEYS) {
    const v = params.get(k);
    if (v) tags[k] = v.slice(0, 100);
  }
  return tags;
}

function beforeSend(event: BeforeSendEvent): BeforeSendEvent {
  try {
    const url = new URL(event.url);
    const content = url.searchParams.get("utm_content");
    if (!content) return event;
    const path = url.pathname.replace(/\/$/, "");
    const tag = content.replace(/[^\w-]/g, "").slice(0, 40);
    return { ...event, url: `${url.origin}${path}/from-${tag}${url.search}` };
  } catch {
    return event;
  }
}

export default function ReelTracking() {
  useEffect(() => {
    const tags = readTags(window.location.search);
    if (Object.keys(tags).length) {
      try {
        localStorage.setItem(KEY, JSON.stringify({ ...tags, t: Date.now() }));
      } catch {}
    }

    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a[href^="/api/checkout"]') as HTMLAnchorElement | null;
      if (!a) return;
      let stored: Record<string, unknown> = {};
      try {
        stored = JSON.parse(localStorage.getItem(KEY) || "{}");
      } catch {}
      if (typeof stored.t !== "number" || Date.now() - stored.t > MAX_AGE_MS) return;
      const url = new URL(a.href, window.location.origin);
      for (const k of UTM_KEYS) {
        const v = stored[k];
        if (typeof v === "string" && !url.searchParams.has(k)) url.searchParams.set(k, v);
      }
      a.href = url.pathname + url.search;
    };
    document.addEventListener("click", onClick, true);
    document.addEventListener("auxclick", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("auxclick", onClick, true);
    };
  }, []);

  return <Analytics beforeSend={beforeSend} />;
}
