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
 * Scales a fixed-size phone frame to fit its container height, measuring
 * synchronously before paint (useLayoutEffect) so it never flashes at
 * native size on first render. ResizeObserver covers viewport height
 * changes that don't fire window resize (e.g. mobile browser chrome
 * appearing/disappearing).
 */
export function PhoneMockupScale({ nativeWidth, nativeHeight, className = '', children }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useLayoutEffect(() => {
    const update = () => {
      if (wrapRef.current) {
        setScale(wrapRef.current.offsetHeight / nativeHeight)
      }
    }
    update()
    const ro = new ResizeObserver(update)
    if (wrapRef.current) ro.observe(wrapRef.current)
    return () => ro.disconnect()
  }, [nativeHeight])

  return (
    <div
      ref={wrapRef}
      className={`relative ${className}`}
      style={{ maxHeight: nativeHeight, aspectRatio: `${nativeWidth}/${nativeHeight}` }}
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
