import { LandingHero } from '@/components/sections/LandingHero'
import { CaseStudySection } from '@/components/sections/CaseStudySection'
import { AzzaMockup } from '@/components/sections/AzzaMockup'
import { ScrollGate } from '@/components/sections/ScrollGate'
import { Preloader } from '@/components/preloader/Preloader'

export default function Home() {
  return (
    <>
      <Preloader />
      <ScrollGate
        landing={<LandingHero />}
        work={
          <CaseStudySection
            href="/work/azza"
            name="Azza"
            role={"Conversational &\nExperience Design"}
            year="2025"
            nextHref="/work/syncwatch/preview"
            Mockup={AzzaMockup}
          />
        }
      />
    </>
  )
}
