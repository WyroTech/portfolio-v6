import { Link } from 'react-router-dom'
import { site } from '../data/site'
import { useLang } from '../i18n/lang'
import { loc } from '../i18n/localize'
import { ui } from '../i18n/ui'
import { usePaintTime } from '../hooks/usePaintTime'
import { scrollToHash } from '../lib/scrollToHash'
import './Footer.scss'

export default function Footer() {
  const paint = usePaintTime()
  const year = new Date().getFullYear()
  const { lang, lp } = useLang()
  const t = loc(ui, lang)
  const home = lp('/')

  return (
    <footer className="footer" id="contact-foot">
      <div className="container footer__statement">
        <p className="footer__statement-line">{t.footer.statement}</p>
        <p className="footer__statement-avail t-label">{t.availability.short}</p>
      </div>

      <div className="container footer__grid footer__grid--ruled">
        <div className="footer__brand footer__cell">
          <p className="footer__tagline t-muted">{t.tagline}</p>
          <a className="footer__cta" href={`mailto:${site.email}`}>
            <span className="footer__cta-text">{t.footer.cta}</span> &rarr;
          </a>
          <span className="footer__reply t-label">{t.footer.reply}</span>
        </div>

        <nav className="footer__col footer__cell" aria-label="Footer">
          <span className="t-label footer__col-label">{t.footer.index}</span>
          {site.nav.map((item) => (
            <Link key={item.key} to={`${home}${item.hash}`}>
              {t.nav[item.key]}
            </Link>
          ))}
        </nav>

        <div className="footer__col footer__cell">
          <span className="t-label footer__col-label">{t.footer.elsewhere}</span>
          {site.social.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith('http') ? '_blank' : undefined}
              rel={s.href.startsWith('http') ? 'noreferrer' : undefined}
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>

      <div className="footer__wordmark">
        <span className="footer__wordmark-text" aria-hidden="true">{site.brand}</span>
      </div>

      <div className="container footer__base">
        <span className="t-label">
          © {year} {site.person}
        </span>
        <nav className="footer__legal" aria-label="Legal">
          <Link to="/impressum" className="t-label">
            Impressum
          </Link>
          <Link to="/datenschutz" className="t-label">
            Datenschutz
          </Link>
        </nav>
        <span className="t-label footer__colophon">
          {t.location}
          {paint != null && (
            <>
              {' · '}
              <span title="Real first-contentful-paint of this page">
                {t.footer.paint} {paint}ms
              </span>
            </>
          )}
        </span>
        <button className="t-label footer__top" onClick={() => scrollToHash('#top')}>
          {t.footer.top} ↑
        </button>
      </div>
    </footer>
  )
}
