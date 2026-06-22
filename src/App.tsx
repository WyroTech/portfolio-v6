import { lazy, Suspense, useEffect, useState } from 'react'
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

// Telemetry is non-critical: code-split it and mount only once the browser is
// idle, so it never competes with first paint or hydration. web-vitals (used by
// SpeedInsights) reads buffered entries, so a short idle delay keeps CWV data.
const Analytics = lazy(() =>
  import('@vercel/analytics/react').then((m) => ({ default: m.Analytics })),
)
const SpeedInsights = lazy(() =>
  import('@vercel/speed-insights/react').then((m) => ({ default: m.SpeedInsights })),
)

export default function App() {
  useLenis()
  const { lang } = useLang()
  const t = loc(ui, lang)

  // Telemetry is non-critical, so it's code-split and mounted off the critical
  // path — but not so late that short visits go uncounted. Reveal on the first
  // interaction (so Vercel's INP/beacon listeners attach before the user acts or
  // leaves) or, failing that, when the main thread goes idle. Buffered
  // PerformanceObservers still recover LCP/FCP/CLS after this short delay.
  const [telemetryReady, setTelemetryReady] = useState(false)
  useEffect(() => {
    const reveal = () => setTelemetryReady(true)
    const cleanups: Array<() => void> = []

    for (const ev of ['pointerdown', 'keydown'] as const) {
      window.addEventListener(ev, reveal, { once: true, passive: true })
      cleanups.push(() => window.removeEventListener(ev, reveal))
    }

    const usingIdle = 'requestIdleCallback' in window
    if (usingIdle) {
      const id = window.requestIdleCallback(reveal, { timeout: 1500 })
      cleanups.push(() => window.cancelIdleCallback(id))
    } else {
      const id = window.setTimeout(reveal, 1000)
      cleanups.push(() => window.clearTimeout(id))
    }

    return () => cleanups.forEach((fn) => fn())
  }, [])

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
          <Route path="/de/impressum" element={<Impressum />} />
          <Route path="/de/datenschutz" element={<Datenschutz />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
      {telemetryReady && (
        <Suspense fallback={null}>
          <Analytics />
          <SpeedInsights />
        </Suspense>
      )}
    </>
  )
}
