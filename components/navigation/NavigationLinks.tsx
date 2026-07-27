import Link from 'next/link'
import type { DrawerMode } from './NavigationDrawer'

const LINKS = [
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Discoveries', href: '/discoveries' },
  { label: 'Travels', href: '/travels' },
  { label: 'Playground', href: '/playground' },
]

interface Props {
  mode: DrawerMode
}

export function NavigationLinks({ mode }: Props) {
  return (
    <nav aria-label="Portfolio navigation" className="absolute left-[59px] top-[40px]">
      <ul className="flex flex-col gap-[2px]">
        {LINKS.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="block font-medium text-[28px] leading-[1.5] tracking-[-1px] text-white w-[190px]"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
