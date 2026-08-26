'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { DraggableDotGrid } from './DraggableDotGrid'

// Claude Design "Snow — Portfolio v2" About section.
const EXPERIENCE = [
  { org: 'Azza', role: 'Founding Product Designer', years: '2024–2026' },
  { org: 'Blocverse', role: 'Product Designer', years: '2023–2026' },
  { org: 'Metafide', role: 'Product Designer', years: '2025–2026' },
  { org: 'Genesys', role: 'Product Design Intern', years: '2021–2022' },
] as const

const TOOLS = ['Figma', 'Cursor', 'ChatGPT', 'Framer', 'Linear', 'Miro', 'Trello', 'Claude']
const INTERESTS = ['Epic fantasy', 'Design engineering', 'Books', 'Design', 'Research', 'Teaching']

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono text-[10px] tracking-[0.14em] uppercase" style={{ color: 'var(--muted)' }}>
      {children}
    </div>
  )
}

function PillRow({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap" style={{ gap: 7, marginTop: 14 }}>
      {items.map((item) => (
        <span
          key={item}
          className="font-sans rounded-full"
          style={{ background: 'var(--surface)', padding: '8px 14px', fontSize: 11, color: 'var(--body)' }}
        >
          {item}
        </span>
      ))}
    </div>
  )
}

type HoverWord = 'snow' | 'books' | 'sofadondo' | 'gym'

type Preview = { src: string; w: number; h: number; previewW: number; caption?: string }

// books is wide/landscape (4732×2044 ≈ 2.3:1), so needs a larger previewW
// to reach a comparable rendered height to the other three (~360px).
const PREVIEWS: Record<HoverWord, Preview> = {
  snow: { src: '/images/about/ABOUT%20IMAGE%201.png', w: 3160, h: 2852, previewW: 420, caption: 'I like mirror pictures' },
  books: { src: '/images/about/ABOUT%20IMAGE%202.png', w: 4732, h: 2044, previewW: 840 },
  sofadondo: { src: '/images/about/ABOUT%20IMAGE%203.png', w: 3268, h: 2852, previewW: 420 },
  gym: { src: '/images/about/ABOUT%20IMAGE%204.png', w: 3160, h: 2852, previewW: 420 },
}

function displayHeight(p: Preview) {
  return Math.round((p.previewW * p.h) / p.w)
}

const wavyUnderline =
  'font-medium underline decoration-wavy decoration-[1.5px] underline-offset-[4px] cursor-default'

export function AboutContent() {
  // Hover-capable + fine pointer — same detection pattern used throughout
  // this codebase: gates whether hover or tap listeners are attached,
  // never the DOM tree shape itself. Hover-capable devices get the mouse
  // enter/leave reveal; everything else falls back to tap-to-toggle.
  const [hoverCapable, setHoverCapable] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(hover: hover) and (pointer: fine)').matches
  })
  // hoverCapable's real value is already known during the client's very
  // first render (unlike the server, which always sees `false`), so any
  // markup that forks on it directly would mismatch during hydration. This
  // gate keeps that fork's first paint identical to the server's, only
  // flipping the mobile layout on after hydration has finished.
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const useMobileLayout = mounted && !hoverCapable
  const [activeWord, setActiveWord] = useState<HoverWord | null>(null)
  // Keeps the last image mounted so it fades out rather than popping.
  const [previewImg, setPreviewImg] = useState<Preview | null>(null)
  const [previewPos, setPreviewPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const handler = (e: MediaQueryListEvent) => {
      setHoverCapable(e.matches)
      // Losing hover capability mid-session (e.g. switching to touch)
      // clears any active preview immediately.
      if (!e.matches) setActiveWord(null)
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const showPreview = (word: HoverWord, target: HTMLElement) => {
    const p = PREVIEWS[word]
    const rect = target.getBoundingClientRect()
    const dh = displayHeight(p)
    let x = rect.left + rect.width / 2 - p.previewW / 2
    let y = rect.top - dh - 16
    x = Math.max(8, Math.min(x, window.innerWidth - p.previewW - 8))
    if (y < 8) y = rect.bottom + 16
    setPreviewPos({ x, y })
    setPreviewImg(p)
    setActiveWord(word)
  }

  const onEnter = (word: HoverWord) => (e: React.MouseEvent<HTMLSpanElement>) => {
    if (!hoverCapable) return
    showPreview(word, e.currentTarget)
  }

  const onLeave = () => setActiveWord(null)

  // Touch/no-hover devices: tap toggles the same reveal a hover would show
  // on desktop — a second tap on the active word closes it.
  const onTap = (word: HoverWord) => (e: React.MouseEvent<HTMLSpanElement>) => {
    if (hoverCapable) return
    if (activeWord === word) {
      setActiveWord(null)
      return
    }
    showPreview(word, e.currentTarget)
  }

  const hw = (word: HoverWord) =>
    hoverCapable ? { onMouseEnter: onEnter(word), onMouseLeave: onLeave } : { onClick: onTap(word) }

  return (
    <>
      {/* Dim + blur overlay — same treatment as the Playground lightbox
          (rgba(26,26,25,0.72) + blur(6px)), the one real precedent for a
          full-page dim/blur reveal already in this design system. Same
          overlay for both input modes: activeWord is set on hover on
          hover-capable devices, and on tap-to-toggle everywhere else. */}
      <div
        aria-hidden="true"
        className="fixed inset-0 z-40"
        style={{
          backgroundColor: 'rgba(26,26,25,0.72)',
          backdropFilter: activeWord ? 'blur(6px)' : 'blur(0px)',
          WebkitBackdropFilter: activeWord ? 'blur(6px)' : 'blur(0px)',
          opacity: activeWord ? 1 : 0,
          // On touch devices this becomes the "tap outside to close" target
          // once a preview is open — the image sits above it (z-50) and
          // captures its own taps first, so tapping the image never reaches
          // this layer. Untouched on hover-capable devices (stays inert).
          pointerEvents: useMobileLayout && activeWord ? 'auto' : 'none',
          transition: 'opacity 0.3s ease, backdrop-filter 0.3s ease',
        }}
        onClick={() => {
          if (useMobileLayout) setActiveWord(null)
        }}
      />

      {/* Floating image preview — desktop keeps the original word-anchored
          popup untouched; touch devices get a separate, centered/responsive
          layout below so the revealed image always fits the viewport. */}
      {!useMobileLayout ? (
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
            <>
              <Image
                src={previewImg.src}
                alt=""
                width={previewImg.previewW}
                height={displayHeight(previewImg)}
                className="w-full h-auto block"
                style={{ borderRadius: 12, boxShadow: '0 20px 60px rgba(26,26,25,0.35)' }}
                sizes={`${previewImg.previewW}px`}
              />
              {previewImg.caption && (
                <div
                  className="font-mono text-center"
                  style={{ marginTop: 10, fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#efedea' }}
                >
                  {previewImg.caption}
                </div>
              )}
            </>
          )}
        </div>
      ) : (
        <div
          aria-hidden="true"
          className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center"
          style={{ padding: '56px 24px' }}
        >
          {previewImg && (
            <div
              style={{
                // Only this box (sized to the image) is clickable — taps on
                // it are "on the image" and must not close the preview;
                // taps anywhere else in the padded viewport fall through to
                // the overlay above, which closes it.
                pointerEvents: activeWord ? 'auto' : 'none',
                opacity: activeWord ? 1 : 0,
                transform: activeWord ? 'scale(1)' : 'scale(0.95)',
                transition: 'opacity 0.2s ease, transform 0.2s ease',
              }}
            >
              <Image
                src={previewImg.src}
                alt=""
                width={previewImg.previewW}
                height={displayHeight(previewImg)}
                className="block"
                style={{
                  width: 'auto',
                  height: 'auto',
                  // Never larger than the same previewW used for the desktop
                  // popup — without this cap, a wide-but-touch viewport
                  // (e.g. a tablet) would let 84vw exceed the intended
                  // design size instead of only ever scaling it down.
                  maxWidth: `min(84vw, ${previewImg.previewW}px)`,
                  maxHeight: '72vh',
                  borderRadius: 12,
                  boxShadow: '0 20px 60px rgba(26,26,25,0.35)',
                }}
                sizes="84vw"
              />
              {previewImg.caption && (
                <div
                  className="font-mono text-center"
                  style={{ marginTop: 10, fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#efedea' }}
                >
                  {previewImg.caption}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <div className="relative" style={{ backgroundColor: 'var(--background)' }}>
        <DraggableDotGrid />
        <div className="relative" style={{ zIndex: 1 }}>
          <section className="w-full max-w-[620px] mx-auto px-6" style={{ paddingTop: 64, paddingBottom: 44 }}>
            <Eyebrow>About</Eyebrow>
            <p className="font-sans" style={{ margin: '14px 0 0', fontSize: 13.5, lineHeight: 1.72, color: 'var(--body)' }}>
              I&apos;m Faith, but you can call me{' '}
              <span className={wavyUnderline} style={{ textDecorationColor: 'var(--accent)' }} {...hw('snow')}>
                Snow
              </span>{' '}
              (a nickname I&apos;ve had since my Bachelor&apos;s).
            </p>
            <p className="font-sans" style={{ margin: '14px 0 0', fontSize: 13.5, lineHeight: 1.72, color: 'var(--body)' }}>
              I&apos;ve spent four years designing across fintech, crypto, AI and civic tech. Now, I&apos;m
              pursuing an MBA, learning design engineering, and exploring what happens beyond the Figma file.
            </p>
            <p className="font-sans" style={{ margin: '14px 0 0', fontSize: 13.5, lineHeight: 1.72, color: 'var(--body)' }}>
              Outside design, I mentor, volunteer with an advocacy group called{' '}
              <span className={wavyUnderline} style={{ textDecorationColor: 'var(--accent)' }} {...hw('sofadondo')}>
                SOFADONDO
              </span>
              , write on freeCodeCamp, Medium, &amp; Substack, and build things I care about, most recently
              Lorelane, a game for readers. I&apos;ve always loved{' '}
              <span className={wavyUnderline} style={{ textDecorationColor: 'var(--accent)' }} {...hw('books')}>
                books
              </span>
              , especially epic fantasy, and I&apos;m usually reading when I&apos;m not designing or at the{' '}
              <span className={wavyUnderline} style={{ textDecorationColor: 'var(--accent)' }} {...hw('gym')}>
                gym
              </span>
              .
            </p>

            <div style={{ marginTop: 40 }}>
              <Eyebrow>Experience</Eyebrow>
            </div>
            <div className="flex flex-col" style={{ gap: 2, marginTop: 14 }}>
              {EXPERIENCE.map((e) => (
                <div key={e.org} className="flex justify-between items-center" style={{ gap: 16, padding: '13px 0' }}>
                  <span>
                    <span className="block font-sans font-medium text-foreground" style={{ fontSize: 16.5, letterSpacing: '-0.015em' }}>
                      {e.org}
                    </span>
                    <span className="block font-sans" style={{ marginTop: 4, fontSize: 12.5, lineHeight: 1.65, color: 'var(--muted)' }}>
                      {e.role}
                    </span>
                  </span>
                  <span className="whitespace-nowrap" style={{ fontSize: 10, color: 'var(--muted)' }}>
                    {e.years}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 36 }}>
              <Eyebrow>Tools</Eyebrow>
            </div>
            <PillRow items={TOOLS} />

            <div style={{ marginTop: 36 }}>
              <Eyebrow>Interests</Eyebrow>
            </div>
            <PillRow items={INTERESTS} />
          </section>
        </div>
      </div>
    </>
  )
}
