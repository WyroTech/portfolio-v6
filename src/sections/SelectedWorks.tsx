import Section from '../components/ui/Section'
import SectionHead from '../components/ui/SectionHead'
import Reveal from '../components/ui/Reveal'
import WorkCard from '../components/WorkCard'
import { getWorks } from '../data/works'
import { useLang } from '../i18n/lang'
import { loc } from '../i18n/localize'
import { ui } from '../i18n/ui'
import './SelectedWorks.scss'

export default function SelectedWorks() {
  const { lang } = useLang()
  const t = loc(ui, lang)
  const works = getWorks(lang)
  const count = `(${String(works.length).padStart(2, '0')})`

  return (
    <Section id="work">
      <SectionHead eyebrow={t.work.eyebrow} count={count} title={t.work.title} />
      <div className="works-grid">
        {works.map((work, i) => (
          <Reveal
            key={work.slug}
            className={`works-grid__item${work.featured ? ' works-grid__item--featured' : ''}`}
            delay={(i % 2) * 70}
          >
            <WorkCard work={work} index={i} />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
