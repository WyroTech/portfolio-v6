import { useEffect, useRef, useState } from 'react'

/**
 * Reveal-on-scroll via IntersectionObserver.
 * Returns a ref to attach and a `revealed` boolean.
 * Immediately revealed when the user prefers reduced motion.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options?: IntersectionObserverInit,
) {
  const ref = useRef<T>(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // Reveal immediately when motion is reduced, when IntersectionObserver is
    // unavailable, or when the element is already in/above the viewport on mount
    // (e.g. anchor landings) — content must never stay stuck hidden.
    if (
      prefersReduced ||
      typeof IntersectionObserver === 'undefined' ||
      el.getBoundingClientRect().top < window.innerHeight
    ) {
      setRevealed(true)
      return
    }

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRevealed(true)
            obs.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px', ...options },
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [options])

  return { ref, revealed }
}
