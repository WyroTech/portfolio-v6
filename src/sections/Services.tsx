import { useEffect, useRef } from 'react'
import Section from '../components/ui/Section'
import SectionHead from '../components/ui/SectionHead'
import Reveal from '../components/ui/Reveal'
import ArrowLink from '../components/ui/ArrowLink'
import { scrollToHash } from '../lib/scrollToHash'
import { services } from '../data/services'
import { useLang } from '../i18n/lang'
import { loc } from '../i18n/localize'
import { ui } from '../i18n/ui'
import './Services.scss'

export default function Services() {
  const { lang } = useLang()
  const t = loc(ui, lang)
  const items = loc(services, lang)
  const count = `(${String(items.length).padStart(2, '0')})`
  const listRef = useRef<HTMLDivElement>(null)

  // Scroll-spy: brighten the row sitting mid-viewport as the index is read
  // top-to-bottom. Wayfinding state, not decoration — so it runs regardless of
  // reduced-motion (CSS gates only the row's transition, never the active
  // state). Toggles classList directly so a fast scroll never re-renders React.
  useEffect(() => {
    const list = listRef.current
    if (!list || typeof IntersectionObserver === 'undefined') return
    const rows = Array.from(list.querySelectorAll<HTMLElement>('.service'))
    if (!rows.length) return

    let active: HTMLElement | null = null
    const obs = new IntersectionObserver(
      (entries) => {
        // Clamp to one active row — the last intersecting entry — so a fast
        // scroll past several rows settles on one instead of strobing.
        const hit = entries.filter((e) => e.isIntersecting).pop()
        if (!hit || hit.target === active) return
        active?.classList.remove('is-active')
        active = hit.target as HTMLElement
        active.classList.add('is-active')
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    rows.forEach((row) => obs.observe(row))
    return () => {
      obs.disconnect()
      active?.classList.remove('is-active')
    }
  }, [])

  return (
    <Section id="services" dark>
      <SectionHead
        eyebrow={t.services.eyebrow}
        count={count}
        title={t.services.title}
        intro={t.services.intro}
      />
      <div className="services" ref={listRef}>
        {items.map((service, i) => (
          <Reveal as="article" key={service.no} className="service" delay={i * 45}>
            <div className="service__head">
              <span className="t-label service__no">[{service.no}]</span>
              <h3 className="service__title">{service.title}</h3>
            </div>
            <p className="service__blurb">{service.blurb}</p>
          </Reveal>
        ))}
      </div>
      <Reveal as="div" className="services__cta">
        <ArrowLink
          href="#contact"
          onClick={(e) => {
            e.preventDefault()
            scrollToHash('#contact')
          }}
        >
          {t.cta.start}
        </ArrowLink>
      </Reveal>
    </Section>
  )
}
