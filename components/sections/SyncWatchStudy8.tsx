'use client'

// Figma: "SyncWatch 8" (428:18670) — the case study's closing section: two
// images with captions, then closing text. No intro text above the
// images here, unlike SyncWatchStudy5/7 — this section's own composition
// is simply images-then-text.
//
// Desktop reproduces Figma's exact numbers: the row sits 49px/48px from
// the section's side edges (128px from the top), its two columns share
// the same 544px height but different widths (1021/778, matching each
// export's own aspect ratio exactly — 4084:2176 and 3112:2176 — so
// there's no cropping or distortion), with a 24px gap between the columns
// and between each image and its own caption, the same 24px unit used
// throughout this case study. The closing text sits in the familiar
// 159px/335px right-aligned column (matching SyncWatchStudy5/7), 120px
// below the row — the standard vertical rhythm this whole case study
// uses between stacked content blocks.
//
// The two flattened exports ("Syncwatch 8 (Image 1/2)" — a four-screen
// watch-party-in-session sequence and a three-screen profile/settings
// sequence) are used directly rather than recreated from their source
// layers, matching this case study's established convention.
//
// Figma has no dedicated mobile/tablet frame for this section, so the
// closing text reuses SyncWatchStudy5/7's own established reflow padding.
// The image row switches from Figma's unequal two-column widths to a
// vertical stack below `lg` — the same breakpoint SyncWatchStudy5/7
// already reflow at — since two columns this differently sized would
// otherwise just shrink in place rather than read as an intentional
// mobile layout.
//
// No animation is indicated in Figma, so the media row uses the same
// subtle one-shot fade/rise viewport reveal SyncWatchStudy6/7 established
// for exactly this situation; the closing text itself stays static,
// matching every other text block throughout this case study.
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.25, 0, 0.1, 1] as const

function Caption({ children }: { children: string }) {
  return (
    <p className="font-sans" style={{ fontSize: 16, lineHeight: 1.5, letterSpacing: '-0.16px', color: '#737373', margin: 0 }}>
      {children}
    </p>
  )
}

function ClosingText() {
  const paraStyle: React.CSSProperties = { fontSize: 16, lineHeight: 1.5, letterSpacing: '-0.16px', color: '#262626', margin: 0 }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <p className="font-sans" style={paraStyle}>
        SyncWatch started with a simple idea: making it easier to watch movies with friends, even when you&apos;re not in the same place.
      </p>
      <p className="font-sans" style={paraStyle}>
        I explored how synchronized playback, watch parties, chat, and shared moments could come together without making the experience complicated.
      </p>
      <p className="font-sans" style={paraStyle}>
        The goal was to make watching together feel natural and social, while making the distance between friends feel a little smaller.
      </p>
    </div>
  )
}

const IMAGES = [
  {
    src: '/images/syncwatch/Syncwatch 8 (Image 1).png',
    alt: 'A four-screen sequence of a SyncWatch watch party in session: the party lobby before starting, synchronized video playback with live messages, a friend replying in chat, and the end-of-party summary with an option to host another party',
    caption: 'PARTY IN SESSION',
    width: 4084,
    height: 2176,
    flexWeight: 1021,
  },
  {
    src: '/images/syncwatch/Syncwatch 8 (Image 2).png',
    alt: 'A three-screen sequence of a SyncWatch profile: the settings screen with account and support options, the edit-profile screen for choosing an avatar and name, and the connected streaming accounts screen',
    caption: 'YOUR SYNCWATCH PROFILE',
    width: 3112,
    height: 2176,
    flexWeight: 778,
  },
] as const

type MediaItem = (typeof IMAGES)[number]

function MediaColumn({ item, flexBasis }: { item: MediaItem; flexBasis: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, flex: flexBasis, minWidth: 0 }}>
      <Image
        src={item.src}
        alt={item.alt}
        width={item.width}
        height={item.height}
        sizes="(min-width: 1024px) 55vw, 100vw"
        style={{ width: '100%', height: 'auto', display: 'block' }}
      />
      <Caption>{item.caption}</Caption>
    </div>
  )
}

export function SyncWatchStudy8() {
  const prefersReducedMotion = useReducedMotion() ?? false

  return (
    <section
      className="relative bg-white"
      style={{
        backgroundImage: 'radial-gradient(circle, #d8d8d8 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        overflowX: 'hidden',
      }}
    >
      {/* Media row — two columns at Figma's exact proportional widths
          (1021:778, via matching flex-grow weights so they scale together
          fluidly), same height, 49px/48px side margins, 24px gap. Below
          `lg`, the columns stack vertically instead of shrinking in
          place. */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.6, ease: EASE }}
      >
        <div className="hidden lg:flex" style={{ paddingLeft: 49, paddingRight: 48, paddingTop: 128, gap: 24 }}>
          {IMAGES.map((item) => (
            <MediaColumn key={item.src} item={item} flexBasis={`${item.flexWeight} 1 0%`} />
          ))}
        </div>
        <div className="hidden md:flex lg:hidden flex-col" style={{ paddingLeft: 48, paddingRight: 48, paddingTop: 80, gap: 40 }}>
          {IMAGES.map((item) => (
            <MediaColumn key={item.src} item={item} flexBasis="1 1 auto" />
          ))}
        </div>
        <div className="flex md:hidden flex-col" style={{ paddingLeft: 24, paddingRight: 24, paddingTop: 64, gap: 40 }}>
          {IMAGES.map((item) => (
            <MediaColumn key={item.src} item={item} flexBasis="1 1 auto" />
          ))}
        </div>
      </motion.div>

      {/* Closing text — right-aligned at Figma's exact 159px/335px values
          on desktop; reflows to a padded full-width block on
          tablet/mobile, matching SyncWatchStudy5/7's own convention. */}
      <div className="hidden lg:flex" style={{ justifyContent: 'flex-end', paddingTop: 120, paddingRight: 159, paddingBottom: 120 }}>
        <div style={{ width: 335 }}>
          <ClosingText />
        </div>
      </div>
      <div className="hidden md:block lg:hidden" style={{ paddingLeft: 48, paddingRight: 48, paddingTop: 80, paddingBottom: 80 }}>
        <ClosingText />
      </div>
      <div className="md:hidden" style={{ paddingLeft: 24, paddingRight: 24, paddingTop: 64, paddingBottom: 64 }}>
        <ClosingText />
      </div>
    </section>
  )
}
