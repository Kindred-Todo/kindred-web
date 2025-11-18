import { useState, useEffect } from 'react'
import { scaleMobile, scaleDesktop } from '@/lib/design-system'

const MOBILE_BREAKPOINT = 768 // md breakpoint in Tailwind

/**
 * Hook that returns the appropriate scale function based on viewport width
 */
export function useResponsiveScale() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check initial viewport
    const checkViewport = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    checkViewport()

    // Listen for resize
    window.addEventListener('resize', checkViewport)
    
    return () => window.removeEventListener('resize', checkViewport)
  }, [])

  // Return the appropriate scale function
  return (px: number): string => {
    return isMobile ? scaleMobile(px) : scaleDesktop(px)
  }
}

/**
 * Hook that returns whether the viewport is mobile or not
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    checkViewport()
    window.addEventListener('resize', checkViewport)
    
    return () => window.removeEventListener('resize', checkViewport)
  }, [])

  return isMobile
}

