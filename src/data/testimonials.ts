export interface Testimonial {
  quote: string
  author: string
  role: string
}

/**
 * Real, attributable client testimonials only. The Testimonials section
 * self-hides while this array is empty — never ship placeholder social proof.
 *
 * Example shape:
 *   { quote: 'A genuine quote.', author: 'Jane Doe', role: 'Head of Product, Acme' }
 */
export const testimonials: Testimonial[] = []
