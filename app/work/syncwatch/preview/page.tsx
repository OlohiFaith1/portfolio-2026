import { CaseStudySection } from '@/components/sections/CaseStudySection'
import { SyncWatchMockup } from '@/components/sections/SyncWatchMockup'

export const metadata = { title: 'SyncWatch — Faith Olohijere' }

// The SyncWatch standalone preview — same role Azza's and Mercado's own
// previews play (hover-interactive name/mockup teaser), reached from
// Mercado's preview via "Next". The real case study now exists at
// /work/syncwatch (matches lib/work-projects.ts, which lists syncwatch as
// live), so this navigates normally like Azza's and Mercado's own covers.
//
// Hover reveal ("SyncWatch Preview Hover", Figma node 389:30578): the
// background swaps to solid black (matching this project's own #0a0a0a
// used elsewhere, e.g. WorkCardVisual's grid card) with a giant crop of
// the logo mark behind the mockup — no blur, text/arrow colors unchanged
// (unlike Mercado, which needs a white override on its dark hover bg,
// SyncWatch's text sits over the artwork's own white shape and stays
// legible as-is). The exported artwork ("Syncwatch Hover Asset.png") was
// flattened at exactly 4× this frame's own 1920×1080, i.e. it *is* the
// hover background already cropped to the frame — so unlike Azza/Mercado's
// fixed-px artwork boxes, this one is simplest as a full-bleed layer
// (width/height: 100%) that scales with the section itself rather than a
// single px size tuned to one resolution.
export default function SyncWatchPreviewPage() {
  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <CaseStudySection
        href="/work/syncwatch"
        name="SyncWatch"
        role={"User Experience and\nInterface Design"}
        year="2025"
        nextHref="/work/flyp/preview"
        Mockup={SyncWatchMockup}
        hoverTintColor="#0a0a0a"
        hoverArtwork={{
          src: '/images/syncwatch/Syncwatch Hover Asset.png',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  )
}
