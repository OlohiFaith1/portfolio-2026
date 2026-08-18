import { CaseStudySection } from '@/components/sections/CaseStudySection'
import { SilverbirdMockup } from '@/components/sections/SilverbirdMockup'

export const metadata = { title: 'Silverbird Cinemas — Faith Olohijere' }

// The Silverbird Cinemas standalone preview — same role Azza's/Mercado's/
// SyncWatch's/Flyp's own previews play, reached from Flyp's preview via
// "Next". Figma ("Silverbird Case Study Preview" 368:18296) shows no
// hover-tint/artwork reveal frame (same as Flyp), and the full multi-
// section case study isn't built yet — so this is comingSoon, matching
// Silverbird's existing Work Grid entry (lib/work-projects.ts) and the
// same precedent set by Flyp's own preview.
export default function SilverbirdPreviewPage() {
  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <CaseStudySection
        href="/work/silverbird"
        name="Silverbird Cinemas"
        role={"Web Design,\nUser Experience and Interface Design"}
        year="2025"
        nextHref="/work"
        Mockup={SilverbirdMockup}
        comingSoon
      />
    </div>
  )
}
