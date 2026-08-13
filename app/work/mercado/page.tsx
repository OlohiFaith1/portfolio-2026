import { MercadoHero } from '@/components/sections/MercadoHero'
import { MercadoStudy2 } from '@/components/sections/MercadoStudy2'
import { MercadoStudy3 } from '@/components/sections/MercadoStudy3'
import { MercadoStudy4 } from '@/components/sections/MercadoStudy4'
import { MercadoStudy5 } from '@/components/sections/MercadoStudy5'
import { MercadoStudy6 } from '@/components/sections/MercadoStudy6'
import { CaseStudyFooter } from '@/components/sections/CaseStudyFooter'

export const metadata = { title: 'Mercado — Faith Olohijere' }

// The Mercado case study — mirrors Azza's own case-study page structure
// (app/work/azza/page.tsx) exactly, including the shared footer:
//
// z-index: 1 makes this layer paint above the fixed footer (z-index: 0).
// Each section's opaque background covers the footer while in the viewport.
// Scrolling past the end reveals the footer underneath — no JS animation,
// purely scroll-driven via natural stacking and the spacer in CaseStudyFooter.
export default function MercadoPage() {
  return (
    <>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <MercadoHero />
        <MercadoStudy2 />
        <MercadoStudy3 />
        <MercadoStudy4 />
        <MercadoStudy5 />
        <MercadoStudy6 />
      </div>
      <CaseStudyFooter />
    </>
  )
}
