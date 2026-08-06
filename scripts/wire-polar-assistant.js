/**
 * One-shot wiring of the AI Assistant Pack product on Polar.
 *
 * Reads .env.local for POLAR_ACCESS_TOKEN / POLAR_SERVER, then:
 *   1. creates the product (or reuses POLAR_ASSISTANT_PACK_PRODUCT_ID / a name match)
 *   2. checks its price is $9.90 one-time
 *   3. uploads the delivery zip as a downloadable file
 *   4. creates/updates a "downloadables" benefit with that file
 *   5. attaches the benefit to the product
 *   6. writes POLAR_ASSISTANT_PACK_PRODUCT_ID back to .env.local
 *   7. creates a test checkout session and prints its URL
 *
 * Usage: node scripts/wire-polar-assistant.js "/path/to/theaibestie AI Assistant Pack.zip"
 */
const fs = require("fs");
const path = require("path");
const { Polar } = require("@polar-sh/sdk");

const ROOT = path.join(__dirname, "..");
const ENV_PATH = path.join(ROOT, ".env.local");

const PRODUCT_NAME =
  "theaibestie AI Assistant Pack - Guide + Assistant-Builder Skill";
// Polar renders markdown on the checkout page.
const PRODUCT_DESCRIPTION = [
  "**Build your own AI assistant** that lives in Telegram. You name it, pick its personality, and Claude builds it for you: it remembers everything you tell it, files your receipts, and sends a morning affirmation written from YOUR wildest dreams.",
  "**Inside the pack:** the illustrated step-by-step guide (PDF) + the assistant-builder Claude skill (ZIP). 7 steps, a picture for every click, plus 5 copy-paste power prompts to health-check and fix your assistant.",
  "**You will also need:** a Mac (written and tested on Mac only), Claude Pro or higher (about US$20/month) and a Claude API key (pay as you go, usually a few dollars a month). Both paid to Claude, not to us.",
].join("\n\n");
// Polar caps benefit descriptions at 42 characters
const BENEFIT_DESC = "Assistant Pack: guide + Claude skill";
const FILE_NAME = "theaibestie AI Assistant Pack.zip";

function loadEnv() {
  const env = {};
  for (const line of fs.readFileSync(ENV_PATH, "utf8").split("\n")) {
    const m = line.match(/^([A-Z_]+)=(.*)$/);
    if (m) env[m[1]] = m[2].trim();
  }
  return env;
}

async function main() {
  const zipPath = process.argv[2];
  if (!zipPath || !fs.existsSync(zipPath)) {
    throw new Error(`Zip not found: ${zipPath}`);
  }
  const env = loadEnv();
  if (!env.POLAR_ACCESS_TOKEN) {
    throw new Error("POLAR_ACCESS_TOKEN missing in .env.local");
  }
  const server = env.POLAR_SERVER === "sandbox" ? "sandbox" : "production";
  const polar = new Polar({ accessToken: env.POLAR_ACCESS_TOKEN, server });
  console.log(`Polar server: ${server}`);

  // 1. Find or create the product
  let product;
  if (env.POLAR_ASSISTANT_PACK_PRODUCT_ID) {
    product = await polar.products.get({ id: env.POLAR_ASSISTANT_PACK_PRODUCT_ID });
    console.log(`Reusing product from .env.local: ${product.name}`);
  } else {
    const page = await polar.products.list({ isArchived: false, limit: 100 });
    const existing = page.result.items.find((p) => p.name === PRODUCT_NAME);
    if (existing) {
      product = existing;
      console.log(`Found existing product by name.`);
    } else {
      product = await polar.products.create({
        name: PRODUCT_NAME,
        description: PRODUCT_DESCRIPTION,
        recurringInterval: null,
        prices: [{ amountType: "fixed", priceAmount: 990 }],
      });
      console.log(`Product created.`);
    }
  }
  console.log(`Product: ${product.name} (${product.id})`);

  // 2. Price check — report only
  for (const price of product.prices ?? []) {
    const amount = price.priceAmount ?? price.price_amount;
    const currency = (price.priceCurrency ?? price.price_currency ?? "usd").toUpperCase();
    console.log(`Price: ${amount} ${currency} (${price.type ?? ""})`);
    if (amount !== 990) {
      console.warn(`⚠️  Price is not 990 cents — the site advertises $9.90.`);
    }
  }

  // 3. Upload the zip
  const data = fs.readFileSync(zipPath);
  const sha256 = require("crypto").createHash("sha256").update(data).digest("base64");
  console.log(`\nUploading ${FILE_NAME} (${data.length} bytes)…`);
  const upload = await polar.files.create({
    name: FILE_NAME,
    mimeType: "application/zip",
    size: data.length,
    checksumSha256Base64: sha256,
    service: "downloadable",
    upload: {
      parts: [
        { number: 1, chunkStart: 0, chunkEnd: data.length, checksumSha256Base64: sha256 },
      ],
    },
  });
  const part = upload.upload.parts[0];
  const putRes = await fetch(part.url, {
    method: "PUT",
    headers: { ...(part.headers ?? {}), "x-amz-checksum-sha256": sha256 },
    body: data,
  });
  if (!putRes.ok) throw new Error(`S3 PUT failed: ${putRes.status} ${await putRes.text()}`);
  const etag = putRes.headers.get("etag");
  const file = await polar.files.uploaded({
    id: upload.id,
    fileUploadCompleted: {
      id: upload.upload.id,
      path: upload.path,
      parts: [{ number: 1, checksumEtag: etag, checksumSha256Base64: sha256 }],
    },
  });
  console.log(`File uploaded: ${file.id} (${file.name})`);

  // 4. Create or update the downloadables benefit
  const existingPage = await polar.benefits.list({ typeFilter: "downloadables", limit: 100 });
  const existing = existingPage.result.items.find((b) => b.description === BENEFIT_DESC);
  let benefit;
  if (existing) {
    benefit = await polar.benefits.update({
      id: existing.id,
      requestBody: {
        type: "downloadables",
        description: BENEFIT_DESC,
        properties: { files: [file.id] },
      },
    });
    console.log(`Benefit updated: ${benefit.id}`);
  } else {
    benefit = await polar.benefits.create({
      type: "downloadables",
      description: BENEFIT_DESC,
      properties: { files: [file.id] },
    });
    console.log(`Benefit created: ${benefit.id}`);
  }

  // 5. Attach benefit to product (keeping any existing benefits)
  const currentBenefitIds = (product.benefits ?? []).map((b) => b.id);
  const benefits = [...new Set([...currentBenefitIds, benefit.id])];
  await polar.products.updateBenefits({ id: product.id, productBenefitsUpdate: { benefits } });
  console.log(`Benefit attached to product (${benefits.length} total).`);

  // 6. Persist the product ID for the checkout route
  let envText = fs.readFileSync(ENV_PATH, "utf8");
  if (/^POLAR_ASSISTANT_PACK_PRODUCT_ID=.*$/m.test(envText)) {
    envText = envText.replace(
      /^POLAR_ASSISTANT_PACK_PRODUCT_ID=.*$/m,
      `POLAR_ASSISTANT_PACK_PRODUCT_ID=${product.id}`,
    );
  } else {
    envText += `POLAR_ASSISTANT_PACK_PRODUCT_ID=${product.id}\n`;
  }
  fs.writeFileSync(ENV_PATH, envText);
  console.log(`.env.local updated with product ID.`);

  // 7. Prove the whole chain with a real checkout session
  const checkout = await polar.checkouts.create({ products: [product.id] });
  console.log(`\n✅ Wired. Test checkout URL (open to verify, don't pay unless testing):`);
  console.log(checkout.url);
}

main().catch((e) => {
  console.error("\n❌", e.message ?? e);
  if (e.body$) console.error(e.body$);
  process.exit(1);
});
