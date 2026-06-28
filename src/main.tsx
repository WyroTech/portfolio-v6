import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { createHead, UnheadProvider } from '@unhead/react/client'
import AppTree from './AppTree'

// Self-hosted variable fonts (no render-blocking CDN). Upright `wght` axis only
// (no italics in the UI); fontsource ships these @font-face rules with
// `font-display: swap`, so text renders immediately with the fallback and swaps
// in without blocking. Subsets stay unicode-range-scoped, so non-Latin woff2
// files are emitted but never fetched for the EN/DE content.
import '@fontsource-variable/funnel-display/wght.css'
import '@fontsource-variable/geist/wght.css'
import '@fontsource-variable/geist-mono/wght.css'

import './styles/main.scss'

const head = createHead()

const app = (
  <StrictMode>
    <UnheadProvider head={head}>
      <BrowserRouter>
        <AppTree />
      </BrowserRouter>
    </UnheadProvider>
  </StrictMode>
)

const container = document.getElementById('root')!

// Production HTML is prerendered (#root already holds markup) → hydrate.
// Dev / a non-prerendered shell serves an empty #root → client render.
if (container.hasChildNodes()) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}
