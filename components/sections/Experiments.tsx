// Claude Design "Snow — Portfolio v2" Experiments section — real, authored
// content (not placeholders): the design's own LAB data, describing actual
// side projects in progress. Only Lorelane has a real, live destination
// (also linked from AboutContent.tsx) — Civic Lens stays non-interactive
// rather than link to a "#" placeholder.
const LAB = [
  { title: 'Lorelane', line: 'A game for readers. The thing I keep coming back to.', state: 'Building', href: 'https://lorelane.vercel.app/' },
  { title: 'Civic Lens', line: 'A civic-tech platform making public spending and government projects easier to understand.', state: 'In progress', href: null },
] as const

export function Experiments() {
  return (
    <section style={{ paddingTop: 60 }}>
      <div className="font-mono text-[10px] tracking-[0.14em] uppercase" style={{ color: 'var(--muted)' }}>
        Experiments
      </div>
      <p className="font-sans" style={{ margin: '12px 0 18px', fontSize: 13.5, lineHeight: 1.72, color: 'var(--body)' }}>
        Little projects I build with vibecoding.
      </p>
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 10 }}>
        {LAB.map((item) => (
          <LabCard key={item.title} item={item} />
        ))}
      </div>
    </section>
  )
}

function LabCard({ item }: { item: (typeof LAB)[number] }) {
  const content = (
    <>
      <div className="flex justify-between items-baseline" style={{ gap: 12 }}>
        <span className="font-sans font-medium text-foreground" style={{ fontSize: 16.5, letterSpacing: '-0.015em' }}>
          {item.title}
        </span>
        <span
          className="font-mono whitespace-nowrap"
          style={{ fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)' }}
        >
          {item.state}
        </span>
      </div>
      <div className="font-sans" style={{ marginTop: 8, fontSize: 12.5, lineHeight: 1.65, color: 'var(--body)' }}>
        {item.line}
      </div>
    </>
  )

  const style: React.CSSProperties = { display: 'block', padding: 18, borderRadius: 12, background: 'var(--surface)' }

  if (item.href) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" style={style} data-cursor="Open">
        {content}
      </a>
    )
  }
  return <div style={style}>{content}</div>
}
