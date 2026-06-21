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
  /** Data-as-headline: one metric shown on the work card */
  metric: { value: string; label: string }
  /** Whether to feature this card at full width in the asymmetric grid */
  featured?: boolean
  summary: string
  /** One-line outcome shown in the grid */
  outcome: string
  problem: string
  approach: string[]
  results: string[]
  /** Optional external/live link */
  link?: { label: string; href: string }
}

/**
 * NOTE: employer work is anonymized (no internal product or company names, no
 * confidential metrics) to respect NDA/confidentiality. Third-party platforms
 * (SAP, Azure, Angular, …) are public tech and fine to name. RoboCar is a
 * personal project and named freely.
 *
 * Slugs are language-neutral and shared across locales. Keep the German `de`
 * array in the same order, with the same slugs/visuals/metric values — translate
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
    metric: { value: '0→1', label: 'on-prem → self-serve SaaS' },
    featured: true,
    summary:
      'A SAP data-analytics product reimagined as a cloud-native SaaS on Azure — from the first Figma mockups to a production Angular interface.',
    outcome: 'Turned an on-prem analytics tool into a self-serve SaaS — one product non-technical analysts can run without training.',
    problem:
      'An on-prem SAP analytics tool needed to become a scalable, self-serve SaaS product. That meant a new product direction, a coherent interface for dense data work, and a frontend that could grow feature by feature.',
    approach: [
      'Helped shape the product as a cloud-native SaaS on Azure.',
      'Designed the end-to-end UX and high-fidelity UI in Figma — flows, states and data-heavy views.',
      'Built the production interface in Angular with a typed, reactive (RxJS) architecture.',
      'Set UI patterns so every new analytics feature shipped consistent — no drift, no rework.',
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
    metric: { value: '1', label: 'one source of truth, design → code' },
    summary:
      'A customer portal built on a purpose-made design system — defined in Figma and implemented end-to-end in Angular.',
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
    title: 'Enterprise SaaS Product',
    client: 'German software company',
    year: '2019 — 2024',
    role: 'Frontend Engineer',
    category: 'Product · Web App',
    stack: ['Angular', '.NET Core', 'TypeScript', 'Azure DevOps'],
    visual: 'waves',
    metric: { value: 'Angular · .NET', label: 'years in production, still shipping' },
    summary:
      'A flagship enterprise product built from the base up in Angular and .NET Core, with CI/CD pipelines and a growing design system.',
    outcome: 'A flagship product still shipping years later — built to stay maintainable, not just to launch.',
    problem:
      'A new flagship product needed a solid base, a maintainable frontend and a delivery pipeline the team could rely on.',
    approach: [
      'Built the base product with Angular and .NET Core.',
      'Contributed feature releases over multiple years.',
      'Integrated CI/CD pipelines with Azure DevOps.',
      'Helped shape the product’s design system.',
    ],
    results: [
      'A long-lived flagship product with a sustainable frontend codebase.',
      'Reliable, automated delivery.',
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
    metric: { value: '1-click', label: 'SAP data access' },
    summary:
      'A desktop utility that opens SAP data inside the SAP GUI with a single click — removing a tedious, repetitive workflow.',
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
    metric: { value: 'real-time', label: 'WebSocket control' },
    summary:
      'A smart robot car controlled in real time over WebSockets — an ESP32 and a Python backend talking JSON to an Arduino, with a live camera stream to the browser.',
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
    slug: 'wyro-tech-portfolio',
    title: 'wyro.tech — Angular Portfolio',
    client: 'Personal',
    year: '2026',
    role: 'Frontend Engineer & Designer',
    category: 'Web · Portfolio',
    stack: ['Angular', 'Tailwind CSS', 'GSAP', 'Transloco', 'Vercel'],
    visual: 'contours',
    metric: { value: 'CI-gated', label: 'a11y + Lighthouse on every PR' },
    summary:
      'A cinematic Angular 20 portfolio, built with Tailwind v4 and GSAP, localized with Transloco and statically prerendered on Vercel.',
    outcome: 'A portfolio where every PR has to pass a11y and Lighthouse before it can merge.',
    problem:
      'Build a fast, animated, bilingual portfolio that stays accessible and performant as it grows — and prove it on every change, not just at launch.',
    approach: [
      'Built the site in Angular 20 with Tailwind v4 for styling.',
      'Used GSAP for the cinematic, scroll-driven motion.',
      'Localized the interface with Transloco and prerendered statically for Vercel.',
      'Gated every pull request behind a CI pipeline: build, bundle budget, smoke test, accessibility and a mobile Lighthouse run.',
    ],
    results: [
      'A bilingual, animated portfolio with a strict performance and accessibility budget.',
      'Quality enforced automatically — no regression ships without passing the gate.',
    ],
    link: { label: 'View on GitHub', href: 'https://github.com/WyroTech/wyro-tech' },
  },
  {
    slug: 'wyrotech-astro-portfolio',
    title: 'WyroTech — Astro Portfolio',
    client: 'Personal',
    year: '2025',
    role: 'Full-Stack Developer',
    category: 'Web · Portfolio',
    stack: ['Astro', 'TypeScript', 'CSS'],
    visual: 'flow',
    metric: { value: 'static', label: 'Astro site shipped on Vercel' },
    summary:
      'An earlier personal portfolio built with Astro and TypeScript — a fast, content-first static site deployed on Vercel.',
    outcome: 'A lightweight, content-first portfolio shipped as a static Astro site.',
    problem: 'Stand up a fast personal site that ships mostly static HTML, with just enough TypeScript for interactivity.',
    approach: [
      'Built the site with Astro, keeping the shipped JavaScript minimal.',
      'Wrote the interactive pieces in TypeScript.',
      'Deployed as a static site on Vercel.',
    ],
    results: ['A fast, low-overhead portfolio that loads quickly and is simple to maintain.'],
    link: { label: 'View on GitHub', href: 'https://github.com/WyroTech/wyrotech' },
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
    metric: { value: '0→1', label: 'von On-Prem zu Self-Service-SaaS' },
    featured: true,
    summary:
      'Ein SAP-Datenanalyse-Produkt, neu gedacht als cloud-native SaaS-Anwendung auf Azure – von den ersten Figma-Mockups bis zum produktiven Angular-Interface.',
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
    metric: { value: '1', label: 'eine Referenz, Design → Code' },
    summary:
      'Ein Kundenportal auf einem eigens entwickelten Designsystem – in Figma definiert und durchgängig in Angular umgesetzt.',
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
    title: 'Enterprise-SaaS-Produkt',
    client: 'Deutsches Softwareunternehmen',
    year: '2019 — 2024',
    role: 'Frontend-Engineer',
    category: 'Produkt · Web-App',
    stack: ['Angular', '.NET Core', 'TypeScript', 'Azure DevOps'],
    visual: 'waves',
    metric: { value: 'Angular · .NET', label: 'Jahre produktiv, weiter ausgeliefert' },
    summary:
      'Ein zentrales Enterprise-Produkt, von Grund auf in Angular und .NET Core gebaut – mit CI/CD-Pipelines und einem wachsenden Designsystem.',
    outcome: 'Ein zentrales Produkt, das Jahre später noch ausgeliefert wird – gebaut, um wartbar zu bleiben, nicht nur zu starten.',
    problem:
      'Ein neues zentrales Produkt brauchte ein solides Fundament, ein wartbares Frontend und eine Auslieferungspipeline, auf die sich das Team verlassen kann.',
    approach: [
      'Das Basisprodukt mit Angular und .NET Core gebaut.',
      'Über mehrere Jahre an Feature-Releases mitgewirkt.',
      'CI/CD-Pipelines mit Azure DevOps integriert.',
      'Das Designsystem des Produkts mitgeprägt.',
    ],
    results: [
      'Ein langlebiges zentrales Produkt mit einer tragfähigen Frontend-Codebasis.',
      'Zuverlässige, automatisierte Auslieferung.',
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
    metric: { value: '1-click', label: 'Zugriff auf SAP-Daten' },
    summary:
      'Ein Desktop-Tool, das SAP-Daten mit einem einzigen Klick im SAP GUI öffnet – und einen mühsamen, sich wiederholenden Ablauf ersetzt.',
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
    metric: { value: 'real-time', label: 'Steuerung per WebSocket' },
    summary:
      'Ein smartes Roboterauto, in Echtzeit über WebSockets gesteuert – ein ESP32 und ein Python-Backend sprechen JSON mit einem Arduino, mit einem Live-Kamerastream in den Browser.',
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
    slug: 'wyro-tech-portfolio',
    title: 'wyro.tech — Angular-Portfolio',
    client: 'Privat',
    year: '2026',
    role: 'Frontend-Engineer & Designer',
    category: 'Web · Portfolio',
    stack: ['Angular', 'Tailwind CSS', 'GSAP', 'Transloco', 'Vercel'],
    visual: 'contours',
    metric: { value: 'CI-gated', label: 'A11y + Lighthouse bei jedem PR' },
    summary:
      'Ein cinematisches Angular-20-Portfolio, gebaut mit Tailwind v4 und GSAP, mit Transloco lokalisiert und statisch auf Vercel vorgerendert.',
    outcome: 'Ein Portfolio, bei dem jeder PR A11y und Lighthouse bestehen muss, bevor er gemergt werden kann.',
    problem:
      'Ein schnelles, animiertes, zweisprachiges Portfolio bauen, das beim Wachsen barrierefrei und performant bleibt – und das bei jeder Änderung belegen, nicht nur zum Start.',
    approach: [
      'Die Seite in Angular 20 mit Tailwind v4 für das Styling gebaut.',
      'GSAP für die cinematische, scrollgesteuerte Bewegung genutzt.',
      'Das Interface mit Transloco lokalisiert und für Vercel statisch vorgerendert.',
      'Jeden Pull Request hinter einer CI-Pipeline abgesichert: Build, Bundle-Budget, Smoke-Test, Barrierefreiheit und ein mobiler Lighthouse-Lauf.',
    ],
    results: [
      'Ein zweisprachiges, animiertes Portfolio mit striktem Performance- und Barrierefreiheits-Budget.',
      'Qualität automatisch erzwungen – keine Regression geht ohne bestandenes Gate live.',
    ],
    link: { label: 'Auf GitHub ansehen', href: 'https://github.com/WyroTech/wyro-tech' },
  },
  {
    slug: 'wyrotech-astro-portfolio',
    title: 'WyroTech — Astro-Portfolio',
    client: 'Privat',
    year: '2025',
    role: 'Full-Stack-Developer',
    category: 'Web · Portfolio',
    stack: ['Astro', 'TypeScript', 'CSS'],
    visual: 'flow',
    metric: { value: 'static', label: 'Astro-Seite auf Vercel ausgeliefert' },
    summary:
      'Ein früheres persönliches Portfolio, gebaut mit Astro und TypeScript – eine schnelle, content-first statische Seite, ausgeliefert auf Vercel.',
    outcome: 'Ein leichtgewichtiges, content-first Portfolio, ausgeliefert als statische Astro-Seite.',
    problem: 'Eine schnelle persönliche Seite aufsetzen, die überwiegend statisches HTML ausliefert – mit gerade genug TypeScript für Interaktivität.',
    approach: [
      'Die Seite mit Astro gebaut und das ausgelieferte JavaScript minimal gehalten.',
      'Die interaktiven Teile in TypeScript geschrieben.',
      'Als statische Seite auf Vercel ausgeliefert.',
    ],
    results: ['Ein schnelles, ressourcenschonendes Portfolio, das zügig lädt und einfach zu pflegen ist.'],
    link: { label: 'Auf GitHub ansehen', href: 'https://github.com/WyroTech/wyrotech' },
  },
]

export const works: Localized<Work[]> = { en, de }

/** All works in the active language. */
export const getWorks = (lang: Lang): Work[] => loc(works, lang)

/** A single work by slug in the active language. */
export const getWork = (slug: string, lang: Lang): Work | undefined =>
  getWorks(lang).find((w) => w.slug === slug)
