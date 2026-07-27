'use client'

import { motion } from 'framer-motion'

export function AnimatedArrow() {
  return (
    <motion.div
      animate={{ y: [0, 9, 0] }}
      transition={{
        duration: 1.8,
        ease: 'easeInOut',
        repeat: Infinity,
      }}
    >
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
