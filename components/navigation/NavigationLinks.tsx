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
  mobile?: boolean
}

export function NavigationLinks({ mode, mobile = false }: Props) {
  return (
    <nav
      aria-label="Portfolio navigation"
      className={mobile ? '' : 'absolute left-[59px] top-[40px]'}
    >
      <ul className="flex flex-col gap-[2px]">
        {LINKS.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`block font-medium text-[28px] leading-[1.5] tracking-[-1px] text-white${mobile ? '' : ' w-[190px]'}`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
