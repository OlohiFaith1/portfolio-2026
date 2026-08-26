'use client'

import { useEffect, useRef } from 'react'

// Claude Design "Snow — Portfolio v2" reading-progress rail — a thin fixed
// bar at the very top of case-study pages, its scaleX tracking scroll
// position. Uses a plain window 'scroll' listener (the same mechanism
// DraggableDotGrid/the old ScrollGate already relied on) rather than a
// second scroll system — Lenis dispatches real native scroll events, so a
// plain listener already stays in sync with it. Manipulates the DOM
// directly via a ref instead of React state so it never re-renders on
// scroll.
export function CaseStudyProgressRail() {
  const railRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const rail = railRef.current
    if (!rail) return

    const onScroll = () => {
      const html = document.documentElement
      const max = html.scrollHeight - html.clientHeight
      const pct = max > 0 ? window.scrollY / max : 0
      rail.style.transform = `scaleX(${pct.toFixed(4)})`
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      ref={railRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: 2,
        width: '100%',
        background: 'var(--accent)',
        transformOrigin: '0 50%',
        transform: 'scaleX(0)',
        zIndex: 25,
      }}
    />
  )
}
