'use client'

import { useEffect, useState } from 'react'
import { EASE_PEEL, EASE_RISE, cssEase } from '@/lib/motion'
import { PreloaderTV } from './PreloaderTV'

// Claude Design "Snow — Portfolio v2" peel loader: a solid accent-color
// panel that holds, then slides up and off-screen, revealing the real page
// underneath — replacing the old dot-grid-reveal choreography. The engine
// underneath is unchanged from before: gated on the real `document.readyState`
// / `load` event (not a fake timer) with a safety net, plus a minimum hold
// so a fast load never just flashes past, and it still swallows wheel/
// touch/keyboard input while visible so an impatient scroll can't skip it.
// The hold is long enough for PreloaderTV (rendered inline below, as part
// of this same panel) to cycle through a couple of images before the panel
// peels away — PreloaderTV has no say in any of this timing.
// Total time from mount to fully revealed page must stay ≤3s, so
// MIN_HOLD_MS and SAFETY_MS are both capped well under that ceiling to
// leave room for the ~30ms poll interval and the peel transition itself:
// worst case is max(MIN_HOLD_MS, SAFETY_MS) + ~30ms poll slack +
// PEEL_DURATION_MS, which must never exceed 3000ms.
const MIN_HOLD_MS = 2200
const PEEL_DURATION_MS = 650
const SAFETY_MS = 2200

type Phase = 'loading' | 'exiting' | 'done'

// Module-scoped, not component state and not persisted storage: it lives
// for exactly as long as the current browser JS session does. A real page
// load or refresh re-evaluates this module from scratch, resetting it to
// false, so the preloader still plays then. Client-side App Router
// navigation between routes reuses the already-loaded module without
// re-evaluating it, so this stays true across route changes and the
// preloader skips itself on every mount after the first. localStorage/
// sessionStorage would both survive a real refresh too — the one case that
// must still show the preloader — which is why a plain module variable,
// not persisted storage, is the correct mechanism here.
let hasPlayedThisSession = false

export function Preloader() {
  const [phase, setPhase] = useState<Phase>(hasPlayedThisSession ? 'done' : 'loading')
  const [textIn, setTextIn] = useState(false)
  // Starts false (matching SSR, where matchMedia doesn't exist) and is only
  // ever corrected post-mount via the effect below — never read during the
  // very first render — so it can't cause a hydration mismatch the way
  // gating actual DOM presence on it would.
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    if (hasPlayedThisSession) return
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // Deferred so the setState happens inside a callback, not synchronously
    // in the effect body (react-hooks/set-state-in-effect).
    const reducedMotionTimer = window.setTimeout(() => setReducedMotion(reducedMotion), 0)

    let loaded = document.readyState === 'complete'
    const markLoaded = () => {
      loaded = true
    }
    window.addEventListener('load', markLoaded, { once: true })
    const safety = window.setTimeout(markLoaded, SAFETY_MS)

    const start = Date.now()
    const id = window.setInterval(() => {
      const heldLongEnough = reducedMotion || Date.now() - start >= MIN_HOLD_MS
      if (loaded && heldLongEnough) {
        setPhase('exiting')
        window.clearInterval(id)
      }
    }, 30)

    // Text peels in shortly after mount, same as the design's own peelIn delay.
    const textTimer = window.setTimeout(() => setTextIn(true), reducedMotion ? 0 : 120)

    return () => {
      window.clearInterval(id)
      window.clearTimeout(safety)
      window.clearTimeout(textTimer)
      window.clearTimeout(reducedMotionTimer)
      window.removeEventListener('load', markLoaded)
    }
  }, [])

  useEffect(() => {
    if (phase !== 'exiting') return
    const t = window.setTimeout(() => {
      hasPlayedThisSession = true
      setPhase('done')
    }, PEEL_DURATION_MS)
    return () => window.clearTimeout(t)
  }, [phase])

  // While covering the screen, swallow wheel/touch/keyboard input so an
  // impatient scroll can't interact with the page before it's ever shown.
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

  // The listeners above stop wheel/touch/keyboard from reaching the real
  // page, but assistive tech doesn't necessarily go through those events —
  // a screen reader's virtual cursor can still browse to and activate real
  // content sitting under the (visually opaque) preloader. `inert` closes
  // that gap the same way for every input mode at once, without changing
  // anything about the preloader's own timing or appearance.
  useEffect(() => {
    const el = document.getElementById('site-content')
    if (!el) return
    if (phase === 'done') {
      el.removeAttribute('inert')
    } else {
      el.setAttribute('inert', '')
    }
    return () => el.removeAttribute('inert')
  }, [phase])

  if (phase === 'done') return null

  const exiting = phase === 'exiting'

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'var(--accent)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '34px 26px',
        transform: exiting ? 'translateY(-101%)' : 'translateY(0)',
        transition: reducedMotion ? 'none' : `transform ${PEEL_DURATION_MS}ms ${cssEase(EASE_PEEL)}`,
        pointerEvents: exiting ? 'none' : 'auto',
      }}
    >
      {/* Sits on this same green panel from the very first frame — not a
          separate layer or entrance, just another child of the panel this
          component already renders. Absolutely positioned so it drops out
          of the flex column above and can't shift the text row's own
          flex-end layout. Moves with the panel automatically (no transition
          of its own to write) since the peel transform above applies to
          this whole panel, TV included. */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}
      >
        <PreloaderTV />
      </div>

      <div
        className="font-mono"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          gap: 16,
          flexWrap: 'wrap',
          fontSize: 10.5,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'rgba(251,250,249,0.72)',
          opacity: textIn ? 1 : 0,
          transform: textIn ? 'none' : 'translateY(8px)',
          transition: reducedMotion ? 'none' : `opacity 520ms ${cssEase(EASE_RISE)}, transform 520ms ${cssEase(EASE_RISE)}`,
        }}
      >
        <span style={{ color: 'var(--background)' }}>Faith Olohijere — Snow</span>
        <span>Product Designer · Lagos</span>
      </div>
    </div>
  )
}
