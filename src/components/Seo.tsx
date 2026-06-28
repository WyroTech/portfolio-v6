import { useHead } from '@unhead/react'
import type { Lang } from '../i18n/lang'

export const SITE_URL = 'https://wyro.tech'
export const OG_IMAGE = `${SITE_URL}/og.jpg`

interface SeoProps {
  title: string
  description: string
  /** language-neutral path beginning with "/" (no /de prefix) */
  path?: string
  lang?: Lang
  noindex?: boolean
  /** Open Graph type; "article" for case-study pages, "website" elsewhere */
  ogType?: string
  jsonLd?: object
}

const dePath = (path: string) => (path === '/' ? '/de' : '/de' + path)

export default function Seo({
  title,
  description,
  path = '/',
  lang = 'en',
  noindex,
  ogType = 'website',
  jsonLd,
}: SeoProps) {
  const enUrl = SITE_URL + path
  const deUrl = SITE_URL + dePath(path)
  const canonical = lang === 'de' ? deUrl : enUrl
  const imageAlt =
    lang === 'de'
      ? 'Andreas Wyrobek — Webentwickler in Deggendorf (B2B-Web-Apps, Dashboards & SaaS)'
      : 'Andreas Wyrobek — web developer in Deggendorf (B2B web apps, dashboards & SaaS)'

  useHead({
    // Sets <html lang>; during prerender this is serialised into the static
    // file so /de/* ship lang="de" without waiting for JS.
    htmlAttrs: { lang },
    title,
    meta: [
      { name: 'description', content: description },
      { property: 'og:type', content: ogType },
      { property: 'og:site_name', content: 'WyroTech' },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      // og:url mirrors the canonical, so only emit it for indexable pages
      // (a noindex 404 shouldn't advertise the homepage as its URL).
      ...(noindex ? [] : [{ property: 'og:url', content: canonical }]),
      { property: 'og:image', content: OG_IMAGE },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:alt', content: imageAlt },
      { property: 'og:locale', content: lang === 'de' ? 'de_DE' : 'en_US' },
      { property: 'og:locale:alternate', content: lang === 'de' ? 'en_US' : 'de_DE' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: OG_IMAGE },
      { name: 'twitter:image:alt', content: imageAlt },
      ...(noindex ? [{ name: 'robots', content: 'noindex, follow' }] : []),
    ],
    link: noindex
      ? []
      : [
          // Google ignores rel=canonical on noindex pages, and a 404 pointing
          // its canonical at the homepage is just noise — so gate canonical +
          // hreflang on indexability.
          { rel: 'canonical', href: canonical },
          { rel: 'alternate', hreflang: 'en', href: enUrl },
          { rel: 'alternate', hreflang: 'de', href: deUrl },
          { rel: 'alternate', hreflang: 'x-default', href: enUrl },
        ],
    script: jsonLd
      ? [
          {
            type: 'application/ld+json',
            // Escape < and > so no graph string (FAQ answers, descriptions, …)
            // can close the inline script tag; JSON parsers decode them back.
            innerHTML: JSON.stringify(jsonLd).replace(/</g, '\\u003c').replace(/>/g, '\\u003e'),
          },
        ]
      : [],
  })

  return null
}
