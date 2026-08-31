'use client'

// Restored from the original SyncWatchStudy3 section (commit 26aa872,
// removed when this case study moved to the shared CaseStudyChapter
// format) — same two flattened exports, same crossfade technique and
// timing, byte-for-byte. Only the outer frame changed: the original used
// its own full-bleed 1920:1400 box, this now sits in the same 3:2
// rounded/cropped frame every other figure in this case study uses, so it
// reads as "this chapter's image" rather than a one-off layout.
//
// "SyncWatch 3 (Image 1)"/"(Image 2)" (1920×1400, since re-exported at 4×
// but same ratio) are each a single flattened export — logo group +
// background already baked in — rather than the logo being recreated as
// markup. State 1 is black background + white/pink logo; State 2 is white
// background + black/pink logo, same mark, inverted brand colors.
//
// Both images stay mounted, stacked via `fill` inside one box, and
// crossfaded by animating opacity — simpler and more robust for a
// two-state loop than mounting/unmounting per cycle (nothing to preload
// mid-loop, no pop-in). The loop only runs while the section is in the
// viewport (IntersectionObserver-gated, re-armed on every entry/exit since
// this loops continuously rather than firing once); prefers-reduced-motion
// shows State 1 statically.
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.25, 0, 0.1, 1] as const
const HOLD_MS = 450
const FADE_DURATION = 0.15 // seconds
const CYCLE_MS = HOLD_MS + FADE_DURATION * 1000

export function SyncWatchLogoFlicker() {
  const prefersReducedMotion = useReducedMotion() ?? false
  const sectionRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  const [showState1, setShowState1] = useState(true)

  // Pauses/resumes the loop as the section scrolls in and out of view —
  // not a one-time trigger, since this keeps looping for as long as it's
  // visible rather than playing once.
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.3 })
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (prefersReducedMotion || !inView) return
    const id = setInterval(() => setShowState1((v) => !v), CYCLE_MS)
    return () => clearInterval(id)
  }, [prefersReducedMotion, inView])

  const state1Visible = prefersReducedMotion || showState1

  return (
    <div
      ref={sectionRef}
      aria-hidden="true"
      className="relative w-full"
      style={{ aspectRatio: '3 / 2', borderRadius: 12, overflow: 'hidden', background: 'var(--surface)' }}
    >
      <motion.div
        style={{ position: 'absolute', inset: 0 }}
        initial={false}
        animate={{ opacity: state1Visible ? 1 : 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : FADE_DURATION, ease: EASE }}
      >
        <Image
          src="/images/syncwatch/SyncWatch 3 (Image 1).png"
          alt=""
          fill
          sizes="(min-width: 768px) 620px, 100vw"
          style={{ objectFit: 'cover' }}
        />
      </motion.div>
      <motion.div
        style={{ position: 'absolute', inset: 0 }}
        initial={false}
        animate={{ opacity: state1Visible ? 0 : 1 }}
        transition={{ duration: prefersReducedMotion ? 0 : FADE_DURATION, ease: EASE }}
      >
        <Image
          src="/images/syncwatch/SyncWatch 3 (Image 2).png"
          alt=""
          fill
          sizes="(min-width: 768px) 620px, 100vw"
          style={{ objectFit: 'cover' }}
        />
      </motion.div>
    </div>
  )
}
