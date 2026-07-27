'use client'

import { useRef, useEffect, useCallback } from 'react'
import type { ReactNode } from 'react'
import { WORK_ENTERED_EVENT } from '@/lib/events'

interface Props {
  landing: ReactNode
  work: ReactNode
}

export function ScrollGate({ landing, work }: Props) {
  const heroRef = useRef<HTMLDivElement>(null)
  const gated = useRef(false)
  const cleanupListeners = useRef<(() => void) | null>(null)

  const enter = useCallback(() => {
    if (gated.current) return
    gated.current = true

    // Remove gesture listeners immediately — no need to keep them active.
    cleanupListeners.current?.()

    // Signal Nav (flushSync), NavigationDrawer (flushSync + instant snap),
    // and SmoothScrollProvider simultaneously.
    window.dispatchEvent(new CustomEvent(WORK_ENTERED_EVENT))

    // Hard-cut: remove the hero with no animation, no overlap.
    if (heroRef.current) heroRef.current.style.display = 'none'
  }, [])

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (e.deltaY > 0) enter()
    }

    let touchStartY = 0
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY
    }
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches[0].clientY < touchStartY - 10) enter()
    }

    const onKeyDown = (e: KeyboardEvent) => {
      // Don't intercept Space/ArrowDown on interactive elements inside the landing hero.
      const tag = (e.target as HTMLElement).tagName
      if (['BUTTON', 'INPUT', 'TEXTAREA', 'SELECT', 'A'].includes(tag)) return
      if (['ArrowDown', 'PageDown', 'End', ' '].includes(e.key)) {
        e.preventDefault()
        enter()
      }
    }

    const cleanup = () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('keydown', onKeyDown)
    }

    cleanupListeners.current = cleanup

    window.addEventListener('wheel', onWheel, { passive: true })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('keydown', onKeyDown)

    return cleanup
  }, [enter])

  return (
    <>
      {/*
        Hero is fixed (z=10), sitting above the work section but below Nav (z=50)
        and the drawer (z=100). It takes no space in the document flow, so the
        work section is always at document y=0. On the first downward gesture
        the hero is hidden instantly — a hard cut with zero overlap.
      */}
      <div
        ref={heroRef}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 10,
          // Opaque background so the work section below is not visible through
          // the hero. Matches the body dot-pattern exactly.
          backgroundColor: 'var(--background)',
          backgroundImage: 'radial-gradient(circle, #d8d8d8 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      >
        {landing}
      </div>

      {/* Always at document y=0; revealed the moment the hero is hidden. */}
      {work}
    </>
  )
}
