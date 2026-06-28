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

  return (
    <Section id="services" dark>
      <SectionHead
        eyebrow={t.services.eyebrow}
        count={count}
        title={t.services.title}
        intro={t.services.intro}
      />
      <div className="services">
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
