import type { VisualKind } from '../components/ui/Visual'
import type { Localized } from '../i18n/localize'
import type { Lang } from '../i18n/lang'
import { loc } from '../i18n/localize'

export interface Work {
  slug: string
  title: string
  client: string
  year: string
  role: string
  category: string
  stack: string[]
  /** generative artwork style for this project */
  visual: VisualKind
  summary: string
  /** Optional SERP meta description (≤150 chars). Falls back to `summary`. */
  seoDescription?: string
  /** One-line outcome shown in the grid */
  outcome: string
  problem: string
  approach: string[]
  results: string[]
  /** Optional external/live link */
  link?: { label: string; href: string }
  /** Optional real screenshot (public path). When set, it replaces the
   *  generative line-art on the work card and case-study hero. Only used for
   *  public, non-NDA projects. */
  shot?: string
}

/**
 * NOTE: employer work is anonymized (no internal product or company names, no
 * confidential metrics) to respect NDA/confidentiality. Third-party platforms
 * (SAP, Azure, Angular, …) are public tech and fine to name. RoboCar is a
 * personal project and named freely.
 *
 * Slugs are language-neutral and shared across locales. Keep the German `de`
 * array in the same order, with the same slugs/visuals — translate
 * only the prose (title may stay, category/role/summary/problem/approach/results).
 */
const en: Work[] = [
  {
    slug: 'sap-analytics-saas',
    title: 'SAP-Analytics SaaS',
    client: 'German software company',
    year: '2022 — 2024',
    role: 'UX/UI Lead & Frontend Engineer',
    category: 'SaaS · Data Analytics',
    stack: ['Angular', 'TypeScript', 'RxJS', 'Figma', 'Azure'],
    visual: 'flow',
    summary:
      'A SAP data-analytics product reimagined as a cloud-native SaaS on Azure — from the first Figma mockups to a production Angular interface.',
    seoDescription:
      'On-prem SAP analytics reimagined as a cloud-native Azure SaaS — UX designed in Figma, production frontend in Angular. A WyroTech case study.',
    outcome: 'Turned an on-prem analytics tool into a self-serve SaaS — one product non-technical analysts can run without training.',
    problem:
      'An on-prem SAP analytics tool needed to become a scalable, self-serve SaaS product. That meant a new product direction, a coherent interface for dense data work, and a frontend that could grow feature by feature.',
    approach: [
      'Helped shape the product as a cloud-native SaaS on Azure.',
      'Designed the end-to-end UX and high-fidelity UI in Figma — flows, states and data-heavy views.',
      'Built the production interface in Angular with a typed, reactive (RxJS) architecture.',
      'Set UI patterns so every new analytics feature shipped consistently — no drift, no rework.',
    ],
    results: [
      'Analysts work dense SAP data without engineering help — and without a training program.',
      'A frontend architecture designed for steady feature delivery.',
      'A clear visual language carried from Figma into shipped code.',
    ],
  },
  {
    slug: 'customer-portal-design-system',
    title: 'Customer-Portal Design System',
    client: 'German software company',
    year: '2019 — 2021',
    role: 'Design System & Frontend',
    category: 'Design System · Portal',
    stack: ['Angular', 'TypeScript', 'Sass', 'Figma'],
    visual: 'contours',
    summary:
      'A customer portal built on a purpose-made design system — defined in Figma and implemented end-to-end in Angular.',
    seoDescription:
      'A customer portal built on a purpose-made design system — defined in Figma and shipped end to end in Angular. A WyroTech case study.',
    outcome: 'Ship portal features fast, with zero visual drift — one design system, design to code.',
    problem:
      'The portal needed a consistent, reusable interface language so features could ship quickly without visual drift.',
    approach: [
      'Created the design system in Figma — tokens, components and usage rules.',
      'Translated the system into a reusable Angular component library.',
      'Built the customer portal on that foundation.',
    ],
    results: [
      'A single source of truth shared between design and engineering.',
      'Faster, more consistent feature delivery across the portal.',
    ],
  },
  {
    slug: 'enterprise-saas-product',
    title: 'SAP Data & BI Platform',
    client: 'German software company',
    year: '2019 — 2024',
    role: 'Frontend Engineer',
    category: 'Analytics Platform · Web App',
    stack: ['SAP', 'Microsoft Fabric', 'Power BI', 'Angular', '.NET', 'TypeScript'],
    visual: 'waves',
    summary:
      'An enterprise platform that extracts data from SAP, models it in Microsoft Fabric, and surfaces it through Power BI and a custom Angular interface.',
    seoDescription:
      'Enterprise platform that extracts SAP data, models it in Microsoft Fabric and surfaces it via Power BI and a custom Angular frontend.',
    outcome: 'Turned locked-away SAP data into Power BI dashboards the business can actually use — through a clean, maintainable frontend.',
    problem:
      'SAP data was locked in the system and hard to work with. It needed to be extracted, analyzed in Microsoft Fabric, and delivered to the right people as clear Power BI views.',
    approach: [
      'Built the Angular and .NET frontend for the SAP data-analytics platform.',
      'Surfaced data extracted from SAP and modeled in Microsoft Fabric.',
      'Integrated Power BI reporting into the product interface.',
      'Shipped features across the platform over several years.',
    ],
    results: [
      'SAP data made visible and usable through Power BI and a custom interface.',
      'A long-lived platform I kept shipping features on for years.',
    ],
  },
  {
    slug: 'sap-desktop-tool',
    title: 'One-Click SAP Desktop Tool',
    client: 'German software company',
    year: '2020',
    role: 'Desktop App Engineer',
    category: 'Desktop · Electron',
    stack: ['Electron', 'TypeScript', 'SAP GUI'],
    visual: 'harmonograph',
    summary:
      'A desktop utility that opens SAP data inside the SAP GUI with a single click — removing a tedious, repetitive workflow.',
    seoDescription:
      'An Electron desktop tool that opens SAP data inside the SAP GUI in one click — removing a slow, repetitive daily workflow.',
    outcome: 'A daily multi-step SAP chore, gone — one click instead.',
    problem: 'Reaching specific SAP data in the SAP GUI was slow and manual. Users needed a shortcut.',
    approach: [
      'Designed and built an Electron desktop app.',
      'Implemented a one-click flow straight into the SAP GUI.',
    ],
    results: ['A faster path to SAP data that removed repetitive manual steps.'],
  },
  {
    slug: 'robocar-4',
    title: 'RoboCar 4.0',
    client: 'Personal R&D',
    year: '2024',
    role: 'Full-Stack & Hardware',
    category: 'IoT · Robotics',
    stack: ['ESP32', 'Python', 'WebSockets', 'Arduino'],
    visual: 'flow',
    summary:
      'A smart robot car controlled in real time over WebSockets — an ESP32 and a Python backend talking JSON to an Arduino, with a live camera stream to the browser.',
    seoDescription:
      'A smart robot car controlled in real time over WebSockets — ESP32 + Python backend, Arduino motors and a live camera stream to the browser.',
    outcome: 'Real-time robot control over WebSockets — ESP32 + Python.',
    problem:
      'Build a responsive, low-latency control loop for a physical robot car spanning web, backend and microcontrollers.',
    approach: [
      'Controlled the car via an ESP32 and a Python backend on an Elegoo smart-car chassis.',
      'Used WebSockets for real-time, bidirectional control with a live camera feed in the browser.',
      'Exchanged JSON messages between the ESP32 and an Arduino, driving the motors through an L298N driver.',
    ],
    results: ['A working real-time control system across the full hardware/software stack.'],
    link: { label: 'View on GitHub', href: 'https://github.com/WyroTech/RoboCar' },
  },
  {
    slug: 'mitrisa-velo',
    title: 'Mitrisa Velo — Speech Therapy',
    client: 'Family project',
    year: '2026',
    role: 'Design & Build',
    category: 'Website · Healthcare',
    stack: ['React'],
    visual: 'ripple',
    shot: '/work/mitrisa-velo.webp',
    summary:
      'A clean single-page website for a speech-language therapist — designed and built end to end in React, as a project for family & friends.',
    seoDescription:
      'A clean one-page website for a speech-language therapist — designed and built end to end in React. A WyroTech case study.',
    outcome: 'A speech therapist’s practice online — a simple site to show her services and get in touch.',
    problem:
      'A speech-language therapist needed a simple, trustworthy web presence: one place to explain her services and let people reach her.',
    approach: [
      'Designed and built the site end to end in React.',
      'Laid out the therapy services clearly on a single page.',
      'Added a straightforward way to get in touch and book a session.',
    ],
    results: [
      'A live, easy-to-navigate site the practice can point clients to.',
      'Built as a personal project for family & friends.',
    ],
    link: { label: 'Visit the site', href: 'https://www.logopede-mitrisavelo.com/' },
  },
  {
    slug: 'wyrotech-portfolio',
    title: 'WyroTech — Portfolio Site',
    client: 'Personal project',
    year: '2025',
    role: 'Design & Build',
    category: 'Website · Personal Brand',
    stack: ['Astro', 'React', 'TypeScript'],
    visual: 'contours',
    shot: '/work/wyrotech-portfolio.webp',
    summary:
      'My previous personal portfolio — a bilingual, dark-themed single-page site built with Astro and React islands. The direct predecessor to the site you are on now.',
    seoDescription:
      'The previous WyroTech portfolio — a bilingual, dark-themed one-page site built with Astro and React islands. A WyroTech case study.',
    outcome: 'My own brand online — a fast, bilingual portfolio I designed and shipped end to end.',
    problem:
      'I needed a personal site that presented my work and skills clearly, in both German and English, and stayed fast and easy to maintain.',
    approach: [
      'Designed and built the site end to end as a personal-brand portfolio.',
      'Used Astro with React islands to keep the page fast and mostly static.',
      'Made it fully bilingual (DE/EN) with a dark, focused visual style.',
      'Laid out home, skills, career and contact on a single page.',
    ],
    results: [
      'A live, bilingual portfolio that shipped as my personal site.',
      'The direct predecessor to the portfolio you are reading now.',
    ],
    link: { label: 'Visit the site', href: 'https://portfolio-wyrotech.vercel.app/' },
  },
]

const de: Work[] = [
  {
    slug: 'sap-analytics-saas',
    title: 'SAP-Analytics-SaaS',
    client: 'Deutsches Softwareunternehmen',
    year: '2022 — 2024',
    role: 'UX/UI-Lead & Frontend-Engineer',
    category: 'SaaS · Datenanalyse',
    stack: ['Angular', 'TypeScript', 'RxJS', 'Figma', 'Azure'],
    visual: 'flow',
    summary:
      'Ein SAP-Datenanalyse-Produkt, neu gedacht als cloud-native SaaS-Anwendung auf Azure – von den ersten Figma-Mockups bis zum produktiven Angular-Interface.',
    seoDescription:
      'SAP-Datenanalyse, neu gedacht als cloud-native SaaS auf Azure – UX in Figma entworfen, produktives Frontend in Angular. Eine WyroTech-Case-Study.',
    outcome: 'Aus einem On-Prem-Analysewerkzeug ein Self-Service-SaaS gemacht – ein Produkt, das Analysten ohne technischen Hintergrund ohne Schulung bedienen.',
    problem:
      'Ein lokal betriebenes SAP-Analysewerkzeug sollte zu einem skalierbaren Self-Service-SaaS werden. Das bedeutete eine neue Produktrichtung, ein stimmiges Interface für dichte Datenarbeit und ein Frontend, das Feature für Feature wachsen kann.',
    approach: [
      'Das Produkt als cloud-native SaaS-Anwendung auf Azure mitgestaltet.',
      'Die durchgängige UX und das detailgetreue UI in Figma entworfen – Flows, Zustände und datenreiche Ansichten.',
      'Das produktive Interface in Angular mit typisierter, reaktiver Architektur (RxJS) gebaut.',
      'UI-Muster gesetzt, damit jede neue Analysefunktion konsistent ausgeliefert wurde – ohne Abweichung, ohne Nacharbeit.',
    ],
    results: [
      'Analysten bearbeiten dichte SAP-Daten ohne Hilfe aus dem Engineering – und ohne Schulungsprogramm.',
      'Eine Frontend-Architektur, ausgelegt auf stetige Feature-Auslieferung.',
      'Eine klare visuelle Sprache, von Figma bis in den ausgelieferten Code.',
    ],
  },
  {
    slug: 'customer-portal-design-system',
    title: 'Designsystem für ein Kundenportal',
    client: 'Deutsches Softwareunternehmen',
    year: '2019 — 2021',
    role: 'Designsystem & Frontend',
    category: 'Designsystem · Portal',
    stack: ['Angular', 'TypeScript', 'Sass', 'Figma'],
    visual: 'contours',
    summary:
      'Ein Kundenportal auf einem eigens entwickelten Designsystem – in Figma definiert und durchgängig in Angular umgesetzt.',
    seoDescription:
      'Ein Kundenportal auf einem eigens gebauten Designsystem – in Figma definiert und durchgängig in Angular umgesetzt. Eine WyroTech-Case-Study.',
    outcome: 'Portal-Features schnell ausliefern, ohne visuelle Abweichung – ein Designsystem, von Design bis Code.',
    problem:
      'Das Portal brauchte eine konsistente, wiederverwendbare Interface-Sprache, damit Features schnell und ohne visuelle Abweichungen entstehen können.',
    approach: [
      'Das Designsystem in Figma erstellt – Tokens, Komponenten und Nutzungsregeln.',
      'Das System in eine wiederverwendbare Angular-Komponentenbibliothek überführt.',
      'Das Kundenportal auf dieser Grundlage gebaut.',
    ],
    results: [
      'Eine gemeinsame, verbindliche Referenz für Design und Engineering.',
      'Schnellere, konsistentere Feature-Auslieferung im gesamten Portal.',
    ],
  },
  {
    slug: 'enterprise-saas-product',
    title: 'SAP-Daten- & BI-Plattform',
    client: 'Deutsches Softwareunternehmen',
    year: '2019 — 2024',
    role: 'Frontend-Engineer',
    category: 'Analytics-Plattform · Web-App',
    stack: ['SAP', 'Microsoft Fabric', 'Power BI', 'Angular', '.NET', 'TypeScript'],
    visual: 'waves',
    summary:
      'Eine Enterprise-Plattform, die Daten aus SAP extrahiert, sie in Microsoft Fabric modelliert und über Power BI und eine eigene Angular-Oberfläche bereitstellt.',
    seoDescription:
      'Enterprise-Plattform, die SAP-Daten extrahiert, in Microsoft Fabric modelliert und über Power BI und eine eigene Angular-Oberfläche bereitstellt.',
    outcome: 'Aus eingeschlossenen SAP-Daten wurden Power-BI-Dashboards, mit denen die Fachbereiche wirklich arbeiten können – über ein klares, wartbares Frontend.',
    problem:
      'Die SAP-Daten steckten im System fest und waren schwer nutzbar. Sie mussten extrahiert, in Microsoft Fabric ausgewertet und den richtigen Leuten als klare Power-BI-Sichten bereitgestellt werden.',
    approach: [
      'Das Angular- und .NET-Frontend für die SAP-Datenplattform gebaut.',
      'Aus SAP extrahierte und in Microsoft Fabric modellierte Daten zugänglich gemacht.',
      'Power-BI-Reporting in die Produktoberfläche integriert.',
      'Über mehrere Jahre Features auf der Plattform ausgeliefert.',
    ],
    results: [
      'SAP-Daten über Power BI und eine eigene Oberfläche sichtbar und nutzbar gemacht.',
      'Eine langlebige Plattform, auf der ich über Jahre Features ausgeliefert habe.',
    ],
  },
  {
    slug: 'sap-desktop-tool',
    title: 'SAP-Desktop-Tool mit Ein-Klick-Zugriff',
    client: 'Deutsches Softwareunternehmen',
    year: '2020',
    role: 'Desktop-App-Engineer',
    category: 'Desktop · Electron',
    stack: ['Electron', 'TypeScript', 'SAP GUI'],
    visual: 'harmonograph',
    summary:
      'Ein Desktop-Tool, das SAP-Daten mit einem einzigen Klick im SAP GUI öffnet – und einen mühsamen, sich wiederholenden Ablauf ersetzt.',
    seoDescription:
      'Ein Electron-Desktop-Tool, das SAP-Daten mit einem Klick im SAP GUI öffnet – und einen mühsamen, täglichen Ablauf ersetzt.',
    outcome: 'Eine tägliche, mehrstufige SAP-Prozedur – weg, ein Klick stattdessen.',
    problem: 'Bestimmte SAP-Daten im SAP GUI zu erreichen, war langsam und manuell. Es fehlte eine Abkürzung.',
    approach: [
      'Eine Electron-Desktop-App entworfen und gebaut.',
      'Einen Ein-Klick-Ablauf direkt ins SAP GUI umgesetzt.',
    ],
    results: ['Ein schnellerer Weg zu SAP-Daten, der wiederkehrende manuelle Schritte überflüssig macht.'],
  },
  {
    slug: 'robocar-4',
    title: 'RoboCar 4.0',
    client: 'Eigenes F&E-Projekt',
    year: '2024',
    role: 'Full-Stack & Hardware',
    category: 'IoT · Robotik',
    stack: ['ESP32', 'Python', 'WebSockets', 'Arduino'],
    visual: 'flow',
    summary:
      'Ein smartes Roboterauto, in Echtzeit über WebSockets gesteuert – ein ESP32 und ein Python-Backend sprechen JSON mit einem Arduino, mit einem Live-Kamerastream in den Browser.',
    seoDescription:
      'Ein smartes Roboterauto, in Echtzeit über WebSockets gesteuert – ESP32 + Python-Backend, Arduino-Motoren und Live-Kamerastream im Browser.',
    outcome: 'Echtzeit-Robotersteuerung über WebSockets – ESP32 + Python.',
    problem:
      'Eine reaktionsschnelle Steuerschleife mit geringer Latenz für ein physisches Roboterauto bauen – über Web, Backend und Mikrocontroller hinweg.',
    approach: [
      'Das Auto über einen ESP32 und ein Python-Backend auf einem Elegoo-Smart-Car-Chassis gesteuert.',
      'WebSockets für bidirektionale Steuerung in Echtzeit genutzt, mit einem Live-Kamerabild im Browser.',
      'JSON-Nachrichten zwischen dem ESP32 und einem Arduino ausgetauscht und die Motoren über einen L298N-Treiber angesteuert.',
    ],
    results: ['Ein funktionierendes Echtzeit-Steuersystem über den gesamten Hardware-/Software-Stack.'],
    link: { label: 'Auf GitHub ansehen', href: 'https://github.com/WyroTech/RoboCar' },
  },
  {
    slug: 'mitrisa-velo',
    title: 'Mitrisa Velo — Logopädie',
    client: 'Familienprojekt',
    year: '2026',
    role: 'Design & Umsetzung',
    category: 'Website · Gesundheit',
    stack: ['React'],
    visual: 'ripple',
    shot: '/work/mitrisa-velo.webp',
    summary:
      'Eine klare One-Page-Website für eine Logopädin – durchgängig in React gestaltet und gebaut, als Projekt für Familie & Freunde.',
    seoDescription:
      'Eine klare One-Page-Website für eine Logopädin – durchgängig in React gestaltet und gebaut. Eine WyroTech-Case-Study.',
    outcome: 'Die Praxis einer Logopädin online – eine einfache Seite, die ihre Leistungen zeigt und Kontakt ermöglicht.',
    problem:
      'Eine Logopädin brauchte einen einfachen, vertrauenswürdigen Webauftritt: einen Ort, der ihre Leistungen erklärt und Kontakt ermöglicht.',
    approach: [
      'Die Seite durchgängig in React gestaltet und gebaut.',
      'Die Therapie-Leistungen klar auf einer Seite dargestellt.',
      'Einen einfachen Weg zur Kontaktaufnahme und Terminbuchung ergänzt.',
    ],
    results: [
      'Eine live geschaltete, übersichtliche Seite, auf die die Praxis verweisen kann.',
      'Als persönliches Projekt für Familie & Freunde gebaut.',
    ],
    link: { label: 'Zur Website', href: 'https://www.logopede-mitrisavelo.com/' },
  },
  {
    slug: 'wyrotech-portfolio',
    title: 'WyroTech — Portfolio-Seite',
    client: 'Eigenes Projekt',
    year: '2025',
    role: 'Design & Umsetzung',
    category: 'Website · Eigenmarke',
    stack: ['Astro', 'React', 'TypeScript'],
    visual: 'contours',
    shot: '/work/wyrotech-portfolio.webp',
    summary:
      'Mein vorheriges persönliches Portfolio – eine zweisprachige, dunkel gestaltete One-Page-Site mit Astro und React-Islands. Der direkte Vorgänger dieser Seite.',
    seoDescription:
      'Das vorherige WyroTech-Portfolio – eine zweisprachige, dunkle One-Page-Site mit Astro und React-Islands. Eine WyroTech-Case-Study.',
    outcome: 'Die eigene Marke online – ein schnelles, zweisprachiges Portfolio, durchgängig selbst gestaltet und umgesetzt.',
    problem:
      'Ich brauchte eine persönliche Seite, die meine Arbeit und Fähigkeiten klar zeigt – auf Deutsch und Englisch – und dabei schnell und wartbar bleibt.',
    approach: [
      'Die Seite durchgängig als persönliches Marken-Portfolio gestaltet und gebaut.',
      'Astro mit React-Islands genutzt, um die Seite schnell und überwiegend statisch zu halten.',
      'Vollständig zweisprachig umgesetzt (DE/EN) mit einem dunklen, fokussierten Look.',
      'Startseite, Fähigkeiten, Werdegang und Kontakt auf einer Seite angeordnet.',
    ],
    results: [
      'Ein live geschaltetes, zweisprachiges Portfolio als meine persönliche Seite.',
      'Der direkte Vorgänger des Portfolios, das du gerade liest.',
    ],
    link: { label: 'Zur Website', href: 'https://portfolio-wyrotech.vercel.app/' },
  },
]

export const works: Localized<Work[]> = { en, de }

/** All works in the active language. */
export const getWorks = (lang: Lang): Work[] => loc(works, lang)

/** A single work by slug in the active language. */
export const getWork = (slug: string, lang: Lang): Work | undefined =>
  getWorks(lang).find((w) => w.slug === slug)
