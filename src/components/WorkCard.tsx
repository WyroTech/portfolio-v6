import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import type { Work } from '../data/works'
import { useLang } from '../i18n/lang'
import { loc } from '../i18n/localize'
import { ui } from '../i18n/ui'
import Visual from './ui/Visual'
import './WorkCard.scss'

interface WorkCardProps {
  work: Work
  index: number
}

export default function WorkCard({ work, index }: WorkCardProps) {
  const { lang, lp } = useLang()
  const t = loc(ui, lang)
  const no = String(index + 1).padStart(2, '0')
  const year = work.year.split('—').pop()?.trim() ?? work.year
  // A real datum (0→1, 1) gets the big tabular display; a phrase ("Angular · .NET",
  // "real-time") gets a smaller class so it never wraps as a giant fake headline.
  const metricIsData = /^[\d.,→%/+\-\s]+$/.test(work.metric.value.trim())
  const stackCount = work.featured ? 3 : 2

  return (
    <Link
      to={lp(`/work/${work.slug}`)}
      viewTransition
      className={`work-card${work.featured ? ' work-card--featured' : ''}`}
    >
      <div className="work-card__thumb">
        <Visual seed={work.slug} kind={work.visual} className="work-card__visual" />
      </div>

      <div className="work-card__top">
        <span className="t-label work-card__no">{no}</span>
        <span className="t-label work-card__tax">
          {work.stack.slice(0, stackCount).join(' · ')} — {year}
        </span>
      </div>

      <div className="work-card__body">
        <h3
          className="work-card__title"
          style={{ viewTransitionName: `work-${work.slug}` } as CSSProperties}
        >
          {work.title}
        </h3>
        <p className="work-card__outcome">{work.outcome}</p>
      </div>

      <div className="work-card__foot">
        <div className="work-card__metric">
          <span
            className={`work-card__metric-value${metricIsData ? '' : ' work-card__metric-value--text'}`}
          >
            {work.metric.value}
          </span>
          <span className="work-card__metric-label t-label">{work.metric.label}</span>
        </div>
        <span className="work-card__cta" aria-hidden="true">
          {t.caseStudy.view}
          <span className="work-card__arrows">
            <span>&rarr;</span>
            <span>&rarr;</span>
          </span>
        </span>
      </div>
    </Link>
  )
}
