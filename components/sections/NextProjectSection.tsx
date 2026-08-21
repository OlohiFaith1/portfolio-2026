'use client'

import { useEffect, useRef, useState } from 'react'
import type { MouseEvent, ReactNode } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { getNextProject } from '@/lib/work-projects'
import { WorkCardVisual } from './WorkCardVisual'

interface Props {
  /** The CURRENT case study's own slug — the section it renders is always
   *  the project that comes after it in WORK_PROJECTS' own order (looping
   *  back to the first project after the last). */
  currentSlug: string
}

// Figma "SyncWatch 10" (550:44474) — the closing transition between a case
// study's own content and the shared footer: a full-bleed divider, then a
// "Next Project" label beside a clickable project card. The card reuses
// the Work Grid's own project data (lib/work-projects.ts) and cover art
// (WorkCardVisual) rather than duplicating either, and its metadata-row
// styling (name + year/type pill tags) matches WorkCard.tsx's own exactly
// — Figma's values for that row are identical to WorkCard's already-coded
// ones. The 690x650 image box and 36vw-of-1920-scaling card width are
// specific to this section (distinct from the Work Grid's own 3:2 cards).
//
// No separate mobile/tablet frame exists in Figma for this section, so
// below `lg` it stacks (label above card, full-width) using the same
// padding tiers (24/48/24 px) and 32px hover-radius reveal already
// established by WorkCard.tsx and this codebase's other case-study
// sections (e.g. SyncWatchStudy8's own 24/48/24 + 80/64/48 tiering).
const HOVER_RADIUS = 32
const RADIUS_TRANSITION = 'border-radius 0.35s ease-in-out'
const CARD_ASPECT_RATIO = '690/650'

export function NextProjectSection({ currentSlug }: Props) {
  const project = getNextProject(currentSlug)
  const { slug, name, year, type, href, comingSoon } = project

  const [isHovered, setIsHovered] = useState(false)
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

  const onMouseEnter = () => {
    if (!hoverCapable) return
    setIsHovered(true)
    if (comingSoon) setShowComingSoon(true)
  }
  const onMouseLeave = () => {
    if (!hoverCapable) return
    setIsHovered(false)
    if (comingSoon) setShowComingSoon(false)
  }

  // Touch devices have no hover — tapping shows the same Coming Soon state,
  // auto-hiding shortly after (matches WorkCard's/CaseStudySection's
  // existing pattern).
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
    <section
      className="relative bg-white"
      style={{
        backgroundImage: 'radial-gradient(circle, #d8d8d8 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        overflowX: 'hidden',
      }}
    >
      {/* Full-bleed divider — deliberately outside the padded content div
          below so it spans edge-to-edge, matching Figma's own composition
          (the divider bleeds past the inset content column to the section's
          true edges). */}
      <div style={{ borderTop: '1px solid #d4d4d4' }} aria-hidden="true" />

      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 lg:gap-0 px-6 md:px-12 lg:px-6 pt-12 md:pt-16 lg:pt-20 pb-16 md:pb-20 lg:pb-[120px]">
        <span className="font-display text-[24px] leading-[1.5] text-[#262626]">
          Next Project
        </span>

        <Trigger
          comingSoon={comingSoon}
          href={href}
          onTrigger={triggerComingSoon}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          ariaLabel={comingSoon ? `${name} — coming soon` : `View ${name} case study`}
          className="flex flex-col gap-[20px] w-full lg:w-[36vw] lg:max-w-[690px]"
        >
          <div
            className="relative w-full overflow-hidden"
            style={{
              aspectRatio: CARD_ASPECT_RATIO,
              borderRadius: isHovered ? HOVER_RADIUS : 0,
              transition: RADIUS_TRANSITION,
              transform: 'translateZ(0)',
            }}
          >
            <WorkCardVisual slug={slug} />

            {comingSoon && (
              <>
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
          </div>

          <div className="flex items-center justify-between w-full">
            <span className="font-display leading-[1.1] text-[16px] lg:text-[18px] text-[#262626] whitespace-nowrap">
              {name}
            </span>
            <div className="flex items-center gap-[8px]">
              <span
                className="font-sans font-medium leading-[1.3] text-[12px] lg:text-[14px] text-[#404040] whitespace-nowrap border border-[#d4d4d4] rounded-[2px]"
                style={{ letterSpacing: '-0.14px', padding: '4px 6px' }}
              >
                {year}
              </span>
              <span
                className="font-sans font-medium leading-[1.3] text-[12px] lg:text-[14px] text-[#404040] whitespace-nowrap border border-[#d4d4d4] rounded-[2px]"
                style={{ letterSpacing: '-0.14px', padding: '4px 6px' }}
              >
                {type}
              </span>
            </div>
          </div>
        </Trigger>
      </div>
    </section>
  )
}

interface TriggerProps {
  comingSoon: boolean
  href: string
  onTrigger: () => void
  onMouseEnter: () => void
  onMouseLeave: () => void
  className?: string
  ariaLabel: string
  children: ReactNode
}

// The entire card (image + metadata row) is one clickable area — a real
// navigating Link when the next project is live, or a non-navigating
// button showing the Coming Soon state when it isn't. Mirrors WorkCard's
// and CaseStudySection's own existing Trigger pattern.
function Trigger({ comingSoon, href, onTrigger, onMouseEnter, onMouseLeave, className, ariaLabel, children }: TriggerProps) {
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
    <Link href={href} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} aria-label={ariaLabel} className={className}>
      {children}
    </Link>
  )
}
