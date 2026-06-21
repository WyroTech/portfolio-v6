import type { CSSProperties } from 'react'
import Section from '../components/ui/Section'
import TechIcon from '../components/ui/TechIcon'
import { useReveal } from '../hooks/useReveal'
import { techCategories } from '../data/skills'
import { useLang } from '../i18n/lang'
import { loc } from '../i18n/localize'
import { ui } from '../i18n/ui'
import './Capabilities.scss'

function TechCategory({ category }: { category: (typeof techCategories)[number] }) {
  const { lang } = useLang()
  const label = loc(category, lang)
  // Grayscale→tone wipe staggers across the wall once the grid enters view.
  const { ref, revealed } = useReveal<HTMLUListElement>()

  return (
    <div className="tech-category">
      <h3 className="t-label tech-category__label">{label}</h3>
      <ul
        ref={ref}
        className={`tech-grid${revealed ? ' is-revealed' : ''}`}
        aria-label={label}
      >
        {category.items.map((name, i) => (
          <li key={name} className="tech-grid__item" style={{ '--i': i } as CSSProperties}>
            <TechIcon name={name} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Capabilities() {
  const { lang } = useLang()
  const t = loc(ui, lang)

  return (
    <Section id="capabilities">
      <h2 className="t-label capabilities__label">{t.capabilities.label}</h2>

      {techCategories.map((category) => (
        <TechCategory key={category.en} category={category} />
      ))}
    </Section>
  )
}
