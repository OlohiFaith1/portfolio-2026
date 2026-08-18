'use client'

import { useRef, useLayoutEffect, useState } from 'react'
import type { ReactNode } from 'react'

interface Props {
  nativeWidth: number
  nativeHeight: number
  /** Tailwind height class(es), e.g. "h-[50vh] md:h-[60vh] lg:h-[77vh]" */
  className?: string
  children: ReactNode
}

/**
 * Scales a fixed-size mockup frame to fit its container, measuring
 * synchronously before paint (useLayoutEffect) so it never flashes at
 * native size on first render. ResizeObserver covers viewport size changes
 * that don't fire window resize (e.g. mobile browser chrome appearing/
 * disappearing).
 *
 * Scale is capped by both height and width. For every existing consumer
 * (Azza/Mercado/SyncWatch's portrait phone mockups) the flex-centered
 * container always has more width than a height-driven scale needs, so
 * offsetWidth/nativeWidth is mathematically identical to the height-driven
 * ratio there — a no-op. It only starts binding for a mockup wider relative
 * to its height (e.g. a landscape browser-window frame), where it prevents
 * overflowing a narrow viewport instead of just relying on maxHeight.
 *
 * The width cap has to be a viewport unit, not a percentage: the section
 * that hosts this (CaseStudySection) centers its mobile/tablet content with
 * `align-items: center`, not `stretch`, so a flex/aspect-ratio child is
 * never actually constrained by its container's width — percentages here
 * resolve against nothing and get ignored. `calc(100vw - 48px)` matches
 * CaseStudySection's own `px-6` (24px) side padding on those layouts.
 */
export function PhoneMockupScale({ nativeWidth, nativeHeight, className = '', children }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useLayoutEffect(() => {
    const update = () => {
      if (wrapRef.current) {
        const { offsetWidth, offsetHeight } = wrapRef.current
        setScale(Math.min(offsetHeight / nativeHeight, offsetWidth / nativeWidth))
      }
    }
    update()
    const ro = new ResizeObserver(update)
    if (wrapRef.current) ro.observe(wrapRef.current)
    return () => ro.disconnect()
  }, [nativeWidth, nativeHeight])

  return (
    <div
      ref={wrapRef}
      className={`relative ${className}`}
      style={{ maxHeight: nativeHeight, maxWidth: 'calc(100vw - 48px)', aspectRatio: `${nativeWidth}/${nativeHeight}` }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: nativeWidth,
          height: nativeHeight,
          transformOrigin: 'top left',
          transform: `scale(${scale})`,
        }}
      >
        {children}
      </div>
    </div>
  )
}
