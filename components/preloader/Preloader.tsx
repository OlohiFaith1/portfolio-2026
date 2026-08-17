'use client'

import { useEffect, useRef, useState } from 'react'

// The landing page's own dot grid at rest — same color, same final radius,
// same 28px tile, same top-left tiling origin (styles/globals.css body
// pattern / DraggableDotGrid.tsx). Never redesigned here; the animation
// only controls how large the dots start and how much of the field is
// revealed, both of which converge on these exact values by the end.
const DOT_COLOR = '#d8d8d8'
const FINAL_RADIUS = 1
const FINAL_TILE = 28

// The opening dot (and the mask layer's own dots, before they've shrunk)
// start noticeably larger/looser than the final grid.
const START_RADIUS = 8
const START_TILE = 110

// Where, along the single 0→1 story below, the explicit "one dot divides
// into two" moment hands off to the mask-revealed field. This threshold
// itself is unchanged; only how much real time each side of it takes
// changes below (SPLIT_MS / PROPAGATE_MS).
const SPLIT_END_T = 0.3
const FADE_BUFFER_T = 0.06 // quick handoff fade right after the split ends
const SPLIT_OFFSET_SCALE = 1.6 // how far the two dots separate, relative to their own current size

const REVEAL_MAX_VMAX = 80 // generous — covers every aspect ratio's corners

// Two real-time segments mapped onto the same 0→SPLIT_END_T and
// SPLIT_END_T→1 story via the same ease-in-out curve on each — so the hold
// and first split keep their exact original pacing (SPLIT_MS unchanged),
// while the propagation-into-the-grid segment simply runs over a longer
// span (PROPAGATE_MS), making it read as slower/more deliberate without
// altering the shape of the curve, the dot sizing, or the final state.
const SPLIT_MS = 430 // hold + slow first split — unchanged from before
const PROPAGATE_MS = 2000 // propagation + settle — slower and clearly readable
const PLAN_MS = SPLIT_MS + PROPAGATE_MS

// The field forms as three concentric rings, each frozen at a fixed dot
// size, so a genuine size gradient is visible at any instant (large dots
// still sitting at the center while a ring of smaller dots grows around
// them) rather than the whole field shrinking together. Every ring's own
// reveal circle is centered on the same point and only ever grows, and each
// ring's max radius is smaller than the next one's — so outer rings can
// never appear before the ones inside them are already forming: centre
// first, edges/corners last, guaranteed by construction.
const MID_RADIUS = 3
const MID_TILE = 50
const RING1 = { growStart: 0.3, growEnd: 0.48, maxVmax: 18, fadeStart: 0.48, fadeEnd: 0.6 } // large — the innermost cluster right after the split
const RING2 = { growStart: 0.42, growEnd: 0.72, maxVmax: 45, fadeStart: 0.72, fadeEnd: 0.85 } // medium — expands around ring 1
const RING3 = { growStart: 0.62, growEnd: 1.0, maxVmax: REVEAL_MAX_VMAX } // final size — expands to full coverage, never fades

const COMPLETE_DURATION = 200 // ms — snap the last stretch up to exactly 100
const HOLD_DURATION = 180 // ms — settle before exiting
const EXIT_DURATION = 350 // ms — simple opacity fade out
const TICK_MS = 30

type Phase = 'loading' | 'completing' | 'holding' | 'exiting' | 'done'

function clamp01(x: number) {
  return Math.max(0, Math.min(1, x))
}
function lerp(from: number, to: number, t: number) {
  return from + (to - from) * t
}
function easeOutCubic(x: number) {
  return 1 - Math.pow(1 - x, 3)
}
// Slow at both ends, fast through the middle — the animation's whole rhythm.
function smootherstep(x: number) {
  const t = clamp01(x)
  return t * t * t * (t * (t * 6 - 15) + 10)
}

function overallTFromElapsed(e: number) {
  if (e < SPLIT_MS) return smootherstep(e / SPLIT_MS) * SPLIT_END_T
  return SPLIT_END_T + smootherstep((e - SPLIT_MS) / PROPAGATE_MS) * (1 - SPLIT_END_T)
}

// 0 -> 90% following the same two-segment curve as the visuals, then a slow
// asymptotic creep if real loading is still not done by the time the
// planned journey ends.
function percentFromElapsed(e: number) {
  if (e < PLAN_MS) return overallTFromElapsed(e) * 90
  const overtime = e - PLAN_MS
  return 90 + 7 * (1 - Math.exp(-overtime / 1500))
}

function radiusAt(t: number) {
  return lerp(START_RADIUS, FINAL_RADIUS, t)
}
function tileAt(t: number) {
  return lerp(START_TILE, FINAL_TILE, t)
}

// A ring's own reveal radius: 0 before its window starts, growing within
// its window, frozen at its max once the window ends — it never shrinks or
// keeps growing past that, so it holds its place while later rings take
// over expanding further out.
function ringRadiusVmax(overallT: number, growStart: number, growEnd: number, maxVmax: number) {
  if (overallT <= growStart) return 0
  if (overallT >= growEnd) return maxVmax
  return smootherstep((overallT - growStart) / (growEnd - growStart)) * maxVmax
}
// Full opacity through the ring's own window, then a quick fade-out once
// the next ring outward has grown enough to cover the same ground.
function ringOpacity(overallT: number, fadeStart: number, fadeEnd: number) {
  if (overallT <= fadeStart) return 1
  if (overallT >= fadeEnd) return 0
  return 1 - (overallT - fadeStart) / (fadeEnd - fadeStart)
}

function Dot({ offsetPx, opacity, diameter }: { offsetPx: number; opacity: number; diameter: number }) {
  return (
    <span
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: diameter,
        height: diameter,
        borderRadius: '50%',
        backgroundColor: DOT_COLOR,
        opacity,
        transform: `translate(calc(-50% + ${offsetPx}px), -50%)`,
      }}
    />
  )
}

/**
 * Full-viewport overlay shown before the landing page. One large dot at the
 * exact center holds, then divides into two — the slow, deliberate moment —
 * before handing off to the landing page's own dot grid, revealed via a
 * circle expanding outward from that same center point while its dots
 * simultaneously shrink from that same large starting size down to the
 * grid's real final size. The percentage sits in the exact spot the
 * "Scroll to see my work" CTA occupies afterward. Self-contained —
 * LandingHero/ScrollGate are never modified to accommodate this, and it
 * reads no state from them.
 */
export function Preloader() {
  const [elapsedMs, setElapsedMs] = useState(0)
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState<Phase>('loading')
  const loadedRef = useRef(false)

  // Drive the animation from real elapsed time, gated on both the planned
  // journey above and the real 'load' event (so 100% means the page is
  // actually ready, not a fake timer). setInterval rather than
  // requestAnimationFrame so this keeps ticking even if the tab loads in
  // the background, where rAF can be paused outright.
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const markLoaded = () => {
      loadedRef.current = true
    }
    if (document.readyState === 'complete') {
      loadedRef.current = true
    } else {
      window.addEventListener('load', markLoaded, { once: true })
    }
    // Safety net only — 'load' always fires in practice, this just prevents
    // an indefinite freeze if it somehow doesn't.
    const safety = window.setTimeout(markLoaded, 8000)

    const start = Date.now()
    const id = setInterval(() => {
      const e = reducedMotion ? PLAN_MS : Date.now() - start
      setElapsedMs(e)

      if (loadedRef.current && e >= PLAN_MS) {
        setProgress(percentFromElapsed(e))
        setPhase('completing')
        clearInterval(id)
      }
    }, TICK_MS)

    return () => {
      clearInterval(id)
      window.clearTimeout(safety)
      window.removeEventListener('load', markLoaded)
    }
  }, [])

  useEffect(() => {
    if (phase !== 'completing') return
    const start = Date.now()
    const from = progress
    const id = setInterval(() => {
      const t = Math.min((Date.now() - start) / COMPLETE_DURATION, 1)
      setProgress(lerp(from, 100, t))
      if (t >= 1) {
        clearInterval(id)
        setPhase('holding')
      }
    }, TICK_MS)
    return () => clearInterval(id)
    // Intentionally only re-runs on phase change — `from` should freeze at
    // whatever progress was when 'completing' started.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase])

  useEffect(() => {
    if (phase !== 'holding') return
    const t = window.setTimeout(() => setPhase('exiting'), HOLD_DURATION)
    return () => window.clearTimeout(t)
  }, [phase])

  useEffect(() => {
    if (phase !== 'exiting') return
    const t = window.setTimeout(() => setPhase('done'), EXIT_DURATION)
    return () => window.clearTimeout(t)
  }, [phase])

  // While covering the screen, swallow the wheel/touch/keyboard gestures
  // ScrollGate listens for on window, so an impatient scroll during preload
  // can't hide the hero before it's ever been seen. Capture phase runs
  // before ScrollGate's own (bubble-phase) listeners; ScrollGate itself is
  // untouched.
  useEffect(() => {
    if (phase === 'done') return
    const stop = (e: Event) => e.stopImmediatePropagation()
    window.addEventListener('wheel', stop, { capture: true })
    window.addEventListener('touchmove', stop, { capture: true })
    window.addEventListener('keydown', stop, { capture: true })
    return () => {
      window.removeEventListener('wheel', stop, { capture: true })
      window.removeEventListener('touchmove', stop, { capture: true })
      window.removeEventListener('keydown', stop, { capture: true })
    }
  }, [phase])

  if (phase === 'done') return null

  const displayPercent = phase === 'loading' ? percentFromElapsed(elapsedMs) : progress
  const clamped = Math.min(displayPercent, 100)
  const exiting = phase === 'exiting'

  // Once past the loading phase the dot field is already fully formed —
  // only the percentage keeps animating (90ish -> 100).
  const overallT = phase === 'loading' ? overallTFromElapsed(elapsedMs) : 1

  // Explicit center dot + its division into two — shrinks continuously from
  // the large opening size down toward the grid's real size, then fades out
  // right as the mask layer below takes over.
  const originOpacity = clamp01(overallT / 0.05)
  const splitProgress = clamp01(overallT / SPLIT_END_T)
  const splitEase = easeOutCubic(splitProgress)
  const explicitDiameter = radiusAt(Math.min(overallT, SPLIT_END_T)) * 2
  const splitOffsetPx = splitEase * (explicitDiameter / 2) * SPLIT_OFFSET_SCALE
  const groupOpacity = overallT < SPLIT_END_T ? 1 : 1 - clamp01((overallT - SPLIT_END_T) / FADE_BUFFER_T)

  // The real dot grid, formed as three concentric rings expanding outward
  // from the same center point — large dots just outside the split, then
  // medium, then the exact final size reaching full coverage. Each ring
  // only ever grows and then freezes/fades, so a ring can never appear
  // before the ring inside it already has.
  const ring1Vmax = ringRadiusVmax(overallT, RING1.growStart, RING1.growEnd, RING1.maxVmax)
  const ring1Opacity = ringOpacity(overallT, RING1.fadeStart, RING1.fadeEnd)
  const ring2Vmax = ringRadiusVmax(overallT, RING2.growStart, RING2.growEnd, RING2.maxVmax)
  const ring2Opacity = ringOpacity(overallT, RING2.fadeStart, RING2.fadeEnd)
  const ring3Vmax = ringRadiusVmax(overallT, RING3.growStart, RING3.growEnd, RING3.maxVmax)

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'var(--background)',
        opacity: exiting ? 0 : 1,
        transition: `opacity ${EXIT_DURATION}ms ease`,
        pointerEvents: exiting ? 'none' : 'auto',
      }}
    >
      {/* The landing page's dot grid, forming as three concentric rings
          expanding outward from the center — final size (widest, never
          fades) painted first/underneath, then medium, then large painted
          last/on top so it wins the overlap right after the split. Each is
          a solid backdrop plus the dot pattern, so a ring fully occludes
          whatever's beneath it within its own clip — not a separate
          pattern, this converges on exactly what DraggableDotGrid renders
          at rest. */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'var(--background)',
          backgroundImage: `radial-gradient(circle, ${DOT_COLOR} ${FINAL_RADIUS}px, transparent ${FINAL_RADIUS}px)`,
          backgroundSize: `${FINAL_TILE}px ${FINAL_TILE}px`,
          backgroundPosition: '0px 0px',
          clipPath: `circle(${ring3Vmax}vmax at 50% 50%)`,
          transition: 'clip-path 60ms linear',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'var(--background)',
          backgroundImage: `radial-gradient(circle, ${DOT_COLOR} ${MID_RADIUS}px, transparent ${MID_RADIUS}px)`,
          backgroundSize: `${MID_TILE}px ${MID_TILE}px`,
          backgroundPosition: '0px 0px',
          clipPath: `circle(${ring2Vmax}vmax at 50% 50%)`,
          opacity: ring2Opacity,
          transition: 'clip-path 60ms linear, opacity 80ms linear',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'var(--background)',
          backgroundImage: `radial-gradient(circle, ${DOT_COLOR} ${radiusAt(SPLIT_END_T)}px, transparent ${radiusAt(SPLIT_END_T)}px)`,
          backgroundSize: `${tileAt(SPLIT_END_T)}px ${tileAt(SPLIT_END_T)}px`,
          backgroundPosition: '0px 0px',
          clipPath: `circle(${ring1Vmax}vmax at 50% 50%)`,
          opacity: ring1Opacity,
          transition: 'clip-path 60ms linear, opacity 80ms linear',
        }}
      />

      {/* The single large origin dot and its first division into two —
          fades out as ring 1 above takes over at the same center point. */}
      <div style={{ position: 'absolute', inset: 0, opacity: groupOpacity }}>
        <Dot offsetPx={0} opacity={originOpacity} diameter={explicitDiameter} />
        <Dot offsetPx={-splitOffsetPx} opacity={splitEase} diameter={explicitDiameter} />
        <Dot offsetPx={splitOffsetPx} opacity={splitEase} diameter={explicitDiameter} />
      </div>

      {/* Mirrors LandingHero's own section structure exactly, so the
          percentage lands in the identical spot the "Scroll to see my work"
          CTA occupies once the real page is revealed — same flex-1 spacer,
          same bottom padding, same breakpoint split. */}
      <section className="relative h-[100svh] flex flex-col">
        <div className="flex-1" />

        <div className="sm:hidden w-full pb-[6svh] flex flex-col items-center gap-5">
          <p className="font-sans font-normal text-[16px] leading-[1.3] tracking-[-0.2px] text-foreground tabular-nums">
            {Math.round(clamped)}%
          </p>
          {/* Reserves the same layout height AnimatedArrow's 25×12 image
              occupies, so this block's total height (and therefore the
              flex-1 spacer above it) matches the real CTA exactly. */}
          <div aria-hidden="true" style={{ width: 25, height: 12 }} />
        </div>
        <div className="hidden sm:flex pb-[6svh] md:pb-14 flex-col items-center gap-5">
          <p className="font-sans font-normal text-[16px] leading-[1.3] tracking-[-0.16px] text-foreground tabular-nums">
            {Math.round(clamped)}%
          </p>
          <div aria-hidden="true" style={{ width: 25, height: 12 }} />
        </div>
      </section>
    </div>
  )
}
