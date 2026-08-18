import { CaseStudySection } from '@/components/sections/CaseStudySection'
import { FlypMockup } from '@/components/sections/FlypMockup'

export const metadata = { title: 'Flyp — Faith Olohijere' }

// The Flyp standalone preview — same role Azza's/Mercado's/SyncWatch's own
// previews play, reached from SyncWatch's preview via "Next". Figma
// ("Flyp Case Study Preview" 355:55627 / "...Mobile" 518:34918) shows no
// hover-tint/artwork reveal frame the way Azza/Mercado/SyncWatch each have,
// and the full multi-section case study isn't built yet — so this is
// comingSoon, same mechanism already used for Silverbird/LNVC elsewhere:
// the real name/role/year/mockup render exactly as designed, but clicking
// through shows the existing "Coming Soon" overlay instead of a dead link.
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
        comingSoon
      />
    </div>
  )
}
