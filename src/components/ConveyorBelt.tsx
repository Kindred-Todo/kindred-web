import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface ConveyorBeltProps {
  children: React.ReactNode
  speed?: number // pixels per second
  reverse?: boolean
}

export function ConveyorBelt({ children, speed = 50, reverse = false }: ConveyorBeltProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [contentWidth, setContentWidth] = useState(0)

  useEffect(() => {
    if (contentRef.current) {
      setContentWidth(contentRef.current.offsetWidth)
    }
  }, [children])

  const duration = contentWidth > 0 ? contentWidth / speed : 20

  return (
    <div className="overflow-hidden w-full">
      <motion.div
        className="flex"
        animate={contentWidth > 0 ? { x: reverse ? [-contentWidth, 0] : [0, -contentWidth] } : undefined}
        transition={{
          x: {
            duration,
            repeat: Infinity,
            ease: 'linear',
          },
        }}
      >
        <div ref={contentRef} className="flex shrink-0">
          {children}
        </div>
        <div className="flex shrink-0">{children}</div>
      </motion.div>
    </div>
  )
}
