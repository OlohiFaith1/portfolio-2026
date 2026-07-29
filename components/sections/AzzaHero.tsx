'use client'

import { motion } from 'framer-motion'

const PHONE_W = 367
const PHONE_H = 750

export function AzzaHero() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      style={{
        position: 'relative',
        width: '100%',
        height: '100svh',
        backgroundColor: '#0a0a0a',
        overflow: 'hidden',
      }}
    >
      {/*
        Three coloured-light glows — no rectangular image, no visible edges.
        Each is a circle blurred so heavily it fades to nothing at its own edges.
        Wrapper scales down on mobile/tablet so the light supports rather than fills.
      */}
      <div
        className="scale-[0.80] md:scale-[0.88] lg:scale-100"
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0 }}
      >
        {/* Green/teal — behind upper-left of phone */}
        <div
          style={{
            position: 'absolute',
            left: '37%',
            top: '27%',
            width: 280,
            height: 280,
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            backgroundColor: '#2CCCA3',
            filter: 'blur(80px)',
            opacity: 0.82,
          }}
        />
        {/* Yellow — behind lower-left of phone */}
        <div
          style={{
            position: 'absolute',
            left: '36%',
            top: '70%',
            width: 300,
            height: 300,
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            backgroundColor: '#F0B90B',
            filter: 'blur(80px)',
            opacity: 0.75,
          }}
        />
        {/* Blue — behind lower-right of phone */}
        <div
          style={{
            position: 'absolute',
            left: '64%',
            top: '70%',
            width: 300,
            height: 300,
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            backgroundColor: '#174680',
            filter: 'blur(80px)',
            opacity: 0.9,
          }}
        />
      </div>

      {/* Phone — centered, raised slightly for visual balance */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '47%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        {/*
          scale-[0.62] → mobile  (228×465 visual)
          sm:scale-[0.75]        (275×563)
          md:scale-[0.85]        (312×638)
          lg:scale-[0.91]        (334×683, desktop — unchanged from previous task)
        */}
        <div className="scale-[0.62] sm:scale-[0.75] md:scale-[0.85] lg:scale-[0.91]">
          <PhoneMockup />
        </div>
      </div>
    </motion.section>
  )
}

function PhoneMockup() {
  return (
    <div style={{ position: 'relative', width: PHONE_W, height: PHONE_H }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/azza/hero/phone-shadow.png"
        alt=""
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0.7,
        }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/azza/hero/phone-frame.png"
        alt=""
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      />
      <div
        style={{
          position: 'absolute',
          left: 14.17,
          top: 14.05,
          width: 339.95,
          height: 726.3,
          borderRadius: 43.7,
          overflow: 'hidden',
          transform: 'rotate(-0.3deg)',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/azza/hero/phone-screen.png"
          alt="Azza app – WhatsApp conversation interface"
          style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
    </div>
  )
}
