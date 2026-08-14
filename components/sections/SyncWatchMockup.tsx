'use client'

import Image from 'next/image'
import { PhoneMockupScale } from './PhoneMockupScale'

const NATIVE_W = 408
const NATIVE_H = 834

interface Props {
  /** Tailwind height class(es), e.g. "h-[50vh] md:h-[60vh] lg:h-[77vh]" */
  className?: string
}

export function SyncWatchMockup({ className = 'h-[77vh]' }: Props) {
  return (
    <PhoneMockupScale nativeWidth={NATIVE_W} nativeHeight={NATIVE_H} className={className}>
      <PhoneFrame />
    </PhoneMockupScale>
  )
}

// Figma: "SyncWatch Preview" (389:39896) — unlike Azza/MercadoMockup, which
// hand-build their phone bezel and screen content from markup + SVGs, the
// whole composition here (bezel, wordmark, watch-party summary card) was
// already exported as one flattened PNG — so it's rendered as a single
// image rather than recreated.
//
// Filename is suffixed "v2": the asset was replaced in place once already
// (same filename, new content — "Create watch party" screen instead of the
// original "Party Summary" screen), but browsers/CDNs that had already
// cached bytes under the old URL kept serving them indefinitely. next/image
// rejects query-string cache-busting on local /public paths by default
// (would require an images.localPatterns change in next.config, which is
// global, not scoped to this one asset), so the filename itself is the
// cache key here — bump the suffix again if this asset is ever swapped.
function PhoneFrame() {
  return (
    <div style={{ position: 'relative', width: NATIVE_W, height: NATIVE_H }}>
      <Image
        src="/images/Syncwatch Preview Mockup v2.png"
        alt=""
        fill
        sizes={`${NATIVE_W}px`}
        className="object-contain"
        priority
      />
    </div>
  )
}
