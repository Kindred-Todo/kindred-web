import { scale, columnStart, columns, typography } from '@/lib/design-system'
import { useRef, useEffect, useState } from 'react'
import demo1 from '@/assets/demos/post.MP4'
import demo2 from '@/assets/demos/encourage.MP4'
import demo3 from '@/assets/demos/congrats.MP4'

export function EmpowerSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeCard, setActiveCard] = useState(0)
  const scrollProgress = useRef(0)
  const lastScrollTime = useRef(0)
  
  const video1Ref = useRef<HTMLVideoElement>(null)
  const video2Ref = useRef<HTMLVideoElement>(null)
  const video3Ref = useRef<HTMLVideoElement>(null)
  
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const handleWheel = (e: WheelEvent) => {
      const rect = section.getBoundingClientRect()
      
      console.log('Wheel event fired! rect.top:', rect.top.toFixed(0), 'rect.bottom:', rect.bottom.toFixed(0))
      
      // Check if section is in viewport and near the top
      const isInView = rect.top <= 50 && rect.bottom >= window.innerHeight
      
      if (isInView) {
        // Update progress based on scroll direction
        scrollProgress.current += e.deltaY * 0.5
        scrollProgress.current = Math.max(0, Math.min(1200, scrollProgress.current))
        
        // Calculate which card (0, 1, or 2)
        const cardIndex = Math.floor(scrollProgress.current / 400)
        const newActiveCard = Math.min(2, cardIndex)
        
        if (newActiveCard !== activeCard) {
          setActiveCard(newActiveCard)
        }
        
        console.log('Progress:', scrollProgress.current.toFixed(0), 'Active card:', cardIndex)
        
        // Only prevent default if we're NOT at the end or scrolling up
        const atEnd = scrollProgress.current >= 1150
        const scrollingDown = e.deltaY > 0
        const atStart = scrollProgress.current <= 50
        const scrollingUp = e.deltaY < 0
        
        if ((atEnd && scrollingDown) || (atStart && scrollingUp)) {
          console.log('Allowing scroll through - at boundary')
          // Don't prevent - allow normal scroll
        } else {
          console.log('Preventing scroll - locked in section')
          e.preventDefault()
          e.stopPropagation()
        }
      } else {
        // Reset if scrolled back above
        if (rect.top > 50) {
          scrollProgress.current = 0
          setActiveCard(0)
        }
      }
    }

    // Attach to document to ensure it catches all events
    document.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      document.removeEventListener('wheel', handleWheel)
    }
  }, [activeCard])
  
  // Control video playback based on active card
  useEffect(() => {
    const videos = [video1Ref.current, video2Ref.current, video3Ref.current]
    
    videos.forEach((video, index) => {
      if (video) {
        if (index === activeCard) {
          video.currentTime = 0
          video.play().catch(e => console.log('Video play failed:', e))
        } else {
          video.pause()
        }
      }
    })
  }, [activeCard])
  
  return (
    <section 
      ref={sectionRef}
      style={{ 
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '16px',
        paddingRight: '16px'
      }}
    >
      <div className="flex flex-col md:flex-row gap-12 md:ml-[var(--col-start-1)] md:max-w-[var(--col-7)]" style={{ '--col-start-1': columnStart(1), '--col-7': columns(7) } as React.CSSProperties}>
          {/* Left column - Text content */}
          <div className="flex flex-col gap-8 md:w-[35%]">
            <div 
              className="font-fraunces font-light text-[36px] md:text-[2.78vw] leading-[1.05] text-black" 
              style={{
                ...typography.h3.desktop,
              }}
            >
              <div>
                <span>Empower your </span>
                <span className="italic text-[#854dff]">friends</span>
              </div>
              <div>
                <span>Empower </span>
                <span className="italic text-[#854dff]">yourself</span>
              </div>
            </div>

            <p 
              className="font-outfit font-light text-[22px] md:text-[1.39vw] leading-[1.25] text-black" 
              style={{
                fontSize: scale(24),
                lineHeight: '1.25',
                letterSpacing: scale(-0.24),
              }}
            >
              Our positive reinforcement model fuels you with rewards and social recognition for empowering your friends- keeping them on track
            </p>
          </div>

          {/* Right column - Three video cards with active states */}
          <div className="flex flex-col md:flex-row gap-6 md:w-[62%] md:items-center">
            <div 
              className="rounded-tl-[24px] rounded-tr-[24px] aspect-[9/19.5] transition-all duration-700 ease-out overflow-hidden"
              style={{
                transform: activeCard === 0 ? 'scale(1.2)' : 'scale(0.85)',
                opacity: activeCard === 0 ? 1 : 0.4,
                width: activeCard === 0 ? '32%' : '28%',
                flexShrink: 0,
                zIndex: activeCard === 0 ? 10 : 1,
                boxShadow: activeCard === 0 ? '0 12px 40px rgba(0, 0, 0, 0.15)' : 'none'
              }}
            >
              <video 
                ref={video1Ref}
                src={demo1}
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
            <div 
              className="rounded-tl-[24px] rounded-tr-[24px] aspect-[9/19.5] transition-all duration-700 ease-out overflow-hidden"
              style={{
                transform: activeCard === 1 ? 'scale(1.2)' : 'scale(0.85)',
                opacity: activeCard === 1 ? 1 : 0.4,
                width: activeCard === 1 ? '32%' : '28%',
                flexShrink: 0,
                zIndex: activeCard === 1 ? 10 : 1,
                boxShadow: activeCard === 1 ? '0 12px 40px rgba(0, 0, 0, 0.15)' : 'none'
              }}
            >
              <video 
                ref={video2Ref}
                src={demo2}
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
            <div 
              className="rounded-tl-[24px] rounded-tr-[24px] aspect-[9/19.5] transition-all duration-700 ease-out overflow-hidden"
              style={{
                transform: activeCard === 2 ? 'scale(1.2)' : 'scale(0.85)',
                opacity: activeCard === 2 ? 1 : 0.4,
                width: activeCard === 2 ? '32%' : '28%',
                flexShrink: 0,
                zIndex: activeCard === 2 ? 10 : 1,
                boxShadow: activeCard === 2 ? '0 12px 40px rgba(0, 0, 0, 0.15)' : 'none'
              }}
            >
              <video 
                ref={video3Ref}
                src={demo3}
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
        </div>
      </div>
    </section>
  )
}

