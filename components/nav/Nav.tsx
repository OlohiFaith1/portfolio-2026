'use client'

import { usePathname } from 'next/navigation'
import { useNavigation } from '@/components/providers/NavigationProvider'

export function Nav() {
  const { isOpen, open } = useNavigation()
  const pathname = usePathname()

  if (pathname !== '/') return null

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 pt-10 md:px-16 xl:px-24">
      <button
        type="button"
        onClick={() => open('navigation')}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        className="text-[16px] leading-[1.3] tracking-[-0.2px] text-muted font-normal"
      >
        Menu
      </button>
      <button
        type="button"
        onClick={() => open('contact')}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        className="text-[16px] leading-[1.3] tracking-[-0.2px] text-muted font-normal"
      >
        Contact
      </button>
    </header>
  )
}
