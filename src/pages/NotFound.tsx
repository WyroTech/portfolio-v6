import { Link } from 'react-router-dom'
import { useLang } from '../i18n/lang'
import { loc } from '../i18n/localize'
import { ui } from '../i18n/ui'
import Seo from '../components/Seo'
import './NotFound.scss'

export default function NotFound() {
  const { lang, lp } = useLang()
  const t = loc(ui, lang)

  return (
    <main id="main" className="notfound">
      <Seo title={t.meta.notFoundTitle} description={t.meta.notFoundDescription} lang={lang} noindex />
      <div className="container notfound__inner">
        <span className="t-label">{t.notFound.code}</span>
        <h1 className="notfound__title">{t.notFound.title}</h1>
        <Link to={lp('/')} className="notfound__home t-label">
          &larr; {t.notFound.home}
        </Link>
      </div>
    </main>
  )
}
