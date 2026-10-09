"use client";

import { useEffect, useState } from "react";
import { CHECKOUT_HREF, PRICE_REGULAR, PRICE_SALE, SALE_END_MS, isOnSale } from "./sale";

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
  return { now, onSale: now === null ? ssrOnSale : isOnSale(now) };
}

const pad = (n: number) => String(n).padStart(2, "0");

/** Timecode-style countdown, HH:MM:SS (hours can exceed 24). */
function timecode(msLeft: number) {
  const s = Math.max(0, Math.floor(msLeft / 1000));
  return `${pad(Math.floor(s / 3600))}:${pad(Math.floor((s % 3600) / 60))}:${pad(s % 60)}`;
}

/** Hero price block: strikethrough + sale price during the sale, regular price only after. */
export function PriceTag({ ssrOnSale }: { ssrOnSale: boolean }) {
  const { onSale } = useOnSale(ssrOnSale);

  if (!onSale) {
    return (
      <div className="eb-price">
        <div className="eb-price-row">
          <span className="eb-price-now">{PRICE_REGULAR}</span>
          <span className="eb-price-note">one time, yours forever</span>
        </div>
      </div>
    );
  }

  return (
    <div className="eb-price">
      <span className="eb-sale-stamp">Flash sale · save $20</span>
      <div className="eb-price-row">
        <s className="eb-price-was">
          <span className="eb-sr">Regular price </span>
          {PRICE_REGULAR}
        </s>
        <span className="eb-price-now">
          <span className="eb-sr">Sale price </span>
          {PRICE_SALE}
        </span>
        <span className="eb-price-note">one time, yours forever</span>
      </div>
    </div>
  );
}

/** The price currently charged, as inline text. */
export function PriceText({ ssrOnSale }: { ssrOnSale: boolean }) {
  const { onSale } = useOnSale(ssrOnSale);
  return <>{onSale ? PRICE_SALE : PRICE_REGULAR}</>;
}

/** "Get Edit Bestie, $49.99" button that flips to the regular price after the deadline. */
export function BuyButton({
  ssrOnSale,
  className = "",
  children,
}: {
  ssrOnSale: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  const { onSale } = useOnSale(ssrOnSale);
  return (
    <a className={`btn eb-buy ${className}`} href={CHECKOUT_HREF}>
      Get Edit Bestie, {onSale ? PRICE_SALE : PRICE_REGULAR}
      {children}
    </a>
  );
}

/** Straight countdown strip (full width under the hero, or inline in the closing section). Renders nothing once the sale is over. */
export function SaleStrip({ ssrOnSale, inline = false }: { ssrOnSale: boolean; inline?: boolean }) {
  const { now, onSale } = useOnSale(ssrOnSale);
  if (!onSale) return null;
  return (
    <div className={inline ? "eb-strip-bar eb-strip-inline" : "eb-strip-bar"} role="timer" aria-live="off" aria-label="Flash sale countdown">
      <span className="eb-timer-label">
        <span className="eb-rec" aria-hidden="true" /> 48-hour flash sale ends&nbsp;in
      </span>
      <span className="eb-timer-tc">{now === null ? "--:--:--" : timecode(SALE_END_MS - now)}</span>
    </div>
  );
}
