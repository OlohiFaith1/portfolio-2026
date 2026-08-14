'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'

// Figma: "Synwatch 1 Image" (389:42356) — a full-bleed 16:9 photo (someone
// watching a movie on a laptop, lit by the screen) at 45% opacity directly
// over a black background, which is how Figma produces the dark/cinematic
// look. Reproduced here as three explicit stacked layers instead — image,
// then a separate dark overlay, then the logo — so the logo can sit above
// the overlay at full clarity rather than inheriting any of the dimming.
// A 55% black overlay over the full-brightness photo is the equivalent
// darkness to Figma's 45%-opacity image over black.
//
// object-fit: cover (not Figma's hand-placed crop percentages) keeps the
// source's own aspect ratio intact and lets it crop naturally at any
// viewport, matching every other full-bleed section in this app (e.g.
// MercadoStudy2's SectionImage).
//
// Mirrors AzzaHero/MercadoHero's own conventions: 100svh, solid fallback
// background color, centred logo via absolute + translate. The fade-in
// follows MercadoHero's precedent (Azza's hero has none) since it's the
// more recently established "first section" pattern in this app.
const EASE = [0.25, 0, 0.1, 1] as const

export function SyncWatchHero() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        height: '100svh',
        backgroundColor: '#000',
        overflow: 'hidden',
      }}
    >
      {/* Background photo — fills the section, crops naturally via object-fit: cover */}
      <Image
        src="/images/Synwatch 1 Image.png"
        alt="A woman smiling while watching a movie on her laptop at night"
        fill
        sizes="100vw"
        style={{ objectFit: 'cover' }}
        priority
      />

      {/* Dark overlay — above the image, below the logo */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.55)',
        }}
      />

      {/* Logo — centred both axes, above the overlay, unaffected by it */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: EASE }}
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Image
          src="/work/syncwatch-logo.svg"
          alt="SyncWatch"
          width={381}
          height={80}
          style={{ width: 'clamp(220px, 28vw, 420px)', height: 'auto', display: 'block' }}
          priority
        />
      </motion.div>
    </section>
  )
}
