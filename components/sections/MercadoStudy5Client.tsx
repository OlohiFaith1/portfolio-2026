'use client'

// Figma: "Mercado 8" — a right-aligned line of body text above a full-width
// black band (#080808) containing a 3-row × 4-column wall of product UI
// cards (1433×1203 at the 1920 reference). The band itself is only 806px
// tall, so the composition — centred within it — bleeds symmetrically off
// the top and bottom, leaving only the middle row fully visible and the
// top/bottom rows cropped to a sliver. That middle row is the section's
// four "capability tour" targets.
//
// All 10 unique screens are exported — see the bottom of this file for the
// full Figma-node-to-filename list. Each card below references its path
// under public/images/mercado/. This component only ever renders an
// <Image> for a card whose src is in `existingAssetSrcs` — the sibling
// server component (MercadoStudy5.tsx) checks the filesystem for exactly
// these paths and passes down only the ones that exist, so if a file is
// ever removed or renamed again, that card degrades to an empty (but
// correctly sized/positioned/animated) white card rather than a
// broken-image icon.
//
// Two grid positions reuse the exact same underlying screen (Figma itself
// duplicates them to fill out the wall) — those positions share one asset
// entry rather than being exported twice.
//
// Responsive: Figma has no separate mobile/tablet frame for this section
// (same as every other Mercado section so far), and the composition must
// stay a scaled unit at every breakpoint — same arrangement, same bleed,
// same relative card positions — rather than reflowing into a vertical
// list. ScaledComposition already does exactly this (see below), so it's
// used unmodified at every viewport width; only its wrapper's width
// changes across breakpoints, same as the desktop-only band used to.
//
// The composition is built at its exact Figma reference pixel dimensions
// and scaled as a single unit via a width-driven ResizeObserver (the same
// technique PhoneMockupScale.tsx already uses for phone mockups elsewhere
// in this app, just measuring width instead of height) — every nested
// offset, gap, and card size stays pixel-exact to Figma at any viewport
// width without needing to convert this deeply-nested layout to
// percentages by hand.

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'

type CardId =
  | 'addCashierCode'
  | 'refundSuccess'
  | 'withdrawalMethodSelected'
  | 'addCashierInput'
  | 'bankWithdrawalSuccess'
  | 'collectionDetails'
  | 'withdrawCrypto'
  | 'walletWithdrawalSuccess'
  | 'withdrawalMethodUnselected'
  | 'refundDetails'

const CARDS: Record<CardId, { src: string; alt: string; w: number; h: number }> = {
  addCashierCode: {
    src: '/images/mercado/mercado-system-add-cashier-code.png',
    alt: 'Mercado "Add a New Cashier" screen showing a generated authorization code',
    w: 322,
    h: 183,
  },
  refundSuccess: {
    src: '/images/mercado/mercado-system-refund-success.png',
    alt: 'Mercado screen confirming a 100 USDC refund was successfully completed',
    w: 322,
    h: 268,
  },
  withdrawalMethodSelected: {
    src: '/images/mercado/mercado-system-withdrawal-method 1.png',
    alt: 'Mercado "Select a Withdrawal Method" screen with Bank Account selected',
    w: 322,
    h: 308,
  },
  addCashierInput: {
    src: '/images/mercado/mercado-system-add-cashier-input.png',
    alt: 'Mercado "Add a New Cashier" screen with an email input field',
    w: 323,
    h: 214,
  },
  bankWithdrawalSuccess: {
    src: '/images/mercado/mercado-system-bank-withdrawal-success.png',
    alt: 'Mercado screen confirming a bank withdrawal of ₦159,000 was successfully completed',
    w: 322,
    h: 396,
  },
  collectionDetails: {
    src: '/images/mercado/mercado-system-collection-details.png',
    alt: 'Mercado "Collection Details" screen showing a 25 USDC transaction',
    w: 323,
    h: 395,
  },
  withdrawCrypto: {
    src: '/images/mercado/mercado-system-withdraw-crypto.png',
    alt: 'Mercado "Withdraw to Crypto Wallet" screen with chain and wallet selectors',
    w: 322,
    h: 395,
  },
  walletWithdrawalSuccess: {
    src: '/images/mercado/mercado-system-wallet-withdrawal-success.png',
    alt: 'Mercado screen confirming a crypto withdrawal of 25 USDC was successfully completed to a wallet address',
    w: 322,
    h: 395,
  },
  withdrawalMethodUnselected: {
    src: '/images/mercado/mercado-system-withdrawal-method 2.png',
    alt: 'Mercado "Select a Withdrawal Method" screen with no option yet selected',
    w: 322,
    h: 308,
  },
  refundDetails: {
    src: '/images/mercado/mercado-system-refund-details.png',
    alt: 'Mercado "Refund Details" screen showing a full transaction breakdown',
    w: 322,
    h: 308,
  },
}

// Row order matches Figma exactly. Only two grid positions repeat a card
// used elsewhere (refundSuccess and withdrawalMethodSelected, both also in
// ROW_TOP) — every other position is its own distinct screen, including the
// two withdrawal-method cards, which look identical structurally but differ
// in which radio option is selected (see the asset-export comment below).
const ROW_TOP: CardId[] = ['addCashierCode', 'refundSuccess', 'withdrawalMethodSelected', 'addCashierInput']
const ROW_MIDDLE: CardId[] = ['bankWithdrawalSuccess', 'collectionDetails', 'withdrawCrypto', 'walletWithdrawalSuccess']
const ROW_BOTTOM: CardId[] = ['withdrawalMethodUnselected', 'refundSuccess', 'withdrawalMethodSelected', 'refundDetails']

const EASE = [0.25, 0, 0.1, 1] as const
const STAGGER_MS = 60
const TOUR_INTERVAL_MS = 3000

// Composition reference (1920×806 native canvas, matching the band's own
// aspect ratio) — the inner 3-row group sits at Figma's exact offset and
// is tall enough to bleed off both edges once centred.
const NATIVE_W = 1920
const NATIVE_H = 806
const GROUP_LEFT = 243
const GROUP_TOP = -199
const GROUP_WIDTH = 1433

function Card({
  id,
  entranceIndex,
  hasEntered,
  prefersReducedMotion,
  highlighted,
  hasAsset,
}: {
  id: CardId
  entranceIndex: number
  hasEntered: boolean
  prefersReducedMotion: boolean
  highlighted?: boolean
  hasAsset: boolean
}) {
  const card = CARDS[id]
  const shown = prefersReducedMotion || hasEntered
  return (
    <motion.div
      style={{
        position: 'relative',
        width: card.w,
        height: card.h,
        flexShrink: 0,
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: '#ffffff',
      }}
      initial={false}
      animate={{
        opacity: shown ? 1 : 0,
        y: shown ? 0 : 24,
        scale: highlighted ? 1.04 : 1,
        filter: highlighted ? 'brightness(1.08)' : 'brightness(1)',
      }}
      transition={{
        opacity: { duration: 0.6, delay: (entranceIndex * STAGGER_MS) / 1000, ease: EASE },
        y: { duration: 0.6, delay: (entranceIndex * STAGGER_MS) / 1000, ease: EASE },
        scale: { duration: 0.5, ease: 'easeInOut' },
        filter: { duration: 0.5, ease: 'easeInOut' },
      }}
    >
      {/* Not yet exported (see the asset list at the bottom of this file) —
          render the sized/positioned card with no <img>, rather than a
          broken-image icon, until the real file exists at this path. */}
      {hasAsset && (
        <Image src={card.src} alt={card.alt} width={card.w} height={card.h} sizes="20vw" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      )}
    </motion.div>
  )
}

// The fixed-pixel 1920×806 composition, scaled as a single unit to fit the
// band's actual rendered width at any breakpoint — mirrors the technique
// in PhoneMockupScale.tsx (measure the wrapper, transform: scale the
// native-size content) but width- rather than height-driven, since this
// section's band scales with viewport width, not a fixed height.
function ScaledComposition({
  hasEntered,
  prefersReducedMotion,
  activeMiddleIndex,
  existingAssetSrcs,
}: {
  hasEntered: boolean
  prefersReducedMotion: boolean
  activeMiddleIndex: number
  existingAssetSrcs: string[]
}) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useLayoutEffect(() => {
    const update = () => {
      if (wrapRef.current) setScale(wrapRef.current.offsetWidth / NATIVE_W)
    }
    update()
    const ro = new ResizeObserver(update)
    if (wrapRef.current) ro.observe(wrapRef.current)
    return () => ro.disconnect()
  }, [])

  let i = 0
  const rows: { cards: CardId[]; align: 'flex-end' | 'flex-start'; middle?: boolean }[] = [
    { cards: ROW_TOP, align: 'flex-end' },
    { cards: ROW_MIDDLE, align: 'flex-start', middle: true },
    { cards: ROW_BOTTOM, align: 'flex-start' },
  ]

  return (
    <div ref={wrapRef} style={{ position: 'relative', width: '100%', height: NATIVE_H * scale }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: NATIVE_W, height: NATIVE_H, transform: `scale(${scale})`, transformOrigin: 'top left' }}>
        <div style={{ position: 'absolute', left: GROUP_LEFT, top: GROUP_TOP, width: GROUP_WIDTH, display: 'flex', flexDirection: 'column', gap: 96 }}>
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} style={{ display: 'flex', alignItems: row.align, justifyContent: 'space-between', width: '100%' }}>
              {row.cards.map((cardId, colIndex) => {
                const cardIndex = i++
                return (
                  <Card
                    key={`${rowIndex}-${colIndex}`}
                    id={cardId}
                    entranceIndex={cardIndex}
                    hasEntered={hasEntered}
                    prefersReducedMotion={prefersReducedMotion}
                    highlighted={row.middle && !prefersReducedMotion && colIndex === activeMiddleIndex}
                    hasAsset={existingAssetSrcs.includes(CARDS[cardId].src)}
                  />
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function TextBlock() {
  return (
    <p
      className="font-sans"
      style={{ fontSize: 18, lineHeight: '28px', letterSpacing: '-0.36px', color: '#404040', margin: 0, width: 400, maxWidth: '100%' }}
    >
      A cohesive system, built for trust, reliability, and familiarity.
    </p>
  )
}

// existingAssetSrcs is computed server-side (MercadoStudy5.tsx checks the
// filesystem, since a 'use client' module can't use `fs`) and identifies
// which of the src paths in CARDS actually have a file on disk yet.
export function MercadoStudy5Client({ existingAssetSrcs }: { existingAssetSrcs: string[] }) {
  const prefersReducedMotion = useReducedMotion() ?? false
  const sectionRef = useRef<HTMLElement>(null)
  const hasEnteredOnceRef = useRef(false)
  const [hasEntered, setHasEntered] = useState(false)
  const [activeMiddleIndex, setActiveMiddleIndex] = useState(0)

  // Entrance: fires once, the first time the section reaches the viewport.
  useEffect(() => {
    if (prefersReducedMotion) return
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasEnteredOnceRef.current) {
          hasEnteredOnceRef.current = true
          setHasEntered(true)
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [prefersReducedMotion])

  // Capability tour: starts once entrance animations have had time to
  // settle, then cycles the four middle-row cards forever.
  useEffect(() => {
    if (prefersReducedMotion || !hasEntered) return

    let intervalId: ReturnType<typeof setInterval> | null = null
    const startDelay = setTimeout(() => {
      intervalId = setInterval(() => {
        setActiveMiddleIndex((i) => (i + 1) % ROW_MIDDLE.length)
      }, TOUR_INTERVAL_MS)
    }, 1500)

    return () => {
      clearTimeout(startDelay)
      if (intervalId) clearInterval(intervalId)
    }
  }, [prefersReducedMotion, hasEntered])

  return (
    <section
      ref={sectionRef}
      className="relative bg-white"
      style={{
        backgroundImage: 'radial-gradient(circle, #d8d8d8 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        overflowX: 'hidden',
      }}
    >
      {/* Text — right-aligned at Figma's exact 94px/400px values on desktop
          (safe throughout the lg range); reflows to a padded full-width
          block on tablet/mobile, matching every other Mercado section. */}
      <div className="hidden lg:flex" style={{ justifyContent: 'flex-end', paddingTop: 122, paddingRight: 94, paddingBottom: 72 }}>
        <TextBlock />
      </div>
      <div className="hidden md:block lg:hidden" style={{ paddingLeft: 48, paddingRight: 48, paddingTop: 80, paddingBottom: 48 }}>
        <TextBlock />
      </div>
      <div className="md:hidden" style={{ paddingLeft: 24, paddingRight: 24, paddingTop: 64, paddingBottom: 40 }}>
        <TextBlock />
      </div>

      {/* Full bleed composition — a single scaled unit at every breakpoint,
          from full desktop width down to the narrowest mobile viewport, so
          the arrangement/bleed/relative card positions never change, only
          the scale. */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: `${NATIVE_W} / ${NATIVE_H}`, backgroundColor: '#080808' }}>
        <ScaledComposition hasEntered={hasEntered} prefersReducedMotion={prefersReducedMotion} activeMiddleIndex={activeMiddleIndex} existingAssetSrcs={existingAssetSrcs} />
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────
// ASSETS — the Figma design (file 6GBkakkEO8wcmtWNx0uVxR, frame
// "Mercado 8", 253:18744) has 12 card positions built from 10 unique
// screens, all exported at a high scale multiplier under
// public/images/mercado/ (native size here is only ~322px wide, so
// anything exported at 1x would look soft).
//
//   Figma node id   Figma layer name                            → filename
//   367:17539       "mercado-system-add-cashier-code"             mercado-system-add-cashier-code.png
//   367:17555       "mercado-system-refund-success"               mercado-system-refund-success.png              (used 2×: top row + bottom row)
//   367:17568       "mercado-system-withdrawal-method 1"          mercado-system-withdrawal-method 1.png         (used 2×: top row + bottom row) — "Bank Account" SELECTED
//   367:17591       "mercado-system-add-cashier-input"            mercado-system-add-cashier-input.png
//   367:17607       "mercado-system-bank-withdrawal-success"      mercado-system-bank-withdrawal-success.png
//   367:17631       "mercado-system-collection-details"           mercado-system-collection-details.png
//   367:17670       "mercado-system-withdraw-crypto"              mercado-system-withdraw-crypto.png
//   367:17717       "mercado-system-wallet-withdrawal-success"    mercado-system-wallet-withdrawal-success.png   — distinct from bank-withdrawal-success (a crypto wallet withdrawal, not a bank one)
//   367:17737       "mercado-system-withdrawal-method 2"          mercado-system-withdrawal-method 2.png         — same layout as node 367:17568 above, but "Bank Account" is UNSELECTED (empty radio)
//   367:17796       "mercado-system-refund-details"               mercado-system-refund-details.png
//
// Only two grid positions duplicate a screen already used elsewhere:
// bottom-row col2 repeats "mercado-system-refund-success" (top-row col2),
// and bottom-row col3 repeats "mercado-system-withdrawal-method 1"
// (top-row col3, the SELECTED variant). Every other position — including
// bottom-row col1, the UNSELECTED withdrawal-method variant — is its own
// distinct screen.
// ─────────────────────────────────────────────────────────────────────────
