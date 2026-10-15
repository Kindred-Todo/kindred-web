import { ReactLenis } from 'lenis/react'
import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'

interface SmoothScrollProps {
  children: ReactNode
}

/**
 * Smooth scrolling is a wheel affordance. Phones scroll natively — Lenis only
 * takes over touch when `syncTouch` is on, which it isn't — so on touch
 * devices it is a permanent rAF loop and a listener chain buying nothing.
 * Mount it where it does something.
 *
 * Decided after mount rather than during the first render so every device
 * renders the same tree before hydration; consumers must cope without it (see
 * LegalPage's table of contents).
 */
export function SmoothScroll({ children }: SmoothScrollProps) {
  const [smooth, setSmooth] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(pointer: fine)')
    const update = () => setSmooth(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  if (!smooth) return <>{children}</>

  return (
    <ReactLenis root options={{ lerp: 0.5, duration: 1.5, smoothWheel: true }}>
      {children}
    </ReactLenis>
  )
}
