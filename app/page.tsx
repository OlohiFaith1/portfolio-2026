import { LandingHero } from '@/components/sections/LandingHero'
import { CaseStudySection } from '@/components/sections/CaseStudySection'
import { ScrollGate } from '@/components/sections/ScrollGate'

export default function Home() {
  return (
    <ScrollGate
      landing={<LandingHero />}
      work={
        <CaseStudySection
          href="/work/azza"
          name="Azza"
          role={"Conversational &\nExperience Design"}
          year="2025"
          nextHref="/"
        />
      }
    />
  )
}
