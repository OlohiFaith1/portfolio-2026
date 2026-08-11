'use client'

import Image from 'next/image'
import { Oswald } from 'next/font/google'
import { motion, useReducedMotion } from 'framer-motion'

// Oswald is scoped to this component (not the root layout) since it's used
// nowhere else in the app — Mercado's own display font, distinct from the
// site-wide Pirata/Rethink pair and from Subjectivity (Azza's in-app-UI font).
const oswald = Oswald({ weight: '700', subsets: ['latin'] })

// Figma ("Mercado 3", 1920×1080): a centred group — "Mercado" wordmark
// (Oswald Bold, 200px, white, tracking -2px, line-height 1.15) with a small
// white "M" badge (41.842px square, 8px radius, #092b2d "M" at 28px) sitting
// just above-left of it. The whole group is centred in the frame (its own
// bounding box center lands exactly on the frame's center both axes), so a
// flex-centered section reproduces the composition without needing to
// replicate Figma's raw calc() offsets.
//
// Every badge/wordmark dimension below is expressed in `em`, driven by one
// responsive `fontSize` on the wrapping group — e.g. the badge is
// 41.842/200 = 0.2092em, its horizontal offset from the wordmark's own left
// edge is (584-626)/200 = -0.21em. That keeps the badge and wordmark
// proportional to each other at any size, rather than needing separate
// hardcoded values per breakpoint. Background: #092b2d (this replaces the
// section's previous #14474b) — texture overlay reused verbatim from
// AzzaHero (confirmed byte-identical against the current Figma export).
const EASE = [0.25, 0, 0.1, 1] as const

export function MercadoHero() {
  const reduced = useReducedMotion()

  // Phase 1 (0 → ~36% of the duration): the M badge fades/scales in at an
  // offset position (it hasn't moved to its final spot yet) — "settles".
  // Phase 2 (~36% → 100%): the badge moves the rest of the way up to its
  // final position while the wordmark simultaneously fades + slides in.
  // Both land together at the end. `y`/`x` percentages resolve against each
  // element's own box (matching CSS transform-percentage behavior), so the
  // travel distance scales with the responsive size automatically.
  const badgeAnim = reduced
    ? {}
    : {
        initial: { opacity: 0, scale: 0.85, y: '150%' },
        animate: { opacity: [0, 1, 1], scale: [0.85, 1, 1], y: ['150%', '150%', '0%'] },
        transition: { duration: 1.1, times: [0, 0.36, 1], ease: EASE },
      }

  const wordmarkAnim = reduced
    ? {}
    : {
        initial: { opacity: 0, x: '8%' },
        animate: { opacity: [0, 0, 1], x: ['8%', '8%', '0%'] },
        transition: { duration: 1.1, times: [0, 0.36, 1], ease: EASE },
      }

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        height: '100svh',
        backgroundColor: '#092b2d',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Texture — covers full section, overlay blend, same asset/treatment as AzzaHero */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          mixBlendMode: 'overlay',
          opacity: 0.2,
        }}
      >
        <Image src="/azza/bg-texture.png" alt="" fill style={{ objectFit: 'cover' }} priority />
      </div>

      {/* Group — sized by one responsive fontSize; badge position/size are
          all `em` off of it, so they scale together and stay balanced.
          Below 768px the badge's own `clamp(18px, ...)` floor inflates it
          past its strict em-ratio without a matching position adjustment,
          crowding it against the wordmark — the scoped override below ties
          the badge's `left` to that same clamped width (plus a flat safety
          gap) so the two can never overlap, without touching desktop (which
          never hits the 18px floor, so its offset stays exactly `-0.21em`,
          i.e. Figma's flush composition). */}
      <style>{`
        @media (max-width: 767px) {
          .mercado-hero-badge {
            left: calc(-1 * clamp(18px, 0.2092em, 60px) - 10px) !important;
          }
        }
      `}</style>
      <div
        style={{
          position: 'relative',
          display: 'inline-block',
          fontSize: 'clamp(56px, 10.42vw, 200px)',
        }}
      >
        <motion.div
          {...badgeAnim}
          className="mercado-hero-badge"
          style={{
            position: 'absolute',
            left: '-0.21em',
            top: '0.19em',
            width: 'clamp(18px, 0.2092em, 60px)',
            height: 'clamp(18px, 0.2092em, 60px)',
            borderRadius: '19%',
            backgroundColor: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            className={oswald.className}
            style={{ fontSize: '0.14em', letterSpacing: '-0.01em', color: '#092b2d', lineHeight: 1 }}
          >
            M
          </span>
        </motion.div>

        <motion.span
          {...wordmarkAnim}
          className={oswald.className}
          style={{
            display: 'block',
            fontSize: '1em',
            lineHeight: 1.15,
            letterSpacing: '-0.01em',
            color: '#ffffff',
          }}
        >
          Mercado
        </motion.span>
      </div>
    </section>
  )
}
