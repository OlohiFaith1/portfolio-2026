'use client'

import { useEffect, useState } from 'react'
import { flushSync } from 'react-dom'
import { usePathname } from 'next/navigation'
import { useNavigation } from '@/components/providers/NavigationProvider'
import { WORK_ENTERED_EVENT } from '@/lib/events'

export function Nav() {
  const { isOpen, mode, open } = useNavigation()
  const pathname = usePathname()
  const [workEntered, setWorkEntered] = useState(false)

  useEffect(() => {
    // flushSync forces a synchronous re-render so the header unmounts in the
    // same frame the event fires, with no visible linger.
    const handler = () => flushSync(() => setWorkEntered(true))
    window.addEventListener(WORK_ENTERED_EVENT, handler)
    return () => window.removeEventListener(WORK_ENTERED_EVENT, handler)
  }, [])

  if (pathname !== '/' || workEntered) return null

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 pt-10 md:px-16 xl:px-24">
      <button
        type="button"
        onClick={() => open('navigation')}
        aria-expanded={isOpen && mode === 'navigation'}
        aria-haspopup="dialog"
        className="text-[16px] leading-[1.3] tracking-[-0.2px] text-muted font-normal"
      >
        Menu
      </button>
      <button
        type="button"
        onClick={() => open('contact')}
        aria-expanded={isOpen && mode === 'contact'}
        aria-haspopup="dialog"
        className="text-[16px] leading-[1.3] tracking-[-0.2px] text-muted font-normal"
      >
        Contact
      </button>
    </header>
  )
}
