'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface Props {
  href: string
}

export function AnimatedRightArrow({ href }: Props) {
  return (
    <Link
      href={href}
      aria-label="Next project"
      className="hidden lg:flex items-center gap-2 absolute top-1/2 -translate-y-1/2"
      style={{ right: 61 }}
    >
      <span
        className="font-sans font-normal leading-[1.3] text-foreground"
        style={{ fontSize: 16, letterSpacing: '-0.16px' }}
      >
        Next
      </span>
      <motion.div
        animate={{ x: [0, 9, 0] }}
        transition={{
          duration: 1.8,
          ease: 'easeInOut',
          repeat: Infinity,
        }}
      >
        <Image
          src="/arrow-right.svg"
          alt=""
          width={33}
          height={12}
          aria-hidden="true"
        />
      </motion.div>
    </Link>
  )
}
