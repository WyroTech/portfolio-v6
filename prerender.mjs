// Post-build static prerender. Runs after the client build (dist/) and the SSR
// build (dist-ssr/). For each enumerated route it renders real HTML + per-route
// <head> via the SSR entry, then writes a static file into dist/ so crawlers and
// social/LLM unfurlers get full markup without executing JS. Also regenerates
// dist/sitemap.xml from the same route set so it can't drift from works.ts.
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const SITE = 'https://wyro.tech'
const root = path.dirname(fileURLToPath(import.meta.url))
const dist = path.join(root, 'dist')

const template = await fs.readFile(path.join(dist, 'index.html'), 'utf8')
// The '/' route overwrites dist/index.html, so a standalone re-run would read a
// polluted (already-rendered) shell. Fail loudly rather than emit garbage — the
// clean shell always exists right after `vite build`.
if (!template.includes('<!--app-head-->') || !template.includes('<div id="root"></div>')) {
  throw new Error(
    'dist/index.html is not the clean prerender shell (missing markers). Run `vite build` first.',
  )
}
const { render, getStaticPaths } = await import('./dist-ssr/entry-server.js')

const routes = getStaticPaths()

const outFile = (url) =>
  url === '/'
    ? path.join(dist, 'index.html')
    : url === '/404'
      ? path.join(dist, '404.html')
      : path.join(dist, `${url.slice(1)}.html`)

for (const url of routes) {
  const { appHtml, headTags, htmlAttrs } = await render(url)
  let html = template
    .replace('<!--app-head-->', headTags)
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
  const lang = /lang="([^"]+)"/.exec(htmlAttrs || '')?.[1]
  if (lang && lang !== 'en') html = html.replace('<html lang="en">', `<html lang="${lang}">`)

  const file = outFile(url)
  await fs.mkdir(path.dirname(file), { recursive: true })
  await fs.writeFile(file, html, 'utf8')
}

const slugs = routes
  .filter((p) => p.startsWith('/work/'))
  .map((p) => p.slice('/work/'.length))
await fs.writeFile(path.join(dist, 'sitemap.xml'), buildSitemap(slugs), 'utf8')

console.log(`Prerendered ${routes.length} routes + sitemap (${slugs.length} works).`)

function url(loc, alts, priority) {
  const links = alts
    .map((a) => `    <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${a.href}"/>`)
    .join('\n')
  return `  <url>\n    <loc>${loc}</loc>\n${links}\n    <changefreq>monthly</changefreq><priority>${priority}</priority>\n  </url>`
}

function buildSitemap(slugs) {
  const homeAlts = [
    { hreflang: 'en', href: `${SITE}/` },
    { hreflang: 'de', href: `${SITE}/de` },
    { hreflang: 'x-default', href: `${SITE}/` },
  ]
  const entries = [url(`${SITE}/`, homeAlts, '1.0'), url(`${SITE}/de`, homeAlts, '1.0')]
  for (const slug of slugs) {
    const en = `${SITE}/work/${slug}`
    const de = `${SITE}/de/work/${slug}`
    const alts = [
      { hreflang: 'en', href: en },
      { hreflang: 'de', href: de },
      { hreflang: 'x-default', href: en },
    ]
    entries.push(url(en, alts, '0.8'), url(de, alts, '0.8'))
  }
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries.join('\n')}\n</urlset>\n`
}
