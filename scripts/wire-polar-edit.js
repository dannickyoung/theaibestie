/**
 * Wires the Edit Bestie kit on Polar. Safe to re-run (idempotent): re-run it after any
 * handbook or workspace edit to refresh the download.
 *
 * Reads .env.local for POLAR_ACCESS_TOKEN / POLAR_SERVER (never prints the token), then:
 *   1. finds the product (POLAR_EDIT_BESTIE_PRODUCT_ID or name match) or creates it at $69.99 one-time
 *   2. creates the flash-sale discount ($20 off, this product only, ends at SALE_ENDS_AT)
 *      if the token has the discounts scope; otherwise skips it (the checkout route then
 *      applies the sale price as a checkout price override instead)
 *   3. builds the delivery zip "Edit Bestie/{handbook.pdf, My Reels/}" from the source folder,
 *      following the Edit Bestie README packaging rules (no node_modules/models/.venv/hyperframes,
 *      empty clips/work/reels, blank my-style.md, no .DS_Store/__MACOSX, personal-data grep)
 *   4. uploads it (skipped if the benefit already holds an identical file), creates/updates the
 *      downloadables benefit to point at it, and attaches the benefit to the product.
 *      If handbook.pdf does not exist yet, steps 3-4 are skipped: nothing is attached.
 *   5. writes POLAR_EDIT_BESTIE_PRODUCT_ID (and POLAR_EDIT_BESTIE_DISCOUNT_ID) to .env.local
 *   6. creates a test checkout the same way the site does and prints the amount Polar computed
 *
 * Usage: node scripts/wire-polar-edit.js
 */
const fs = require("fs");
const os = require("os");
const path = require("path");
const crypto = require("crypto");
const { execFileSync } = require("child_process");
const { Polar } = require("@polar-sh/sdk");

const ENV_PATH = path.join(__dirname, "..", ".env.local");
const KIT_DIR = "/Volumes/DATA/AI Bestie/Edit Bestie";
// The buyer workspace for the current version (unzipped from the co-founder's My-Reels.zip).
const WORKSPACE = "/Volumes/DATA/AI Bestie/Edit Bestie 0.3.0/My Reels";
const DIST = path.join(KIT_DIR, "dist");
const HANDBOOK = path.join(DIST, "handbook.pdf");
// Blank style profile + starter edit.json: the source copies get rewritten whenever someone test-runs the kit.
const STYLE_TEMPLATE = path.join(DIST, "my-style.template.md");
const EDIT_TEMPLATE = path.join(DIST, "edit.template.json");
const ZIP_PATH = path.join(DIST, "theaibestie Edit Bestie.zip");
const SKILL_REL = ".claude/skills/edit-bestie";
// Installer output / test-run leftovers: setup.sh recreates all of these on the buyer's Mac.
const EXCLUDES = ["node_modules", "models", ".venv", "hyperframes", ".DS_Store", "__MACOSX", "._*"];
const EMPTY_DIRS = ["clips", "work", "reels", `${SKILL_REL}/engine/public/clips`, `${SKILL_REL}/engine/public/music`];
// From the Edit Bestie README ("must return nothing").
const PERSONAL_RE = /wendy|wndywang|getugc|meevee|tdc|dinner|stefan|jasmina|tenfold|hyatt|\/Users\//i;

const PRODUCT_NAME = "theaibestie Edit Bestie - Claude Video Editing Kit";
const PRICE_REGULAR = 6999;
const PRICE_SALE = 4999;
// Must match SALE_ENDS_AT in app/edit-bestie/sale.ts and app/api/checkout/route.ts
const SALE_STARTS_AT = "2026-10-09T11:45:00Z";
const SALE_ENDS_AT = "2026-10-11T11:45:00Z";
// Polar renders markdown on the checkout page.
const PRODUCT_DESCRIPTION = [
  "**You film. Claude edits. You post.** Drop your phone clips in one folder, say \"edit my reel\", and get a finished reel in your look. Best takes picked, ums cut, captions timed to your voice, sound effects in.",
  "**Inside the kit:** the handbook (PDF) and the My Reels workspace with the Edit Bestie skill for Claude Code, three looks you can mix, emoji pops and snap zooms, a cover for every reel, a CapCut version with every layer editable, and our own sound kit (34 sounds, safe for any post, even ads).",
  "**You will also need:** a Mac (Mac only for now) and Claude Pro or higher (about US$20/month, paid to Claude, not to us).",
  "Three hours of editing, now two words. Your empire just hired an editor. 👑",
].join("\n\n");
const BENEFIT_DESC = "Edit Bestie: handbook + My Reels workspace"; // Polar max 42 chars
const FILE_NAME = "theaibestie Edit Bestie.zip";
const DISCOUNT_NAME = "48-hour flash sale"; // shown to the buyer on checkout

function loadEnv() {
  const env = {};
  for (const line of fs.readFileSync(ENV_PATH, "utf8").split("\n")) {
    const m = line.match(/^([A-Z_]+)=(.*)$/);
    if (m) env[m[1]] = m[2].trim();
  }
  return env;
}

function setEnv(name, value) {
  let text = fs.readFileSync(ENV_PATH, "utf8");
  const re = new RegExp(`^${name}=.*$`, "m");
  if (re.test(text)) text = text.replace(re, `${name}=${value}`);
  else text += `${text.endsWith("\n") ? "" : "\n"}${name}=${value}\n`;
  fs.writeFileSync(ENV_PATH, text);
}

async function uploadFile(polar, data, sha256) {
  const upload = await polar.files.create({
    name: FILE_NAME,
    mimeType: "application/zip",
    size: data.length,
    checksumSha256Base64: sha256,
    service: "downloadable",
    upload: {
      parts: [{ number: 1, chunkStart: 0, chunkEnd: data.length, checksumSha256Base64: sha256 }],
    },
  });
  const part = upload.upload.parts[0];
  const putRes = await fetch(part.url, {
    method: "PUT",
    headers: { ...(part.headers ?? {}), "x-amz-checksum-sha256": sha256 },
    body: data,
  });
  if (!putRes.ok) throw new Error(`S3 PUT failed: ${putRes.status} ${await putRes.text()}`);
  return polar.files.uploaded({
    id: upload.id,
    fileUploadCompleted: {
      id: upload.upload.id,
      path: upload.path,
      parts: [{ number: 1, checksumEtag: putRes.headers.get("etag"), checksumSha256Base64: sha256 }],
    },
  });
}

/** Builds ZIP_PATH from the source workspace + handbook. Throws (uploads nothing) on any packaging problem. */
function buildZip() {
  const stageRoot = fs.mkdtempSync(path.join(os.tmpdir(), "edit-bestie-"));
  const kit = path.join(stageRoot, "Edit Bestie");
  fs.mkdirSync(kit);
  // Keep only .keep inside the buyer's data folders (a test run can leave GBs of footage there).
  const emptyFilters = EMPTY_DIRS.flatMap((rel) => [
    "--include", `/My Reels/${rel}/.keep`,
    "--exclude", `/My Reels/${rel}/*`,
  ]);
  const rsyncArgs = ["-a", ...emptyFilters, ...EXCLUDES.flatMap((x) => ["--exclude", x]), WORKSPACE, `${kit}/`];
  execFileSync("rsync", rsyncArgs);
  const ws = path.join(kit, "My Reels");
  for (const rel of EMPTY_DIRS) {
    const dir = path.join(ws, rel);
    for (const name of fs.existsSync(dir) ? fs.readdirSync(dir) : []) {
      if (name !== ".keep") fs.rmSync(path.join(dir, name), { recursive: true, force: true });
    }
  }
  fs.copyFileSync(STYLE_TEMPLATE, path.join(ws, SKILL_REL, "my-style.md"));
  fs.copyFileSync(EDIT_TEMPLATE, path.join(ws, SKILL_REL, "engine/edit.json"));
  fs.copyFileSync(HANDBOOK, path.join(kit, "handbook.pdf"));

  // Personal-data grep over every text file in the workspace. npm integrity hashes are random
  // base64 and can contain letter runs like "TDC", so those lines are not checked.
  const hits = [];
  const walk = (dir) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, e.name);
      if (e.isSymbolicLink()) hits.push(`${full}: symlink`);
      else if (e.isDirectory()) walk(full);
      else if (!/\.(wav|woff2|ttf|png|pdf)$/i.test(e.name)) {
        fs.readFileSync(full, "utf8").split("\n").forEach((line, i) => {
          if (PERSONAL_RE.test(line) && !/"integrity": "sha512-/.test(line)) {
            hits.push(`${path.relative(kit, full)}:${i + 1}: ${line.trim().slice(0, 120)}`);
          }
        });
      }
    }
  };
  walk(ws);
  if (!fs.existsSync(path.join(ws, SKILL_REL, "SKILL.md"))) hits.push("missing .claude/skills/edit-bestie/SKILL.md");
  if (hits.length) {
    throw new Error(`Packaging check failed, nothing uploaded:\n  ${hits.join("\n  ")}`);
  }

  fs.rmSync(ZIP_PATH, { force: true });
  execFileSync("zip", ["-qrX", ZIP_PATH, "Edit Bestie", "-x", "*.DS_Store", "-x", "__MACOSX*", "-x", "*/._*"], {
    cwd: stageRoot,
  });
  fs.rmSync(stageRoot, { recursive: true, force: true });
  const entries = execFileSync("zipinfo", ["-1", ZIP_PATH], { encoding: "utf8" }).split("\n").filter((l) => l && !l.endsWith("/"));
  console.log(`Built ${ZIP_PATH} (${fs.statSync(ZIP_PATH).size} bytes, ${entries.length} files)`);
  return fs.readFileSync(ZIP_PATH);
}

async function main() {
  if (BENEFIT_DESC.length > 42) throw new Error("Benefit description over 42 chars");
  const env = loadEnv();
  if (!env.POLAR_ACCESS_TOKEN) throw new Error("POLAR_ACCESS_TOKEN missing in .env.local");
  const server = env.POLAR_SERVER === "sandbox" ? "sandbox" : "production";
  const polar = new Polar({ accessToken: env.POLAR_ACCESS_TOKEN, server });
  console.log(`Polar server: ${server}`);

  // 1. Product
  let product;
  if (env.POLAR_EDIT_BESTIE_PRODUCT_ID) {
    product = await polar.products.get({ id: env.POLAR_EDIT_BESTIE_PRODUCT_ID });
    console.log("Reusing product from .env.local.");
  } else {
    const page = await polar.products.list({ isArchived: false, limit: 100 });
    product = page.result.items.find((p) => p.name === PRODUCT_NAME);
    if (product) console.log("Found existing product by name.");
  }
  if (!product) {
    product = await polar.products.create({
      name: PRODUCT_NAME,
      description: PRODUCT_DESCRIPTION,
      recurringInterval: null,
      prices: [{ amountType: "fixed", priceAmount: PRICE_REGULAR, priceCurrency: "usd" }],
    });
    console.log("Product created.");
  } else if (product.name !== PRODUCT_NAME || product.description !== PRODUCT_DESCRIPTION) {
    product = await polar.products.update({
      id: product.id,
      productUpdate: { name: PRODUCT_NAME, description: PRODUCT_DESCRIPTION },
    });
    console.log("Product name/description refreshed.");
  }
  console.log(`Product: ${product.name} (${product.id})`);
  const price = (product.prices ?? []).find((p) => !p.isArchived);
  console.log(`Price: ${price?.priceAmount} ${(price?.priceCurrency ?? "").toUpperCase()} (${price?.id})`);
  if (price?.priceAmount !== PRICE_REGULAR) console.warn(`WARNING: price is not ${PRICE_REGULAR} cents.`);
  setEnv("POLAR_EDIT_BESTIE_PRODUCT_ID", product.id);

  // 2. Flash-sale discount (needs discounts:write on the token)
  let discount = null;
  try {
    const list = await polar.discounts.list({ limit: 100 });
    discount = list.result.items.find(
      (d) => d.name === DISCOUNT_NAME && (d.products ?? []).some((p) => p.id === product.id),
    );
    if (!discount) {
      discount = await polar.discounts.create({
        type: "fixed",
        duration: "once",
        name: DISCOUNT_NAME,
        amounts: { usd: PRICE_REGULAR - PRICE_SALE },
        startsAt: new Date(SALE_STARTS_AT),
        endsAt: new Date(SALE_ENDS_AT),
        products: [product.id],
      });
      console.log("Discount created.");
    }
    console.log(`Discount: ${discount.id} (ends ${new Date(discount.endsAt).toISOString()})`);
    setEnv("POLAR_EDIT_BESTIE_DISCOUNT_ID", discount.id);
  } catch (e) {
    if (e.statusCode !== 403) throw e;
    console.warn("Token has no discounts scope: no discount. The checkout route applies the sale price as a price override until SALE_ENDS_AT.");
  }

  // 3 + 4. Delivery zip -> file -> benefit -> product
  if (!fs.existsSync(HANDBOOK)) {
    console.warn(`\nPENDING: ${HANDBOOK} does not exist yet. No zip built, nothing attached. Re-run this script once it is there.`);
  } else {
    const data = buildZip();
    const sha256 = crypto.createHash("sha256").update(data).digest("base64");
    const benefits = await polar.benefits.list({ typeFilter: "downloadables", limit: 100 });
    let benefit = benefits.result.items.find((b) => b.description === BENEFIT_DESC);

    let fileId;
    const currentFiles = benefit?.properties?.files ?? [];
    if (currentFiles.length) {
      const files = await polar.files.list({ ids: currentFiles, limit: 100 });
      const same = files.result.items.find((f) => f.checksumSha256Base64 === sha256 && f.size === data.length);
      if (same) {
        fileId = same.id;
        console.log(`Zip unchanged, reusing file ${fileId}.`);
      }
    }
    if (!fileId) {
      console.log(`Uploading ${FILE_NAME}...`);
      fileId = (await uploadFile(polar, data, sha256)).id;
      console.log(`File uploaded: ${fileId}`);
    }

    const benefitBody = { type: "downloadables", description: BENEFIT_DESC, properties: { files: [fileId] } };
    if (benefit) {
      benefit = await polar.benefits.update({ id: benefit.id, requestBody: benefitBody });
      console.log(`Benefit updated: ${benefit.id} (previous files: ${currentFiles.join(", ") || "none"})`);
    } else {
      benefit = await polar.benefits.create(benefitBody);
      console.log(`Benefit created: ${benefit.id}`);
    }
    const benefitIds = [...new Set([...(product.benefits ?? []).map((b) => b.id), benefit.id])];
    await polar.products.updateBenefits({ id: product.id, productBenefitsUpdate: { benefits: benefitIds } });
    console.log(`Benefit attached (${benefitIds.length} on product).`);
  }
  console.log(".env.local updated.");

  // 5. Verify with a real checkout session, built the same way the route builds it
  const onSale = Date.now() >= Date.parse(SALE_STARTS_AT) && Date.now() < Date.parse(SALE_ENDS_AT);
  const checkout = await polar.checkouts.create({
    products: [product.id],
    ...(onSale && discount ? { discountId: discount.id } : {}),
    ...(onSale && !discount
      ? { prices: { [product.id]: [{ amountType: "fixed", priceAmount: PRICE_SALE, priceCurrency: "usd" }] } }
      : {}),
  });
  console.log(
    `\nTest checkout: amount=${checkout.amount} discount=${checkout.discountAmount} net=${checkout.netAmount} total=${checkout.totalAmount} ${checkout.currency}`,
  );
  console.log(checkout.url);
}

main().catch((e) => {
  console.error("\nERROR:", e.message ?? e);
  process.exit(1);
});
