'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

// Purely decorative visual, rendered by Preloader.tsx as a direct child of
// its own green panel (not a separate layer/transition) — see the comment
// there for how the two are composed. This component owns nothing about
// loading/timing: it just cycles a few project covers on a fixed interval
// for as long as it's mounted, which is exactly as long as Preloader's own
// panel is — mounting and unmounting together by construction.
// The four personal photos in public/images/retro tv images — each a very
// different aspect ratio (4:3 landscape, a tall 0.57:1 portrait, 3:4
// portrait, 4:3 landscape again). Real intrinsic dimensions are carried
// alongside each src so they can render at natural aspect ratio, sized to
// the screen's full width (height following proportionally) rather than
// object-fit's box-constrained scaling — the screen area's own
// `overflow: hidden` below crops any vertical excess for the two portrait
// photos, centered top/bottom, since matching the screen's full width on
// every image (not leaving pillarboxed gaps on the two narrower ones) is
// the priority here.
const SCREEN_IMAGES = [
  { src: '/images/retro%20tv%20images/Editor%20session.png', width: 4032, height: 3024 },
  { src: '/images/retro%20tv%20images/Halftone%20Banknotes.png', width: 3063, height: 5424 },
  { src: '/images/retro%20tv%20images/High-Flash%20Halftone%20Candle.png', width: 3527, height: 4703 },
  { src: '/images/retro%20tv%20images/Vintage%20Pink%20Halftone%20Product.png', width: 4703, height: 3527 },
] as const

const CYCLE_MS = 800
const CROSSFADE_MS = 500
// A minority of switches get a brief "channel change" static flash instead
// of a plain crossfade — not every transition, so it stays a texture and
// never becomes a per-frame glitch tic.
const FLICKER_CHANCE = 0.45
const FLICKER_MS = 70

// TV image is the Revery-generated "Vintage Red TV Studio Shot.png" (3698×
// 4529). The original had a solid white studio backdrop baked in, so this
// is a background-removed copy of that same photo — same framing, same
// pixel dimensions, same TV (nothing about the TV itself was touched, only
// the surrounding backdrop was made transparent) — kept as a separate file
// alongside the original rather than overwriting it. The screen glass sits
// inside it at this fixed box, measured directly on the source photo
// (percentages of the full TV image), so a screen-content layer positioned
// at these percentages always lines up with the physical screen regardless
// of how large the TV itself is rendered.
const TV_SRC = '/Vintage%20Red%20TV%20Studio%20Shot%20Transparent.png'
const TV_ASPECT = '3698 / 4529'
const SCREEN_BOX = { left: 17.11, top: 25.64, width: 44.23, height: 33.41 }
// Clip path is relative to SCREEN_BOX above (not the full TV image) and
// traces the screen glass's rounded corners — measured a little inside the
// photographed bezel edge on purpose, so cycling images stay safely inside
// the glass instead of risking a sliver spilling onto the bezel.
const SCREEN_CLIP =
  'polygon(3.46% 17.12%, 17.34% 2.93%, 85.33% 0%, 98.78% 12.9%, 100% 82.1%, 86.12% 96.29%, 13.45% 100%, 0% 87.13%)'

// Inline SVG feTurbulence noise, tiled as a background-image — a standard
// lightweight way to get authentic film-grain texture without shipping a
// separate noise asset.
const GRAIN_URL =
  "data:image/svg+xml," +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'>" +
      "<filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter>" +
      "<rect width='100%' height='100%' filter='url(#n)'/></svg>"
  )

export function PreloaderTV() {
  const [index, setIndex] = useState(0)
  const [flickerActive, setFlickerActive] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // Deferred so the setState happens inside a callback, not synchronously
    // in the effect body (react-hooks/set-state-in-effect) — same pattern
    // Preloader.tsx already uses for this exact check.
    const t = window.setTimeout(() => setReducedMotion(reduced), 0)
    return () => window.clearTimeout(t)
  }, [])

  useEffect(() => {
    if (reducedMotion) return
    let flickerTimeout: number | undefined
    const id = window.setInterval(() => {
      if (Math.random() < FLICKER_CHANCE) {
        setFlickerActive(true)
        flickerTimeout = window.setTimeout(() => setFlickerActive(false), FLICKER_MS)
      }
      setIndex((i) => (i + 1) % SCREEN_IMAGES.length)
    }, CYCLE_MS)
    return () => {
      window.clearInterval(id)
      if (flickerTimeout) window.clearTimeout(flickerTimeout)
    }
  }, [reducedMotion])

  return (
    <div
      style={{
        position: 'relative',
        // ~25% larger than the previous clamp(220px, 42vh, 420px) at every
        // tier, but capped by viewport width too (min() against vw) so a
        // narrow phone can never get a TV wider than it is tall enough to
        // hold without spilling past the screen edges.
        height: 'clamp(250px, min(52vh, 104vw), 540px)',
        aspectRatio: TV_ASPECT,
      }}
    >
      {/* Soft contact shadow — grounds the TV against the green panel
          instead of letting it look like it's floating. Sits behind the TV
          image itself, roughly under where the legs meet the floor. */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '16%',
          top: '86%',
          width: '68%',
          height: '11%',
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.30), rgba(0,0,0,0) 72%)',
          filter: 'blur(13px)',
        }}
      />

      <Image src={TV_SRC} alt="" fill sizes="540px" style={{ objectFit: 'contain' }} />

      <div
        style={{
          position: 'absolute',
          left: `${SCREEN_BOX.left}%`,
          top: `${SCREEN_BOX.top}%`,
          width: `${SCREEN_BOX.width}%`,
          height: `${SCREEN_BOX.height}%`,
          clipPath: SCREEN_CLIP,
          overflow: 'hidden',
          background: '#0c0c0c',
          // Extremely restrained chromatic fringing — a hair of red/cyan
          // right at the inner screen edges, the way an old CRT's convergence
          // drifts slightly at the picture boundary. Inset shadows still
          // paint within a clip-path'd box, so this stays inside the glass.
          boxShadow: 'inset 1.5px 0 0 rgba(255,40,60,0.07), inset -1.5px 0 0 rgba(40,220,255,0.07)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            transform: flickerActive ? 'translateX(1.5px)' : 'translateX(0)',
            transition: reducedMotion ? 'none' : 'transform 60ms ease-out',
          }}
        >
          {SCREEN_IMAGES.map(({ src, width, height }, i) => (
            <div
              key={src}
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: i === index ? 1 : 0,
                transition: reducedMotion ? 'none' : `opacity ${CROSSFADE_MS}ms ease`,
              }}
            >
              <Image
                src={src}
                alt=""
                width={width}
                height={height}
                sizes="220px"
                className={reducedMotion ? undefined : 'preloader-tv-brightness'}
                style={{
                  display: 'block',
                  width: '100%',
                  height: 'auto',
                  filter: reducedMotion ? 'contrast(1.05) saturate(0.85) brightness(0.94)' : undefined,
                }}
              />
            </div>
          ))}
        </div>

        {/* Channel-change flash — a very brief bright flicker on top of the
            image stack, timed to a minority of index switches above. */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#fff',
            opacity: flickerActive ? 0.3 : 0,
            transition: flickerActive ? 'opacity 15ms linear' : 'opacity 160ms ease-out',
            mixBlendMode: 'screen',
          }}
        />

        {/* Fine scanlines — slow vertical drift + gentle opacity pulse
            (both from the shared class below) for a quietly-alive screen. */}
        <div
          className={reducedMotion ? undefined : 'preloader-tv-flicker'}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'repeating-linear-gradient(to bottom, rgba(0,0,0,0.15) 0px, rgba(0,0,0,0.15) 1px, transparent 1px, transparent 2px)',
            mixBlendMode: 'multiply',
          }}
        />

        {/* Grain — briefly boosted during the channel-change flash to read
            as a flick of static, otherwise a near-subliminal texture. */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url("${GRAIN_URL}")`,
            opacity: flickerActive ? 0.22 : 0.05,
            transition: 'opacity 60ms linear',
            mixBlendMode: 'overlay',
          }}
        />

        {/* Glow + edge vignette — the vignette's inward darkening is what
            reads as "slightly curved glass" without actually warping the
            image underneath. */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse at 38% 30%, rgba(255,255,255,0.14), transparent 55%), radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.44) 100%)',
          }}
        />
      </div>

      {/* Ambient screen glow bleeding onto the bezel immediately around the
          glass — kept inside the TV's own box (never the green backdrop),
          per the brief. */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: `${SCREEN_BOX.left - 3}%`,
          top: `${SCREEN_BOX.top - 3}%`,
          width: `${SCREEN_BOX.width + 6}%`,
          height: `${SCREEN_BOX.height + 6}%`,
          background: 'radial-gradient(ellipse at center, rgba(255,250,240,0.16), transparent 70%)',
          filter: 'blur(18px)',
          mixBlendMode: 'screen',
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}
