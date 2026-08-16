// Figma: "Mercado 4" — three stacked blocks on the same dot-grid background
// AzzaStudy2 uses: project details (top, right-aligned), a full-bleed image,
// and closing narrative text (bottom, right-aligned). Desktop reproduces
// Figma's exact right-alignment/width (348px, 146px from the right edge)
// and the 104/120/120/73px vertical rhythm around the image directly.
// Figma has no separate mobile/tablet frame for this section (same as the
// hero), so tablet/mobile reflow reuses AzzaStudy2's established
// padding/stacking conventions. The image is 100vh (cropped via
// object-fit: cover) on tablet/desktop — an explicit override of Figma's
// fixed 1200px, not a literal reproduction of it — but on mobile it's
// width-fit/height-auto instead, so the full frame stays visible uncropped
// rather than losing its sides to a forced 100vh box.
import Image from 'next/image'

function ProjectDetails() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
      <span className="font-display" style={{ fontSize: 24, lineHeight: 1.1, color: '#1e1e1e' }}>
        Mercado
      </span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
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
            User Interface, Experience and Interaction Design
          </p>
        </div>
      </div>
    </div>
  )
}

// Column width is owned by the caller (a wrapping div with an explicit
// width) rather than the paragraphs themselves — an ancestor chain of only
// max-width (no explicit width) inside a shrink-to-fit flex row has no
// determinate size to resolve max-width against, and collapses far below
// 335px. `width: 100%` here just fills whatever the caller sizes.
function Narrative() {
  const paraStyle: React.CSSProperties = {
    fontSize: 18,
    lineHeight: '28px',
    letterSpacing: '-0.36px',
    color: '#262626',
    margin: 0,
    width: '100%',
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 40, width: '100%' }}>
        <p className="font-sans" style={paraStyle}>
          The phrase above is a very common one in the Nigerian marketplace. You’ll hear it in
          supermarkets, kiosks, and roadside stalls anytime a payment fails. It usually means the
          POS machine can’t connect, the bank app is down, or worse, money has been debited but
          not received.
        </p>
        <p className="font-sans" style={paraStyle}>
          These aren’t rare events. They happen all the time, and they’re frustrating for both
          customers and the merchants who just want to get paid.
        </p>
        <p className="font-sans" style={paraStyle}>
          That’s where Mercado comes in, a simple mobile app that helps everyday merchants manage
          stablecoin payments like they would regular money, without worrying about very
          technical crypto jargon.
        </p>
      </div>
    </div>
  )
}

// Figma's "Mercado 4 Thumbnail" frame, flattened: background art, the
// product-mockup photo overlay, a dark tint, and the headline all already
// baked into the one exported asset — rendered as-is rather than
// recomposited from layers.
const imageAlt =
  'A merchant holds a phone showing a completed 25 USDC collection in the Mercado app, next to the headline “Our POS no get network...”'

// Tablet/desktop: height is fixed to the viewport (not Figma's 1200px) per
// spec, `object-fit: cover` keeps it undistorted and centred on the
// product shot at any viewport ratio — crops left/right as needed.
function SectionImage() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
      <Image src="/images/mercado/mercado-4-thumbnail.jpg" alt={imageAlt} fill sizes="100vw" style={{ objectFit: 'cover' }} />
    </div>
  )
}

// Mobile: cropping the 1.6:1 image down to 100vh loses too much of the
// frame at narrow widths, so instead width fits the viewport and height
// scales proportionally (naturally exceeding 100vh) — the full image is
// always visible, uncropped, by scrolling. Explicit intrinsic dimensions
// (matching the source's 1920×1200 aspect ratio) let next/image reserve
// the correct box before load without needing `fill`.
function SectionImageMobile() {
  return (
    <Image
      src="/images/mercado/mercado-4-thumbnail.jpg"
      alt={imageAlt}
      width={1920}
      height={1200}
      sizes="100vw"
      style={{ width: '100%', height: 'auto', display: 'block' }}
    />
  )
}

export function MercadoStudy2() {
  return (
    <section
      className="relative bg-white"
      style={{
        backgroundImage: 'radial-gradient(circle, #d8d8d8 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        overflowX: 'hidden',
      }}
    >
      {/* Project details — right inset (24px) and width (333px) match the
          shared 8-column grid's own margin and 2-column span
          (components/layout/Grid.tsx) — was paddingRight:146/width:348, an
          arbitrary offset from the 1920px Figma frame; reflows to a padded
          full-width block on tablet/mobile, matching AzzaStudy2's stacking
          convention. */}
      <div className="hidden lg:flex" style={{ justifyContent: 'flex-end', paddingTop: 104, paddingBottom: 120, paddingRight: 24 }}>
        <div style={{ width: 333 }}>
          <ProjectDetails />
        </div>
      </div>
      <div className="hidden md:block lg:hidden" style={{ paddingLeft: 48, paddingRight: 48, paddingTop: 80, paddingBottom: 64 }}>
        <ProjectDetails />
      </div>
      <div className="md:hidden" style={{ paddingLeft: 24, paddingRight: 24, paddingTop: 64, paddingBottom: 48 }}>
        <ProjectDetails />
      </div>

      <div className="hidden md:block">
        <SectionImage />
      </div>
      <div className="md:hidden">
        <SectionImageMobile />
      </div>

      {/* Narrative — same right-aligned, grid-matched treatment as project
          details above. */}
      <div className="hidden lg:flex" style={{ justifyContent: 'flex-end', paddingTop: 120, paddingBottom: 73, paddingRight: 24 }}>
        <div style={{ width: 333 }}>
          <Narrative />
        </div>
      </div>
      <div className="hidden md:block lg:hidden" style={{ paddingLeft: 48, paddingRight: 48, paddingTop: 64, paddingBottom: 80 }}>
        <div style={{ maxWidth: 335 }}>
          <Narrative />
        </div>
      </div>
      <div className="md:hidden" style={{ paddingLeft: 24, paddingRight: 24, paddingTop: 48, paddingBottom: 64 }}>
        <div style={{ maxWidth: 335 }}>
          <Narrative />
        </div>
      </div>
    </section>
  )
}
