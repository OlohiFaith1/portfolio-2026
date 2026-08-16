'use client'

// Figma: "Mercado 9" (node 287:27024) — a right-aligned "Cashier
// Management" text block above a rounded, textured dark-teal band
// (#092b2d, texture overlay reused verbatim from MercadoHero/AzzaHero:
// /azza/bg-texture.png, mix-blend-overlay, opacity 0.2) containing four
// "iPhone 15 Pro Front" screens, then a closing paragraph in the same
// right-hand column below — mirrors MercadoStudy4's text/band/text rhythm
// exactly (120px vertical rhythm on desktop, 335px-wide column right-
// aligned 159px from the edge).
//
// Figma's own static frame only shows the STACKED resting pose. The
// spread/final layout comes from a second reference (node 381:27996,
// "Frame 2147226356") added specifically for this purpose: a single
// centred row of all four screens at one shared size (366.9433×750) with
// a 32px gap. Both references share the exact same 1820×1088 band, so
// their pixel values drop straight into one native coordinate space with
// no conversion.
//
// STACK values are read directly off "Mercado 9"'s own iPhone frames
// (x/y/w/h only — Figma's static stack has no rotation; the few degrees
// of tilt per card are this component's own embellishment, invited by the
// brief as an optional physical-stack cue).
//
// Responsive: the same width-driven ResizeObserver + transform: scale
// technique as MercadoStudy5's ScaledComposition — the whole 1820×1088
// band, and every card's native-pixel position/size inside it, scales as
// one rigid unit to fit any viewport width, so the composition (and the
// stack→spread animation itself) is pixel-identical at every breakpoint,
// just smaller. Only the band's outer side padding and vertical rhythm
// change per breakpoint (Figma's own 60/40 desktop margins vs the
// tablet/mobile padding convention already used across the other Mercado
// sections) — the band itself renders once, not once per breakpoint, so
// there is only ever one IntersectionObserver/animation instance for it.
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'

type PhoneId = 'accounts' | 'addEmail' | 'addCode' | 'deactivateConfirm'

const PHONES: Record<PhoneId, { src: string; alt: string; naturalW: number; naturalH: number }> = {
  accounts: {
    src: '/images/mercado/iPhone 15 Pro Front 1.png',
    alt: 'Mercado "Cashier Accounts" screen listing cashiers with activate/deactivate controls',
    naturalW: 1468,
    naturalH: 3000,
  },
  addEmail: {
    src: '/images/mercado/iPhone 15 Pro Front 2.png',
    alt: 'Mercado "Add a New Cashier" screen with an email address input',
    naturalW: 1449,
    naturalH: 2960,
  },
  addCode: {
    src: '/images/mercado/iPhone 15 Pro Front 3.png',
    alt: 'Mercado "Add a New Cashier" screen showing a generated authorization code',
    naturalW: 1429,
    naturalH: 2920,
  },
  deactivateConfirm: {
    src: '/images/mercado/iPhone 15 Pro Front 4.png',
    alt: 'Mercado confirmation modal asking whether to deactivate a cashier account',
    naturalW: 1410,
    naturalH: 2880,
  },
}

// Order matches Figma's own z-order (front-to-back in the stack) and the
// spread row's left-to-right order — both agree, so one array drives both.
const ORDER: PhoneId[] = ['accounts', 'addEmail', 'addCode', 'deactivateConfirm']

// Native band (Figma "Frame 1707480183" / "Frame 2147226356").
const NATIVE_W = 1820
const NATIVE_H = 1088

type CardPose = { x: number; y: number; w: number; h: number; rotate: number; z: number }

// Figma "Mercado 9" — each card's own frame, read directly (no rotation in
// the source; tilt is this component's own addition, see file header).
const STACK: Record<PhoneId, CardPose> = {
  accounts: { x: 693, y: 156, w: 366.9433, h: 750, rotate: -3, z: 4 },
  addEmail: { x: 722, y: 173, w: 362.0508, h: 740, rotate: 2, z: 3 },
  addCode: { x: 748.4453, y: 191, w: 357.1582, h: 730, rotate: -1.5, z: 2 },
  deactivateConfirm: { x: 773.8906, y: 212, w: 352.2656, h: 720, rotate: 1, z: 1 },
}

// Figma node 381:27996 — one centred row, 32px gap, one shared size (the
// fourth card sits ~1.4% narrower there, which reads as export noise
// rather than a deliberate size, so all four share the first three cards'
// exact 366.9433×750 per the brief's explicit "all four exactly the same
// width/height" requirement).
const SPREAD_CARD_W = 366.9433
const SPREAD_CARD_H = 750
const SPREAD_GAP = 32
const SPREAD_LEFT = 131
const SPREAD_TOP = 169

const SPREAD: Record<PhoneId, CardPose> = {
  accounts: { x: SPREAD_LEFT, y: SPREAD_TOP, w: SPREAD_CARD_W, h: SPREAD_CARD_H, rotate: 0, z: 1 },
  addEmail: { x: SPREAD_LEFT + (SPREAD_CARD_W + SPREAD_GAP), y: SPREAD_TOP, w: SPREAD_CARD_W, h: SPREAD_CARD_H, rotate: 0, z: 1 },
  addCode: { x: SPREAD_LEFT + 2 * (SPREAD_CARD_W + SPREAD_GAP), y: SPREAD_TOP, w: SPREAD_CARD_W, h: SPREAD_CARD_H, rotate: 0, z: 1 },
  deactivateConfirm: { x: SPREAD_LEFT + 3 * (SPREAD_CARD_W + SPREAD_GAP), y: SPREAD_TOP, w: SPREAD_CARD_W, h: SPREAD_CARD_H, rotate: 0, z: 1 },
}

const TACTILE_EASE = [0.16, 1, 0.3, 1] as const
const SPREAD_DURATION = 0.9
const SPREAD_STAGGER_MS = 70
const HOLD_MS = 350

function PhoneCard({
  id,
  index,
  spread,
  prefersReducedMotion,
}: {
  id: PhoneId
  index: number
  spread: boolean
  prefersReducedMotion: boolean
}) {
  const phone = PHONES[id]
  const pose = spread ? SPREAD[id] : STACK[id]
  const delay = spread ? (index * SPREAD_STAGGER_MS) / 1000 : 0

  return (
    <motion.div
      style={{ position: 'absolute', left: 0, top: 0, zIndex: STACK[id].z }}
      initial={false}
      animate={{ x: pose.x, y: pose.y, width: pose.w, height: pose.h, rotate: pose.rotate }}
      transition={prefersReducedMotion ? { duration: 0 } : { duration: SPREAD_DURATION, delay, ease: TACTILE_EASE }}
    >
      {/* objectFit: contain, not cover — these PNGs are transparent device
          silhouettes (phone + baked-in shadow), not rectangular
          screenshots, so cropping would clip the shadow/bezel edges. */}
      <Image
        src={phone.src}
        alt={phone.alt}
        width={phone.naturalW}
        height={phone.naturalH}
        sizes="20vw"
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
      />
    </motion.div>
  )
}

// Mirrors MercadoStudy5's ScaledComposition: the fixed-pixel native
// composition, scaled as a single unit to fit the band's actual rendered
// width at any breakpoint.
function ScaledPhoneStack({ spread, prefersReducedMotion }: { spread: boolean; prefersReducedMotion: boolean }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useLayoutEffect(() => {
    const update = () => {
      if (wrapRef.current) setScale(wrapRef.current.offsetWidth / NATIVE_W)
    }
    update()
    const ro = new ResizeObserver(update)
    if (wrapRef.current) ro.observe(wrapRef.current)
    return () => ro.disconnect()
  }, [])

  return (
    <div ref={wrapRef} style={{ position: 'relative', width: '100%', height: NATIVE_H * scale }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: NATIVE_W, height: NATIVE_H, transform: `scale(${scale})`, transformOrigin: 'top left' }}>
        {ORDER.map((id, index) => (
          <PhoneCard key={id} id={id} index={index} spread={spread} prefersReducedMotion={prefersReducedMotion} />
        ))}
      </div>
    </div>
  )
}

function Band({ spread, prefersReducedMotion }: { spread: boolean; prefersReducedMotion: boolean }) {
  return (
    <div className="relative w-full overflow-hidden" style={{ aspectRatio: `${NATIVE_W} / ${NATIVE_H}`, backgroundColor: '#092b2d', borderRadius: 16 }}>
      {/* Texture — same asset/treatment as MercadoHero/AzzaHero. */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, mixBlendMode: 'overlay', opacity: 0.2 }}>
        <Image src="/azza/bg-texture.png" alt="" fill style={{ objectFit: 'cover' }} />
      </div>
      <ScaledPhoneStack spread={spread} prefersReducedMotion={prefersReducedMotion} />
    </div>
  )
}

function TextBlock({ maxWidth }: { maxWidth?: number }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth }}>
      <span className="font-display" style={{ fontSize: 24, lineHeight: 1.1, color: '#1e1e1e' }}>
        Cashier Management
      </span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
        <p className="font-sans" style={{ fontSize: 18, lineHeight: '28px', letterSpacing: '-0.36px', color: '#404040', margin: 0 }}>
          Many merchants operate across multiple branches or locations and need cashiers to receive payments on their behalf.
        </p>
        <p className="font-sans" style={{ fontSize: 18, lineHeight: '28px', letterSpacing: '-0.36px', color: '#404040', margin: 0 }}>
          Mercado provides an easy way for merchants to manage cashier accounts across different branches, being able to add new cashiers and deactivate/delete cashier accounts.
        </p>
      </div>
    </div>
  )
}

function ClosingText({ maxWidth }: { maxWidth?: number }) {
  return (
    <p className="font-sans" style={{ fontSize: 18, lineHeight: '28px', letterSpacing: '-0.36px', color: '#404040', margin: 0, maxWidth }}>
      Mercado proves that the power of crypto doesn’t have to come with complexity. I designed the experience around how real merchants work, making stablecoin payments easy and clear to use.
    </p>
  )
}

export function MercadoStudy6() {
  const prefersReducedMotion = useReducedMotion() ?? false
  const bandWrapRef = useRef<HTMLDivElement>(null)
  const hasTriggeredRef = useRef(false)
  const [triggered, setTriggered] = useState(false)
  // Reduced motion: skip the transition entirely, show the final spread
  // immediately — derived directly from the media query rather than
  // synced via an effect, so there's no visible stacked frame.
  const spread = triggered || prefersReducedMotion

  // Normal motion: stack holds until the band itself (not the section,
  // which also includes the intro/closing text) scrolls into view, then
  // (after a brief pause to let it register as a stack) spreads once.
  // Watching the band specifically — rather than the whole (much taller)
  // section — stops the reveal from firing while the user is still
  // reading the intro text above it.
  useEffect(() => {
    if (prefersReducedMotion) return
    const band = bandWrapRef.current
    if (!band) return

    let holdTimer: ReturnType<typeof setTimeout> | null = null
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggeredRef.current) {
          hasTriggeredRef.current = true
          holdTimer = setTimeout(() => setTriggered(true), HOLD_MS)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(band)
    return () => {
      observer.disconnect()
      if (holdTimer) clearTimeout(holdTimer)
    }
  }, [prefersReducedMotion])

  return (
    <section
      className="relative bg-white"
      style={{ backgroundImage: 'radial-gradient(circle, #d8d8d8 1px, transparent 1px)', backgroundSize: '28px 28px', overflowX: 'hidden' }}
    >
      {/* Text — right inset (24px) and width (333px) match the shared
          8-column grid's own margin and 2-column span
          (components/layout/Grid.tsx) — was paddingRight:159/width:335, an
          arbitrary offset from the 1920px Figma frame; reflows to a padded
          full-width block on tablet/mobile, matching every other Mercado
          section. */}
      <div className="hidden lg:flex" style={{ justifyContent: 'flex-end', paddingTop: 120, paddingRight: 24 }}>
        <div style={{ width: 333 }}>
          <TextBlock />
        </div>
      </div>
      <div className="hidden md:block lg:hidden" style={{ paddingLeft: 48, paddingRight: 48, paddingTop: 80 }}>
        <TextBlock maxWidth={400} />
      </div>
      <div className="md:hidden" style={{ paddingLeft: 24, paddingRight: 24, paddingTop: 64 }}>
        <TextBlock />
      </div>

      {/* Band — a single instance at every breakpoint; only its side
          padding and vertical rhythm change (Figma's 60px/40px desktop
          margins, and MercadoStudy4's tablet/mobile gap convention).
          NOT grid-aligned intentionally: unlike this section's text
          columns, Figma specifies asymmetric left/right margins here
          (60/40, not 60/60) — flagged during the grid retrofit and left
          as-is rather than forced to a symmetric 24px/24px, since
          snapping it would erase a deliberate compositional choice, not
          just correct an arbitrary offset. */}
      <div ref={bandWrapRef} className="px-6 md:px-12 lg:pl-[60px] lg:pr-[40px] mt-10 md:mt-12 lg:mt-[120px] mb-10 md:mb-12 lg:mb-[120px]">
        <Band spread={spread} prefersReducedMotion={prefersReducedMotion} />
      </div>

      {/* Closing text — same right-aligned, grid-matched column as the
          intro. */}
      <div className="hidden lg:flex" style={{ justifyContent: 'flex-end', paddingRight: 24, paddingBottom: 120 }}>
        <div style={{ width: 333 }}>
          <ClosingText />
        </div>
      </div>
      <div className="hidden md:block lg:hidden" style={{ paddingLeft: 48, paddingRight: 48, paddingBottom: 64 }}>
        <ClosingText maxWidth={400} />
      </div>
      <div className="md:hidden" style={{ paddingLeft: 24, paddingRight: 24, paddingBottom: 48 }}>
        <ClosingText />
      </div>
    </section>
  )
}
