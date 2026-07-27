'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useNavigation } from '@/components/providers/NavigationProvider'
import { DrawerContent } from './DrawerContent'
import { DrawerBookmark } from './DrawerBookmark'

export type { DrawerMode } from '@/components/providers/NavigationProvider'

export function NavigationDrawer() {
  const { isOpen, mode, open, close } = useNavigation()
  const pathname = usePathname()
  const isLanding = pathname === '/'

  const prefersReducedMotion = useReducedMotion()
  const drawerRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  const closedY = isLanding ? '-100%' : 'calc(-82vh)'

  // Close when the route changes (e.g. clicking a nav link inside the drawer)
  useEffect(() => {
    close()
  }, [pathname, close])

  // Escape to close + Tab focus trap (combined to avoid two document listeners)
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!isOpen) return

      if (e.key === 'Escape') {
        close()
        return
      }

      if (e.key === 'Tab') {
        const focusable = drawerRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])'
        )
        if (!focusable || focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault()
            last.focus()
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault()
            first.focus()
          }
        }
      }
    }

    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen, close])

  // Focus management: move focus into the drawer on open, restore it on close
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement
      const timer = setTimeout(() => {
        const first = drawerRef.current?.querySelector<HTMLElement>(
          'a[href], button:not([disabled])'
        )
        first?.focus()
      }, 100)
      return () => clearTimeout(timer)
    } else {
      previousFocusRef.current?.focus()
    }
  }, [isOpen])

  const instant = { type: 'tween' as const, duration: 0.01 }
  const variants = prefersReducedMotion
    ? {
        open:   { y: '0%',    transition: instant },
        closed: { y: closedY, transition: instant },
      }
    : {
        open:   { y: '0%',    transition: { type: 'spring' as const, stiffness: 70, damping: 24, mass: 1 } },
        closed: { y: closedY, transition: { type: 'spring' as const, stiffness: 85, damping: 22, mass: 1 } },
      }

  return (
    <>
      {/*
        Backdrop: pointer-events-auto so the underlying page is not interactive
        while the drawer is open. onClick handles outside-click-to-close,
        replacing the old document-level pointerdown handler.
      */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            aria-hidden="true"
            className="fixed inset-0 z-[99]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            style={{
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
              backgroundColor: 'rgba(0,0,0,0.25)',
            }}
            onClick={close}
          />
        )}
      </AnimatePresence>

      {/*
        Outer container: no aria-hidden here so the bookmark button is always
        reachable by AT on inner pages (it is the only open trigger there).
      */}
      <div
        ref={drawerRef}
        className="fixed left-0 right-0 top-0 z-[100] pointer-events-none"
      >
        <motion.div
          initial={false}
          variants={variants}
          animate={isOpen ? 'open' : 'closed'}
        >
          {/* aria-hidden scoped to the dialog content only, not the bookmark */}
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
            aria-hidden={!isOpen}
          >
            <DrawerContent mode={mode} isPlaying={isOpen} />
          </div>
          <DrawerBookmark
            isOpen={isOpen}
            onToggle={() => (isOpen ? close() : open())}
            align={isLanding ? 'right' : 'center'}
          />
        </motion.div>
      </div>
    </>
  )
}
