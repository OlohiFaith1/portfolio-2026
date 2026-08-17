'use client'

import Image from 'next/image'
import { PhoneMockupScale } from './PhoneMockupScale'

const NATIVE_W = 408
const NATIVE_H = 834

interface Props {
  /** Tailwind height class(es), e.g. "h-[50vh] md:h-[60vh] lg:h-[77vh]" */
  className?: string
}

export function MercadoMockup({ className = 'h-[77vh]' }: Props) {
  return (
    <PhoneMockupScale nativeWidth={NATIVE_W} nativeHeight={NATIVE_H} className={className}>
      <PhoneFrame />
    </PhoneMockupScale>
  )
}

function PhoneFrame() {
  return (
    <div style={{ position: 'relative', width: NATIVE_W, height: NATIVE_H }}>
      <Image
        src="/images/Mercado%20Preview%20Mockup.png"
        alt=""
        fill
        sizes={`${NATIVE_W}px`}
        className="object-cover pointer-events-none"
      />
    </div>
  )
}
