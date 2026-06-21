import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

/**
 * Preload the above-the-fold display font (Funnel Display, Latin subset) used by
 * the hero <h1>. The @font-face url() lives inside the bundled CSS, so without
 * this the browser can't discover the font until index.css has downloaded and
 * parsed — serialising two round-trips. Preloading lets the font fetch start in
 * parallel with the CSS, shrinking the swap-in delay for the headline.
 *
 * The emitted filename is content-hashed, so we read it from the build bundle at
 * `transformIndexHtml` time rather than hardcoding a hash that would go stale.
 * Only the Latin file is preloaded (the one EN/DE content actually fetches);
 * other subsets stay unicode-range-gated and are never requested.
 */
function preloadDisplayFont(): Plugin {
  return {
    name: 'preload-display-font',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        const file = Object.keys(ctx.bundle ?? {}).find((name) =>
          /funnel-display-latin-wght-normal-[^/]*\.woff2$/.test(name),
        )
        if (!file) return html
        const tag = `    <link rel="preload" href="/${file}" as="font" type="font/woff2" crossorigin />\n  `
        return html.replace('</head>', `${tag}</head>`)
      },
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), preloadDisplayFont()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    // Modern output — the site targets evergreen browsers, so skip legacy transpilation.
    target: 'esnext',
    // Minification stays on Vite 8's default (Oxc) — it's already enabled for builds.
    rollupOptions: {
      output: {
        // Split rarely-changing vendor code into its own long-cacheable chunk so the
        // app chunk stays small and invalidates independently of dependency updates.
        // (Rolldown — Vite 8's bundler — only supports the function form.)
        manualChunks(id) {
          if (
            /node_modules\/(react|react-dom|scheduler|react-router|react-router-dom)\//.test(
              id,
            )
          ) {
            return 'react-vendor'
          }
        },
      },
    },
  },
})
