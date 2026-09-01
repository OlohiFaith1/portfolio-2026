'use client'

import { useEffect, useRef } from 'react'

interface Props {
  src: string
  width: number
  height: number
  caption?: string
}

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
export function CaseStudyInlineVideo({ src, width, height, caption }: Props) {
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
        style={{ display: 'block', width: '100%', height: 'auto', borderRadius: 12 }}
      />
      {caption && <div style={{ marginTop: 8, fontSize: 10, color: 'var(--muted)' }}>{caption}</div>}
    </div>
  )
}
