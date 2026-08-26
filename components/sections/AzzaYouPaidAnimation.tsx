'use client'

import { useRef, useEffect } from 'react'

// Restored from the original AzzaStudy4 count-up section (commit 0254377,
// since removed when the case study moved to the Snow/Claude Design
// format). The count-up engine below — target/duration, easing, the
// IntersectionObserver replay-on-reentry, rAF tick, and the aria-live
// handling — is preserved byte-for-byte; only the outer section has been
// re-skinned from a full-viewport (100svh) hero into a bounded frame that
// matches the width/border-radius treatment of this case study's other
// figures, with type sizes tuned for that smaller box instead of the
// original's full-bleed vw/vh scale.
const TARGET = 76834.89
const DURATION = 2300 // ms

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

function formatAmount(n: number): string {
  const [whole, dec] = n.toFixed(2).split('.')
  return whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '.' + dec
}

export function AzzaYouPaidAnimation() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const amountRef = useRef<HTMLSpanElement>(null)
  const rafRef = useRef<number | null>(null)
  const isAnimating = useRef(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    function cancelAnimation() {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
      isAnimating.current = false
    }

    function reset() {
      cancelAnimation()
      if (amountRef.current) {
        // Silence the live region before resetting so AT doesn't announce "0.00"
        amountRef.current.setAttribute('aria-live', 'off')
        amountRef.current.textContent = '0.00'
      }
    }

    function startAnimation() {
      cancelAnimation()
      isAnimating.current = true
      if (amountRef.current) {
        // Keep live region silent during animation — no per-frame announcements
        amountRef.current.setAttribute('aria-live', 'off')
        amountRef.current.textContent = '0.00'
      }

      const start = performance.now()

      function tick(now: number) {
        const elapsed = now - start
        const t = Math.min(elapsed / DURATION, 1)
        const value = TARGET * easeOutCubic(t)

        if (amountRef.current) {
          amountRef.current.textContent = formatAmount(value)
        }

        if (t < 1) {
          rafRef.current = requestAnimationFrame(tick)
        } else {
          if (amountRef.current) {
            // Activate the live region first, then set the final value so AT
            // announces the completed amount exactly once.
            amountRef.current.setAttribute('aria-live', 'polite')
            amountRef.current.textContent = formatAmount(TARGET)
          }
          isAnimating.current = false
          rafRef.current = null
        }
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    // threshold: [0, 0.4]
    //   0   → fires when the section fully leaves the viewport (reset)
    //   0.4 → fires when 40% is visible (start/restart animation)
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          reset()
        } else if (entry.intersectionRatio >= 0.4 && !isAnimating.current) {
          startAnimation()
        }
      },
      { threshold: [0, 0.4] }
    )

    observer.observe(section)

    return () => {
      observer.disconnect()
      cancelAnimation()
    }
  }, [])

  return (
    <div
      ref={sectionRef}
      className="w-full"
      style={{
        backgroundColor: '#3430e9',
        aspectRatio: '3 / 2',
        borderRadius: 12,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        padding: '0 24px',
      }}
    >
      {/* Label */}
      <p
        style={{
          fontFamily: 'Inter, system-ui, sans-serif',
          fontWeight: 400,
          fontSize: 'clamp(11px, 3.2vw, 13px)',
          lineHeight: 1.4,
          letterSpacing: '-0.06em',
          color: '#ffffff',
          textTransform: 'uppercase',
          margin: 0,
          textAlign: 'center',
        }}
      >
        You paid:
      </p>

      {/*
        Amount line: flex row so "NGN" and the number are independent elements.
        The number span has a fixed minWidth (wide enough for the final value)
        so "NGN" never shifts as digits accumulate during the count-up.
        fontVariantNumeric: tabular-nums ensures equal digit widths,
        eliminating per-frame jitter from proportional numeral advances.
      */}
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          flexWrap: 'nowrap',
          fontFamily: 'Subjectivity, sans-serif',
          fontWeight: 800,
          fontSize: 'clamp(26px, 9vw, 44px)',
          lineHeight: 1.25,
          letterSpacing: '-0.06em',
          color: '#ffffff',
          textTransform: 'uppercase',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        <span>NGN&nbsp;</span>
        <span
          ref={amountRef}
          aria-live="off"
          style={{
            display: 'inline-block',
            minWidth: '5.5em',
            textAlign: 'left',
          }}
        >
          0.00
        </span>
      </div>
    </div>
  )
}
