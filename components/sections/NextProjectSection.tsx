'use client'

import { useEffect, useState } from 'react'
import type { MouseEvent } from 'react'
import Link from 'next/link'
import { getNextProject } from '@/lib/work-projects'

interface Props {
  /** The CURRENT case study's own slug — this always renders the project
   *  that comes after it in WORK_PROJECTS' own order (looping back to the
   *  first project after the last). */
  currentSlug: string
}

// Claude Design "Snow — Portfolio v2" Next Project row — a single
// clickable rounded row (project title + "Next →"), not the previous
// image-preview card. Still fully data-driven off WORK_PROJECTS via
// getNextProject, so it stays in lockstep with the Work Grid — no
// duplicate project data. Projects flagged comingSoon or comingSoonTag show
// "Coming soon" in place of "Next →" instead of navigating, matching the
// label-only treatment this compact row calls for (no room here for the
// sitewide image scrim/badge overlay).
export function NextProjectSection({ currentSlug }: Props) {
  const project = getNextProject(currentSlug)
  const { name, href, comingSoon, comingSoonTag } = project
  // Same combined status the Work Grid (ProjectGrid.tsx) uses: a project
  // stays non-navigable here whenever it's comingSoon OR only carries the
  // lighter comingSoonTag (real case study, not ready to open yet) — one
  // shared status per project, not a hardcoded per-slug exception.
  const isComingSoon = comingSoon || !!comingSoonTag
  const [hovered, setHovered] = useState(false)

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
    if (hoverCapable) setHovered(true)
  }
  const onMouseLeave = () => {
    if (hoverCapable) setHovered(false)
  }

  const rowStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    gap: 16,
    width: '100%',
    padding: '20px 18px',
    borderRadius: 12,
    background: hovered ? '#edeae6' : 'var(--surface)',
    transition: 'background 220ms ease',
    textDecoration: 'none',
    cursor: 'pointer',
    border: 'none',
    textAlign: 'left',
  }

  const content = (
    <>
      <span className="font-sans font-medium text-foreground" style={{ fontSize: 20, letterSpacing: '-0.02em' }}>
        {name}
      </span>
      <span
        className="font-mono text-[9.5px] tracking-[0.1em] uppercase whitespace-nowrap"
        style={{ color: 'var(--muted)', display: 'inline-flex', alignItems: 'center', gap: 4 }}
      >
        {isComingSoon ? (
          'Coming soon'
        ) : (
          <>
            Next
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </>
        )}
      </span>
    </>
  )

  return (
    // Full-width, opaque section — needed so it covers the fixed footer
    // (z-index 0) beneath it while in the viewport, same requirement every
    // other case-study section already has; the design's own narrow
    // column lives inside it.
    <section className="relative w-full" style={{ backgroundColor: 'var(--background)' }}>
      <div className="w-full max-w-[620px] mx-auto px-6" style={{ paddingTop: 52, paddingBottom: 24 }}>
        {isComingSoon ? (
          <button
            type="button"
            onClick={(e: MouseEvent) => e.preventDefault()}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            aria-label={`${name} — coming soon`}
            style={rowStyle}
          >
            {content}
          </button>
        ) : (
          <Link
            href={href}
            data-cursor="View project"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            aria-label={`View ${name} case study`}
            style={rowStyle}
          >
            {content}
          </Link>
        )}
      </div>
    </section>
  )
}
