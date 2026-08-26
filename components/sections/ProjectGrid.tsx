'use client'

import { useEffect, useRef, useState } from 'react'
import type { MouseEvent, ReactNode } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { WORK_PROJECTS, type WorkProject } from '@/lib/work-projects'
import { WorkCardVisual } from './WorkCardVisual'

// Claude Design "Snow — Portfolio v2" project grid — the design's own
// "showWork" tab content, rendered on the homepage (SelectedWork.tsx is a
// thin wrapper around this) with the teal hover sweep, 5:4 cover, year
// label, and 2-line description. `heading` stays a prop so the eyebrow
// text isn't hardcoded to this one call site.
export function ProjectGrid({ heading }: { heading: string }) {
  return (
    <section style={{ paddingTop: 44 }}>
      <div className="font-mono text-[10px] tracking-[0.14em] uppercase" style={{ color: 'var(--muted)' }}>
        {heading}
      </div>
      {/* One project per row below lg (deterministic — not auto-fit, which
          could incidentally fit 2 at in-between widths and cause overflow
          combined with the -10px pullback below); exactly two per row at
          lg+, matching the existing lg breakpoint used throughout this
          codebase for desktop-only treatments. */}
      <div
        className="grid grid-cols-1 lg:grid-cols-2"
        style={{ gap: 4, margin: '16px -10px 0' }}
      >
        {WORK_PROJECTS.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  )
}

function ProjectCard({ project }: { project: WorkProject }) {
  const { slug, name, year, line, href, comingSoon, comingSoonTag } = project
  // comingSoonTag shows the same hover tag as comingSoon, but the project
  // still links out normally — Trigger/dataCursor/ariaLabel below stay
  // keyed on `comingSoon` alone so that behavior is untouched.
  const showTag = comingSoon || !!comingSoonTag
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
    if (showTag) setShowComingSoon(true)
  }
  const onMouseLeave = () => {
    if (!hoverCapable) return
    setIsHovered(false)
    if (showTag) setShowComingSoon(false)
  }

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
    <Trigger
      comingSoon={showTag}
      href={href}
      onTrigger={triggerComingSoon}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      dataCursor={showTag ? undefined : 'View project'}
      ariaLabel={showTag ? `${name} — coming soon` : `View ${name} case study`}
      style={{ position: 'relative', display: 'block', padding: 10, borderRadius: 14, overflow: 'hidden' }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(31,111,92,0.11)',
          transformOrigin: '0 50%',
          transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
          transition: 'transform 460ms cubic-bezier(0.65,0,0.35,1)',
        }}
      />

      <div
        className="relative"
        style={{ aspectRatio: '5 / 4', borderRadius: 8, overflow: 'hidden', background: 'var(--surface)' }}
      >
        <WorkCardVisual slug={slug} />

        {showTag && (
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

      <div className="relative flex justify-between items-baseline gap-3" style={{ marginTop: 12 }}>
        <span className="font-sans font-medium text-foreground" style={{ fontSize: 17, letterSpacing: '-0.02em' }}>
          {name}
        </span>
        <span className="font-sans whitespace-nowrap" style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '0.04em' }}>
          {year}
        </span>
      </div>

      {line && (
        <div
          className="relative font-sans"
          style={{
            marginTop: 5,
            fontSize: 12.5,
            lineHeight: 1.65,
            color: 'var(--body)',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {line}
        </div>
      )}
    </Trigger>
  )
}

interface TriggerProps {
  comingSoon: boolean
  href: string
  onTrigger: () => void
  onMouseEnter: () => void
  onMouseLeave: () => void
  dataCursor?: string
  ariaLabel: string
  style: React.CSSProperties
  children: ReactNode
}

// Same Link-when-live / button-when-comingSoon pattern already established
// by NextProjectSection.tsx.
function Trigger({ comingSoon, href, onTrigger, onMouseEnter, onMouseLeave, dataCursor, ariaLabel, style, children }: TriggerProps) {
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
        className="appearance-none bg-transparent border-0 text-left cursor-pointer w-full"
        style={style}
      >
        {children}
      </button>
    )
  }

  return (
    <Link
      href={href}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      aria-label={ariaLabel}
      data-cursor={dataCursor}
      style={style}
    >
      {children}
    </Link>
  )
}
