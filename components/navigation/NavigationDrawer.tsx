'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useNavigation } from '@/components/providers/NavigationProvider'
import { DrawerContent } from './DrawerContent'
import { DrawerBookmark } from './DrawerBookmark'

// Re-export so existing child imports keep working
export type { DrawerMode } from '@/components/providers/NavigationProvider'

export function NavigationDrawer() {
  const { isOpen, mode, open, close } = useNavigation()
  const pathname = usePathname()
  const isLanding = pathname === '/'

  const prefersReducedMotion = useReducedMotion()
  const drawerRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  // On landing: hide everything when closed.
  // On other pages: slide up only the drawer panel; bookmark stays visible at the top.
  const closedY = isLanding ? '-100%' : 'calc(-82vh)'

  // Escape to close
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) close()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen, close])

  // Click outside to close
  useEffect(() => {
    if (!isOpen) return
    const timer = setTimeout(() => {
      function onPointerDown(e: PointerEvent) {
        if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
          close()
        }
      }
      document.addEventListener('pointerdown', onPointerDown)
      return () => document.removeEventListener('pointerdown', onPointerDown)
    }, 0)
    return () => clearTimeout(timer)
  }, [isOpen, close])

  // Focus management
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
      {/* Backdrop — blur + dim the page while drawer is open */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[99] pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            style={{
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
              backgroundColor: 'rgba(0,0,0,0.25)',
            }}
          />
        )}
      </AnimatePresence>

      <div
        ref={drawerRef}
        className="fixed left-0 right-0 top-0 z-[100] pointer-events-none"
        aria-hidden={!isOpen}
      >
        <motion.div
          initial={false}
          variants={variants}
          animate={isOpen ? 'open' : 'closed'}
        >
          <div role="dialog" aria-modal="true" aria-label="Navigation">
            <DrawerContent mode={mode} />
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
