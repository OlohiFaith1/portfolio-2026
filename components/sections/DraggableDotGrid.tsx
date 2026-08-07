'use client'

import { useEffect, useRef, useState } from 'react'

// Matches the dot-grid values in globals.css / ScrollGate's hero background.
const DOT_COLOR = '#d8d8d8'
const TILE = 28

/**
 * Separate background layer behind the landing hero content. On desktop,
 * clicking and dragging on empty background pans the dot-grid via
 * background-position; the grid tiles seamlessly so it never runs out.
 * Desktop-only — mobile/tablet render the same static grid with no listeners.
 */
export function DraggableDotGrid() {
  const [isDesktop, setIsDesktop] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const dragState = useRef<{ startX: number; startY: number; originX: number; originY: number } | null>(null)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const update = () => setIsDesktop(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (!dragging) return

    const onMouseMove = (e: MouseEvent) => {
      const drag = dragState.current
      if (!drag) return
      setOffset({
        x: drag.originX + (e.clientX - drag.startX),
        y: drag.originY + (e.clientY - drag.startY),
      })
    }

    const endDrag = () => {
      dragState.current = null
      setDragging(false)
      document.body.style.cursor = ''
      // Fold back into a single tile so the offset never grows unbounded.
      setOffset((prev) => ({
        x: ((prev.x % TILE) + TILE) % TILE,
        y: ((prev.y % TILE) + TILE) % TILE,
      }))
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', endDrag)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', endDrag)
    }
  }, [dragging])

  const onMouseDown = (e: React.MouseEvent) => {
    if (!isDesktop || e.button !== 0) return
    e.preventDefault()
    dragState.current = { startX: e.clientX, startY: e.clientY, originX: offset.x, originY: offset.y }
    setDragging(true)
    document.body.style.cursor = 'grabbing'
  }

  return (
    <div
      onMouseDown={onMouseDown}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        backgroundImage: `radial-gradient(circle, ${DOT_COLOR} 1px, transparent 1px)`,
        backgroundSize: `${TILE}px ${TILE}px`,
        backgroundPosition: `${offset.x}px ${offset.y}px`,
        cursor: isDesktop ? (dragging ? 'grabbing' : 'grab') : 'default',
      }}
      aria-hidden="true"
    />
  )
}
