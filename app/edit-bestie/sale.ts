/**
 * Edit Bestie pricing. Change the sale window and prices here and nowhere else
 * (the page, the homepage note, the /kits card and checkout all read it).
 * Outside the window the regular price shows (no countdown, no strikethrough).
 * Until the sale: USD 69.99. Bestie flash sale: Wed 21 Oct 12:00am SGT to Tue 27 Oct 11:59:59pm SGT,
 * USD 39.99. From 28 Oct: USD 59.99 (also the struck-through price during the sale).
 */
export const SALE_STARTS_AT = "2026-10-20T16:00:00Z";
export const SALE_ENDS_AT = "2026-10-27T15:59:59Z";
export const SALE_START_MS = Date.parse(SALE_STARTS_AT);
export const SALE_END_MS = Date.parse(SALE_ENDS_AT);
export const PRICE_BEFORE = "$69.99";
export const PRICE_REGULAR = "$59.99";
export const PRICE_SALE = "$39.99";
export const PRICE_BEFORE_CENTS = 6999;
export const PRICE_REGULAR_CENTS = 5999;
export const PRICE_SALE_CENTS = 3999;
export const CHECKOUT_HREF = "/api/checkout?kit=edit";
export const SETUP_HELP = "Setup help included. Stuck? DM STUCK and we'll get you running.";

export function isOnSale(nowMs: number): boolean {
  return nowMs >= SALE_START_MS && nowMs < SALE_END_MS;
}

/** The full price outside the sale: USD 69.99 before it, USD 59.99 after it. */
export function regularPriceAt(nowMs: number): string {
  return nowMs < SALE_START_MS ? PRICE_BEFORE : PRICE_REGULAR;
}

/** What checkout charges right now, in cents. */
export function priceCentsAt(nowMs: number): number {
  if (isOnSale(nowMs)) return PRICE_SALE_CENTS;
  return nowMs < SALE_START_MS ? PRICE_BEFORE_CENTS : PRICE_REGULAR_CENTS;
}
