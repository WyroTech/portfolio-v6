import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Resets scroll on route change and handles in-page hash anchors,
 * routed through Lenis when it is active.
 */
export default function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    const lenis = window.__lenis

    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        // wait a frame so the target is laid out
        requestAnimationFrame(() => {
          if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -72 })
          else (el as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'start' })
        })
        return
      }
    }

    if (lenis) lenis.scrollTo(0, { immediate: true })
    else window.scrollTo({ top: 0, left: 0 })
  }, [pathname, hash])

  return null
}
