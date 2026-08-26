import Image from 'next/image'
import { AzzaYouPaidAnimation } from './AzzaYouPaidAnimation'
import { AzzaCouponCarousel } from './AzzaCouponCarousel'

// A paragraph is either plain text, or a sequence of segments so a
// paragraph can carry inline links (e.g. "we entered the [X](url) and
// [won](url)") without needing a full rich-text system for the one case
// that needs it.
export interface CaseStudyParagraphSegment {
  text: string
  href?: string
  bold?: boolean
}

export type CaseStudyParagraph = string | CaseStudyParagraphSegment[]

export interface CaseStudyFigure {
  src: string
  alt: string
  caption?: string
  /** Real intrinsic dimensions — required to render this figure uncropped
   *  (see FigureImage's `crop` prop) so its full height shows at natural
   *  aspect ratio instead of being cover-cropped into the standard 3:2 box. */
  width?: number
  height?: number
}

// An additional heading/body/image grouping within a chapter, after its
// primary head/body/quote/figure — e.g. Azza's Premise chapter uses this
// for its two extra sections. `imageFirst` lets a block's image lead
// (image, then body) instead of the default (body, then image).
export interface CaseStudyBlock {
  head?: string
  body?: CaseStudyParagraph[]
  image?: CaseStudyFigure
  imageFirst?: boolean
}

export interface CaseStudyCreditGroup {
  role: string
  names: string
}

export interface CaseStudyVideoClip {
  src: string
  caption?: string
}

// An ordered sequence of additional content appended after the primary
// head/body/quote/figure/blocks — used by chapters whose content is a
// longer sequence of subheadings, paragraphs, image galleries, a callout,
// and a credits list (Azza's Process/Outcome chapters), rather than the
// simpler single head/body/figure shape every other chapter uses.
export type CaseStudyPart =
  | { type: 'heading'; text: string }
  | { type: 'paragraphs'; body: CaseStudyParagraph[] }
  | { type: 'callout'; text: CaseStudyParagraph }
  | { type: 'gallery'; images: CaseStudyFigure[]; layout?: 'row' | 'column'; crop?: boolean }
  | { type: 'credits'; groups: CaseStudyCreditGroup[] }
  | { type: 'videos'; videos: CaseStudyVideoClip[]; background?: string }
  | { type: 'framedImages'; images: CaseStudyFigure[]; background?: string }
  | { type: 'couponCarousel'; caption?: string; background?: string }
  | { type: 'divider' }

export interface CaseStudyChapterData {
  /** Chapter number shown before the label ("01 — Premise"). Pass '' to
   *  show only the label, with no number/dash prefix at all. */
  no: string
  label: string
  head: string
  /** A plain string renders as the chapter's one existing paragraph
   *  (every case study but Azza still uses this form, unchanged); an
   *  array supports multiple paragraphs. */
  body: string | CaseStudyParagraph[]
  quote?: string
  /** Optional — a chapter doesn't have to carry its own primary figure if
   *  its imagery instead lives in `blocks` (see Azza's Premise chapter). */
  figure?: CaseStudyFigure
  /** Extra content sections appended after the primary body/quote/figure. */
  blocks?: CaseStudyBlock[]
  /** Renders the restored "You paid" count-up animation, framed like this
   *  chapter's other figures, directly after the primary body. */
  youPaidAnimation?: boolean
  /** Further ordered content appended after `blocks` (see CaseStudyPart). */
  parts?: CaseStudyPart[]
}

const bodyStyle: React.CSSProperties = { fontSize: 15.5, lineHeight: 1.65, color: 'var(--body)' }

function Paragraph({ p, marginTop }: { p: CaseStudyParagraph; marginTop: number }) {
  if (typeof p === 'string') {
    return (
      <p className="font-sans" style={{ ...bodyStyle, margin: `${marginTop}px 0 0` }}>
        {p}
      </p>
    )
  }
  return (
    <p className="font-sans" style={{ ...bodyStyle, margin: `${marginTop}px 0 0` }}>
      {p.map((seg, i) =>
        seg.href ? (
          <a
            key={i}
            href={seg.href}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="Open"
            style={{ color: 'inherit', fontWeight: 500, borderBottom: '2px solid var(--link-underline)' }}
          >
            {seg.text}
          </a>
        ) : (
          <span key={i} style={seg.bold ? { fontWeight: 600 } : undefined}>
            {seg.text}
          </span>
        )
      )}
    </p>
  )
}

function Paragraphs({ body }: { body: string | CaseStudyParagraph[] }) {
  const paras = Array.isArray(body) ? body : [body]
  return (
    <>
      {paras.map((p, i) => (
        <Paragraph key={i} p={p} marginTop={i === 0 ? 16 : 14} />
      ))}
    </>
  )
}

// `crop` (default true) is the standard treatment: a fixed 3:2 box with
// object-fit:cover, used by every figure elsewhere in this case study.
// Passing `crop={false}` (with the figure's real width/height) instead
// renders it at its natural aspect ratio — full width, auto height — so
// tall assets show completely instead of having their top/bottom cropped
// into a landscape box.
function FigureImage({ figure, crop = true }: { figure: CaseStudyFigure; crop?: boolean }) {
  if (!crop && figure.width && figure.height) {
    return (
      <div style={{ marginTop: 24 }}>
        <Image
          src={figure.src}
          alt={figure.alt}
          width={figure.width}
          height={figure.height}
          sizes="(min-width: 768px) 620px, 100vw"
          style={{ display: 'block', width: '100%', height: 'auto', borderRadius: 12 }}
        />
        {figure.caption && <div style={{ marginTop: 8, fontSize: 10, color: 'var(--muted)' }}>{figure.caption}</div>}
      </div>
    )
  }
  return (
    <div style={{ marginTop: 24 }}>
      <div className="relative w-full" style={{ aspectRatio: '3 / 2', borderRadius: 12, overflow: 'hidden', background: 'var(--surface)' }}>
        <Image src={figure.src} alt={figure.alt} fill sizes="(min-width: 768px) 620px, 100vw" style={{ objectFit: 'cover' }} />
      </div>
      {figure.caption && <div style={{ marginTop: 8, fontSize: 10, color: 'var(--muted)' }}>{figure.caption}</div>}
    </div>
  )
}

// One or more figures sharing the same 3:2 cropped treatment as a single
// FigureImage. `layout: 'row'` (default) lays them out in equal-width
// columns side by side (same edge-to-edge grid approach as
// CaseStudyStats); `layout: 'column'` stacks them full-width, one after
// another — each figure keeps its own top margin either way, so a
// vertical stack reads with the same rhythm as consecutive figures
// elsewhere in a chapter.
function Gallery({ images, layout = 'row', crop = true }: { images: CaseStudyFigure[]; layout?: 'row' | 'column'; crop?: boolean }) {
  return (
    <div
      className={layout === 'row' ? 'grid' : undefined}
      style={
        layout === 'row'
          ? { gridTemplateColumns: `repeat(${images.length}, 1fr)`, gap: 16, marginTop: 24 }
          : undefined
      }
    >
      {images.map((figure, i) => (
        <FigureImage key={i} figure={{ ...figure }} crop={crop} />
      ))}
    </div>
  )
}

// A vertical stack of video clips, each sharing FigureImage's bordered
// 3:2 frame (radius, overflow, spacing) so swapping stills for recordings
// doesn't change the chapter's established image rhythm. `background`
// lets a specific stack override the default surface fill (e.g. Azza's
// #FCFCFC device-frame color) without touching every other figure.
// Reproduces the phone mockup from the original AzzaHero build (shadow +
// bezel frame layered over an inner clip for the screen content), sized in
// percentages of its own box instead of that build's fixed 367×750px so it
// scales responsively while keeping the frame assets' exact proportions —
// the assets are natively 1002×2048, the same ratio as 367:750.
function PhoneMockup({ videoSrc }: { videoSrc: string }) {
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 240, aspectRatio: '367 / 750' }}>
      <Image src="/azza/hero/phone-shadow.png" alt="" fill style={{ objectFit: 'contain', opacity: 0.7 }} />
      <Image src="/azza/hero/phone-frame.png" alt="" fill style={{ objectFit: 'contain' }} />
      <div
        style={{
          position: 'absolute',
          left: '3.861%',
          top: '1.873%',
          width: '92.629%',
          height: '96.84%',
          borderRadius: '12.855% / 6.017%',
          overflow: 'hidden',
          transform: 'rotate(-0.3deg)',
        }}
      >
        <video
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
    </div>
  )
}

function VideoStack({ videos, background }: { videos: CaseStudyVideoClip[]; background?: string }) {
  return (
    <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 24 }}>
      {videos.map((v, i) => (
        <div key={i}>
          <div
            className="w-full"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 12,
              background: background ?? 'var(--surface)',
              padding: '48px 24px',
            }}
          >
            <PhoneMockup videoSrc={v.src} />
          </div>
          {v.caption && <div style={{ marginTop: 8, fontSize: 10, color: 'var(--muted)' }}>{v.caption}</div>}
        </div>
      ))}
    </div>
  )
}

// Same outer frame as VideoStack (centered content, rounded, padded,
// background-fillable box) but for figures that are already a complete
// device mockup baked into the asset itself (a phone silhouette with its
// own bezel), so no extra phone-frame layer is composited on top — that
// would double the chrome and force a crop to fit. Rendered at its real
// intrinsic size (width/height required) so nothing is cropped.
function FramedImage({ figure, background }: { figure: CaseStudyFigure; background?: string }) {
  if (!figure.width || !figure.height) return null
  return (
    <div>
      <div
        className="w-full"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 12,
          background: background ?? 'var(--surface)',
          padding: '48px 24px',
        }}
      >
        <Image
          src={figure.src}
          alt={figure.alt}
          width={figure.width}
          height={figure.height}
          sizes="240px"
          style={{ display: 'block', width: '100%', maxWidth: 240, height: 'auto' }}
        />
      </div>
      {figure.caption && <div style={{ marginTop: 8, fontSize: 10, color: 'var(--muted)' }}>{figure.caption}</div>}
    </div>
  )
}

function FramedImageStack({ images, background }: { images: CaseStudyFigure[]; background?: string }) {
  return (
    <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 24 }}>
      {images.map((figure, i) => (
        <FramedImage key={i} figure={figure} background={background} />
      ))}
    </div>
  )
}

// Same outer frame as VideoStack/FramedImageStack (full content width,
// rounded, padded box), wrapping the restored AzzaCouponCarousel animation
// instead of a video or static figure — the "black frame" is this outer
// box's background, matching the original section's #080808.
function CouponCarouselFrame({ caption, background }: { caption?: string; background?: string }) {
  return (
    <div style={{ marginTop: 24 }}>
      <div
        className="w-full"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 12,
          background: background ?? '#080808',
          padding: '48px 24px',
        }}
      >
        <AzzaCouponCarousel />
      </div>
      {caption && <div style={{ marginTop: 8, fontSize: 10, color: 'var(--muted)' }}>{caption}</div>}
    </div>
  )
}

function PartHeading({ text }: { text: string }) {
  return (
    <h3
      className="font-sans font-medium text-foreground"
      style={{ margin: '40px 0 0', fontSize: 19, lineHeight: 1.3, letterSpacing: '-0.02em' }}
    >
      {text}
    </h3>
  )
}

// Same dashed-line divider asset/wrapper already used inside the Azza work
// preview mockup (AzzaMockup.tsx) — reused as-is rather than a new rule style.
function PartDivider() {
  return (
    <div style={{ marginTop: 24, position: 'relative', height: 1, width: '100%' }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/azza/divider.svg" alt="" style={{ position: 'absolute', top: 0, left: 0, width: '100%' }} />
    </div>
  )
}

// Reuses the chapter quote's highlighted-box treatment for a pulled-out
// callout line, since it's the only "emphasized block" pattern the design
// already has — rather than inventing a new visual style for it.
function Callout({ text }: { text: CaseStudyParagraph }) {
  const segments = typeof text === 'string' ? [{ text }] : text
  return (
    <blockquote
      style={{ margin: '24px 0 0', padding: '18px 20px', borderRadius: 12, background: 'var(--surface)', fontSize: 16.5, lineHeight: 1.5, fontStyle: 'italic', letterSpacing: '-0.01em' }}
    >
      {segments.map((seg, i) => (
        <span key={i} style={seg.bold ? { fontWeight: 600 } : undefined}>
          {seg.text}
        </span>
      ))}
    </blockquote>
  )
}

function Credits({ groups }: { groups: CaseStudyCreditGroup[] }) {
  return (
    <div style={{ marginTop: 20 }}>
      {groups.map((g, i) => (
        <div key={g.role} style={{ marginTop: i === 0 ? 0 : 20 }}>
          <div className="font-mono" style={{ fontSize: 9.5, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)' }}>
            {g.role}
          </div>
          <div className="font-sans" style={{ ...bodyStyle, marginTop: 4 }}>
            {g.names}
          </div>
        </div>
      ))}
    </div>
  )
}

function ChapterPart({ part }: { part: CaseStudyPart }) {
  switch (part.type) {
    case 'heading':
      return <PartHeading text={part.text} />
    case 'paragraphs':
      return <Paragraphs body={part.body} />
    case 'callout':
      return <Callout text={part.text} />
    case 'gallery':
      return <Gallery images={part.images} layout={part.layout} crop={part.crop} />
    case 'credits':
      return <Credits groups={part.groups} />
    case 'videos':
      return <VideoStack videos={part.videos} background={part.background} />
    case 'framedImages':
      return <FramedImageStack images={part.images} background={part.background} />
    case 'couponCarousel':
      return <CouponCarouselFrame caption={part.caption} background={part.background} />
    case 'divider':
      return <PartDivider />
  }
}

// Claude Design "Snow — Portfolio v2" case-study chapter — one of four
// (Premise/Approach/Detail/Outcome), reused across every case study.
export function CaseStudyChapter({ chapter }: { chapter: CaseStudyChapterData }) {
  const { no, label, head, body, quote, figure, blocks, parts, youPaidAnimation } = chapter
  return (
    <section style={{ paddingTop: 48 }}>
      <div className="font-mono" style={{ fontSize: 9.5, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)' }}>
        {no && `${no} — `}
        {label}
      </div>
      <h2
        className="font-sans font-medium text-foreground"
        style={{ margin: '12px 0 0', fontSize: 'clamp(20px, 3vw, 24px)', lineHeight: 1.25, letterSpacing: '-0.025em' }}
      >
        {head}
      </h2>
      <Paragraphs body={body} />
      {youPaidAnimation && (
        <div style={{ marginTop: 24 }}>
          <AzzaYouPaidAnimation />
        </div>
      )}
      {quote && (
        <blockquote
          style={{ margin: '24px 0 0', padding: '18px 20px', borderRadius: 12, background: 'var(--surface)', fontSize: 16.5, lineHeight: 1.5, fontStyle: 'italic', letterSpacing: '-0.01em' }}
        >
          {quote}
        </blockquote>
      )}
      {figure && <FigureImage figure={figure} />}
      {blocks?.map((block, i) => (
        <div key={i} style={{ marginTop: 40 }}>
          {block.imageFirst && block.image && <FigureImage figure={block.image} />}
          {block.head && (
            <h3
              className="font-sans font-medium text-foreground"
              style={{ margin: block.imageFirst ? '20px 0 0' : '0', fontSize: 19, lineHeight: 1.3, letterSpacing: '-0.02em' }}
            >
              {block.head}
            </h3>
          )}
          {block.body && <Paragraphs body={block.body} />}
          {!block.imageFirst && block.image && <FigureImage figure={block.image} />}
        </div>
      ))}
      {parts?.map((part, i) => (
        <ChapterPart key={i} part={part} />
      ))}
    </section>
  )
}
