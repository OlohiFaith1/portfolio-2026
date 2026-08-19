'use client'

import { useState, useEffect, useRef } from 'react'
import type { ComponentType, ReactNode, MouseEvent } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { AnimatedRightArrow } from './AnimatedRightArrow'

/** Desktop-hover background reveal behind the mockup — tint color + a positioned artwork image. */
export interface HoverArtwork {
  src: string
  /** Number = px. String is used verbatim (e.g. a calc() expression, or a
   *  percentage for a full-bleed artwork that should scale with the
   *  section itself, for viewport-relative placement). */
  left: number | string
  top: number | string
  width: number | string
  height: number | string
  /** CSS blur radius in px applied to the artwork layer. Omit for none. */
  blur?: number
}

/** Name/role/year text color while hovered — omit to leave text color untouched (Azza). */
export interface HoverTextColors {
  name: string
  meta: string
}

// Azza's own hover values — kept as the defaults so its call site needs no props.
const DEFAULT_HOVER_TINT_COLOR = '#D8BAFF'
const DEFAULT_HOVER_ARTWORK: HoverArtwork = {
  src: '/azza/bg-artwork.svg',
  left: -323,
  top: -232,
  width: 1893,
  height: 1520,
  blur: 32,
}

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
  /** Desktop-only hover reveal behind the mockup. Defaults to Azza's tint + artwork. */
  hoverTintColor?: string
  hoverArtwork?: HoverArtwork
  /** Desktop-only hover reveal — project metadata text color. Omit to leave text color unchanged. */
  hoverTextColors?: HoverTextColors
  /** Desktop-only hover reveal — "Next" arrow icon override (e.g. a white variant matching hoverTextColors). Omit to leave it unchanged. */
  hoverArrowSrc?: string
  /** Mobile-only role text width cap (px) so it wraps onto its intended lines within the mobile column. Omit to leave it unconstrained (natural width). Desktop/tablet are unaffected. */
  mobileRoleMaxWidth?: number
}

export function CaseStudySection({
  href,
  name,
  role,
  year,
  nextHref,
  Mockup,
  comingSoon = false,
  hoverTintColor = DEFAULT_HOVER_TINT_COLOR,
  hoverArtwork = DEFAULT_HOVER_ARTWORK,
  hoverTextColors,
  hoverArrowSrc,
  mobileRoleMaxWidth,
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

  // Mockup hover: live projects tint the background + reveal artwork; a
  // comingSoon project darkens with a "Coming Soon" tag instead. Only one
  // of the two states applies.
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
          {/* Tint layer — covers dot-grid with the project's hover color on phone hover */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ backgroundColor: hoverTintColor }}
            initial={false}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          />

          {/*
            Background artwork — Figma asset exported from each project's own
            "Hover" frame. Section overflow-hidden clips it at all viewport sizes.
          */}
          <motion.div
            className="absolute pointer-events-none"
            style={{
              left: hoverArtwork.left,
              top: hoverArtwork.top,
              width: hoverArtwork.width,
              height: hoverArtwork.height,
              filter: hoverArtwork.blur ? `blur(${hoverArtwork.blur}px)` : undefined,
            }}
            initial={false}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            aria-hidden="true"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={hoverArtwork.src}
              alt=""
              style={{ display: 'block', width: '100%', height: '100%' }}
            />
          </motion.div>
        </>
      )}

      {/* ── MOBILE layout (<md) ─────────────────────────────────────────────
          Fixed gap-y between the three items (rather than the viewport-
          dependent gaps justify-evenly produced) so spacing stays consistent
          across device heights; justify-center keeps the group balanced
          within the remaining space. pt-[54px] offsets for the bookmark.
      ──────────────────────────────────────────────────────────────────── */}
      <div className="md:hidden flex flex-col items-center justify-center gap-y-12 w-full px-6 pt-[54px] h-[100svh]">

        {/* 1. Project info */}
        <div className="flex flex-col items-center text-center">
          <PreviewTrigger comingSoon={comingSoon} href={href} onTrigger={triggerComingSoon}>
            <span className="font-display text-[24px] leading-[1.1] text-foreground">
              {name}
            </span>
          </PreviewTrigger>
          <span
            className="font-sans font-normal leading-[1.3] text-[#5a5a5a] mt-3"
            style={{
              fontSize: 16,
              letterSpacing: '-0.16px',
              whiteSpace: 'pre-line',
              maxWidth: mobileRoleMaxWidth,
            }}
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

        {/* 2. Phone mockup — no hover wiring: the reveal is desktop-only and this
            layout only ever renders on touch/narrow viewports (see the lg:-only
            PreviewTrigger below), so it must never be able to trigger it. */}
        <div className="flex justify-center">
          <PreviewTrigger
            comingSoon={comingSoon}
            href={href}
            onTrigger={triggerComingSoon}
            ariaLabel={comingSoon ? `${name} — coming soon` : undefined}
          >
            <Mockup className="h-[48vh]" />
          </PreviewTrigger>
        </div>

        {/* 3. Next → */}
        <Link
          href={nextHref}
          aria-label="Next project"
          className="flex items-center justify-center gap-2"
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

        {/* 2. Phone mockup — no hover wiring, same reasoning as the mobile layout above. */}
        <div className="flex justify-center">
          <PreviewTrigger
            comingSoon={comingSoon}
            href={href}
            onTrigger={triggerComingSoon}
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
              style={{
                fontSize: 20,
                color: hoverTextColors ? (hovered ? hoverTextColors.name : undefined) : undefined,
                transition: hoverTextColors ? 'color 0.6s ease-in-out' : undefined,
              }}
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
          style={{
            fontSize: 16,
            letterSpacing: '-0.16px',
            width: 191,
            display: 'block',
            whiteSpace: 'pre-line',
            color: hoverTextColors ? (hovered ? hoverTextColors.meta : undefined) : undefined,
            transition: hoverTextColors ? 'color 0.6s ease-in-out' : undefined,
          }}
        >
          {role}
        </span>
        <span
          className="font-sans font-normal leading-[1.3] text-[#5a5a5a] whitespace-nowrap"
          style={{
            fontSize: 16,
            letterSpacing: '-0.16px',
            color: hoverTextColors ? (hovered ? hoverTextColors.meta : undefined) : undefined,
            transition: hoverTextColors ? 'color 0.6s ease-in-out' : undefined,
          }}
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
      <AnimatedRightArrow
        href={nextHref}
        color={hovered ? hoverTextColors?.name : undefined}
        arrowSrc={hovered ? hoverArrowSrc : undefined}
      />

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
