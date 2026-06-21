import type { MouseEvent, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import './ArrowLink.scss'

interface ArrowLinkProps {
  to?: string
  href?: string
  children: ReactNode
  className?: string
  viewTransition?: boolean
  onClick?: (e: MouseEvent) => void
}

/** Kinetic doubled-arrow link (→ →) — Studio Herrström pattern */
export default function ArrowLink({
  to,
  href,
  children,
  className = '',
  viewTransition,
  onClick,
}: ArrowLinkProps) {
  const cls = `arrow-link ${className}`.trim()
  const inner = (
    <>
      <span className="arrow-link__text">{children}</span>
      <span className="arrow-link__arrows" aria-hidden="true">
        <span className="arrow-link__arrow">&rarr;</span>
        <span className="arrow-link__arrow">&rarr;</span>
      </span>
    </>
  )

  if (href) {
    const external = href.startsWith('http')
    return (
      <a
        className={cls}
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noreferrer' : undefined}
        onClick={onClick}
      >
        {inner}
      </a>
    )
  }

  return (
    <Link className={cls} to={to ?? '#'} viewTransition={viewTransition} onClick={onClick}>
      {inner}
    </Link>
  )
}
