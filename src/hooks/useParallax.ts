import { useEffect, useRef } from 'react'

export function useParallax(speed: number = 0.5) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleScroll = () => {
      const scrolled = window.scrollY
      const rect = element.getBoundingClientRect()
      const elementTop = rect.top + scrolled
      const windowHeight = window.innerHeight
      
      // Only apply parallax when element is in viewport
      if (scrolled + windowHeight > elementTop && scrolled < elementTop + rect.height) {
        const offset = (scrolled - elementTop + windowHeight) * speed
        element.style.transform = `translate3d(0, ${offset}px, 0)`
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial position

    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed])

  return ref
}

