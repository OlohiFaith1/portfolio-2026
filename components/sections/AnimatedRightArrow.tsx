'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'

interface Props {
  href: string
  /** Overrides the "Next" text color — e.g. white during a project's dark hover reveal. Undefined leaves it untouched. */
  color?: string
  /** Overrides the arrow icon asset — e.g. a white variant to match `color`. Defaults to the dark icon. */
  arrowSrc?: string
}

export function AnimatedRightArrow({ href, color, arrowSrc = '/arrow-right.svg' }: Props) {
  const reduced = useReducedMotion()
  return (
    <Link
      href={href}
      aria-label="Next project"
      className="hidden lg:flex items-center gap-2 absolute top-1/2 -translate-y-1/2"
      style={{ right: 61 }}
    >
      <span
        className="font-sans font-normal leading-[1.3] text-foreground"
        style={{ fontSize: 16, letterSpacing: '-0.16px', color, transition: 'color 0.6s ease-in-out' }}
      >
        Next
      </span>
      <motion.div
        animate={reduced ? {} : { x: [0, 9, 0] }}
        transition={
          reduced
            ? { duration: 0 }
            : { duration: 1.8, ease: 'easeInOut', repeat: Infinity }
        }
      >
        <Image
          src={arrowSrc}
          alt=""
          width={33}
          height={12}
          aria-hidden="true"
        />
      </motion.div>
    </Link>
  )
}
