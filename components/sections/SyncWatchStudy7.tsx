'use client'

// Figma: "SyncWatch 7" (391:76234) — supporting text (top-right) above a
// three-column media row, each column a different width matching its own
// image's native proportions, with a small uppercase caption beneath.
// Desktop reproduces Figma's exact numbers: text at 159px/335px (the same
// right-aligned column SyncWatchStudy5 uses), an 85px gap to the row, then
// three columns at 760/496/496px (60px side margins, 24px gaps — all
// multiples of the same 24px unit Figma uses here for both the column
// gaps and each image-to-caption gap), top-aligned rather than stretched
// to a common height, since Figma's own row height (716) is simply the
// tallest column's own height, not a shared stretch target.
//
// Each column's width-to-height ratio matches its export exactly (760:365
// ≈ 3040:1460, 496:668 ≈ 1984:2672, 496:461 ≈ 1984:1844), so the three
// flattened exports ("Syncwatch 7 (Image 1/2/3)" — the phone-screen
// overlap, the flowchart, and the FigJam board are already fully baked
// in, matching this case study's established convention) render at their
// intended sizes with zero cropping or distortion.
//
// Figma has no dedicated mobile/tablet frame for this section, so text
// reflow reuses SyncWatchStudy5's own established padding. The row itself
// switches from Figma's unequal three-column widths to a vertical stack
// below `lg` — the same breakpoint SyncWatchStudy5's own media row
// reflows at — since three columns this unevenly sized would get
// illegibly cramped rather than feel like an intentional mobile layout.
//
// No animation is indicated in Figma (a single static composition), so
// this uses the same subtle one-shot fade/rise viewport reveal
// SyncWatchStudy6 established for exactly this situation, rather than
// SyncWatchStudy2/5's "no animation" precedent, which applies to sections
// where Figma's own absence of motion was the deciding factor for a
// *different* kind of static section (image sits directly in the flow,
// no separate reveal treatment considered).
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.25, 0, 0.1, 1] as const

function SupportingText() {
  return (
    <p className="font-sans" style={{ fontSize: 16, lineHeight: 1.5, letterSpacing: '-0.16px', color: '#262626', margin: 0 }}>
      When the movie ends, the party doesn&apos;t just disappear. A summary brings the session back together, showing what was watched, how long the party lasted, and all your friends who joined the party.
    </p>
  )
}

function Caption({ children }: { children: string }) {
  return (
    <p className="font-sans" style={{ fontSize: 16, lineHeight: 1.5, letterSpacing: '-0.16px', color: '#737373', margin: 0 }}>
      {children}
    </p>
  )
}

const IMAGES = [
  {
    src: '/images/syncwatch/Syncwatch 7 (Image 1).png',
    alt: 'Three overlapping SyncWatch app screens showing the join-a-watch-party flow: a parties list, an empty invite-code modal, and a filled invite-code modal ready to submit',
    caption: 'JOIN A WATCH PARTY FLOW',
    width: 3040,
    height: 1460,
    flexWeight: 760,
  },
  {
    src: '/images/syncwatch/Syncwatch 7 (Image 2).png',
    alt: "A user-flow diagram mapping SyncWatch's information architecture, from opening the app and signing in through the Home, Parties, Chat, Profile, and Notifications sections, including the summary flow shown when playback ends",
    caption: 'PRELIMINARY INFORMATION ARCHITECTURE',
    width: 1984,
    height: 2672,
    flexWeight: 496,
  },
  {
    src: '/images/syncwatch/Syncwatch 7 (Image 3).png',
    alt: 'A FigJam board titled "Opportunities — where can we progress or create value?" with four green sticky notes: mobile-native UX with emotion, host-only permissions for clarity and structure, post-watch recap screens that can be shared, and re-sync alerts that guide users back to playback',
    caption: 'OPPORTUNITIES FOR IMPROVEMENT',
    width: 1984,
    height: 1844,
    flexWeight: 496,
  },
] as const

type MediaItem = (typeof IMAGES)[number]

function MediaColumn({ item, flexBasis }: { item: MediaItem; flexBasis: string | number }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, flex: flexBasis, minWidth: 0 }}>
      <Image
        src={item.src}
        alt={item.alt}
        width={item.width}
        height={item.height}
        sizes="(min-width: 1024px) 45vw, 100vw"
        style={{ width: '100%', height: 'auto', display: 'block' }}
      />
      <Caption>{item.caption}</Caption>
    </div>
  )
}

export function SyncWatchStudy7() {
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
      {/* Supporting text — right inset (24px) and width (333px) match the
          shared 8-column grid's own margin and 2-column span
          (components/layout/Grid.tsx) — was paddingRight:159/width:335, an
          arbitrary offset from the 1920px Figma frame; reflows to a padded
          full-width block on tablet/mobile, matching SyncWatchStudy5's own
          convention. */}
      <div className="hidden lg:flex" style={{ justifyContent: 'flex-end', paddingTop: 127, paddingRight: 24 }}>
        <div style={{ width: 333 }}>
          <SupportingText />
        </div>
      </div>
      <div className="hidden md:block lg:hidden" style={{ paddingLeft: 48, paddingRight: 48, paddingTop: 80 }}>
        <SupportingText />
      </div>
      <div className="md:hidden" style={{ paddingLeft: 24, paddingRight: 24, paddingTop: 64 }}>
        <SupportingText />
      </div>

      {/* Media row — three columns at Figma's exact proportional widths
          (760:496:496, via matching flex-grow weights so they scale
          together fluidly), top-aligned, 24px side margins (matching the
          shared grid's own margin — was 60px, independent of the text
          column's own margin above) and 24px gaps. Below `lg`, the
          columns stack vertically instead of shrinking in place. */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.6, ease: EASE }}
      >
        <div className="hidden lg:flex" style={{ alignItems: 'flex-start', paddingLeft: 24, paddingRight: 24, paddingTop: 85, paddingBottom: 120, gap: 24 }}>
          {IMAGES.map((item) => (
            <MediaColumn key={item.src} item={item} flexBasis={`${item.flexWeight} 1 0%`} />
          ))}
        </div>
        <div className="hidden md:flex lg:hidden flex-col" style={{ paddingLeft: 48, paddingRight: 48, paddingTop: 64, paddingBottom: 64, gap: 40 }}>
          {IMAGES.map((item) => (
            <MediaColumn key={item.src} item={item} flexBasis="1 1 auto" />
          ))}
        </div>
        <div className="flex md:hidden flex-col" style={{ paddingLeft: 24, paddingRight: 24, paddingTop: 48, paddingBottom: 48, gap: 40 }}>
          {IMAGES.map((item) => (
            <MediaColumn key={item.src} item={item} flexBasis="1 1 auto" />
          ))}
        </div>
      </motion.div>
    </section>
  )
}
