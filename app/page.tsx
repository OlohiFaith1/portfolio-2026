import { LandingHero } from '@/components/sections/LandingHero'
import { SelectedWork } from '@/components/sections/SelectedWork'
import { Experiments } from '@/components/sections/Experiments'
import { CaseStudyFooter } from '@/components/sections/CaseStudyFooter'
import { DraggableDotGrid } from '@/components/sections/DraggableDotGrid'

// Claude Design "Snow — Portfolio v2" index — a single continuously
// scrollable page (hero, then the project grid, then Experiments, then the
// shared footer). This is now the site's one and only "work" destination —
// /work redirects here rather than duplicating it as a second, separate
// homepage-like page. The Azza case study itself is unaffected and still
// reachable at /work/azza (and /work/azza/preview) exactly as before.
export default function Home() {
  return (
    <>
      {/* Same DraggableDotGrid + z-index nesting AboutContent already uses:
          the grid is the shared opaque backdrop (load-bearing for
          CaseStudyFooter staying hidden until scrolled past), content
          stacks above it. Matches the design's own persistent dots layer. */}
      <div className="relative" style={{ backgroundColor: 'var(--background)' }}>
        <DraggableDotGrid />
        <div className="relative" style={{ zIndex: 1 }}>
          <LandingHero />
          <SelectedWork />
          {/* Same max-w-[620px]/26px-gutter/80px-bottom column Experiments
              already rendered inside on /work — unchanged, just relocated. */}
          <div className="mx-auto w-full max-w-[620px]" style={{ padding: '0 26px 80px' }}>
            <Experiments />
          </div>
        </div>
      </div>
      {/* alwaysInFlow: this page's content height isn't reliably taller
          than every viewport (unlike case studies), so the fixed-footer
          reveal trick other pages use can bleed through mid-content here —
          a plain in-flow footer after the content is the robust fix. */}
      <CaseStudyFooter alwaysInFlow />
    </>
  )
}
