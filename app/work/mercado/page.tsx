import { CaseStudySection } from '@/components/sections/CaseStudySection'
import { MercadoMockup } from '@/components/sections/MercadoMockup'

export const metadata = { title: 'Mercado — Faith Olohijere' }

export default function MercadoPage() {
  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <CaseStudySection
        href="/work/mercado"
        name="Mercado"
        role={"User Interface; Experience\n& Interaction Design"}
        year="2025"
        nextHref="/work"
        Mockup={MercadoMockup}
        hoverTintColor="#092B2D"
        hoverArtwork={{
          src: '/mercado/check-circle.svg',
          // Figma positions this relative to the 1920px hover frame as
          // 12.5% + 170px — kept as a calc() (not a flattened px value) so it
          // stays proportionally placed instead of overflowing the section on
          // narrower desktop viewports.
          left: 'calc(12.5% + 170px)',
          top: -10,
          width: 1100,
          height: 1100,
          blur: 28,
        }}
        hoverTextColors={{ name: '#FFFFFF', meta: '#D4D4D4' }}
        hoverArrowSrc="/mercado/arrow-right-white.svg"
      />
    </div>
  )
}
