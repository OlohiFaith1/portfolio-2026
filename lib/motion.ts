// Shared easing curves lifted directly from the Claude Design "Snow —
// Portfolio v2" so every phase's Framer Motion transitions reproduce the
// same feel instead of each re-deriving similar-but-slightly-different
// cubic-beziers.
export const EASE_RISE = [0.2, 0.7, 0.2, 1] as const
export const EASE_SPRING = [0.34, 1.56, 0.64, 1] as const
export const EASE_PEEL = [0.76, 0, 0.24, 1] as const
export const EASE_SIGN = [0.5, 0, 0.35, 1] as const

/** Formats one of the arrays above as a CSS `cubic-bezier(...)` string, for
 *  plain `transition`/`animation` properties (Framer Motion's `ease` prop
 *  takes the array directly instead). */
export function cssEase(curve: readonly [number, number, number, number]): string {
  return `cubic-bezier(${curve.join(',')})`
}
