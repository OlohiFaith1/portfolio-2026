'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { DraggableDotGrid } from './DraggableDotGrid'

type HoverWord = 'snow' | 'books' | 'sofadondo' | 'gym'

type Preview = { src: string; w: number; h: number; previewW: number }

// books is wide/landscape (4732×2044 ≈ 2.3:1), so needs a larger previewW
// to reach a comparable rendered height to the other three (~360px).
const PREVIEWS: Record<HoverWord, Preview> = {
  snow:      { src: '/images/about/ABOUT%20IMAGE%201.png', w: 3160, h: 2852, previewW: 420 },
  books:     { src: '/images/about/ABOUT%20IMAGE%202.png', w: 4732, h: 2044, previewW: 840 },
  sofadondo: { src: '/images/about/ABOUT%20IMAGE%203.png', w: 3268, h: 2852, previewW: 420 },
  gym:       { src: '/images/about/ABOUT%20IMAGE%204.png', w: 3160, h: 2852, previewW: 420 },
}

function displayHeight(p: Preview) {
  return Math.round(p.previewW * p.h / p.w)
}

export function AboutContent() {
  const [hoverCapable, setHoverCapable] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(hover: hover) and (pointer: fine)').matches
  })
  const [activeWord, setActiveWord] = useState<HoverWord | null>(null)
  // Keep last image in DOM so it fades out rather than popping
  const [previewImg, setPreviewImg] = useState<Preview | null>(null)
  const [previewPos, setPreviewPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const handler = (e: MediaQueryListEvent) => {
      setHoverCapable(e.matches)
      // Clear any active preview immediately when hover capability is lost
      // (e.g. switching to touch, or emulator changing pointer type).
      if (!e.matches) setActiveWord(null)
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const onEnter = (word: HoverWord) => (e: React.MouseEvent<HTMLSpanElement>) => {
    if (!hoverCapable) return
    const p = PREVIEWS[word]
    const rect = e.currentTarget.getBoundingClientRect()
    const dh = displayHeight(p)
    let x = rect.left + rect.width / 2 - p.previewW / 2
    let y = rect.top - dh - 16
    x = Math.max(8, Math.min(x, window.innerWidth - p.previewW - 8))
    if (y < 8) y = rect.bottom + 16
    setPreviewPos({ x, y })
    setPreviewImg(p)
    setActiveWord(word)
  }

  const onLeave = () => setActiveWord(null)

  const hw = (word: HoverWord) =>
    hoverCapable
      ? { onMouseEnter: onEnter(word), onMouseLeave: onLeave }
      : {}

  return (
    <>
      {/* Dim overlay — inside z:1 stacking context so nav drawer stays above */}
      <div
        aria-hidden="true"
        className="fixed inset-0 z-40 pointer-events-none"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: activeWord ? 'blur(5px)' : 'blur(0px)',
          WebkitBackdropFilter: activeWord ? 'blur(5px)' : 'blur(0px)',
          opacity: activeWord ? 1 : 0,
          transition: 'opacity 0.3s ease, backdrop-filter 0.3s ease',
        }}
      />

      {/* Floating image preview */}
      <div
        aria-hidden="true"
        className="fixed z-50 pointer-events-none"
        style={{
          left: previewPos.x,
          top: previewPos.y,
          width: previewImg?.previewW ?? 420,
          opacity: activeWord ? 1 : 0,
          transform: activeWord ? 'scale(1)' : 'scale(0.95)',
          transformOrigin: 'center bottom',
          transition: 'opacity 0.2s ease, transform 0.2s ease',
        }}
      >
        {previewImg && (
          <Image
            src={previewImg.src}
            alt=""
            width={previewImg.previewW}
            height={displayHeight(previewImg)}
            className="w-full h-auto block"
            sizes={`${previewImg.previewW}px`}
          />
        )}
      </div>

      {/* Same treatment as the landing page's own dot-grid background
          (DraggableDotGrid): a single opaque, normal-flow wrapper around the
          header image + body copy, load-bearing for CaseStudyFooter (fixed
          behind everything at z-0, meant to be revealed only once the user
          scrolls past this content) — so the occluding layer has to stay
          tied to scroll position rather than being a separate viewport-
          fixed layer. DraggableDotGrid is nested inside it, painted on top
          of this one shared backdrop so the pattern tiles continuously
          across both blocks with no seam at their boundary, with the actual
          content given its own stacking above it. */}
      <div className="relative" style={{ backgroundColor: 'var(--background)' }}>
        <DraggableDotGrid />
        <div className="relative" style={{ zIndex: 1 }}>
          {/* ── Header image ────────────────────────────────────────── */}
          {/* pt-* clears the peekng bookmark (74px lg / 54px sm) with breathing room */}
          <div className="w-full pt-[88px] md:pt-[88px] lg:pt-[112px] px-4 md:px-8 lg:px-16 xl:px-24">
            <Image
              src="/images/about/About%20Header%20Image.png"
              alt="Faith Olohijere"
              width={7132}
              height={4092}
              className="w-full h-auto block"
              sizes="(min-width: 1280px) calc(100vw - 192px), (min-width: 1024px) calc(100vw - 128px), (min-width: 768px) calc(100vw - 64px), calc(100vw - 32px)"
              priority
            />
          </div>

          {/* ── Body copy ───────────────────────────────────────────── */}
          <section className="w-full flex flex-col items-center px-6 md:px-12 pt-16 md:pt-24 lg:pt-[100px] pb-20 md:pb-28 lg:pb-36">

            <h1 className="font-display text-center text-[26px] md:text-[32px] lg:text-[40px] leading-[1.2] tracking-[-0.02em] text-foreground mb-8 md:mb-10 lg:mb-12">
              A little about me.
            </h1>

            <div
              className="flex flex-col text-center font-sans font-normal text-[#262626] text-[16px] md:text-[20px] lg:text-[24px] leading-[1.4]"
              style={{ maxWidth: 560, width: '100%', letterSpacing: '-0.02em', gap: '1.4em' }}
            >
              <p className="m-0">
                My name is Faith, but I&apos;d love if you called me{' '}
                <span
                  className="font-medium underline decoration-wavy decoration-[1.5px] underline-offset-[4px] decoration-[#262626]/35 cursor-default"
                  {...hw('snow')}
                >
                  Snow
                </span>
                {' '}(a nickname I&apos;ve had since my Bachelors).
              </p>

              <p className="m-0">
                Growing up as an only child meant I had to get comfortable entertaining myself, and that&apos;s probably why I fell in love with{' '}
                <span
                  className="font-medium underline decoration-wavy decoration-[1.5px] underline-offset-[4px] decoration-[#262626]/35 cursor-default"
                  {...hw('books')}
                >
                  books
                </span>
                {' '}so early; I&apos;m so curious about stories, spending hours getting lost in epic fantasy, especially stories with strong female leads, magic, and impossible quests. Throne of Glass still sits at the top of my list.
              </p>

              <p className="m-0">
                That same curiosity eventually led me to product design. For the past four years, I&apos;ve helped startups across fintech, crypto, AI, and civic technology build products people genuinely enjoy using.
              </p>

              <p className="m-0">
                Now, I&apos;m pursuing an MBA to better understand the business behind great products, while learning design engineering because I could not stop wondering what happens after the Figma file is handed over to a developer.
              </p>

              <p className="m-0">
                When I&apos;m not designing, I&apos;m usually building something I care about. I volunteer with{' '}
                <span
                  className="font-medium underline decoration-wavy decoration-[1.5px] underline-offset-[4px] decoration-[#262626]/35 cursor-default"
                  {...hw('sofadondo')}
                >
                  SOFADONDO
                </span>
                , advocating against sex-for-marks in higher institutions.
              </p>

              <p className="m-0">
                I&apos;m also building{' '}
                <a
                  href="https://lorelane.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-inherit no-underline about-link"
                >
                  Lorelane
                </a>
                , a daily game for readers to rediscover their favorite books through memorable quotes.
                <br />
                <br />
                In my extra, extra free time, I mentor designers, and also contribute to{' '}
                <a
                  href="https://www.freecodecamp.org/news/author/snowolohijere/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-inherit no-underline about-link"
                >
                  FreeCode Camp
                </a>
                {' '}as an author.
              </p>

              <p className="m-0">
                And if I&apos;m away from my laptop, and I&apos;m not reading, you&apos;ll probably find me at the{' '}
                <span
                  className="font-medium underline decoration-wavy decoration-[1.5px] underline-offset-[4px] decoration-[#262626]/35 cursor-default"
                  {...hw('gym')}
                >
                  gym
                </span>
                . I like the quiet discipline of showing up, putting in the work, and getting a little better every day. It&apos;s how I approach life, and it&apos;s how I approach design.
              </p>

              <p className="m-0">
                If you&apos;ve made it this far, I hope you find something here that makes you smile, think differently, or start building something of your own.
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
