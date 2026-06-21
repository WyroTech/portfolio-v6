import { useEffect, useState } from 'react'
import { site } from '../data/site'
import { useClock } from '../hooks/useClock'
import { useLang } from '../i18n/lang'
import { loc } from '../i18n/localize'
import { ui } from '../i18n/ui'
import ArrowLink from '../components/ui/ArrowLink'
import Visual from '../components/ui/Visual'
import { scrollToHash } from '../lib/scrollToHash'
import './Hero.scss'

function tzAbbrev(timeZone: string) {
  try {
    return (
      new Intl.DateTimeFormat('en-GB', { timeZone, timeZoneName: 'short' })
        .formatToParts(new Date())
        .find((p) => p.type === 'timeZoneName')?.value ?? ''
    )
  } catch {
    return ''
  }
}

export default function Hero() {
  const time = useClock(site.timezone)
  const { lang } = useLang()
  const t = loc(ui, lang)

  // Masked per-line entrance: render hidden on mount, then flip on the next frame
  // so the clip-path rise plays once. Reduced-motion is handled in CSS (lines show
  // fully regardless of this flag).
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    const id = requestAnimationFrame(() => setLoaded(true))
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <section className={`hero${loaded ? ' is-loaded' : ''}`} id="top">
      <div className="container hero__inner">
        <div className="hero__top">
          <span className="t-label">
            {site.brand} <span className="hero__sep">—</span> {t.role}
          </span>
          <span className="t-label hero__loc">
            {t.location} <span className="hero__sep">·</span> {time} {tzAbbrev(site.timezone)}
          </span>
        </div>

        <div className="hero__main">
          <div className="hero__content">
            <h1 className="hero__title">
              <span className="hero__line">{t.hero.lineA}</span>
              <span className="hero__line hero__line--muted">{t.hero.lineB}</span>
            </h1>
            <div className="hero__lower">
              <p className="hero__sub t-lead">{t.hero.sub}</p>
              <div className="hero__actions">
                <ArrowLink
                  href="#contact"
                  className="hero__cta hero__cta--primary"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToHash('#contact')
                  }}
                >
                  {t.cta.start}
                </ArrowLink>
                <ArrowLink
                  href="#work"
                  className="hero__cta hero__cta--ghost"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToHash('#work')
                  }}
                >
                  {t.cta.selectedWork}
                </ArrowLink>
              </div>
            </div>
          </div>

          <div className="hero__visual">
            <Visual seed="wyrotech-hero" kind="flow" />
            <span className="hero__visual-cap t-label">{t.hero.caption}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
