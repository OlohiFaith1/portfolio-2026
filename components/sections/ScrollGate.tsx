'use client'

import { useRef, useEffect, useCallback } from 'react'
import type { ReactNode } from 'react'

interface Props {
  landing: ReactNode
  work: ReactNode
}

export function ScrollGate({ landing, work }: Props) {
  const heroRef = useRef<HTMLDivElement>(null)
  const gated = useRef(false)

  const enter = useCallback(() => {
    if (gated.current) return
    gated.current = true

    // Signal Nav, NavigationDrawer, and SmoothScrollProvider.
    // SmoothScrollProvider will call lenis.scrollTo(0, { immediate: true })
    // to cancel any in-flight scroll animation before the layout collapses.
    window.dispatchEvent(new CustomEvent('work-entered'))

    // Collapse the hero out of the document flow. At this moment the work
    // section (z=2) is already fully covering the hero (z=1, sticky), so
    // there is no visual jump. The page height drops and the browser auto-
    // clamps scrollY to 0, placing the work section at the viewport top.
    const hero = heroRef.current
    if (hero) {
      hero.style.height = '0'
      hero.style.overflow = 'hidden'
      hero.style.position = 'static'
    }
  }, [])

  useEffect(() => {
    // Fire when the user has scrolled the full height of the hero — at that
    // point the work section is entirely covering the sticky hero.
    const handleScroll = () => {
      if (!gated.current && window.scrollY >= window.innerHeight) {
        enter()
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [enter])

  return (
    <>
      {/*
        The hero sticks to the top of the viewport (z=1) while the work
        section (z=2) scrolls up from below and covers it. Once the work
        section fully covers the hero (scrollY ≥ innerHeight), the hero is
        collapsed silently and scroll resets to 0 via Lenis.
      */}
      <div ref={heroRef} style={{ position: 'sticky', top: 0, zIndex: 1 }}>
        {landing}
      </div>

      {/*
        Explicit background replicates the body's dot pattern so the work
        section is opaque and fully covers the sticky hero as it rises.
      */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          backgroundColor: 'var(--background)',
          backgroundImage: 'radial-gradient(circle, #d8d8d8 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      >
        {work}
      </div>
    </>
  )
}
