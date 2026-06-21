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
    q: 'Will the project be mine?',
    a: 'Yes — completely. Once it\'s built and paid for, the product and the source are yours, and nothing is tied to me. You\'re free to hand it to any other developer later.',
  },
  {
    q: 'Can you work with our existing team and code?',
    a: 'Yes. I can pick up an existing codebase and work alongside your team — your stack, your conventions — or build it greenfield. Either way you get clean, documented code your team can own.',
  },
  {
    q: 'What happens after launch?',
    a: 'I don\'t disappear at launch. I can stay on for fixes, iterations and new features, or hand off cleanly with documentation so your team takes over — your call.',
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
    q: 'Gehört das Projekt mir?',
    a: 'Ja – vollständig. Sobald es erstellt und bezahlt ist, gehören das Produkt und der Quellcode Ihnen, und nichts ist an mich gebunden. Sie können es später jederzeit an eine andere Entwicklerin oder einen anderen Entwickler übergeben.',
  },
  {
    q: 'Arbeiten Sie auch mit unserem Team und Code?',
    a: 'Ja. Ich kann eine bestehende Codebasis übernehmen und mit Ihrem Team arbeiten – Ihr Stack, Ihre Konventionen – oder von Grund auf neu bauen. So oder so erhalten Sie sauberen, dokumentierten Code, der Ihrem Team gehört.',
  },
  {
    q: 'Was passiert nach dem Launch?',
    a: 'Mit dem Launch ist nicht Schluss. Ich bleibe für Fixes, Iterationen und neue Features an Bord oder übergebe sauber mit Dokumentation, damit Ihr Team übernimmt – ganz wie Sie möchten.',
  },
  {
    q: 'Noch unklar, was Sie brauchen?',
    a: 'Schreiben Sie mir ein paar Zeilen zu Ihrer Idee. Ich mache daraus einen klaren Plan und einen Preis, damit Sie ohne Rätselraten entscheiden können – und das kostenlos für Sie.',
  },
]

export const faqs: Localized<Qa[]> = { en, de }
