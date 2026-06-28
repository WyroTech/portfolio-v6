import {
  siTypescript,
  siAngular,
  siReact,
  siReactivex,
  siSass,
  siHtml5,
  siJavascript,
  siStorybook,
  siFigma,
  siPython,
  siPostgresql,
  siDocker,
  siLinux,
  siGit,
  siPosthog,
  siTailwindcss,
  siNextdotjs,
  siNodedotjs,
  siVite,
  siElectron,
  siArduino,
  siSap,
  siCypress,
  siClaude,
  siClickup,
  siOdoo,
  siJetbrains,
  siElasticsearch,
  siAstro,
  siGraphql,
  siGithub,
  siNestjs,
  siDaisyui,
  siTrpc,
  siVercel,
  siCloudflare,
  siModelcontextprotocol,
} from 'simple-icons'
import './TechIcon.scss'

interface SimpleIcon {
  path: string
  title: string
}

// Brands that pulled their mark from Simple Icons (trademark) → clean text label.
const ICONS: Record<string, SimpleIcon> = {
  TypeScript: siTypescript,
  Angular: siAngular,
  React: siReact,
  RxJS: siReactivex,
  Sass: siSass,
  HTML5: siHtml5,
  JavaScript: siJavascript,
  Storybook: siStorybook,
  Figma: siFigma,
  Python: siPython,
  PostgreSQL: siPostgresql,
  Docker: siDocker,
  Linux: siLinux,
  Git: siGit,
  PostHog: siPosthog,
  Tailwind: siTailwindcss,
  'Next.js': siNextdotjs,
  'Node.js': siNodedotjs,
  Vite: siVite,
  Electron: siElectron,
  Arduino: siArduino,
  SAP: siSap,
  Cypress: siCypress,
  Claude: siClaude,
  ClickUp: siClickup,
  Odoo: siOdoo,
  JetBrains: siJetbrains,
  Elasticsearch: siElasticsearch,
  Astro: siAstro,
  GraphQL: siGraphql,
  GitHub: siGithub,
  NestJS: siNestjs,
  daisyUI: siDaisyui,
  tRPC: siTrpc,
  Vercel: siVercel,
  Cloudflare: siCloudflare,
  MCP: siModelcontextprotocol,
  // No trademark-safe / consistent Simple Icons glyph (→ monogram fallback): OpenAI,
  // SQL Server, Playwright, Vitest, REST, gRPC, WebSocket, Webhooks, SignalR, AWS,
  // Azure, Azure DevOps.
}

// Wordmark logos (glyph already spells the name) → glyph only, no label.
// None currently: .NET's Simple Icons mark is a thin wordmark, so it renders as a
// monogram chip instead (a deliberate choice — see the fallback below).
const WORDMARKS = new Set<string>()

export default function TechIcon({ name }: { name: string }) {
  const icon = ICONS[name]

  if (!icon) {
    // No trademark-safe mark — render a monogram chip in the glyph slot so the
    // item still baseline-aligns with the real glyphs (no bare, crooked text).
    // .NET: its Simple Icons mark is a thin wordmark, so show a clean "NET" chip.
    const mono = name === '.NET' ? 'NET' : name.replace(/[^A-Za-z0-9#+.]/g, '').slice(0, 2)
    return (
      <span className="tech tech--text">
        <span className="tech__glyph tech__glyph--mono" aria-hidden="true">
          {mono}
        </span>
        <span className="tech__name">{name}</span>
      </span>
    )
  }

  const wordmark = WORDMARKS.has(name)
  return (
    <span className="tech">
      <svg
        className={`tech__glyph${wordmark ? ' tech__glyph--wordmark' : ''}`}
        viewBox="0 0 24 24"
        focusable="false"
        // wordmarks have no text label → the svg carries the name;
        // otherwise the text label names it and the glyph is decorative
        {...(wordmark ? { role: 'img', 'aria-label': name } : { 'aria-hidden': true })}
      >
        <path d={icon.path} fill="currentColor" />
      </svg>
      {!wordmark && <span className="tech__name">{name}</span>}
    </span>
  )
}
