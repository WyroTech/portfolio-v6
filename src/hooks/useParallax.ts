import { useEffect, useRef } from 'react'

/**
 * Scroll-linked parallax drift for media and large blocks.
 * Writes a single `--py` CSS var (in px) on the element from its vertical
 * position in the viewport, so the shift stays GPU-only via a `transform` in
 * CSS — no React re-render per scroll. One getBoundingClientRect is read
 * inside the rAF (read-then-write), throttled to ~33ms, and updates are
 * skipped while the element is offscreen (IntersectionObserver).
 *
 * Disabled when the user prefers reduced motion: no listeners attach, `--py`
 * is never set, and the element keeps its resting position. Reads layout
 * directly, so it stays correct under Lenis smooth scroll with no extra wiring.
 *
 * @param maxPx  peak displacement in px at the viewport edges (default 24)
 */
export function useParallax<T extends HTMLElement = HTMLElement>(maxPx = 24) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    let frame = 0
    let last = 0
    let visible = true
    const clamp = (v: number) => Math.max(-1, Math.min(1, v))

    const update = (now: number) => {
      if (!visible) {
        frame = 0
        return
      }
      if (now - last < 33) {
        frame = requestAnimationFrame(update)
        return
      }
      frame = 0
      last = now
      const rect = el.getBoundingClientRect()
      const viewportCenter = window.innerHeight / 2
      const norm = clamp((rect.top + rect.height / 2 - viewportCenter) / viewportCenter)
      el.style.setProperty('--py', `${(norm * maxPx).toFixed(2)}px`)
    }

    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(update)
    }

    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0].isIntersecting
        if (visible && !frame) frame = requestAnimationFrame(update)
      },
      { threshold: 0 },
    )
    io.observe(el)

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    return () => {
      if (frame) cancelAnimationFrame(frame)
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [maxPx])

  return ref
}
