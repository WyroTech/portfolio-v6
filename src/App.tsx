import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Nav from './components/Nav'

// Route-level code splitting: keep Home eager (above the fold), lazy-load the rest
// so they're not part of the initial bundle.
const CaseStudy = lazy(() => import('./pages/CaseStudy'))
const Impressum = lazy(() => import('./pages/Impressum'))
const Datenschutz = lazy(() => import('./pages/Datenschutz'))
const NotFound = lazy(() => import('./pages/NotFound'))
import Footer from './components/Footer'
import ScrollManager from './components/ScrollManager'
import ScrollProgress from './components/ScrollProgress'
import { useLenis } from './hooks/useLenis'
import { useLang } from './i18n/lang'
import { loc } from './i18n/localize'
import { ui } from './i18n/ui'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'

export default function App() {
  useLenis()
  const { lang } = useLang()
  const t = loc(ui, lang)

  return (
    <>
      <a className="skip-link" href="#main">
        {t.skip}
      </a>
      <ScrollManager />
      <ScrollProgress />
      <Nav />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work/:slug" element={<CaseStudy />} />
          <Route path="/de" element={<Home />} />
          <Route path="/de/work/:slug" element={<CaseStudy />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/datenschutz" element={<Datenschutz />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
      <Analytics />
      <SpeedInsights />
    </>
  )
}
