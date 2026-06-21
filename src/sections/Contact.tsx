import Section from '../components/ui/Section'
import Reveal from '../components/ui/Reveal'
import HoldButton from '../components/ui/HoldButton'
import Visual from '../components/ui/Visual'
import { site } from '../data/site'
import { useClock } from '../hooks/useClock'
import { useLang } from '../i18n/lang'
import { loc } from '../i18n/localize'
import { ui } from '../i18n/ui'
import './Contact.scss'

export default function Contact() {
  const time = useClock(site.timezone)
  const { lang } = useLang()
  const t = loc(ui, lang)

  return (
    <Section id="contact" dark>
      <div className="contact">
        <div className="contact__main">
          <Reveal className="contact__meta" as="div">
            <span className="t-label">{t.contact.label}</span>
            <span className="t-label contact__avail">{t.availability.detail}</span>
          </Reveal>

          <Reveal as="h2" className="contact__headline" delay={60}>
            {t.contact.headline}
          </Reveal>

          <Reveal as="p" className="contact__note t-lead" delay={90}>
            {t.contact.note}
          </Reveal>

          <Reveal as="a" className="contact__email" delay={120} href={`mailto:${site.email}`}>
            <span className="contact__email-split" data-text={site.email} aria-hidden="true" />
            <span className="contact__email-text">{site.email}</span>
          </Reveal>

          <Reveal className="contact__row" as="div" delay={160}>
            <HoldButton
              ariaLabel={t.contact.holdAria}
              holdLabel={t.cta.hold}
              doneLabel={t.cta.done}
              onComplete={() => {
                window.location.href = `mailto:${site.email}`
              }}
            >
              {t.cta.start}
            </HoldButton>
            <span className="t-mono contact__local">
              {t.location} · {time}
            </span>
          </Reveal>

          <Reveal as="p" className="contact__reply t-mono" delay={200}>
            {t.contact.reply}
          </Reveal>
        </div>

        <div className="contact__visual" aria-hidden="true">
          <Visual seed="wyrotech-contact" kind="waves" />
        </div>
      </div>
    </Section>
  )
}
