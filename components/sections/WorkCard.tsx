'use client'

import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, MouseEvent, ReactNode } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import type { WorkProject } from '@/lib/work-projects'
import { WorkCardVisual } from './WorkCardVisual'

interface Props {
  project: WorkProject
  /** Cover box aspect ratio as a CSS `aspect-ratio` value — Azza's own
   *  cover (921/666) differs from every other project's shared 3:2 box
   *  (450/300), per the redesigned Work Grid Figma frame. */
  aspectRatio: string
}

const HOVER_RADIUS = 32
const RADIUS_TRANSITION = 'border-radius 0.35s ease-in-out'

export function WorkCard({ project, aspectRatio }: Props) {
  const { name, year, type, href, comingSoon } = project
  const [showComingSoon, setShowComingSoon] = useState(false)
  // Desktop-hover-only — drives this card's own 32px radius reveal. Every
  // card uses the exact same treatment; there is no per-project variant.
  const [isHovered, setIsHovered] = useState(false)

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

  // Desktop-only (viewport, not just pointer type) so a touch tap on a
  // narrow window never triggers it — matches the lg breakpoint used
  // everywhere else in this app for desktop-specific UI.
  const [isDesktop, setIsDesktop] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(min-width: 1024px)').matches
  })
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const onMouseEnter = () => {
    if (!hoverCapable) return
    if (isDesktop) setIsHovered(true)
    if (comingSoon) setShowComingSoon(true)
  }
  const onMouseLeave = () => {
    if (!hoverCapable) return
    if (isDesktop) setIsHovered(false)
    if (comingSoon) setShowComingSoon(false)
  }

  // Touch devices have no hover — tapping shows the same Coming Soon state,
  // auto-hiding shortly after (matches CaseStudySection's existing pattern).
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
    <div className="flex flex-col items-start w-full gap-[10px] lg:gap-[20px]">
      <Trigger
        comingSoon={comingSoon}
        href={href}
        onTrigger={triggerComingSoon}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        ariaLabel={comingSoon ? `${name} — coming soon` : `View ${name} case study`}
        className="relative w-full block"
        style={{
          overflow: 'hidden',
          borderRadius: isHovered ? HOVER_RADIUS : 0,
          transition: RADIUS_TRANSITION,
          transform: 'translateZ(0)',
        }}
      >
        {/* Desktop hover rounds the Trigger itself to exactly 32px, smoothly
            — the cover image and the Coming Soon scrim/badge below all live
            inside this one boundary, so they clip together with no
            mismatch. No blur, no other effect. Identical for every project. */}
        <div className="w-full" style={{ aspectRatio }}>
          <WorkCardVisual slug={project.slug} />
        </div>

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
      </Trigger>

      {/* Metadata row — name (left) · year + type tags (right). No
          description/tagline and no separate eye-icon trigger — the
          redesigned Figma metadata row contains only these three fields. */}
      <div className="flex items-center justify-between w-full">
        <Trigger
          comingSoon={comingSoon}
          href={href}
          onTrigger={triggerComingSoon}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          ariaLabel={comingSoon ? `${name} — coming soon` : `View ${name} case study`}
          className="block"
        >
          <span className="font-display leading-[1.1] text-[16px] lg:text-[18px] text-[#262626] whitespace-nowrap">
            {name}
          </span>
        </Trigger>

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
    </div>
  )
}

interface TriggerProps {
  comingSoon: boolean
  href: string
  onTrigger: () => void
  onMouseEnter: () => void
  onMouseLeave: () => void
  className?: string
  style?: CSSProperties
  ariaLabel: string
  children: ReactNode
}

// Same destination/action wherever it's used: real navigation when live, or
// the Coming Soon treatment when not — mirrors CaseStudySection's existing
// PreviewTrigger pattern.
function Trigger({ comingSoon, href, onTrigger, onMouseEnter, onMouseLeave, className, style, ariaLabel, children }: TriggerProps) {
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
        style={style}
      >
        {children}
      </button>
    )
  }

  return (
    <Link href={href} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} aria-label={ariaLabel} className={className} style={style}>
      {children}
    </Link>
  )
}
