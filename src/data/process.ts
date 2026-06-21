import type { Localized } from '../i18n/localize'

export interface Step {
  no: string
  title: string
  detail: string
}

/** "What happens after you reach out" — removes the fear of the unknown. */
const en: Step[] = [
  {
    no: '01',
    title: 'A look before you commit',
    detail: 'A free 30-minute call — no pitch, no pressure. We find out if there’s a fit.',
  },
  {
    no: '02',
    title: 'Scoped proposal',
    detail: 'Within 48 hours: fixed scope, fixed price, named deliverables, a start date.',
  },
  {
    no: '03',
    title: 'You see it every week',
    detail: 'Staged deliveries with a written update every Friday, reviewed before moving on.',
  },
  {
    no: '04',
    title: 'You own it',
    detail: 'Source in a repo you control from the first commit. No lock-in, ever.',
  },
]

const de: Step[] = [
  {
    no: '01',
    title: 'Erst prüfen, dann entscheiden',
    detail: 'Ein kostenloses 30-Minuten-Gespräch – kein Pitch, kein Druck. Wir klären, ob es passt.',
  },
  {
    no: '02',
    title: 'Fester Umfang, fester Preis',
    detail: 'Innerhalb von 48 Stunden: fester Umfang, fester Preis, definierte Ergebnisse, ein Starttermin.',
  },
  {
    no: '03',
    title: 'Sie sehen es jede Woche',
    detail: 'Lieferung in Etappen, jeden Freitag ein schriftliches Update, geprüft vor dem nächsten Schritt.',
  },
  {
    no: '04',
    title: 'Es gehört Ihnen',
    detail: 'Quellcode ab dem ersten Commit in einem Repo, das Sie kontrollieren. Kein Lock-in – niemals.',
  },
]

export const process: Localized<Step[]> = { en, de }
