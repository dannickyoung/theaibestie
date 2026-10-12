"use client";

import { useEffect, useState } from "react";
import { CHECKOUT_HREF, SETUP_HELP, PRICE_REGULAR, PRICE_SALE, SALE_END_MS, isOnSale, regularPriceAt } from "./sale";

/**
 * Current time, ticking once a second while the sale is live.
 * Returns null on the server render and the first client render, so the
 * markup always hydrates from the server's `ssrOnSale` decision (no mismatch).
 */
function useNow(): number | null {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    let id: ReturnType<typeof setInterval> | undefined;
    const tick = () => {
      const t = Date.now();
      setNow(t);
      if (t >= SALE_END_MS && id) clearInterval(id);
    };
    tick();
    if (Date.now() < SALE_END_MS) id = setInterval(tick, 1000);
    return () => {
      if (id) clearInterval(id);
    };
  }, []);
  return now;
}

function useOnSale(ssrOnSale: boolean) {
  const now = useNow();
  // Full price outside the sale: 69.99 before it, 59.99 after it.
  const regular = regularPriceAt(now ?? Date.now());
  return { now, regular, onSale: now === null ? ssrOnSale : isOnSale(now) };
}

const pad = (n: number) => String(n).padStart(2, "0");

/** Timecode-style countdown: "6d 23:59:59", or HH:MM:SS on the last day. */
function timecode(msLeft: number) {
  const s = Math.max(0, Math.floor(msLeft / 1000));
  const d = Math.floor(s / 86400);
  const hms = `${pad(Math.floor((s % 86400) / 3600))}:${pad(Math.floor((s % 3600) / 60))}:${pad(s % 60)}`;
  return d > 0 ? `${d}d ${hms}` : hms;
}

/** Hero price block: strikethrough + sale price during the sale, regular price only after. */
export function PriceTag({ ssrOnSale }: { ssrOnSale: boolean }) {
  const { onSale, regular } = useOnSale(ssrOnSale);

  if (!onSale) {
    return (
      <div className="eb-price">
        <div className="eb-price-row">
          <span className="eb-price-now">{regular}</span>
          <span className="eb-price-note">one time, yours forever</span>
        </div>
        <p className="eb-setup-help">{SETUP_HELP}</p>
      </div>
    );
  }

  return (
    <div className="eb-price">
      <span className="eb-sale-stamp">Bestie flash sale · save $20</span>
      <div className="eb-price-row">
        <s className="eb-price-was">
          <span className="eb-sr">Regular price </span>
          {PRICE_REGULAR}
        </s>
        <span className="eb-price-now">
          <span className="eb-sr">Bestie price </span>
          {PRICE_SALE}
        </span>
        <span className="eb-price-note">one time, yours forever</span>
      </div>
      <p className="eb-setup-help">{SETUP_HELP}</p>
    </div>
  );
}

/** The price currently charged, as inline text. */
export function PriceText({ ssrOnSale }: { ssrOnSale: boolean }) {
  const { onSale, regular } = useOnSale(ssrOnSale);
  return <>{onSale ? PRICE_SALE : regular}</>;
}

/** The main buy button, "Edit my reels for me", everywhere on the page. */
export function BuyButton({
  className = "",
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <a className={`btn eb-buy ${className}`} href={CHECKOUT_HREF}>
      Edit my reels for me
      {children}
    </a>
  );
}

/** Straight countdown strip (full width under the hero, or inline in the closing section). Renders nothing once the sale is over. */
export function SaleStrip({ ssrOnSale, inline = false }: { ssrOnSale: boolean; inline?: boolean }) {
  const { now, onSale } = useOnSale(ssrOnSale);
  if (!onSale) return null;
  return (
    <div className={inline ? "eb-strip-bar eb-strip-inline" : "eb-strip-bar"} role="timer" aria-live="off" aria-label="Bestie flash sale countdown">
      <span className="eb-timer-label">
        <span className="eb-rec" aria-hidden="true" /> Bestie flash sale ends&nbsp;in
      </span>
      <span className="eb-timer-tc">{now === null ? "--:--:--" : timecode(SALE_END_MS - now)}</span>
    </div>
  );
}
