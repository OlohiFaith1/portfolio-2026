'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { CaseStudyStats, type CaseStudyStat } from './CaseStudyStats'

export interface CaseStudyHeroProps {
  year: string
  org: string
  role: string
  title: string
  readTime: string
  heroImage: { src: string; alt: string }
  stats: CaseStudyStat[]
}

// Claude Design "Snow — Portfolio v2" case-study opening: a Back link +
// live "read time · scroll%" readout (own scroll listener, same technique
// as CaseStudyProgressRail — a plain window listener, since Lenis
// dispatches real native scroll events), then eyebrow/title/hero
// image/stats.
export function CaseStudyHero({ year, org, role, title, readTime, heroImage, stats }: CaseStudyHeroProps) {
  const percentRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = percentRef.current
    if (!el) return
    const onScroll = () => {
      const html = document.documentElement
      const max = html.scrollHeight - html.clientHeight
      const pct = max > 0 ? Math.round((window.scrollY / max) * 100) : 0
      el.textContent = `${readTime} · ${pct}%`
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [readTime])

  return (
    <>
      <div
        className="flex justify-between items-baseline flex-wrap"
        style={{ gap: 16, fontSize: 11, letterSpacing: '0.04em', color: 'var(--muted)' }}
      >
        <Link href="/work" className="inline-flex items-center" style={{ gap: 6 }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back
        </Link>
        <span ref={percentRef}>{readTime} · 0%</span>
      </div>

      <section style={{ paddingTop: 40 }}>
        <div className="font-mono" style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)' }}>
          {year} · {org} · {role}
        </div>
        <h1
          className="font-sans font-medium text-foreground"
          style={{ margin: '14px 0 0', fontSize: 'clamp(27px, 5vw, 36px)', lineHeight: 1.12, letterSpacing: '-0.03em' }}
        >
          {title}
        </h1>
        <div className="relative w-full" style={{ marginTop: 30, aspectRatio: '3 / 2', borderRadius: 14, overflow: 'hidden', background: 'var(--surface)' }}>
          <Image src={heroImage.src} alt={heroImage.alt} fill sizes="(min-width: 768px) 620px, 100vw" style={{ objectFit: 'cover' }} priority />
        </div>
        <CaseStudyStats stats={stats} />
      </section>
    </>
  )
}
