import { Link } from 'react-router-dom'
import type { LegalDoc } from '../data/legal'
import { useLang } from '../i18n/lang'
import { loc } from '../i18n/localize'
import { ui } from '../i18n/ui'
import Seo from '../components/Seo'
import './LegalPage.scss'

export default function LegalPage({ doc }: { doc: LegalDoc }) {
  const { lang, lp } = useLang()
  const t = loc(ui, lang)

  return (
    <main id="main" className="legal">
      <Seo
        title={`${doc.title} — WyroTech`}
        description={doc.description}
        path={doc.path}
        lang={lang}
        noindex
      />
      <div className="container legal__inner">
        <Link to={lp('/')} className="legal__back t-label">
          &larr; {t.legal.back}
        </Link>
        <h1 className="legal__title">{doc.title}</h1>

        <div className="legal__body">
          {doc.blocks.map((block) => (
            <section className="legal__block" key={block.heading}>
              <h2 className="legal__heading">{block.heading}</h2>
              {block.body.map((p, i) => (
                <p className="legal__p" key={i}>
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>

        <p className="legal__updated t-label">
          {t.legal.updated} {doc.updated}
        </p>
      </div>
    </main>
  )
}
