import type { Localized } from '../i18n/localize'

export interface Service {
  no: string
  title: string
  blurb: string
}

const en: Service[] = [
  {
    no: '01',
    title: 'Custom website',
    blurb: 'A fast, polished website that fits your brand — designed and built end to end, ready to launch.',
  },
  {
    no: '02',
    title: 'Web app or dashboard',
    blurb: 'A custom web app or dashboard for your business — including AI features when you need them.',
  },
  {
    no: '03',
    title: 'Online shop',
    blurb: 'An online shop your customers enjoy using and that turns visitors into buyers.',
  },
  {
    no: '04',
    title: 'Redesign or relaunch',
    blurb: 'A tired site rebuilt — faster and modern, keeping your content and your Google ranking.',
  },
  {
    no: '05',
    title: 'Prototype or MVP',
    blurb: 'A working first version of your idea, fast — enough to test, demo, and raise money.',
  },
  {
    no: '06',
    title: 'Performance & SEO',
    blurb: 'A site that loads fast and gets found on Google — the technical basics done right.',
  },
]

const de: Service[] = [
  {
    no: '01',
    title: 'Individuelle Website',
    blurb: 'Eine schnelle, hochwertige Website passend zu Ihrer Marke – durchgängig gestaltet, gebaut und startklar.',
  },
  {
    no: '02',
    title: 'Web-App oder Dashboard',
    blurb: 'Eine maßgeschneiderte Web-App oder ein Dashboard für Ihr Unternehmen – auf Wunsch mit KI-Funktionen.',
  },
  {
    no: '03',
    title: 'Online-Shop',
    blurb: 'Ein Online-Shop, den Ihre Kunden gern nutzen und der Besucher zu Käufern macht.',
  },
  {
    no: '04',
    title: 'Redesign oder Relaunch',
    blurb: 'Ein in die Jahre gekommener Auftritt, neu gebaut – schneller und modern, mit Ihren Inhalten und Ihrem Google-Ranking.',
  },
  {
    no: '05',
    title: 'Prototyp oder MVP',
    blurb: 'Eine funktionierende erste Version Ihrer Idee – schnell genug zum Testen, Vorführen und Pitchen.',
  },
  {
    no: '06',
    title: 'Performance & SEO',
    blurb: 'Eine Website, die schnell lädt und bei Google gefunden wird – die technische Basis sauber umgesetzt.',
  },
]

export const services: Localized<Service[]> = { en, de }
