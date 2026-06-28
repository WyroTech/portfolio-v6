import { useEffect, useRef } from 'react'

/**
 * Count a numeral up from 0 to `target` once it scrolls into view.
 * Returns a ref to attach to a numeric text element.
 * Renders the final value immediately when the user prefers reduced motion
 * or when IntersectionObserver is unavailable.
 */
export function useCountUp<T extends HTMLElement = HTMLElement>(target: number) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // Skip the animation when motion is reduced or IntersectionObserver is
    // unavailable — land on the final value straight away.
    if (prefersReduced || typeof IntersectionObserver === 'undefined') {
      el.textContent = String(target)
      return
    }

    let raf = 0
    // expo-out — matches the codebase --dur-slow / --ease-out feel.
    const ease = (t: number) => 1 - Math.pow(2, -10 * t)

    const animate = () => {
      const start = typeof performance !== 'undefined' ? performance.now() : Date.now()
      const duration = 850 // --dur-slow

      const tick = () => {
        const now = typeof performance !== 'undefined' ? performance.now() : Date.now()
        const t = Math.min((now - start) / duration, 1)
        if (t >= 1) {
          // Guarantee the final frame lands exactly on target.
          el.textContent = String(target)
          return
        }
        el.textContent = String(Math.round(ease(t) * target))
        raf = requestAnimationFrame(tick)
      }

      raf = requestAnimationFrame(tick)
    }

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            obs.unobserve(entry.target)
            animate()
          }
        }
      },
      { threshold: 0.6 },
    )

    obs.observe(el)
    return () => {
      obs.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [target])

  return ref
}
