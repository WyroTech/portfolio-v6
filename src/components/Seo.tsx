import { Helmet } from 'react-helmet-async'
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
  jsonLd?: object
}

const dePath = (path: string) => (path === '/' ? '/de' : '/de' + path)

export default function Seo({
  title,
  description,
  path = '/',
  lang = 'en',
  noindex,
  jsonLd,
}: SeoProps) {
  const enUrl = SITE_URL + path
  const deUrl = SITE_URL + dePath(path)
  const canonical = lang === 'de' ? deUrl : enUrl

  return (
    <Helmet>
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {!noindex && <link rel="alternate" hrefLang="en" href={enUrl} />}
      {!noindex && <link rel="alternate" hrefLang="de" href={deUrl} />}
      {!noindex && <link rel="alternate" hrefLang="x-default" href={enUrl} />}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="WyroTech" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content={lang === 'de' ? 'de_DE' : 'en_US'} />
      <meta property="og:locale:alternate" content={lang === 'de' ? 'en_US' : 'de_DE'} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OG_IMAGE} />
      {noindex && <meta name="robots" content="noindex, follow" />}
      {jsonLd && (
        <script type="application/ld+json">
          {/* Escape < and > so no graph string (FAQ answers, descriptions, …) can
              ever close the inline script tag; JSON parsers decode </> back. */}
          {JSON.stringify(jsonLd).replace(/</g, '\\u003c').replace(/>/g, '\\u003e')}
        </script>
      )}
    </Helmet>
  )
}
