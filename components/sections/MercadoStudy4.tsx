// Figma: "Mercado 7" — updated since the first pass: a right-aligned text
// block ("Refunds"), a single row of three equal mockup frames (the
// approve/reject decision screen, the success confirmation, and the
// reject-reason screen), then a closing paragraph in the same right-hand
// column below the row. A consistent 120px rhythm separates all three
// (top padding, text-to-row gap, row-to-text gap, bottom padding). Figma
// has no separate mobile/tablet frame for this section (same as every
// other Mercado section so far), so tablet/mobile reflow to a single
// column in reading order.
//
// The mockup row is 1800px wide at Figma's 1920 reference with only 60px
// side margins — fluid (`width: 100%` + fixed small padding) rather than
// pinned at a fixed offset, so it scales safely down through the rest of
// the `lg` range with no overflow risk. The text column (335px, right-
// aligned at a fixed 159px from the edge) stays put throughout `lg` since
// that padding is small enough to never threaten overflow on its own.
//
// Each mockup is a single exported PNG (phone bezel + screen content
// flattened together) rather than hand-recreated markup, matching the
// same approach already used for MercadoStudy2's product photo and
// MercadoStudy3's onboarding screens — the screen content is composed of
// dozens of nested vector/text/icon layers unique to each of the three
// states, which isn't practical to reproduce faithfully as markup.
//
// These were re-exported at 4x scale via Figma's `download_assets` (979×
// 2000, matching this codebase's other high-res mockup assets) after the
// first pass shipped them at native 245×500 — `get_screenshot`'s
// `maxDimension` only ever caps a render, it never upscales past a node's
// own native size, so requesting a larger maxDimension silently kept
// returning the same 245×500 image. `download_assets`' `defaultScale`
// parameter renders at true higher resolution instead of upscaling a
// bitmap, which is what fixed it.
import Image from 'next/image'

function TextBlock({ maxWidth }: { maxWidth?: number }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth }}>
      <span className="font-display" style={{ fontSize: 24, lineHeight: 1.1, color: '#1e1e1e' }}>
        Refunds
      </span>
      <p
        className="font-sans"
        style={{ fontSize: 18, lineHeight: '28px', letterSpacing: '-0.36px', color: '#404040', margin: 0 }}
      >
        Quite often, mistakes are made and merchants have to make refunds. I designed the Refunds
        screen, so all refund requests made by cashiers can be seen, and either approved or
        rejected by the merchant.
      </p>
    </div>
  )
}

function ClosingText({ maxWidth }: { maxWidth?: number }) {
  return (
    <p
      className="font-sans"
      style={{ fontSize: 18, lineHeight: '28px', letterSpacing: '-0.36px', color: '#404040', margin: 0, maxWidth }}
    >
      If the merchant decides to reject the refund request, they have to specify why they’re
      rejecting it, for better feedback to the customer.
    </p>
  )
}

// Figma's exact proportion: the phone (245×500) sits at 42.18% of its
// frame's width, perfectly centred both axes — a flex-centred frame sized
// only by `aspectRatio` reproduces this without per-mockup offsets, and
// all three mockups now share the same 580×670 frame.
function MockupFrame({ src, alt, maxWidth }: { src: string; alt: string; maxWidth?: number }) {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth,
        aspectRatio: '580 / 670',
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#ebeff0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={979}
        height={2000}
        sizes="(min-width: 1024px) 18vw, 40vw"
        style={{ width: '42.18%', height: 'auto' }}
      />
    </div>
  )
}

const APPROVE_ALT =
  'Mercado refund details screen showing a pending 100 USDC refund with Approve Refund and Reject Refund buttons'
const SUCCESS_ALT =
  'Mercado refunds screen showing a confirmation that a 100 USDC refund was successfully completed'
const REJECT_ALT =
  'Mercado reject refund screen prompting the merchant to enter a reason for rejecting the refund'

function MockupRow({ maxWidth }: { maxWidth?: number }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 30, width: '100%', maxWidth }}>
      <MockupFrame src="/images/mercado/mercado-refund-approve.png" alt={APPROVE_ALT} />
      <MockupFrame src="/images/mercado/mercado-refund-success.png" alt={SUCCESS_ALT} />
      <MockupFrame src="/images/mercado/mercado-refund-reject.png" alt={REJECT_ALT} />
    </div>
  )
}

export function MercadoStudy4() {
  return (
    <section
      className="relative bg-white"
      style={{
        backgroundImage: 'radial-gradient(circle, #d8d8d8 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        overflowX: 'hidden',
      }}
    >
      {/* Desktop — text column right-aligned at a fixed (safe, small) 159px
          from the edge; the mockup row is fluid-width with fixed 60px
          side margins so it scales through the rest of the lg range with
          no overflow risk. */}
      <div className="hidden lg:flex lg:flex-col" style={{ paddingTop: 120, paddingBottom: 120, gap: 120 }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: 159 }}>
          <div style={{ width: 335 }}>
            <TextBlock />
          </div>
        </div>
        <div style={{ paddingLeft: 60, paddingRight: 60 }}>
          <MockupRow />
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: 159 }}>
          <div style={{ width: 335 }}>
            <ClosingText />
          </div>
        </div>
      </div>

      {/* Tablet/mobile — Figma has no dedicated frame for this section, so
          it reflows to a single column in reading order (decision screen →
          success → reject flow → why a reason is required), matching the
          padding conventions already established across the other Mercado
          sections. Each mockup is capped so it reads as a comfortably-
          sized card rather than stretching edge to edge. */}
      <div className="hidden md:flex lg:hidden flex-col" style={{ paddingLeft: 48, paddingRight: 48, paddingTop: 80, paddingBottom: 64, gap: 48 }}>
        <TextBlock maxWidth={400} />
        <MockupRowStack maxWidth={400} />
        <ClosingText maxWidth={400} />
      </div>

      <div className="flex md:hidden flex-col" style={{ paddingLeft: 24, paddingRight: 24, paddingTop: 64, paddingBottom: 48, gap: 40 }}>
        <TextBlock />
        <MockupRowStack maxWidth={335} />
        <ClosingText />
      </div>
    </section>
  )
}

// Tablet/mobile stack the three mockups vertically (one per row) rather
// than the desktop's 3-column grid — same frames/images, just reflowed.
function MockupRowStack({ maxWidth }: { maxWidth: number }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: '100%' }}>
      <MockupFrame src="/images/mercado/mercado-refund-approve.png" alt={APPROVE_ALT} maxWidth={maxWidth} />
      <MockupFrame src="/images/mercado/mercado-refund-success.png" alt={SUCCESS_ALT} maxWidth={maxWidth} />
      <MockupFrame src="/images/mercado/mercado-refund-reject.png" alt={REJECT_ALT} maxWidth={maxWidth} />
    </div>
  )
}
