import type { ReactNode } from 'react'
import Reveal from './Reveal'
import './SectionHead.scss'

interface SectionHeadProps {
  eyebrow: string
  /** counter shown to the right, e.g. "(05)" */
  count?: string
  title: ReactNode
  intro?: ReactNode
  className?: string
}

export default function SectionHead({
  eyebrow,
  count,
  title,
  intro,
  className = '',
}: SectionHeadProps) {
  return (
    <header className={`section-head ${className}`}>
      <Reveal className="section-head__meta" as="div">
        <span className="t-label">{eyebrow}</span>
        {count && <span className="t-label section-head__count">{count}</span>}
      </Reveal>
      <Reveal as="h2" className="section-head__title t-h2" delay={60}>
        {title}
      </Reveal>
      {intro && (
        <Reveal as="p" className="section-head__intro t-lead" delay={120}>
          {intro}
        </Reveal>
      )}
    </header>
  )
}
