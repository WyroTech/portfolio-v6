import { useEffect, useRef, useState } from 'react'
import Section from '../components/ui/Section'
import SectionHead from '../components/ui/SectionHead'
import Visual from '../components/ui/Visual'
import { process } from '../data/process'
import { useLang } from '../i18n/lang'
import { loc } from '../i18n/localize'
import { ui } from '../i18n/ui'
import './Process.scss'

export default function Process() {
  const { lang } = useLang()
  const t = loc(ui, lang)
  const steps = loc(process, lang)
  const count = `(${String(steps.length).padStart(2, '0')})`

  const ref = useRef<HTMLOListElement>(null)
  const [active, setActive] = useState(false)

  // Draw the path in when the section scrolls into view (once).
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true)
          io.disconnect()
        }
      },
      { threshold: 0.25 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Wayfinding fill: a solid line tracks the reader 1:1 down the node column
  // (layered over the once-drawn rails). Like ScrollProgress this is a position
  // indicator, so it deliberately stays live under reduced-motion.
  useEffect(() => {
    const el = ref.current
    if (!el) return

    let rafId = 0
    let queued = false
    let visible = false

    const compute = () => {
      queued = false
      // read everything first, then write once (no read/write interleave)
      const scroll =
        typeof window.__lenis?.scroll === 'number' ? window.__lenis.scroll : window.scrollY
      const rect = el.getBoundingClientRect()
      const listTop = rect.top + scroll
      const listHeight = rect.height
      const viewportCenter = scroll + window.innerHeight / 2
      const raw = listHeight > 0 ? (viewportCenter - listTop) / listHeight : 0
      const p = Math.min(1, Math.max(0, raw))
      el.style.setProperty('--proc-progress', String(p))
    }

    const onScroll = () => {
      if (!visible || queued) return
      queued = true
      rafId = requestAnimationFrame(compute)
    }

    // pause the rAF loop while the list is offscreen
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible) compute()
      },
      { threshold: 0 },
    )
    io.observe(el)

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    return () => {
      cancelAnimationFrame(rafId)
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <Section id="process" dark>
      <SectionHead
        eyebrow={t.process.eyebrow}
        count={count}
        title={t.process.title}
        intro={t.process.intro}
      />
      <div className="process-layout">
        <ol ref={ref} className={`proc-path${active ? ' is-in' : ''}`}>
          {steps.map((step, i) => (
            <li key={step.no} className="proc" style={{ '--i': i } as React.CSSProperties}>
              <div className="proc__rail" aria-hidden="true">
                <span className="proc__node">{step.no}</span>
              </div>
              <div className="proc__body">
                <h3 className="proc__title">{step.title}</h3>
                <p className="proc__detail">{step.detail}</p>
              </div>
            </li>
          ))}
        </ol>

        <aside className="process-aside" aria-hidden="true">
          <div className="process-aside__inner">
            <div className="process-aside__plate">
              <Visual seed="wyrotech-process" kind="harmonograph" />
            </div>
            <span className="process-aside__cap t-label">{t.process.caption}</span>
          </div>
        </aside>
      </div>
    </Section>
  )
}
