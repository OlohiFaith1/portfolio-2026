'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

// Claude Design "Snow — Portfolio v2" primary navigation — a fixed, centered
// bottom pill bar. This is the site's ONLY navigation now (replaces the old
// pre-work landing pill + NavigationDrawer), always visible on every route.
// The design's version toggles content within a single client-state tab;
// here each tab is a real route so deep-linking/back-forward/refresh all
// keep working — "active" is derived from the current pathname rather than
// local state.
const TABS = [
  { label: 'Work', href: '/work', isActive: (p: string) => p.startsWith('/work') },
  { label: 'Playground', href: '/playground', isActive: (p: string) => p === '/playground' },
  { label: 'Writing', href: '/writing', isActive: (p: string) => p === '/writing' },
  { label: 'About', href: '/about', isActive: (p: string) => p === '/about' },
] as const

export function Nav() {
  const pathname = usePathname()

  return (
    <nav
      aria-label="Primary"
      className="fixed bottom-[22px] left-1/2 -translate-x-1/2 z-30 flex gap-[3px] p-[5px] rounded-full"
      style={{
        background: 'rgba(251,250,249,0.86)',
        backdropFilter: 'blur(16px)',
        boxShadow: '0 1px 2px rgba(26,26,25,0.06), 0 8px 26px rgba(26,26,25,0.10)',
      }}
    >
      {TABS.map((tab) => {
        const active = tab.isActive(pathname)
        return (
          <Link
            key={tab.href}
            href={tab.href}
            data-magnet="7"
            aria-current={active ? 'page' : undefined}
            className="rounded-full font-mono text-[10.5px] tracking-[0.1em] uppercase"
            style={{
              padding: '9px 16px',
              background: active ? 'var(--foreground)' : 'transparent',
              color: active ? 'var(--background)' : 'var(--muted)',
              transition: 'background 220ms ease, color 220ms ease, transform 320ms cubic-bezier(0.34,1.56,0.64,1)',
            }}
          >
            {tab.label}
          </Link>
        )
      })}
    </nav>
  )
}
