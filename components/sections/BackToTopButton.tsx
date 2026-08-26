'use client'

import { useSmoothScroll } from '@/components/providers/SmoothScrollProvider'

interface Props {
  className?: string
  position?: 'relative' | 'absolute'
}

// Claude Design "Snow — Portfolio v2" back-to-top button — a plain circular
// icon button (chevron, not the previous filled arrow glyph), hooked into
// this session's own ContextualCursor/MagneticHover primitives via
// data-cursor/data-magnet. Scroll behavior is unchanged: still the shared
// Lenis instance via SmoothScrollProvider (see that file for the actual
// scrollToTop implementation).
export function BackToTopButton({ className = '', position = 'relative' }: Props) {
  const { scrollToTop } = useSmoothScroll()

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      data-cursor="Back to top"
      data-magnet="9"
      className={`back-to-top-button appearance-none border-0 p-0 m-0 flex items-center justify-center ${className}`}
      style={{
        width: 36,
        height: 36,
        borderRadius: '50%',
        background: '#f0eeea',
        color: 'var(--body)',
        position,
      }}
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  )
}
