import { MercadoHero } from '@/components/sections/MercadoHero'

export const metadata = { title: 'Mercado — Faith Olohijere' }

// The Mercado case study — mirrors Azza's own case-study page structure
// (app/work/azza/page.tsx): a sequence of sections stacked in a single
// z-index:1 wrapper, starting with the hero. More sections get appended
// below MercadoHero as the case study is built out.
export default function MercadoPage() {
  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <MercadoHero />
    </div>
  )
}
