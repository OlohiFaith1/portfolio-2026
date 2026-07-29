'use client'

import { useRef, useLayoutEffect, useState } from 'react'

const QUOTE =
  `“You could rattle the stars,” she whispered. “You could do anything, if only you dared. And deep down, you know it, too. That’s what scares you most.”`

const LINKS = [
  {
    label: 'Email',
    href: 'mailto:olofaith3@gmail.com',
    ariaLabel: 'Send an email to Faith',
    external: false,
  },
  {
    label: 'Resume',
    href: 'https://drive.google.com/file/d/1AmhBOPDyqfbjLQfXfi6eIlme5IFPcqO4/view?usp=sharing',
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
    label: 'FreeCode Camp',
    href: 'https://www.freecodecamp.org/news/author/snowolohijere/',
    ariaLabel: "Faith's articles on freeCodeCamp (opens in new tab)",
    external: true,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/faith-ijelekhai',
    ariaLabel: "Faith's LinkedIn profile (opens in new tab)",
    external: true,
  },
]

const baseText: React.CSSProperties = {
  fontWeight: 400,
  lineHeight: 1.3,
  margin: 0,
}

export function CaseStudyFooter() {
  const footerRef = useRef<HTMLElement>(null)
  const [spacerH, setSpacerH] = useState(0)

  useLayoutEffect(() => {
    const el = footerRef.current
    if (!el) return
    const update = () => setSpacerH(el.offsetHeight)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <>
      {/* In-flow spacer — creates the scroll distance for the reveal */}
      <div style={{ height: spacerH }} aria-hidden="true" />

      {/*
        Fixed footer at z-index 0.
        The case study content wrapper (z-index 1) paints over this while in the
        viewport; scrolling to the bottom lifts the content and reveals the footer.
      */}
      <footer
        ref={footerRef}
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 0,
          backgroundColor: '#080808',
        }}
      >
        {/* ── DESKTOP & TABLET (≥768px) ──────────────────────────────────────── */}
        <div
          className="hidden md:flex flex-col items-center"
          style={{
            height: '70vh',
            justifyContent: 'space-between',
            paddingTop: 100,
            paddingBottom: 72,
            paddingLeft: 48,
            paddingRight: 48,
          }}
        >
          {/* Quote block — sits in the upper portion of the footer */}
          <div className="flex flex-col items-center text-center" style={{ gap: 40 }}>
            <p
              className="font-sans text-white lg:max-w-[440px]"
              style={{ ...baseText, fontSize: 16, letterSpacing: '-0.16px' }}
            >
              {QUOTE}
            </p>
            <p
              className="font-sans"
              style={{ ...baseText, fontSize: 16, letterSpacing: '-0.16px' }}
            >
              <span className="text-neutral-500">–Sarah .J. Maas, </span>
              <span className="text-white">Throne of Glass</span>
            </p>
          </div>

          {/* Social links — anchored to the bottom via justify-content: space-between */}
          <nav aria-label="Social links">
            <ul
              className="flex items-center"
              style={{ margin: 0, padding: 0, listStyle: 'none', gap: 72 }}
            >
              {LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    aria-label={link.ariaLabel}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="font-sans text-neutral-400 hover:text-white transition-colors duration-200"
                    style={{ ...baseText, fontSize: 16, letterSpacing: '-0.16px', textDecoration: 'none' }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* ── MOBILE (<768px) ────────────────────────────────────────────────── */}
        <div
          className="flex flex-col items-center md:hidden"
          style={{
            height: '70vh',
            justifyContent: 'space-between',
            paddingTop: 60,
            paddingBottom: 64,
            paddingLeft: 24,
            paddingRight: 24,
          }}
        >
          {/* Quote block */}
          <div className="flex flex-col items-center text-center" style={{ gap: 28 }}>
            <p
              className="font-sans text-white"
              style={{ ...baseText, fontSize: 16, letterSpacing: '-0.16px' }}
            >
              {QUOTE}
            </p>
            <p
              className="font-sans"
              style={{ ...baseText, fontSize: 16, letterSpacing: '-0.16px' }}
            >
              <span className="text-neutral-500">–Sarah .J. Maas, </span>
              <span className="text-white">Throne of Glass</span>
            </p>
          </div>

          {/* Social links — wrap on narrow viewports */}
          <nav aria-label="Social links">
            <ul
              className="flex flex-wrap justify-center"
              style={{ margin: 0, padding: 0, listStyle: 'none', gap: '16px 32px' }}
            >
              {LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    aria-label={link.ariaLabel}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="font-sans text-neutral-400 hover:text-white transition-colors duration-200"
                    style={{ ...baseText, fontSize: 16, letterSpacing: '-0.16px', textDecoration: 'none' }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </footer>
    </>
  )
}
