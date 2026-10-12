"use client";

import { useEffect, useState } from "react";
import { PRICE_BEFORE, PRICE_REGULAR, PRICE_SALE, SALE_END_MS, SALE_START_MS } from "../edit-bestie/sale";

// Sale window and prices live in app/edit-bestie/sale.ts.

/**
 * Price label that cannot go stale. The page is statically rendered, so the
 * server never decides: nothing price-specific renders until the browser
 * checks the clock, then it shows the price before, during or after the sale.
 */
export default function EditBestiePrice({
  before = PRICE_BEFORE,
  sale = PRICE_SALE,
  after = PRICE_REGULAR,
  pending = null,
}: {
  before?: React.ReactNode;
  sale?: React.ReactNode;
  after?: React.ReactNode;
  pending?: React.ReactNode;
}) {
  const [phase, setPhase] = useState<"before" | "sale" | "after" | null>(null);

  useEffect(() => {
    const check = () => {
      const now = Date.now();
      setPhase(now < SALE_START_MS ? "before" : now < SALE_END_MS ? "sale" : "after");
    };
    check();
    // flip live if someone has the page open when the sale starts or ends
    const timers = [SALE_START_MS, SALE_END_MS]
      .map((at) => at - Date.now())
      .filter((left) => left > 0 && left < 2 ** 31 - 1)
      .map((left) => setTimeout(check, left + 500));
    return () => timers.forEach(clearTimeout);
  }, []);

  if (phase === null) return <>{pending}</>;
  return <>{phase === "before" ? before : phase === "sale" ? sale : after}</>;
}
