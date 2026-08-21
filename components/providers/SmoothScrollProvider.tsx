'use client'

import Lenis from 'lenis'
import { createContext, useContext, useCallback, useEffect, useMemo, useRef, type ReactNode } from 'react'

interface SmoothScrollContextValue {
  /** Smoothly scrolls the current document to the top via the shared Lenis instance. */
  scrollToTop: () => void
}

const SmoothScrollContext = createContext<SmoothScrollContextValue | null>(null)

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis()
    lenisRef.current = lenis

    let rafId: number

    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  const scrollToTop = useCallback(() => {
    lenisRef.current?.scrollTo(0)
  }, [])

  const value = useMemo(() => ({ scrollToTop }), [scrollToTop])

  return (
    <SmoothScrollContext.Provider value={value}>
      {children}
    </SmoothScrollContext.Provider>
  )
}

export function useSmoothScroll() {
  const ctx = useContext(SmoothScrollContext)
  if (!ctx) throw new Error('useSmoothScroll must be used within SmoothScrollProvider')
  return ctx
}
