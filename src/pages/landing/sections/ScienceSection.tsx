import { columnStart, columns, typography } from '@/lib/design-system'
import imgFrameChart from '@/assets/frame-chart.svg'
import imgFrameChart2 from '@/assets/frame-chart2.svg'
import { Sparkle } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { useResponsiveScale, useIsMobile } from '@/hooks/useResponsiveScale'

export function ScienceSection() {
  const scale = useResponsiveScale()
  const isMobile = useIsMobile()
  
  return (
    <section className="mb-32 md:mb-48" style={{ paddingLeft: '16px', paddingRight: '16px' }}>
      <div className="flex flex-col gap-8 md:ml-[var(--col-start-1)] md:max-w-[var(--col-7)] md:pr-16" style={{ '--col-start-1': columnStart(1), '--col-7': columns(7) } as React.CSSProperties}>
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
        <div className="flex flex-col md:flex-row gap-12 md:gap-16">
          {/* Left column - Main text content */}
          <div className="flex flex-col md:w-[25%]">
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
              Self-regulated learning is a model for task completion and motivation
            </motion.p>
          </div>

          {/* Right column - Charts and text */}
          <div className="flex flex-col md:flex-row gap-8 md:w-[70%]" style={{ gap: columns(1, false) }}>
            {/* Chart 2 */}
            <motion.div 
              className="w-full md:flex-shrink-0" 
              style={{ width: '100%', maxWidth: scale(425) }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <img src={imgFrameChart2} alt="" className="w-full h-auto object-contain" />
            </motion.div>

            {/* Chart 1 with text below */}
            <div className="flex flex-col">
              <motion.div 
                className="flex-shrink-0 mb-4" 
                style={{ width: scale(423) }}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <img src={imgFrameChart} alt="" className="w-full h-auto object-contain" />
              </motion.div>
              
              {/* Text below chart 1 */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true, margin: "-100px" }} 
                className="font-outfit font-light leading-[1.25] text-black mt-8" 
                style={{
                  fontSize: scale(isMobile ? 20 : 24),
                  lineHeight: '1.25',
                  letterSpacing: scale(isMobile ? -0.2 : -0.24),
                }}
              >
                <span>Kindred supercharges intrinsic motivation by supporting it with </span>
                <span className="text-[#854dff]">kudos</span>
                <span> coming from your close friends.</span>
              </motion.p>
            </div>
          </div>
        </div>

        {/* Kudos animated element - positioned below */}
        <motion.div 
          className="flex flex-col md:flex-row gap-12 md:gap-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="md:w-[25%]">
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

