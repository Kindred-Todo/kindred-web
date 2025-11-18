import { scale } from '@/lib/design-system'
import videoSrc from '@/assets/kindred_final_final_4.mp4'
import { useRef, useEffect, useState } from 'react'
import { useIsMobile } from '@/hooks/useResponsiveScale'

export function VideoSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isFixed, setIsFixed] = useState(false)
  const lastScrollY = useRef(0)
  const isMobile = useIsMobile()
  
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    let snapTimeout: number | undefined
    let isSnapping = false

    // Fixed position controller and snap detector
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const scrollDirection = currentScrollY > lastScrollY.current ? 'down' : 'up'
      lastScrollY.current = currentScrollY

      const rect = section.getBoundingClientRect()
      const shouldBeFixed = rect.top <= 0 && rect.bottom > 0
      setIsFixed(shouldBeFixed)

      // Snap when approaching from above (scrolling down towards video)
      // Different thresholds for mobile vs desktop
      const snapThreshold = isMobile ? 300 : 500
      const isApproachingFromAbove = rect.top > 100 && rect.top < snapThreshold && scrollDirection === 'down'
      
      if (isApproachingFromAbove && !isSnapping) {
        if (snapTimeout) clearTimeout(snapTimeout)
        isSnapping = true
        
        snapTimeout = window.setTimeout(() => {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' })
          setTimeout(() => {
            isSnapping = false
          }, 1000)
        }, 150)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (snapTimeout) clearTimeout(snapTimeout)
    }
  }, [])
  
  return (
    <section ref={sectionRef} className="relative w-full" style={{ height: '200vh', marginBottom: 0, paddingBottom: 0 }}>
      {/* Video that becomes fixed when in view */}
      <div 
        className={isFixed ? 'fixed' : 'absolute'}
        style={{ 
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          zIndex: 0,
          margin: 0,
          padding: 0
        }}
      >
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        
        {/* Optional overlay with shadow effect like in Figma */}
        <div className="absolute inset-0 pointer-events-none shadow-[0px_0px_60px_10px_inset_rgba(0,0,0,0.5)]" />
      </div>
    </section>
  )
}

