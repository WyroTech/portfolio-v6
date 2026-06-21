import type { Localized } from '../i18n/localize'

export interface Role {
  period: string
  title: string
  org: string
  location?: string
  points?: string[]
}

const en: Role[] = [
  {
    period: '01.2026 — now',
    title: 'Senior Product Engineer',
    org: 'PartSpace GmbH',
    location: 'Deggendorf',
  },
  {
    period: '11.2024 — 2025',
    title: 'Principal Software Engineer & UX/UI Lead',
    org: 'dab: Daten — Analysen & Beratung GmbH',
    location: 'Deggendorf',
    points: [
      'Led and reviewed the work of junior-to-mid developers.',
      'Built the design system that kept the product UI consistent and fast to extend.',
      'Planned product features in Figma for a B2B SaaS platform.',
      'Designed the UX journey and first prototypes for a new AI project.',
    ],
  },
  {
    period: '08.2022 — 11.2024',
    title: 'Senior Software Developer',
    org: 'dab: Daten — Analysen & Beratung GmbH',
    location: 'Deggendorf',
    points: [
      'Shipped 10+ major feature releases to production on a live SaaS product.',
      'Rewrote a core C# data-extraction library, cutting run times by up to 70%.',
      'Planned a SaaS analytics module on Azure.',
      'Designed and built its interface (Figma + Angular).',
    ],
  },
  {
    period: '09.2019 — 08.2022',
    title: 'Software Developer',
    org: 'dab: Daten — Analysen & Beratung GmbH',
    location: 'Deggendorf',
    points: [
      'Built an internal SAP access tool in Electron.',
      'Built the foundation of a new product from scratch in Angular and .NET Core.',
      'Integrated CI/CD pipelines with Azure DevOps.',
      'Created a customer-portal design system in Figma and built it in Angular.',
    ],
  },
  {
    period: '08.2016 — 09.2019',
    title: 'Software Developer — Python & Odoo',
    org: 'ACP IT Solutions AG',
    location: 'Passau & Munich',
    points: [
      'Built Odoo add-ons: drag & drop, Azure SSO integration.',
      'Developed a platform migration tool.',
      'Delivered custom Odoo add-ons for clients.',
    ],
  },
]

const de: Role[] = [
  {
    period: '01.2026 — heute',
    title: 'Senior Product Engineer',
    org: 'PartSpace GmbH',
    location: 'Deggendorf',
  },
  {
    period: '11.2024 — 2025',
    title: 'Principal Software Engineer & UX/UI-Lead',
    org: 'dab: Daten — Analysen & Beratung GmbH',
    location: 'Deggendorf',
    points: [
      'Leitung und Review der Arbeit von Junior- bis Mid-Level-Entwicklern.',
      'Aufbau des Designsystems, das die Produkt-UI konsistent und schnell erweiterbar hielt.',
      'Konzeption von Produkt-Features in Figma für eine B2B-SaaS-Plattform.',
      'Gestaltung der UX-Journey und ersten Prototypen für ein neues KI-Projekt.',
    ],
  },
  {
    period: '08.2022 — 11.2024',
    title: 'Senior Softwareentwickler',
    org: 'dab: Daten — Analysen & Beratung GmbH',
    location: 'Deggendorf',
    points: [
      'Auslieferung von über 10 größeren Feature-Releases in Produktion auf einem Live-SaaS-Produkt.',
      'Neuentwicklung einer zentralen C#-Datenextraktionsbibliothek, bis zu 70 % schnellere Laufzeiten.',
      'Konzeption eines SaaS-Analysemoduls auf Azure.',
      'Gestaltung und Umsetzung seiner Oberfläche (Figma + Angular).',
    ],
  },
  {
    period: '09.2019 — 08.2022',
    title: 'Softwareentwickler',
    org: 'dab: Daten — Analysen & Beratung GmbH',
    location: 'Deggendorf',
    points: [
      'Entwicklung eines internen SAP-Zugriffstools in Electron.',
      'Aufbau der Grundlage eines neuen Produkts von Grund auf in Angular und .NET Core.',
      'Integration von CI/CD-Pipelines mit Azure DevOps.',
      'Erstellung eines Kundenportal-Designsystems in Figma und Umsetzung in Angular.',
    ],
  },
  {
    period: '08.2016 — 09.2019',
    title: 'Softwareentwickler — Python & Odoo',
    org: 'ACP IT Solutions AG',
    location: 'Passau & München',
    points: [
      'Entwicklung von Odoo-Add-ons: Drag & Drop, Azure-SSO-Integration.',
      'Entwicklung eines Plattform-Migrationstools.',
      'Umsetzung individueller Odoo-Add-ons für Kunden.',
    ],
  },
]

export const timeline: Localized<Role[]> = { en, de }
