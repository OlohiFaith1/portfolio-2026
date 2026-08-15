'use client'

// Figma: "SyncWatch 3 (Image 1)" / "SyncWatch 3 (Image 2)" (389:43043 and
// its sibling) — both 1920×1400, each a single flattened export (logo
// group + background already baked in, matching every other Mercado/
// SyncWatch section's "flattened composite" convention this case study
// already uses) rather than the logo being recreated as markup. State 1
// is black background + white/pink logo; State 2 is white background +
// black/pink logo — same mark, inverted brand colors.
//
// Both images are always mounted, stacked via `fill` inside one
// aspect-ratio-locked (1920/1400) container, and crossfaded by animating
// opacity — simpler and more robust for a two-state loop than mounting/
// unmounting per cycle (nothing to preload mid-loop, no pop-in). The
// container's fluid width + fixed aspect-ratio is what makes this
// responsive without a separate mobile treatment: it scales to any
// viewport width by construction, the same way SyncWatchHero's full-bleed
// photo does.
//
// The loop only runs while the section is in the viewport (mirrors the
// IntersectionObserver-gated pattern MercadoStudy5/6 already use for their
// own looping animations, just re-armed on every entry/exit here instead
// of firing once, since this is a continuous loop rather than a one-shot
// reveal). prefers-reduced-motion shows State 1 statically instead.
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'

const NATIVE_W = 1920
const NATIVE_H = 1400

const EASE = [0.25, 0, 0.1, 1] as const
const HOLD_MS = 450
const FADE_DURATION = 0.15 // seconds
const CYCLE_MS = HOLD_MS + FADE_DURATION * 1000

export function SyncWatchStudy3() {
  const prefersReducedMotion = useReducedMotion() ?? false
  const sectionRef = useRef<HTMLElement>(null)
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
    <section
      ref={sectionRef}
      aria-hidden="true"
      className="relative w-full overflow-hidden"
      style={{ aspectRatio: `${NATIVE_W} / ${NATIVE_H}` }}
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
          sizes="100vw"
          style={{ objectFit: 'contain' }}
          priority={false}
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
          sizes="100vw"
          style={{ objectFit: 'contain' }}
          priority={false}
        />
      </motion.div>
    </section>
  )
}
