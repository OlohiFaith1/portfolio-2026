'use client'

import { useEffect, useRef, useState } from 'react'

// Claude Design "Snow — Portfolio v2" contextual cursor — a small pill that
// follows the pointer and swaps its label to whatever the hovered element's
// `data-cursor` attribute says (e.g. `data-cursor="View project"`).
// Desktop-only (hover-capable + fine pointer — same detection pattern
// already used by WorkCard/CaseStudySection/NextProjectSection), never
// intercepts clicks (pointer-events: none), and manipulates the DOM
// directly via a ref rather than React state so it never triggers a
// re-render on mousemove.
//
// Mounted once, globally, in the root layout. Consumers just add
// `data-cursor="Label"` to any element — no wiring required here.
export function ContextualCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

  const [hoverCapable, setHoverCapable] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(hover: hover) and (pointer: fine)').matches
  })
  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const onChange = (e: MediaQueryListEvent) => setHoverCapable(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (!hoverCapable) return
    const cursor = cursorRef.current
    if (!cursor) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    cursor.style.transition = reduceMotion ? 'none' : 'opacity 160ms ease'

    let active = false

    const move = (e: MouseEvent) => {
      const w = cursor.offsetWidth
      const h = cursor.offsetHeight
      const x = Math.max(8, Math.min(e.clientX + 14, window.innerWidth - w - 8))
      const y = Math.max(8, Math.min(e.clientY + 16, window.innerHeight - h - 8))
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`
    }

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const el = target.closest?.('[data-cursor]') as HTMLElement | null
      if (!el) return
      cursor.textContent = el.getAttribute('data-cursor')
      cursor.style.opacity = '1'
      move(e)
      if (!active) {
        window.addEventListener('mousemove', move, { passive: true })
        active = true
      }
    }

    const onOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const el = target.closest?.('[data-cursor]') as HTMLElement | null
      if (!el) return
      if (e.relatedTarget && el.contains(e.relatedTarget as Node)) return
      cursor.style.opacity = '0'
      if (active) {
        window.removeEventListener('mousemove', move)
        active = false
      }
    }

    // Clicking a data-cursor element (e.g. a case-study card) can navigate
    // without ever firing a mouseout first — the pointer doesn't leave the
    // element, it's the page underneath that changes. Left unhandled, the
    // pill stays pinned on screen through the whole route transition.
    // Hiding it on click, on top of the existing hover behavior rather
    // than in place of it, clears that state the instant the click happens.
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const el = target.closest?.('[data-cursor]') as HTMLElement | null
      if (!el) return
      cursor.style.opacity = '0'
      if (active) {
        window.removeEventListener('mousemove', move)
        active = false
      }
    }

    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    document.addEventListener('click', onClick)

    return () => {
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      document.removeEventListener('click', onClick)
      window.removeEventListener('mousemove', move)
    }
  }, [hoverCapable])

  // Always rendered (never conditionally removed) — the server has no
  // `window` so it can never know hoverCapable up front, and returning
  // null here on the client's first render whenever the device turns out
  // to be hover-capable would make the DOM tree shape disagree with the
  // server-rendered HTML, triggering a hydration mismatch. Rendering
  // unconditionally is safe: at rest the pill is off-screen/opacity 0,
  // and its listeners (the only "desktop-only" gate that actually
  // matters) are only ever attached when hoverCapable is true.
  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 70,
        pointerEvents: 'none',
        opacity: 0,
        transform: 'translate3d(-100px, -100px, 0)',
        padding: '5px 9px',
        borderRadius: 999,
        background: 'var(--foreground)',
        color: 'var(--background)',
        fontFamily: 'var(--font-mono)',
        fontSize: 9,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
      }}
    />
  )
}
