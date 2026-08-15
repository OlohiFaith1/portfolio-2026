'use client'

// Figma: "SyncWatch 4" (389:43178) — a right-aligned two-paragraph text
// block (159px/335px, matching MercadoStudy4/5/6's established column)
// above a full-width, edge-to-edge light-pink band (#fff8fb) containing a
// centred phone mockup (323.46×700 native, 40px corner radius). 120px
// rhythm above/below the band, matching every other section's vertical
// spacing convention.
//
// The five exported screens (Figma node "Snycwatch 4 Image(1)" and its
// siblings, each already a complete flattened screenshot — status bar,
// content, bottom nav all baked in) are used directly rather than
// recreating the UI from markup, matching this whole case study's
// established "flattened export" convention.
//
// No circular "tap" indicator exists as a static asset in Figma (it's a
// prototype-only interaction cue, invisible in a static design frame) —
// its look (a soft outer ring + solid inner dot, white against these
// screens' dark UI) is this component's own minimal addition, built to
// match the *behaviour* the brief describes precisely (move → pause →
// click → instant cut) rather than a specific Figma layer.
//
// Architecture: the whole 1920×998 band is built at native Figma pixels
// and scaled as one unit via the same width-driven ResizeObserver +
// transform: scale technique MercadoStudy5/6 already use — the phone
// mockup and the indicator both live inside that one native coordinate
// space, so they scale and reposition together at any viewport width.
// The indicator's target points are stored as fractions (0–1) of the
// phone's own box (not the viewport), positioned via a wrapper that's
// itself a child of the phone container — so "correctly positioned
// relative to the mockup, not the viewport" falls out of the structure
// rather than needing separate breakpoint math.
//
// Screen swaps are a plain conditional render with no wrapping motion
// component — instant, per the brief's explicit "no fade/slide/spring"
// requirement. Only the indicator (position + click pulse) animates.
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'

const NATIVE_W = 1920
const NATIVE_H = 998
const PHONE_W = 323.46
const PHONE_H = 700
const PHONE_LEFT = (NATIVE_W - PHONE_W) / 2
const PHONE_TOP = (NATIVE_H - PHONE_H) / 2
const PHONE_RADIUS = 40

type ScreenId = 1 | 2 | 3 | 4 | 5

const SCREENS: Record<ScreenId, { src: string; alt: string }> = {
  1: {
    src: '/images/syncwatch/Snycwatch 4 Image(1).png',
    alt: 'SyncWatch home screen with a grid of movies to search from',
  },
  2: {
    src: '/images/syncwatch/Syncwatch 4 Image(2).png',
    alt: 'SyncWatch modal offering to create a watch party for "The Unforgivable"',
  },
  3: {
    src: '/images/syncwatch/Syncwatch 4 Image(3).png',
    alt: 'SyncWatch form to name a new watch party, not yet filled in',
  },
  4: {
    src: '/images/syncwatch/Syncwatch 4 Image(4).png',
    alt: 'SyncWatch form to name a new watch party, filled in as "Three Musketeers"',
  },
  5: {
    src: '/images/syncwatch/Syncwatch 4 Image(5).png',
    alt: 'SyncWatch confirmation screen showing the created watch party and its invite code',
  },
}

// Fractions (0–1) of the phone mockup's own box, read directly off the
// exported screens.
const TARGETS: Record<1 | 2 | 3 | 4, { x: number; y: number }> = {
  1: { x: 0.262, y: 0.333 }, // "The Unforgivable" tile
  2: { x: 0.5, y: 0.943 }, // "Create watch party" button
  3: { x: 0.5, y: 0.709 }, // "Enter a name" input
  4: { x: 0.5, y: 0.943 }, // "Generate invite" button
}

const PAUSE_AFTER_APPEAR_MS = 450
const MOVE_MS = 380
const PAUSE_AT_TARGET_MS = 280
const CLICK_MS = 180
const HOLD_FINAL_MS = 1300
const EASE = [0.25, 0, 0.1, 1] as const

interface Step {
  screen: ScreenId
  indicator: { x: number; y: number } | null
  clicking: boolean
  duration: number
}

// Screen appears (indicator still at its previous spot, or hidden) → pause
// → indicator moves to this screen's target → pause → click → (next step
// cuts instantly to the next screen). Screen 5 has no target: it just
// holds, indicator hidden, before looping back to screen 1.
const STEPS: Step[] = (() => {
  const steps: Step[] = []
  let prevTarget: { x: number; y: number } | null = null
  ;([1, 2, 3, 4] as const).forEach((screen) => {
    const target = TARGETS[screen]
    steps.push({ screen, indicator: prevTarget, clicking: false, duration: PAUSE_AFTER_APPEAR_MS })
    steps.push({ screen, indicator: target, clicking: false, duration: MOVE_MS })
    steps.push({ screen, indicator: target, clicking: false, duration: PAUSE_AT_TARGET_MS })
    steps.push({ screen, indicator: target, clicking: true, duration: CLICK_MS })
    prevTarget = target
  })
  steps.push({ screen: 5, indicator: null, clicking: false, duration: HOLD_FINAL_MS })
  return steps
})()

const STATIC_STEP: Step = { screen: 1, indicator: null, clicking: false, duration: 0 }

function TapIndicator({ target, clicking }: { target: { x: number; y: number } | null; clicking: boolean }) {
  return (
    <motion.div
      style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}
      initial={false}
      animate={{
        left: `${(target?.x ?? 0.5) * 100}%`,
        top: `${(target?.y ?? 0.5) * 100}%`,
        opacity: target ? 1 : 0,
      }}
      transition={{
        left: { duration: MOVE_MS / 1000, ease: EASE },
        top: { duration: MOVE_MS / 1000, ease: EASE },
        opacity: { duration: 0.2, ease: EASE },
      }}
    >
      <motion.div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: 44,
          height: 44,
          marginLeft: -22,
          marginTop: -22,
          borderRadius: '50%',
          border: '2px solid rgba(255,255,255,0.85)',
          boxShadow: '0 2px 10px rgba(0,0,0,0.25)',
        }}
        animate={{ scale: clicking ? 1.3 : 1, opacity: clicking ? 0.3 : 0.85 }}
        transition={{ duration: CLICK_MS / 1000, ease: EASE }}
      />
      <motion.div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: 16,
          height: 16,
          marginLeft: -8,
          marginTop: -8,
          borderRadius: '50%',
          backgroundColor: '#ffffff',
          boxShadow: '0 1px 4px rgba(0,0,0,0.35)',
        }}
        animate={{ scale: clicking ? 0.65 : 1 }}
        transition={{ duration: CLICK_MS / 1000, ease: EASE }}
      />
    </motion.div>
  )
}

function PhoneMockup({ step }: { step: Step }) {
  const screen = SCREENS[step.screen]
  return (
    <div
      style={{
        position: 'absolute',
        left: PHONE_LEFT,
        top: PHONE_TOP,
        width: PHONE_W,
        height: PHONE_H,
        borderRadius: PHONE_RADIUS,
        overflow: 'hidden',
        backgroundColor: '#0a0a0a',
      }}
    >
      {/* Instant swap — no transition wrapper, matches the prototype's own
          "instant" screen-change setting exactly. */}
      <Image src={screen.src} alt={screen.alt} fill sizes="324px" style={{ objectFit: 'cover' }} />
      <TapIndicator target={step.indicator} clicking={step.clicking} />
    </div>
  )
}

// Mirrors MercadoStudy5/6's ScaledComposition: fixed-pixel native
// composition, scaled as a single unit to fit the band's rendered width.
function ScaledPrototype({ step }: { step: Step }) {
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
    <div ref={wrapRef} style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: NATIVE_W, height: NATIVE_H, transform: `scale(${scale})`, transformOrigin: 'top left' }}>
        <PhoneMockup step={step} />
      </div>
    </div>
  )
}

function TextBlock() {
  const paraStyle: React.CSSProperties = { fontSize: 16, lineHeight: 1.5, letterSpacing: '-0.16px', color: '#262626', margin: 0 }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40, width: 335, maxWidth: '100%' }}>
      <p className="font-sans" style={paraStyle}>
        Create a watch party, choose what to watch, and share the invite with your friends.
      </p>
      <p className="font-sans" style={paraStyle}>
        Once everyone is in, SyncWatch keeps playback synchronized across every device.
      </p>
    </div>
  )
}

export function SyncWatchStudy4() {
  const prefersReducedMotion = useReducedMotion() ?? false
  const sectionRef = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)
  const [stepIndex, setStepIndex] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.3 })
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (prefersReducedMotion || !inView) return
    const step = STEPS[stepIndex]
    const id = setTimeout(() => setStepIndex((i) => (i + 1) % STEPS.length), step.duration)
    return () => clearTimeout(id)
  }, [stepIndex, inView, prefersReducedMotion])

  const step = prefersReducedMotion ? STATIC_STEP : STEPS[stepIndex]

  return (
    <section
      ref={sectionRef}
      className="relative bg-white"
      style={{ backgroundImage: 'radial-gradient(circle, #d8d8d8 1px, transparent 1px)', backgroundSize: '28px 28px', overflowX: 'hidden' }}
    >
      {/* Text — right-aligned at Figma's exact 159px/335px values on
          desktop; reflows to a padded full-width block on tablet/mobile,
          matching every other Mercado/SyncWatch section. */}
      <div className="hidden lg:flex" style={{ justifyContent: 'flex-end', paddingTop: 170, paddingRight: 159 }}>
        <TextBlock />
      </div>
      <div className="hidden md:block lg:hidden" style={{ paddingLeft: 48, paddingRight: 48, paddingTop: 80 }}>
        <TextBlock />
      </div>
      <div className="md:hidden" style={{ paddingLeft: 24, paddingRight: 24, paddingTop: 64 }}>
        <TextBlock />
      </div>

      {/* Pink prototype band — full-bleed, no Figma mobile frame to follow,
          so it stays full-width and fluid (aspect-ratio locked) at every
          breakpoint, matching this case study's other full-bleed bands. */}
      <div
        className="relative w-full overflow-hidden"
        style={{ backgroundColor: '#fff8fb', aspectRatio: `${NATIVE_W} / ${NATIVE_H}`, marginTop: 120 }}
      >
        <ScaledPrototype step={step} />
      </div>
    </section>
  )
}
