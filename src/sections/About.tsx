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

export default function About() {
  const { lang } = useLang()
  const t = loc(ui, lang)
  const langs = loc(languages, lang)
  const hls = loc(highlights, lang)

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
          <div className="about__portrait">
            <div className="about__photo" role="img" aria-label={`${site.person} — ${t.role}`}>
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
