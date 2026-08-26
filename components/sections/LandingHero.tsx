'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { EASE_RISE, EASE_SIGN } from '@/lib/motion'

// Claude Design "Snow — Portfolio v2" index hero — signature + live Lagos
// clock, then avatar/name/role, and a three-paragraph bio.
const SIGNATURE_PATH =
  'M10 30C10 16 18 8 25 9c6 1 3 9-3 13-6 4-8 6-6 9 2 3 8 2 12-1 2-2 4-6 5-9 0 4-1 8 0 10 1-9 5-12 9-10 3 2 2 7 2 10 2-3 4-9 8-10 4-1 8 2 7 6-1 4-6 5-8 2-2-3 0-7 4-8 3 0 5 1 6 3 1 3 2 6 4 7 2 1 3-5 4-9 1 5 1 8 3 9 2 1 4-5 5-9 1 5 2 8 5 8 6 0 12-4 15-10 1-4-3-5-5-1-2 4 3 16-9 19-14 3-40 3-56-3'

function useClock() {
  const clockRef = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const tick = () => {
      if (!clockRef.current) return
      const t = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Africa/Lagos',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(new Date())
      clockRef.current.textContent = `Lagos, NG · ${t}`
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  return clockRef
}

export function LandingHero() {
  const reduced = useReducedMotion()
  const clockRef = useClock()

  return (
    <section className="w-full max-w-[620px] mx-auto px-6 pt-16">
      {/* Signature + live clock */}
      <div
        className="flex justify-between items-center gap-4 flex-wrap font-mono text-[11px] tracking-[0.04em]"
        style={{ color: 'var(--muted)' }}
      >
        <svg
          viewBox="0 0 112 46"
          width="94"
          height="34"
          fill="none"
          stroke="var(--foreground)"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          role="img"
          aria-label="Snow"
          style={{ display: 'block', overflow: 'visible' }}
        >
          <motion.path
            pathLength={100}
            d={SIGNATURE_PATH}
            initial={reduced ? false : { strokeDasharray: 100, strokeDashoffset: 100 }}
            animate={reduced ? undefined : { strokeDashoffset: 0 }}
            transition={reduced ? undefined : { duration: 1.8, ease: EASE_SIGN, delay: 0.25 }}
          />
        </svg>
        <span ref={clockRef}>Lagos, NG · —:—:—</span>
      </div>

      {/* Avatar / name / role / tagline / bio */}
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE_RISE }}
        style={{ paddingTop: 40 }}
      >
        <div className="flex items-center gap-[14px]">
          <div
            className="relative shrink-0 rounded-full overflow-hidden"
            style={{ width: 52, height: 52, background: 'var(--surface)' }}
          >
            <Image
              src="/images/about/About%20Header%20Image.png"
              alt=""
              fill
              sizes="52px"
              className="object-cover"
            />
          </div>
          <div className="min-w-0">
            <div className="font-sans font-medium text-[19px] tracking-[-0.015em] text-foreground">
              Faith Olohijere
            </div>
            <div className="mt-[3px] font-sans text-[12.5px]" style={{ color: 'var(--muted)' }}>
              Digital Product Designer
            </div>
          </div>
        </div>

        <p className="font-sans" style={{ margin: '26px 0 0', fontSize: 13.5, lineHeight: 1.72, color: 'var(--body)' }}>
          I&rsquo;m a product designer, learning design engineering.
        </p>

        <p className="font-sans" style={{ margin: '14px 0 0', fontSize: 13.5, lineHeight: 1.72, color: 'var(--body)' }}>
          I&rsquo;ve spent the last four years designing across fintech, crypto, AI and civic tech.
          Most recently, I was a founding product designer at{' '}
          <a
            href="https://x.com/useazza"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="Open"
            style={{ fontWeight: 500, borderBottom: '1px solid var(--link-underline)' }}
          >
            Azza
          </a>
          , where I helped shape products around stablecoins and digital payments.
        </p>

        <p className="font-sans" style={{ margin: '14px 0 0', fontSize: 13.5, lineHeight: 1.72, color: 'var(--body)' }}>
          Before that, I worked at{' '}
          <a
            href="https://x.com/blocverse_"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="Open"
            style={{ fontWeight: 500, borderBottom: '1px solid var(--link-underline)' }}
          >
            Blocverse
          </a>
          , designing products across fintech and crypto. These days, I&rsquo;m pursuing an MBA,
          building more with code, and finding out what happens past the Figma file.
        </p>

        <div style={{ marginTop: 44, height: 2, borderRadius: 999, background: 'var(--border)' }} />
      </motion.div>
    </section>
  )
}
