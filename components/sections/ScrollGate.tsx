'use client'

import { useRef, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import type { ReactNode } from 'react'
import { WORK_ENTERED_EVENT } from '@/lib/events'
import { DraggableDotGrid } from './DraggableDotGrid'

interface Props {
  landing: ReactNode
  /**
   * The Azza standalone preview — revealed in place (same route, hard-cut
   * hero, no navigation) on desktop/tablet when the user scrolls/swipes past
   * the hero. Mobile skips this entirely and navigates straight to the Work
   * grid instead — see `enter()` below.
   */
  work: ReactNode
}

export function ScrollGate({ landing, work }: Props) {
  const router = useRouter()
  const heroRef = useRef<HTMLDivElement>(null)
  const gated = useRef(false)

  const enter = useCallback(() => {
    if (gated.current) return
    gated.current = true

    const isDesktop = window.matchMedia('(min-width: 640px)').matches

    // Mobile: skip the inline Azza preview entirely, go straight to the grid.
    if (!isDesktop) {
      router.push('/work')
      return
    }

    // Desktop/tablet: reveal the Azza preview in place — hard-cut hero, no
    // animation, no real navigation away from '/'.
    window.dispatchEvent(new CustomEvent(WORK_ENTERED_EVENT))
    if (heroRef.current) heroRef.current.style.display = 'none'
    window.history.replaceState(null, '', '/work')
  }, [router])

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

    window.addEventListener('wheel', onWheel, { passive: true })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [enter])

  return (
    <>
      {/*
        Hero is fixed (z=10), sitting above the work section but below Nav (z=50)
        and the drawer (z=100). It takes no space in the document flow, so the
        work section is always at document y=0. On the first downward gesture
        (desktop/tablet only) the hero is hidden instantly — a hard cut with
        zero overlap. Mobile never reaches this: it navigates away first.
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
        }}
      >
        {/* Separate layer so dragging (desktop only) pans only the dots — the
            landing content below is normal flow and never moves. LandingHero
            has no clickable elements of its own, and its flex containers
            span the full viewport even where visually empty, so without
            pointer-events: none here they'd swallow every mousedown before
            it ever reached the grid layer beneath. */}
        <DraggableDotGrid />
        <div style={{ position: 'relative', zIndex: 1, pointerEvents: 'none' }}>{landing}</div>
      </div>

      {/* Always at document y=0; revealed the moment the hero is hidden (desktop/tablet only). */}
      {work}
    </>
  )
}
