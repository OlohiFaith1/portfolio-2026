import Image from 'next/image'

// Figma: 1920×1080, logo 311×317 at (805, 381) — exactly centred on (960, 540)
// Background: #3430e9, texture overlay at mix-blend-overlay opacity-0.3

export function AzzaHero() {
  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        height: '100svh',
        backgroundColor: '#3430e9',
        overflow: 'hidden',
      }}
    >
      {/* Texture — covers full section, overlay blend at 30% */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          mixBlendMode: 'overlay',
          opacity: 0.3,
        }}
      >
        <Image
          src="/azza/bg-texture.png"
          alt=""
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>

      {/* Logo — perfectly centred, scales with viewport */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Image
          src="/images/azza/azza-logo.svg"
          alt="Azza"
          width={311}
          height={317}
          style={{ width: 'clamp(140px, 20vw, 311px)', height: 'auto', display: 'block' }}
          priority
        />
      </div>
    </section>
  )
}
