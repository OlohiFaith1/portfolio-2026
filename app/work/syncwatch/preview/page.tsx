import { CaseStudySection } from '@/components/sections/CaseStudySection'
import { SyncWatchMockup } from '@/components/sections/SyncWatchMockup'

export const metadata = { title: 'SyncWatch — Faith Olohijere' }

// The SyncWatch standalone preview — same role Azza's and Mercado's own
// previews play (hover-interactive name/mockup teaser), reached from
// Mercado's preview via "Next". The real case study now exists at
// /work/syncwatch (matches lib/work-projects.ts, which lists syncwatch as
// live), so this navigates normally like Azza's and Mercado's own covers.
export default function SyncWatchPreviewPage() {
  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <CaseStudySection
        href="/work/syncwatch"
        name="SyncWatch"
        role={"User Experience and\nInterface Design"}
        year="2025"
        nextHref="/work"
        Mockup={SyncWatchMockup}
      />
    </div>
  )
}
