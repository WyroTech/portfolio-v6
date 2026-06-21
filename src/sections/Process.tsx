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
