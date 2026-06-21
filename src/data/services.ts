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
    blurb: 'A custom web application built around your processes, your data and your users — including AI features when you need them.',
  },
  {
    no: '02',
    title: 'Dashboards & data tools',
    blurb: 'Dense data made clear and usable — analytics, admin panels and internal tools your team actually wants to use.',
  },
  {
    no: '03',
    title: 'SaaS product',
    blurb: 'From first concept to a scalable, production SaaS — product thinking, UX and engineering from one person.',
  },
  {
    no: '04',
    title: 'Design system',
    blurb: 'A component library and design system so every team ships consistent, on-brand UI — without the drift.',
  },
  {
    no: '05',
    title: 'Frontend modernization',
    blurb: 'A legacy or tired frontend rebuilt in Angular or React — faster, accessible and easy to maintain.',
  },
  {
    no: '06',
    title: 'Prototype or MVP',
    blurb: 'A working first version of your idea — enough to test with users, demo to stakeholders and raise.',
  },
]

const de: Service[] = [
  {
    no: '01',
    title: 'Web-App oder Plattform',
    blurb: 'Eine maßgeschneiderte Web-Anwendung rund um Ihre Prozesse, Ihre Daten und Ihre Nutzer – auf Wunsch mit KI-Funktionen.',
  },
  {
    no: '02',
    title: 'Dashboards & Datentools',
    blurb: 'Dichte Daten klar und nutzbar gemacht – Analysen, Admin-Bereiche und interne Tools, die Ihr Team gern verwendet.',
  },
  {
    no: '03',
    title: 'SaaS-Produkt',
    blurb: 'Vom ersten Konzept zu einem skalierbaren, produktiven SaaS – Produktdenken, UX und Entwicklung aus einer Hand.',
  },
  {
    no: '04',
    title: 'Designsystem',
    blurb: 'Eine Komponentenbibliothek und ein Designsystem, damit jedes Team konsistente, markentreue UI ausliefert – ohne Abweichung.',
  },
  {
    no: '05',
    title: 'Frontend-Modernisierung',
    blurb: 'Ein veraltetes Frontend, neu gebaut in Angular oder React – schneller, barrierefrei und wartbar.',
  },
  {
    no: '06',
    title: 'Prototyp oder MVP',
    blurb: 'Eine funktionierende erste Version Ihrer Idee – genug zum Testen mit Nutzern, Vorführen und Pitchen.',
  },
]

export const services: Localized<Service[]> = { en, de }
