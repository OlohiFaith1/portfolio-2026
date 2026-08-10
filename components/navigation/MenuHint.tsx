'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { usePathname } from 'next/navigation'

const AUTO_DISMISS_MS = 20000

/**
 * Desktop-only tooltip that points at the bookmark once the Work grid is
 * reached. Dismissal (via X or the 20s timeout) is tracked in state that is
 * never reset, so — since this component lives in the persistent root layout —
 * it will not reappear for the rest of the page session even if the user
 * navigates back to /work later.
 */
export function MenuHint() {
  const pathname = usePathname()
  const [dismissed, setDismissed] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const visible = pathname === '/work' && !dismissed

  useEffect(() => {
    if (!visible) return
    timeoutRef.current = setTimeout(() => setDismissed(true), AUTO_DISMISS_MS)
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [visible])

  return (
    <div className="hidden lg:block fixed top-[82px] right-[61px] z-[90] pointer-events-none">
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="pointer-events-auto flex items-center gap-2 rounded-full bg-white shadow px-3 py-2"
          >
            <span className="font-sans font-medium text-[12px] leading-none tracking-[-0.16px] text-[#5a5a5a] whitespace-nowrap">
              Click to view menu
            </span>
            <button
              type="button"
              onClick={() => setDismissed(true)}
              aria-label="Dismiss hint"
              className="flex items-center justify-center size-4 shrink-0 text-[#5a5a5a] outline-none [-webkit-tap-highlight-color:transparent] hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
            >
              <svg viewBox="0 0 10 10" width={10} height={10} aria-hidden="true">
                <path d="M1 1L9 9M9 1L1 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
