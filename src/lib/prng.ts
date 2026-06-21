/** Deterministic, seedable pseudo-randomness for generative visuals. */

export function hashSeed(str: string): number {
  let h = 1779033703 ^ str.length
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353)
    h = (h << 13) | (h >>> 19)
  }
  return h >>> 0
}

/** mulberry32 PRNG — fast, decent distribution, fully deterministic. */
export function mulberry32(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function rngFromSeed(seed: string) {
  return mulberry32(hashSeed(seed))
}

/** rng in [min, max) */
export const range = (rng: () => number, min: number, max: number) => min + rng() * (max - min)

/** integer rng in [min, max] inclusive */
export const rangeInt = (rng: () => number, min: number, max: number) =>
  Math.floor(range(rng, min, max + 1))

export const pick = <T>(rng: () => number, arr: readonly T[]): T => arr[rangeInt(rng, 0, arr.length - 1)]
