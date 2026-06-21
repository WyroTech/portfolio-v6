import type { CSSProperties } from 'react'
import { useScrollProgress } from '../hooks/useScrollProgress'
import './ScrollProgress.scss'

/**
 * Hairline scroll-position indicator pinned to the top of the viewport.
 * Sits above the nav (z-index 101) and inverts under .nav--on-dark via tokens.
 * Informational (like the FCP colophon), so it persists under reduced-motion.
 */
export default function ScrollProgress() {
  const progress = useScrollProgress()
  return (
    <div className="scroll-progress" aria-hidden="true">
      <div className="scroll-progress__bar" style={{ '--p': progress } as CSSProperties} />
    </div>
  )
}
