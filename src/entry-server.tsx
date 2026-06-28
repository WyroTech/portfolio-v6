import { StrictMode } from 'react'
import { prerender } from 'react-dom/static'
import { StaticRouter } from 'react-router'
import { createHead, UnheadProvider, renderSSRHead } from '@unhead/react/server'
import AppTree from './AppTree'
import { getWorks } from './data/works'

/**
 * Every URL the build prerenders to a static file. Slugs are language-neutral
 * and shared across locales, so we read them once and mirror EN/DE. `/404`
 * renders the catch-all NotFound route (noindex) and is written to 404.html.
 */
export function getStaticPaths(): string[] {
  const slugs = getWorks('en').map((w) => w.slug)
  return [
    '/',
    '/impressum',
    '/datenschutz',
    '/de',
    '/de/impressum',
    '/de/datenschutz',
    ...slugs.map((s) => `/work/${s}`),
    ...slugs.map((s) => `/de/work/${s}`),
    '/404',
  ]
}

async function streamToString(stream: ReadableStream<Uint8Array>): Promise<string> {
  const reader = stream.getReader()
  const decoder = new TextDecoder()
  let out = ''
  for (;;) {
    const { done, value } = await reader.read()
    if (done) break
    out += decoder.decode(value, { stream: true })
  }
  return out + decoder.decode()
}

export interface RenderResult {
  appHtml: string
  headTags: string
  htmlAttrs: string
  bodyAttrs: string
}

/**
 * Render one route to HTML. Uses `react-dom/static`'s `prerender` (not
 * `renderToString`) because the case-study/legal/404 routes are `React.lazy`;
 * `prerender` awaits all Suspense so their real markup — and their <Seo> head
 * tags — land in the static file instead of an empty fallback. Unhead collects
 * the head during the render, then `renderSSRHead` serialises it.
 */
export async function render(url: string): Promise<RenderResult> {
  // disableDefaults: index.html already ships charset + viewport, so don't let
  // unhead inject duplicates into the prerendered <head>.
  const head = createHead({ disableDefaults: true })
  const { prelude } = await prerender(
    <StrictMode>
      <UnheadProvider value={head}>
        <StaticRouter location={url}>
          <AppTree />
        </StaticRouter>
      </UnheadProvider>
    </StrictMode>,
  )
  const appHtml = await streamToString(prelude)
  const { headTags, htmlAttrs, bodyAttrs } = await renderSSRHead(head)
  return { appHtml, headTags, htmlAttrs, bodyAttrs }
}
