import { CaseStudySection } from '@/components/sections/CaseStudySection'
import { CaseStudyFooter } from '@/components/sections/CaseStudyFooter'

export const metadata = { title: 'Work — Faith Olohijere' }

export default function WorkPage() {
  return (
    <>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <CaseStudySection
          href="/work/azza"
          name="Azza"
          role={"Conversational &\nExperience Design"}
          year="2025"
          nextHref="/"
        />
      </div>
      <CaseStudyFooter />
    </>
  )
}
