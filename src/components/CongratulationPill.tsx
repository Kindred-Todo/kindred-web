import { motion } from 'framer-motion'
import { useResponsiveScale, useIsMobile } from '@/hooks/useResponsiveScale'

interface CongratulationPillProps {
  children: React.ReactNode
  className?: string
  delay?: number
  style?: React.CSSProperties
}

export function CongratulationPill({ 
  children, 
  className = '', 
  delay = 0, 
  style = {} 
}: CongratulationPillProps) {
  const scale = useResponsiveScale()
  const isMobile = useIsMobile()
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true, margin: "-100px" }}
      className={`bg-[#543596] border-2 border-[#854dff] rounded-[32px] inline-flex items-center justify-center ${className}`}
      style={{
        padding: isMobile ? '8px 20px' : `${scale(12)} ${scale(32)}`,
        zIndex: 10,
        boxShadow: '0px 4px 50px 0px rgba(133, 77, 255, 0.75)',
        ...style,
      }}
    >
      <p 
        className="font-outfit font-light leading-[1.05] text-white"
        style={{
          fontSize: isMobile ? 16 : scale(20),
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {children}
      </p>
    </motion.div>
  )
}

