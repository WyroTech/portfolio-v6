import { useEffect, useState } from 'react'

/**
 * Real First-Contentful-Paint time (ms) for the live colophon —
 * an engineer showing their own page's performance is the most
 * credible flex on a frontend-services site.
 */
export function usePaintTime() {
  const [ms, setMs] = useState<number | null>(null)

  useEffect(() => {
    const fromEntries = () => {
      const fcp = performance.getEntriesByName('first-contentful-paint')[0]
      if (fcp) {
        setMs(Math.round(fcp.startTime))
        return true
      }
      return false
    }

    if (fromEntries()) return

    const obs = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          setMs(Math.round(entry.startTime))
          obs.disconnect()
        }
      }
    })

    try {
      obs.observe({ type: 'paint', buffered: true })
    } catch {
      /* Paint timing unsupported — colophon simply hides */
    }
    return () => obs.disconnect()
  }, [])

  return ms
}
