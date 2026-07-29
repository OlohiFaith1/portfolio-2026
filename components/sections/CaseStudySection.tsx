'use client'

import { useState, useEffect } from 'react'
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

  // True only on devices that support real hover (fine pointer / mouse).
  // Stays false on touch screens so hover state is never triggered there.
  const [hoverCapable, setHoverCapable] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    setHoverCapable(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setHoverCapable(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const enterHover = () => { if (hoverCapable) setHovered(true) }
  const leaveHover = () => { if (hoverCapable) setHovered(false) }

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

      {/* ── MOBILE layout (<md) ─────────────────────────────────────────────
          justify-evenly: equal gaps before/between/after all three items.
          pt-[54px] offsets for the 54px bookmark so the first gap matches.
      ──────────────────────────────────────────────────────────────────── */}
      <div className="md:hidden flex flex-col justify-evenly w-full px-6 pt-[54px] h-[100svh]">

        {/* 1. Project info */}
        <div className="flex flex-col">
          <Link href={href}>
            <span className="font-display text-[24px] leading-[1.1] text-foreground">
              {name}
            </span>
          </Link>
          <span
            className="font-sans font-normal leading-[1.3] text-[#5a5a5a] mt-3"
            style={{ fontSize: 16, letterSpacing: '-0.16px', whiteSpace: 'pre-line' }}
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

        {/* 2. Phone mockup */}
        <div className="flex justify-center">
          <Link href={href}>
            <div
              onMouseEnter={enterHover}
              onMouseLeave={leaveHover}
            >
              <AzzaMockup className="h-[55vh]" />
            </div>
          </Link>
        </div>

        {/* 3. Next → */}
        <Link
          href={nextHref}
          aria-label="Next project"
          className="flex items-center gap-2"
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

      {/* ── TABLET layout (md–lg) ────────────────────────────────────────────
          Unchanged from the previous tablet experience.
      ──────────────────────────────────────────────────────────────────── */}
      <div className="hidden md:flex lg:hidden flex-col w-full px-6 pt-20 h-[100svh]">

        {/* 1. Project info */}
        <div className="flex flex-col mt-6 mb-6">
          <Link href={href}>
            <span className="font-display text-[28px] leading-[1.1] text-foreground">
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

        {/* 2. Phone mockup */}
        <div className="flex justify-center">
          <Link href={href}>
            <div
              onMouseEnter={enterHover}
              onMouseLeave={leaveHover}
            >
              <AzzaMockup className="h-[63vh]" />
            </div>
          </Link>
        </div>

        <div className="flex-1" />

        {/* 3. Next → */}
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
          {...(hoverCapable ? { whileHover: 'hover' } : {})}
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
          onMouseEnter={enterHover}
          onMouseLeave={leaveHover}
        >
          <AzzaMockup />
        </div>
      </Link>

      {/* Next-project arrow — right, desktop only */}
      <AnimatedRightArrow href={nextHref} />
    </section>
  )
}
