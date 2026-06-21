import type { CSSProperties, ElementType, ReactNode } from 'react'
import { useReveal } from '../../hooks/useReveal'
import './Reveal.scss'

interface RevealProps {
  children: ReactNode
  as?: ElementType
  className?: string
  /** stagger delay in ms */
  delay?: number
  /** translate-Y distance in px */
  y?: number
  /** any extra props (href, etc.) are forwarded to the rendered element */
  [prop: string]: unknown
}

export default function Reveal({
  children,
  as: Tag = 'div',
  className = '',
  delay = 0,
  y = 26,
  ...rest
}: RevealProps) {
  const { ref, revealed } = useReveal<HTMLElement>()
  const style = { '--reveal-delay': `${delay}ms`, '--reveal-y': `${y}px` } as CSSProperties

  return (
    <Tag
      ref={ref as React.Ref<HTMLElement>}
      className={`reveal${revealed ? ' is-revealed' : ''}${className ? ' ' + className : ''}`}
      style={style}
      {...rest}
    >
      {children}
    </Tag>
  )
}
