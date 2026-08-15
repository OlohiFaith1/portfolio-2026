import { SyncWatchHero } from '@/components/sections/SyncWatchHero'
import { SyncWatchStudy2 } from '@/components/sections/SyncWatchStudy2'
import { SyncWatchStudy3 } from '@/components/sections/SyncWatchStudy3'
import { SyncWatchStudy4 } from '@/components/sections/SyncWatchStudy4'
import { SyncWatchStudy5 } from '@/components/sections/SyncWatchStudy5'
import { SyncWatchStudy6 } from '@/components/sections/SyncWatchStudy6'
import { SyncWatchStudy7 } from '@/components/sections/SyncWatchStudy7'
import { SyncWatchStudy8 } from '@/components/sections/SyncWatchStudy8'

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
      <SyncWatchStudy4 />
      <SyncWatchStudy5 />
      <SyncWatchStudy6 />
      <SyncWatchStudy7 />
      <SyncWatchStudy8 />
    </div>
  )
}
