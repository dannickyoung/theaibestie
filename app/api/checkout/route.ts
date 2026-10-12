import { Checkout } from "@polar-sh/nextjs";
import { Polar } from "@polar-sh/sdk";
import { NextRequest, NextResponse } from "next/server";
import { priceCentsAt } from "../../edit-bestie/sale";

// Redirects the visitor to a Polar-hosted checkout page.
//
//   /api/checkout                      → sells the Starter Kit
//   /api/checkout?kit=assistant        → sells the Assistant Kit
//   /api/checkout?kit=edit             → sells Edit Bestie at the price set in app/edit-bestie/sale.ts
//   /api/checkout?products=<id>        → sells any other Polar product
//
// Any utm_* tags on the URL (added by components/ReelTracking from the reel link the buyer
// arrived on) are saved on the Polar order as metadata, so each sale shows which reel sold it.
//
// Polar handles payment, receipt, and file delivery (purchase benefits),
// then sends the buyer back to /thanks.
const KITS: Record<string, { env: string; id: string | undefined }> = {
  starter: { env: "POLAR_STARTER_PACK_PRODUCT_ID", id: process.env.POLAR_STARTER_PACK_PRODUCT_ID },
  assistant: { env: "POLAR_ASSISTANT_PACK_PRODUCT_ID", id: process.env.POLAR_ASSISTANT_PACK_PRODUCT_ID },
  edit: { env: "POLAR_EDIT_BESTIE_PRODUCT_ID", id: process.env.POLAR_EDIT_BESTIE_PRODUCT_ID },
};

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];

function utmTags(url: URL): Record<string, string> {
  const tags: Record<string, string> = {};
  for (const k of UTM_KEYS) {
    const v = url.searchParams.get(k);
    if (v) tags[k] = v.slice(0, 100);
    url.searchParams.delete(k);
  }
  return tags;
}

const server = process.env.POLAR_SERVER === "sandbox" ? "sandbox" : "production";

// Edit Bestie's thank-you page (?kit=edit) plays the setup video.
function successUrl(url: URL) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || url.origin;
  const success = new URL("/thanks", siteUrl);
  success.searchParams.set("kit", "edit");
  success.searchParams.set("checkoutId", "{CHECKOUT_ID}");
  return decodeURI(success.toString());
}

// The price always comes from sale.ts as a checkout price override (the Polar product's own
// price is not used): USD 69.99 before the Bestie flash sale, 39.99 during it, 59.99 after it.
async function editCheckout(url: URL, productId: string, metadata: Record<string, string>) {
  const priceAmount = priceCentsAt(Date.now());
  const polar = new Polar({ accessToken: process.env.POLAR_ACCESS_TOKEN, server });
  try {
    const result = await polar.checkouts.create({
      products: [productId],
      successUrl: successUrl(url),
      metadata,
      prices: { [productId]: [{ amountType: "fixed", priceAmount, priceCurrency: "usd" }] },
    });
    const redirect = new URL(result.url);
    redirect.searchParams.set("theme", "light");
    return NextResponse.redirect(redirect.toString());
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Checkout is unavailable, please try again." }, { status: 502 });
  }
}

export const GET = (req: NextRequest) => {
  const url = new URL(req.url);
  const tags = utmTags(url);
  console.log(`Checkout: ${url.searchParams.get("kit") ?? url.searchParams.get("products") ?? "starter"} ${JSON.stringify(tags)}`);

  if (!url.searchParams.has("products")) {
    const kitName = url.searchParams.get("kit") ?? "starter";
    const kit = KITS[kitName] ?? KITS.starter;
    if (!kit.id) {
      return NextResponse.json(
        { error: `Checkout is not configured: set ${kit.env}.` },
        { status: 500 },
      );
    }
    if (kitName === "edit") return editCheckout(url, kit.id, tags);
    url.searchParams.delete("kit");
    url.searchParams.set("products", kit.id);
  }

  if (Object.keys(tags).length) url.searchParams.set("metadata", JSON.stringify(tags));

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || url.origin;
  const checkout = Checkout({
    accessToken: process.env.POLAR_ACCESS_TOKEN,
    successUrl: new URL("/thanks", siteUrl).toString(),
    server,
    theme: "light",
  });

  return checkout(new NextRequest(url, req));
};
