import { Webhooks } from "@polar-sh/nextjs";
import nodemailer from "nodemailer";

// Receives signed event notifications from Polar (register the URL
// https://<site>/api/webhook/polar in Polar → Settings → Webhooks, with
// the same secret as POLAR_WEBHOOK_SECRET).
//
// Polar handles payment, receipt, and file delivery. On top of that, when an
// order is paid we send our own personal thank-you email from GMAIL_USER
// (a Gmail App Password in GMAIL_APP_PASSWORD). If those env vars are not
// set, the webhook still acknowledges events and just logs the sale.

type Note = { subject: string; line: string };

function noteFor(productId: string | undefined, productName: string): Note {
  if (
    productId === process.env.POLAR_ASSISTANT_PACK_PRODUCT_ID ||
    /assistant/i.test(productName)
  ) {
    return {
      subject: "your assistant is waiting to meet you 💛",
      line: "By tonight, your assistant could be texting YOU first. Take one afternoon, open the guide, and follow the pictures step by step. The naming part is the best part.",
    };
  }
  return {
    subject: "your Starter Pack is here 💛",
    line: "One afternoon from now you'll have your brand, your voice, and your first 7 posts, written to sound like you. Open the guide and just follow the pictures.",
  };
}

async function sendThankYou(order: {
  customerEmail?: string | null;
  customerName?: string | null;
  productId?: string;
  productName: string;
}) {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) {
    console.log("Thank-you email skipped: GMAIL_USER / GMAIL_APP_PASSWORD not set.");
    return;
  }
  if (!order.customerEmail) {
    console.log("Thank-you email skipped: order has no customer email.");
    return;
  }

  const firstName = (order.customerName ?? "").trim().split(/\s+/)[0] || "bestie";
  const note = noteFor(order.productId, order.productName);

  const text = [
    `Hi ${firstName},`,
    "",
    "Wendy and Dannick here, the two humans behind The AI Bestie. Not a bot, promise. We saw your order come in and wanted to say thank you properly.",
    "",
    note.line,
    "",
    "One thing we mean very seriously: if you get stuck at ANY point, DM the word STUCK to @the.ai.bestie on Instagram and we will personally walk you through it until it works. That's not a support policy, it's a promise.",
    "",
    "Your download is in the receipt email from Polar (check spam if it's hiding).",
    "",
    "Go build the thing,",
    "Wendy & Dannick",
    "The AI Bestie · instagram.com/the.ai.bestie",
  ].join("\n");

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: `"Wendy & Dannick · The AI Bestie" <${user}>`,
    to: order.customerEmail,
    replyTo: user,
    subject: note.subject,
    text,
  });
  console.log(`Thank-you email sent to ${order.customerEmail} (${order.productName}).`);
}

export const POST = Webhooks({
  webhookSecret: process.env.POLAR_WEBHOOK_SECRET!,
  onOrderPaid: async (payload) => {
    const productName = payload.data.product?.name ?? "unknown product";
    console.log(`Polar order paid: ${payload.data.id} (${productName})`);
    try {
      await sendThankYou({
        customerEmail: payload.data.customer?.email,
        customerName: payload.data.customer?.name,
        productId: payload.data.product?.id,
        productName,
      });
    } catch (e) {
      // Never fail the webhook over the courtesy email.
      console.error("Thank-you email failed:", e);
    }
  },
});
