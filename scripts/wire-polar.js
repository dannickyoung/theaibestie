/**
 * One-shot wiring of the Starter Pack product on Polar.
 *
 * Reads .env.local for POLAR_ACCESS_TOKEN / POLAR_SERVER, then:
 *   1. finds the Starter Pack product (or uses POLAR_STARTER_PACK_PRODUCT_ID)
 *   2. checks its price is $9.90 one-time (reports, never changes billing)
 *   3. uploads dist/personal-brand-pack.zip as a downloadable file
 *   4. creates/updates a "downloadables" benefit with that file
 *   5. attaches the benefit to the product
 *   6. writes POLAR_STARTER_PACK_PRODUCT_ID back to .env.local
 *   7. creates a test checkout session and prints its URL
 *
 * Usage: node scripts/wire-polar.js "/path/to/personal-brand-pack.zip"
 */
const fs = require("fs");
const path = require("path");
const { Polar } = require("@polar-sh/sdk");

const ROOT = path.join(__dirname, "..");
const ENV_PATH = path.join(ROOT, ".env.local");

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

  // 1. Find the product
  let product;
  if (env.POLAR_STARTER_PACK_PRODUCT_ID) {
    product = await polar.products.get({ id: env.POLAR_STARTER_PACK_PRODUCT_ID });
  } else {
    const page = await polar.products.list({ isArchived: false, limit: 100 });
    const items = page.result.items;
    console.log("Products found:");
    for (const p of items) console.log(`  - ${p.name} (${p.id})`);
    const matches = items.filter((p) => /starter|brand/i.test(p.name));
    if (matches.length !== 1) {
      throw new Error(
        `Expected exactly one product matching /starter|brand/i, found ${matches.length}. ` +
          `Set POLAR_STARTER_PACK_PRODUCT_ID in .env.local to pick one explicitly.`,
      );
    }
    product = matches[0];
  }
  console.log(`\nProduct: ${product.name} (${product.id})`);

  // 2. Price check — report only, never mutate billing
  for (const price of product.prices ?? []) {
    const amount = price.priceAmount ?? price.price_amount;
    const currency = (price.priceCurrency ?? price.price_currency ?? "usd").toUpperCase();
    const kind = price.type ?? "";
    console.log(`Price: ${amount} ${currency} (${kind})`);
    if (amount !== 990) {
      console.warn(
        `⚠️  Price is not 990 cents — the site advertises $9.90. Fix it in the Polar dashboard.`,
      );
    }
  }

  // 3. Upload the zip
  const data = fs.readFileSync(zipPath);
  const sha256 = require("crypto").createHash("sha256").update(data).digest("base64");
  console.log(`\nUploading ${path.basename(zipPath)} (${data.length} bytes)…`);
  const upload = await polar.files.create({
    name: path.basename(zipPath),
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
  // Polar caps benefit descriptions at 42 characters
  const BENEFIT_DESC = "Starter Pack — guide + Claude skill";
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
  if (/^POLAR_STARTER_PACK_PRODUCT_ID=.*$/m.test(envText)) {
    envText = envText.replace(
      /^POLAR_STARTER_PACK_PRODUCT_ID=.*$/m,
      `POLAR_STARTER_PACK_PRODUCT_ID=${product.id}`,
    );
  } else {
    envText += `\nPOLAR_STARTER_PACK_PRODUCT_ID=${product.id}\n`;
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
