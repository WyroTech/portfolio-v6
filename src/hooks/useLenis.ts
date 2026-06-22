import { useEffect } from 'react'
import Lenis from 'lenis'

declare global {
  interface Window {
    __lenis?: Lenis
  }
}

/**
 * Initializes Lenis smooth scrolling for the app.
 *
 * Disabled automatically when the user prefers reduced motion. Initialization is
 * deferred to `requestIdleCallback` (with a timeout fallback) so the Lenis chunk
 * and its rAF loop never compete with first paint / hydration; until it boots,
 * native scrolling is used and the `window.__lenis` consumers fall back cleanly.
 */
export function useLenis() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let lenis: Lenis | undefined
    let rafId = 0
    let cancelled = false

    const start = () => {
      if (cancelled) return

      lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.6,
      })

      window.__lenis = lenis

      const raf = (time: number) => {
        lenis?.raf(time)
        rafId = requestAnimationFrame(raf)
      }
      rafId = requestAnimationFrame(raf)
    }

    let idleId = 0
    const usingIdle = 'requestIdleCallback' in window
    if (usingIdle) {
      idleId = window.requestIdleCallback(start, { timeout: 2000 })
    } else {
      idleId = window.setTimeout(start, 1)
    }

    return () => {
      cancelled = true
      if (usingIdle) window.cancelIdleCallback(idleId)
      else window.clearTimeout(idleId)
      if (rafId) cancelAnimationFrame(rafId)
      lenis?.destroy()
      delete window.__lenis
    }
  }, [])
}
