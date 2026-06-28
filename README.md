# WyroTech — portfolio

Frontend-engineering & UX services site for **Andreas Wyrobek** (WyroTech).
A typographic, editorial black-and-white design system — display type, generous
whitespace, and motion used sparingly.

## Stack

- **Vite + React 19 + TypeScript** — static SPA, no SSR (`npm run build` → static `dist/`)
- **SCSS + BEM** with CSS custom-property design tokens (no Tailwind)
- **Funnel Display** (display) · **Geist** (body) · **Geist Mono** (labels) — self-hosted via Fontsource
- **Lenis** smooth scroll · IntersectionObserver reveals · CSS View Transitions (work → case-study morph)

## Scripts

```bash
npm run dev        # dev server (http://localhost:5173)
npm run build      # production build → dist/
npm run preview    # preview the production build
npm run typecheck  # tsc --noEmit
npm run format     # prettier
```

## Structure

```
src/
  main.tsx, App.tsx          # entry + routes (/, /work/:slug, *)
  pages/                     # Home, CaseStudy, NotFound
  sections/                  # Hero, SelectedWorks, Services, Capabilities,
                             #   About, Timeline, Testimonials, Contact
  components/                # Nav, Footer, ScrollManager
  components/ui/             # Section, SectionHead, Reveal, ArrowLink,
                             #   HoldButton, Marquee, WorkCard
  hooks/                     # useLenis, useReveal, useClock, usePaintTime
  data/                      # ← all content lives here (typed)
  styles/                    # _tokens, _reset, _typography, _grid, main.scss
  lib/scrollToHash.ts
```

## Editing content

All copy is data-driven (no copy hard-coded in components):

- `src/data/site.ts` — brand, hero copy, email, location, **availability**, nav, socials
- `src/data/works.ts` — case studies (incl. `metric` = the big data-as-headline number)
- `src/data/services.ts` — the six service blocks
- `src/data/skills.ts` — capability domains + tech marquee
- `src/data/timeline.ts` — work history
- `src/data/highlights.ts` — highlights + languages
- `src/data/testimonials.ts` — ⚠️ **placeholder** quotes; replace before launch (section self-hides if empty)

## Design tokens

Everything visual is driven by `src/styles/_tokens.scss` (`:root` custom properties):
colors, fluid type scale, spacing, motion. Dark sections just set `.is-dark`, which
swaps the ink/paper semantic vars. To soften the pure B&W (a common premium move), change
`--c-ink` to `#0a0a0a` and `--c-paper` to a warm white — one edit, site-wide.

## Deploy (static)

`dist/` is fully static. SPA fallback for the `/work/:slug` routes is configured for:

- **Netlify / Cloudflare Pages** → `public/_redirects`
- **Vercel** → `vercel.json`

Build command `npm run build`, output dir `dist`.

## Before launch / next steps

- [ ] Replace placeholder **testimonials** with real attributable quotes
- [ ] Add real **case-study screenshots** (kept fully typographic for now — no stock/AI imagery)
- [ ] Confirm the **availability** line in `site.ts`
- [ ] Add an `og.png` social image in `public/` (referenced by `index.html`)
- [ ] Optional: **prerender** routes to static HTML for max SEO (`vite-react-ssg`)
- [ ] Optional: **DE/EN** toggle (copy is already structured as data)
- [ ] Optional: a single **green availability dot** as the one surgical accent (currently monochrome)
```
