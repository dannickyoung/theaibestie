import { Webhooks } from "@polar-sh/nextjs";

// Receives signed event notifications from Polar (register the URL
// https://<site>/api/webhook/polar in Polar → Settings → Webhooks, with
// the same secret as POLAR_WEBHOOK_SECRET).
//
// Delivery of the kits is handled by Polar itself, so for now this
// only acknowledges events and logs sales; add real handlers here if the
// site ever gates content on purchases.
export const POST = Webhooks({
  webhookSecret: process.env.POLAR_WEBHOOK_SECRET!,
  onOrderPaid: async (payload) => {
    console.log(
      `Polar order paid: ${payload.data.id} (${payload.data.product?.name ?? "unknown product"})`,
    );
  },
});
