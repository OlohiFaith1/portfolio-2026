import Image from 'next/image'

// Figma: 1920×1080 — mockup 1600×1200 (4:3), centred, bleeding past the
// section's top/bottom edges by design (clipped via overflow: hidden).
// Background: #14474b, texture overlay reused verbatim from AzzaHero
// (same source file — confirmed byte-identical against the Figma export)
// at Mercado's own opacity (0.2 vs Azza's 0.3).
export function MercadoHero() {
  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        height: '100svh',
        backgroundColor: '#14474b',
        overflow: 'hidden',
      }}
    >
      {/* Texture — covers full section, overlay blend, same asset/treatment as AzzaHero */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          mixBlendMode: 'overlay',
          opacity: 0.2,
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

      {/* Mockup — centred via a full-width flex row (not left:50%+translateX),
          because an intrinsically-sized absolutely-positioned box only gets
          HALF the viewport as shrink-to-fit "available width" once left:50%
          is set with no right — CSS resolves that available-width before the
          transform is applied, silently capping a width:auto child (and
          therefore its width:clamp() image) at ~50vw instead of the intended
          ~84vw. A flex container spanning the full section sidesteps that:
          justify-content centers using the full width, align-items anchors
          to the bottom, and the transform below (paint-only, doesn't affect
          layout) pushes the image the extra 1/12 of its own height past that
          bottom edge — in Figma the mockup (1600×1200) sits at top:-20
          inside the 1920×1080 frame, so its own bottom edge falls 100px
          (100/1200 = 1/12 of its own height) past the frame's bottom edge.
          That keeps the same point on the hand as the one the section's
          bottom edge clips, at any size. */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
        }}
      >
        <div style={{ transform: 'translateY(calc(100% / 12))' }}>
          <Image
            src="/mercado/hero-mockup.png"
            alt="Mercado"
            width={4000}
            height={3000}
            style={{ width: 'clamp(280px, 84vw, 1600px)', height: 'auto', display: 'block' }}
            priority
          />
        </div>
      </div>
    </section>
  )
}
