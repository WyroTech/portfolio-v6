# wyro.tech — feedback round 2 (owner review, desktop)

Captured verbatim-in-spirit for the next execution pass. Run as a workflow:
Research/plan where needed → Implement → Verify (build + a11y). Owner reviewed on **desktop**.

## Hero
- **Header text** ("I design & build / websites & web apps.") — owner does **not** like it; **especially the
  German sounds vague**. Rework the two display lines to be sharper/less generic (esp. DE). Keep portfolio +
  services feel. (`src/i18n/ui.ts` hero.lineA/lineB, en+de.)

## Selected Work
- **First project (SAP-Analytics SaaS / the featured card) is too HUGE** — shrink the featured card treatment.
  (`src/components/WorkCard.scss` `.work-card--featured`, `src/sections/SelectedWorks.scss`.)
- **Cards aren't separated enough → hard to scan.** Add more separation/whitespace/visible boundary between
  cards. (`SelectedWorks.scss` grid gap / card borders.)

## Services ("What I build for you.")
- Section is OK, but the **blurb/description text under each title makes it hard to read** — improve
  readability (size/contrast/spacing/length). (`src/sections/Services.scss`, maybe `services.ts` blurbs.)
- **The [NN] numbers are not vertically centered with the title** — align them. (`Services.scss` `.service__head`.)

## Stack — owner likes it; wants MORE
- Add more **tooling** (e.g. **JetBrains**), and more **databases**: **Microsoft SQL Server**, **Elasticsearch
  ("Elastic")**, etc. (`src/data/skills.ts` techCategories; add glyphs in `TechIcon.tsx` or monogram fallback.)
  NOTE: keep truthful — only tools Andreas actually uses. (JetBrains/MSSQL/Elastic implied by owner — confirm.)

## Process ("How it works.")
- Good, but **the right side has empty space / something missing** on desktop. Fill/rebalance the right column
  (the `1fr` track) — e.g. a visual, a summary, or change the grid. (`src/sections/Process.scss` / `Process.tsx`.)

## Portrait (the sliced/broken image)
- Owner wants the **disruption (slice offsets) to be CONTINUOUSLY MOVING/animated until hover** (not static),
  and **on hover: heal AND bring back some COLOR** (reduce grayscale). (`src/sections/About.scss` `.about__slice`
  — add a subtle continuous keyframe drift, pause + un-grayscale on `.about__portrait:hover`.) Respect
  prefers-reduced-motion.

## Timeline / Journey — fine, leave as is.
## FAQ — fine ("why not").
## Contact — owner likes it. Leave.

## Footer
- **Doesn't feel like a footer** — "wide out of nowhere". Wants something **more special / distinctive** in the
  footer (a stronger footer identity — big mark, oversized brand, a statement line, a divider treatment, etc.).
  (`src/components/Footer.tsx` / `Footer.scss`.) Research premium editorial footers.

## Performance
- **First paint > 300ms** (footer colophon, on DEV). Owner wants the page faster. → handled by the
  `portfolio-perf-recheck` workflow (note: dev FCP ≠ production; measure the prod build).

---
## Execution notes
- Most items are CSS/data; the hero + footer are judgement calls → research + propose options.
- Verify gate each time: `npm run typecheck` + `npm run build` + accesslint on `/` and `/de`.
- Tech additions: confirm JetBrains / MSSQL / Elastic are genuinely part of Andreas's stack (truthfulness).
