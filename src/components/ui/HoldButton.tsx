import { useCallback, useRef, useState } from 'react'
import type { CSSProperties, KeyboardEvent, PointerEvent, ReactNode } from 'react'
import './HoldButton.scss'

interface HoldButtonProps {
  children: ReactNode
  onComplete: () => void
  holdMs?: number
  className?: string
  ariaLabel?: string
  holdLabel?: string
  doneLabel?: string
}

/**
 * Press-and-hold CTA (Unseen Studio pattern). Holding fills the button,
 * completing triggers `onComplete`. Keyboard (Enter/Space) and
 * reduced-motion users get instant activation for accessibility.
 */
export default function HoldButton({
  children,
  onComplete,
  holdMs = 650,
  className = '',
  ariaLabel,
  holdLabel = 'hold',
  doneLabel = 'done',
}: HoldButtonProps) {
  const [holding, setHolding] = useState(false)
  const [done, setDone] = useState(false)
  const timer = useRef<number | null>(null)

  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const finish = useCallback(() => {
    setHolding(false)
    setDone(true)
    onComplete()
    window.setTimeout(() => setDone(false), 500)
  }, [onComplete])

  const start = useCallback(
    (e: PointerEvent<HTMLButtonElement>) => {
      if (done) return
      // anchor the fill's growth origin to where the user pressed
      const rect = e.currentTarget.getBoundingClientRect()
      const x = rect.width ? ((e.clientX - rect.left) / rect.width) * 100 : 50
      e.currentTarget.style.setProperty('--fill-x', `${x}%`)
      if (reduced) {
        finish()
        return
      }
      setHolding(true)
      timer.current = window.setTimeout(finish, holdMs)
    },
    [done, reduced, finish, holdMs],
  )

  const cancel = useCallback(() => {
    setHolding(false)
    if (timer.current) {
      clearTimeout(timer.current)
      timer.current = null
    }
  }, [])

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      finish()
    }
  }

  return (
    <button
      type="button"
      className={`hold-btn${holding ? ' is-holding' : ''}${done ? ' is-done' : ''} ${className}`}
      style={{ '--hold-ms': `${holdMs}ms` } as CSSProperties}
      onPointerDown={start}
      onPointerUp={cancel}
      onPointerLeave={cancel}
      onPointerCancel={cancel}
      onKeyDown={onKeyDown}
      aria-label={ariaLabel}
    >
      <span className="hold-btn__fill" aria-hidden="true" />
      <span className="hold-btn__label">{children}</span>
      <span className="hold-btn__hint t-label" aria-hidden="true">
        {done ? doneLabel : holdLabel}
      </span>
    </button>
  )
}
