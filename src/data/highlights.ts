import type { Localized } from '../i18n/localize'

export interface Highlight {
  title: string
  detail: string
}

const highlightsEn: Highlight[] = [
  { title: 'Design and code, one head', detail: 'Google UX certified, and the one who writes the code. No translation layer.' },
  { title: 'Built to last years', detail: 'SaaS, portals, data-heavy apps — shipped and maintained for years, not abandoned.' },
]

const highlightsDe: Highlight[] = [
  { title: 'Design und Code in einer Hand', detail: 'Google-UX-zertifiziert – und derselbe, der den Code schreibt. Keine Übersetzungsebene.' },
  { title: 'Auf Jahre gebaut', detail: 'SaaS, Portale, datenintensive Apps – seit Jahren ausgeliefert und gepflegt, nicht aufgegeben.' },
]

export const highlights: Localized<Highlight[]> = { en: highlightsEn, de: highlightsDe }

export interface Language {
  name: string
  level: string
}

const languagesEn: Language[] = [
  { name: 'Deutsch', level: 'Native' },
  { name: 'Polski', level: '2nd Native' },
  { name: 'English', level: 'C1' },
]

const languagesDe: Language[] = [
  { name: 'Deutsch', level: 'Muttersprache' },
  { name: 'Polski', level: 'Zweite Muttersprache' },
  { name: 'English', level: 'C1' },
]

export const languages: Localized<Language[]> = { en: languagesEn, de: languagesDe }
