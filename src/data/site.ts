/**
 * Language-neutral site config. All translatable copy lives in `src/i18n/ui.ts`
 * (interface microcopy) and the bilingual data files (services, works, …).
 */
export const site = {
  brand: 'WyroTech',
  person: 'Andreas Wyrobek',
  email: 'a@wyro.tech',
  /** language-neutral city used in structured data */
  city: 'Deggendorf',
  timezone: 'Europe/Berlin',
  years: '10+',

  social: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/andreas-wyrobek/' },
    { label: 'GitHub', href: 'https://github.com/WyroTech' },
    { label: 'Email', href: 'mailto:a@wyro.tech' },
  ],

  /** In-page anchors; visible labels come from i18n ui.nav */
  nav: [
    { key: 'work', hash: '#work' },
    { key: 'services', hash: '#services' },
    { key: 'about', hash: '#about' },
    { key: 'contact', hash: '#contact' },
  ] as const,
}

export type Site = typeof site
export type NavKey = (typeof site.nav)[number]['key']
