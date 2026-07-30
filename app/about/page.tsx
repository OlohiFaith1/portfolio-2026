import type { Metadata } from 'next'
import { AboutContent } from '@/components/sections/AboutContent'
import { CaseStudyFooter } from '@/components/sections/CaseStudyFooter'

export const metadata: Metadata = {
  title: 'About — Faith Olohijere',
}

export default function AboutPage() {
  return (
    <>
      {/*
        z-index: 1 makes this layer paint above the fixed footer (z-index: 0).
        The dim overlay and preview image (fixed, z:40/50) live inside this
        stacking context — they appear above About content but below the nav
        drawer (z-index: 99/100 at root).
      */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <AboutContent />
      </div>
      <CaseStudyFooter />
    </>
  )
}
