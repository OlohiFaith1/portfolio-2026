import Image from 'next/image'

// Figma: section 1920×2011, bg #ffffff
// Image "Pizza PNG": x=68, y=179, width=1852, height=1063 (4×PNG: 7408×4252)
// Text: x=160, y=1442, width=335, gap=40 between paragraphs
// Gaps: 179 above image, 200 between image bottom and text top, 138 below text

const IMG_W = 7408
const IMG_H = 4252

const PARAGRAPHS = [
  'Another important part of the experience was designing cashback and reward visuals that could communicate incentives quickly inside chat.',
  'Internally, these were often referred to as coupons. They were lightweight, ticket-inspired visual cards designed to grab attention and explain rewards instantly without disrupting the conversation flow.',
  'Because most interactions happened inside busy chat threads, users needed to understand the reward immediately without reading long explanations.',
]

const TEXT_STYLE: React.CSSProperties = {
  margin: 0,
  fontWeight: 400,
  fontSize: 18,
  lineHeight: 1.5,
  letterSpacing: '-0.36px',
  color: '#262626',
}

export function AzzaStudy7() {
  return (
    <section style={{ backgroundColor: '#ffffff' }}>
      {/* ── DESKTOP (≥1024px) — exact Figma layout ──────────────────────────── */}
      <div className="hidden lg:block" style={{ paddingTop: 179, paddingBottom: 138 }}>
        {/* Image: 68px left margin, extends to right edge (1852px at 1920px viewport) */}
        <div style={{ marginLeft: 68 }}>
          <Image
            src="/azza/Pizza%20PNG.png"
            alt="Phone displaying an Azza cashback coupon on a pizza-themed tablecloth background"
            width={IMG_W}
            height={IMG_H}
            sizes="calc(100vw - 68px)"
            style={{ width: 'calc(100vw - 68px)', height: 'auto', display: 'block' }}
            priority
          />
        </div>

        {/* Text: 200px below image, 160px from left */}
        <div
          style={{
            marginTop: 200,
            paddingLeft: 160,
            display: 'flex',
            flexDirection: 'column',
            gap: 40,
          }}
        >
          {PARAGRAPHS.map((text, i) => (
            <p key={i} className="font-sans" style={{ ...TEXT_STYLE, width: 335 }}>
              {text}
            </p>
          ))}
        </div>
      </div>

      {/* ── TABLET (768–1023px) ────────────────────────────────────────────── */}
      <div
        className="hidden md:flex lg:hidden flex-col"
        style={{ paddingTop: 80, paddingBottom: 80, paddingLeft: 48, paddingRight: 48, gap: 64 }}
      >
        <Image
          src="/azza/Pizza%20PNG.png"
          alt="Phone displaying an Azza cashback coupon on a pizza-themed tablecloth background"
          width={IMG_W}
          height={IMG_H}
          sizes="calc(100vw - 96px)"
          style={{ width: '100%', height: 'auto', display: 'block' }}
          priority
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          {PARAGRAPHS.map((text, i) => (
            <p key={i} className="font-sans" style={{ ...TEXT_STYLE, maxWidth: 480 }}>
              {text}
            </p>
          ))}
        </div>
      </div>

      {/* ── MOBILE (<768px) ────────────────────────────────────────────────── */}
      <div
        className="flex flex-col md:hidden"
        style={{ paddingTop: 48, paddingBottom: 64, gap: 48 }}
      >
        <div style={{ paddingLeft: 24, paddingRight: 24 }}>
          <Image
            src="/azza/Pizza%20PNG.png"
            alt="Phone displaying an Azza cashback coupon on a pizza-themed tablecloth background"
            width={IMG_W}
            height={IMG_H}
            sizes="calc(100vw - 48px)"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>
        <div
          style={{
            paddingLeft: 24,
            paddingRight: 24,
            display: 'flex',
            flexDirection: 'column',
            gap: 28,
          }}
        >
          {PARAGRAPHS.map((text, i) => (
            <p key={i} className="font-sans" style={{ ...TEXT_STYLE, fontSize: 16, letterSpacing: '-0.32px' }}>
              {text}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
