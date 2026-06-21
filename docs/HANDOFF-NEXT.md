# wyro.tech — continuation handover (next session)

Pick up here. State is **green**: `npm run typecheck` + `npm run build` pass, accesslint **0 violations**
on `/` and `/de`, bundle ~**139 KB gzip** (code-split, fonts optimized). Dev: `npm run dev` (5173/5174).
Read also: `docs/FEEDBACK-ROUND-2.md` (the next work), `docs/POLISH-PLAN.md` (done), `HANDOFF.md` (deploy).

## Shipped this session (do not redo)
- Bilingual **EN/DE** route-based (`/`, `/de`) + hreflang; copy in `src/i18n/ui.ts` + `src/data/*` as `{ en, de }`.
- Repositioned to **plain, non-tech offers** (custom websites, web apps, online shops, prototypes); Services = 6
  concrete cards; hero reworded to direct "I design & build…" (`ui.ts` hero).
- Email → `a@wyro.tech`; **GitHub link** added (`site.ts` social).
- **Categorized tech stack** (Frontend / AI / Backend & APIs / Cloud & DevOps / Tooling) in `src/data/skills.ts`.
- **Micro-interactions**: magnetic nav CTA, scroll-progress bar, scroll-spy nav underline, masked hero line-rise,
  clip-path text-splits (footer/contact), work-card lift, services ledger-hover, tech-icon underline. All
  reduced-motion-guarded.
- **Process** = animated connected path (numbered nodes + drawn rail). **Portrait** = sliced/“broken” photo
  (heals on hover). **Header inverts** over dark sections. **Nav hamburger 44px**, `useReveal` hardened, print
  escape, portrait seams fixed.
- **Perf**: the footer "first paint > 300ms" is a **DEV-SERVER ARTIFACT** — production is much faster. One real
  win applied: a `vite.config.ts` plugin preloads the hero display-font woff2. No real speed problem.
- **FAQ** de-jargoned to plain buyer language.

## ⚠️ PENDING DECISION (owner) — case studies
The GitHub workflow added **2 self-referential entries** to `src/data/works.ts` (+ `public/sitemap.xml`):
`wyro-tech-portfolio` and `wyrotech-astro-portfolio` — these are **prior versions of this very portfolio**.
**RECOMMEND: remove both** (and their sitemap `<url>` blocks for `/work/...` + `/de/work/...`). The workflow's
own review said to skip them; they got added anyway. KEEP the good change: `robocar-4` was enriched with a real
`link: { View on GitHub → github.com/WyroTech/RoboCar }` + 2 verified README facts. Public GitHub had no other
genuine standalone project.

## NEXT WORK — `docs/FEEDBACK-ROUND-2.md` (owner review, desktop)
Execute as a workflow (research hero + footer; implement the rest; verify). Highlights:
1. **Hero header** — owner dislikes current wording, **esp. the German is vague**. Rework lineA/lineB (en+de).
2. **Featured work card too HUGE** (`WorkCard.scss .work-card--featured`); **cards need more separation** (scan-ability).
3. **Services**: blurb text hard to read; **[NN] numbers not vertically centered** with the title.
4. **Stack: add more** — JetBrains, MS SQL Server, Elasticsearch (CONFIRM these are truthfully Andreas's stack first).
5. **Process** right column empty on desktop — fill/rebalance.
6. **Portrait**: owner wants the slice disruption **continuously animated until hover**, and **on hover heal AND
   add some COLOR back** — NOTE: color breaks the strict B&W system; confirm with owner before shipping.
7. **Footer** doesn't feel like a footer ("wide out of nowhere") — give it a **distinctive identity** (research
   premium editorial footers). Liked + leave: timeline, FAQ, contact.

## Open questions to confirm with owner
- Portrait **color on hover** (breaks B&W) — yes/no?
- Stack additions (**JetBrains / MS SQL Server / Elastic**) — are they genuinely part of your stack?

## Gotchas
- Inline `Workflow` scripts must be **plain JS** — use **string concatenation, no JSON schemas** (schemas/template
  pitfalls caused parse errors). Schema-free agents returning text work reliably.
- `playwright` was removed (was test-only). Responsive testing needs headless Playwright (extension resize
  doesn't reflow the page).
- Verify gate every change: `npm run typecheck` + `npm run build` + accesslint on `/` and `/de`.
