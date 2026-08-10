'use client'

import { useRouter } from 'next/navigation'
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
  const router = useRouter()
  const nameAnim     = useFadeUp(0)
  const subtitleAnim = useFadeUp(0.18)

  // Mobile-only: tapping the scroll prompt takes you straight to the Work
  // grid. Desktop/tablet leaves this prompt purely decorative — its own
  // scroll/swipe gesture (handled in ScrollGate) goes to the Azza standalone
  // preview instead, so the two must stay independent rather than sharing
  // one destination.
  const handleScrollPromptTap = () => {
    router.push('/work')
  }

  return (
    <section className="h-[100svh] flex flex-col">

      {/* ── Vertically centered hero text ─────────────────────────────── */}
      {/* Figma: Hero Text group, gap 19px, centered */}
      <div className="flex-1 flex flex-col justify-start sm:flex-row sm:items-center sm:justify-center px-6 pt-[calc(13svh+194px)] sm:pt-0 lg:pt-[123px]">
        <div className="flex flex-col items-center gap-[19px] text-center">

          {/* Figma: Headings/Heading 4 — Pirata One 24px, #1e1e1e, lh 1.1, w 321px */}
          <motion.h1
            {...nameAnim}
            className="font-display text-[24px] leading-[1.1] text-foreground max-w-full sm:w-[321px]"
          >
            Ijelekhai Faith Olohijere
          </motion.h1>

          {/* Mobile: "(Vibecoding all my ideas)" is its own line with extra
              top spacing, separating it from "Product Designer" above it.
              Desktop/tablet keeps the single-paragraph version, unchanged. */}
          <motion.div
            {...subtitleAnim}
            className="sm:hidden flex flex-col items-center gap-[10px] font-sans font-normal text-[16px] leading-[1.3] tracking-[-0.2px] text-[#5a5a5a]"
          >
            <p>Product Designer</p>
            <p>(Vibecoding all my ideas)</p>
          </motion.div>
          <motion.p
            {...subtitleAnim}
            className="hidden sm:block font-sans font-normal text-[16px] leading-[1.3] tracking-[-0.16px] text-[#5a5a5a]"
          >
            Product Designer (Vibecoding all my ideas)
          </motion.p>

        </div>
      </div>

      {/* ── Scroll prompt — text static, arrow animated ──────────────── */}
      {/* Rethink Sans Regular, #1e1e1e, tracking -1% — sized to match the other landing-page text.
          Mobile is a real tappable button (pointer-events-auto overrides the
          pointer-events:none ScrollGate puts on this whole tree so
          DraggableDotGrid's drag layer stays reachable underneath); desktop/
          tablet stays the original inert div — unchanged, still purely
          decorative there, with its own wheel/keydown gesture (in ScrollGate)
          leading to the Azza preview instead of the Work grid. */}
      <button
        type="button"
        onClick={handleScrollPromptTap}
        className="sm:hidden pointer-events-auto appearance-none bg-transparent border-0 p-0 m-0 cursor-pointer w-full pb-[6svh] flex flex-col items-center gap-5"
      >
        <p className="font-sans font-normal text-[16px] leading-[1.3] tracking-[-0.2px] text-foreground">
          Scroll to see my work.
        </p>
        <AnimatedArrow />
      </button>
      <div className="hidden sm:flex pb-[6svh] md:pb-14 flex-col items-center gap-5">
        <p className="font-sans font-normal text-[16px] leading-[1.3] tracking-[-0.16px] text-foreground">
          Scroll to see my work.
        </p>
        <AnimatedArrow />
      </div>

    </section>
  )
}
