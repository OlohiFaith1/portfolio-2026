import Image from 'next/image'
import { DraggableDotGrid } from './DraggableDotGrid'
import { CaseStudyFooter } from './CaseStudyFooter'

// Claude Design "Snow — Portfolio v2" Writing tab — real content: five
// actual published articles (title/source/description/image/href), across
// freeCodeCamp, Medium, and Substack. Descriptions are drawn from each
// article's real content where it could be fetched (freeCodeCamp,
// Substack); Medium blocks scraping (Cloudflare 403 on every fetch
// attempt, including a mirror reader), so those two descriptions are
// derived from the article's own title/premise instead of invented detail.
// Images are each article's real featured/cover image, downloaded locally
// — omitted (not faked) for the two Medium entries, since Medium's block
// also prevented reading their og:image.
const WRITING = [
  {
    title: 'How to Use Viewing Patterns in Your Website Designs',
    source: 'freeCodeCamp',
    description:
      'How F-pattern, Z-pattern, and Gutenberg-diagram eye-scanning behavior can guide where the most important content goes on a page.',
    image: '/images/writing/viewing-patterns.jpg',
    href: 'https://www.freecodecamp.org/news/how-to-use-viewing-patterns-in-your-website-design/',
  },
  {
    title: 'I recently reviewed 5 AI-Native UX Design tools in 50 Minutes (2026)',
    source: 'Medium',
    description: 'A rapid, hands-on look at five AI-native UX design tools, testing what each one is actually like to use in a single sitting.',
    image: null,
    href: 'https://medium.com/design-bootcamp/i-recently-reviewed-5-ai-native-ux-design-tools-in-50-minutes-2026-80f403db65f8',
  },
  {
    title: 'How to Use Variables in Figma – A Handbook for Beginners',
    source: 'freeCodeCamp',
    description:
      'A beginner’s handbook on Figma variables — reusable colors, numbers, text, and toggles that update everywhere at once, for building flexible design systems.',
    image: '/images/writing/figma-variables.png',
    href: 'https://www.freecodecamp.org/news/variables-in-figma-handbook/',
  },
  {
    title: 'The Power of Personalizing User Experience',
    source: 'Medium',
    description: 'On why tailoring an experience to the individual user builds stronger engagement and trust than one-size-fits-all design.',
    image: null,
    href: 'https://medium.com/ux-planet/the-power-of-personalizing-user-experience-a88e2f3bee29',
  },
  {
    title: 'Curiosity; a gift for day zero',
    source: 'Substack',
    description: 'A personal reflection on moving through months of creative burnout and rediscovering excitement for design through curiosity.',
    image: null,
    href: 'https://olohijerefaith.substack.com/p/curiosity-a-gift-for-day-zero',
  },
] as const

export function WritingList() {
  return (
    <>
      <div className="relative" style={{ zIndex: 1, backgroundColor: 'var(--background)' }}>
        <DraggableDotGrid />
        <div className="relative mx-auto w-full max-w-[620px]" style={{ zIndex: 1, padding: '64px 26px 80px' }}>
          <section style={{ paddingTop: 20 }}>
            <div className="font-mono text-[10px] tracking-[0.14em] uppercase" style={{ color: 'var(--muted)' }}>
              Writing
            </div>
            <p className="font-sans" style={{ margin: '12px 0 16px', fontSize: 13.5, lineHeight: 1.72, color: 'var(--body)' }}>
              I write about design, technology, and the things I&rsquo;m curious about. My articles are mostly
              published on freeCodeCamp, Medium, and Substack.
            </p>
            <div className="flex flex-col" style={{ gap: 2 }}>
              {WRITING.map((w) => (
                <a
                  key={w.title}
                  href={w.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="Read"
                  className="flex items-center writing-row"
                  style={{ gap: 16, margin: '0 -14px', padding: 14, borderRadius: 10, transition: 'background 220ms ease' }}
                >
                  <div
                    className="relative flex-shrink-0"
                    style={{ width: 76, height: 76, borderRadius: 10, overflow: 'hidden', background: 'var(--surface)' }}
                  >
                    {w.image && <Image src={w.image} alt="" fill sizes="76px" style={{ objectFit: 'cover' }} />}
                  </div>
                  <div className="min-w-0" style={{ flex: 1 }}>
                    <div className="font-mono text-[9px] tracking-[0.1em] uppercase" style={{ color: 'var(--muted)' }}>
                      {w.source}
                    </div>
                    <div
                      className="font-sans font-medium text-foreground"
                      style={{ marginTop: 3, fontSize: 15.5, lineHeight: 1.35, letterSpacing: '-0.015em' }}
                    >
                      {w.title}
                    </div>
                    <p
                      className="font-sans"
                      style={{
                        margin: '4px 0 0',
                        fontSize: 12.5,
                        lineHeight: 1.5,
                        color: 'var(--muted)',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {w.description}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </section>
        </div>
      </div>
      <CaseStudyFooter />
    </>
  )
}
