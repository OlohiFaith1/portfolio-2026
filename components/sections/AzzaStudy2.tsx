'use client'

const CARDS = [
  {
    id: 1,
    src: '/images/azza/hero/Azza%20Study%202-%20Asset%201.png',
    alt: 'Azza account statement showing transaction history',
    tall: true,
  },
  {
    id: 2,
    src: '/images/azza/hero/Azza%20Study%202-%20Asset%202.png',
    alt: 'Achievement trophy icon',
    tall: false,
  },
  {
    id: 3,
    src: '/images/azza/hero/Azza%20Study%202-%20Asset%203.png',
    alt: 'KYC verification flow in WhatsApp interface',
    tall: true,
  },
  {
    id: 4,
    src: '/images/azza/hero/Azza%20Study%202-%20Asset%204.png',
    alt: 'Azza QR code for onboarding',
    tall: false,
  },
  {
    id: 5,
    src: '/images/azza/hero/Azza%20Study%202-%20Asset%205.png',
    alt: 'Withdrawal and cashback notification flow',
    tall: true,
  },
  {
    id: 6,
    src: '/images/azza/hero/Azza%20Study%202-%20Asset%206.png',
    alt: 'Azza branded token coin',
    tall: false,
  },
]

// Figma dimensions (1× CSS pixels)
const TALL_W = 311
const TALL_H = 470
const SQ = 274
const CARD_RADIUS = 55
const CARD_GAP = 86

function Metadata() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
      <span className="font-display" style={{ fontSize: 24, lineHeight: 1.1, color: '#1e1e1e' }}>
        Azza
      </span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
        {/* Collaborators */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <span className="font-display" style={{ fontSize: 24, lineHeight: 1.1, color: '#1e1e1e' }}>
            Collaborators
          </span>
          <p className="font-sans" style={{ fontSize: 16, lineHeight: 1.5, letterSpacing: '-0.16px', color: '#737373', margin: 0 }}>
            Emmanuella James,{' '}
            <span style={{ color: '#a3a3a3' }}>Brand and designer</span>
          </p>
        </div>
        {/* Year */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <span className="font-display" style={{ fontSize: 24, lineHeight: 1.1, color: '#1e1e1e' }}>
            Year
          </span>
          <p className="font-sans" style={{ fontSize: 16, lineHeight: 1.5, letterSpacing: '-0.16px', color: '#737373', margin: 0 }}>
            2025
          </p>
        </div>
        {/* Role */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <span className="font-display" style={{ fontSize: 24, lineHeight: 1.1, color: '#1e1e1e' }}>
            Role
          </span>
          <p className="font-sans" style={{ fontSize: 16, lineHeight: 1.5, letterSpacing: '-0.16px', color: '#737373', margin: 0 }}>
            Conversational Design, Experience &amp; Interface Design
          </p>
        </div>
      </div>
    </div>
  )
}

function Narrative() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <span className="font-display" style={{ fontSize: 24, lineHeight: 1.1, color: '#1e1e1e' }}>
        Turning chats into cashouts...
      </span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
        <p className="font-sans" style={{ fontSize: 16, lineHeight: 1.5, letterSpacing: '-0.16px', color: '#262626', margin: 0 }}>
          In 2025, Azza processed over $10M in onchain volume, entirely through WhatsApp. Azza enables everyday people and businesses to buy, sell, hold, and transact crypto without downloading an app or navigating complex trading interfaces.
        </p>
        <p className="font-sans" style={{ fontSize: 16, lineHeight: 1.5, letterSpacing: '-0.16px', color: '#262626', margin: 0 }}>
          For the 10K plus users, their first onchain interaction didn&apos;t happen in a traditional crypto wallet, it happened in a chat, on an already familiar interface; WhatsApp.
        </p>
        <p className="font-sans" style={{ fontSize: 16, lineHeight: 1.5, letterSpacing: '-0.16px', color: '#262626', margin: 0 }}>
          Our goal was to turn a familiar messaging experience into a trustworthy, usable financial interface, capable of handling real money at scale.
        </p>
      </div>
    </div>
  )
}

function Card({ card }: { card: typeof CARDS[number] }) {
  const w = card.tall ? TALL_W : SQ
  const h = card.tall ? TALL_H : SQ
  return (
    <div
      style={{
        width: w,
        height: h,
        borderRadius: CARD_RADIUS,
        overflow: 'hidden',
        flexShrink: 0,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={card.src}
        alt={card.alt}
        width={w * 2}
        height={h * 2}
        style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
      />
    </div>
  )
}

function CardStrip({ scrollable }: { scrollable: boolean }) {
  return (
    <div
      style={{
        display: 'flex',
        gap: CARD_GAP,
        alignItems: 'center',
        ...(scrollable
          ? {
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch',
              paddingBottom: 4, // micro-space to avoid clipping scroll shadow
              cursor: 'grab',
            }
          : { overflow: 'visible' }),
      }}
    >
      {CARDS.map((card) => (
        <div
          key={card.id}
          style={scrollable ? { scrollSnapAlign: 'center', flexShrink: 0 } : {}}
        >
          <Card card={card} />
        </div>
      ))}
    </div>
  )
}

export function AzzaStudy2() {
  return (
    <section
      className="relative bg-white"
      style={{
        backgroundImage: 'radial-gradient(circle, #d8d8d8 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }}
    >
      {/* ── DESKTOP (≥1024px) ─────────────────────────────────────────────────
          Right column absolute at Figma-exact offset.
          Card strip centered, overflows edges (overflow-x: hidden on section).
      ──────────────────────────────────────────────────────────────────────── */}
      <div
        className="hidden lg:block"
        style={{ position: 'relative', minHeight: 2040, overflowX: 'hidden' }}
      >
        {/* Right column: metadata top, narrative bottom */}
        <div
          style={{
            position: 'absolute',
            top: 92,
            right: 146,
            width: 348,
            bottom: 80,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Metadata />
          <Narrative />
        </div>

        {/* Card strip: centered, visually bleeds past viewport edges */}
        <div
          style={{
            position: 'absolute',
            top: 848,
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <CardStrip scrollable={false} />
        </div>
      </div>

      {/* ── TABLET (768–1023px) ───────────────────────────────────────────────
          Two-column layout: scrollable card strip | metadata + narrative
      ──────────────────────────────────────────────────────────────────────── */}
      <div className="hidden md:flex lg:hidden" style={{ padding: '80px 48px', gap: 64, alignItems: 'flex-start' }}>
        {/* Left: scrollable card strip */}
        <div style={{ flex: '1 1 0', minWidth: 0, overflow: 'hidden' }}>
          <CardStrip scrollable={true} />
        </div>
        {/* Right: metadata + narrative */}
        <div style={{ width: 280, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 80 }}>
          <Metadata />
          <Narrative />
        </div>
      </div>

      {/* ── MOBILE (<768px) ───────────────────────────────────────────────────
          Vertical editorial: metadata → cards (swipe) → narrative
      ──────────────────────────────────────────────────────────────────────── */}
      <div className="flex flex-col md:hidden" style={{ padding: '48px 0' }}>
        {/* 1. Metadata */}
        <div style={{ padding: '0 24px', marginBottom: 32 }}>
          <Metadata />
        </div>

        {/* 2. Horizontal swipeable card gallery */}
        <div
          style={{
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            display: 'flex',
            gap: 16,
            padding: '0 24px',
            marginBottom: 32,
          }}
        >
          {CARDS.map((card) => (
            <div key={card.id} style={{ scrollSnapAlign: 'center', flexShrink: 0 }}>
              <Card card={card} />
            </div>
          ))}
        </div>

        {/* 3. Narrative */}
        <div style={{ padding: '0 24px' }}>
          <Narrative />
        </div>
      </div>
    </section>
  )
}
