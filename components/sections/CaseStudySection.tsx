'use client'

import { useState, useEffect, useRef } from 'react'
import type { ComponentType, ReactNode, MouseEvent } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { AnimatedRightArrow } from './AnimatedRightArrow'

export interface CaseStudySectionProps {
  href: string
  name: string
  role: string
  year: string
  nextHref: string
  Mockup: ComponentType<{ className?: string }>
  /**
   * When true, the case study isn't live yet: the name and phone mockup
   * never navigate — instead they show a "Coming Soon" overlay on hover
   * (desktop) or tap (touch), while the Next arrow keeps working normally.
   */
  comingSoon?: boolean
}

export function CaseStudySection({
  href,
  name,
  role,
  year,
  nextHref,
  Mockup,
  comingSoon = false,
}: CaseStudySectionProps) {
  const [hovered, setHovered] = useState(false)
  const [showComingSoon, setShowComingSoon] = useState(false)

  const [hoverCapable, setHoverCapable] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(hover: hover) and (pointer: fine)').matches
  })
  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const onChange = (e: MediaQueryListEvent) => setHoverCapable(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  // Mockup hover: Azza tints the background; Mercado (comingSoon) darkens
  // with a "Coming Soon" tag instead. Only one of the two states applies.
  const enterMockupHover = () => {
    if (!hoverCapable) return
    if (comingSoon) setShowComingSoon(true)
    else setHovered(true)
  }
  const leaveMockupHover = () => {
    if (!hoverCapable) return
    if (comingSoon) setShowComingSoon(false)
    else setHovered(false)
  }

  // Touch devices have no hover, so tapping the name or mockup must show the
  // same Coming Soon state directly. It auto-hides shortly after on touch;
  // on hover-capable devices, mouseleave already governs visibility.
  const hideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const triggerComingSoon = () => {
    setShowComingSoon(true)
    if (hoverCapable) return
    if (hideTimeout.current) clearTimeout(hideTimeout.current)
    hideTimeout.current = setTimeout(() => setShowComingSoon(false), 2200)
  }
  useEffect(() => () => {
    if (hideTimeout.current) clearTimeout(hideTimeout.current)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col lg:items-center lg:justify-center overflow-hidden">

      {!comingSoon && (
        <>
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
        </>
      )}

      {/* ── MOBILE layout (<md) ─────────────────────────────────────────────
          justify-evenly: equal gaps before/between/after all three items.
          pt-[54px] offsets for the 54px bookmark so the first gap matches.
      ──────────────────────────────────────────────────────────────────── */}
      <div className="md:hidden flex flex-col justify-evenly w-full px-6 pt-[54px] h-[100svh]">

        {/* 1. Project info */}
        <div className="flex flex-col">
          <PreviewTrigger comingSoon={comingSoon} href={href} onTrigger={triggerComingSoon}>
            <span className="font-display text-[24px] leading-[1.1] text-foreground">
              {name}
            </span>
          </PreviewTrigger>
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
          <PreviewTrigger
            comingSoon={comingSoon}
            href={href}
            onTrigger={triggerComingSoon}
            onMouseEnter={enterMockupHover}
            onMouseLeave={leaveMockupHover}
            ariaLabel={comingSoon ? `${name} — coming soon` : undefined}
          >
            <Mockup className="h-[55vh]" />
          </PreviewTrigger>
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
          <PreviewTrigger comingSoon={comingSoon} href={href} onTrigger={triggerComingSoon}>
            <span className="font-display text-[28px] leading-[1.1] text-foreground">
              {name}
            </span>
          </PreviewTrigger>
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
          <PreviewTrigger
            comingSoon={comingSoon}
            href={href}
            onTrigger={triggerComingSoon}
            onMouseEnter={enterMockupHover}
            onMouseLeave={leaveMockupHover}
            ariaLabel={comingSoon ? `${name} — coming soon` : undefined}
          >
            <Mockup className="h-[63vh]" />
          </PreviewTrigger>
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
          <PreviewTrigger comingSoon={comingSoon} href={href} onTrigger={triggerComingSoon}>
            <span
              className="font-display leading-[1.1] text-foreground"
              style={{ fontSize: 20 }}
            >
              {name}
            </span>
          </PreviewTrigger>
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
      <PreviewTrigger
        comingSoon={comingSoon}
        href={href}
        onTrigger={triggerComingSoon}
        onMouseEnter={enterMockupHover}
        onMouseLeave={leaveMockupHover}
        ariaLabel={comingSoon ? `${name} — coming soon` : undefined}
        className="hidden lg:block"
      >
        <Mockup />
      </PreviewTrigger>

      {/* Next-project arrow — right, desktop only */}
      <AnimatedRightArrow href={nextHref} />

      {comingSoon && (
        <>
          {/* Dark scrim — mockup and name stay visible underneath */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ backgroundColor: 'rgba(20,20,20,0.55)' }}
            initial={false}
            animate={{ opacity: showComingSoon ? 1 : 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            aria-hidden="true"
          />
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            initial={false}
            animate={{ opacity: showComingSoon ? 1 : 0, scale: showComingSoon ? 1 : 0.96 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            aria-live="polite"
          >
            <span
              className="font-sans font-medium rounded-full bg-white text-foreground shadow"
              style={{ fontSize: 14, letterSpacing: '-0.16px', padding: '10px 22px' }}
            >
              Coming Soon
            </span>
          </motion.div>
        </>
      )}
    </section>
  )
}

interface PreviewTriggerProps {
  comingSoon: boolean
  href: string
  onTrigger: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  className?: string
  ariaLabel?: string
  children: ReactNode
}

/**
 * Renders a normal navigating Link when the case study is live. When it's
 * marked comingSoon, renders a non-navigating button that shows the Coming
 * Soon state instead — used for both the name and the phone mockup.
 */
function PreviewTrigger({
  comingSoon,
  href,
  onTrigger,
  onMouseEnter,
  onMouseLeave,
  className,
  ariaLabel,
  children,
}: PreviewTriggerProps) {
  if (comingSoon) {
    return (
      <button
        type="button"
        onClick={(e: MouseEvent) => {
          e.preventDefault()
          onTrigger()
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        aria-label={ariaLabel}
        className={`appearance-none bg-transparent border-0 p-0 m-0 text-left cursor-pointer ${className ?? ''}`}
      >
        {children}
      </button>
    )
  }

  return (
    <Link href={href} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className={className}>
      {children}
    </Link>
  )
}
