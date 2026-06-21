import { useEffect, useState } from 'react'

/**
 * Tracks page scroll as a 0→1 progress value, rAF-throttled.
 * Reads Lenis progress when present (smooth scroll), else falls back to
 * scrollY / (scrollHeight - innerHeight). Position indicator, so it stays
 * active under reduced-motion — it just isn't smoothed (we track scroll 1:1).
 */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let rafId = 0
    let queued = false

    const compute = () => {
      queued = false
      const lenisProgress = window.__lenis?.progress
      if (typeof lenisProgress === 'number' && Number.isFinite(lenisProgress)) {
        setProgress(Math.min(1, Math.max(0, lenisProgress)))
        return
      }
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? window.scrollY / max : 0
      setProgress(Math.min(1, Math.max(0, p)))
    }

    const onScroll = () => {
      if (queued) return
      queued = true
      rafId = requestAnimationFrame(compute)
    }

    compute()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return progress
}
