import Section from '../components/ui/Section'
import SectionHead from '../components/ui/SectionHead'
import { useLang } from '../i18n/lang'
import { loc } from '../i18n/localize'
import { ui } from '../i18n/ui'

/**
 * Local-SEO anchor: a compact section whose visible <h2> and prose carry the
 * "Webentwickler Deggendorf / Niederbayern" keywords that otherwise only existed
 * in micro-labels and JSON-LD. Reuses Section + SectionHead, so it inherits the
 * editorial layout with no bespoke styling.
 */
export default function Local() {
  const { lang } = useLang()
  const t = loc(ui, lang)

  return (
    <Section id="standort" tight>
      <SectionHead eyebrow={t.local.eyebrow} title={t.local.title} intro={t.local.body} />
    </Section>
  )
}
