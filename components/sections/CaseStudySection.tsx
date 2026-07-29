'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { AzzaMockup } from './AzzaMockup'
import { AnimatedRightArrow } from './AnimatedRightArrow'

export interface CaseStudySectionProps {
  href: string
  name: string
  role: string
  year: string
  nextHref: string
}

export function CaseStudySection({
  href,
  name,
  role,
  year,
  nextHref,
}: CaseStudySectionProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <section className="relative min-h-screen flex flex-col lg:items-center lg:justify-center overflow-hidden">

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
        Section overflow-hidden clips it at all viewport sizes.
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

      {/* ── MOBILE / TABLET layout (<lg) ───────────────────────────────────
          One full viewport: info → phone → [space] → Next (pinned bottom)
      ──────────────────────────────────────────────────────────────────── */}
      <div className="lg:hidden flex flex-col w-full px-6 pt-16 md:pt-20 h-[100svh]">

        {/* 1. Project info — left-aligned, breathing room above and below */}
        <div className="flex flex-col mt-5 md:mt-6 mb-5 md:mb-6">
          <Link href={href}>
            <span className="font-display text-[24px] md:text-[28px] leading-[1.1] text-foreground">
              {name}
            </span>
          </Link>
          <span
            className="font-sans font-normal leading-[1.3] text-[#5a5a5a] mt-3"
            style={{ fontSize: 16, letterSpacing: '-0.16px' }}
          >
            {role}
          </span>
          <span
            className="font-sans font-normal leading-[1.3] text-[#5a5a5a] mt-1"
            style={{ fontSize: 16, letterSpacing: '-0.16px' }}
          >
            {year}
          </span>
        </div>

        {/* 2. Phone mockup — centered, ~10% larger than before */}
        <div className="flex justify-center">
          <Link href={href}>
            <div
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <AzzaMockup className="h-[55vh] md:h-[63vh]" />
            </div>
          </Link>
        </div>

        {/* Spacer — distributes remaining height as whitespace above Next */}
        <div className="flex-1" />

        {/* 3. Next → — left-aligned, pinned to bottom of viewport */}
        <Link
          href={nextHref}
          aria-label="Next project"
          className="flex items-center gap-2 pb-8"
        >
          <span
            className="font-sans font-normal leading-[1.3] text-foreground"
            style={{ fontSize: 16, letterSpacing: '-0.16px' }}
          >
            Next
          </span>
          <motion.div
            animate={{ x: [0, 7, 0] }}
            transition={{ duration: 1.8, ease: 'easeInOut', repeat: Infinity }}
          >
            <Image
              src="/arrow-right.svg"
              alt=""
              width={24}
              height={9}
              aria-hidden="true"
            />
          </motion.div>
        </Link>
      </div>

      {/* ── DESKTOP layout (≥lg) ───────────────────────────────────────────
          Project info | Phone (centred by section flex) | Arrow
      ──────────────────────────────────────────────────────────────────── */}

      {/* Project metadata — left edge aligns with Nav's "Menu" label */}
      <div className="hidden lg:flex flex-col absolute top-1/2 -translate-y-1/2 items-start gap-[20px] left-8 md:left-16 xl:left-24">
        <motion.div
          className="relative"
          initial="rest"
          animate="rest"
          whileHover="hover"
        >
          <Link href={href}>
            <span
              className="font-display leading-[1.1] text-foreground"
              style={{ fontSize: 20 }}
            >
              {name}
            </span>
          </Link>
          <motion.span
            className="absolute left-0 w-full block origin-left"
            style={{ bottom: -2, height: 1, backgroundColor: 'currentColor' }}
            variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            aria-hidden="true"
          />
        </motion.div>

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

      {/* Phone mockup — desktop only, centred by section's lg:items-center lg:justify-center */}
      <Link href={href} className="hidden lg:block">
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <AzzaMockup />
        </div>
      </Link>

      {/* Next-project arrow — right, desktop only */}
      <AnimatedRightArrow href={nextHref} />
    </section>
  )
}
