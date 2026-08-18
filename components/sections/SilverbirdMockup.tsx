'use client'

import Image from 'next/image'
import { PhoneMockupScale } from './PhoneMockupScale'

// Figma "Silverbird Case Study Preview" (368:18296, desktop 1920×1080) — no
// mobile frame exists for this one. Like Flyp, the exported PNG is already
// a fully composed shot (monitor + Mac Mini) with no border/radius/frame of
// its own in Figma, so it's rendered as-is at its own 1200×900 (4:3) box,
// which exactly matches the source image's native ratio — no cropping.
const NATIVE_W = 1200
const NATIVE_H = 900

interface Props {
  /** Tailwind height class(es), e.g. "h-[48vh] lg:h-[83vh]" */
  className?: string
}

export function SilverbirdMockup({ className = 'h-[83vh]' }: Props) {
  return (
    <PhoneMockupScale nativeWidth={NATIVE_W} nativeHeight={NATIVE_H} className={className}>
      <div style={{ position: 'relative', width: NATIVE_W, height: NATIVE_H }}>
        <Image
          src="/images/Silverbird%20Preview%20Image.png"
          alt=""
          fill
          sizes={`${NATIVE_W}px`}
          className="object-cover pointer-events-none"
        />
      </div>
    </PhoneMockupScale>
  )
}
