'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { AzzaMockup } from './AzzaMockup'
import { AnimatedRightArrow } from './AnimatedRightArrow'

export interface CaseStudySectionProps {
  name: string
  role: string
  year: string
  nextHref: string
}

export function CaseStudySection({
  name,
  role,
  year,
  nextHref,
}: CaseStudySectionProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Tint layer — covers dot-grid with #D8BAFF on phone hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundColor: '#D8BAFF' }}
        initial={false}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      />

      {/*
        Background artwork — Figma asset exported from "Hover on First Page" bg group.
        Positioned to match the Figma frame exactly (left: -323, top: -232).
        32px blur sits behind every foreground element; overflow-hidden on the
        section clips the bleed edges cleanly.
      */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          left: -323,
          top: -232,
          width: 1893,
          height: 1520,
          filter: 'blur(32px)',
        }}
        initial={false}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/azza/bg-artwork.svg"
          alt=""
          style={{ display: 'block', width: '100%', height: '100%' }}
        />
      </motion.div>

      {/* Project metadata — left edge aligns with Nav's "Menu" label via matching responsive padding */}
      <div className="hidden lg:flex flex-col absolute top-1/2 -translate-y-1/2 items-start gap-[20px] left-8 md:left-16 xl:left-24">
        <span
          className="font-display leading-[1.1] text-foreground"
          style={{ fontSize: 20 }}
        >
          {name}
        </span>
        <span
          className="font-sans font-normal leading-[1.3] text-[#5a5a5a]"
          style={{ fontSize: 16, letterSpacing: '-0.16px', width: 191, display: 'block', whiteSpace: 'pre-line' }}
        >
          {role}
        </span>
        <span
          className="font-sans font-normal leading-[1.3] text-[#5a5a5a] whitespace-nowrap"
          style={{ fontSize: 16, letterSpacing: '-0.16px' }}
        >
          {year}
        </span>
      </div>

      {/* Device mockup — hover target */}
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <AzzaMockup />
      </div>

      {/* Next-project arrow — right, desktop only */}
      <AnimatedRightArrow href={nextHref} />
    </section>
  )
}
