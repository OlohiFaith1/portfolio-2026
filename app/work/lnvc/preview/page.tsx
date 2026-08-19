import { CaseStudySection } from '@/components/sections/CaseStudySection'
import { LNVCMockup } from '@/components/sections/LNVCMockup'

export const metadata = { title: 'LNVC — Faith Olohijere' }

// The LNVC standalone preview — same role Azza's/Mercado's/SyncWatch's/
// Flyp's/Silverbird's own previews play, reached from Silverbird's preview
// via "Next". Figma ("LNVC Case Study Preview" 518:34601) shows no hover-
// tint/artwork reveal frame (same as Flyp/Silverbird), and the full multi-
// section case study isn't built yet — so this is comingSoon, matching
// LNVC's existing Work Grid entry (lib/work-projects.ts) and the same
// precedent set by Flyp's and Silverbird's own previews.
export default function LNVCPreviewPage() {
  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <CaseStudySection
        href="/work/lnvc"
        name="LNVC"
        role="User Interface and Experience Design"
        year="2025"
        nextHref="/work/azza/preview"
        Mockup={LNVCMockup}
        comingSoon
      />
    </div>
  )
}
