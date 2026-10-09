/**
 * Edit Bestie pricing. Change the flash-sale window here and nowhere else
 * (the page, the homepage note, the /kits card and checkout all read it).
 * Outside the window the regular price shows (no countdown, no strikethrough).
 * 48 hours: Fri 9 Oct 7:45pm SGT to Sun 11 Oct 7:45pm SGT.
 */
export const SALE_STARTS_AT = "2026-10-09T11:45:00Z";
export const SALE_ENDS_AT = "2026-10-11T11:45:00Z";

export const SALE_START_MS = Date.parse(SALE_STARTS_AT);
export const SALE_END_MS = Date.parse(SALE_ENDS_AT);
export const PRICE_REGULAR = "$69.99";
export const PRICE_SALE = "$49.99";
export const CHECKOUT_HREF = "/api/checkout?kit=edit";

export function isOnSale(nowMs: number): boolean {
  return nowMs >= SALE_START_MS && nowMs < SALE_END_MS;
}
