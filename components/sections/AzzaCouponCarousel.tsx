'use client'

import { useRef, useLayoutEffect, useEffect, useState } from 'react'

// Restored from the original AzzaStudy8 section (commit 63358b0, since
// removed when the case study moved to the Snow/Claude Design format): a
// phone frame with a seamless CSS marquee conveyor-belt of voucher/coupon
// cards traveling through it, plus static WhatsApp-style chat-bubble
// placeholders. The animation engine below — native coordinate space,
// marquee math, keyframes, phone bezel, chat bubbles, and the
// ResizeObserver-driven scale transform — is preserved as-is; only the
// outer wrapper has been re-skinned from a full-viewport (100svh) section
// into a bounded frame matching this case study's other framed media
// (width-driven instead of viewport-height-driven sizing).

// ── Figma native phone coordinate space (node 99:29170) ──────────────────────
const PW = 485 // phone width  (Figma: 485.332)
const PH = 992 // phone height (Figma: 991.977)

// ── Voucher carousel ─────────────────────────────────────────────────────────
const VH = 179 // display height per voucher (Figma: 178.809)
const VGAP = 24 // gap between adjacent vouchers
const SPEED = 121.875 // native px per second
// How far the track extends beyond each edge of the phone in native coords.
// Ensures vouchers are fully visible outside the device before entering / after exiting.
const EXTEND = 1200

// Display width = (intrinsic_w / intrinsic_h) × VH, rounded to nearest px
const VOUCHERS = [
  { src: '/images/azza/Voucher%201.png', dw: 403 }, // 1637×727
  { src: '/images/azza/Voucher%202.png', dw: 403 }, // 1613×716
  { src: '/images/azza/Voucher%203.png', dw: 404 }, // 1606×712
  { src: '/images/azza/Voucher%204.png', dw: 404 }, // 1560×692
  { src: '/images/azza/Voucher%205.png', dw: 366 }, // 1560×764
]

// One-set distance = Σwidths + n×gap (the nth gap bridges V5[set1] → V1[set2])
const SET_W = VOUCHERS.reduce((s, v) => s + v.dw, 0) + VOUCHERS.length * VGAP
const DURATION = SET_W / SPEED

// ── Chat bubble placeholders (Figma native coords) ───────────────────────────
const BUBBLES = [
  { l: 45.66, t: 192.44, w: 130, h: 48 },
  { l: 45.66, t: 251.44, w: 170, h: 48 },
  { l: 45.66, t: 310.44, w: 242, h: 48 },
  { l: 315.66, t: 620.44, w: 130, h: 48 },
  { l: 203.66, t: 679.44, w: 242, h: 48 },
  { l: 111.66, t: 738.44, w: 334, h: 161 },
]

// The strip's left edge is at −EXTEND in phone coords, so the track's translate
// must account for that offset.  V1 starts just outside the phone's right edge:
//   V1 phone coord = PW  →  strip coord = PW + EXTEND  →  T_start = PW + EXTEND
// Loop point: at T_end = T_start − SET_W, V1[set2] occupies the same strip coord
// as V1[set1] at T_start, making the infinite repeat seamless.
const KEYFRAMES = `
@keyframes azza8-marquee {
  from { transform: translate3d(${PW + EXTEND}px, 0, 0); }
  to   { transform: translate3d(${PW + EXTEND - SET_W}px, 0, 0); }
}
`

export function AzzaCouponCarousel() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  // Starts false (matching SSR, where matchMedia doesn't exist) and is only
  // ever corrected post-mount, deferred via setTimeout so the setState
  // happens inside a callback rather than synchronously in the effect body
  // (react-hooks/set-state-in-effect) — same pattern Preloader.tsx uses.
  const [reducedMotion, setReducedMotion] = useState(false)

  useLayoutEffect(() => {
    const update = () => {
      if (wrapRef.current) setScale(wrapRef.current.offsetHeight / PH)
    }
    update()
    const ro = new ResizeObserver(update)
    if (wrapRef.current) ro.observe(wrapRef.current)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const t = window.setTimeout(() => {
      setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    }, 0)
    return () => window.clearTimeout(t)
  }, [])

  return (
    <div
      ref={wrapRef}
      style={{ position: 'relative', width: '100%', maxWidth: 240, aspectRatio: `${PW} / ${PH}`, overflow: 'hidden' }}
    >
      <style>{KEYFRAMES}</style>

      {/* Native-size content at PW×PH, scaled from top-left */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: PW,
          height: PH,
          transformOrigin: 'top left',
          transform: `scale(${scale})`,
        }}
      >
        {/*
          ── Layer 1: Voucher carousel track (z-index 1) ─────────────────────
          Vertically centred at the Figma strip position.
          Extends EXTEND px left and right of the phone so vouchers remain
          fully visible as they approach and after they exit the device.
          The wrapper's overflow:hidden clips the far ends at its edges.
        */}
        <div
          style={{
            position: 'absolute',
            top: 'calc(50% - 6.1px)',
            left: -EXTEND,
            width: PW + 2 * EXTEND,
            height: VH,
            transform: 'translateY(-50%)',
            zIndex: 1,
          }}
        >
          {/* Two copies of the voucher sequence for a seamless infinite loop */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: VGAP,
              animation: `azza8-marquee ${DURATION}s linear infinite`,
              // Reduced motion pauses the marquee on whatever frame it's on
              // rather than swapping in a different layout — the vouchers
              // stay fully visible, just static.
              animationPlayState: reducedMotion ? 'paused' : 'running',
            }}
          >
            {[...VOUCHERS, ...VOUCHERS].map((v, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={i} src={v.src} alt="" width={v.dw} height={VH} style={{ display: 'block', flexShrink: 0 }} />
            ))}
          </div>
        </div>

        {/*
          ── Layer 2: Phone frame (z-index 2) ────────────────────────────────
          Transparent background so the carousel track shows through the screen.
          White border + border-radius form the visible bezel that sits on top
          of the carousel, creating the "conveyor belt through the phone" effect.
          overflow:hidden clips the chat bubbles at the rounded corners; the
          carousel is a sibling, so it is not affected by this clip.
        */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'transparent',
            border: '1.131px solid white',
            borderRadius: 91.595,
            overflow: 'hidden',
            boxSizing: 'border-box',
            zIndex: 2,
          }}
        >
          {/* WhatsApp-style chat-bubble placeholders — static */}
          {BUBBLES.map((b, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: b.l,
                top: b.t,
                width: b.w,
                height: b.h,
                backgroundColor: '#373737',
                borderRadius: 11,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
