import { useRef } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'

interface ScrollRevealTextProps {
  text: string
  className?: string
  containerClassName?: string
  style?: React.CSSProperties
  /** Pass an external scrollYProgress to drive the reveal (e.g. from a parent sticky container) */
  scrollYProgress?: MotionValue<number>
}

export function ScrollRevealText({
  text,
  className = '',
  containerClassName = '',
  style = {},
  scrollYProgress: externalProgress,
}: ScrollRevealTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress: localProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const scrollYProgress = externalProgress ?? localProgress

  const characters = text.split('')

  return (
    <div ref={containerRef} className={containerClassName}>
      <p className={className} style={style}>
        {characters.map((char, index) => (
          <Character
            key={index}
            char={char}
            index={index}
            total={characters.length}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </p>
    </div>
  )
}

function Character({
  char,
  index,
  total,
  scrollYProgress,
}: {
  char: string
  index: number
  total: number
  scrollYProgress: MotionValue<number>
}) {
  const threshold = index / total
  const color = useTransform(
    scrollYProgress,
    [threshold, threshold + 1 / total],
    ['var(--color-text-dim)', '#fff9f9']
  )
  const textShadow = useTransform(
    scrollYProgress,
    [threshold, threshold + 1 / total],
    ['none', '0px 0px 24px white']
  )

  return (
    <motion.span
      style={{ color, textShadow, transition: 'color 0.2s ease-out, text-shadow 0.2s ease-out' }}
    >
      {char}
    </motion.span>
  )
}
