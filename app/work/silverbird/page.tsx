import { CaseStudyProgressRail } from '@/components/sections/CaseStudyProgressRail'
import { CaseStudyHero } from '@/components/sections/CaseStudyHero'
import { CaseStudyChapter } from '@/components/sections/CaseStudyChapter'
import { NextProjectSection } from '@/components/sections/NextProjectSection'
import { CaseStudyFooter } from '@/components/sections/CaseStudyFooter'
import { CASE_STUDIES, getReadingTime } from '@/lib/case-studies'

// Kept out of search results while the case study is unpublished — remove
// `robots` once the Work Grid entry goes live.
export const metadata = { title: 'Silverbird Cinemas — Faith Olohijere', robots: { index: false } }

// Claude Design "Snow — Portfolio v2" case-study format — see
// app/work/azza/page.tsx for the shared structural notes. Built for review
// only: the Work Grid entry (lib/work-projects.ts) stays comingSoon, so
// nothing links here yet.
export default function SilverbirdPage() {
  const content = CASE_STUDIES.silverbird
  return (
    <>
      <CaseStudyProgressRail />
      <div className="relative" style={{ zIndex: 1, backgroundColor: 'var(--background)' }}>
        {/* Not a <main> — see app/work/azza/page.tsx for why. */}
        <div className="mx-auto w-full max-w-[620px]" style={{ padding: '64px 26px 0' }}>
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
            <CaseStudyChapter key={chapter.label} chapter={chapter} />
          ))}
        </div>
        <NextProjectSection currentSlug="silverbird" />
      </div>
      <CaseStudyFooter />
    </>
  )
}
