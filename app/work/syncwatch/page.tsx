import { CaseStudyProgressRail } from '@/components/sections/CaseStudyProgressRail'
import { CaseStudyHero } from '@/components/sections/CaseStudyHero'
import { CaseStudyChapter } from '@/components/sections/CaseStudyChapter'
import { NextProjectSection } from '@/components/sections/NextProjectSection'
import { CaseStudyFooter } from '@/components/sections/CaseStudyFooter'
import { CASE_STUDIES, getReadingTime } from '@/lib/case-studies'

export const metadata = { title: 'SyncWatch — Faith Olohijere' }

// Claude Design "Snow — Portfolio v2" case-study format — see
// app/work/azza/page.tsx for the shared structural notes.
export default function SyncWatchPage() {
  const content = CASE_STUDIES.syncwatch
  return (
    <>
      <CaseStudyProgressRail />
      <div className="relative" style={{ zIndex: 1, backgroundColor: 'var(--background)' }}>
        <main className="mx-auto w-full max-w-[620px]" style={{ padding: '64px 26px 0' }}>
          <CaseStudyHero
            year={content.year}
            org={content.org}
            role={content.role}
            title={content.title}
            readTime={getReadingTime(content)}
            heroImage={content.heroImage}
            stats={content.stats}
          />
          {content.chapters.map((chapter) => (
            <CaseStudyChapter key={chapter.no} chapter={chapter} />
          ))}
        </main>
        <NextProjectSection currentSlug="syncwatch" />
      </div>
      <CaseStudyFooter />
    </>
  )
}
