import { CaseStudySection } from '@/components/sections/CaseStudySection'
import { FlypMockup } from '@/components/sections/FlypMockup'

export const metadata = { title: 'Flyp — Faith Olohijere' }

// The Flyp standalone preview — same role Azza's/Mercado's/SyncWatch's own
// previews play (hover-interactive name/mockup teaser), reached from
// SyncWatch's preview via "Next". Figma ("Flyp Case Study Preview"
// 355:55627 / "...Mobile" 518:34918) shows no hover-tint/artwork reveal
// frame the way Azza/Mercado/SyncWatch each have. The real case study now
// exists at /work/flyp (matches lib/work-projects.ts, which lists flyp as
// live), so this navigates normally instead of showing "Coming Soon".
export default function FlypPreviewPage() {
  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <CaseStudySection
        href="/work/flyp"
        name="Flyp"
        role={"Product Design and\nMotion Ideation"}
        year="2025"
        nextHref="/work/silverbird/preview"
        Mockup={FlypMockup}
      />
    </div>
  )
}
