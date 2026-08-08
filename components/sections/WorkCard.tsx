'use client'

import { useEffect, useRef, useState } from 'react'
import type { MouseEvent, ReactNode } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import type { WorkProject } from '@/lib/work-projects'
import { WorkCardVisual } from './WorkCardVisual'

interface Props {
  project: WorkProject
  /** True while a *different* card is hovered (desktop only) — blurs this one. */
  blurred: boolean
  onHoverChange: (hovered: boolean) => void
}

export function WorkCard({ project, blurred, onHoverChange }: Props) {
  const { name, tagline, href, comingSoon } = project
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

  // Blur is explicitly desktop-only (viewport, not just pointer type) so a
  // touch tap on a narrow window never triggers it — matches the lg
  // breakpoint used everywhere else in this app for desktop-specific UI.
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
    if (isDesktop) onHoverChange(true)
    if (comingSoon) setShowComingSoon(true)
  }
  const onMouseLeave = () => {
    if (!hoverCapable) return
    if (isDesktop) onHoverChange(false)
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
    <div
      className="flex flex-col items-start w-full gap-[10px] lg:gap-[20px]"
      style={{ filter: blurred ? 'blur(8px)' : 'blur(0px)', opacity: blurred ? 0.6 : 1, transition: 'filter 0.3s ease-in-out, opacity 0.3s ease-in-out' }}
    >
      {/* Visual — eye icon and image/visual share the same destination/action */}
      <Trigger
        comingSoon={comingSoon}
        href={href}
        onTrigger={triggerComingSoon}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        ariaLabel={comingSoon ? `${name} — coming soon` : `View ${name} case study`}
        className="relative w-full overflow-hidden block"
      >
        <div className="w-full" style={{ aspectRatio: '648/400' }}>
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

      {/* Title row — name · divider · tagline · eye icon */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <span className="font-display uppercase leading-[1.1] text-[16px] lg:text-[18px] text-[#262626] whitespace-nowrap">
            {name}
          </span>
          <span className="w-px h-[13px] lg:h-[26px] bg-[#e5e5e5]" aria-hidden="true" />
          <span
            className="font-sans font-medium leading-[1.3] text-[13px] lg:text-[16px] text-[#404040]"
            style={{ letterSpacing: '-0.16px' }}
          >
            {tagline}
          </span>
        </div>

        <Trigger
          comingSoon={comingSoon}
          href={href}
          onTrigger={triggerComingSoon}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          ariaLabel={comingSoon ? `${name} — coming soon` : `View ${name} case study`}
          className="shrink-0 block"
        >
          <Image src="/work/eye-icon.svg" alt="" width={24} height={24} className="w-[13px] h-[13px] lg:w-6 lg:h-6" aria-hidden="true" />
        </Trigger>
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
  ariaLabel: string
  children: ReactNode
}

// Same destination/action for the eye icon and the visual: real navigation
// when live, or the Coming Soon treatment when not — mirrors CaseStudySection's
// existing PreviewTrigger pattern.
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
