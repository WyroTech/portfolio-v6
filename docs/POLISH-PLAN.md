# wyro.tech — polish plan (open items)

Documented plan for the remaining work. Intended to be executed as a workflow:
**Research → (this) Plan → Implement → Verify (build + a11y)**. Everything below is
bilingual (`{ en, de }`, formal "Sie" in German), truthful (no invented claims/metrics),
editorial + low-text, and must keep the build green + accesslint at 0 violations and the
existing reduced-motion guards intact.

Run order suggestion: **1 (hero) → 2 (FAQ) → 3 (touch targets) → 4 (print) → 5 (cleanup)**.

---

## 1. Hero wording — make it more direct; "portfolio + services" feel  *(NEW — owner feedback)*

**Problem:** current hero (`src/i18n/ui.ts` → `hero.lineA/lineB/sub`) is
`"Websites, web apps & online shops." / "Designed and built by one developer — from first idea to launch."`
The owner finds it **not direct enough**, and wants it to still read as a **portfolio**
(a person who makes things) **as well as a services** pitch — not purely a service menu.

**Direction (decide in research/plan):**
- Lead more directly with the person + what he does: e.g. a confident first-person or
  named statement ("I'm Andreas — I design and build websites and web apps") balanced with
  the concrete offers. Keep it short (hero is 2 display lines + 1 sub).
- Preserve the concrete, non-tech offers (websites · web apps · online shops) so a buyer
  still instantly gets the service — but frame it as *work he does*, not a catalog.
- Keep SEO value (the offer keywords) and the `role` label ("Frontend Engineer & UX").
- Candidate A (direct/personal): lineA "I design & build" / lineB "websites & web apps." +
  sub naming the range (shops, dashboards, prototypes) and the one-person promise.
- Candidate B (portfolio-forward): lineA "Frontend & UX," / lineB "end to end." + sub that
  says "I'm Andreas — I design and build websites, web apps and online shops, solo."
- **Research:** look at 4–6 top freelance-developer / studio-of-one hero patterns
  (Awwwards, Codrops, personal dev portfolios) that balance *identity (portfolio)* with
  *offer (services)* and feel direct. Pick the sharpest, propose 2 options, implement one.
- Files: `src/i18n/ui.ts` (hero en+de, maybe `meta.homeTitle/Description` to match).

## 2. FAQ is too technical  *(owner feedback)*

**Problem:** `src/data/faq.ts` answers use insider terms a non-technical client doesn't parse —
"commit", "lock-in", "fixed-scope proposal", "backend/infra", "NDA".

**Direction:**
- Rewrite all Q&A in plain, reassuring, jargon-free language a non-tech buyer understands.
- **Research:** FAQ patterns for freelance web devs/agencies serving non-technical clients —
  the questions real buyers ask (cost, timeline, ownership/"is it mine", "can one person do
  it", "what if you disappear", "do I need to understand the tech") and how to phrase plainly.
- Keep it truthful and concise; keep formal "Sie" in `de`; keep the `Qa` shape + `Localized` export.
- Example de-jargon: "from the first commit" → "it's yours from day one"; "no lock-in to any
  tool" → "nothing is tied to me — you can hand it to anyone later".
- Files: `src/data/faq.ts`.

## 3. Mobile touch targets < 44px  *(from responsive VT)*

**Standard:** WCAG 2.5.5 (AAA) = 44×44 CSS px; Apple HIG ≈ 44pt; Material ≈ 48dp. Use **≥44px**.
Already fixed: `.nav__toggle` → 44px.

**Still to fix:**
- `src/components/Footer.scss` — `.footer__col a` (index/social, ~26px), `.footer__legal a`
  and `.footer__top` (~12px): add `padding-block` or `min-height: 44px; display:inline-flex;
  align-items:center`. The footer base stacks to a column on mobile so extra vertical padding is safe.
- `src/sections/Contact.scss` `.contact__email` and `src/components/Footer.scss` `.footer__cta`
  (~37px): small `padding-block` to reach ~44px without changing type size.

## 4. Print / no-scroll reveal escape  *(robustness; mostly a capture/print artifact)*

Scroll-reveal blocks render blank when printed (observer never fires without scrolling).
`useReveal` is already hardened (reveals on no-IO / in-view-on-mount). Add a belt-and-braces
`@media print { ... opacity:1 !important; transform:none !important }` for the initial-hidden
states in: `src/components/ui/Reveal.scss` (`.reveal`), `src/sections/Process.scss`
(`.proc__node`, rail `::after`), `src/sections/Capabilities.scss` (any reveal-gated grid item).

## 5. Remove the test-only Playwright devDependency  *(cleanup)*

`playwright` was added only to run the responsive screenshot test. Remove it:
`npm un -D playwright` (updates `package.json` + lockfile). No source changes.

---

## Already done (do not redo)
- `useReveal` hardened (no-IO / in-view-on-mount / reduced-motion → reveal).
- Nav hamburger → 44px touch target.
- Portrait slice seams fixed (bands overlap; no white hairlines).
- All three prior workflows landed: German translation, reposition/declutter, micro-interactions
  (magnetic CTA, scroll-progress, scroll-spy nav, masked hero rise, clip-path text-splits,
  work-card lift, services ledger-hover, etc.). Build green, a11y 0 violations.

## Execution notes
- Implement files are disjoint per item, so steps 2–5 can run in parallel; step 1 (hero) is a
  judgement call — propose 2 options, pick one.
- Verify gate every time: `npm run typecheck` + `npm run build` + accesslint on `/` and `/de`.
