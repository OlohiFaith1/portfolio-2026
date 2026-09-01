import { CaseStudyProgressRail } from '@/components/sections/CaseStudyProgressRail'
import { CaseStudyHero } from '@/components/sections/CaseStudyHero'
import { CaseStudyChapter } from '@/components/sections/CaseStudyChapter'
import { NextProjectSection } from '@/components/sections/NextProjectSection'
import { CaseStudyFooter } from '@/components/sections/CaseStudyFooter'
import { CASE_STUDIES, getReadingTime } from '@/lib/case-studies'

export const metadata = { title: 'Azza — Faith Olohijere' }

// Claude Design "Snow — Portfolio v2" case-study format — a single narrow
// editorial column (Hero + four Premise/Approach/Detail/Outcome chapters),
// replacing the previous full-bleed, brand-color, per-project bespoke
// build. Real content only — see lib/case-studies.ts for sourcing notes.
export default function AzzaPage() {
  const content = CASE_STUDIES.azza
  return (
    <>
      <CaseStudyProgressRail />
      <div className="relative" style={{ zIndex: 1, backgroundColor: 'var(--background)' }}>
        {/* Not a <main> — the root layout already provides the page's one
            <main> landmark; nesting a second one here would be invalid
            HTML (a <main> may not descend from another <main>). This div
            only carries layout (width/padding), never semantics. */}
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
        <NextProjectSection currentSlug="azza" />
      </div>
      <CaseStudyFooter />
    </>
  )
}
