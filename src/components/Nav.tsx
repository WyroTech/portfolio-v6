import { useEffect, useState } from 'react'
import type { MouseEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { site } from '../data/site'
import { useLang, rememberLang } from '../i18n/lang'
import type { Lang } from '../i18n/lang'
import { loc } from '../i18n/localize'
import { ui } from '../i18n/ui'
import { useMagnetic } from '../hooks/useMagnetic'
import './Nav.scss'

// Hoisted out of Nav's render: a component declared inside render is a fresh
// type on every render, so React remounts it and any internal state is lost.
function LangSwitch({
  className = '',
  lang,
  hrefFor,
  label,
  onPick,
}: {
  className?: string
  lang: Lang
  hrefFor: (l: Lang) => string
  label: string
  onPick: (l: Lang) => void
}) {
  return (
    <div className={`nav__lang ${className}`} role="group" aria-label={label}>
      {(['en', 'de'] as Lang[]).map((l, i) => (
        <span key={l} className="nav__lang-cell">
          {i > 0 && (
            <span className="nav__lang-sep" aria-hidden="true">
              /
            </span>
          )}
          <Link
            to={hrefFor(l)}
            className={`nav__lang-link${lang === l ? ' is-active' : ''}`}
            aria-current={lang === l ? 'true' : undefined}
            onClick={() => onPick(l)}
          >
            {l.toUpperCase()}
          </Link>
        </span>
      ))}
    </div>
  )
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [onDark, setOnDark] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { lang, lp, hrefFor } = useLang()
  const t = loc(ui, lang)
  const ctaRef = useMagnetic<HTMLAnchorElement>()

  const home = lp('/')
  const isHome = pathname === '/' || pathname === '/de'

  // On desktop, Contact is pulled out of the link row and shown as the CTA.
  const links = site.nav.filter((i) => i.key !== 'contact')
  const contact = site.nav.find((i) => i.key === 'contact')!

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12)
      // Invert the header when a dark surface sits directly beneath it, so it
      // never reads as an opaque grey bar over black sections.
      const navH = document.querySelector('.nav')?.clientHeight ?? 72
      const el = document.elementFromPoint(Math.round(window.innerWidth / 2), navH + 2)
      setOnDark(!!el?.closest('.section.is-dark, .case__next'))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [pathname])

  // Scroll-spy: mark the nav link whose section sits mid-viewport as current.
  // Wayfinding state, not decoration — so it runs regardless of reduced-motion
  // (CSS gates only the underline's transition, never its visibility).
  useEffect(() => {
    // `active` is only ever read behind an `isHome` guard in render, so there's
    // no need to reset it here — just skip observing when we're off the home page.
    if (!isHome) return
    const sections = links
      .map((i) => document.querySelector(i.hash))
      .filter((el): el is Element => !!el)
    if (!sections.length) return

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`)
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [isHome, links])

  // lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const onNavClick = (e: MouseEvent, hash: string) => {
    setOpen(false)
    if (isHome) {
      const el = document.querySelector(hash)
      if (el) {
        e.preventDefault()
        const navH = document.querySelector('.nav')?.clientHeight ?? 72
        const lenis = window.__lenis
        if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -navH })
        else (el as HTMLElement).scrollIntoView({ behavior: 'smooth' })
        window.history.replaceState(null, '', `${pathname}${hash}`)
      }
    } else {
      e.preventDefault()
      navigate({ pathname: home, hash })
    }
  }

  const pickLang = (l: Lang) => {
    rememberLang(l)
    setOpen(false)
  }

  return (
    <header
      className={`nav${scrolled ? ' is-scrolled' : ''}${onDark ? ' nav--on-dark' : ''}${open ? ' is-open' : ''}`}
    >
      <div className="nav__bar container">
        <Link to={home} className="nav__brand" onClick={() => setOpen(false)}>
          {site.brand}
          <span className="nav__brand-dot" aria-hidden="true">
            .
          </span>
        </Link>

        <nav className="nav__links" aria-label="Primary">
          {links.map((item) => (
            <a
              key={item.key}
              href={`${home}${item.hash}`}
              aria-current={isHome && active === item.hash ? 'location' : undefined}
              onClick={(e) => onNavClick(e, item.hash)}
            >
              {t.nav[item.key]}
            </a>
          ))}
        </nav>

        <div className="nav__aside">
          <LangSwitch lang={lang} hrefFor={hrefFor} label={t.menu.language} onPick={pickLang} />
          <a
            ref={ctaRef}
            className="nav__cta"
            href={`${home}${contact.hash}`}
            onClick={(e) => onNavClick(e, contact.hash)}
          >
            <span className="nav__cta-label">{t.nav.contact}</span>
          </a>
        </div>

        <button
          className="nav__toggle"
          aria-expanded={open}
          aria-controls="nav-overlay"
          aria-label={open ? t.menu.close : t.menu.open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>

      <div className="nav__overlay" id="nav-overlay" inert={!open} hidden={!open}>
        <nav className="nav__overlay-links" aria-label="Mobile">
          {site.nav.map((item, i) => (
            <a
              key={item.key}
              href={`${home}${item.hash}`}
              onClick={(e) => onNavClick(e, item.hash)}
              style={{ '--i': i } as React.CSSProperties}
            >
              <span className="t-label nav__overlay-no">{String(i + 1).padStart(2, '0')}</span>
              {t.nav[item.key]}
            </a>
          ))}
        </nav>
        <div className="nav__overlay-foot">
          <LangSwitch
            className="nav__lang--overlay"
            lang={lang}
            hrefFor={hrefFor}
            label={t.menu.language}
            onPick={pickLang}
          />
          <p className="nav__overlay-status t-label">
            <span className="nav__dot" aria-hidden="true" />
            {t.availability.short}
          </p>
        </div>
      </div>
    </header>
  )
}
