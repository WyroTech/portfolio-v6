/** Smooth-scroll to an in-page anchor, routed through Lenis when active. */
export function scrollToHash(hash: string) {
  const el = document.querySelector(hash)
  if (!el) return
  const navH = document.querySelector('.nav')?.clientHeight ?? 72
  const lenis = window.__lenis
  if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -navH })
  else (el as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'start' })
  window.history.replaceState(null, '', hash)
}

/**
 * Smooth-scroll to the very top of the page, routed through Lenis when active.
 * Independent of any in-page anchor, so it works on every route (the `#top`
 * element only exists on the home page's Hero).
 */
export function scrollToTop() {
  const lenis = window.__lenis
  if (lenis) lenis.scrollTo(0)
  else window.scrollTo({ top: 0, behavior: 'smooth' })
  window.history.replaceState(null, '', window.location.pathname + window.location.search)
}
