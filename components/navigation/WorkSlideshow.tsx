'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'

export interface Slide {
  src: string
  alt: string
}

const SLIDES: Slide[] = [
  { src: '/slides/slide-01.png', alt: 'Druids — crypto wallet onboarding' },
  { src: '/slides/slide-02.png', alt: 'Druids — launch screen' },
  { src: '/slides/slide-03.png', alt: 'Druids — brand identity' },
  { src: '/slides/slide-04.png', alt: 'Ticket management dashboard' },
  { src: '/slides/slide-05.png', alt: 'Parchment — key features' },
  { src: '/slides/slide-06.png', alt: 'Druids — recovery phrase' },
  { src: '/slides/slide-07.png', alt: 'Druids — authentication' },
  { src: '/slides/slide-08.png', alt: 'Druids — recovery warning' },
  { src: '/slides/slide-09.png', alt: 'Syncwatch — logo' },
  { src: '/slides/slide-10.png', alt: 'Druids — network architecture' },
  { src: '/slides/slide-11.png', alt: 'Syncwatch — party summary' },
]

// Ken Burns variants — cycle through all slides
const KB_VARIANTS = [
  { initial: { scale: 1.0,  x: '0%',    y: '0%'  }, animate: { scale: 1.06, x: '0%',    y: '-1%' } }, // zoom in + drift up
  { initial: { scale: 1.06, x: '0%',    y: '0%'  }, animate: { scale: 1.0,  x: '0%',    y: '0%'  } }, // zoom out
  { initial: { scale: 1.02, x: '0%',    y: '0%'  }, animate: { scale: 1.02, x: '-1.5%', y: '0%'  } }, // pan left
  { initial: { scale: 1.02, x: '-1.5%', y: '0%'  }, animate: { scale: 1.02, x: '0%',    y: '0%'  } }, // pan right
]

// Each project visible at full opacity for ~2s.
// Crossfade: 0.8s. Interval fires at DISPLAY_DURATION + FADE_DURATION
// so the incoming slide starts entering just as visibility time expires.
const FADE_DURATION = 0.22  // seconds — sharp cut, not a slow dissolve
const DISPLAY_MS    = 500   // ms at full opacity
const INTERVAL_MS   = DISPLAY_MS + FADE_DURATION * 1000  // 720ms
const KB_DURATION   = 1.8   // seconds — decoupled so pan/zoom stays slow while cuts are fast

interface WorkSlideshowProps {
  slides?: Slide[]
  isPlaying?: boolean
}

export function WorkSlideshow({
  slides = SLIDES,
  isPlaying = false,
}: WorkSlideshowProps) {
  const [index, setIndex] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (!isPlaying) return
    const id = setInterval(() => {
      setIndex(i => (i + 1) % slides.length)
    }, INTERVAL_MS)
    return () => clearInterval(id)
  }, [isPlaying, slides.length])

  const slide = slides[index]
  const kb = KB_VARIANTS[index % KB_VARIANTS.length]

  return (
    <div className="relative w-full h-full overflow-hidden">
      <AnimatePresence>
        <motion.div
          key={index}
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: prefersReducedMotion ? 0.01 : FADE_DURATION,
            ease: 'easeInOut',
          }}
        >
          {/* Ken Burns wrapper — sized to the slide's portrait aspect ratio */}
          <motion.div
            className="relative h-full"
            style={{ aspectRatio: '562 / 884' }}
            initial={prefersReducedMotion ? false : kb.initial}
            animate={prefersReducedMotion ? undefined : kb.animate}
            transition={prefersReducedMotion ? undefined : {
              duration: KB_DURATION,
              ease: 'linear',
            }}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              className="object-contain"
              sizes="600px"
              priority={index === 0}
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
