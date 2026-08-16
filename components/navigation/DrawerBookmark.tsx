'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface Props {
  isOpen: boolean
  onToggle: () => void
  align: 'right' | 'center'
}

// Time between the start of one bounce and the start of the next — the
// bounce itself (BOUNCE_TRANSITION.duration) is a small fraction of this,
// so the idle "pause" between bounces is always noticeably longer than the
// bounce it separates.
const BOUNCE_INTERVAL_MS = 4000
const BOUNCE_TRANSITION = { duration: 0.6, ease: 'easeInOut' as const, times: [0, 0.5, 1] }

export function DrawerBookmark({ isOpen, onToggle, align }: Props) {
  const prefersReducedMotion = useReducedMotion()
  const buttonRef = useRef<HTMLButtonElement>(null)
  const startedRef = useRef(false)
  const [nudge, setNudge] = useState(false)

  // Recurring, subtle attention cue: bounce → settle → pause → repeat, for
  // as long as the page stays open. Starts once the bookmark is actually
  // visible (it's off-screen via a transform on the landing page until the
  // work section is reached, so mount time isn't the right clock) — after
  // that first sighting, the cadence keeps going regardless of further
  // scroll position; `startedRef` just ensures it's armed only once.
  useEffect(() => {
    if (prefersReducedMotion) return
    const button = buttonRef.current
    if (!button) return

    let intervalId: ReturnType<typeof setInterval> | null = null

    const observer = new IntersectionObserver(([entry]) => {
      if (startedRef.current || !entry.isIntersecting) return
      startedRef.current = true
      observer.disconnect()
      intervalId = setInterval(() => setNudge(true), BOUNCE_INTERVAL_MS)
    })
    observer.observe(button)

    return () => {
      observer.disconnect()
      if (intervalId) clearInterval(intervalId)
    }
  }, [prefersReducedMotion])

  return (
    // Desktop inset (lg:pr-6 = 24px) matches the shared grid's own side
    // margin (components/layout/Grid.tsx), so the bookmark's right edge
    // sits flush with the same line every grid-aligned section's content
    // aligns to, rather than an unrelated fixed offset.
    <div className={`flex ${align === 'center' ? 'justify-center' : 'justify-end pr-2 lg:pr-6'}`}>
      {/*
        pointer-events-auto overrides the parent motion div's pointer-events-none
        so the bookmark remains clickable in the closed state on non-landing pages.
      */}
      <motion.button
        ref={buttonRef}
        type="button"
        onClick={onToggle}
        aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        className="block w-[36px] h-[54px] lg:h-[74px] cursor-pointer pointer-events-auto"
        animate={nudge ? { y: [0, 6, 0] } : { y: 0 }}
        transition={BOUNCE_TRANSITION}
        onAnimationComplete={() => setNudge(false)}
      >
        <img
          src="/bookmark.svg"
          alt=""
          aria-hidden="true"
          className="size-full"
        />
      </motion.button>
    </div>
  )
}
