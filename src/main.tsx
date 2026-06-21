import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'
import { LangProvider } from './i18n/lang'

// Self-hosted variable fonts (no render-blocking CDN).
// Import only the upright `wght` axis (no italic faces are used in the UI);
// fontsource ships these @font-face rules with `font-display: swap` already,
// so text renders immediately with the fallback and swaps in without blocking.
// Subsets stay unicode-range-scoped, so non-Latin woff2 files are emitted but
// never fetched for the EN/DE content.
import '@fontsource-variable/funnel-display/wght.css'
import '@fontsource-variable/geist/wght.css'
import '@fontsource-variable/geist-mono/wght.css'

import './styles/main.scss'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <LangProvider>
          <App />
        </LangProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
