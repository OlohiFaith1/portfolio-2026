// Figma: "SyncWatch 2" (389:41859) — mirrors MercadoStudy2's own structure
// exactly: project details (top, right-aligned), a full-bleed image, and
// closing narrative text (bottom, right-aligned), on the same dot-grid
// background used throughout. Desktop reproduces Figma's exact
// right-alignment/width (348px, 146px from the right edge) and its 129/
// 120/120/129px vertical rhythm around the image directly.
//
// Figma has no dedicated mobile/tablet frame for this section (confirmed
// with the user), so tablet/mobile reuse MercadoStudy2's own established
// reflow padding (48px/80/64 tablet, 24px/64/48 mobile) rather than
// inventing a new responsive treatment.
//
// The image itself — two onboarding phone screens, two user-quote cards,
// and a photo with the logo mark overlaid — is one flattened PNG exported
// straight from Figma's own "Syncwatch 2 Image" frame (1800×765, exactly
// matching the export's 7200×3060 at 4×), not recomposited from its
// source layers. It renders at its natural aspect ratio (width: 100%,
// height: auto) rather than MercadoStudy2's forced-crop 100vh technique,
// since Figma shows it at full, uncropped size here — so unlike
// MercadoStudy2 there's no separate mobile image variant needed, the one
// `<Image>` already reflows correctly at any width.
//
// No entrance animation: this section's closest architectural precedent,
// MercadoStudy2, has none either — both are static text/image/text
// content sections, distinct from the interactive/scroll-driven sections
// elsewhere in these case studies.
import Image from 'next/image'

function ProjectDetails() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
      <span className="font-display" style={{ fontSize: 24, lineHeight: 1.1, color: '#1e1e1e' }}>
        Syncwatch
      </span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <span className="font-display" style={{ fontSize: 24, lineHeight: 1.1, color: '#1e1e1e' }}>
            Collaborators
          </span>
          <p className="font-sans" style={{ fontSize: 16, lineHeight: 1.5, letterSpacing: '-0.16px', color: '#737373', margin: 0 }}>
            Ifeoluwa Olakunle, <span style={{ color: '#a3a3a3' }}>Brand Designer</span>
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <span className="font-display" style={{ fontSize: 24, lineHeight: 1.1, color: '#1e1e1e' }}>
            Year
          </span>
          <p className="font-sans" style={{ fontSize: 16, lineHeight: 1.5, letterSpacing: '-0.16px', color: '#737373', margin: 0 }}>
            2026
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <span className="font-display" style={{ fontSize: 24, lineHeight: 1.1, color: '#1e1e1e' }}>
            Role
          </span>
          <p className="font-sans" style={{ fontSize: 16, lineHeight: 1.5, letterSpacing: '-0.16px', color: '#737373', margin: 0 }}>
            User Experience &amp; Interface Design
          </p>
        </div>
      </div>
    </div>
  )
}

function Narrative() {
  return (
    <p
      className="font-sans"
      style={{ fontSize: 16, lineHeight: 1.5, letterSpacing: '-0.16px', color: '#262626', margin: 0 }}
    >
      SyncWatch is a mobile app that lets people watch movies together on their preferred
      streaming platforms, while keeping playback synchronized across devices.
    </p>
  )
}

const imageAlt =
  'SyncWatch onboarding screens for signing in and selecting a streaming service, alongside two user quotes about wanting to watch movies together virtually, next to a photo of someone walking with the SyncWatch logo mark overlaid'

function SectionImage() {
  return (
    <Image
      src="/images/Syncwatch 2 Image.png"
      alt={imageAlt}
      width={7200}
      height={3060}
      sizes="100vw"
      style={{ width: '100%', height: 'auto', display: 'block' }}
    />
  )
}

export function SyncWatchStudy2() {
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
          full-width block on tablet/mobile, matching MercadoStudy2's own
          established convention. */}
      <div className="hidden lg:flex" style={{ justifyContent: 'flex-end', paddingTop: 129, paddingRight: 24 }}>
        <div style={{ width: 333 }}>
          <ProjectDetails />
        </div>
      </div>
      <div className="hidden md:block lg:hidden" style={{ paddingLeft: 48, paddingRight: 48, paddingTop: 80 }}>
        <ProjectDetails />
      </div>
      <div className="md:hidden" style={{ paddingLeft: 24, paddingRight: 24, paddingTop: 64 }}>
        <ProjectDetails />
      </div>

      {/* Image — full aspect-preserving width, 24px side margins on desktop
          matching the shared grid's own margin (was 60px, an arbitrary
          offset from the 1920px Figma frame, independent of the text
          column's own margin above), edge-to-edge on tablet/mobile. Same
          vertical rhythm (120px) above and below at every breakpoint. */}
      <div className="hidden lg:block" style={{ paddingLeft: 24, paddingRight: 24, paddingTop: 120, paddingBottom: 120 }}>
        <SectionImage />
      </div>
      <div className="hidden md:block lg:hidden" style={{ paddingTop: 64, paddingBottom: 64 }}>
        <SectionImage />
      </div>
      <div className="md:hidden" style={{ paddingTop: 48, paddingBottom: 48 }}>
        <SectionImage />
      </div>

      {/* Closing text — same right-aligned, grid-matched column as the
          project details. */}
      <div className="hidden lg:flex" style={{ justifyContent: 'flex-end', paddingRight: 24, paddingBottom: 129 }}>
        <div style={{ width: 333 }}>
          <Narrative />
        </div>
      </div>
      <div className="hidden md:block lg:hidden" style={{ paddingLeft: 48, paddingRight: 48, paddingBottom: 80 }}>
        <div style={{ maxWidth: 335 }}>
          <Narrative />
        </div>
      </div>
      <div className="md:hidden" style={{ paddingLeft: 24, paddingRight: 24, paddingBottom: 64 }}>
        <div style={{ maxWidth: 335 }}>
          <Narrative />
        </div>
      </div>
    </section>
  )
}
