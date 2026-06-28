import { useEffect, useRef } from 'react'
import Section from '../components/ui/Section'
import Reveal from '../components/ui/Reveal'
import ArrowLink from '../components/ui/ArrowLink'
import { scrollToHash } from '../lib/scrollToHash'
import { site } from '../data/site'
import { highlights, languages } from '../data/highlights'
import { useLang } from '../i18n/lang'
import { loc } from '../i18n/localize'
import { ui } from '../i18n/ui'
import './About.scss'

// The portrait starts FRACTURED into offset bands and drifts continuously; the
// first hover HEALS it to a clean image and it STAYS clean afterwards. SLICE_FRACTURE
// = the band offsets; SLICE_AMP = the drift around them; speed (rad/s) + phase vary it.
const SLICE_FRACTURE = [-13, 10, -7, 14, -5]
const SLICE_AMP = [5, 4, 6, 4, 5]
const SLICE_SPEED = [0.55, 0.42, 0.62, 0.48, 0.5]
const SLICE_PHASE = [0, 1.3, 2.5, 0.7, 1.9]

export default function About() {
  const { lang } = useLang()
  const t = loc(ui, lang)
  const langs = loc(languages, lang)
  const hls = loc(highlights, lang)

  const portraitRef = useRef<HTMLDivElement>(null)

  // Clean-by-default with a gentle continuous drift; eased fracture on hover.
  // Driven by rAF (no React state), paused offscreen via IntersectionObserver.
  // Reduced motion: CSS owns a clean still image with an instant hover fracture.
  useEffect(() => {
    const portrait = portraitRef.current
    if (!portrait) return
    const slices = Array.from(portrait.querySelectorAll<HTMLElement>('.about__slice'))
    if (!slices.length) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let healed = false
    let raf = 0
    let last = 0
    let time = 0
    let visible = true
    const cur = SLICE_FRACTURE.slice()

    // the first hover heals the portrait — and it stays healed afterwards
    const onEnter = () => {
      healed = true
    }
    portrait.addEventListener('pointerenter', onEnter)

    const loop = (now: number) => {
      raf = 0
      if (!visible) return
      if (now - last >= 33) {
        const dt = last ? Math.min(now - last, 100) : 16
        last = now
        time += dt / 1000
        for (let i = 0; i < slices.length; i++) {
          const target = healed
            ? 0
            : SLICE_FRACTURE[i] + SLICE_AMP[i] * Math.sin(time * SLICE_SPEED[i] + SLICE_PHASE[i])
          cur[i] += (target - cur[i]) * 0.12
          slices[i].style.transform = `translateX(${cur[i].toFixed(2)}px)`
        }
      }
      raf = requestAnimationFrame(loop)
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible && !raf) raf = requestAnimationFrame(loop)
      },
      { threshold: 0 },
    )
    io.observe(portrait)
    raf = requestAnimationFrame(loop)

    return () => {
      if (raf) cancelAnimationFrame(raf)
      io.disconnect()
      portrait.removeEventListener('pointerenter', onEnter)
    }
  }, [])

  return (
    <Section id="about">
      <div className="about">
        <div className="about__intro">
          <Reveal className="about__meta" as="div">
            <h2 className="t-label">{t.about.label}</h2>
            <span className="t-label about__count">
              {t.about.years} ({site.years})
            </span>
          </Reveal>

          <Reveal as="p" className="about__lead" delay={60}>
            {t.about.lead}
          </Reveal>

          <Reveal as="p" className="about__body" delay={120}>
            {t.about.body}
          </Reveal>

          <Reveal as="ul" className="about__langs" delay={200}>
            {langs.map((l) => (
              <li key={l.name} className="about__lang">
                <span className="about__lang-name">{l.name}</span>
                <span className="t-label about__lang-level">{l.level}</span>
              </li>
            ))}
          </Reveal>

          <Reveal as="div" className="about__cta" delay={240}>
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
        </div>

        <div className="about__side">
          <div className="about__portrait" ref={portraitRef}>
            {/* Real, crawlable base image (alt + Google Images). The opaque
                fractured slices below sit on top of it, so it's not visible —
                it exists for semantics/indexing. */}
            <img
              className="about__photo-base"
              src="/portrait.webp"
              alt={`${site.person} — ${t.role}`}
              loading="lazy"
              decoding="async"
              width={1000}
              height={1000}
            />
            <div className="about__photo" aria-hidden="true">
              <span className="about__slice" />
              <span className="about__slice" />
              <span className="about__slice" />
              <span className="about__slice" />
              <span className="about__slice" />
            </div>
            <span className="about__portrait-cap t-label">{site.person}</span>
          </div>

          <ul className="about__highlights">
            {hls.map((h, i) => (
              <Reveal as="li" key={h.title} className="about__hl" delay={i * 60}>
                <h3 className="about__hl-title">{h.title}</h3>
                <p className="about__hl-detail t-muted">{h.detail}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
