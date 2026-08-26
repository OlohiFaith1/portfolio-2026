import { ProjectGrid } from './ProjectGrid'

// Index page's "Selected work" preview. Claude Design's own index `<main>`
// wraps its entire content (hero + grid) in `max-width: 620px; margin: 0
// auto; padding: 64px 26px 150px` — this is that same 620px column/26px
// gutter applied to the grid specifically (LandingHero already owns its
// own matching width above it). `overflow-x: hidden` is a safety net so
// the grid's own -10px card-edge pullback (see ProjectGrid.tsx) can never
// push content past the viewport on narrow screens.
export function SelectedWork() {
  return (
    <div className="mx-auto w-full max-w-[620px]" style={{ padding: '0 26px', overflowX: 'hidden' }}>
      <ProjectGrid heading="Selected work" />
    </div>
  )
}
