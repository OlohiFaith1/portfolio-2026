'use client'

import { useRef, useLayoutEffect, useEffect, useState } from 'react'

// Exact dimensions from the hero phone frame assets
const PHONE_W = 367
const PHONE_H = 750
const SCREEN_LEFT = 14.17
const SCREEN_TOP = 14.05
const SCREEN_W = 339.95
const SCREEN_H = 726.3
const SCREEN_RADIUS = 43.7

const PHONES = [
  { src: '/azza/videos/deposit-crypto.mp4',    label: 'Deposit crypto flow' },
  { src: '/azza/videos/generate-statement.mp4', label: 'Generate statement flow' },
  { src: '/azza/videos/balance.mp4',            label: 'Balance flow' },
]

// ── Phone ─────────────────────────────────────────────────────────────────────

interface PhoneVideoProps {
  src: string
  label: string
  /** Tailwind height class(es) applied to the outer sizing wrapper */
  className?: string
}

function PhoneVideoMockup({ src, label, className = 'h-[560px]' }: PhoneVideoProps) {
  const wrapRef  = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [scale, setScale] = useState(1)

  // Scale the native 367×750 phone to fill whatever height the wrapper reports.
  // useLayoutEffect prevents the phone flashing at native size before first paint.
  useLayoutEffect(() => {
    const update = () => {
      if (wrapRef.current) setScale(wrapRef.current.offsetHeight / PHONE_H)
    }
    update()
    const ro = new ResizeObserver(update)
    if (wrapRef.current) ro.observe(wrapRef.current)
    return () => ro.disconnect()
  }, [])

  // Imperatively call .play() after hydration.
  // Setting .muted = true before .play() is the Safari workaround for autoplay.
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = true
    v.play().catch(() => {})
  }, [])

  return (
    <div
      ref={wrapRef}
      className={`relative flex-shrink-0 ${className}`}
      style={{ aspectRatio: `${PHONE_W} / ${PHONE_H}`, maxHeight: PHONE_H }}
    >
      {/* Native-size phone scaled down from top-left */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: PHONE_W,
          height: PHONE_H,
          transformOrigin: 'top left',
          transform: `scale(${scale})`,
        }}
      >
        {/* Shadow layer */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/azza/hero/phone-shadow.png"
          alt=""
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.6 }}
        />

        {/* Frame layer */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/azza/hero/phone-frame.png"
          alt=""
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        />

        {/* Screen cutout — same geometry as the hero phone */}
        <div
          style={{
            position: 'absolute',
            left: SCREEN_LEFT,
            top: SCREEN_TOP,
            width: SCREEN_W,
            height: SCREEN_H,
            borderRadius: SCREEN_RADIUS,
            overflow: 'hidden',
            transform: 'rotate(-0.3deg)',
          }}
        >
          <video
            ref={videoRef}
            src={src}
            aria-label={label}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      </div>
    </div>
  )
}

// ── Section ───────────────────────────────────────────────────────────────────

export function AzzaStudy3() {
  return (
    <section
      className="relative bg-white"
      style={{
        backgroundImage: 'radial-gradient(circle, #d8d8d8 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }}
    >
      {/*
        Single DOM — no duplicate renders.
        flex-col on mobile (stacked), flex-row from md upward (side by side).
        Heights:
          mobile  h-[480px] — each phone centered, stacked
          tablet  md:h-[380px] — 3 phones at ~186px wide each, fits 768px
          desktop lg:h-[560px] — 3 phones at ~274px wide each, fits 1440px
      */}
      <div
        className="
          flex flex-col md:flex-row
          items-center justify-center
          gap-16 md:gap-10 lg:gap-12
          px-6 md:px-12 lg:px-16
          py-20 md:py-24 lg:py-32
        "
      >
        {PHONES.map((phone) => (
          <PhoneVideoMockup
            key={phone.src}
            src={phone.src}
            label={phone.label}
            className="h-[480px] md:h-[380px] lg:h-[560px]"
          />
        ))}
      </div>
    </section>
  )
}
