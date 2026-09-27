/**
 * Builds responsive WebP variants for every photo in assets/photos and writes
 * content/generated/photo-manifest.json (dimensions + blur placeholder + tone).
 *
 * Usage: npm run images
 * Add or replace a photograph by dropping a JPG into assets/photos, then
 * describing it in content/photos.ts under the same slug (file name without extension).
 */
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SRC = "assets/photos";
const OUT = "public/images/photos";
const MANIFEST = "content/generated/photo-manifest.json";
const WIDTHS = [640, 1080, 1600, 2400];

await fs.mkdir(OUT, { recursive: true });
await fs.mkdir(path.dirname(MANIFEST), { recursive: true });

const files = (await fs.readdir(SRC)).filter((f) => /\.(jpe?g|png|webp)$/i.test(f));
const manifest = {};

for (const file of files) {
  const slug = file.replace(/\.[^.]+$/, "");
  const input = sharp(path.join(SRC, file)).rotate();
  const { width, height } = await input.metadata();

  const widths = WIDTHS.filter((w) => w <= width);
  if (!widths.includes(width) && width < WIDTHS.at(-1)) widths.push(width);

  for (const w of widths) {
    await sharp(path.join(SRC, file))
      .rotate()
      .resize({ width: w })
      .webp({ quality: w > 1600 ? 72 : 76, effort: 5 })
      .toFile(path.join(OUT, `${slug}-${w}.webp`));
  }

  const blurBuf = await sharp(path.join(SRC, file)).rotate().resize(24).blur(1.2).webp({ quality: 40 }).toBuffer();
  const { dominant } = await sharp(path.join(SRC, file)).stats();
  const hex = `#${[dominant.r, dominant.g, dominant.b].map((c) => c.toString(16).padStart(2, "0")).join("")}`;

  manifest[slug] = {
    width,
    height,
    widths: widths.sort((a, b) => a - b),
    blur: `data:image/webp;base64,${blurBuf.toString("base64")}`,
    tone: hex,
  };
  console.log(`✓ ${slug} (${widths.join(", ")})`);
}

await fs.writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
console.log(`Wrote ${MANIFEST}`);
