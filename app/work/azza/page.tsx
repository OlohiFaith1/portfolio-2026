import { AzzaHero } from '@/components/sections/AzzaHero'
import { AzzaStudy2 } from '@/components/sections/AzzaStudy2'
import { AzzaStudy3 } from '@/components/sections/AzzaStudy3'
import { AzzaStudy4 } from '@/components/sections/AzzaStudy4'
import { AzzaStudy5 } from '@/components/sections/AzzaStudy5'
import { AzzaStudy6 } from '@/components/sections/AzzaStudy6'

export const metadata = { title: 'Azza — Case Study' }

export default function AzzaCaseStudy() {
  return (
    <>
      <AzzaHero />
      <AzzaStudy2 />
      <AzzaStudy3 />
      <AzzaStudy4 />
      <AzzaStudy5 />
      <AzzaStudy6 />
    </>
  )
}
