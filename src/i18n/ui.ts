/**
 * All interface microcopy, in one place, per language.
 *
 * English (`en`) is the source of truth. Keep the German (`de`) object's shape
 * identical to English — translate the values, never rename the keys.
 */

const en = {
  nav: { work: 'Work', services: 'Services', about: 'About', contact: 'Contact' },
  menu: { open: 'Open menu', close: 'Close menu', language: 'Language' },

  availability: {
    short: 'Available for select projects',
    detail: 'Taking 1–2 projects this quarter',
  },

  cta: { start: 'Start a project', selectedWork: 'Selected work', hold: 'hold', done: 'done' },
  skip: 'Skip to content',
  location: 'Deggendorf, Germany',
  role: 'Frontend Engineer & UX',
  tagline: 'Design and code, in the same hands.',

  hero: {
    lineA: 'I design & build',
    lineB: 'websites & web apps.',
    sub: 'I’m Andreas — one developer taking your idea from first sketch to launch: websites, online shops, dashboards and prototypes.',
    caption: 'Fig. 01 — Frontend, end to end',
  },

  about: {
    label: 'About',
    years: 'Years',
    lead: 'One developer — design and build, start to finish.',
    body:
      'Ten years building websites and web apps — fast, accessible, and easy to grow. You get design and development from one person, with no agency overhead and no handoff in between.',
  },

  services: {
    eyebrow: 'Services',
    title: 'What I build for you.',
  },

  capabilities: { label: 'Stack' },

  process: {
    eyebrow: 'Process',
    title: 'How it works.',
    intro: 'A small first step, then a clear path — no surprises.',
  },

  journey: { eyebrow: 'Journey', title: 'Ten years building software.' },

  faq: { eyebrow: 'FAQ', title: 'Questions, answered.' },

  feedback: { eyebrow: 'Feedback', title: 'Words from the teams.' },

  work: { eyebrow: 'Selected Work', title: 'Interfaces, systems & products.' },

  contact: {
    label: 'Contact',
    headline: 'Tell me what you need.',
    note: 'A rough idea is enough — a few lines and I’ll tell you what it takes.',
    holdAria: 'Start a project — opens your email client',
    reply: 'I read every message myself and reply within a business day.',
  },

  footer: {
    cta: 'Start a project',
    reply: 'Replies within 1 business day',
    index: 'Index',
    elsewhere: 'Elsewhere',
    paint: 'first paint',
    top: 'Top',
    homeAria: 'WyroTech — home',
  },

  caseStudy: {
    back: 'All work',
    role: 'Role',
    company: 'Company',
    year: 'Year',
    stack: 'Stack',
    problem: 'The problem',
    approach: 'Approach',
    outcome: 'Outcome',
    next: 'Next project',
    view: 'View case study',
  },

  notFound: {
    code: 'Error (404)',
    title: 'This page doesn’t exist.',
    home: 'Back home',
  },

  legal: { back: 'Back home', updated: 'Stand:' },

  meta: {
    homeTitle: 'WyroTech — Websites, Web Apps & Online Shops',
    homeDescription:
      'Custom websites, web apps and online shops — designed and built by one developer, end to end. Angular, React, TypeScript. Andreas Wyrobek, Deggendorf (10+ yrs).',
    notFoundTitle: 'Not found — WyroTech',
    notFoundDescription: 'This page could not be found.',
  },
}

export type Ui = typeof en

const de: Ui = {
  nav: { work: 'Arbeiten', services: 'Leistungen', about: 'Über mich', contact: 'Kontakt' },
  menu: { open: 'Menü öffnen', close: 'Menü schließen', language: 'Sprache' },

  availability: {
    short: 'Verfügbar für ausgewählte Projekte',
    detail: 'Nehme 1–2 Projekte pro Quartal an',
  },

  cta: { start: 'Projekt starten', selectedWork: 'Ausgewählte Arbeiten', hold: 'halten', done: 'fertig' },
  skip: 'Zum Inhalt springen',
  location: 'Deggendorf, Deutschland',
  role: 'Frontend Engineer & UX',
  tagline: 'Design und Code, aus einer Hand.',

  hero: {
    lineA: 'Ich gestalte & entwickle',
    lineB: 'Websites & Web-Apps.',
    sub: 'Ich bin Andreas – ein Entwickler, der Ihre Idee von der ersten Skizze bis zum Launch bringt: Websites, Online-Shops, Dashboards und Prototypen.',
    caption: 'Abb. 01 – Frontend, durchgängig',
  },

  about: {
    label: 'Über mich',
    years: 'Jahre',
    lead: 'Ein Entwickler – Design und Umsetzung, von Anfang bis Ende.',
    body:
      'Zehn Jahre Erfahrung mit Websites und Web-Apps – schnell, barrierefrei und einfach erweiterbar. Sie erhalten Design und Entwicklung aus einer Hand, ohne Agentur-Overhead und ohne Übergaben dazwischen.',
  },

  services: {
    eyebrow: 'Leistungen',
    title: 'Was ich für Sie baue.',
  },

  capabilities: { label: 'Stack' },

  process: {
    eyebrow: 'Ablauf',
    title: 'So läuft es ab.',
    intro: 'Ein kleiner erster Schritt, dann ein klarer Weg – ohne Überraschungen.',
  },

  journey: { eyebrow: 'Werdegang', title: 'Zehn Jahre Softwareentwicklung.' },

  faq: { eyebrow: 'FAQ', title: 'Fragen, beantwortet.' },

  feedback: { eyebrow: 'Feedback', title: 'Stimmen aus den Teams.' },

  work: { eyebrow: 'Ausgewählte Arbeiten', title: 'Interfaces, Systeme & Produkte.' },

  contact: {
    label: 'Kontakt',
    headline: 'Sagen Sie mir, was Sie brauchen.',
    note: 'Eine grobe Idee genügt – ein paar Zeilen, und ich sage Ihnen, was nötig ist.',
    holdAria: 'Projekt starten – öffnet Ihr E-Mail-Programm',
    reply: 'Ich lese jede Nachricht selbst und antworte innerhalb eines Werktags.',
  },

  footer: {
    cta: 'Projekt starten',
    reply: 'Antwort innerhalb von 1 Werktag',
    index: 'Index',
    elsewhere: 'Anderswo',
    paint: 'First Paint',
    top: 'Nach oben',
    homeAria: 'WyroTech – Startseite',
  },

  caseStudy: {
    back: 'Alle Arbeiten',
    role: 'Rolle',
    company: 'Unternehmen',
    year: 'Jahr',
    stack: 'Stack',
    problem: 'Die Aufgabe',
    approach: 'Vorgehen',
    outcome: 'Ergebnis',
    next: 'Nächstes Projekt',
    view: 'Case Study ansehen',
  },

  notFound: {
    code: 'Fehler (404)',
    title: 'Diese Seite gibt es nicht.',
    home: 'Zur Startseite',
  },

  legal: { back: 'Zur Startseite', updated: 'Stand:' },

  meta: {
    homeTitle: 'WyroTech — Websites, Web-Apps & Online-Shops',
    homeDescription:
      'Individuelle Websites, Web-Apps und Online-Shops – von einem Entwickler gestaltet und gebaut, durchgängig. Angular, React, TypeScript. Andreas Wyrobek, Deggendorf (10+ J.).',
    notFoundTitle: 'Nicht gefunden — WyroTech',
    notFoundDescription: 'Diese Seite konnte nicht gefunden werden.',
  },
}

export const ui: { en: Ui; de?: Ui } = {
  en,
  de,
}
