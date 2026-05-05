import { useRef } from 'react'
import { useScroll, useTransform, motion } from 'framer-motion'
import { useResponsiveScale, useIsMobile } from '@/hooks/useResponsiveScale'
import { ScrollRevealText } from '@/components/ScrollRevealText'
import { decorativeShapes } from '@/assets/shapes/decorative-shapes'

export function ScrollRevealSection() {
  const scale = useResponsiveScale()
  const isMobile = useIsMobile()
  const sectionRef = useRef<HTMLDivElement>(null)

  // Track scroll through the tall outer container.
  // The text stays sticky while we scroll through the runway.
  // offset: 'start start' = section top hits viewport top (text is pinned),
  //         'end end' = section bottom hits viewport bottom (text unpins).
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  // Map the first ~70% of scroll to text reveal (last 30% is exit buffer)
  const revealProgress = useTransform(scrollYProgress, [0.05, 0.7], [0, 1])

  // Decorative shapes fade in as we enter and fade out as we leave
  const shapesOpacity = useTransform(scrollYProgress, [0, 0.1, 0.8, 1], [0, 1, 1, 0])

  return (
    // Tall container creates scroll runway. The sticky child pins inside it.
    <section
      ref={sectionRef}
      className="relative w-full bg-black"
      style={{ height: isMobile ? 'auto' : '300vh' }}
    >
      {/* Sticky container — pins content to viewport center while scrolling through the runway */}
      <div
        className="w-full flex items-center justify-center"
        style={{
          position: isMobile ? 'relative' : 'sticky',
          top: 0,
          height: '100vh',
          padding: isMobile ? '80px 24px' : '0',
        }}
      >
        {/* Centered content block */}
        <div className="flex flex-col items-center justify-center gap-8">
          {/* Label */}
          <p
            className="text-center font-outfit font-normal text-white tracking-[-0.15px] whitespace-nowrap"
            style={{ fontSize: isMobile ? '12px' : scale(15) }}
          >
            WHAT IS IT?
          </p>

          {/* Scroll Reveal Text — driven by the section's scroll progress */}
          <ScrollRevealText
            text="Kindred is the platform for you and your friends to pursue your ambitions. "
            className="font-fraunces font-normal leading-[1.1] text-center tracking-[-1.28px]"
            containerClassName=""
            scrollYProgress={revealProgress}
            style={{
              fontSize: isMobile ? '32px' : scale(64),
              width: isMobile ? '90vw' : scale(1196),
              fontVariationSettings: "'SOFT' 0, 'WONK' 1",
            }}
          />
        </div>

        {/* Decorative star shapes — positioned within the sticky viewport */}
        {!isMobile && (
          <motion.div className="absolute inset-0 pointer-events-none" style={{ opacity: shapesOpacity }}>
            {/* Left side */}
            <div className="absolute" style={{ left: scale(171), top: '10%', width: scale(66), height: scale(66) }}>
              <svg className="block size-full rotate-[60deg]" fill="none" viewBox="0 0 46.0422 43.7887">
                <path d={decorativeShapes.filledStar} fill="var(--color-primary)" fillOpacity="0.6" stroke="var(--color-primary)" strokeWidth="0.9" />
              </svg>
            </div>
            <div className="absolute" style={{ left: scale(51), top: '30%', width: scale(75), height: scale(75) }}>
              <svg className="block size-full rotate-[60deg]" fill="none" viewBox="0 0 65.1557 62.234">
                <path d={decorativeShapes.dashedStar} stroke="var(--color-primary)" strokeDasharray="18.04 18.04" strokeWidth="1.8" />
              </svg>
            </div>

            {/* Right side */}
            <div className="absolute" style={{ right: scale(221), bottom: '15%', width: scale(66), height: scale(66) }}>
              <svg className="block size-full -rotate-[120deg]" fill="none" viewBox="0 0 46.0422 43.7887">
                <path d={decorativeShapes.filledStar} fill="var(--color-primary)" fillOpacity="0.6" stroke="var(--color-primary)" strokeWidth="0.9" />
              </svg>
            </div>
            <div className="absolute" style={{ right: scale(100), bottom: '35%', width: scale(75), height: scale(75) }}>
              <svg className="block size-full -rotate-[120deg]" fill="none" viewBox="0 0 65.1557 62.234">
                <path d={decorativeShapes.dashedStar} stroke="var(--color-primary)" strokeDasharray="18.04 18.04" strokeWidth="1.8" />
              </svg>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
