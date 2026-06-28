import type { CSSProperties } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getWork, getWorks } from '../data/works'
import { useLang } from '../i18n/lang'
import { loc } from '../i18n/localize'
import { ui } from '../i18n/ui'
import Reveal from '../components/ui/Reveal'
import Visual from '../components/ui/Visual'
import Seo, { SITE_URL, OG_IMAGE } from '../components/Seo'
import { site } from '../data/site'
import NotFound from './NotFound'
import './CaseStudy.scss'

export default function CaseStudy() {
  const { slug } = useParams()
  const { lang, lp } = useLang()
  const t = loc(ui, lang)
  const work = slug ? getWork(slug, lang) : undefined

  if (!work) return <NotFound />

  const list = getWorks(lang)
  const idx = list.findIndex((w) => w.slug === work.slug)
  const next = list[(idx + 1) % list.length]

  const homeUrl = lang === 'de' ? `${SITE_URL}/de` : SITE_URL
  const caseUrl = `${homeUrl}/work/${work.slug}`
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: lang === 'de' ? 'Start' : 'Home', item: homeUrl },
          { '@type': 'ListItem', position: 2, name: t.nav.work, item: `${homeUrl}#work` },
          { '@type': 'ListItem', position: 3, name: work.title, item: caseUrl },
        ],
      },
      {
        '@type': 'CreativeWork',
        name: work.title,
        description: work.summary,
        url: caseUrl,
        image: work.shot ? `${SITE_URL}${work.shot}` : OG_IMAGE,
        inLanguage: lang,
        dateCreated: work.year.slice(0, 4),
        keywords: work.stack.join(', '),
        about: work.category,
        author: { '@type': 'Person', '@id': `${SITE_URL}/#person`, name: site.person },
        publisher: { '@id': `${SITE_URL}/#service` },
        isPartOf: { '@id': `${SITE_URL}/#website` },
        ...(work.link ? { sameAs: work.link.href } : {}),
      },
    ],
  }

  return (
    <main id="main" className="case">
      <Seo
        title={`${work.title} | WyroTech`}
        description={work.seoDescription ?? work.summary}
        path={`/work/${work.slug}`}
        lang={lang}
        ogType="article"
        jsonLd={jsonLd}
      />
      <article>
        <header className="case__hero container">
          <Link to={lp('/') + '#work'} className="case__back t-label">
            &larr; {t.caseStudy.back}
          </Link>
          <span className="t-label case__tax">{work.category}</span>
          <h1
            className="case__title"
            style={{ viewTransitionName: `work-${work.slug}` } as CSSProperties}
          >
            {work.title}
          </h1>
          <p className="case__summary t-lead">{work.summary}</p>
        </header>

        <div className="case__media container">
          {work.shot ? (
            <img
              className="case__media-shot"
              src={work.shot}
              alt={`${work.title} — ${lang === 'de' ? 'Screenshot der Website' : 'website screenshot'}`}
              width={1600}
              height={1000}
              decoding="async"
            />
          ) : (
            <div className="case__media-visual">
              <Visual seed={work.slug} kind={work.visual} />
            </div>
          )}
        </div>

        <Reveal as="div" className="case__meta container">
          <dl className="case__meta-grid">
            <div>
              <dt className="t-label">{t.caseStudy.role}</dt>
              <dd>{work.role}</dd>
            </div>
            <div>
              <dt className="t-label">{t.caseStudy.company}</dt>
              <dd>{work.client}</dd>
            </div>
            <div>
              <dt className="t-label">{t.caseStudy.year}</dt>
              <dd>{work.year}</dd>
            </div>
            <div className="case__meta-stack">
              <dt className="t-label">{t.caseStudy.stack}</dt>
              <dd>{work.stack.join(' · ')}</dd>
            </div>
          </dl>
        </Reveal>

        <div className="case__body container">
          <Reveal as="section" className="case__block">
            <h2 className="t-label case__block-label">{t.caseStudy.outcome}</h2>
            <p className="case__block-text t-h3">{work.outcome}</p>
          </Reveal>

          <Reveal as="section" className="case__block">
            <h2 className="t-label case__block-label">{t.caseStudy.problem}</h2>
            <p className="case__block-text t-h3">{work.problem}</p>
          </Reveal>

          <Reveal as="section" className="case__block">
            <h2 className="t-label case__block-label">{t.caseStudy.approach}</h2>
            <ul className="case__list">
              {work.approach.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </Reveal>

          <Reveal as="section" className="case__block">
            <h2 className="t-label case__block-label">{t.caseStudy.results}</h2>
            <ul className="case__list">
              {work.results.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </Reveal>

          {work.link && (
            <Reveal as="section" className="case__block">
              <a
                className="case__link t-label"
                href={work.link.href}
                target="_blank"
                rel="noreferrer"
              >
                {work.link.label}
                <span className="case__link-arrow" aria-hidden="true">
                  ↗
                </span>
              </a>
            </Reveal>
          )}
        </div>

        <Link to={lp(`/work/${next.slug}`)} viewTransition className="case__next is-dark">
          <div className="container case__next-inner">
            <span className="t-label">{t.caseStudy.next}</span>
            <span className="case__next-title">{next.title}</span>
            <span className="case__next-arrow" aria-hidden="true">
              &rarr;
            </span>
          </div>
        </Link>
      </article>
    </main>
  )
}
