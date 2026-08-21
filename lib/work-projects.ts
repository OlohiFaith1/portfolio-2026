export interface WorkProject {
  slug: string
  name: string
  year: string
  /** Matches Figma's "WORK" / "PROJECT" tag exactly — no other values. */
  type: 'WORK' | 'PROJECT'
  /** Real case-study route. Only used when comingSoon is false. */
  href: string
  comingSoon: boolean
}

// Shared by the Work grid page (and reusable anywhere else project metadata
// is needed) so names/years/routes live in exactly one place. Order and
// year/type values match the redesigned Work Grid Figma frame (471:33025)
// exactly — this is a positional layout (Azza large, Syncwatch/Mercado
// stacked beside it, then Flyp/Silverbird/LNVC), not a generic auto-placed
// list, so this array's order IS the render order.
export const WORK_PROJECTS: WorkProject[] = [
  {
    slug: 'azza',
    name: 'Azza',
    year: '2025',
    type: 'WORK',
    href: '/work/azza',
    comingSoon: false,
  },
  {
    slug: 'syncwatch',
    name: 'Syncwatch',
    year: '2026',
    type: 'WORK',
    href: '/work/syncwatch',
    comingSoon: false,
  },
  {
    slug: 'mercado',
    name: 'Mercado',
    year: '2025',
    type: 'PROJECT',
    href: '/work/mercado',
    comingSoon: false,
  },
  {
    slug: 'flyp',
    name: 'Flyp',
    year: '2025',
    type: 'WORK',
    href: '',
    comingSoon: true,
  },
  {
    slug: 'silverbird',
    name: 'Silverbird Cinemas',
    year: '2025',
    type: 'WORK',
    href: '',
    comingSoon: true,
  },
  {
    slug: 'lnvc',
    name: 'LNVC',
    year: '2025',
    type: 'PROJECT',
    href: '',
    comingSoon: true,
  },
]

// The case-study sequence (Azza → Syncwatch → Mercado → Flyp → Silverbird →
// LNVC → back to Azza) is this same array's own order — no separate
// ordering data needed. Used by NextProjectSection so every case study's
// "Next Project" card stays in lockstep with the Work Grid by construction.
export function getNextProject(currentSlug: string): WorkProject {
  const index = WORK_PROJECTS.findIndex((p) => p.slug === currentSlug)
  return WORK_PROJECTS[(index + 1) % WORK_PROJECTS.length]
}
