export interface WorkProject {
  slug: string
  name: string
  tagline: string
  /** Real case-study route. Only used when comingSoon is false. */
  href: string
  comingSoon: boolean
}

// Shared by the Work grid page (and reusable anywhere else project metadata
// is needed) so names/taglines/routes live in exactly one place.
export const WORK_PROJECTS: WorkProject[] = [
  {
    slug: 'azza',
    name: 'Azza',
    tagline: 'Turning chats to cashouts on WhatsApp.',
    href: '/work/azza',
    comingSoon: false,
  },
  {
    slug: 'mercado',
    name: 'Mercado',
    tagline: 'Helping merchants accept stablecoin payments.',
    href: '/work/mercado',
    comingSoon: false,
  },
  {
    slug: 'flyp',
    name: 'Flyp',
    tagline: 'Bringing motion to your work.',
    href: '',
    comingSoon: true,
  },
  {
    slug: 'silverbird',
    name: 'Silverbird Cinemas',
    tagline: 'Making cinema ticketing easier to manage.',
    href: '',
    comingSoon: true,
  },
  {
    slug: 'syncwatch',
    name: 'Syncwatch',
    tagline: 'Watch movies together, wherever you are.',
    href: '/work/syncwatch',
    comingSoon: false,
  },
  {
    slug: 'lnvc',
    name: 'LNVC',
    tagline: 'Documenting Nigeria’s visual culture.',
    href: '',
    comingSoon: true,
  },
]
