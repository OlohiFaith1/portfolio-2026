import Image from 'next/image'

interface Props {
  slug: string
}

// Card art per project — sourced from the redesigned "Work Grid" Figma
// frame (471:33025). Azza, Syncwatch, and Mercado use newly exported cover
// images (their own flattened compositions — text/logo already baked in,
// matching this whole portfolio's "flattened composite" convention); Flyp,
// Silverbird, and LNVC keep their existing, unchanged assets, only
// re-cropped to this design's own cover proportions. Each cover is a
// fixed-aspect box (varies per project — see WorkCard.tsx); content here
// fills it via `fill` + `object-fit: cover` so it scales with the card at
// any breakpoint without distortion.
export function WorkCardVisual({ slug }: Props) {
  switch (slug) {
    case 'azza':
      return (
        <div className="relative size-full">
          <Image
            src="/images/Azza%20Work%20Grid%20Cover.png"
            alt=""
            fill
            sizes="(min-width: 1024px) 64vw, 100vw"
            className="object-cover"
          />
        </div>
      )

    case 'syncwatch':
      return (
        <div className="relative size-full">
          <Image
            src="/images/SyncWatch%20Work%20Grid%20Cover.png"
            alt=""
            fill
            sizes="(min-width: 1024px) 32vw, 100vw"
            className="object-cover"
          />
        </div>
      )

    case 'mercado':
      return (
        <div className="relative size-full">
          <Image
            src="/images/Mercado%20Work%20Grid%20Cover.png"
            alt=""
            fill
            sizes="(min-width: 1024px) 32vw, 100vw"
            className="object-cover"
          />
        </div>
      )

    case 'flyp':
      // Left-aligned crop (not the default centered one every other cover
      // uses) — the source asset's subject sits toward the left, so cropping
      // from center was cutting it off; object-left keeps the left edge
      // anchored and lets any overflow get cropped from the right instead.
      return (
        <div className="relative size-full">
          <Image
            src="/images/Flyp%20Cover.png"
            alt=""
            fill
            sizes="(min-width: 1024px) 32vw, 100vw"
            className="object-cover object-left"
          />
        </div>
      )

    case 'silverbird':
      return (
        <div className="relative size-full">
          <Image src="/images/Silverbird%20Cover.png" alt="" fill sizes="(min-width: 1024px) 32vw, 100vw" className="object-cover" />
        </div>
      )

    case 'lnvc':
      return (
        <div className="relative size-full flex flex-col items-center justify-center gap-[3%]" style={{ backgroundColor: '#65785f' }}>
          <div className="relative w-[21.3%]" style={{ aspectRatio: '96.05/87.57' }}>
            <Image src="/work/lnvc-eye.svg" alt="" fill sizes="100px" />
          </div>
          <div className="relative w-[18.7%]" style={{ aspectRatio: '84.5/23.49' }}>
            <Image src="/work/lnvc-text.svg" alt="" fill sizes="90px" />
          </div>
        </div>
      )

    default:
      return null
  }
}
