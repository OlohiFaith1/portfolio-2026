import Link from 'next/link'
import { DraggableDotGrid } from './DraggableDotGrid'

// Figma "WIP Page" (502:34339, desktop) / "Landing Pageeeee (Mobile)"
// (505:34369, actually the WIP page's mobile companion — mislabeled in
// Figma) — the temporary placeholder shown for sections not built yet.
// Desktop: one flowing paragraph, naturally wrapping within 437px, centered
// horizontally but sitting 33px above true vertical center. Mobile: the
// same copy broken into three explicit lines (not the desktop paragraph
// scaled down), centered on both axes exactly. The bookmark shown in both
// Figma frames is the existing global one (NavigationDrawer/DrawerBookmark,
// mounted site-wide in the root layout) — not reimplemented here.
const LINK_CLASS =
  '[text-underline-position:from-font] decoration-from-font decoration-solid font-medium text-[#262626] underline'

export function WipPage() {
  return (
    <div className="relative h-[100svh] overflow-hidden" style={{ backgroundColor: 'var(--background)' }}>
      <DraggableDotGrid />
      <div className="relative h-full flex items-center justify-center px-6" style={{ zIndex: 1 }}>
        {/* Desktop/tablet (≥640px) */}
        <p
          className="hidden sm:block w-[437px] max-w-full text-center font-sans font-normal text-[16px] leading-[1.5] text-[#5a5a5a]"
          style={{ letterSpacing: '-0.16px', transform: 'translateY(-33px)' }}
        >
          This page is still in progress. While I’m still trying to finish it up, check out my{' '}
          <Link href="/work" className={LINK_CLASS} style={{ letterSpacing: '-0.16px' }}>
            Work
          </Link>{' '}
          or{' '}
          <Link href="/about" className={LINK_CLASS} style={{ letterSpacing: '-0.16px' }}>
            About
          </Link>{' '}
          pages.
        </p>

        {/* Mobile (<640px) */}
        <div
          className="sm:hidden w-[317px] max-w-full text-center font-sans font-normal text-[14px] leading-[1.5] text-[#5a5a5a]"
          style={{ letterSpacing: '-0.14px' }}
        >
          <p className="m-0">This page is still in progress. </p>
          <p className="m-0">While I’m still trying to finish it up, </p>
          <p className="m-0">
            check out my{' '}
            <Link href="/work" className={LINK_CLASS} style={{ letterSpacing: '-0.14px' }}>
              Work
            </Link>{' '}
            or{' '}
            <Link href="/about" className={LINK_CLASS} style={{ letterSpacing: '-0.14px' }}>
              About
            </Link>{' '}
            pages.
          </p>
        </div>
      </div>
    </div>
  )
}
