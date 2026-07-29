import { AzzaHero } from '@/components/sections/AzzaHero'
import { AzzaStudy2 } from '@/components/sections/AzzaStudy2'
import { AzzaStudy3 } from '@/components/sections/AzzaStudy3'
import { AzzaStudy4 } from '@/components/sections/AzzaStudy4'
import { AzzaStudy5 } from '@/components/sections/AzzaStudy5'
import { AzzaStudy6 } from '@/components/sections/AzzaStudy6'
import { AzzaStudy7 } from '@/components/sections/AzzaStudy7'
import { AzzaStudy8 } from '@/components/sections/AzzaStudy8'
import { CaseStudyFooter } from '@/components/sections/CaseStudyFooter'

export const metadata = { title: 'Azza — Case Study' }

export default function AzzaCaseStudy() {
  return (
    <>
      {/*
        z-index: 1 makes this layer paint above the fixed footer (z-index: 0).
        Each section's opaque background covers the footer while in the viewport.
        Scrolling past the end reveals the footer underneath — no JS animation,
        purely scroll-driven via natural stacking and the spacer in CaseStudyFooter.
      */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <AzzaHero />
        <AzzaStudy2 />
        <AzzaStudy3 />
        <AzzaStudy4 />
        <AzzaStudy5 />
        <AzzaStudy6 />
        <AzzaStudy7 />
        <AzzaStudy8 />
      </div>
      <CaseStudyFooter />
    </>
  )
}
