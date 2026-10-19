'use client'

import { useEffect, useRef, useState } from 'react'

interface Props {
  src: string
  width: number
  height: number
  /** What the clip shows, for screen readers (the figure's `alt` in the
   *  case-study data) — exposed as the video's accessible name, since
   *  `alt` itself does nothing on a <video>. */
  label?: string
  caption?: string
  radius?: number
  /** Opt-in (Silverbird only, for now): names the video from `label`, holds
   *  it still under reduced motion, and adds a pause/play button. Without
   *  it, the video renders exactly as it always has. */
  controls?: boolean
}

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)'

// A case-study figure video, sitting in the same "uncropped, natural aspect
// ratio" slot FigureImage's own crop:false branch renders for images —
// width/height set the intrinsic aspect ratio (browsers infer it from these
// two attributes), then width:100%/height:auto scales that ratio down
// responsively, so nothing is ever cover-cropped the way every other
// (photo) figure in this file is. Play state is gated on actual viewport
// visibility (not a plain `autoPlay` attribute, which would start the clip
// the moment the page mounts regardless of scroll position) using the same
// IntersectionObserver approach AzzaYouPaidAnimation already uses elsewhere
// in this case-study system.
//
// With `controls`, the clip only plays while the visitor wants it to: it starts on its own
// unless they've asked for reduced motion, and the corner button pauses or
// plays it at any time (WCAG 2.2.2). That choice sticks — scrolling away
// still pauses it, but scrolling back only resumes a clip that was playing.
export function CaseStudyInlineVideo({ controls, ...props }: Props) {
  return controls ? <ControlledInlineVideo {...props} /> : <PlainInlineVideo {...props} />
}

function PlainInlineVideo({ src, width, height, caption, radius = 12 }: Omit<Props, 'controls'>) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {
            // Autoplay can be rejected before the user has interacted with
            // the page at all — nothing to recover from, the video simply
            // stays paused on its first frame until it's tried again.
          })
        } else {
          video.pause()
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <div style={{ marginTop: 24 }}>
      <video
        ref={videoRef}
        src={src}
        width={width}
        height={height}
        loop
        muted
        playsInline
        style={{ display: 'block', width: '100%', height: 'auto', borderRadius: radius }}
      />
      {caption && <div style={{ marginTop: 8, fontSize: 10, color: 'var(--muted)' }}>{caption}</div>}
    </div>
  )
}

function ControlledInlineVideo({ src, width, height, label, caption, radius = 12 }: Omit<Props, 'controls'>) {
  const videoRef = useRef<HTMLVideoElement>(null)
  // Whether the clip should play when in view; null until the reduced-motion
  // preference has been read on the client.
  const wantsPlay = useRef<boolean | null>(null)
  const inView = useRef(false)
  const userChose = useRef(false)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const sync = () => {
      if (inView.current && wantsPlay.current) {
        video.play().catch(() => {
          // Autoplay can be rejected before the user has interacted with
          // the page at all — nothing to recover from, the video simply
          // stays paused on its first frame until it's tried again.
        })
      } else {
        video.pause()
      }
    }

    const motion = window.matchMedia(REDUCED_MOTION)
    wantsPlay.current = !motion.matches
    const onMotionChange = () => {
      if (userChose.current) return
      wantsPlay.current = !motion.matches
      sync()
    }
    motion.addEventListener('change', onMotionChange)

    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    video.addEventListener('play', onPlay)
    video.addEventListener('pause', onPause)

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView.current = entry.isIntersecting
        sync()
      },
      { threshold: 0.2 }
    )
    observer.observe(video)
    return () => {
      observer.disconnect()
      motion.removeEventListener('change', onMotionChange)
      video.removeEventListener('play', onPlay)
      video.removeEventListener('pause', onPause)
    }
  }, [])

  const toggle = () => {
    const video = videoRef.current
    if (!video) return
    userChose.current = true
    wantsPlay.current = video.paused
    if (video.paused) {
      video.play().catch(() => {})
    } else {
      video.pause()
    }
  }

  return (
    <figure style={{ marginTop: 24 }}>
      <div className="relative">
        <video
          ref={videoRef}
          src={src}
          width={width}
          height={height}
          loop
          muted
          playsInline
          aria-label={label || undefined}
          style={{ display: 'block', width: '100%', height: 'auto', borderRadius: radius }}
        />
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? 'Pause video' : 'Play video'}
          className="absolute flex items-center justify-center rounded-full text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--foreground)]"
          style={{ right: 10, bottom: 10, width: 28, height: 28, background: 'rgba(17, 17, 20, 0.55)', boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.28)', cursor: 'pointer' }}
        >
          {playing ? (
            <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
              <rect x="1.5" y="1" width="2.4" height="8" rx="0.6" fill="currentColor" />
              <rect x="6.1" y="1" width="2.4" height="8" rx="0.6" fill="currentColor" />
            </svg>
          ) : (
            <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
              <path d="M2.5 1.3v7.4a.5.5 0 0 0 .77.42l5.6-3.7a.5.5 0 0 0 0-.84l-5.6-3.7a.5.5 0 0 0-.77.42Z" fill="currentColor" />
            </svg>
          )}
        </button>
      </div>
      {caption && <figcaption style={{ marginTop: 8, fontSize: 10, color: 'var(--muted)' }}>{caption}</figcaption>}
    </figure>
  )
}
