# WyroTech portfolio — deploy & handoff

Static **Vite + React + TS** site. Editorial B&W, generative line-art visuals, no backend.
Bilingual **English + German** (route-based, see "Languages" below).
State: `npm run build`, `npm run typecheck`, and accesslint all pass (0 a11y violations).

## Deploy to Vercel

1. Push the repo to GitHub/GitLab and **Import** it in Vercel.
2. Vercel auto-detects Vite. Settings (should be automatic):
   - Build command: `npm run build`
   - Output dir: `dist`
   - SPA routing: handled by `vercel.json` (rewrites all paths → `/index.html`).
3. Deploy → you get a `*.vercel.app` URL (every branch also gets a preview URL).
4. **Custom domain:** add `wyro.tech` in Vercel → Project → Domains, and point your DNS as Vercel instructs.
5. **Analytics** is already wired (`@vercel/analytics` + `@vercel/speed-insights`, cookieless — no consent banner needed). Enable Web Analytics + Speed Insights in the Vercel dashboard.
6. After go-live: submit `https://wyro.tech/sitemap.xml` in **Google Search Console**.

## Local

```bash
npm install
npm run dev        # http://localhost:5173
npm run build && npm run preview
npm run typecheck
```

## Languages (English + German)

Route-based, with `hreflang` for SEO:
- **English** is canonical at `/` (and `/work/:slug`).
- **German** lives at `/de` (and `/de/work/:slug`).
- First-time German browsers (`navigator.language` `de-*`) auto-redirect to `/de`; the
  EN/DE switch in the nav remembers the choice (localStorage).
- `<html lang>`, canonical, and `hreflang` alternates are emitted per route (`src/components/Seo.tsx`),
  and `public/sitemap.xml` lists both locales.

How translations are stored: every content file exports `{ en, de }` (see `src/i18n/localize.ts`).
Interface microcopy (nav, CTAs, headings, footer, case-study labels, SEO titles) is centralised in
`src/i18n/ui.ts`. To edit German copy, change the `de` payload in the relevant file; if a `de` value
is ever missing it falls back to English automatically, so the site never shows blanks.
**Voice:** German addresses the visitor formally ("Sie") — switch to "du" by editing the `de` strings.

## Edit content (no component code needed)

Copy lives in `src/data/` (bilingual `{ en, de }`) and `src/i18n/ui.ts` (interface strings):
- `site.ts` — language-neutral config: brand, **email**, city, timezone, social, nav anchors
- `i18n/ui.ts` — all interface microcopy + SEO meta titles/descriptions, per language
- `works.ts` — case studies (anonymized — see legal note)
- `services.ts` (4 plain offers), `process.ts`, `faq.ts`, `timeline.ts`, `highlights.ts`
- `skills.ts` — **categorized** tech stack (`techCategories`: Frontend, AI/KI, Backend & APIs, Cloud & DevOps); add a new logo's glyph in `components/ui/TechIcon.tsx` (or it falls back to a monogram chip)
- `testimonials.ts` — empty → section auto-hides; add real quotes to show it
- `legal.ts` — Impressum + Datenschutz text (German, as required)

## ⚠️ Before launch — only you can do these

1. **Datenschutz**: it's a solid template, not legal advice — have it reviewed (e.g. eRecht24 or a lawyer). Impressum is complete; no VAT/tax ID needed unless you register for VAT.
2. **Email**: site now uses `a@wyro.tech` (in `site.ts` + `legal.ts`). Change there if wrong.
3. **Confirm these factual claims are true** (they're load-bearing — soften if not):
   - FAQ: *"for backend/infra I bring in people I trust"* — only true if you actually subcontract/refer out.
   - Works (Enterprise SaaS): *"still shipping years later"* — only if that product is still live in 2026.
   - Timeline: *"up to 70% faster"* C# library — must be measured/defensible (it's the only hard number).
4. **Confirm these match reality**: availability line ("Taking 1–2 projects this quarter"), Process steps (48h proposal, Friday updates, repo from commit one), FAQ pricing/NDA defaults.
5. **Photo**: `public/portrait.webp` was pulled from your live wyro.tech site and shown **grayscale** in About to fit the B&W system. Swap the file (same path) for a different shot if you like.
6. **Testimonials**: empty → section auto-hides. Add real, attributable quotes — this is the single biggest lift left.
7. **OG image**: `public/og.jpg` exists (B&W card). Swap if you want a custom one.

## Legal note (important)

Employer work in `works.ts` is **anonymized** — no internal product/company names, no
confidential metrics — to respect NDA/confidentiality. Third-party tech (SAP, Azure, Angular)
is named because it's public. RoboCar is your own project, named freely. If you obtain written
permission to showcase named products, you can restore names/metrics in `works.ts`.

## Notes / nice-to-haves (optional, deferred)

- SEO: per-route titles/canonical via `react-helmet-async` are in; for max crawl-quality you
  could later prerender routes (`vite-react-ssg`).
- Per-route OG images (currently one shared `og.jpg`).
- Visual quality: reviewed to a consistent strong-8 (ship-grade); a unanimous strict-9 is
  asymptotic taste-polish.
- Contact: currently `mailto` + press-and-hold CTA. A 2-field form via a Vercel serverless
  function (`/api`) is an option if you want lower-friction contact.
