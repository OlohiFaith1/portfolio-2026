import type { DrawerMode } from './NavigationDrawer'

const SOCIALS = [
  { label: 'X', ariaLabel: 'X (Twitter)', href: 'https://x.com/olohijerefaith' },
  { label: 'LN', ariaLabel: 'LinkedIn', href: 'https://www.linkedin.com/in/faithijelekhai/' },
  { label: 'FCC', ariaLabel: 'freeCodeCamp', href: 'https://www.freecodecamp.org/news/author/snowolohijere/' },
  { label: 'MAIL', ariaLabel: 'Send email', href: 'mailto:olofaith3@gmail.com' },
]

interface Props {
  mode: DrawerMode
  mobile?: boolean
}

export function SocialLinks({ mode, mobile = false }: Props) {
  if (mobile) {
    return (
      <div className="flex items-center gap-3">
        {SOCIALS.map((social) => (
          <a
            key={social.label}
            href={social.href}
            aria-label={social.ariaLabel}
            target={social.href.startsWith('http') ? '_blank' : undefined}
            rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="flex-1 flex items-center justify-center h-10 bg-[#d4d4d4] rounded-[4px] font-medium text-[14px] md:text-[17px] text-[#1e1e1e] tracking-[-0.85px]"
          >
            {social.label}
          </a>
        ))}
      </div>
    )
  }

  return (
    <div className="absolute right-[61px] bottom-[55px] flex items-center gap-4">
      {SOCIALS.map((social) => (
        <a
          key={social.label}
          href={social.href}
          aria-label={social.ariaLabel}
          target={social.href.startsWith('http') ? '_blank' : undefined}
          rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
          className="flex items-center justify-center w-12 h-10 bg-[#d4d4d4] rounded-[4px] font-medium text-[17px] text-[#1e1e1e] tracking-[-0.85px]"
        >
          {social.label}
        </a>
      ))}
    </div>
  )
}
