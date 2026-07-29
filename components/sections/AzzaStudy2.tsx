'use client'

const CARDS = [
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
]

// ── Figma (1×) desktop dimensions ────────────────────────────────────────────
const TALL_W = 311
const TALL_H = 470
const SQ = 274
const CARD_RADIUS = 55
const CARD_GAP = 86

// ── Scaled dimensions for mobile (<768px) — ~0.59× ───────────────────────────
const M_TALL_W = 184
const M_TALL_H = 278
const M_SQ = 162
const M_RADIUS = 32
const M_GAP = 20

// ── Scaled dimensions for tablet (768–1023px) — ~0.75× ───────────────────────
const T_TALL_W = 234
const T_TALL_H = 353
const T_SQ = 206
const T_RADIUS = 41
const T_GAP = 32

// ── Components ────────────────────────────────────────────────────────────────

function Metadata() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
      <span className="font-display" style={{ fontSize: 24, lineHeight: 1.1, color: '#1e1e1e' }}>
        Azza
      </span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <span className="font-display" style={{ fontSize: 24, lineHeight: 1.1, color: '#1e1e1e' }}>
            Collaborators
          </span>
          <p className="font-sans" style={{ fontSize: 16, lineHeight: 1.5, letterSpacing: '-0.16px', color: '#737373', margin: 0 }}>
            Emmanuella James,{' '}
            <span style={{ color: '#a3a3a3' }}>Brand and designer</span>
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <span className="font-display" style={{ fontSize: 24, lineHeight: 1.1, color: '#1e1e1e' }}>
            Year
          </span>
          <p className="font-sans" style={{ fontSize: 16, lineHeight: 1.5, letterSpacing: '-0.16px', color: '#737373', margin: 0 }}>
            2025
          </p>
        </div>
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

interface CardProps {
  card: typeof CARDS[number]
  w: number
  h: number
  radius: number
}

function Card({ card, w, h, radius }: CardProps) {
  return (
    <div style={{ width: w, height: h, borderRadius: radius, overflow: 'hidden', flexShrink: 0 }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={card.src}
        alt={card.alt}
        style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
      />
    </div>
  )
}

interface GalleryProps {
  tallW: number
  tallH: number
  sq: number
  radius: number
  gap: number
  edgePad: number
}

function Gallery({ tallW, tallH, sq, radius, gap, edgePad }: GalleryProps) {
  return (
    <div
      className="hide-scrollbar"
      style={{
        overflowX: 'auto',
        display: 'flex',
        gap,
        alignItems: 'center',
        paddingLeft: edgePad,
        paddingRight: edgePad,
        scrollSnapType: 'x mandatory',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      {CARDS.map((card) => {
        const w = card.tall ? tallW : sq
        const h = card.tall ? tallH : sq
        return (
          <div key={card.id} style={{ scrollSnapAlign: 'start', flexShrink: 0 }}>
            <Card card={card} w={w} h={h} radius={radius} />
          </div>
        )
      })}
    </div>
  )
}

function DesktopCardStrip() {
  return (
    <div style={{ display: 'flex', gap: CARD_GAP, alignItems: 'center', overflow: 'visible' }}>
      {CARDS.map((card) => {
        const w = card.tall ? TALL_W : SQ
        const h = card.tall ? TALL_H : SQ
        return (
          <Card key={card.id} card={card} w={w} h={h} radius={CARD_RADIUS} />
        )
      })}
    </div>
  )
}

// ── Section ───────────────────────────────────────────────────────────────────

export function AzzaStudy2() {
  return (
    <section
      className="relative bg-white"
      style={{
        backgroundImage: 'radial-gradient(circle, #d8d8d8 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }}
    >
      {/* ── DESKTOP (≥1024px) — unchanged from original Figma layout ─────────── */}
      <div
        className="hidden lg:block"
        style={{ position: 'relative', minHeight: 2040, overflowX: 'hidden' }}
      >
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

        <div
          style={{
            position: 'absolute',
            top: 848,
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <DesktopCardStrip />
        </div>
      </div>

      {/* ── TABLET (768–1023px) ───────────────────────────────────────────────
          Vertical editorial flow: metadata → card gallery → narrative
      ──────────────────────────────────────────────────────────────────────── */}
      <div className="hidden md:flex lg:hidden flex-col" style={{ paddingTop: 80, paddingBottom: 80 }}>
        {/* 1. Project info */}
        <div style={{ paddingLeft: 48, paddingRight: 48, marginBottom: 64 }}>
          <Metadata />
        </div>

        {/* 2. Horizontal card gallery */}
        <Gallery
          tallW={T_TALL_W}
          tallH={T_TALL_H}
          sq={T_SQ}
          radius={T_RADIUS}
          gap={T_GAP}
          edgePad={48}
        />

        {/* 3. Description */}
        <div style={{ paddingLeft: 48, paddingRight: 48, marginTop: 64 }}>
          <Narrative />
        </div>
      </div>

      {/* ── MOBILE (<768px) ───────────────────────────────────────────────────
          Vertical editorial flow: metadata → card gallery → narrative
      ──────────────────────────────────────────────────────────────────────── */}
      <div className="flex flex-col md:hidden" style={{ paddingTop: 64, paddingBottom: 64 }}>
        {/* 1. Project info */}
        <div style={{ paddingLeft: 24, paddingRight: 24, marginBottom: 48 }}>
          <Metadata />
        </div>

        {/* 2. Horizontal card gallery */}
        <Gallery
          tallW={M_TALL_W}
          tallH={M_TALL_H}
          sq={M_SQ}
          radius={M_RADIUS}
          gap={M_GAP}
          edgePad={24}
        />

        {/* 3. Description */}
        <div style={{ paddingLeft: 24, paddingRight: 24, marginTop: 48 }}>
          <Narrative />
        </div>
      </div>
    </section>
  )
}
