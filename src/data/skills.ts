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
      'TypeScript',
      'JavaScript',
      'React',
      'Next.js',
      'Angular',
      'Tailwind',
      'Sass',
      'Figma',
      'Storybook',
    ],
  },
  {
    en: 'AI',
    de: 'KI',
    items: ['OpenAI', 'Claude'],
  },
  {
    en: 'Backend & APIs',
    de: 'Backend & APIs',
    items: [
      '.NET',
      'C#',
      'ASP.NET Core',
      'EF Core',
      'Node.js',
      'Python',
      'PostgreSQL',
      'SQL Server',
      'Elasticsearch',
    ],
  },
  {
    en: 'Cloud & DevOps',
    de: 'Cloud & DevOps',
    items: ['Azure', 'Docker'],
  },
  {
    en: 'Tooling',
    de: 'Tooling',
    items: ['Git', 'JetBrains', 'ClickUp', 'Odoo'],
  },
]
