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
        comingSoon
      />
    </div>
  )
}
