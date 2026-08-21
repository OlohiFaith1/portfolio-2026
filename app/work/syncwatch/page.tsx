import { SyncWatchHero } from '@/components/sections/SyncWatchHero'
import { SyncWatchStudy2 } from '@/components/sections/SyncWatchStudy2'
import { SyncWatchStudy3 } from '@/components/sections/SyncWatchStudy3'
import { SyncWatchStudy4 } from '@/components/sections/SyncWatchStudy4'
import { SyncWatchStudy5 } from '@/components/sections/SyncWatchStudy5'
import { SyncWatchStudy6 } from '@/components/sections/SyncWatchStudy6'
import { SyncWatchStudy7 } from '@/components/sections/SyncWatchStudy7'
import { SyncWatchStudy8 } from '@/components/sections/SyncWatchStudy8'
import { NextProjectSection } from '@/components/sections/NextProjectSection'
import { CaseStudyFooter } from '@/components/sections/CaseStudyFooter'

export const metadata = { title: 'SyncWatch — Faith Olohijere' }

// The SyncWatch case study — mirrors Azza's and Mercado's own case-study
// page structure (app/work/azza/page.tsx, app/work/mercado/page.tsx)
// exactly, including the shared footer:
//
// z-index: 1 makes this layer paint above the fixed footer (z-index: 0).
// Each section's opaque background covers the footer while in the viewport.
// Scrolling past the end reveals the footer underneath — no JS animation,
// purely scroll-driven via natural stacking and the spacer in CaseStudyFooter.
export default function SyncWatchPage() {
  return (
    <>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <SyncWatchHero />
        <SyncWatchStudy2 />
        <SyncWatchStudy3 />
        <SyncWatchStudy4 />
        <SyncWatchStudy5 />
        <SyncWatchStudy6 />
        <SyncWatchStudy7 />
        <SyncWatchStudy8 />
        <NextProjectSection currentSlug="syncwatch" />
      </div>
      <CaseStudyFooter />
    </>
  )
}
