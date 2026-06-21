import { useEffect, useRef } from 'react'

/**
 * Magnetic pull toward the cursor for premium CTAs.
 * Writes `--mx` / `--my` CSS vars (in px, clamped) on the element so the pull
 * stays GPU-only via a `transform` in CSS — no React re-render per pointermove.
 *
 * Disabled when the user prefers reduced motion or has no fine pointer
 * (mirrors useLenis/useReveal). On those devices the element stays static and
 * the existing hover background-swap/:focus-visible still work.
 *
 * @param strength  pull factor 0–1 applied to the cursor offset (default .22)
 * @param max       clamp for the offset in px (default 8)
 */
export function useMagnetic<T extends HTMLElement = HTMLElement>(strength = 0.22, max = 8) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return

    let frame = 0
    const clamp = (v: number) => Math.max(-max, Math.min(max, v))

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      const dx = e.clientX - (rect.left + rect.width / 2)
      const dy = e.clientY - (rect.top + rect.height / 2)
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        el.style.setProperty('--mx', `${clamp(dx * strength)}px`)
        el.style.setProperty('--my', `${clamp(dy * strength)}px`)
      })
    }

    const reset = () => {
      cancelAnimationFrame(frame)
      el.style.setProperty('--mx', '0px')
      el.style.setProperty('--my', '0px')
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', reset)
    return () => {
      cancelAnimationFrame(frame)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', reset)
    }
  }, [strength, max])

  return ref
}
