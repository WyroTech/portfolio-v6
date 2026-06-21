import Section from '../components/ui/Section'
import SectionHead from '../components/ui/SectionHead'
import Reveal from '../components/ui/Reveal'
import { timeline } from '../data/timeline'
import { useLang } from '../i18n/lang'
import { loc } from '../i18n/localize'
import { ui } from '../i18n/ui'
import './Timeline.scss'

export default function Timeline() {
  const { lang } = useLang()
  const t = loc(ui, lang)
  const roles = loc(timeline, lang)
  const count = `(${String(roles.length).padStart(2, '0')})`

  return (
    <Section id="journey" dark>
      <SectionHead eyebrow={t.journey.eyebrow} count={count} title={t.journey.title} />
      <ol className="timeline">
        {roles.map((role, i) => (
          <Reveal as="li" key={`${role.org}-${i}`} className="tl" delay={(i % 2) * 60}>
            <span className="tl__period t-mono">{role.period}</span>
            <div className="tl__main">
              <h3 className="tl__title">{role.title}</h3>
              <span className="tl__org t-muted">
                {role.org}
                {role.location ? ` · ${role.location}` : ''}
              </span>
              {role.points && role.points.length > 0 && (
                <ul className="tl__points">
                  {role.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              )}
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  )
}
