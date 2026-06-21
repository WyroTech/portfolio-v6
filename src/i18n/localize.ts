import type { Lang } from './lang'

/**
 * Pick the active-language payload from a bilingual record, falling back to
 * English when a German translation has not been supplied yet. This keeps every
 * route rendering real content at all times, even mid-translation.
 */
export interface Localized<T> {
  en: T
  de?: T
}

export function loc<T>(rec: Localized<T>, lang: Lang): T {
  return lang === 'de' && rec.de !== undefined ? rec.de : rec.en
}
