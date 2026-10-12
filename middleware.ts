import { NextRequest, NextResponse } from "next/server";
import { SALE_START_MS, isOnSale } from "./app/edit-bestie/sale";

// Wendy's ready-made How it works page is static HTML in public/edit-bestie/how-it-works/, in three copies
// that differ only in the 3 prices: index.html (USD 69.99, before the sale), sale.html (USD 39.99, her
// original) and after.html (USD 59.99). Serve whichever matches app/edit-bestie/sale.ts, so it flips on its own.
export function middleware(req: NextRequest) {
  const now = Date.now();
  const file = isOnSale(now) ? "sale.html" : now < SALE_START_MS ? "index.html" : "after.html";
  return NextResponse.rewrite(new URL(`/edit-bestie/how-it-works/${file}`, req.url));
}

export const config = { matcher: "/edit-bestie/how-it-works" };
