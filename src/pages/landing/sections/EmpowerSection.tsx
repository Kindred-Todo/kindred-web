import { scale, columnStart, columns, typography } from '@/lib/design-system'
import { useRef, useEffect, useState } from 'react'
import { useResponsiveScale, useIsMobile } from '@/hooks/useResponsiveScale'
import { useScroll, useMotionValueEvent } from 'framer-motion'
import demo1 from '@/assets/demos/post.MP4'
import demo2 from '@/assets/demos/encourage.MP4'
import demo3 from '@/assets/demos/congrats.MP4'

export function EmpowerSection() {
  const scale = useResponsiveScale()
  const isMobile = useIsMobile()
  const sectionRef = useRef<HTMLElement>(null)
  const [activeCard, setActiveCard] = useState(0)
  
  const video1Ref = useRef<HTMLVideoElement>(null)
  const video2Ref = useRef<HTMLVideoElement>(null)
  const video3Ref = useRef<HTMLVideoElement>(null)

  // Track scroll progress of the container
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  })

  // Update active card based on scroll progress
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.33) {
      setActiveCard(0)
    } else if (latest < 0.66) {
      setActiveCard(1)
    } else {
      setActiveCard(2)
    }
  })
  
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
      className="relative"
      style={{ 
        height: '300vh', // Tall container for scrolling
      }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen flex items-center px-4">
        <div className="flex flex-col md:flex-row gap-12 md:ml-[var(--col-start-1)] md:max-w-[var(--col-7)] w-full" style={{ '--col-start-1': columnStart(1), '--col-7': columns(7) } as React.CSSProperties}>
            {/* Left column - Text content */}
            <div className="flex flex-col gap-8 md:w-[35%]">
              <div 
                className="font-fraunces font-light leading-[1.05] text-black" 
                style={{
                  fontSize: scale(isMobile ? 36 : 48),
                  letterSpacing: scale(isMobile ? -0.72 : -0.96),
                  lineHeight: '1.05',
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
                className="font-outfit font-light leading-[1.25] text-black" 
                style={{
                  fontSize: scale(isMobile ? 20 : 24),
                  lineHeight: '1.25',
                  letterSpacing: scale(isMobile ? -0.2 : -0.24),
                }}
              >
                Our positive reinforcement model fuels you with rewards and social recognition for empowering your friends- keeping them on track
              </p>

              {/* Navigation Pills */}
              <div className="flex p-1 bg-[#F5F5F7] rounded-full w-fit mt-4">
                {['Posting', 'Encouragements', 'Congratulations'].map((item, index) => (
                  <button
                    key={item}
                    onClick={() => {
                      // Manual navigation could be tricky with scroll-driven animation. 
                      // Ideally, clicking these would scroll the page to the right section.
                      // For now, we'll keep the state update but it will be overridden by scroll if user scrolls.
                      setActiveCard(index)
                      
                      // Optional: Scroll to the corresponding section
                      if (sectionRef.current) {
                        const sectionTop = sectionRef.current.offsetTop
                        const sectionHeight = sectionRef.current.offsetHeight
                        const targetScroll = sectionTop + (sectionHeight * (index / 3)) + (window.innerHeight / 2)
                        window.scrollTo({ top: targetScroll, behavior: 'smooth' })
                      }
                    }}
                    className={`
                      px-5 py-2 rounded-full text-sm font-outfit font-medium transition-all duration-300 cursor-pointer
                      ${activeCard === index 
                        ? 'bg-[#E8E8ED] text-black shadow-sm' 
                        : 'text-black/60 hover:text-black hover:bg-black/5'}
                    `}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Right column - Three video cards with active states */}
            <div className="flex flex-col md:flex-row gap-6 md:w-[62%] items-center justify-center md:items-center md:justify-start overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none no-scrollbar">
              <div 
                className="rounded-tl-[24px] rounded-tr-[24px] aspect-[9/19.5] transition-all duration-700 ease-out overflow-hidden snap-center"
                style={{
                  transform: activeCard === 0 ? 'scale(1.2)' : 'scale(0.85)',
                  opacity: activeCard === 0 ? 1 : 0.4,
                  width: isMobile ? (activeCard === 0 ? '70%' : '60%') : (activeCard === 0 ? '32%' : '28%'),
                  flexShrink: 0,
                  zIndex: activeCard === 0 ? 10 : 1,
                  boxShadow: activeCard === 0 ? '0 12px 40px rgba(0, 0, 0, 0.15)' : 'none',
                  scrollSnapAlign: isMobile ? 'center' : 'none',
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
                className="rounded-tl-[24px] rounded-tr-[24px] aspect-[9/19.5] transition-all duration-700 ease-out overflow-hidden snap-center"
                style={{
                  transform: activeCard === 1 ? 'scale(1.2)' : 'scale(0.85)',
                  opacity: activeCard === 1 ? 1 : 0.4,
                  width: isMobile ? (activeCard === 1 ? '70%' : '60%') : (activeCard === 1 ? '32%' : '28%'),
                  flexShrink: 0,
                  zIndex: activeCard === 1 ? 10 : 1,
                  boxShadow: activeCard === 1 ? '0 12px 40px rgba(0, 0, 0, 0.15)' : 'none',
                  scrollSnapAlign: isMobile ? 'center' : 'none',
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
                className="rounded-tl-[24px] rounded-tr-[24px] aspect-[9/19.5] transition-all duration-700 ease-out overflow-hidden snap-center"
                style={{
                  transform: activeCard === 2 ? 'scale(1.2)' : 'scale(0.85)',
                  opacity: activeCard === 2 ? 1 : 0.4,
                  width: isMobile ? (activeCard === 2 ? '70%' : '60%') : (activeCard === 2 ? '32%' : '28%'),
                  flexShrink: 0,
                  zIndex: activeCard === 2 ? 10 : 1,
                  boxShadow: activeCard === 2 ? '0 12px 40px rgba(0, 0, 0, 0.15)' : 'none',
                  scrollSnapAlign: isMobile ? 'center' : 'none',
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
      </div>
    </section>
  )
}
