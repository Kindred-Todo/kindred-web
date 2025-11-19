import { columnStart, columns, typography } from '@/lib/design-system'
import imgFrameChart from '@/assets/frame-chart.svg'
import imgFrameChart2 from '@/assets/frame-chart2.svg'
import { Sparkle } from '@phosphor-icons/react'
import { motion, AnimatePresence } from 'framer-motion'
import { useResponsiveScale, useIsMobile } from '@/hooks/useResponsiveScale'
import { useState, useEffect } from 'react'

export function ScienceSection() {
  const scale = useResponsiveScale()
  const isMobile = useIsMobile()
  const [currentChart, setCurrentChart] = useState(0) // 0 for chart2, 1 for chart1
  
  // Auto-cycle between charts
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentChart((prev) => (prev === 0 ? 1 : 0))
    }, 3000) // Switch every 3 seconds
    
    return () => clearInterval(interval)
  }, [])
  
  return (
    <section className="mb-32 md:mb-48" style={{ paddingLeft: '16px', paddingRight: '16px' }}>
      <div className="flex flex-col gap-8 md:ml-[var(--col-start-1)]" style={{ '--col-start-1': columnStart(1) } as React.CSSProperties}>
        {/* Section title */}
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }} 
          className="font-outfit font-light tracking-[-0.8px] leading-[1.05] text-black"
          style={{
            fontSize: scale(isMobile ? 18 : 20),
            letterSpacing: scale(isMobile ? -0.18 : -0.2),
          }}
        >
          THE SCIENCE
        </motion.p>

        {/* Two column layout */}
        <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-start">
          {/* Left column - Main text content */}
          <div className="flex flex-col" style={{ width: isMobile ? '100%' : scale(372), flexShrink: 0 }}>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true, margin: "-100px" }} 
              className="font-outfit font-light leading-[1.05] text-black mb-8" 
              style={{
                fontSize: scale(isMobile ? 20 : 24),
                lineHeight: '1.05',
                letterSpacing: scale(isMobile ? -0.2 : -0.24),
              }}
            >
              Self-regulated learning is a model for task completion and motivation.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }} 
              className="font-outfit font-light leading-[1.05] text-black" 
              style={{
                fontSize: scale(isMobile ? 20 : 24),
                lineHeight: '1.05',
                letterSpacing: scale(isMobile ? -0.2 : -0.24),
              }}
            >
              Kindred supports task completion at EVERY single step.
            </motion.p>
          </div>

          {/* Right column - Animated chart transition */}
          <div className="flex flex-1 justify-end items-start">
            <div className="relative" style={{ width: isMobile ? '100%' : scale(680) }}>
              <AnimatePresence mode="wait">
                {currentChart === 0 ? (
                  <motion.div
                    key="chart2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  >
                    <img src={imgFrameChart2} alt="" style={{ width: '100%', aspectRatio: '2/1.1', display: 'block' }} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="chart1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  >
                    <img src={imgFrameChart} alt="" style={{ width: '100%', aspectRatio: '2/1.1', display: 'block' }} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Kudos animated element - positioned below */}
        <motion.div 
          className="flex flex-col md:flex-row gap-12 md:gap-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div style={{ width: isMobile ? '100%' : scale(372), flexShrink: 0 }}>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <Sparkle 
                  size={32}
                  weight="fill" 
                  className="text-[#854dff]"
                  style={{
                    animation: 'sparkle 1.5s ease-in-out infinite',
                  }}
                />
              </div>
              <p 
                className="font-outfit font-light leading-[1.25] text-black"
                style={{
                  fontSize: scale(isMobile ? 18 : 20),
                  lineHeight: '1.25',
                  letterSpacing: scale(isMobile ? -0.18 : -0.2),
                }}
              >
                <span className="text-[#854dff]">Kudos</span>
                <span> include </span>
                <span className="text-[#854dff]">encouragements</span>
                <span> and </span>
                <span className="text-[#854dff]">congratulations</span>
              </p>
            </div>
          </div>
        </motion.div>
        
        <style>{`
          @keyframes sparkle {
            0%, 100% {
              transform: scale(0.8) rotate(-5deg);
            }
            50% {
              transform: scale(1.2) rotate(5deg);
            }
          }
        `}</style>
      </div>
    </section>
  )
}

