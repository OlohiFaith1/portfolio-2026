'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { WORK_ENTERED_EVENT, ENTER_WORK_EVENT } from '@/lib/events'

const LINKS = [
  { label: 'Work',        href: '/work',       isWork: true },
  { label: 'About',       href: '/about'                    },
  { label: 'Discoveries', href: '/discoveries'              },
  { label: 'Travels',     href: '/travels'                  },
  { label: 'Playground',  href: '/playground'               },
]

// Rethink Sans Regular, tracking -1%, #5a5a5a
const ITEM = 'font-sans font-normal leading-[1.3] tracking-[-0.2px] sm:tracking-[-0.13px] lg:tracking-[-0.16px] text-[#5a5a5a] outline-none [-webkit-tap-highlight-color:transparent] text-[20px] sm:text-[13px] lg:text-[16px]'

export function Nav() {
  const pathname = usePathname()
  const [workEntered, setWorkEntered] = useState(false)

  // Listen for the work section being entered on this page
  useEffect(() => {
    const handler = () => setWorkEntered(true)
    window.addEventListener(WORK_ENTERED_EVENT, handler)
    return () => window.removeEventListener(WORK_ENTERED_EVENT, handler)
  }, [])

  // When the user navigates back to '/' (e.g. via a home link), reset so the
  // landing nav shows with the hero. Deferred so the setState happens inside a
  // callback, not synchronously in the effect body (react-hooks/set-state-in-effect).
  useEffect(() => {
    if (pathname !== '/') return
    const id = setTimeout(() => setWorkEntered(false), 0)
    return () => clearTimeout(id)
  }, [pathname])

  // Only visible on the landing page before the work section is entered
  if (pathname !== '/' || workEntered) return null

  const handleWork = (e: React.MouseEvent) => {
    e.preventDefault()
    window.dispatchEvent(new CustomEvent(ENTER_WORK_EVENT))
  }

  return (
    // pointer-events-none on the full-width fixed header so only the nav
    // items themselves block clicks (not the empty space around them).
    <header className="fixed top-[5svh] sm:top-[102px] left-0 right-0 z-50 flex justify-start sm:justify-center px-6 pointer-events-none">
      <nav
        aria-label="Landing navigation"
        className="flex flex-col items-start gap-y-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-y-0 sm:justify-center sm:gap-x-8 md:gap-x-12 lg:gap-x-[100px] pointer-events-auto"
      >
        {LINKS.map((link) =>
          link.isWork ? (
            <button key={link.label} type="button" onClick={handleWork} className={ITEM}>
              {link.label}
            </button>
          ) : (
            <Link key={link.label} href={link.href} className={ITEM}>
              {link.label}
            </Link>
          )
        )}
      </nav>
    </header>
  )
}
