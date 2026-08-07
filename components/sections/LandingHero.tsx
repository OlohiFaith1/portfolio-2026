'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { AnimatedArrow } from './AnimatedArrow'

// Fade in + rise a few pixels — runs once on mount, respects prefers-reduced-motion
function useFadeUp(delay = 0) {
  const reduced = useReducedMotion()
  if (reduced) return {}
  return {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.25, 0, 0.1, 1] as const, delay },
  }
}

export function LandingHero() {
  const nameAnim     = useFadeUp(0)
  const subtitleAnim = useFadeUp(0.18)

  return (
    <section className="h-[100svh] flex flex-col">

      {/* ── Vertically centered hero text ─────────────────────────────── */}
      {/* Figma: Hero Text group, gap 19px, centered */}
      <div className="flex-1 flex flex-col justify-start sm:flex-row sm:items-center sm:justify-center px-6 pt-[calc(13svh+194px)] sm:pt-0 lg:pt-[123px]">
        <div className="flex flex-col items-start sm:items-center gap-[19px] text-left sm:text-center">

          {/* Figma: Headings/Heading 4 — Pirata One 24px, #1e1e1e, lh 1.1, w 321px */}
          <motion.h1
            {...nameAnim}
            className="font-display text-[28px] sm:text-[24px] leading-[1.1] text-foreground max-w-full sm:w-[321px]"
          >
            Ijelekhai Faith Olohijere
          </motion.h1>

          {/* Rethink Sans Regular, #5a5a5a, tracking -1% */}
          <motion.p
            {...subtitleAnim}
            className="font-sans font-normal text-[20px] sm:text-[16px] leading-[1.3] tracking-[-0.2px] sm:tracking-[-0.16px] text-[#5a5a5a]"
          >
            Product Designer (Vibecoding all my ideas)
          </motion.p>

        </div>
      </div>

      {/* ── Scroll prompt — text static, arrow animated ──────────────── */}
      {/* Rethink Sans Regular, #1e1e1e, tracking -1% — sized to match the other landing-page text */}
      <div className="pb-[6svh] md:pb-14 flex flex-col items-center gap-5">
        <p className="font-sans font-normal text-[20px] sm:text-[16px] leading-[1.3] tracking-[-0.2px] sm:tracking-[-0.16px] text-foreground">
          Scroll to see my work.
        </p>
        <AnimatedArrow />
      </div>

    </section>
  )
}
