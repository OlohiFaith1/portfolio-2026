'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { DraggableDotGrid } from './DraggableDotGrid'
import { CaseStudyFooter } from './CaseStudyFooter'

// Real design previews (sourced as images only — see FEED below for
// provenance notes). Local assets under public/images/playground/,
// matching this codebase's existing per-section asset convention.
interface FeedImage {
  src: string
  width: number
  height: number
}

interface FeedItem {
  title: string
  image: FeedImage
}

const FEED: FeedItem[] = [
  { title: 'Wallet — Dark Mode UI', image: { src: '/images/playground/01-wallet-dark-mode-ui.png', width: 3054, height: 2934 } },
  { title: 'Token Launcher — Success', image: { src: '/images/playground/02-token-launcher-success.png', width: 4320, height: 3072 } },
  { title: 'Token Launcher — Preview Form', image: { src: '/images/playground/03-token-launcher-preview-form.png', width: 4320, height: 3072 } },
  { title: 'Token Launcher — Homepage', image: { src: '/images/playground/04-token-launcher-homepage.png', width: 4908, height: 3852 } },
  { title: 'UI States — Empty & Filled', image: { src: '/images/playground/05-ui-states-empty-filled.png', width: 3915, height: 3249 } },
  { title: 'Send Crypto', image: { src: '/images/playground/06-send-crypto.png', width: 1018, height: 978 } },
  { title: 'Onboarding Cards UI', image: { src: '/images/playground/07-onboarding-cards-ui.png', width: 2334, height: 3306 } },
  { title: 'Transaction in Progress', image: { src: '/images/playground/08-transaction-in-progress.png', width: 5025, height: 3663 } },
  { title: 'Review Transaction', image: { src: '/images/playground/09-review-transaction.png', width: 5025, height: 3663 } },
  { title: 'Add More Collaterals', image: { src: '/images/playground/10-add-more-collaterals.png', width: 5025, height: 3663 } },
  { title: 'Select Collateral Assets', image: { src: '/images/playground/11-select-collateral-assets.png', width: 5025, height: 3663 } },
  { title: 'Cross-Chain Lending Platform', image: { src: '/images/playground/12-cross-chain-lending-platform.png', width: 5025, height: 3663 } },
  { title: 'Wallet — Home Screen UI', image: { src: '/images/playground/13-wallet-home-screen-ui.png', width: 2110, height: 2184 } },
  { title: 'Select Token Pairs UI', image: { src: '/images/playground/14-select-token-pairs-ui.png', width: 1368, height: 978 } },
  { title: 'Bridge Token UI', image: { src: '/images/playground/15-bridge-token-ui.png', width: 1018, height: 978 } },
  { title: 'Recovery Phrase Management', image: { src: '/images/playground/16-recovery-phrase-management.png', width: 1391, height: 978 } },
  { title: 'Landing Page Footer', image: { src: '/images/playground/17-landing-page-footer.png', width: 1440, height: 809 } },
  { title: 'Logo Exploration', image: { src: '/images/playground/18-logo-exploration.png', width: 1920, height: 1080 } },
  { title: 'Website UI Component', image: { src: '/images/playground/19-website-ui-component.png', width: 1440, height: 1080 } },
  { title: 'Crypto Bridge UI', image: { src: '/images/playground/20-crypto-bridge-ui.png', width: 1298, height: 922 } },
  { title: 'Crypto Bridge — Dark Mode', image: { src: '/images/playground/21-crypto-bridge-dark-mode.png', width: 880, height: 739 } },
  { title: 'Create Crypto Debit Card UI', image: { src: '/images/playground/22-create-crypto-debit-card-ui.png', width: 1368, height: 978 } },
]

// A real column-independent masonry: every column shares the same width,
// so — unlike the previous row-based collage, where a short image next to
// a tall one left dead space until the tall one ended — each column packs
// its own images back to back with a fixed 24px gap and no waiting on its
// neighbors. Column width being fixed also means each image's rendered
// height is just (width / aspect ratio), so the classic "always append to
// the currently-shortest column" balancing algorithm can run once, up
// front, on FEED's own real dimensions — no per-image hand-tuned size, no
// client-side measuring. FEED's existing order (a deliberate sequence,
// not shuffled) is what keeps the result reading as curated rather than
// an arbitrary auto-generated pack.
const GAP = 24
// A column's running height is tracked in aspect-ratio units (height ÷
// width, i.e. what a column of width 1 would measure) so it stays
// independent of actual rendered pixel width; this constant approximates
// the 24px gap's share of that same unit for balancing purposes only —
// the real gap rendered is always the CSS `gap` below, exactly 24px.
const GAP_UNIT = 0.06

function buildMasonryColumns(items: FeedItem[], columnCount: number): FeedItem[][] {
  const columns: FeedItem[][] = Array.from({ length: columnCount }, () => [])
  const heights = new Array(columnCount).fill(0)
  for (const item of items) {
    let shortest = 0
    for (let i = 1; i < columnCount; i++) {
      if (heights[i] < heights[shortest]) shortest = i
    }
    if (columns[shortest].length > 0) heights[shortest] += GAP_UNIT
    heights[shortest] += item.image.height / item.image.width
    columns[shortest].push(item)
  }
  return columns
}

const MOBILE_COLUMNS = 2
const DESKTOP_COLUMNS = 3
const MOBILE_MASONRY = buildMasonryColumns(FEED, MOBILE_COLUMNS)
const DESKTOP_MASONRY = buildMasonryColumns(FEED, DESKTOP_COLUMNS)

export function PlaygroundFeed() {
  const [lightbox, setLightbox] = useState<FeedItem | null>(null)

  useEffect(() => {
    if (!lightbox) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox])

  const tile = (item: FeedItem, style: React.CSSProperties) => (
    <button
      key={item.title}
      type="button"
      onClick={() => setLightbox(item)}
      data-cursor="Expand"
      className="block"
      style={{ margin: 0, padding: 0, border: 'none', borderRadius: 10, background: 'var(--surface)', cursor: 'zoom-in', ...style }}
    >
      <Image
        src={item.image.src}
        alt={item.title}
        width={item.image.width}
        height={item.image.height}
        sizes="(min-width: 768px) 33vw, 50vw"
        className="block w-full h-auto"
        style={{ borderRadius: 10 }}
      />
    </button>
  )

  // Renders one masonry: `columns` columns side by side, each an
  // independent vertical flex stack. Nothing here waits on a sibling
  // column — a short image is immediately followed by the next image in
  // its own column, with a flat 24px gap both between columns and between
  // every image within a column.
  const masonry = (columns: FeedItem[][]) => (
    <div className="flex w-full" style={{ gap: GAP }}>
      {columns.map((column, i) => (
        <div key={i} className="flex flex-col" style={{ flex: 1, minWidth: 0, gap: GAP }}>
          {column.map((item) => tile(item, { width: '100%' }))}
        </div>
      ))}
    </div>
  )

  return (
    <>
      <div className="relative" style={{ zIndex: 1, backgroundColor: 'var(--background)' }}>
        <DraggableDotGrid />
        <div className="relative" style={{ zIndex: 1, padding: '64px 0 80px' }}>
          {/* Text stays in the same narrow, readable column every other
              page uses. */}
          <section className="mx-auto w-full max-w-[620px] px-6" style={{ paddingTop: 20 }}>
            <div className="font-mono text-[10px] tracking-[0.14em] uppercase" style={{ color: 'var(--muted)' }}>
              Playground
            </div>
            <p className="font-sans" style={{ margin: '12px 0 0', fontSize: 13.5, lineHeight: 1.72, color: 'var(--body)' }}>
              This is a collection of experiments I did, challenges I joined, unfinished ideas, and things that never shipped.
            </p>
          </section>

          {/* Mobile (<md): 2-column masonry. */}
          <div className="md:hidden mx-auto w-full max-w-[620px] px-6" style={{ marginTop: 28 }}>
            {masonry(MOBILE_MASONRY)}
          </div>

          {/* Desktop (md+): 3-column masonry, on the wider canvas the
              collage always used. `overflow-x: hidden` stays as the
              safety net against real page scroll. */}
          <div className="hidden md:block mx-auto w-full" style={{ maxWidth: 1280, padding: '36px 26px 0', overflowX: 'hidden' }}>
            {masonry(DESKTOP_MASONRY)}
          </div>
        </div>
      </div>
      <CaseStudyFooter />

      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 flex items-center justify-center"
          style={{
            zIndex: 60,
            background: 'rgba(26,26,25,0.72)',
            backdropFilter: 'blur(6px)',
            padding: '40px 26px',
            cursor: 'zoom-out',
          }}
        >
          <div style={{ width: 'min(760px, 100%)' }}>
            <div
              className="font-mono"
              style={{ marginBottom: 12, textAlign: 'center', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#efedea' }}
            >
              {lightbox.title}
            </div>
            {/* Natural aspect ratio, capped to fit the viewport — these are
                real designs of varying proportions, so (unlike the grid's
                intentionally-cropped thumbnails) nothing here should crop
                or distort the image. */}
            <Image
              src={lightbox.image.src}
              alt={lightbox.title}
              width={lightbox.image.width}
              height={lightbox.image.height}
              sizes="760px"
              style={{
                display: 'block',
                margin: '0 auto',
                width: 'auto',
                height: 'auto',
                maxWidth: '100%',
                maxHeight: 'calc(100vh - 190px)',
                borderRadius: 14,
              }}
            />
            <div
              className="font-mono"
              style={{ marginTop: 14, textAlign: 'center', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#d6d3ce' }}
            >
              Click anywhere to close
            </div>
          </div>
        </div>
      )}
    </>
  )
}
