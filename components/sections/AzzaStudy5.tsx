// eslint-disable-next-line @next/next/no-img-element

const PHONE_W = 324
const PHONE_H = 662

const PHONES = [
  { src: '/azza/Azza%20Study%205-%20PNG%201.png', alt: 'GHS withdrawal receipt on Azza' },
  { src: '/azza/Azza%20Study%205-%20PNG%202.png', alt: 'NGN withdrawal receipt on Azza' },
  { src: '/azza/Azza%20Study%205-%20PNG%203.png', alt: 'Bill payment receipt on Azza' },
]

const PARAGRAPHS = [
  "Designing Azza meant building a financial product entirely within WhatsApp's native UI.",
  "There were no custom components, no familiar navigation, and no visual hierarchy to design from scratch, only what WhatsApp allows: message order, spacing, buttons, and timing. Every interaction lived inside a continuous chat thread, where new information constantly pushes old information away.",
  "We couldn’t assume users would scroll back, remember previous steps, or understand crypto-specific patterns. So, the main challenge was designing for trust inside a chat interface never meant for financial transactions.",
]

const TEXT_STYLE: React.CSSProperties = {
  margin: 0,
  fontWeight: 400,
  lineHeight: 1.5,
  letterSpacing: '-0.36px',
  color: '#262626',
}

export function AzzaStudy5() {
  return (
    <section
      className="relative bg-white"
      style={{
        backgroundImage: 'radial-gradient(circle, #d8d8d8 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }}
    >
      {/* ── DESKTOP (≥1024px) — exact Figma layout ───────────────────────────── */}
      <div className="hidden lg:block" style={{ position: 'relative', minHeight: 1847 }}>
        {/* Phones: horizontally centered, vertically 332.8px above section midpoint */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: 'calc(50% - 332.8px)',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            gap: 100,
            alignItems: 'center',
          }}
        >
          {PHONES.map((phone) => (
            <img
              key={phone.src}
              src={phone.src}
              alt={phone.alt}
              width={PHONE_W}
              height={PHONE_H}
              style={{ display: 'block', flexShrink: 0 }}
            />
          ))}
        </div>

        {/* Text block: left-aligned at 160px, centered on a point 428.5px below section midpoint */}
        <div
          style={{
            position: 'absolute',
            left: 160,
            top: 'calc(50% + 428.5px)',
            transform: 'translateY(-50%)',
            display: 'flex',
            flexDirection: 'column',
            gap: 40,
          }}
        >
          {PARAGRAPHS.map((text, i) => (
            <p key={i} className="font-sans" style={{ ...TEXT_STYLE, width: 335, fontSize: 18 }}>
              {text}
            </p>
          ))}
        </div>
      </div>

      {/* ── TABLET (768–1023px) ───────────────────────────────────────────────── */}
      <div
        className="hidden md:flex lg:hidden flex-col"
        style={{ paddingTop: 80, paddingBottom: 80, paddingLeft: 48, paddingRight: 48, gap: 64 }}
      >
        {/* All 3 phones in a horizontal row, scaling to fit */}
        <div style={{ display: 'flex', gap: 40, justifyContent: 'center' }}>
          {PHONES.map((phone) => (
            <div key={phone.src} style={{ flex: '0 1 200px', minWidth: 0 }}>
              <img
                src={phone.src}
                alt={phone.alt}
                width={PHONE_W}
                height={PHONE_H}
                style={{ display: 'block', width: '100%', height: 'auto' }}
              />
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          {PARAGRAPHS.map((text, i) => (
            <p key={i} className="font-sans" style={{ ...TEXT_STYLE, maxWidth: 560, fontSize: 18 }}>
              {text}
            </p>
          ))}
        </div>
      </div>

      {/* ── MOBILE (<768px) ───────────────────────────────────────────────────── */}
      <div
        className="flex flex-col md:hidden"
        style={{ paddingTop: 64, paddingBottom: 64, gap: 48 }}
      >
        {/* All 3 phones fill the row equally */}
        <div style={{ display: 'flex', gap: 8, paddingLeft: 16, paddingRight: 16 }}>
          {PHONES.map((phone) => (
            <div key={phone.src} style={{ flex: 1, minWidth: 0 }}>
              <img
                src={phone.src}
                alt={phone.alt}
                width={PHONE_W}
                height={PHONE_H}
                style={{ display: 'block', width: '100%', height: 'auto' }}
              />
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28, paddingLeft: 24, paddingRight: 24 }}>
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
