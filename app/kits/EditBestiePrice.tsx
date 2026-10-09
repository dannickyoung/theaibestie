"use client";

import { useEffect, useState } from "react";
import { PRICE_REGULAR, PRICE_SALE, SALE_END_MS, SALE_START_MS, isOnSale } from "../edit-bestie/sale";

// Deadline and prices live in app/edit-bestie/sale.ts.
const EDIT_BESTIE_SALE_ENDS = SALE_END_MS;
const EDIT_BESTIE_SALE_PRICE = PRICE_SALE;
const EDIT_BESTIE_REGULAR_PRICE = PRICE_REGULAR;

/**
 * Price label that cannot go stale. The page is statically rendered, so the
 * server never decides: nothing price-specific renders until the browser
 * checks the clock, then it shows the sale or the regular price.
 */
export default function EditBestiePrice({
  sale = EDIT_BESTIE_SALE_PRICE,
  regular = EDIT_BESTIE_REGULAR_PRICE,
  pending = null,
}: {
  sale?: React.ReactNode;
  regular?: React.ReactNode;
  pending?: React.ReactNode;
}) {
  const [onSale, setOnSale] = useState<boolean | null>(null);

  useEffect(() => {
    const check = () => setOnSale(isOnSale(Date.now()));
    check();
    // flip live if someone has the page open when the sale starts or ends
    const timers = [SALE_START_MS, EDIT_BESTIE_SALE_ENDS]
      .map((at) => at - Date.now())
      .filter((left) => left > 0 && left < 2 ** 31 - 1)
      .map((left) => setTimeout(check, left + 500));
    return () => timers.forEach(clearTimeout);
  }, []);

  if (onSale === null) return <>{pending}</>;
  return <>{onSale ? sale : regular}</>;
}
