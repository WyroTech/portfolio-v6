/** A named, ordered group of technologies in the stack wall. */
export interface TechCategory {
  en: string
  de: string
  items: string[]
}

/** Tech wall — categorised, ordered; greyscale, full on hover */
export const techCategories: TechCategory[] = [
  {
    en: 'Frontend',
    de: 'Frontend',
    items: [
      'Angular',
      'TypeScript',
      'JavaScript',
      'HTML5',
      'CSS',
      'React',
      'Next.js',
      'Astro',
      'Tailwind',
      'daisyUI',
      'Sass',
      'Figma',
      'Storybook',
    ],
  },
  {
    en: 'AI',
    de: 'KI',
    items: ['OpenAI', 'Claude', 'MCP'],
  },
  {
    en: 'Backend & Databases',
    de: 'Backend & Datenbanken',
    items: [
      '.NET',
      'C#',
      'ASP.NET Core',
      'EF Core',
      'Node.js',
      'NestJS',
      'Python',
      'PostgreSQL',
      'SQL Server',
      'Elasticsearch',
    ],
  },
  {
    en: 'APIs & Realtime',
    de: 'APIs & Realtime',
    items: ['REST', 'GraphQL', 'tRPC', 'gRPC', 'WebSocket', 'Webhooks', 'SignalR'],
  },
  {
    en: 'Cloud & DevOps',
    de: 'Cloud & DevOps',
    items: ['Azure', 'AWS', 'Docker'],
  },
  {
    en: 'Tooling',
    de: 'Tooling',
    items: ['Git', 'GitHub', 'Vercel', 'Cloudflare', 'Azure DevOps', 'JetBrains', 'Vitest', 'Playwright', 'ClickUp', 'Odoo'],
  },
]
