import { range, rangeInt } from './prng'

export type VisualKind = 'flow' | 'harmonograph' | 'contours' | 'waves' | 'ripple'
export const LINE_KINDS: VisualKind[] = ['flow', 'harmonograph', 'contours', 'waves', 'ripple']

export interface Stroke {
  width: number
  opacity: number
}

export interface LineArt {
  strokes: Stroke[]
  /** how the 100x100 art fits its container */
  fit: 'slice' | 'meet'
  /** returns one SVG path `d` per stroke for time `t` */
  frame: (t: number) => string[]
}

type Rng = () => number

const TAU = Math.PI * 2

/** Build an SVG path from [x,y] points (rounded), optionally closed. */
function toPath(points: number[][], close = false): string {
  let d = ''
  for (let i = 0; i < points.length; i++) {
    d += `${i === 0 ? 'M' : 'L'}${points[i][0].toFixed(2)} ${points[i][1].toFixed(2)} `
  }
  return close ? d + 'Z' : d.trimEnd()
}

/** Smooth a polyline into a silky cubic-bezier path (Catmull-Rom → bezier). */
function smoothPath(pts: number[][]): string {
  if (pts.length < 3) return toPath(pts)
  let d = `M${pts[0][0].toFixed(2)} ${pts[0][1].toFixed(2)} `
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[i + 2] ?? p2
    const c1x = p1[0] + (p2[0] - p0[0]) / 6
    const c1y = p1[1] + (p2[1] - p0[1]) / 6
    const c2x = p2[0] - (p3[0] - p1[0]) / 6
    const c2y = p2[1] - (p3[1] - p1[1]) / 6
    d += `C${c1x.toFixed(2)} ${c1y.toFixed(2)} ${c2x.toFixed(2)} ${c2y.toFixed(2)} ${p2[0].toFixed(2)} ${p2[1].toFixed(2)} `
  }
  return d.trimEnd()
}

/* ------------------------------------------------------------------ *
 * waves — stacked flowing sine ribbons, phase-shifted and interfering
 * ------------------------------------------------------------------ */
function buildWaves(rng: Rng): LineArt {
  const count = rangeInt(rng, 16, 26)
  const a1 = range(rng, 3, 7)
  const a2 = range(rng, 1.5, 4)
  const f1 = range(rng, 1, 2.6)
  const f2 = range(rng, 2.2, 4.5)
  const phasePerLine = range(rng, 0.22, 0.5)
  const drift = range(rng, 0.7, 1.3)
  const samples = 40

  const strokes: Stroke[] = Array.from({ length: count }, () => ({
    width: range(rng, 0.32, 0.62),
    opacity: range(rng, 0.45, 1),
  }))

  const frame = (t: number) => {
    const out: string[] = []
    for (let i = 0; i < count; i++) {
      const y0 = ((i + 0.5) * 100) / count
      const lp = i * phasePerLine
      const pts: number[][] = []
      for (let s = 0; s <= samples; s++) {
        const x = (s / samples) * 100
        const u = x / 100
        const y =
          y0 +
          a1 * Math.sin(u * TAU * f1 + lp + t * drift) +
          a2 * Math.sin(u * TAU * f2 - t * drift * 0.7 + lp * 0.5)
        pts.push([x, y])
      }
      out.push(toPath(pts))
    }
    return out
  }

  return { strokes, fit: 'slice', frame }
}

/* ------------------------------------------------------------------ *
 * flow — strokes advecting along a pseudo-noise vector field
 * ------------------------------------------------------------------ */
function buildFlow(rng: Rng): LineArt {
  // even, jittered grid seeding over an over-scanned area → no clumps or voids
  const cols = rangeInt(rng, 8, 10)
  const rows = rangeInt(rng, 7, 9)
  const steps = rangeInt(rng, 18, 24)
  const stepLen = range(rng, 2.8, 3.6)
  // low frequencies → the field varies gently → long, calm, flowing curves
  const f1 = range(rng, 0.007, 0.013)
  const f2 = range(rng, 0.007, 0.013)
  const f3 = range(rng, 0.006, 0.012)
  const f4 = range(rng, 0.006, 0.012)
  // modest swirl + a dominant base direction → coherent, designed flow
  const swirl = range(rng, 0.55, 0.85)
  const drift = range(rng, 0.5, 0.85)
  const baseAngle = range(rng, 0, TAU)

  const seeds: { x: number; y: number }[] = []
  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows; r++) {
      seeds.push({
        x: -14 + ((c + 0.5) / cols) * 128 + range(rng, -4, 4),
        y: -14 + ((r + 0.5) / rows) * 128 + range(rng, -4, 4),
      })
    }
  }

  // consistent, fine weight — no jarring thick/thin mix
  const strokes: Stroke[] = seeds.map(() => ({
    width: range(rng, 0.3, 0.45),
    opacity: range(rng, 0.5, 0.85),
  }))

  const frame = (t: number) => {
    return seeds.map((seed) => {
      let { x, y } = seed
      const pts: number[][] = [[x, y]]
      for (let s = 0; s < steps; s++) {
        const angle =
          baseAngle +
          (Math.sin(x * f1 + y * f2 + t * drift) +
            Math.cos(x * f3 - y * f4 + t * drift * 0.6)) *
            Math.PI *
            swirl
        x += Math.cos(angle) * stepLen
        y += Math.sin(angle) * stepLen
        pts.push([x, y])
      }
      return smoothPath(pts)
    })
  }

  return { strokes, fit: 'slice', frame }
}

/* ------------------------------------------------------------------ *
 * harmonograph — looping parametric pendulum curves
 * ------------------------------------------------------------------ */
function buildHarmonograph(rng: Rng): LineArt {
  const lines = rangeInt(rng, 1, 2)
  const samples = 520
  const cycles = range(rng, 1.7, 2.6)

  interface Pen {
    ax1: number
    ax2: number
    ay1: number
    ay2: number
    fx1: number
    fx2: number
    fy1: number
    fy2: number
    px: number
    py: number
    dx: number
    dy: number
  }

  const pens: Pen[] = Array.from({ length: lines }, () => ({
    ax1: range(rng, 27, 34),
    ax2: range(rng, 3, 8),
    ay1: range(rng, 27, 34),
    ay2: range(rng, 3, 8),
    // simple, near-harmonic frequency ratios → clean Lissajous, not a tangle
    fx1: rangeInt(rng, 1, 2) + range(rng, -0.02, 0.02),
    fx2: rangeInt(rng, 2, 3) + range(rng, -0.02, 0.02),
    fy1: rangeInt(rng, 1, 2) + range(rng, -0.02, 0.02),
    fy2: rangeInt(rng, 2, 3) + range(rng, -0.02, 0.02),
    px: range(rng, 0, TAU),
    py: range(rng, 0, TAU),
    // strong damping → the curve decays into an elegant inward spiral
    dx: range(rng, 1.9, 3.1),
    dy: range(rng, 1.9, 3.1),
  }))

  const strokes: Stroke[] = pens.map(() => ({
    width: range(rng, 0.4, 0.7),
    opacity: range(rng, 0.7, 1),
  }))

  const frame = (t: number) => {
    return pens.map((p) => {
      const pts: number[][] = []
      for (let i = 0; i <= samples; i++) {
        const s = i / samples
        const env1 = Math.exp(-p.dx * s)
        const env2 = Math.exp(-p.dy * s)
        const x =
          50 +
          p.ax1 * Math.sin(p.fx1 * cycles * TAU * s + p.px + t * 0.6) * env1 +
          p.ax2 * Math.sin(p.fx2 * cycles * TAU * s + p.px * 1.4) * env1
        const y =
          50 +
          p.ay1 * Math.sin(p.fy1 * cycles * TAU * s + p.py + t * 0.5) * env2 +
          p.ay2 * Math.sin(p.fy2 * cycles * TAU * s + p.py * 1.4) * env2
        pts.push([x, y])
      }
      return toPath(pts)
    })
  }

  return { strokes, fit: 'meet', frame }
}

/* ------------------------------------------------------------------ *
 * contours — nested wavy closed loops (topographic)
 * ------------------------------------------------------------------ */
function buildContours(rng: Rng): LineArt {
  const loops = rangeInt(rng, 8, 13)
  const cx = range(rng, 40, 60)
  const cy = range(rng, 40, 60)
  const m = rangeInt(rng, 3, 6)
  const m2 = rangeInt(rng, 1, 3)
  const baseWob = range(rng, 2, 4)
  const maxR = range(rng, 40, 50)
  const phasePerLoop = range(rng, 0.25, 0.55)
  const samples = 64

  const strokes: Stroke[] = Array.from({ length: loops }, () => ({
    width: range(rng, 0.35, 0.62),
    opacity: range(rng, 0.45, 1),
  }))

  const frame = (t: number) => {
    const out: string[] = []
    for (let i = 1; i <= loops; i++) {
      const r0 = (i / loops) * maxR
      const wob = baseWob * (0.6 + i / loops)
      const lp = i * phasePerLoop
      const pts: number[][] = []
      for (let s = 0; s <= samples; s++) {
        const th = (s / samples) * TAU
        const r =
          r0 +
          wob * Math.sin(m * th + lp + t) +
          wob * 0.5 * Math.cos(m2 * th - t * 0.6 + lp)
        pts.push([cx + r * Math.cos(th), cy + r * Math.sin(th)])
      }
      out.push(toPath(pts, true))
    }
    return out
  }

  return { strokes, fit: 'meet', frame }
}

/* ------------------------------------------------------------------ *
 * ripple — concentric rings emanating from a source, like sound/voice
 * ------------------------------------------------------------------ */
function buildRipple(rng: Rng): LineArt {
  const count = rangeInt(rng, 7, 10)
  const cx = range(rng, 28, 46)
  const cy = range(rng, 44, 56)
  const gap = range(rng, 9, 12)
  const amp = range(rng, 2.4, 4.4)
  const speed = range(rng, 0.6, 1)
  const segs = 80

  // outer rings are fainter — the sound dissipating as it travels out
  const strokes: Stroke[] = Array.from({ length: count }, (_, i) => ({
    width: range(rng, 0.4, 0.7),
    opacity: range(rng, 0.55, 1) * (1 - (i / count) * 0.7),
  }))

  const frame = (t: number) => {
    const out: string[] = []
    for (let i = 0; i < count; i++) {
      // phase offset per ring makes a pulse travel outward through the rings
      const r = (i + 1) * gap + amp * Math.sin(t * speed - i * 0.7)
      const pts: number[][] = []
      for (let s = 0; s <= segs; s++) {
        const a = (s / segs) * TAU
        pts.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r])
      }
      out.push(toPath(pts, true))
    }
    return out
  }

  return { strokes, fit: 'slice', frame }
}

const BUILDERS: Record<VisualKind, (rng: Rng) => LineArt> = {
  flow: buildFlow,
  harmonograph: buildHarmonograph,
  contours: buildContours,
  waves: buildWaves,
  ripple: buildRipple,
}

export function buildLineArt(kind: VisualKind, rng: Rng): LineArt {
  return BUILDERS[kind](rng)
}
