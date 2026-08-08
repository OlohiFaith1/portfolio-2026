'use client'

import { useState } from 'react'
import { WORK_PROJECTS } from '@/lib/work-projects'
import { WorkCard } from './WorkCard'
import { CaseStudyFooter } from './CaseStudyFooter'

// Six projects, 2 columns × 3 rows on desktop (grid-cols-2 auto-places the
// array in row-major order: Azza/Mercado, Flyp/Silverbird, Syncwatch/LNVC —
// matching the requested layout), single stacked column on mobile/tablet.
export function WorkGrid() {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null)

  return (
    <>
      <div className="relative" style={{ zIndex: 1, backgroundColor: 'var(--background)' }}>
        <div className="px-6 lg:px-[60px] pt-24 lg:pt-[138px] pb-16 lg:pb-24 max-w-[1440px] mx-auto">
          <h1
            className="font-display uppercase leading-[1.1] text-[20px] lg:text-[24px] text-[#262626] mb-6 lg:mb-10"
            style={{
              filter: hoveredSlug ? 'blur(8px)' : 'blur(0px)',
              transition: 'filter 0.3s ease-in-out',
            }}
          >
            Work
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-8 lg:gap-x-6 lg:gap-y-12">
            {WORK_PROJECTS.map((project) => (
              <WorkCard
                key={project.slug}
                project={project}
                blurred={hoveredSlug !== null && hoveredSlug !== project.slug}
                onHoverChange={(hovered) => setHoveredSlug(hovered ? project.slug : null)}
              />
            ))}
          </div>
        </div>
      </div>
      <CaseStudyFooter />
    </>
  )
}
