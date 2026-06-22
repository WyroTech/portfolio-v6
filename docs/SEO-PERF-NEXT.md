# wyro.tech — SEO + page-speed: next work

State: **green** (`npm run typecheck` + `npm run build` pass).
Most of the original audit is now shipped; the only deferred item is prerendering (#2).

## Root cause behind most findings
The site is a **pure client-rendered SPA** (Vite + React, `dist/index.html` = `<div id="root"></div>`).
Correct per-route titles/meta/JSON-LD/body only exist **after ~133 KB gz of JS runs** → JS-blind crawlers
(Bing, LinkedIn, Slack, AI crawlers, social unfurls) and your raw `<title>`/`<h1>` signals are weak, and LCP
waits on JS. Prerendering (#2) is the one lever that fixes the bulk of SEO **and** CWV at once — but it's deferred.

## Done
- ✅ **#1 Static `index.html` `<head>`** — keyword-rich B2B/local metadata (interim until prerender lands).
- ✅ **#3 Hero keyword** — hero sub-lead (EN+DE) now reads "…web developer in Deggendorf…" /
  "…Webentwickler in Deggendorf…". H1 kept as the minimalist brand lines by design; the keyword lives in the
  visible sub-paragraph + the new #4 `<h2>`.
- ✅ **#4 Local section** — new `<Local/>` (`id="standort"`, before `<Contact/>`) with a visible `<h2>`
  "Web developer in Deggendorf & Niederbayern." / "Webentwickler in Deggendorf & Niederbayern." and a lead
  paragraph naming Niederbayern/Bayern/worldwide. Reuses `Section` + `SectionHead` (no bespoke CSS).
  Strings in `src/i18n/ui.ts` (`local` block).
- ✅ **#5 FAQPage JSON-LD** — `FAQPage` node added to the `@graph` in `src/pages/Home.tsx`, mapped from
  `data/faq.ts` (conditional spread so it self-hides if the FAQ array empties, matching the section).
- ✅ **#6 German legal routes** — added `/de/impressum` + `/de/datenschutz` (`src/App.tsx`); footer legal
  links are language-correct via `lp()`; legal docs gained `description` + `path`, passed to `<Seo>`.
  (Both remain `noindex` — see note below if you want Impressum indexed for NAP.)
- ✅ **#8 Defer off the critical path** — Vercel `<Analytics/>` + `<SpeedInsights/>` are now `lazy()` +
  mounted on first interaction OR `requestIdleCallback` (timeout fallback); they're split into their own chunks,
  out of the initial JS. Lenis init is likewise deferred to `requestIdleCallback` (reduced-motion guard kept).
- ✅ **`og:image:alt` + `twitter:image:alt`** added to `Seo.tsx` (localized EN/DE) — per-route OG cards keep
  alt text, matching the static head.
- ✅ **Removed the dead `featured` path** — the field set on zero works, plus its branches in `WorkCard.tsx`,
  `SelectedWorks.tsx`, and the `--featured` SCSS (uniform grid was already the decided design).

### Verified live (vite preview + browser, build of 2026-06-22)
`/de`: German title, `html lang=de`, JSON-LD `@graph` = Person/WebSite/ProfessionalService/**FAQPage** (5 Qs,
`url`+`isPartOf` wired), visible `<h2>` "Webentwickler in Deggendorf & Niederbayern.", exactly one `<h1>`, and
**no `</script>` breakout** in the JSON-LD (escape confirmed). `/de/impressum`: correct title, `lang=de`,
`noindex, follow`, canonical `https://wyro.tech/de/impressum`, German content, language-correct back link.

⚠️ **Confirmed issue (feeds #2):** every OG/Twitter/`description` tag is **duplicated** at runtime — the static
English tag from `index.html` (#1) AND helmet's lang-aware one both exist (2× `og:title`, `og:description`,
`og:locale`, `og:image:alt`, … on every route). It's pre-existing (static-head interim vs. client-side helmet),
affects all such tags, and JS-blind unfurlers see only the English static set even on `/de`. See #2 below.

## DEFERRED (revisit) — #2 Prerender/SSG
Biggest lever (LCP −1 to −2.5s on mobile + correct indexing/unfurls for all crawlers). **Deferred this session
by choice** (avoids adding a Chromium build dependency for now).

**Research verdict (version-verified):**
- ❌ **`vite-react-ssg` is a hard blocker** — latest stable 0.9.0 caps peer `vite` at `^7` (no Vite 8/Rolldown)
  and declares `react-router-dom ^6`, not v7. Would need a forced peer override **and** a full entry/route-array
  rewrite. Don't use unless the project ever drops to Vite 7.
- ❌ **`react-snap`** — dead since 2018 (Puppeteer 1.x, React 18/19 hydration breakage). Eliminate.
- ✅ **Custom Puppeteer postbuild — chosen approach when this is picked up.** Zero peer-dep surface (operates on
  built `dist/`, so Vite 8/Rolldown is irrelevant), no source refactor, and `react-helmet-async@3` head output
  (title/meta/canonical/hreflang/JSON-LD) serializes into the captured HTML verbatim.
  - 1st step: `npm i -D puppeteer`; add `"prerender": "node scripts/prerender.mjs"` to run after `vite build`.
  - Script: boot `vite preview`, visit all 16 routes (`/`, `/de`, 7× `/work/<slug>`, 7× `/de/work/<slug>`,
    `/impressum`, `/datenschutz` — pull slugs from `data/works.ts`, don't hardcode), `goto(networkidle0)`,
    wait for `document.title` to be set (confirms Helmet applied), write `dist/<route>/index.html` from
    `outerHTML`.
  - Switch `createRoot` → `hydrateRoot` in `src/main.tsx` so the client hydrates the snapshot.
- 2nd choice: `@prerenderer/prerenderer` + `@prerenderer/renderer-puppeteer` (maintained wrapper, same crawl).
- ⚠️ **Must reconcile the static `<head>` (#1) as part of this.** A Puppeteer `outerHTML` snapshot captures BOTH
  the static `index.html` tags and helmet's injected ones → it would bake the duplicate OG/description/locale
  tags (confirmed above) straight into every prerendered page. Fix one of two ways: (a) strip the helmet-managed
  tags (title, description, all `og:*`/`twitter:*`) out of static `index.html` so only helmet's correct per-route
  tags remain in the snapshot — safe once prerender guarantees real HTML for crawlers; or (b) have the prerender
  script de-dupe each managed tag before writing. Option (a) is cleaner.

## #7 — RESOLVED as "no change"
Dropping `react-helmet-async` for React 19 native `<title>`/`<meta>` hoisting was on the list, but: (a) helmet@3
officially supports React 19 and is needed to capture head into the Puppeteer snapshot for #2; (b) doing it now,
with a static `<head>` already in `index.html`, would risk duplicate tags or strip the crawler-facing head. So
**keep `react-helmet-async`.** The `react-router` core-vs-dom import swap saves negligible bytes — skip.

## Optional polish (not blocking)
- Consider removing `noindex` from `/impressum` (Impressums are commonly indexed and reinforce local NAP/trust).
  If done, reconcile the `/impressum` vs `/de/impressum` canonical (content is German-only) to avoid dup-content.

## Note
Two earlier audit claims were disproven against the code: case studies are NOT duplicate DE/EN
(`works.ts` has a real `de` array), and `CaseStudy.tsx` already passes `path`+`lang` to `<Seo>`, which derives
the `/de` canonical via `dePath()` — German case-study canonicals are correct (a re-flag of a "DE canonical bug"
was checked against `Seo.tsx` and is a false alarm).
