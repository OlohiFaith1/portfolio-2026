'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useNavigation } from '@/components/providers/NavigationProvider'
import { WORK_ENTERED_EVENT } from '@/lib/events'

const LINKS = [
  { label: 'Work',        href: '/work',       isWork: true  },
  { label: 'About',       href: '/about'                     },
  { label: 'Discoveries', href: '/discoveries'               },
  { label: 'Travels',     href: '/travels'                   },
  { label: 'Playground',  href: '/playground'                },
]

interface Props {
  mobile?: boolean
}

export function NavigationLinks({ mobile = false }: Props) {
  const pathname = usePathname()
  const { close } = useNavigation()
  const [workEntered, setWorkEntered] = useState(false)

  useEffect(() => {
    const handler = () => setWorkEntered(true)
    window.addEventListener(WORK_ENTERED_EVENT, handler)
    return () => window.removeEventListener(WORK_ENTERED_EVENT, handler)
  }, [])

  const isWorkActive = pathname === '/work' || (pathname === '/' && workEntered)

  function isActive(link: typeof LINKS[0]) {
    return link.isWork ? isWorkActive : pathname === link.href
  }

  // Drawer "Work" always goes to the dedicated Work grid route — the landing
  // page's own scroll-triggered one-by-one flow (Nav.tsx's separate pre-scroll
  // bar) is untouched. Only skip navigation when the router is actually on
  // /work already; being scrolled into the landing page's pseudo-work section
  // (pathname still '/', ScrollGate only did a history.replaceState, not a
  // real route change) must NOT short-circuit this into just closing the
  // drawer — the grid still needs to actually mount. Everywhere else the Link
  // navigates normally and NavigationDrawer's own pathname-change effect
  // closes the drawer, same as every other link.
  const handleWork = (e: React.MouseEvent) => {
    if (pathname === '/work') {
      e.preventDefault()
      close()
    }
  }

  const handleLink = (e: React.MouseEvent, href: string) => {
    if (pathname === href) {
      e.preventDefault()
      close()
    }
  }

  function linkClass(link: typeof LINKS[0]) {
    const base = 'font-sans font-normal text-[#262626] outline-none [-webkit-tap-highlight-color:transparent] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current'
    const sizeDesktop = 'text-[16px] leading-[1.5] tracking-[-0.16px] whitespace-nowrap'
    const sizeMobile = 'text-[20px] leading-[1.4] tracking-[-0.2px]'
    const active = isActive(link) ? 'underline underline-offset-4 decoration-1' : ''
    return [base, mobile ? sizeMobile : sizeDesktop, active].filter(Boolean).join(' ')
  }

  return (
    <nav aria-label="Portfolio navigation">
      <ul className={`flex ${mobile ? 'flex-col gap-[16px]' : 'flex-row gap-[24px]'}`}>
        {LINKS.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className={linkClass(link)}
              onClick={link.isWork ? handleWork : (e) => handleLink(e, link.href)}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
