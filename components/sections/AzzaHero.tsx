'use client'

import { motion } from 'framer-motion'

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
      {/* Layer 2: Dotted grid — same pattern as the landing page body */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Layer 3: Hero artwork — manually exported from Figma, blur/composition baked in */}
      <div
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/azza/hero/LOGO%20Asset.png"
          alt=""
          style={{
            display: 'block',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
      </div>

      {/* Layer 4: Phone mockup — centered, always sharp */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <PhoneMockup />
      </div>
    </motion.section>
  )
}

function PhoneMockup() {
  return (
    <div style={{ position: 'relative', width: 367, height: 750 }}>
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
