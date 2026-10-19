export interface CaseStudyStat {
  value: string
  /** Omit for a short descriptive highlight that stands on its own (e.g.
   *  Silverbird's "Ticket management") rather than a value + caption pair. */
  label?: string
}

export function CaseStudyStats({ stats }: { stats: CaseStudyStat[] }) {
  if (stats.length === 0) return null
  return (
    // Grid, not a flex cluster: with only their own natural (short) content
    // width, flex items would bunch on the left instead of spanning the
    // full width of the hero image directly above them. `1fr` per column
    // makes each stat's column stretch edge to edge, however many stats a
    // given case study actually has.
    <div className="grid" style={{ gridTemplateColumns: `repeat(${stats.length}, 1fr)`, gap: 16, marginTop: 24 }}>
      {stats.map((s) => (
        <div key={s.value}>
          {/* Label-less highlights are words, not figures — set smaller so
              a long word ("management") still fits a third of a mobile
              column instead of overflowing it. */}
          <div
            className="font-sans font-medium text-foreground"
            style={{ fontSize: s.label ? 23 : 'clamp(15px, 2.6vw, 19px)', lineHeight: s.label ? undefined : 1.3, letterSpacing: '-0.025em' }}
          >
            {s.value}
          </div>
          {s.label && (
            <div
              className="font-mono"
              style={{ marginTop: 3, fontSize: 9.5, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)' }}
            >
              {s.label}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
