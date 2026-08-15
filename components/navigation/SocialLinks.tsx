const SOCIALS = [
  { label: 'X',    ariaLabel: 'X (Twitter)',  href: 'https://x.com/olohijerefaith' },
  { label: 'LN',   ariaLabel: 'LinkedIn',     href: 'https://www.linkedin.com/in/faith-ijelekhai-57a96b213/' },
  { label: 'FCC',  ariaLabel: 'freeCodeCamp', href: 'https://www.freecodecamp.org/news/author/snowolohijere/' },
  { label: 'MAIL', ariaLabel: 'Send email',   href: 'mailto:olofaith3@gmail.com' },
]

interface Props {
  mobile?: boolean
}

export function SocialLinks({ mobile = false }: Props) {
  return (
    <div className={`flex items-center gap-[16px] ${mobile ? 'w-full' : ''}`}>
      {SOCIALS.map((social) => (
        <a
          key={social.label}
          href={social.href}
          aria-label={social.ariaLabel}
          target={social.href.startsWith('http') ? '_blank' : undefined}
          rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
          className={`flex items-center justify-center h-10 bg-[#d4d4d4] rounded-[4px] font-sans font-medium text-[17px] text-[#1e1e1e] tracking-[-0.85px] ${mobile ? 'flex-1' : 'w-12'}`}
        >
          {social.label}
        </a>
      ))}
    </div>
  )
}
