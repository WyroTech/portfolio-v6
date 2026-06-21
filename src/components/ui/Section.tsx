import type { ReactNode } from 'react'
import './Section.scss'

interface SectionProps {
  id?: string
  dark?: boolean
  bleed?: boolean
  flushTop?: boolean
  tight?: boolean
  className?: string
  children: ReactNode
}

export default function Section({
  id,
  dark = false,
  bleed = false,
  flushTop = false,
  tight = false,
  className = '',
  children,
}: SectionProps) {
  const classes = [
    'section',
    dark ? 'is-dark' : '',
    flushTop ? 'section--flush-top' : '',
    tight ? 'section--tight' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <section id={id} className={classes}>
      {bleed ? children : <div className="container">{children}</div>}
    </section>
  )
}
