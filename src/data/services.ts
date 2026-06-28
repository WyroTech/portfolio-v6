import type { Localized } from '../i18n/localize'

export interface Service {
  no: string
  title: string
  blurb: string
}

const en: Service[] = [
  {
    no: '01',
    title: 'Web app or platform',
    blurb: 'Built around your processes and data.',
  },
  {
    no: '02',
    title: 'Dashboards & data tools',
    blurb: 'Dense data, made clear and usable.',
  },
  {
    no: '03',
    title: 'SaaS product',
    blurb: 'From concept to scalable product.',
  },
  {
    no: '04',
    title: 'Design system',
    blurb: 'Consistent, on-brand UI for every team.',
  },
  {
    no: '05',
    title: 'Frontend modernization',
    blurb: 'Legacy UI rebuilt in React or Angular.',
  },
  {
    no: '06',
    title: 'Prototype or MVP',
    blurb: 'A working first version to test and pitch.',
  },
  {
    no: '07',
    title: 'AI features',
    blurb: 'Assistants and automation that reach production.',
  },
  {
    no: '08',
    title: 'Generative UI',
    blurb: 'Interfaces an AI assembles at runtime, around your data.',
  },
]

const de: Service[] = [
  {
    no: '01',
    title: 'Web-App oder Plattform',
    blurb: 'Maßgeschneidert für Ihre Prozesse und Daten.',
  },
  {
    no: '02',
    title: 'Dashboards & Datentools',
    blurb: 'Dichte Daten – klar und nutzbar.',
  },
  {
    no: '03',
    title: 'SaaS-Produkt',
    blurb: 'Vom Konzept zum skalierbaren Produkt.',
  },
  {
    no: '04',
    title: 'Designsystem',
    blurb: 'Konsistente, markentreue UI in jedem Team.',
  },
  {
    no: '05',
    title: 'Frontend-Modernisierung',
    blurb: 'Altes Frontend, neu in React oder Angular.',
  },
  {
    no: '06',
    title: 'Prototyp oder MVP',
    blurb: 'Lauffähige erste Version zum Testen und Pitchen.',
  },
  {
    no: '07',
    title: 'KI-Funktionen',
    blurb: 'Assistenten und Automatisierung, die in Produktion gehen.',
  },
  {
    no: '08',
    title: 'Generative UI',
    blurb: 'Interfaces, die eine KI zur Laufzeit aus Ihren Daten baut.',
  },
]

export const services: Localized<Service[]> = { en, de }
