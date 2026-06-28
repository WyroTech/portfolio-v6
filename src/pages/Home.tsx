import Seo, { SITE_URL, OG_IMAGE } from '../components/Seo'
import { site } from '../data/site'
import { services } from '../data/services'
import { faqs } from '../data/faq'
import { useLang } from '../i18n/lang'
import { loc } from '../i18n/localize'
import { ui } from '../i18n/ui'
import Hero from '../sections/Hero'
import SelectedWorks from '../sections/SelectedWorks'
import Services from '../sections/Services'
import Capabilities from '../sections/Capabilities'
import Process from '../sections/Process'
import About from '../sections/About'
import Timeline from '../sections/Timeline'
import Faq from '../sections/Faq'
import Testimonials from '../sections/Testimonials'
import Local from '../sections/Local'
import Contact from '../sections/Contact'

export default function Home() {
  const { lang } = useLang()
  const t = loc(ui, lang)
  const svc = loc(services, lang)
  const faqItems = loc(faqs, lang)
  const homeUrl = lang === 'de' ? `${SITE_URL}/de` : SITE_URL

  const personId = `${SITE_URL}/#person`
  const serviceId = `${SITE_URL}/#service`
  const websiteId = `${SITE_URL}/#website`
  const faqId = `${SITE_URL}/#faq`
  const sameAs = site.social.filter((s) => s.href.startsWith('http')).map((s) => s.href)

  const knowsAbout =
    lang === 'de'
      ? [
          'Webanwendungsentwicklung',
          'B2B-Software',
          'SaaS-Entwicklung',
          'Enterprise-Webanwendungen',
          'Dashboards & Datenvisualisierung',
          'Interne Tools',
          'Designsysteme',
          'Frontend-Engineering',
          'Frontend-Modernisierung',
          'UX-Design',
          'Prototyping',
          'MVP-Entwicklung',
          'Angular',
          'React',
          'TypeScript',
          'JavaScript',
          'Node.js',
          'Vite',
          'SCSS',
        ]
      : [
          'Web Application Development',
          'B2B Software',
          'SaaS Development',
          'Enterprise Web Applications',
          'Dashboards & Data Visualization',
          'Internal Tools',
          'Design Systems',
          'Frontend Engineering',
          'Frontend Modernization',
          'UX Design',
          'Prototyping',
          'MVP Development',
          'Angular',
          'React',
          'TypeScript',
          'JavaScript',
          'Node.js',
          'Vite',
          'SCSS',
        ]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': personId,
        name: site.person,
        url: homeUrl,
        image: `${SITE_URL}/portrait.webp`,
        email: `mailto:${site.email}`,
        telephone: site.phone,
        jobTitle: t.role,
        address: {
          '@type': 'PostalAddress',
          addressLocality: site.city,
          postalCode: '94469',
          addressRegion: 'Bayern',
          addressCountry: 'DE',
        },
        worksFor: { '@id': serviceId },
        sameAs,
        knowsLanguage: ['en', 'de'],
        knowsAbout,
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: homeUrl,
        name: site.brand,
        description: t.meta.homeDescription,
        inLanguage: lang,
        publisher: { '@id': serviceId },
      },
      {
        '@type': 'ProfessionalService',
        '@id': serviceId,
        name: site.brand,
        description: t.meta.homeDescription,
        url: homeUrl,
        image: OG_IMAGE,
        email: `mailto:${site.email}`,
        telephone: site.phone,
        priceRange: '€€',
        logo: `${SITE_URL}/logo.svg`,
        founder: { '@id': personId },
        provider: { '@id': personId },
        address: {
          '@type': 'PostalAddress',
          addressLocality: site.city,
          postalCode: '94469',
          addressRegion: 'Bayern',
          addressCountry: 'DE',
        },
        geo: { '@type': 'GeoCoordinates', latitude: 48.8345, longitude: 12.9576 },
        areaServed: [
          { '@type': 'City', name: 'Deggendorf' },
          { '@type': 'AdministrativeArea', name: 'Niederbayern' },
          { '@type': 'AdministrativeArea', name: 'Bayern' },
          { '@type': 'Place', name: 'Worldwide' },
        ],
        availableLanguage: ['en', 'de'],
        knowsLanguage: ['en', 'de'],
        knowsAbout,
        serviceType: svc.map((s) => s.title),
        sameAs,
        makesOffer: svc.map((s) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: s.title, description: s.blurb },
        })),
      },
      ...(faqItems.length
        ? [
            {
              '@type': 'FAQPage',
              '@id': faqId,
              url: homeUrl,
              isPartOf: { '@id': websiteId },
              inLanguage: lang,
              mainEntity: faqItems.map((item) => ({
                '@type': 'Question',
                name: item.q,
                acceptedAnswer: { '@type': 'Answer', text: item.a },
              })),
            },
          ]
        : []),
    ],
  }

  return (
    <>
      <Seo
        title={t.meta.homeTitle}
        description={t.meta.homeDescription}
        path="/"
        lang={lang}
        jsonLd={jsonLd}
      />
      <main id="main">
        <Hero />
        <SelectedWorks />
        <Services />
        <Capabilities />
        <Process />
        <About />
        <Timeline />
        <Faq />
        <Testimonials />
        <Local />
        <Contact />
      </main>
    </>
  )
}
