import { scale } from '@/lib/design-system'
import videoSrc from '@/assets/kindred_final_final_4.mp4'
import { useRef, useEffect, useState } from 'react'

export function VideoSection() {
  const videoHeight = scale(964)
  const sectionRef = useRef<HTMLElement>(null)
  const hasSnappedRef = useRef(false)
  const timeoutRef = useRef<number>()
  const [isFixed, setIsFixed] = useState(false)
  
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    // Snap observer - only activates when you're very close to the video
    const snapObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Only snap if a significant portion is visible and scrolling down
          if (entry.isIntersecting && entry.intersectionRatio > 0.3 && !hasSnappedRef.current) {
            if (timeoutRef.current) clearTimeout(timeoutRef.current)
            
            timeoutRef.current = setTimeout(() => {
              section.scrollIntoView({ behavior: 'smooth', block: 'start' })
              hasSnappedRef.current = true
            }, 150)
          }
          
          if (!entry.isIntersecting) {
            hasSnappedRef.current = false
          }
        })
      },
      {
        threshold: [0.3, 0.4, 0.5],
        rootMargin: '0px 0px -40% 0px'
      }
    )

    // Fixed position controller
    const handleScroll = () => {
      const rect = section.getBoundingClientRect()
      // Keep fixed as long as section top is above viewport
      const shouldBeFixed = rect.top <= 0 && rect.bottom > 0
      setIsFixed(shouldBeFixed)
    }

    snapObserver.observe(section)
    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check

    return () => {
      snapObserver.disconnect()
      window.removeEventListener('scroll', handleScroll)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
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
          height: videoHeight,
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

