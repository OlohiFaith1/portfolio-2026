// The portfolio's shared desktop grid, established as a formal system:
// 24px side margins, 20px gutters, 8 fluid columns. At exactly 1440px
// viewport width that works out to 156.5px per column — margins and
// gutters stay fixed while column width scales fluidly with the
// viewport, so the same 24/20/8 relationship holds at any desktop width,
// not just 1440px.
//
// This maps onto Tailwind's own spacing scale with no custom theme
// values needed: `px-6` is 24px, `gap-x-5` is 20px, `grid-cols-8` is 8
// columns.
//
// Activates at `lg` (1024px) specifically, not `md` — this is "the 1440px
// desktop layout" grid, and the portfolio's case studies already have
// their own deliberate, established tablet treatment (typically 48px
// margins, single-column stacked content) distinct from both mobile and
// this desktop grid. Below `lg` this renders no padding/grid classes at
// all, so it's inert there — existing tablet/mobile markup for a section
// stays completely untouched; only the section's own desktop-tier block
// adopts this primitive (typically already gated behind its own
// `hidden lg:flex`-style className, matching the existing per-breakpoint
// section convention).
//
// Usage: wrap a section's desktop-tier content in <Grid>, then give
// children standard Tailwind column utilities directly, e.g.:
//   <Grid className="hidden lg:grid">
//     <div className="lg:col-span-4">...</div>
//     <div className="lg:col-span-2 lg:col-start-7">...</div>
//   </Grid>
// This is intentionally a plain container, not a component with its own
// column-span API — Tailwind's grid utilities already express spans and
// offsets, so duplicating that as custom props would just be another
// layer to keep in sync for no benefit.
import type { ReactNode } from 'react'

interface GridProps {
  children: ReactNode
  className?: string
}

export function Grid({ children, className = '' }: GridProps) {
  return <div className={`w-full lg:px-6 lg:grid lg:grid-cols-8 lg:gap-x-5 ${className}`}>{children}</div>
}
