'use client'

import Image from 'next/image'
import { PhoneMockupScale } from './PhoneMockupScale'

// Figma "LNVC Case Study Preview" (518:34601, desktop 1920×1080). Unlike
// Flyp/Silverbird, this one *is* the standard phone-in-hand shape (408×834,
// same box Azza/Mercado/SyncWatch use) — the exported PNG is a flattened
// render of that exact bezel+screen composition (1632×3336, same 0.489
// ratio), border/notch/rounded corners already baked in, so it's rendered
// as-is with no additional frame.
const NATIVE_W = 408
const NATIVE_H = 834

interface Props {
  /** Tailwind height class(es), e.g. "h-[48vh] lg:h-[77vh]" */
  className?: string
}

export function LNVCMockup({ className = 'h-[77vh]' }: Props) {
  return (
    <PhoneMockupScale nativeWidth={NATIVE_W} nativeHeight={NATIVE_H} className={className}>
      <div style={{ position: 'relative', width: NATIVE_W, height: NATIVE_H }}>
        <Image
          src="/images/LNVC%20Preview%20Mockup.png"
          alt=""
          fill
          sizes={`${NATIVE_W}px`}
          className="object-cover pointer-events-none"
        />
      </div>
    </PhoneMockupScale>
  )
}
