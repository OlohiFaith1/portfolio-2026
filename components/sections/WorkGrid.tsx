'use client'

import { WORK_PROJECTS } from '@/lib/work-projects'
import { WorkCard } from './WorkCard'
import { CaseStudyFooter } from './CaseStudyFooter'
import { DraggableDotGrid } from './DraggableDotGrid'
import { Grid } from '@/components/layout/Grid'

// Redesigned Work Grid — Figma "Work Grid" (471:33025), a positional
// composition rather than a generic auto-placed list:
//
//   Row 1: Azza (2 of 3 equal columns) | Syncwatch + Mercado stacked (1 col)
//   Row 2: Flyp | Silverbird Cinemas | LNVC (1 col each)
//
// All three columns share one width ((content width − 2×20px gutters) / 3),
// which is also exactly Azza's own 2-column width minus the same gutter —
// confirmed directly against Figma's pixel values, not assumed. A plain
// 3-column CSS grid with a 20px gap expresses this exactly; Azza spans 2,
// the Syncwatch/Mercado pair is its own 1-column flex stack (20px gap,
// matching the grid's own gutter), and the auto-flow algorithm naturally
// wraps Flyp/Silverbird/LNVC onto their own row with no manual placement
// needed. The 48px gap between the two rows is Figma's own value, distinct
// from the 20px gutter used everywhere else in this composition.
//
// The outer 24px side margin at desktop comes from the shared Grid
// primitive (components/layout/Grid.tsx) — this section only ever needs
// its full-width margin behavior, not literal 8-column spans, since the
// card arrangement above is its own 3-column sub-composition using the
// same 20px gutter unit.
//
// Figma has no separate mobile frame for this section, so mobile/tablet
// preserve the existing single-column stacked behavior, updated only for
// the new project order, cover assets, and metadata shape.
const bySlug = Object.fromEntries(WORK_PROJECTS.map((p) => [p.slug, p]))

const AZZA_RATIO = '921/666'
const STANDARD_RATIO = '450/300'

export function WorkGrid() {
  return (
    <>
      {/* This wrapper's own solid background is load-bearing: CaseStudyFooter
          sits fixed behind it at z-0 and is only meant to be revealed once
          the user scrolls past the end of this section, so the occluding
          layer has to stay tied to normal document flow (scrolls away
          exactly at the true end) rather than being a separate
          viewport-fixed layer, which would either hide the footer
          permanently or let it bleed through early. DraggableDotGrid is
          nested inside it instead — same dot color/size/spacing/drag
          behavior as the landing page, painted on top of this same solid
          backdrop, with the actual content given its own stacking above it. */}
      <div className="relative" style={{ zIndex: 1, backgroundColor: 'var(--background)' }}>
        <DraggableDotGrid />
        <div className="relative px-6 lg:px-0 pt-24 lg:pt-[138px] pb-16 lg:pb-[149px]" style={{ zIndex: 1 }}>
          <Grid>
            <div className="lg:col-span-8">
              <h1 className="font-display uppercase leading-[1.1] text-[20px] lg:text-[24px] text-[#262626] mb-6 lg:mb-10">
                Work
              </h1>

              {/* Desktop (≥1024px) — the redesigned positional composition. */}
              <div
                className="hidden lg:grid"
                style={{ gridTemplateColumns: 'repeat(3, 1fr)', columnGap: 20, rowGap: 48 }}
              >
                <div style={{ gridColumn: 'span 2' }}>
                  <WorkCard project={bySlug.azza} aspectRatio={AZZA_RATIO} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <WorkCard project={bySlug.syncwatch} aspectRatio={STANDARD_RATIO} />
                  <WorkCard project={bySlug.mercado} aspectRatio={STANDARD_RATIO} />
                </div>
                <WorkCard project={bySlug.flyp} aspectRatio={STANDARD_RATIO} />
                <WorkCard project={bySlug.silverbird} aspectRatio={STANDARD_RATIO} />
                <WorkCard project={bySlug.lnvc} aspectRatio={STANDARD_RATIO} />
              </div>

              {/* Mobile/tablet (<1024px) — existing single-column stack,
                  preserved as-is; only the project order, cover assets, and
                  metadata shape are updated to match the redesign. */}
              <div className="flex lg:hidden flex-col gap-y-8">
                {WORK_PROJECTS.map((project) => (
                  <WorkCard
                    key={project.slug}
                    project={project}
                    aspectRatio={project.slug === 'azza' ? AZZA_RATIO : STANDARD_RATIO}
                  />
                ))}
              </div>
            </div>
          </Grid>
        </div>
      </div>
      <CaseStudyFooter />
    </>
  )
}
