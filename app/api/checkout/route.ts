import { Checkout } from "@polar-sh/nextjs";
import { NextRequest, NextResponse } from "next/server";

// Redirects the visitor to a Polar-hosted checkout page.
//
//   /api/checkout                      → sells the Starter Pack
//   /api/checkout?products=<id>        → sells any other Polar product
//
// Polar handles payment, receipt, and file delivery (purchase benefits),
// then sends the buyer back to /thanks.
export const GET = (req: NextRequest) => {
  const url = new URL(req.url);

  if (!url.searchParams.has("products")) {
    const starterPack = process.env.POLAR_STARTER_PACK_PRODUCT_ID;
    if (!starterPack) {
      return NextResponse.json(
        { error: "Checkout is not configured: set POLAR_STARTER_PACK_PRODUCT_ID." },
        { status: 500 },
      );
    }
    url.searchParams.set("products", starterPack);
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || url.origin;
  const checkout = Checkout({
    accessToken: process.env.POLAR_ACCESS_TOKEN,
    successUrl: new URL("/thanks", siteUrl).toString(),
    server: process.env.POLAR_SERVER === "sandbox" ? "sandbox" : "production",
    theme: "light",
  });

  return checkout(new NextRequest(url, req));
};
