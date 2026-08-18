'use client'

import Image from 'next/image'
import { PhoneMockupScale } from './PhoneMockupScale'

// Figma "Flyp Case Study Preview" (355:55627, desktop 1920×1080) / "FLyp
// Case Study Preview Mobile" (518:34918), 976.4×650. Unlike Azza/Mercado/
// SyncWatch's phone-in-hand mockups, Flyp's is a landscape screenshot — the
// exported PNG already has its own browser-window border/rounded corners
// baked into the image itself, so it's rendered as-is with no additional
// border/radius/frame layered on top.
const NATIVE_W = 976.4
const NATIVE_H = 650

interface Props {
  /** Tailwind height class(es), e.g. "h-[48vh] lg:h-[60vh]" */
  className?: string
}

export function FlypMockup({ className = 'h-[60vh]' }: Props) {
  return (
    <PhoneMockupScale nativeWidth={NATIVE_W} nativeHeight={NATIVE_H} className={className}>
      <div style={{ position: 'relative', width: NATIVE_W, height: NATIVE_H }}>
        <Image
          src="/images/Flyp%20Case%20Study%20Preview%20Image.png"
          alt=""
          fill
          sizes={`${Math.round(NATIVE_W)}px`}
          className="object-cover pointer-events-none"
        />
      </div>
    </PhoneMockupScale>
  )
}
