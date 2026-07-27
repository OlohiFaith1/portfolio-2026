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
      className="hidden lg:block absolute top-1/2 -translate-y-1/2"
      // right: 61px aligns the arrowhead tip with the bookmark's right edge
      // (DrawerBookmark uses pr-[61px] on its justify-end container).
      style={{ right: 61 }}
    >
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
