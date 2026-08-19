'use client'

import { useRef, useLayoutEffect, useState } from 'react'

const QUOTE =
  `"You could rattle the stars," she whispered. "You could do anything, if only you dared. And deep down, you know it, too. That's what scares you most."`

const LINKS = [
  {
    label: 'Email',
    href: 'mailto:olofaith3@gmail.com',
    ariaLabel: 'Send an email to Faith',
    external: false,
  },
  {
    label: 'Resume',
    href: 'https://drive.google.com/file/d/113db08By6ZZDhZIOnZxwofs3sUpyEEq5/view?usp=sharing',
    ariaLabel: "View Faith's resume (opens in new tab)",
    external: true,
  },
  {
    label: 'X(Twitter)',
    href: 'https://x.com/olohijerefaith',
    ariaLabel: "Faith's profile on X, formerly Twitter (opens in new tab)",
    external: true,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/faith-ijelekhai-57a96b213/',
    ariaLabel: "Faith's LinkedIn profile (opens in new tab)",
    external: true,
  },
]

const baseText: React.CSSProperties = {
  fontWeight: 400,
  lineHeight: 1.3,
  margin: 0,
}

// Shared quote block — desktop/tablet (centered) vs mobile (left-aligned)
function QuoteBlock({ align }: { align: 'center' | 'left' }) {
  const centered = align === 'center'
  return (
    <div
      className={`flex flex-col ${centered ? 'items-center text-center' : 'items-start text-left'}`}
      style={{ gap: centered ? 40 : 28 }}
    >
      <p
        className={`font-sans text-white ${centered ? 'lg:max-w-[440px]' : ''}`}
        style={{ ...baseText, fontSize: 16, letterSpacing: '-0.16px' }}
      >
        {QUOTE}
      </p>
      <p className="font-sans" style={{ ...baseText, fontSize: 16, letterSpacing: '-0.16px' }}>
        <span className="text-neutral-500">–Sarah .J. Maas, </span>
        <span className="text-white">Throne of Glass</span>
      </p>
    </div>
  )
}

// Shared social links — desktop/tablet horizontal row vs mobile vertical stack
function SocialLinks({ variant }: { variant: 'desktop' | 'mobile' }) {
  return (
    <nav aria-label="Social links">
      <ul
        className={variant === 'mobile' ? 'flex flex-col items-start' : 'flex items-center'}
        style={{ margin: 0, padding: 0, listStyle: 'none', gap: variant === 'desktop' ? 72 : 24 }}
      >
        {LINKS.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              aria-label={link.ariaLabel}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              className="font-sans text-white"
              style={{ ...baseText, fontSize: 16, letterSpacing: '-0.16px', textDecoration: 'none' }}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export function CaseStudyFooter() {
  const fixedFooterRef = useRef<HTMLElement>(null)
  const [spacerH, setSpacerH] = useState(0)

  // Mirror the fixed footer's height into the spacer so the page has exactly
  // enough scroll distance to fully reveal the footer underneath on md+.
  // On mobile the fixed footer is display:none so offsetHeight returns 0
  // and the spacer collapses — no effect on the in-flow mobile footer.
  useLayoutEffect(() => {
    const el = fixedFooterRef.current
    if (!el) return
    const update = () => setSpacerH(el.offsetHeight)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <>
      {/* ── MOBILE (<768px): normal in-flow footer ─────────────────────────
          Scrolls with the page — no fixed positioning, no z-index tricks.
          Quote is desktop/tablet-only (see below) — mobile shows just the
          social links.
      ──────────────────────────────────────────────────────────────────── */}
      <footer
        className="block md:hidden"
        style={{ backgroundColor: '#080808', border: 'none' }}
      >
        <div
          className="flex flex-col"
          style={{
            paddingTop: 60,
            paddingBottom: 60,
            paddingLeft: 24,
            paddingRight: 24,
          }}
        >
          <SocialLinks variant="mobile" />
        </div>
      </footer>

      {/* ── DESKTOP + TABLET (≥768px): fixed bottom-drawer footer ──────────
          Sits at z-index 0; the case study content wrapper (z-index 1) covers
          it while in the viewport. Scrolling past the end reveals it.
          Spacer adds the scroll distance needed for a full reveal.
      ──────────────────────────────────────────────────────────────────── */}
      <div className="hidden md:block" style={{ height: spacerH }} aria-hidden="true" />

      <footer
        ref={fixedFooterRef}
        className="hidden md:block"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 0,
          backgroundColor: '#080808',
          border: 'none',
          boxShadow: '0 -2px 0 0 #080808',
        }}
      >
        <div
          className="flex flex-col items-center justify-between"
          style={{
            height: '90vh',
            paddingTop: 100,
            paddingBottom: 72,
            paddingLeft: 48,
            paddingRight: 48,
          }}
        >
          <QuoteBlock align="center" />
          <SocialLinks variant="desktop" />
        </div>
      </footer>
    </>
  )
}
