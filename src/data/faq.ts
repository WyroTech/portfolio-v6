import type { Localized } from '../i18n/localize'

export interface Qa {
  q: string
  a: string
}

/**
 * Pre-answers the objections a solo dev triggers. Confirm they match how you
 * actually work before launch (esp. the pricing model). The section self-hides
 * when the array is empty.
 */
const en: Qa[] = [
  {
    q: 'What will it cost?',
    a: 'You get a clear price before we start — not a surprise at the end. We agree on what you need, I give you a fixed price for it, and you always know what you\'re paying for.',
  },
  {
    q: 'Will the website be mine?',
    a: 'Yes — completely. Once it\'s built and paid for, the site and the files are yours, and nothing is tied to me. You\'re free to hand it to any other developer later.',
  },
  {
    q: 'Can one person really handle it?',
    a: 'I do the design and the build myself, so you have one person to talk to from the first idea to launch — no being passed between a designer and a developer. For anything beyond that, like more involved server work, I bring in people I trust and tell you up front where that line is.',
  },
  {
    q: 'Not sure what you need yet?',
    a: 'Send me a few lines about what you have in mind. I\'ll turn it into a clear plan and a price, so you can decide with no guesswork — and at no cost to you.',
  },
]

const de: Qa[] = [
  {
    q: 'Was kostet es?',
    a: 'Sie erhalten einen klaren Preis, bevor wir beginnen – keine Überraschung am Ende. Wir klären gemeinsam, was Sie brauchen, ich nenne Ihnen dafür einen Festpreis, und Sie wissen jederzeit, wofür Sie bezahlen.',
  },
  {
    q: 'Gehört die Website mir?',
    a: 'Ja – vollständig. Sobald sie erstellt und bezahlt ist, gehören die Website und die Dateien Ihnen, und nichts ist an mich gebunden. Sie können sie später jederzeit an eine andere Entwicklerin oder einen anderen Entwickler übergeben.',
  },
  {
    q: 'Schafft das wirklich eine Person allein?',
    a: 'Gestaltung und Umsetzung mache ich selbst, sodass Sie von der ersten Idee bis zum Launch eine feste Ansprechperson haben – kein Hin und Her zwischen Design und Entwicklung. Für alles darüber hinaus, etwa aufwendigere Server-Arbeit, hole ich Leute hinzu, denen ich vertraue, und sage Ihnen vorab, wo diese Grenze liegt.',
  },
  {
    q: 'Noch unklar, was Sie brauchen?',
    a: 'Schreiben Sie mir ein paar Zeilen zu Ihrer Idee. Ich mache daraus einen klaren Plan und einen Preis, damit Sie ohne Rätselraten entscheiden können – und das kostenlos für Sie.',
  },
]

export const faqs: Localized<Qa[]> = { en, de }
