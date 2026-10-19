// A labelled stand-in for a case-study visual that hasn't been exported
// yet — same rounded surface every real figure sits in, plus a subtle
// border and a small mono label naming what will go here, so the page's
// visual rhythm (sizes, galleries, breakouts) can be reviewed before the
// real screens exist. `aspectRatio` should match the intended asset's own
// shape so swapping in the real file later doesn't shift the layout.
export function CaseStudyPlaceholder({ label, aspectRatio = '3 / 2' }: { label: string; aspectRatio?: string }) {
  return (
    <div
      role="img"
      aria-label={`Placeholder: ${label}`}
      className="relative w-full flex items-center justify-center"
      style={{ aspectRatio, borderRadius: 12, background: 'var(--surface)', border: '1px solid var(--border)' }}
    >
      <span
        className="font-mono text-center"
        style={{ padding: '0 12px', fontSize: 9.5, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)' }}
      >
        {label}
      </span>
    </div>
  )
}
