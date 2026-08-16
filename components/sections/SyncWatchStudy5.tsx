// Figma: "SyncWatch 5" (391:52269) — mirrors SyncWatchStudy2's own
// structure: intro text (top, right-aligned), full-width media, and
// closing narrative text (bottom, right-aligned), on the same dot-grid
// background used throughout. Desktop reproduces Figma's exact
// right-alignment/width (335px, 159px from the right edge, matching
// SyncWatchStudy4's own column) and its 120/110/120px vertical rhythm
// around the media row.
//
// The media row is three flattened exports ("SyncWatch 5 Image (1/2/3)",
// 2344×1656 each — avatars/chat/invite-code overlays already baked in,
// matching this whole case study's "flattened composite" convention)
// placed side by side at Figma's exact proportions: 586×414 each (the
// same 2344:1656 ratio, so no cropping/distortion), 60px side margins,
// 21px gaps — the identical side-margin convention SyncWatchStudy2 uses
// for its own full-width image.
//
// Figma has no dedicated mobile/tablet frame for this section (matches
// every other SyncWatch section), so tablet/mobile reuse SyncWatchStudy2's
// own established reflow padding for the text blocks (48px/80/64 tablet,
// 24px/64/48 mobile). The image row is the one deliberate reinterpretation
// this section needs: three images at ~193px each would be too cramped to
// read below desktop, so it switches to a vertical stack (full width,
// aspect ratio preserved, 16px gaps) below the same `lg` breakpoint the
// text blocks already reflow at, rather than shrinking the desktop row in
// place.
//
// No entrance animation: this section's closest architectural precedent,
// SyncWatchStudy2, has none either — both are static text/media/text
// content sections, distinct from the interactive/scroll-driven sections
// elsewhere in these case studies.
import Image from 'next/image'

function IntroText() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <span className="font-display" style={{ fontSize: 24, lineHeight: 1.1, color: '#1e1e1e' }}>
        Making watching together feel good...
      </span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
        <p className="font-sans" style={{ fontSize: 16, lineHeight: 1.5, letterSpacing: '-0.16px', color: '#262626', margin: 0 }}>
          Watching a movie remotely usually means juggling a video call, a streaming platform, and messages just to stay in sync.
        </p>
        <p className="font-sans" style={{ fontSize: 16, lineHeight: 1.5, letterSpacing: '-0.16px', color: '#262626', margin: 0 }}>
          SyncWatch brings the experience together, from creating a party and inviting friends to watching, chatting, and reacting in real time.
        </p>
      </div>
    </div>
  )
}

function ClosingText() {
  return (
    <p className="font-sans" style={{ fontSize: 16, lineHeight: 1.5, letterSpacing: '-0.16px', color: '#262626', margin: 0 }}>
      The party lobby shows who&apos;s ready before the movie starts, while in-watch chat and reactions let everyone stay connected without leaving the experience.
    </p>
  )
}

const IMAGES = [
  {
    src: '/images/syncwatch/SyncWatch 5 Image (1).png',
    alt: 'Ten circular party-guest avatars overlaid on a photo of someone holding a remote control beside a bowl of popcorn',
  },
  {
    src: '/images/syncwatch/SyncWatch 5 Image (2).png',
    alt: 'Two friends laughing outdoors behind a floating SyncWatch playback and live-chat overlay for the "Three Musketeers!" watch party',
  },
  {
    src: '/images/syncwatch/SyncWatch 5 Image (3).png',
    alt: 'A living room photo with a floating card sharing the invite code 7FQ9K2 while friends wait to join the party',
  },
] as const

function MediaImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div style={{ flex: '1 1 0%', minWidth: 0 }}>
      <Image
        src={src}
        alt={alt}
        width={2344}
        height={1656}
        sizes="(min-width: 1024px) 33vw, 100vw"
        style={{ width: '100%', height: 'auto', display: 'block' }}
      />
    </div>
  )
}

export function SyncWatchStudy5() {
  return (
    <section
      className="relative bg-white"
      style={{
        backgroundImage: 'radial-gradient(circle, #d8d8d8 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        overflowX: 'hidden',
      }}
    >
      {/* Intro text — right inset (24px) and width (333px) match the
          shared 8-column grid's own margin and 2-column span
          (components/layout/Grid.tsx) — was paddingRight:159/width:335, an
          arbitrary offset from the 1920px Figma frame; reflows to a padded
          full-width block on tablet/mobile, matching SyncWatchStudy2/4's
          own established convention. */}
      <div className="hidden lg:flex" style={{ justifyContent: 'flex-end', paddingTop: 120, paddingRight: 24 }}>
        <div style={{ width: 333 }}>
          <IntroText />
        </div>
      </div>
      <div className="hidden md:block lg:hidden" style={{ paddingLeft: 48, paddingRight: 48, paddingTop: 80 }}>
        <IntroText />
      </div>
      <div className="md:hidden" style={{ paddingLeft: 24, paddingRight: 24, paddingTop: 64 }}>
        <IntroText />
      </div>

      {/* Media row — three images side by side, 24px side margins (matching
          the shared grid's own margin — was 60px, independent of the text
          column's own margin above) and 21px gaps on desktop. Below `lg`,
          three images would be too cramped to read, so they stack
          vertically instead of simply shrinking in place. */}
      <div className="hidden lg:flex" style={{ paddingLeft: 24, paddingRight: 24, paddingTop: 110, paddingBottom: 120, gap: 21 }}>
        {IMAGES.map((image) => (
          <MediaImage key={image.src} {...image} />
        ))}
      </div>
      <div className="hidden md:flex lg:hidden flex-col" style={{ paddingLeft: 48, paddingRight: 48, paddingTop: 64, paddingBottom: 64, gap: 16 }}>
        {IMAGES.map((image) => (
          <MediaImage key={image.src} {...image} />
        ))}
      </div>
      <div className="flex md:hidden flex-col" style={{ paddingLeft: 24, paddingRight: 24, paddingTop: 48, paddingBottom: 48, gap: 16 }}>
        {IMAGES.map((image) => (
          <MediaImage key={image.src} {...image} />
        ))}
      </div>

      {/* Closing text — same right-aligned, grid-matched column as the
          intro text. */}
      <div className="hidden lg:flex" style={{ justifyContent: 'flex-end', paddingRight: 24, paddingBottom: 120 }}>
        <div style={{ width: 333 }}>
          <ClosingText />
        </div>
      </div>
      <div className="hidden md:block lg:hidden" style={{ paddingLeft: 48, paddingRight: 48, paddingBottom: 80 }}>
        <div style={{ maxWidth: 335 }}>
          <ClosingText />
        </div>
      </div>
      <div className="md:hidden" style={{ paddingLeft: 24, paddingRight: 24, paddingBottom: 64 }}>
        <div style={{ maxWidth: 335 }}>
          <ClosingText />
        </div>
      </div>
    </section>
  )
}
