import { useEffect, useRef } from 'react'
import { hashSeed, rngFromSeed } from '../../lib/prng'
import { buildLineArt, LINE_KINDS, type VisualKind } from '../../lib/lineArt'
import './Visual.scss'

export type { VisualKind }

const SVGNS = 'http://www.w3.org/2000/svg'

interface VisualProps {
  seed: string
  kind?: VisualKind
  className?: string
  /** drift speed multiplier */
  speed?: number
}

/**
 * Deterministic generative line art. Renders SVG paths imperatively and
 * animates a subtle drift via rAF (DOM updates only, no React re-renders).
 * Paused when offscreen; static for prefers-reduced-motion. Pure
 * currentColor, so it inverts on dark surfaces and work-card hover.
 */
export default function Visual({ seed, kind, className = '', speed = 1 }: VisualProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const groupRef = useRef<SVGGElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const resolvedKind = kind ?? LINE_KINDS[hashSeed(seed) % LINE_KINDS.length]

  useEffect(() => {
    const wrap = wrapRef.current
    const group = groupRef.current
    const svg = svgRef.current
    if (!wrap || !group || !svg) return

    const art = buildLineArt(resolvedKind, rngFromSeed(seed))
    svg.setAttribute('preserveAspectRatio', `xMidYMid ${art.fit}`)

    group.replaceChildren()
    const paths = art.strokes.map((s) => {
      const path = document.createElementNS(SVGNS, 'path')
      path.setAttribute('fill', 'none')
      path.setAttribute('stroke', 'currentColor')
      path.setAttribute('stroke-width', s.width.toFixed(2))
      path.setAttribute('stroke-linecap', 'round')
      path.setAttribute('stroke-linejoin', 'round')
      if (s.opacity < 1) path.setAttribute('opacity', s.opacity.toFixed(2))
      group.appendChild(path)
      return path
    })

    const draw = (t: number) => {
      const ds = art.frame(t)
      for (let i = 0; i < paths.length; i++) paths[i].setAttribute('d', ds[i])
    }

    draw(0)

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    let raf = 0
    let last = 0
    let t = 0
    let visible = true

    const loop = (now: number) => {
      raf = 0
      if (!visible) return
      if (now - last >= 33) {
        const dt = last ? Math.min(now - last, 100) : 16
        last = now
        t += (dt / 1000) * 0.6 * speed
        draw(t)
      }
      raf = requestAnimationFrame(loop)
    }

    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0].isIntersecting
        if (visible && !raf) raf = requestAnimationFrame(loop)
      },
      { threshold: 0 },
    )
    io.observe(wrap)
    raf = requestAnimationFrame(loop)

    return () => {
      if (raf) cancelAnimationFrame(raf)
      io.disconnect()
    }
  }, [resolvedKind, seed, speed])

  return (
    <div ref={wrapRef} className={`visual visual--${resolvedKind} ${className}`} aria-hidden="true">
      <svg ref={svgRef} viewBox="0 0 100 100" role="presentation">
        <g ref={groupRef} />
      </svg>
    </div>
  )
}
