import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface ParallaxWrapperProps {
  children: React.ReactNode
  speed?: number
  direction?: 'up' | 'down'
}

export function ParallaxWrapper({
  children,
  speed = 0.5,
  direction = 'down',
}: ParallaxWrapperProps) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const directionMultiplier = direction === 'up' ? -1 : 1
  const range = 200 * speed * directionMultiplier

  const y = useTransform(scrollYProgress, [0, 1], [-range, range])

  return (
    <div ref={ref}>
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </div>
  )
}
