import { createContext, useContext, useEffect, useMemo } from 'react'
import type { ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export type Lang = 'en' | 'de'

const STORE_KEY = 'wyro-lang'

interface LangValue {
  lang: Lang
  /** the other language (toggle target) */
  other: Lang
  /** prefix a root-relative path ("/", "/work/x") for the current language */
  lp: (path: string) => string
  /** the current URL expressed in the other language (for the toggle link) */
  otherHref: string
  /** the current URL expressed in a specific language (for a segmented switch) */
  hrefFor: (target: Lang) => string
}

const LangContext = createContext<LangValue | null>(null)

/** Add/strip the /de prefix. `path` always starts with "/". */
function withLang(path: string, lang: Lang): string {
  if (lang === 'de') return path === '/' ? '/de' : '/de' + path
  return path
}

function stripLang(pathname: string): string {
  const bare = pathname.replace(/^\/de(?=\/|$)/, '')
  return bare === '' ? '/' : bare
}

export function LangProvider({ children }: { children: ReactNode }) {
  const { pathname, search, hash } = useLocation()
  const navigate = useNavigate()

  const lang: Lang = pathname === '/de' || pathname.startsWith('/de/') ? 'de' : 'en'
  const other: Lang = lang === 'en' ? 'de' : 'en'

  // Keep <html lang> honest for a11y / SEO.
  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  // First-visit auto-detect: German browsers land on /de unless they have a
  // saved preference or are deep-linking somewhere specific.
  useEffect(() => {
    if (pathname !== '/') return
    try {
      if (localStorage.getItem(STORE_KEY)) return
    } catch {
      /* storage blocked — fall through to detection */
    }
    if (navigator.language?.toLowerCase().startsWith('de')) {
      navigate('/de', { replace: true })
    }
    // run once on mount only
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const value = useMemo<LangValue>(() => {
    const bare = stripLang(pathname)
    const suffix = search + hash
    return {
      lang,
      other,
      lp: (path: string) => withLang(path, lang),
      otherHref: withLang(bare, other) + suffix,
      hrefFor: (target: Lang) => withLang(bare, target) + suffix,
    }
  }, [lang, other, pathname, search, hash])

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLang(): LangValue {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used within <LangProvider>')
  return ctx
}

/** Persist the visitor's explicit language choice (called by the toggle). */
export function rememberLang(lang: Lang) {
  try {
    localStorage.setItem(STORE_KEY, lang)
  } catch {
    /* ignore */
  }
}
