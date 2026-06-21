import { useRef } from 'react'
import { useScroll, useTransform, motion, MotionValue } from 'framer-motion'
import { useResponsiveScale, useIsMobile } from '@/hooks/useResponsiveScale'
import { ScrollRevealText } from '@/components/ScrollRevealText'
import { decorativeShapes } from '@/assets/shapes/decorative-shapes'

interface ShapeConfig {
  type: 'filledStar' | 'dashedStar' | 'polygon'
  x: string
  y: string
  size: number
  rotateFrom: number
  rotateTo: number
  duration: number
  // scroll range [fadeIn, peakStart, peakEnd, fadeOut] mapped to opacity
  scrollRange: [number, number, number, number]
}

const SHAPES: ShapeConfig[] = [
  // Left side — scattered top to bottom
  { type: 'filledStar', x: '12%',  y: '6%',   size: 40,  rotateFrom: 0,    rotateTo: 360,   duration: 22, scrollRange: [0.0, 0.08, 0.35, 0.5] },
  { type: 'dashedStar', x: '3%',   y: '18%',  size: 65,  rotateFrom: 30,   rotateTo: -330,  duration: 28, scrollRange: [0.0, 0.1, 0.4, 0.55] },
  { type: 'polygon',    x: '18%',  y: '14%',  size: 30,  rotateFrom: -20,  rotateTo: 340,   duration: 35, scrollRange: [0.05, 0.15, 0.45, 0.6] },
  { type: 'filledStar', x: '6%',   y: '42%',  size: 50,  rotateFrom: 45,   rotateTo: 405,   duration: 20, scrollRange: [0.1, 0.2, 0.5, 0.65] },
  { type: 'dashedStar', x: '15%',  y: '55%',  size: 55,  rotateFrom: 60,   rotateTo: -300,  duration: 30, scrollRange: [0.15, 0.25, 0.55, 0.7] },
  { type: 'polygon',    x: '4%',   y: '68%',  size: 28,  rotateFrom: 10,   rotateTo: 370,   duration: 40, scrollRange: [0.2, 0.3, 0.6, 0.75] },
  { type: 'filledStar', x: '10%',  y: '80%',  size: 45,  rotateFrom: -30,  rotateTo: 330,   duration: 24, scrollRange: [0.3, 0.4, 0.7, 0.85] },
  { type: 'dashedStar', x: '20%',  y: '88%',  size: 60,  rotateFrom: 90,   rotateTo: -270,  duration: 32, scrollRange: [0.35, 0.45, 0.75, 0.9] },

  // Right side — scattered top to bottom
  { type: 'dashedStar', x: '82%',  y: '5%',   size: 55,  rotateFrom: -60,  rotateTo: -420,  duration: 26, scrollRange: [0.0, 0.08, 0.3, 0.45] },
  { type: 'polygon',    x: '90%',  y: '15%',  size: 32,  rotateFrom: 120,  rotateTo: 480,   duration: 38, scrollRange: [0.02, 0.12, 0.38, 0.52] },
  { type: 'filledStar', x: '78%',  y: '28%',  size: 48,  rotateFrom: -45,  rotateTo: 315,   duration: 18, scrollRange: [0.05, 0.15, 0.42, 0.58] },
  { type: 'dashedStar', x: '88%',  y: '40%',  size: 70,  rotateFrom: 20,   rotateTo: -340,  duration: 34, scrollRange: [0.1, 0.2, 0.5, 0.65] },
  { type: 'filledStar', x: '93%',  y: '52%',  size: 36,  rotateFrom: 75,   rotateTo: 435,   duration: 21, scrollRange: [0.15, 0.28, 0.55, 0.7] },
  { type: 'polygon',    x: '80%',  y: '65%',  size: 34,  rotateFrom: -90,  rotateTo: 270,   duration: 42, scrollRange: [0.22, 0.32, 0.62, 0.78] },
  { type: 'filledStar', x: '86%',  y: '78%',  size: 52,  rotateFrom: 150,  rotateTo: 510,   duration: 23, scrollRange: [0.3, 0.4, 0.7, 0.85] },
  { type: 'dashedStar', x: '76%',  y: '90%',  size: 58,  rotateFrom: -120, rotateTo: -480,  duration: 29, scrollRange: [0.35, 0.5, 0.8, 0.95] },

  // Center area — very subtle, smaller shapes far from text
  { type: 'polygon',    x: '30%',  y: '8%',   size: 22,  rotateFrom: 0,    rotateTo: 360,   duration: 45, scrollRange: [0.0, 0.1, 0.3, 0.45] },
  { type: 'filledStar', x: '68%',  y: '10%',  size: 24,  rotateFrom: 45,   rotateTo: 405,   duration: 36, scrollRange: [0.02, 0.12, 0.35, 0.5] },
  { type: 'polygon',    x: '25%',  y: '85%',  size: 26,  rotateFrom: -30,  rotateTo: 330,   duration: 40, scrollRange: [0.3, 0.42, 0.72, 0.88] },
  { type: 'dashedStar', x: '72%',  y: '88%',  size: 35,  rotateFrom: 60,   rotateTo: -300,  duration: 33, scrollRange: [0.35, 0.48, 0.78, 0.92] },
]

// Mobile: a handful of shapes on the right edge so they frame the now
// left-aligned text instead of crowding it, and still fade in/out with scroll.
const MOBILE_SHAPES: ShapeConfig[] = [
  { type: 'dashedStar', x: '76%', y: '12%', size: 46, rotateFrom: -60, rotateTo: -420, duration: 26, scrollRange: [0.0, 0.1, 0.55, 0.75] },
  { type: 'filledStar', x: '86%', y: '32%', size: 30, rotateFrom: 0,   rotateTo: 360,  duration: 22, scrollRange: [0.1, 0.22, 0.6, 0.8] },
  { type: 'polygon',    x: '72%', y: '70%', size: 28, rotateFrom: 10,  rotateTo: 370,  duration: 35, scrollRange: [0.25, 0.4, 0.75, 0.9] },
  { type: 'filledStar', x: '88%', y: '84%', size: 38, rotateFrom: 45,  rotateTo: 405,  duration: 24, scrollRange: [0.3, 0.45, 0.8, 0.95] },
]

const GLOW_FILTER = 'drop-shadow(0 0 24px rgba(133, 77, 255, 0.9)) drop-shadow(0 0 48px rgba(133, 77, 255, 0.5))'
const GLOW_FILTER_SMALL = 'drop-shadow(0 0 16px rgba(133, 77, 255, 0.8)) drop-shadow(0 0 36px rgba(133, 77, 255, 0.4))'

function ShapeElement({ shape, scrollYProgress, scaleVal }: { shape: ShapeConfig; scrollYProgress: MotionValue<number>; scaleVal: (px: number) => string }) {
  const opacity = useTransform(
    scrollYProgress,
    shape.scrollRange,
    [0, 1, 1, 0]
  )

  const filter = shape.size < 35 ? GLOW_FILTER_SMALL : GLOW_FILTER

  return (
    <motion.div
      className="absolute"
      style={{
        left: shape.x,
        top: shape.y,
        width: scaleVal(shape.size),
        height: scaleVal(shape.size),
        filter,
        opacity,
      }}
      animate={{ rotate: [shape.rotateFrom, shape.rotateTo] }}
      transition={{ duration: shape.duration, repeat: Infinity, ease: 'linear' }}
    >
      {shape.type === 'filledStar' && (
        <svg className="block size-full" fill="none" viewBox="0 0 46.0422 43.7887">
          <path d={decorativeShapes.filledStar} fill="var(--color-primary)" fillOpacity="0.6" stroke="var(--color-primary)" strokeWidth="0.9" />
        </svg>
      )}
      {shape.type === 'dashedStar' && (
        <svg className="block size-full" fill="none" viewBox="0 0 65.1557 62.234">
          <path d={decorativeShapes.dashedStar} stroke="var(--color-primary)" strokeDasharray="18.04 18.04" strokeWidth="1.8" />
        </svg>
      )}
      {shape.type === 'polygon' && (
        <svg className="block size-full" fill="none" viewBox="155 88 52 58">
          <path d={decorativeShapes.polygon} fill="var(--color-primary)" fillOpacity="0.7" />
        </svg>
      )}
    </motion.div>
  )
}

export function ScrollRevealSection() {
  const scale = useResponsiveScale()
  const isMobile = useIsMobile()
  const sectionRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  // Map the first ~70% of scroll to text reveal (last 30% is exit buffer)
  const revealProgress = useTransform(scrollYProgress, [0.05, 0.7], [0, 1])

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-black"
      style={{ height: isMobile ? '260vh' : '300vh' }}
    >
      {/* Sticky container — sticky on mobile too, so there's scroll distance to
          drive the gradual character reveal. A non-sticky 100vh block has no
          travel and the reveal completes instantly. */}
      <div
        className="w-full flex items-center"
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          padding: isMobile ? '0 24px' : '0',
          justifyContent: isMobile ? 'flex-start' : 'center',
        }}
      >
        {/* Content block — left-aligned on mobile, centered on desktop */}
        <div
          className="flex flex-col"
          style={{
            alignItems: isMobile ? 'flex-start' : 'center',
            gap: isMobile ? '20px' : '32px',
            width: isMobile ? '100%' : 'auto',
          }}
        >
          <p
            className="font-outfit font-normal uppercase"
            style={{
              fontSize: isMobile ? '12px' : scale(15),
              letterSpacing: isMobile ? '0.22em' : '0.04em',
              color: isMobile ? 'var(--color-primary)' : '#fff',
              textAlign: isMobile ? 'left' : 'center',
            }}
          >
            WHAT IS IT?
          </p>

          <ScrollRevealText
            text="Kindred is the platform for you and your friends to pursue your ambitions. "
            className={`font-fraunces font-normal leading-[1.05] tracking-[-0.03em] ${isMobile ? 'text-left' : 'text-center'}`}
            containerClassName=""
            scrollYProgress={revealProgress}
            style={{
              fontSize: isMobile ? '48px' : scale(64),
              width: isMobile ? '100%' : scale(1196),
              fontVariationSettings: "'SOFT' 0, 'WONK' 1",
            }}
          />
        </div>

        {/* Decorative shapes — fade in/out with scroll. Fewer on mobile, kept to
            the right edge so they frame the left-aligned text. */}
        <div className="absolute inset-0 pointer-events-none">
          {(isMobile ? MOBILE_SHAPES : SHAPES).map((shape, i) => (
            <ShapeElement key={i} shape={shape} scrollYProgress={scrollYProgress} scaleVal={scale} />
          ))}
        </div>
      </div>
    </section>
  )
}
