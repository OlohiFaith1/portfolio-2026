'use client'

import { useSmoothScroll } from '@/components/providers/SmoothScrollProvider'

interface Props {
  className?: string
  /** Positioning strategy for this instance — set inline (not via a Tailwind
   *  class) because a plain, unlayered `.back-to-top-button` CSS rule would
   *  otherwise beat Tailwind's `absolute`/`relative` utilities, which live in
   *  a lower-priority `@layer` and lose regardless of class order. */
  position?: 'relative' | 'absolute'
}

// Figma "Group 2147224545" (node 546:39428, About page footer) — a flattened
// 40x40 circle + up-arrow glyph, reproduced here as the exact same vector
// (fill #D9D9D9 circle, black arrow) so it can be a real interactive button
// instead of a static export.
export function BackToTopButton({ className = '', position = 'relative' }: Props) {
  const { scrollToTop } = useSmoothScroll()

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      className={`back-to-top-button appearance-none bg-transparent border-0 p-0 m-0 ${className}`}
      style={{ width: 40, height: 40, borderRadius: '50%', display: 'block', position }}
    >
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
        <circle className="back-to-top-circle" cx="20" cy="20" r="20" fill="#D9D9D9" />
        <path
          d="M19.6665 12L13.3905 18.276C13.2667 18.3998 13.1685 18.5468 13.1015 18.7085C13.0345 18.8702 13 19.0436 13 19.2187C13 19.3937 13.0345 19.5671 13.1015 19.7288C13.1685 19.8906 13.2667 20.0375 13.3905 20.1613C13.5143 20.2851 13.6612 20.3833 13.823 20.4503C13.9847 20.5173 14.1581 20.5518 14.3331 20.5518C14.5082 20.5518 14.6816 20.5173 14.8433 20.4503C15.005 20.3833 15.152 20.2851 15.2758 20.1613L18.3331 17.104V27.2187C18.3331 27.5723 18.4736 27.9114 18.7237 28.1615C18.9737 28.4115 19.3128 28.552 19.6665 28.552C20.0201 28.552 20.3592 28.4115 20.6093 28.1615C20.8593 27.9114 20.9998 27.5723 20.9998 27.2187V17.104L24.0571 20.1613C24.1807 20.2856 24.3276 20.3842 24.4893 20.4515C24.6511 20.5187 24.8246 20.5534 24.9998 20.5534C25.175 20.5534 25.3485 20.5187 25.5103 20.4515C25.672 20.3842 25.8189 20.2856 25.9425 20.1613C26.1924 19.9113 26.3328 19.5722 26.3328 19.2187C26.3328 18.8651 26.1924 18.526 25.9425 18.276L19.6665 12Z"
          fill="black"
        />
      </svg>
    </button>
  )
}
