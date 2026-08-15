import { SyncWatchHero } from '@/components/sections/SyncWatchHero'
import { SyncWatchStudy2 } from '@/components/sections/SyncWatchStudy2'
import { SyncWatchStudy3 } from '@/components/sections/SyncWatchStudy3'

export const metadata = { title: 'SyncWatch — Faith Olohijere' }

// The SyncWatch case study — mirrors Azza's and Mercado's own case-study
// page structure (app/work/azza/page.tsx, app/work/mercado/page.tsx). More
// sections (and the shared CaseStudyFooter) get appended below as the case
// study is built out, same as the other two were.
export default function SyncWatchPage() {
  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <SyncWatchHero />
      <SyncWatchStudy2 />
      <SyncWatchStudy3 />
    </div>
  )
}
