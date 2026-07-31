'use client'

import { motion, useReducedMotion } from 'framer-motion'

export function AnimatedArrow() {
  const reduced = useReducedMotion()

  return (
    <motion.div
      animate={reduced ? {} : { y: [0, 4, 0] }}
      transition={
        reduced
          ? { duration: 0 }
          : { duration: 1.3, ease: 'easeInOut', repeat: Infinity }
      }
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/arrow.svg"
        alt=""
        aria-hidden="true"
        width={25}
        height={12}
        className="rotate-90"
      />
    </motion.div>
  )
}
