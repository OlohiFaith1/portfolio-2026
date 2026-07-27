'use client'

import Lenis from 'lenis'
import { useEffect } from 'react'

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis()

    let rafId: number

    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    // When ScrollGate signals that the work section is entered, immediately
    // cancel any in-flight scroll animation so it doesn't fight the layout
    // collapse + scroll reset that follows.
    function onWorkEntered() {
      lenis.scrollTo(0, { immediate: true })
    }

    window.addEventListener('work-entered', onWorkEntered)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      window.removeEventListener('work-entered', onWorkEntered)
    }
  }, [])

  return <>{children}</>
}
