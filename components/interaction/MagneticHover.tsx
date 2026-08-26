'use client'

import { useEffect } from 'react'

// Claude Design "Snow — Portfolio v2" magnetic hover — pulls any element
// carrying a `data-magnet="<max-px>"` attribute a few pixels toward the
// pointer while hovered; it snaps back via that element's own CSS
// `transition: transform ...` on mouseout (this component only ever sets/
// clears the inline transform, the springy return motion is each
// consumer's own existing transition). Desktop-only, and skipped entirely
// under prefers-reduced-motion since the whole effect is decorative
// movement with no functional purpose.
//
// Mounted once, globally, in the root layout — consumers just add
// `data-magnet="6"` (the number is the max pull distance in px) to an
// element that already has its own `transition: transform ...`. Apply it
// sparingly, only where the design actually uses it.
export function MagneticHover() {
  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduceMotion) return

    let magnet: HTMLElement | null = null

    const onMove = (e: MouseEvent) => {
      if (!magnet) return
      const r = magnet.getBoundingClientRect()
      const k = parseFloat(magnet.getAttribute('data-magnet') || '6')
      const dx = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (r.width / 2)))
      const dy = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (r.height / 2)))
      magnet.style.transform = `translate(${(dx * k).toFixed(2)}px, ${(dy * k * 0.7).toFixed(2)}px)`
    }

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const el = target.closest?.('[data-magnet]') as HTMLElement | null
      if (!el || el === magnet) return
      magnet = el
      window.addEventListener('mousemove', onMove, { passive: true })
    }

    const onOut = (e: MouseEvent) => {
      if (!magnet) return
      if (e.relatedTarget && magnet.contains(e.relatedTarget as Node)) return
      magnet.style.transform = ''
      magnet = null
      window.removeEventListener('mousemove', onMove)
    }

    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)

    return () => {
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return null
}
