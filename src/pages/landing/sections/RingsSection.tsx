import { useRef, useState, useMemo } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from 'framer-motion'
import { useResponsiveScale, useIsMobile } from '@/hooks/useResponsiveScale'
import appIcon from '@/assets/app-icon.png'

const RINGS = [
  { label: 'PLAN', target: 2, total: 2 },
  { label: 'SHARE', target: 1, total: 1 },
  { label: 'DO', target: 2, total: 2 },
]

const RADIUS = 60
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

// Last ring completes at this scroll progress
const COMPLETION_THRESHOLD = 0.55

const CONFETTI_COLORS = ['#854dff', '#a87bff', '#c4a6ff', '#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FF9F43', '#EE5A24', '#7bed9f']

function generateConfetti(count: number) {
  return Array.from({ length: count }, (_, i) => {
    const angle = Math.random() * Math.PI * 2
    const distance = Math.random() * 600 + 200
    return {
      id: i,
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance - 150,
      rotate: Math.random() * 1080 - 540,
      scale: Math.random() * 1.2 + 0.5,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      width: Math.random() * 10 + 6,
      height: Math.random() * 16 + 6,
      delay: Math.random() * 0.5,
      shape: Math.random() > 0.5 ? 'rect' : 'circle',
    }
  })
}

function Confetti({ show }: { show: boolean }) {
  const pieces = useMemo(() => generateConfetti(80), [])

  return (
    <AnimatePresence>
      {show && (
        <div
          className="absolute pointer-events-none flex items-center justify-center"
          style={{ inset: '-200px', zIndex: 20 }}
        >
          {pieces.map((p) => (
            <motion.div
              key={p.id}
              style={{
                position: 'absolute',
                width: p.width,
                height: p.shape === 'circle' ? p.width : p.height,
                backgroundColor: p.color,
                borderRadius: p.shape === 'circle' ? '50%' : '2px',
              }}
              initial={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 0 }}
              animate={{
                opacity: [1, 1, 1, 0],
                x: p.x,
                y: p.y,
                rotate: p.rotate,
                scale: [0, p.scale, p.scale, p.scale * 0.5],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 2.5,
                delay: p.delay,
                ease: [0.15, 0.85, 0.35, 1],
              }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  )
}

function ScrollRing({
  label,
  target,
  total,
  scrollProgress,
  startAt,
  endAt,
  isMobile,
  scale,
}: {
  label: string
  target: number
  total: number
  scrollProgress: ReturnType<typeof useScroll>['scrollYProgress']
  startAt: number
  endAt: number
  isMobile: boolean
  scale: (px: number) => string
}) {
  const fillRatio = target / total
  const targetOffset = CIRCUMFERENCE * (1 - fillRatio)

  const dashOffset = useTransform(
    scrollProgress,
    [startAt, endAt],
    [CIRCUMFERENCE, targetOffset],
  )

  const count = useTransform(scrollProgress, [startAt, endAt], [0, target])
  const roundedCount = useTransform(count, (v) => Math.round(v))

  return (
    <div
      className="flex flex-col items-center"
      style={{ gap: isMobile ? '12px' : scale(18) }}
    >
      <div
        className="relative flex items-center justify-center"
        style={{
          width: isMobile ? '80px' : scale(128),
          height: isMobile ? '80px' : scale(128),
        }}
      >
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 128 128"
          fill="none"
          style={{ transform: 'rotate(-90deg)' }}
        >
          {/* Background track */}
          <circle
            cx="64"
            cy="64"
            r={RADIUS}
            stroke="#854dff"
            strokeWidth="2.5"
            strokeOpacity="0.15"
          />
          {/* Scroll-driven fill */}
          <motion.circle
            cx="64"
            cy="64"
            r={RADIUS}
            stroke="#854dff"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            strokeDasharray={CIRCUMFERENCE}
            style={{ strokeDashoffset: dashOffset }}
          />
        </svg>
        <span
          className="font-outfit font-normal text-black text-center relative"
          style={{ fontSize: isMobile ? '14px' : scale(20) }}
        >
          <motion.span>{roundedCount}</motion.span>/{total}
        </span>
      </div>
      <span
        className="font-outfit font-normal text-black text-center uppercase"
        style={{
          fontSize: isMobile ? '14px' : scale(20),
          letterSpacing: '2px',
        }}
      >
        {label}
      </span>
    </div>
  )
}

export function RingsSection() {
  const scaleVal = useResponsiveScale()
  const isMobile = useIsMobile()
  const sectionRef = useRef<HTMLDivElement>(null)
  const [showCelebration, setShowCelebration] = useState(false)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (v >= COMPLETION_THRESHOLD && !showCelebration) {
      setShowCelebration(true)
    } else if (v < COMPLETION_THRESHOLD && showCelebration) {
      setShowCelebration(false)
    }
  })

  return (
    <section
      className="relative w-full bg-white overflow-visible"
      style={{
        padding: isMobile ? '0 16px' : `${scaleVal(220)} ${scaleVal(64)}`,
        minHeight: isMobile ? '100dvh' : 'auto',
        display: isMobile ? 'flex' : 'block',
        alignItems: isMobile ? 'center' : undefined,
        backgroundImage: 'radial-gradient(circle, #d4d4d4 1px, transparent 1px)',
        backgroundSize: isMobile ? '20px 20px' : `${scaleVal(28)} ${scaleVal(28)}`,
      }}
    >
      {/* Decorative circle - top left */}
      <svg
        className="absolute pointer-events-none"
        style={{
          top: isMobile ? '-60px' : scaleVal(-80),
          left: isMobile ? '-60px' : scaleVal(-80),
          width: isMobile ? '200px' : scaleVal(416),
          height: isMobile ? '200px' : scaleVal(416),
        }}
        viewBox="0 0 416 416"
        fill="none"
      >
        <circle cx="208" cy="208" r="200" stroke="#854dff" strokeWidth="8" />
      </svg>

      {/* Decorative circle - bottom right */}
      <svg
        className="absolute pointer-events-none"
        style={{
          bottom: isMobile ? '-60px' : scaleVal(-60),
          right: 0,
          width: isMobile ? '220px' : scaleVal(452),
          height: isMobile ? '220px' : scaleVal(452),
        }}
        viewBox="0 0 452 452"
        fill="none"
      >
        <circle cx="226" cy="226" r="218" stroke="#854dff" strokeWidth="8" />
      </svg>

      {/* Scroll tracking target */}
      <div ref={sectionRef} className="relative flex flex-col items-center w-full">
        {/* Title */}
        <h2
          className="font-outfit font-normal text-black text-center"
          style={{
            fontSize: isMobile ? '32px' : scaleVal(48),
            letterSpacing: '-1px',
          }}
        >
          Say{' '}
          <span
            className="font-fraunces italic text-primary"
            style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}
          >
            yes
          </span>{' '}
          to the ring
        </h2>

        {/* Subtitle */}
        <p
          className="font-outfit font-light text-black text-center"
          style={{
            fontSize: isMobile ? '16px' : scaleVal(24),
            marginTop: isMobile ? '20px' : scaleVal(33),
          }}
        >
          Closing your kindred rings daily boosts your output 3.2x
        </p>

        {/* Rings */}
        <div
          className="relative flex items-center justify-center"
          style={{
            gap: isMobile ? '40px' : scaleVal(64),
            marginTop: isMobile ? '48px' : scaleVal(120),
          }}
        >
          {RINGS.map((ring, i) => (
            <ScrollRing
              key={ring.label}
              label={ring.label}
              target={ring.target}
              total={ring.total}
              scrollProgress={scrollYProgress}
              startAt={0.2 + i * 0.07}
              endAt={0.42 + i * 0.07}
              isMobile={isMobile}
              scale={scaleVal}
            />
          ))}

          {/* Confetti burst anchored to the rings area */}
          <Confetti show={showCelebration} />
        </div>

        {/* Notification - absolutely positioned so it doesn't push rings */}
        <AnimatePresence>
          {showCelebration && (
            <motion.div
              className="absolute left-1/2 flex items-center gap-3 bg-white rounded-2xl"
              style={{
                top: '100%',
                transform: 'translateX(-50%)',
                marginTop: isMobile ? '32px' : scaleVal(48),
                padding: isMobile ? '14px 20px' : `${scaleVal(16)} ${scaleVal(24)}`,
                boxShadow: '0px 2px 16px rgba(0, 0, 0, 0.08), 0px 0px 1px rgba(0, 0, 0, 0.1)',
                maxWidth: isMobile ? 'calc(100vw - 32px)' : scaleVal(520),
                whiteSpace: 'nowrap',
              }}
              initial={{ opacity: 0, y: 20, scale: 0.95, x: '-50%' }}
              animate={{ opacity: 1, y: 0, scale: 1, x: '-50%' }}
              exit={{ opacity: 0, y: 10, scale: 0.98, x: '-50%' }}
              transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
            >
              {/* App icon */}
              <img
                src={appIcon}
                alt="Kindred"
                className="shrink-0 rounded-xl"
                style={{
                  width: isMobile ? '36px' : scaleVal(44),
                  height: isMobile ? '36px' : scaleVal(44),
                }}
              />
              {/* Text */}
              <div className="flex flex-col">
                <span
                  className="font-outfit font-medium text-black"
                  style={{ fontSize: isMobile ? '13px' : scaleVal(15) }}
                >
                  Lets go! 🥳
                </span>
                <span
                  className="font-outfit font-light text-black"
                  style={{ fontSize: isMobile ? '13px' : scaleVal(15) }}
                >
                  Beak closed his productivity rings for today 🎉
                </span>
              </div>
              {/* Timestamp */}
              <span
                className="font-outfit font-light text-text-subtle shrink-0 self-start"
                style={{ fontSize: isMobile ? '11px' : scaleVal(12) }}
              >
                now
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
