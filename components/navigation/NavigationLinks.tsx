'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import type { DrawerMode } from './NavigationDrawer'
import { useNavigation } from '@/components/providers/NavigationProvider'
import { WORK_ENTERED_EVENT, ENTER_WORK_EVENT } from '@/lib/events'

const LINKS = [
  { label: 'Work',        href: '/work',       isWork: true  },
  { label: 'About',       href: '/about'                     },
  { label: 'Discoveries', href: '/discoveries'               },
  { label: 'Travels',     href: '/travels'                   },
  { label: 'Playground',  href: '/playground'                },
]

const LINK_BASE = 'block font-medium text-[28px] leading-[1.5] tracking-[-1px] text-[#fff] outline-none [-webkit-tap-highlight-color:transparent] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white'
const LINK_DESKTOP = `${LINK_BASE} w-[190px]`

interface Props {
  mode: DrawerMode
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

  // Active only on the /work project-preview page, or when the work section is
  // visible on '/' (URL replaced to /work via replaceState, but usePathname
  // still returns '/'). /work/azza and other case studies are NOT "on Work".
  const isWorkActive = pathname === '/work' || (pathname === '/' && workEntered)

  const handleWork = (e: React.MouseEvent) => {
    if (isWorkActive) {
      // Already viewing the work section — just close the drawer
      e.preventDefault()
      close()
    } else if (pathname === '/') {
      // Landing page with hero still visible — reveal work section in place,
      // ScrollGate.enter() will also replace the URL with /work
      e.preventDefault()
      window.dispatchEvent(new CustomEvent(ENTER_WORK_EVENT))
      close()
    }
    // Any other page (including /work/azza): let Link navigate to /work.
    // NavigationDrawer closes automatically on the resulting route change.
  }

  const handleLink = (e: React.MouseEvent, href: string) => {
    // Already on this page — just close the drawer, don't re-navigate
    if (pathname === href) {
      e.preventDefault()
      close()
    }
    // Otherwise let Next.js navigate; NavigationDrawer closes on route change
  }

  return (
    <nav
      aria-label="Portfolio navigation"
      className={mobile ? '' : 'absolute left-[59px] top-[48px]'}
    >
      <ul className="flex flex-col gap-[2px]">
        {LINKS.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className={mobile ? LINK_BASE : LINK_DESKTOP}
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
