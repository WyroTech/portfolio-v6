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

  const knowsAbout = [
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
        url: SITE_URL,
        image: OG_IMAGE,
        email: `mailto:${site.email}`,
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
        url: SITE_URL,
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
        founder: { '@id': personId },
        provider: { '@id': personId },
        address: {
          '@type': 'PostalAddress',
          addressLocality: site.city,
          postalCode: '94469',
          addressRegion: 'Bayern',
          addressCountry: 'DE',
        },
        areaServed: [
          { '@type': 'City', name: 'Deggendorf' },
          { '@type': 'AdministrativeArea', name: 'Niederbayern' },
          { '@type': 'AdministrativeArea', name: 'Bayern' },
          { '@type': 'Place', name: 'Worldwide' },
        ],
        availableLanguage: ['en', 'de'],
        knowsLanguage: ['en', 'de'],
        knowsAbout,
        serviceType: [
          'Web app & platform development',
          'Dashboard & data tool development',
          'SaaS product development',
          'Design system development',
          'Frontend modernization',
          'Prototype & MVP development',
        ],
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
