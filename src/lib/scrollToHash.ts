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
