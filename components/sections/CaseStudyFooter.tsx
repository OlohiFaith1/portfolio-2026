'use client'

import { useEffect, useRef, useLayoutEffect, useState } from 'react'
import { BackToTopButton } from './BackToTopButton'

// Claude Design "Snow — Portfolio v2" footer ("Connect"). The Resume
// destination is preserved exactly as it already was. LinkedIn/Dribbble
// are real existing/design-provided links; X (Twitter) was added
// alongside them, before LinkedIn.
const RESUME_HREF = 'https://drive.google.com/file/d/113db08By6ZZDhZIOnZxwofs3sUpyEEq5/view?usp=sharing'
const TWITTER_HREF = 'https://x.com/olohijerefaith'
const LINKEDIN_HREF = 'https://www.linkedin.com/in/faith-ijelekhai-57a96b213/'
const DRIBBBLE_HREF = 'https://dribbble.com/Faith-olohijere3'
const READING = {
  title: 'Throne of Glass',
  author: 'Sarah J. Maas',
  // The real cover Amazon serves for this exact listing (read directly off
  // the product page's #landingImage `data-old-hires`), hotlinked rather
  // than downloaded/re-hosted.
  coverSrc: 'https://m.media-amazon.com/images/I/81REJ3+rUOL._SL1500_.jpg',
}

const pillBase: React.CSSProperties = {
  border: 'none',
  borderRadius: 999,
  padding: '9px 15px',
  fontSize: 11,
  letterSpacing: '0.02em',
  transition: 'background 200ms ease',
  textDecoration: 'none',
  cursor: 'pointer',
}

function Pill({
  href,
  external,
  onClick,
  children,
  mono,
}: {
  href?: string
  external?: boolean
  onClick?: () => void
  children: React.ReactNode
  mono?: boolean
}) {
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
  const style: React.CSSProperties = {
    ...pillBase,
    background: hovered ? '#e9e6e1' : 'var(--surface)',
    color: mono ? 'var(--foreground)' : 'var(--body)',
    fontFamily: mono ? 'var(--font-mono)' : undefined,
  }
  const handlers = {
    onMouseEnter: () => hoverCapable && setHovered(true),
    onMouseLeave: () => hoverCapable && setHovered(false),
  }

  if (onClick) {
    return (
      <button type="button" onClick={onClick} style={style} {...handlers}>
        {children}
      </button>
    )
  }
  return (
    <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined} style={style} {...handlers}>
      {children}
    </a>
  )
}

function FooterContent() {
  const [copied, setCopied] = useState(false)
  const [bookHover, setBookHover] = useState(false)
  const [scrollable, setScrollable] = useState(true)
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

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

  useEffect(() => {
    const measure = () => setScrollable(document.documentElement.scrollHeight > window.innerHeight + 40)
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  useEffect(() => () => {
    if (toastTimer.current) clearTimeout(toastTimer.current)
  }, [])

  const copyEmail = async () => {
    const done = () => {
      setCopied(true)
      if (toastTimer.current) clearTimeout(toastTimer.current)
      toastTimer.current = setTimeout(() => setCopied(false), 1800)
    }
    try {
      await navigator.clipboard.writeText('olofaith3@gmail.com')
    } catch {
      // clipboard API unavailable — still confirm visually, nothing to retry
    }
    done()
  }

  return (
    // Bottom padding clears the fixed nav pill (bottom:22px, ~50px tall) so
    // its own bottom row never sits underneath it.
    <div className="w-full max-w-[620px] mx-auto" style={{ padding: '36px 24px 96px' }}>
      <div className="font-mono text-[10px] tracking-[0.14em] uppercase" style={{ color: 'var(--muted)' }}>
        Connect
      </div>
      <p className="font-sans" style={{ margin: '12px 0 16px', fontSize: 13.5, lineHeight: 1.72, color: 'var(--body)' }}>
        Always up for talking about product, books, advocacy, food recipes, and great user experience. Email is best.
      </p>

      <div className="flex flex-wrap" style={{ gap: 8 }}>
        <Pill onClick={copyEmail} mono>
          olofaith3@gmail.com
        </Pill>
        <Pill href={RESUME_HREF} external>
          Resume
        </Pill>
        <Pill href={TWITTER_HREF} external>
          X (Twitter)
        </Pill>
        <Pill href={LINKEDIN_HREF} external>
          LinkedIn
        </Pill>
        <Pill href={DRIBBBLE_HREF} external>
          Dribbble
        </Pill>
      </div>

      <div
        className="flex items-baseline flex-wrap"
        style={{ gap: 10, marginTop: 40, paddingTop: 24, borderTop: '1px solid var(--border)' }}
      >
        <span className="font-mono text-[9.5px] tracking-[0.12em] uppercase" style={{ color: 'var(--muted)' }}>
          Currently reading
        </span>
        <span className="relative inline-block">
          {bookHover && (
            <span
              className="absolute pointer-events-none"
              style={{ bottom: 'calc(100% + 12px)', left: '50%', transform: 'translateX(-50%)', zIndex: 40, width: 108 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={READING.coverSrc}
                alt={`${READING.title} book cover`}
                style={{
                  display: 'block',
                  width: '100%',
                  aspectRatio: '2 / 3',
                  borderRadius: 8,
                  objectFit: 'cover',
                  background: 'var(--surface)',
                  boxShadow: '0 8px 26px rgba(26,26,25,0.16)',
                }}
              />
            </span>
          )}
          <span
            onMouseEnter={() => hoverCapable && setBookHover(true)}
            onMouseLeave={() => hoverCapable && setBookHover(false)}
            style={{ fontSize: 13, color: 'var(--body)', borderBottom: '1px solid transparent', transition: 'border-color 200ms ease, color 200ms ease' }}
          >
            {READING.title}
          </span>
        </span>
        <span style={{ fontSize: 12, color: 'var(--muted)' }}>{READING.author}</span>
      </div>

      <div className="flex items-center justify-between flex-wrap" style={{ gap: 16, marginTop: 32 }}>
        <div className="font-mono text-[9.5px] tracking-[0.08em] uppercase" style={{ color: 'var(--muted)' }}>
          DESIGNED + BUILT BY SNOW (2026)
        </div>
        {scrollable && <BackToTopButton />}
      </div>

      {copied && (
        <div
          role="status"
          className="fixed left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.1em] uppercase rounded-full"
          style={{ bottom: 84, zIndex: 40, padding: '9px 15px', background: 'var(--foreground)', color: 'var(--background)' }}
        >
          Email copied
        </div>
      )}
    </div>
  )
}

interface CaseStudyFooterProps {
  /** Renders as a plain, always-in-flow footer at every breakpoint instead
   *  of the fixed bottom-drawer reveal below. The reveal trick depends on
   *  the content above it reliably exceeding the viewport's height — true
   *  for every tall, fixed-content case-study/list page this component is
   *  normally used on, but not guaranteed for a lighter page like the
   *  homepage (short viewport, wide monitor, zoomed-out browser), where it
   *  can bleed through mid-content instead of only revealing at the true
   *  end of the page. Opt in per page rather than changing the default,
   *  so every other call site's behavior is untouched. */
  alwaysInFlow?: boolean
}

export function CaseStudyFooter({ alwaysInFlow = false }: CaseStudyFooterProps) {
  const fixedFooterRef = useRef<HTMLElement>(null)
  const [spacerH, setSpacerH] = useState(0)

  // Mirror the fixed footer's height into the spacer so the page has exactly
  // enough scroll distance to fully reveal the footer underneath on md+.
  // On mobile the fixed footer is display:none so offsetHeight returns 0
  // and the spacer collapses — no effect on the in-flow mobile footer.
  useLayoutEffect(() => {
    if (alwaysInFlow) return
    const el = fixedFooterRef.current
    if (!el) return
    const update = () => setSpacerH(el.offsetHeight)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [alwaysInFlow])

  if (alwaysInFlow) {
    return (
      <footer style={{ backgroundColor: 'var(--background)', border: 'none' }}>
        <FooterContent />
      </footer>
    )
  }

  return (
    <>
      {/* Mobile: normal in-flow footer — no fixed positioning. */}
      <footer className="block md:hidden" style={{ backgroundColor: 'var(--background)', border: 'none' }}>
        <FooterContent />
      </footer>

      {/* Desktop/tablet: fixed bottom-drawer footer — sits at z-index 0, the
          case-study content wrapper (z-index 1) covers it while in the
          viewport, revealed once the user scrolls past the last section.
          This reveal mechanism is unchanged from before; only the content
          inside changed. */}
      <div className="hidden md:block" style={{ height: spacerH }} aria-hidden="true" />
      <footer
        ref={fixedFooterRef}
        className="hidden md:block"
        style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 0, backgroundColor: 'var(--background)', border: 'none' }}
      >
        <FooterContent />
      </footer>
    </>
  )
}
