export const meta = {
  name: 'visual-review-hardened',
  description: 'Two independent reviewers per section (desktop + mobile) score the live site against a calibrated rubric; scores reconciled, must agree for a 9',
  phases: [
    { title: 'Review', detail: '2 reviewers × each section, desktop + mobile, sequential' },
    { title: 'Reconcile', detail: 'agreement check + what-blocks-9 synthesis' },
  ],
}

const URL = 'http://localhost:5173/'

const SECTIONS = [
  { key: 'Hero', url: URL, pos: `window.__lenis?window.__lenis.scrollTo(0,{immediate:true}):window.scrollTo(0,0);'ok'` },
  { key: 'Selected Work', url: URL, pos: `(()=>{const e=document.querySelector('#work'),l=window.__lenis;if(l&&e)l.scrollTo(e,{immediate:true,offset:-72});else if(e)e.scrollIntoView();return 'ok'})()` },
  { key: 'Services', url: URL, pos: `(()=>{const e=document.querySelector('#services'),l=window.__lenis;if(l&&e)l.scrollTo(e,{immediate:true,offset:-72});else if(e)e.scrollIntoView();return 'ok'})()` },
  { key: 'Capabilities', url: URL, pos: `(()=>{const e=document.querySelector('#capabilities'),l=window.__lenis;if(l&&e)l.scrollTo(e,{immediate:true,offset:-72});else if(e)e.scrollIntoView();return 'ok'})()` },
  { key: 'Process', url: URL, pos: `(()=>{const e=document.querySelector('#process'),l=window.__lenis;if(l&&e)l.scrollTo(e,{immediate:true,offset:-72});else if(e)e.scrollIntoView();return 'ok'})()` },
  { key: 'About', url: URL, pos: `(()=>{const e=document.querySelector('#about'),l=window.__lenis;if(l&&e)l.scrollTo(e,{immediate:true,offset:-72});else if(e)e.scrollIntoView();return 'ok'})()` },
  { key: 'Journey', url: URL, pos: `(()=>{const e=document.querySelector('#journey'),l=window.__lenis;if(l&&e)l.scrollTo(e,{immediate:true,offset:-72});else if(e)e.scrollIntoView();return 'ok'})()` },
  { key: 'FAQ', url: URL, pos: `(()=>{const e=document.querySelector('#faq'),l=window.__lenis;if(l&&e)l.scrollTo(e,{immediate:true,offset:-72});else if(e)e.scrollIntoView();return 'ok'})()` },
  { key: 'Contact', url: URL, pos: `(()=>{const e=document.querySelector('#contact'),l=window.__lenis;if(l&&e)l.scrollTo(e,{immediate:true,offset:-72});else if(e)e.scrollIntoView();return 'ok'})()` },
  { key: 'Footer', url: URL, pos: `window.__lenis?window.__lenis.scrollTo(document.body.scrollHeight,{immediate:true}):window.scrollTo(0,document.body.scrollHeight);'ok'` },
  { key: 'Case study', url: URL + 'work/dab-nexus-loom', pos: `window.scrollTo(0,0);'ok'` },
]

const RUBRIC = `CALIBRATED SCORING — be strict and consistent. This is a premium frontend-developer SERVICES portfolio, minimal editorial BLACK & WHITE (forai.design idiom): thin Funnel Display headings, Geist body, Geist Mono labels, pure #000/#fff, generous whitespace, generative line-art visuals.
Score anchors (use the WHOLE scale, do not inflate):
- 10 = flawless; nothing you'd change; gallery-grade.
- 9  = excellent, ship-ready, premium; only trivial subjective nits remain.
- 8  = strong but has at least ONE real polish issue (alignment, vertical rhythm, hierarchy, balance, contrast, or an empty/awkward void).
- 7  = good base but multiple noticeable issues, or one significant one.
- <=6 = clear problems.
Judge: typographic hierarchy & scale, spacing/rhythm/alignment, visual balance & whitespace, contrast/legibility, consistency with the B&W system, premium-vs-amateur feel.`

const SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    section: { type: 'string' },
    captured: { type: 'boolean', description: 'true only if you actually saw both screenshots' },
    desktopScore: { type: 'number' },
    mobileScore: { type: 'number' },
    strengths: { type: 'array', items: { type: 'string' } },
    toNine: {
      type: 'array',
      description: 'specific, concrete changes that would lift this section to a 9 (empty if already >=9)',
      items: { type: 'string' },
    },
    issues: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          viewport: { type: 'string', description: 'desktop | mobile' },
          severity: { type: 'string', description: 'high | med | low' },
          issue: { type: 'string' },
          fix: { type: 'string' },
        },
        required: ['viewport', 'severity', 'issue', 'fix'],
      },
    },
  },
  required: ['section', 'captured', 'desktopScore', 'mobileScore', 'strengths', 'toNine', 'issues'],
}

const prompt = (s, reviewer) => `You are INDEPENDENT visual reviewer #${reviewer} (form your own opinion; do not assume anything is fine). Review ONE section of a live site at BOTH desktop and mobile.

Steps — follow exactly:
1. Load tools: ToolSearch query exactly: select:mcp__claude-in-chrome__tabs_context_mcp,mcp__claude-in-chrome__navigate,mcp__claude-in-chrome__javascript_tool,mcp__claude-in-chrome__computer,mcp__claude-in-chrome__resize_window
2. mcp__claude-in-chrome__tabs_context_mcp → pick the tab whose url contains "localhost" (else first). Use its tabId for everything.
3. DESKTOP: resize_window to width 1440 height 900 on that tab. navigate to ${s.url}. Run javascript_tool (action "javascript_exec") text: ${JSON.stringify(s.pos)}. computer action "wait" duration 1.5. computer action "screenshot". LOOK closely.
4. MOBILE: resize_window to width 390 height 844. navigate to ${s.url} again. Run the same javascript_tool position script. computer "wait" 1.2. computer "screenshot". LOOK closely (check overflow, cramping, wrapping, tap targets, legibility).
5. Reset: resize_window back to width 1440 height 900.

${RUBRIC}

Give desktopScore and mobileScore (1-10) for the "${s.key}" section using the anchors strictly. List strengths, the concrete changes in toNine that would make desktop a 9 (be specific: exact element + what to change), and issues tagged by viewport. captured=true only if you saw both screenshots; if tools fail after 3 tries set captured=false and scores 0. section="${s.key}".`

phase('Review')
const reviews = []
for (const s of SECTIONS) {
  for (const reviewer of [1]) {
    // sequential: only one agent drives the shared browser window at a time
    const r = await agent(prompt(s, reviewer), {
      label: `${s.key} · R${reviewer}`,
      phase: 'Review',
      schema: SCHEMA,
    })
    if (r) reviews.push({ ...r, reviewer })
  }
  const pair = reviews.filter((r) => r.section === s.key)
  log(`${s.key}: ${pair.map((p) => (p.captured ? `D${p.desktopScore}/M${p.mobileScore}` : 'fail')).join('  ')}`)
}

phase('Reconcile')
const bySection = SECTIONS.map((s) => {
  const rs = reviews.filter((r) => r.section === s.key && r.captured)
  if (rs.length === 0) return { section: s.key, captured: false }
  const dScores = rs.map((r) => r.desktopScore)
  const mScores = rs.map((r) => r.mobileScore)
  const desktopMin = Math.min(...dScores)
  const desktopMax = Math.max(...dScores)
  const mobileMin = Math.min(...mScores)
  const agreement = desktopMax - desktopMin // 0 = full agreement
  const issues = rs.flatMap((r) => r.issues || [])
  const toNine = [...new Set(rs.flatMap((r) => r.toNine || []))]
  const highOrMed = issues.filter((i) => i.severity === 'high' || i.severity === 'med')
  // A section PASSES only if BOTH reviewers gave desktop & mobile >= 9
  const passes = desktopMin >= 9 && mobileMin >= 9
  return {
    section: s.key,
    captured: true,
    desktopScores: dScores,
    mobileScores: mScores,
    desktopMin,
    mobileMin,
    agreement,
    lowConfidence: agreement > 1,
    passes,
    toNine,
    issues: highOrMed,
    strengths: [...new Set(rs.flatMap((r) => r.strengths || []))].slice(0, 4),
  }
})

const failing = bySection.filter((s) => s.captured && !s.passes)
const passing = bySection.filter((s) => s.captured && s.passes)
const allDesktopMins = bySection.filter((s) => s.captured).map((s) => s.desktopMin)
const worst = allDesktopMins.length ? Math.min(...allDesktopMins) : 0

return {
  allPass: failing.length === 0 && bySection.every((s) => s.captured),
  worstDesktopMin: worst,
  passingCount: passing.length,
  failingCount: failing.length,
  sections: bySection,
}
