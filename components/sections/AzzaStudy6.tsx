import Image from 'next/image'

// Figma: section 1920×1242, image 1122×1123 at (399, 119) — centred, bottom-anchored
// Background: #c497ff

const IMG_W = 4699
const IMG_H = 4705
const DISPLAY_W = 1122

export function AzzaStudy6() {
  return (
    <section style={{ backgroundColor: '#c497ff' }}>
      {/* ── DESKTOP (≥1024px) — exact Figma layout ──────────────────────────── */}
      <div
        className="hidden lg:flex justify-center"
        style={{ paddingTop: 119 }}
      >
        <Image
          src="/azza/Transaction%20Statement%20PNG.png"
          alt="Azza account statement showing transaction history for Snow Olohijere"
          width={IMG_W}
          height={IMG_H}
          sizes={`${DISPLAY_W}px`}
          style={{ width: DISPLAY_W, height: 'auto', display: 'block' }}
          priority
        />
      </div>

      {/* ── TABLET (768–1023px) ────────────────────────────────────────────── */}
      <div
        className="hidden md:flex lg:hidden justify-center"
        style={{ paddingTop: 80, paddingLeft: 48, paddingRight: 48 }}
      >
        <Image
          src="/azza/Transaction%20Statement%20PNG.png"
          alt="Azza account statement showing transaction history for Snow Olohijere"
          width={IMG_W}
          height={IMG_H}
          sizes="calc(100vw - 96px)"
          style={{ width: '100%', height: 'auto', display: 'block' }}
          priority
        />
      </div>

      {/* ── MOBILE (<768px) ────────────────────────────────────────────────── */}
      <div
        className="flex md:hidden justify-center"
        style={{ paddingTop: 48, paddingLeft: 24, paddingRight: 24 }}
      >
        <Image
          src="/azza/Transaction%20Statement%20PNG.png"
          alt="Azza account statement showing transaction history for Snow Olohijere"
          width={IMG_W}
          height={IMG_H}
          sizes="calc(100vw - 48px)"
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
      </div>
    </section>
  )
}
