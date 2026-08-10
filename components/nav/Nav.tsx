'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { WORK_ENTERED_EVENT } from '@/lib/events'

// Rethink Sans Regular, tracking -1%, #5a5a5a
const ITEM = 'font-sans font-normal leading-[1.3] tracking-[-0.2px] sm:tracking-[-0.13px] lg:tracking-[-0.16px] text-[#5a5a5a] outline-none [-webkit-tap-highlight-color:transparent] text-[16px] sm:text-[13px] lg:text-[16px]'

export function Nav() {
  const pathname = usePathname()
  const router = useRouter()
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

  // Always goes to the Work grid, on every breakpoint — independent from
  // ScrollGate's own scroll/swipe gesture, which has its own (breakpoint-
  // specific) destination logic.
  const handleWork = (e: React.MouseEvent) => {
    e.preventDefault()
    router.push('/work')
  }

  return (
    // pointer-events-none on the full-width fixed header so only the nav
    // items themselves block clicks (not the empty space around them).
    // Centered at every breakpoint — only three short items now, so it reads
    // as a single grouped signature rather than a spread-out link bar.
    <header className="fixed top-[5svh] sm:top-[102px] left-0 right-0 z-50 flex justify-center px-6 pointer-events-none">
      <nav
        aria-label="Landing navigation"
        className="flex flex-row items-center gap-x-4 sm:gap-x-5 lg:gap-x-6 pointer-events-auto"
      >
        <button type="button" onClick={handleWork} className={ITEM}>
          Work
        </button>
        {/* Visual separator only — not a link, not focusable */}
        <span aria-hidden="true" className={ITEM}>
          ❄️
        </span>
        <Link href="/about" className={ITEM}>
          About
        </Link>
      </nav>
    </header>
  )
}
