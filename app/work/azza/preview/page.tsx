import { CaseStudySection } from '@/components/sections/CaseStudySection'
import { AzzaMockup } from '@/components/sections/AzzaMockup'

export const metadata = { title: 'Azza — Faith Olohijere' }

// A directly-linkable standalone Azza preview, mirroring the exact
// CaseStudySection props used for Azza's landing-page preview (app/page.tsx,
// reached there via ScrollGate's scroll/swipe/keydown gesture). That gesture
// gate has no URL of its own to link back to from elsewhere, so this route
// exists purely so other pages (e.g. LNVC's "Next", wrapping the sequence
// back to the start) can point at "the first Azza preview" the same way
// every other project's own preview page already does.
export default function AzzaPreviewPage() {
  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <CaseStudySection
        href="/work/azza"
        name="Azza"
        role={"Conversational &\nExperience Design"}
        year="2025"
        nextHref="/work/syncwatch/preview"
        Mockup={AzzaMockup}
      />
    </div>
  )
}
