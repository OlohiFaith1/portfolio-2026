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
 * Scales a fixed-size mockup frame to fit both an intended height (via
 * `className`, e.g. "h-[48vh]") and the real viewport width, measuring
 * synchronously before paint (useLayoutEffect) so it never flashes at
 * native size on first render.
 *
 * The intended height is read from an invisible, unconstrained "probe"
 * element carrying the same className, rather than applying that height
 * directly to the visible box. The visible box's own size is always fully
 * JS-driven (explicit width/height from the computed scale), so it
 * shrink-wraps tightly to its content even when width is the binding
 * constraint — e.g. a landscape mockup on a narrow viewport — instead of
 * reserving the full intended height with empty space left below a
 * shorter, width-capped image.
 *
 * Width is capped against the real viewport (window.innerWidth), not a
 * measured DOM ancestor: CaseStudySection centers its mobile/tablet
 * content with `align-items: center` (not `stretch`), so a flex child's
 * own rendered width is never actually constrained by its container —
 * reading any ancestor's offsetWidth there just reflects whatever that
 * ancestor grew to fit around its own (unconstrained) content, not the
 * true available space. The 48 matches CaseStudySection's own `px-6`
 * (24px) side padding on those layouts.
 *
 * For every portrait consumer (Azza/Mercado/SyncWatch/Flyp's phone-shaped
 * mockups) the height-driven target width is always far narrower than the
 * viewport, so the width cap never binds there — a no-op. It only starts
 * binding for a mockup wider relative to its height (e.g. a landscape
 * screenshot), which is exactly when it's needed.
 */
export function PhoneMockupScale({ nativeWidth, nativeHeight, className = '', children }: Props) {
  const probeRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useLayoutEffect(() => {
    const update = () => {
      if (!probeRef.current) return
      const targetHeight = probeRef.current.offsetHeight
      const availableWidth = window.innerWidth - 48
      setScale(Math.min(targetHeight / nativeHeight, availableWidth / nativeWidth))
    }
    update()
    const ro = new ResizeObserver(update)
    if (probeRef.current) ro.observe(probeRef.current)
    window.addEventListener('resize', update)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [nativeWidth, nativeHeight])

  return (
    <>
      <div
        ref={probeRef}
        className={className}
        style={{ visibility: 'hidden', position: 'absolute', width: 0, pointerEvents: 'none' }}
        aria-hidden="true"
      />
      <div className="relative" style={{ width: nativeWidth * scale, height: nativeHeight * scale }}>
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
    </>
  )
}
