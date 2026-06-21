import Section from '../components/ui/Section'
import SectionHead from '../components/ui/SectionHead'
import Reveal from '../components/ui/Reveal'
import { faqs } from '../data/faq'
import { useLang } from '../i18n/lang'
import { loc } from '../i18n/localize'
import { ui } from '../i18n/ui'
import './Faq.scss'

export default function Faq() {
  const { lang } = useLang()
  const t = loc(ui, lang)
  const items = loc(faqs, lang)

  if (items.length === 0) return null

  const count = `(${String(items.length).padStart(2, '0')})`

  return (
    <Section id="faq">
      <SectionHead eyebrow={t.faq.eyebrow} count={count} title={t.faq.title} />
      <dl className="faq">
        {items.map((item, i) => (
          <Reveal as="div" key={item.q} className="faq__item" delay={(i % 2) * 60}>
            <dt className="faq__q">{item.q}</dt>
            <dd className="faq__a">{item.a}</dd>
          </Reveal>
        ))}
      </dl>
    </Section>
  )
}
