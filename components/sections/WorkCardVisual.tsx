'use client'

import Image from 'next/image'
import { MercadoMockup } from './MercadoMockup'

interface Props {
  slug: string
}

// Card art per project — colors/assets/composition sourced from the "Work
// Grid" Figma frame. Each card is a fixed-aspect (648:400) box; content is
// sized in percentages so it scales with the card at any breakpoint.
export function WorkCardVisual({ slug }: Props) {
  switch (slug) {
    case 'azza':
      return (
        <div className="relative size-full flex items-center justify-center" style={{ backgroundColor: '#3430e9' }}>
          <div className="relative w-[31%]" style={{ aspectRatio: '200/203.86' }}>
            <Image src="/work/azza-logo.svg" alt="" fill sizes="200px" />
          </div>
        </div>
      )

    case 'mercado':
      return (
        <div className="relative size-full overflow-hidden" style={{ backgroundColor: '#092b2d' }}>
          <div className="absolute h-full aspect-square" style={{ left: '19.1%' }}>
            <Image src="/work/mercado-glow.png" alt="" fill sizes="400px" className="object-cover" />
          </div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[70%]" style={{ aspectRatio: '136.99/280' }}>
            <MercadoMockup className="h-full" />
          </div>
        </div>
      )

    case 'flyp':
      return (
        <div className="relative size-full overflow-hidden" style={{ backgroundColor: '#1a1919' }}>
          <Image src="/images/Flyp%20Cover.png" alt="" fill sizes="648px" className="object-cover" />
        </div>
      )

    case 'silverbird':
      return (
        <div className="relative size-full overflow-hidden" style={{ backgroundColor: '#f6f6f6' }}>
          <Image src="/images/Silverbird%20Cover.png" alt="" fill sizes="648px" className="object-cover" />
        </div>
      )

    case 'syncwatch':
      return (
        <div className="relative size-full flex items-center justify-center" style={{ backgroundColor: '#0a0a0a' }}>
          <div className="relative w-[55%]" style={{ aspectRatio: '381.27/80' }}>
            <Image src="/work/syncwatch-logo.svg" alt="" fill sizes="380px" />
          </div>
        </div>
      )

    case 'lnvc':
      return (
        <div className="relative size-full flex flex-col items-center justify-center gap-4" style={{ backgroundColor: '#65785f' }}>
          <div className="relative w-[19%]" style={{ aspectRatio: '148.71/135.58' }}>
            <Image src="/work/lnvc-eye.svg" alt="" fill sizes="150px" />
          </div>
          <div className="relative w-[17%]" style={{ aspectRatio: '130.82/36.37' }}>
            <Image src="/work/lnvc-text.svg" alt="" fill sizes="130px" />
          </div>
        </div>
      )

    default:
      return null
  }
}
