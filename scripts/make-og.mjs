/**
 * Generates public/og.jpg (1200×630 social preview). Run: npm run og
 * Uses assets/photos/preparing-donations.jpg inside the arch when that photo
 * exists; otherwise draws the arch as a solid brand shape.
 */
import fs from "node:fs";
import sharp from "sharp";

const W = 1200, H = 630, w = 520, h = 610;
const PHOTO = "assets/photos/preparing-donations.jpg";

// Pointed arch (two circular arcs meeting at the summit).
const rise = 0.866 * w;
const archPath = `M0 ${h} L0 ${rise} A${w} ${w} 0 0 1 ${w / 2} 0 A${w} ${w} 0 0 1 ${w} ${rise} L${w} ${h} Z`;

let arch;
if (fs.existsSync(PHOTO)) {
  const src = sharp(PHOTO);
  const { width, height } = await src.metadata();
  const cw = Math.round((height * w) / h);
  const left = Math.max(0, Math.min(width - cw, Math.round(width / 2 - cw / 2)));
  const photo = await sharp(PHOTO).extract({ left, top: 0, width: cw, height }).resize(w, h).toBuffer();
  const mask = Buffer.from(`<svg width="${w}" height="${h}"><path d="${archPath}" fill="#fff"/></svg>`);
  arch = await sharp(photo).composite([{ input: mask, blend: "dest-in" }]).png().toBuffer();
} else {
  arch = Buffer.from(`<svg width="${w}" height="${h}">
<path d="${archPath}" fill="#465A3C"/>
<path d="M${w / 2 - 70} ${h - 150}V${h - 290}c0-60 32-105 70-128c38 23 70 68 70 128V${h - 150}" fill="none" stroke="#F6F1E8" stroke-width="10" stroke-linecap="round" opacity=".9"/>
</svg>`);
}

const text = Buffer.from(`<svg width="${W}" height="${H}">
<style>.d{font-family:"DejaVu Sans Condensed","Arial Narrow",sans-serif;font-weight:700;fill:#1F1F1B;letter-spacing:-2px}.s{font-family:sans-serif;fill:#465A3C;font-size:24px;font-weight:600}</style>
<text x="64" y="104" class="s">THE PINNACLE FOUNDATION</text>
<text x="56" y="262" class="d" font-size="138">FAITH</text>
<text x="56" y="392" class="d" font-size="138">IN</text>
<text x="56" y="522" class="d" font-size="138">ACTION.</text>
<text x="64" y="584" style="font-family:sans-serif;font-size:22px;fill:#1F1F1B">Faith-based charity serving communities in Ghana</text>
<circle cx="${640 + w / 2}" cy="14" r="7" fill="#C6A15B"/>
</svg>`);

await sharp({ create: { width: W, height: H, channels: 3, background: "#F6F1E8" } })
  .composite([{ input: arch, left: 640, top: 20 }, { input: text, left: 0, top: 0 }])
  .jpeg({ quality: 86 })
  .toFile("public/og.jpg");
console.log("Wrote public/og.jpg");
