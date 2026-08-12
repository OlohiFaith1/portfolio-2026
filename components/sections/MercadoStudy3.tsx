'use client'

// Figma: "Mercado 6" — a left-aligned text block ("Solving the problem...")
// above a full-width rounded black frame (1800×1031 at the 1920 reference,
// 60px side gutters). The frame's own static mockup is replaced here with a
// looping, cursor-driven walkthrough of the four onboarding screens — the
// frame's size/position/background is otherwise reproduced exactly (tablet
// and desktop keep Figma's 1800/1031 landscape ratio verbatim; mobile uses
// a taller ratio so the portrait mockup stays legible — see BlackFrame).

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

type Screen = {
  src: string
  alt: string
  // Percentages within the onboarding screenshot's own box — resolution-
  // independent, so the cursor tracks the button correctly at any render
  // size instead of needing per-breakpoint pixel coordinates.
  target: { x: number; y: number } | null
}

const SCREENS: Screen[] = [
  {
    src: '/images/mercado/mercado-onboarding-1.png',
    alt: 'Mercado onboarding welcome screen, with a "Create an account" button',
    target: { x: 50, y: 73.5 },
  },
  {
    src: '/images/mercado/mercado-onboarding-2.png',
    alt: 'Mercado account creation form with email and password fields and a "Continue" button',
    target: { x: 50, y: 63.5 },
  },
  {
    src: '/images/mercado/mercado-onboarding-3.png',
    alt: 'Mercado verification screen with four one-time-passcode input boxes',
    target: { x: 20, y: 43.5 },
  },
  {
    src: '/images/mercado/mercado-onboarding-4.png',
    alt: 'Mercado account verified confirmation screen with a "Go to Home" button',
    target: null,
  },
]

// Where the cursor first appears each loop, before its first approach —
// offset from the screen-1 target so that first move is clearly visible.
const CURSOR_START = { x: 72, y: 55 }

const MOVE_MS = 1400
const PAUSE_BEFORE_CLICK_MS = 500
const CLICK_MS = 260
const PAUSE_AFTER_CLICK_MS = 320
const TRANSITION_MS = 500
const FINAL_DWELL_MS = 2200
const REDUCED_MOTION_DWELL_MS = 2600

function wait(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms))
}

function Cursor({ pos, visible, clicking }: { pos: { x: number; y: number }; visible: boolean; clicking: boolean }) {
  return (
    <motion.div
      aria-hidden="true"
      animate={{ left: `${pos.x}%`, top: `${pos.y}%`, opacity: visible ? 1 : 0 }}
      transition={{
        left: { duration: MOVE_MS / 1000, ease: 'easeInOut' },
        top: { duration: MOVE_MS / 1000, ease: 'easeInOut' },
        opacity: { duration: 0.3 },
      }}
      style={{ position: 'absolute', width: '8%', aspectRatio: '1 / 1', pointerEvents: 'none' }}
    >
      <motion.div
        animate={{ scale: clicking ? 0.82 : 1 }}
        transition={{ duration: CLICK_MS / 2000, ease: 'easeInOut' }}
        style={{ width: '100%', height: '100%' }}
      >
        <svg viewBox="0 0 24 24" width="100%" height="100%" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.5))' }}>
          <path
            d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"
            fill="white"
            stroke="#1e1e1e"
            strokeWidth="1.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>

      <AnimatePresence>
        {clicking && (
          <motion.div
            initial={{ scale: 0.3, opacity: 0.6 }}
            animate={{ scale: 1.8, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: CLICK_MS / 1000, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              border: '1.5px solid white',
              pointerEvents: 'none',
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function OnboardingPrototype() {
  const prefersReducedMotion = useReducedMotion()
  const [screenIndex, setScreenIndex] = useState(0)
  const [cursorPos, setCursorPos] = useState(CURSOR_START)
  const [cursorVisible, setCursorVisible] = useState(false)
  const [clicking, setClicking] = useState(false)

  // Two independent loops, chosen once per mount via prefersReducedMotion:
  // the full choreography (cursor moves → pause → click → transition), or
  // a plain auto-advancing slideshow with no cursor and instant cuts.
  useEffect(() => {
    let cancelled = false

    async function reducedMotionLoop() {
      let i = 0
      while (!cancelled) {
        setScreenIndex(i)
        await wait(REDUCED_MOTION_DWELL_MS)
        if (cancelled) return
        i = (i + 1) % SCREENS.length
      }
    }

    async function fullLoop() {
      while (!cancelled) {
        setScreenIndex(0)
        setCursorPos(CURSOR_START)
        setCursorVisible(true)
        await wait(TRANSITION_MS)

        for (let i = 0; i < SCREENS.length; i++) {
          if (cancelled) return
          const target = SCREENS[i].target
          if (!target) {
            setCursorVisible(false)
            await wait(FINAL_DWELL_MS)
            break
          }
          setCursorPos(target)
          await wait(MOVE_MS)
          if (cancelled) return
          await wait(PAUSE_BEFORE_CLICK_MS)
          if (cancelled) return
          setClicking(true)
          await wait(CLICK_MS)
          if (cancelled) return
          setClicking(false)
          await wait(PAUSE_AFTER_CLICK_MS)
          if (cancelled) return
          setScreenIndex(i + 1)
          await wait(TRANSITION_MS)
        }
      }
    }

    if (prefersReducedMotion) {
      reducedMotionLoop()
    } else {
      fullLoop()
    }
    return () => {
      cancelled = true
    }
  }, [prefersReducedMotion])

  const screen = SCREENS[screenIndex]

  return (
    <div style={{ position: 'relative', height: '67.89%', aspectRatio: '979 / 2000', margin: '0 auto' }}>
      <AnimatePresence initial={!prefersReducedMotion}>
        <motion.div
          key={screenIndex}
          initial={prefersReducedMotion ? false : { opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -10 }}
          transition={{ duration: prefersReducedMotion ? 0 : TRANSITION_MS / 1000, ease: 'easeInOut' }}
          style={{ position: 'absolute', inset: 0 }}
        >
          <Image
            src={screen.src}
            alt={screen.alt}
            fill
            sizes="(min-width: 1024px) 20vw, 40vw"
            style={{ objectFit: 'contain' }}
          />
        </motion.div>
      </AnimatePresence>

      {!prefersReducedMotion && <Cursor pos={cursorPos} visible={cursorVisible} clicking={clicking} />}
    </div>
  )
}

function BlackFrame() {
  return (
    <div
      // Figma's 1800/1031 is landscape — fine on tablet/desktop, where the
      // frame is wide relative to the page, but at mobile widths a frame
      // that short leaves the portrait onboarding mockup only ~65-80px
      // wide (67.89% of a barely-there frame height). Below `md`, a taller
      // 3/4 ratio gives the portrait mockup real height to render at
      // (~40% of viewport width instead of ~18%) while every other
      // percentage-based measurement inside — the mockup's own 979/2000
      // ratio, the cursor's %-based position/size, the edge dots — follows
      // automatically without any changes of its own.
      className="aspect-[3/4] md:aspect-[1800/1031]"
      style={{
        position: 'relative',
        width: '100%',
        borderRadius: 16,
        overflow: 'hidden',
        background: 'linear-gradient(to bottom, #0a0a0a 60.096%, #000000 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Decorative edge dots — the frame's own bezel detail from Figma,
          untouched by the prototype swap. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/mercado/frame-edge-dots.svg"
        alt=""
        aria-hidden="true"
        style={{ position: 'absolute', left: '2.22%', top: '50%', transform: 'translateY(-50%)', height: '9.7%', width: 'auto' }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/mercado/frame-edge-dots.svg"
        alt=""
        aria-hidden="true"
        style={{ position: 'absolute', right: '2.22%', top: '50%', transform: 'translateY(-50%)', height: '9.7%', width: 'auto' }}
      />
      <OnboardingPrototype />
    </div>
  )
}

function TextBlock() {
  const paraStyle: React.CSSProperties = {
    fontSize: 18,
    lineHeight: '28px',
    letterSpacing: '-0.36px',
    color: '#5a5a5a',
    margin: 0,
    width: '100%',
    maxWidth: 400,
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'flex-start' }}>
      <span
        className="font-display"
        style={{ fontSize: 40, lineHeight: '48px', letterSpacing: '-0.8px', color: '#1e1e1e' }}
      >
        Solving the problem...
      </span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 40, width: '100%' }}>
        <p className="font-sans" style={paraStyle}>
          Merchants need quick access to their money and key actions without seeing crypto terms
          they don’t understand. The Mercado homepage reflects this.
        </p>
        <p className="font-sans" style={paraStyle}>
          For onboarding, merchants register using just their email address and password. Then,
          they verify their account using a 4-digit verification code sent to their email. After
          this, they can access the homepage.
        </p>
      </div>
    </div>
  )
}

export function MercadoStudy3() {
  return (
    <section
      className="relative bg-white"
      style={{
        backgroundImage: 'radial-gradient(circle, #d8d8d8 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        overflowX: 'hidden',
      }}
    >
      {/* Text — left-aligned at Figma's exact 73px/99px offset on desktop;
          reflows to a padded full-width block on tablet/mobile, matching
          AzzaStudy2/MercadoStudy2's stacking convention. */}
      <div className="hidden lg:block" style={{ paddingLeft: 73, paddingTop: 99, paddingBottom: 60 }}>
        <TextBlock />
      </div>
      <div className="hidden md:block lg:hidden" style={{ paddingLeft: 48, paddingRight: 48, paddingTop: 80, paddingBottom: 48 }}>
        <TextBlock />
      </div>
      <div className="md:hidden" style={{ paddingLeft: 24, paddingRight: 24, paddingTop: 64, paddingBottom: 40 }}>
        <TextBlock />
      </div>

      {/* Frame — a single shared instance: the prototype inside carries
          real timer state, so unlike the text block above it must not be
          tripled per breakpoint. Only its wrapper's gutters vary by size,
          via responsive classes rather than separate JSX blocks. */}
      <div className="px-4 md:px-6 lg:px-[60px] pb-12 md:pb-16">
        <BlackFrame />
      </div>
    </section>
  )
}
