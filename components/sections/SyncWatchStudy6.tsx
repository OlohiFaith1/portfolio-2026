'use client'

// Figma: "SyncWatch 6" (391:69166) — a single full-bleed billboard image,
// nothing else. The "Billboard" rectangle fills the entire 1920×1214
// section frame edge-to-edge (x=0, y=0, matching width/height exactly) —
// no side margins, no border radius, no overlaid text (the tagline and
// logo are already baked into the export), matching this whole case
// study's "flattened composite" convention. The export itself
// (7680×4856) is at the same 1920:1214 ratio, so an aspect-ratio-locked
// full-width container reproduces Figma's exact framing at any viewport
// width without cropping or letterboxing, the same technique
// SyncWatchStudy3 uses for its own full-bleed image.
//
// Figma shows no animation on this section (a single static image, no
// alternate states), so per the brief this uses a subtle one-shot
// viewport reveal (fade + slight rise) instead — the standard Framer
// Motion pattern already in use elsewhere in this case study
// (SyncWatchStudy3/4's `useReducedMotion() ?? false` convention), rather
// than a continuous loop, since there's nothing here to loop between.
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'

const NATIVE_W = 1920
const NATIVE_H = 1214
const EASE = [0.25, 0, 0.1, 1] as const

export function SyncWatchStudy6() {
  const prefersReducedMotion = useReducedMotion() ?? false

  return (
    <section className="relative w-full overflow-hidden" style={{ aspectRatio: `${NATIVE_W} / ${NATIVE_H}` }}>
      <motion.div
        style={{ position: 'absolute', inset: 0 }}
        initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.6, ease: EASE }}
      >
        <Image
          src="/images/syncwatch/Billboard.png"
          alt="A roadside billboard mockup reading 'Watch together, even when you're apart.' beside the SyncWatch logo, over a photo of two people looking at a phone together"
          fill
          sizes="100vw"
          style={{ objectFit: 'cover' }}
        />
      </motion.div>
    </section>
  )
}
