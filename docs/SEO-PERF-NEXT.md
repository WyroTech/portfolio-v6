# wyro.tech — SEO + page-speed: next work

State: **green** (`npm run typecheck` + `npm run build` pass; accesslint 0 on `/` and `/de`).
Branch `polish/b2b-reposition-seo`. Everything below is from the `seo-pagespeed-audit` workflow.

## Root cause behind most findings
The site is a **pure client-rendered SPA** (Vite + React, `dist/index.html` = `<div id="root"></div>`).
Correct per-route titles/meta/JSON-LD/body only exist **after ~132 KB gz of JS runs** → JS-blind crawlers
(Bing, LinkedIn, Slack, AI crawlers, social unfurls) and your raw `<title>`/`<h1>` signals are weak, and LCP
waits on JS. Prerendering fixes the bulk of SEO **and** CWV at once.

## Done this session
- ✅ **#1 Static `index.html` `<head>`** updated to keyword-rich B2B/local metadata (title/desc/OG/Twitter/alt).
  "Deggendorf" now appears 8× in `dist/index.html`. (Interim until prerender lands.)

## CRITICAL (do first)
- **#2 Add prerender/SSG** — biggest lever (LCP −1 to −2.5s on mobile + correct indexing/unfurls for all
  crawlers). Use **`vite-react-ssg`** (react-helmet-async already wired) or `react-snap` as a `postbuild`.
  Emit static HTML per route: `/`, `/de`, each `/work/<slug>` (EN+DE), `/impressum`, `/datenschutz`.
- **#3 H1 has zero target keywords** — Hero H1 is "One developer. / Design & code." Work the primary keyword
  into the H1 or a visible sub-line, e.g. DE "Webentwickler in Deggendorf — B2B-Web-Apps, Dashboards & SaaS."
  Edit `src/i18n/ui.ts` hero strings (DE+EN); render in `src/sections/Hero.tsx`.

## HIGH
- **#4 No "Deggendorf/Niederbayern" in visible body prose** (only micro-labels + JSON-LD). Add a local section
  (`src/sections/`, `id="standort"`) with an `<h2>` containing "Webentwickler Deggendorf" + "Niederbayern".
- **#5 No `FAQPage` structured data** despite a real FAQ — add a `FAQPage` node to the `@graph` in
  `src/pages/Home.tsx` mapping `faq.ts` → `mainEntity[{Question, acceptedAnswer{Answer}}]`. Free rich result.
- **#6 German legal pages render `lang="en"` and have no `/de` routes** — add `/de/impressum` + `/de/datenschutz`
  (or force `lang="de"` for legal), point footer to the language-correct path, give each a real description;
  consider removing `noindex` from Impressum. Files: `src/App.tsx`, `src/pages/LegalPage.tsx`, footer.
- **#7 `react-vendor` 73 KB gz (~55% of initial JS)** — import router from `react-router` (core) not
  `react-router-dom`; consider dropping `react-helmet-async` for React 19 native `<title>`/`<meta>` hoisting in
  `src/components/Seo.tsx` (~12–20 KB gz off the critical path). Reconcile with #2 if adopting vite-react-ssg.

## MEDIUM
- **#8 Defer off the critical path** — `lazy()`+`Suspense` the Vercel `<Analytics/>` + `<SpeedInsights/>`;
  lazy-init Lenis after `requestIdleCallback`/first interaction (keep reduced-motion guard). File: `src/App.tsx`,
  `src/hooks/useLenis.ts`.

## Note
Two audit claims were disproven against the code and dropped: case studies are NOT duplicate DE/EN
(works.ts has a real `de` array), and `CaseStudy.tsx` already passes `path`+`lang` to `<Seo>` (canonical/hreflang
correct post-JS). Full report: workflow `seo-pagespeed-audit` output.
