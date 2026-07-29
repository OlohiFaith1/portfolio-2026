'use client'

import { useRef, useEffect } from 'react'

const TARGET = 76834.89
const DURATION = 2300 // ms

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

function formatAmount(n: number): string {
  const [whole, dec] = n.toFixed(2).split('.')
  return whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '.' + dec
}

export function AzzaStudy4() {
  const sectionRef = useRef<HTMLElement>(null)
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
    <section
      ref={sectionRef}
      style={{
        backgroundColor: '#3430e9',
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'clamp(8px, 1.5vh, 24px)',
        padding: '0 clamp(24px, 6vw, 96px)',
      }}
    >
      {/* Label */}
      <p
        style={{
          fontFamily: 'Inter, system-ui, sans-serif',
          fontWeight: 400,
          fontSize: 'clamp(14px, 2.6vw, 50px)',
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
          fontSize: 'clamp(36px, 9.6vw, 184px)',
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
    </section>
  )
}
