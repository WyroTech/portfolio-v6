import Section from '../components/ui/Section'
import SectionHead from '../components/ui/SectionHead'
import Reveal from '../components/ui/Reveal'
import { testimonials } from '../data/testimonials'
import { useLang } from '../i18n/lang'
import { loc } from '../i18n/localize'
import { ui } from '../i18n/ui'
import './Testimonials.scss'

export default function Testimonials() {
  const { lang } = useLang()
  const t = loc(ui, lang)

  // Self-hides when there are no testimonials (keeps placeholders off a live site).
  if (testimonials.length === 0) return null

  const count = `(${String(testimonials.length).padStart(2, '0')})`

  return (
    <Section id="testimonials">
      <SectionHead eyebrow={t.feedback.eyebrow} count={count} title={t.feedback.title} />
      <div className="quotes">
        {testimonials.map((item, i) => (
          <Reveal as="figure" key={i} className="quote" delay={(i % 2) * 80}>
            <blockquote className="quote__text">{item.quote}</blockquote>
            <figcaption className="quote__by">
              <span className="quote__author">{item.author}</span>
              <span className="t-mono quote__role">{item.role}</span>
            </figcaption>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
