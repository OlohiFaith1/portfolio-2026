import Image from 'next/image'
import Link from 'next/link'
import { AzzaMockup } from './AzzaMockup'

export interface CaseStudySectionProps {
  name: string
  role: string
  year: string
  nextHref: string
}

export function CaseStudySection({
  name,
  role,
  year,
  nextHref,
}: CaseStudySectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Project metadata — left edge aligns with Nav's "Menu" label via matching responsive padding */}
      <div
        className="hidden lg:flex flex-col absolute top-1/2 -translate-y-1/2 items-start gap-[20px] left-8 md:left-16 xl:left-24"
      >
        <span
          className="font-display leading-[1.1] text-foreground"
          style={{ fontSize: 20 }}
        >
          {name}
        </span>
        <span
          className="font-sans font-normal leading-[1.3] text-[#5a5a5a]"
          style={{ fontSize: 16, letterSpacing: '-0.16px', width: 191, display: 'block', whiteSpace: 'pre-line' }}
        >
          {role}
        </span>
        <span
          className="font-sans font-normal leading-[1.3] text-[#5a5a5a] whitespace-nowrap"
          style={{ fontSize: 16, letterSpacing: '-0.16px' }}
        >
          {year}
        </span>
      </div>

      {/* Device mockup — centered, rebuilt from Figma assets for crisp rendering */}
      <AzzaMockup />

      {/* Next-project arrow — right, desktop only */}
      <Link
        href={nextHref}
        aria-label="Next project"
        className="hidden lg:block absolute right-[7vw] top-1/2 -translate-y-1/2"
      >
        <Image
          src="/arrow-right.svg"
          alt=""
          width={33}
          height={12}
          aria-hidden="true"
        />
      </Link>
    </section>
  )
}
