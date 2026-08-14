import { CaseStudySection } from '@/components/sections/CaseStudySection'
import { SyncWatchMockup } from '@/components/sections/SyncWatchMockup'

export const metadata = { title: 'SyncWatch — Faith Olohijere' }

// The SyncWatch standalone preview — same role Azza's and Mercado's own
// previews play (hover-interactive name/mockup teaser), reached from
// Mercado's preview via "Next". comingSoon: true because the real case
// study at /work/syncwatch hasn't been built yet (matches
// lib/work-projects.ts, which already lists syncwatch as comingSoon) — the
// name and mockup show a "Coming Soon" tag instead of navigating, while
// "Next" still works normally.
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
        comingSoon
      />
    </div>
  )
}
