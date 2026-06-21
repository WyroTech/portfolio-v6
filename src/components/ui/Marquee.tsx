import type { CSSProperties, ReactNode } from 'react'
import './Marquee.scss'

interface MarqueeProps {
  items: string[]
  /** seconds per loop */
  speed?: number
  label?: string
  /** custom renderer per item (defaults to plain text) */
  renderItem?: (item: string) => ReactNode
}

/** Greyscale tech wall — items go full-tone on hover. */
export default function Marquee({ items, speed = 42, label = 'Technologies', renderItem }: MarqueeProps) {
  const row = [...items, ...items]
  return (
    <div className="marquee" role="list" aria-label={label}>
      <div className="marquee__track" style={{ '--marquee-duration': `${speed}s` } as CSSProperties}>
        {row.map((item, i) => (
          <span
            className="marquee__item"
            key={`${item}-${i}`}
            role={i < items.length ? 'listitem' : undefined}
            aria-hidden={i >= items.length}
          >
            {renderItem ? renderItem(item) : item}
          </span>
        ))}
      </div>
    </div>
  )
}
