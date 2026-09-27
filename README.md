# The Pinnacle Foundation website

The website for The Pinnacle Foundation, a faith-based charitable organisation in Ghana. It is built with Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion and GSAP, and exports to plain static files, so no server, database or backend is needed after the build.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export to /out
```

Upload the contents of `/out` to any static host (Netlify, Vercel static, Cloudflare Pages, GitHub Pages, S3, cPanel). Each route is written as `/route/index.html`, so no rewrite rules are needed.

## Before launch: replace the placeholders

The site ships as a **preview edition**. Nothing unverified is presented as fact: placeholder records carry a visible "Placeholder" tag, and the footer carries a preview notice. Search the `content/` folder for `PLACEHOLDER` to find every item.

| What | Where | Notes |
| --- | --- | --- |
| Live domain | `content/site.ts` → `url`, or the `NEXT_PUBLIC_SITE_URL` env var | Used for canonical URLs, the sitemap and social cards. |
| Contact details, social links | `content/site.ts` → `contact`, `social` | `null` hides an item. Only configured platforms are shown. |
| Donation link | `content/site.ts` → `donation.url` | Unlocks "Give once" and "Give monthly" and points "Donate Now" at your provider. |
| Bank / Mobile Money | `content/site.ts` → `donation.bank`, `donation.mobileMoney` | Shown only when set. Publish only verified details. |
| Forms | `content/site.ts` → `forms.endpoint` | Any service that accepts JSON POSTs (Formspree, Getform, Basin…). Without one, forms fall back to the configured email, then WhatsApp. |
| Vision | `content/site.ts` → `vision`, `visionIsDraft` | Draft wording; set `visionIsDraft: false` once confirmed. |
| Projects | `content/projects.ts` | Example structures only. Replace them, then set `placeholder: false`. |
| Stories | `content/stories.ts` | Frames only. Publish real stories only with consent. |
| Impact figures | `content/impact.ts` | Not real numbers. Set `verified: true` only for audited figures. |
| Team | `content/involvement.ts` → `team` | Add `{ name, role, image, social }` per person (social links optional: `linkedin`, `x`, `instagram`, `facebook`), with roughly square portraits in `public/images/team/`. Until then the About page shows "Name to come" cards. |
| Partners | `content/involvement.ts` → `partners` | Only real, confirmed partners. The partners area stays in its empty state until then. |
| Transparency documents | `content/site.ts` → `transparencyDocs` | `href: null` lists it under "What we will publish"; add a link to publish it. |
| Preview notice | `content/site.ts` → `showPreviewNotice` | Set to `false` once all placeholder content is replaced. |
| Photographs | `assets/photos/` + `content/photos.ts` | See Photography below. |

### Photography

The site ships **without photographs**. Every image slot shows a placeholder frame in the brand palette, labelled with the photo that belongs there (for example "Volunteers preparing donations"). The full list of slots and the shot each one needs is in `content/photos.ts`.

To add a photograph:

1. Save it as `assets/photos/<slug>.jpg`, using the slug from `content/photos.ts` (for example `assets/photos/preparing-donations.jpg`).
2. Run `npm run images`. This creates responsive WebP files and records the photo in `content/generated/photo-manifest.json`.
3. In `content/photos.ts`, update `alt`, `caption`, `location` and `focus` (the crop focal point) to describe the real photo.

The real image replaces its placeholder everywhere it's used, with no component changes. Use only photographs the Foundation has the right to publish, with consent from the people shown. Children should appear only with guardian consent.

Run `npm run og` to rebuild the social preview image (`public/og.jpg`). It uses `preparing-donations.jpg` once that photo exists.

## How it's organised

```
app/                 Routes: /, /about, /projects, /get-involved, /stories, /donate, /contact
content/             All copy, configuration and data (edit here, not in components)
components/
  home/              Homepage scenes (hero, sticky sequences, horizontal journey…)
  sections/          Sections shared across pages (pathways, transparency, FAQ, final CTA, page hero)
  pages/             Interactive parts of individual pages (project explorer, gallery, stories reader…)
  motion/            Reusable motion primitives (text reveals, arch frames, brand line, counters)
  layout/            Navigation, footer, page transitions, smooth scroll, colour tones
  forms/, ui/        Form system and small UI pieces
lib/                 GSAP setup, arch geometry, form submission, helpers
scripts/             Image optimisation and social-image generation
```

**Design system.** The palette tokens and the five colour "tones" (ivory, sand, olive, terracotta, charcoal) live in `app/globals.css`. Any section with `data-scroll-tone="…"` changes the page colour as it reaches the middle of the screen (`components/layout/ToneController.tsx`). The recurring **Pinnacle arch** (a pointed arch whose summit is a point of light) is generated in `lib/arch.ts` and is used for photo frames, the logo, the brand line and the final call to action.

**Motion.** GSAP ScrollTrigger drives the scroll-linked scenes, Framer Motion handles state-driven motion (menus, accordions, galleries, page curtain), and Lenis provides smooth scrolling. Under `prefers-reduced-motion`, smooth scrolling, pinning, parallax and scrubbed scenes are switched off and every scene falls back to a calm static layout with the same content.

**Adding detail pages later.** Projects and stories have stable `slug`s. To give them their own pages, add `app/projects/[slug]/page.tsx` with `generateStaticParams()` returning `projects.map(p => ({ slug: p.slug }))`. This stays compatible with static export.
