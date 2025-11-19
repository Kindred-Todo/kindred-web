import { columnStart, columns, typography } from '@/lib/design-system'
import { motion } from 'framer-motion'
import { useResponsiveScale, useIsMobile } from '@/hooks/useResponsiveScale'
import { useParallax } from '@/hooks/useParallax'
import { Heart, Check } from '@phosphor-icons/react'

export function WhatsDealSection() {
  const scale = useResponsiveScale()
  const isMobile = useIsMobile()
  const parallaxRef = useParallax(0.15) // Positive to lag behind scroll (slower movement)
  
  return (
    <section className="mb-64 md:mb-96 py-32 md:py-48" style={{ paddingLeft: '16px', paddingRight: '16px' }}>
      <div ref={parallaxRef} className="flex flex-col md:flex-row md:ml-[var(--col-start-1)] md:max-w-[var(--col-7)]" style={{ '--col-start-1': columnStart(1), '--col-7': columns(7) } as React.CSSProperties}>
        {/* Spacer for column 1 (hidden on mobile) */}
        <div className="hidden md:block" style={{ width: columns(1, false) }} />

        {/* Decorative line at column 2 (hidden on mobile) with animation */}
        <motion.div 
          className="hidden md:flex relative" 
          style={{ width: columns(1, false) }}
          initial={{ opacity: 0, height: 0 }}
          whileInView={{ opacity: 1, height: '100%' }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="absolute left-0 top-0 w-[1px] h-full bg-black opacity-20" />
          <motion.div 
            className="absolute left-[-4px] top-[20%] w-[8px] h-[8px] rounded-full bg-[#854dff]"
            animate={{ 
              y: [0, 10, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>

        {/* Content starting at column 3 with gutter */}
        <div className="flex flex-col gap-16 md:ml-6 md:pr-16" style={{ maxWidth: columns(5) }}>
          {/* Section label */}
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
            WHATS THE DEAL?
          </motion.p>

          {/* Problem statement text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }} 
            className="font-fraunces font-light leading-[1.05] text-[#13121f]" 
            style={{
              fontSize: scale(isMobile ? 32 : 48), // 32px on mobile, 48px on desktop
              lineHeight: '1.05',
              letterSpacing: scale(-0.96),
              fontVariationSettings: "'SOFT' 0, 'WONK' 1",
            }}
          >
            <p className="mb-8">
              <span>You've tried every productivity app. You still don't do the things you want to do.</span>
            </p>
            <p className="mb-8">
              <span>That's because the problem was never </span>
              <span className="text-[#854dff]">organization</span>
              <span> - it was </span>
              <span className="text-[#854dff]">motivation</span>
              <span> and </span>
              <span className="text-[#854dff]">discipline</span>
              <span>.</span>
            </p>
          </motion.div>

          {/* Call to action text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true, margin: "-100px" }} 
            className="font-fraunces font-light leading-[1.05] text-[#13121f] mt-32 md:mt-48 flex items-center gap-4" 
            style={{
              fontSize: scale(isMobile ? 32 : 48), // 32px on mobile, 48px on desktop
              lineHeight: '1.05',
              letterSpacing: scale(-0.96),
              fontVariationSettings: "'SOFT' 0, 'WONK' 1",
            }}
          >
            <span>It's time to finally fall in love with your todo list</span>
            <div className="relative flex items-center justify-center" style={{ width: scale(isMobile ? 32 : 48), height: scale(isMobile ? 32 : 48) }}>
              {/* Checkmark icon */}
              <Check 
                size={scale(isMobile ? 32 : 48)}
                weight="bold" 
                className="text-[#854dff]"
              />
              {/* Burst hearts */}
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0.5, 1.5, 1.8],
                    x: [0, Math.cos(i * Math.PI / 2) * 30, Math.cos(i * Math.PI / 2) * 50],
                    y: [0, Math.sin(i * Math.PI / 2) * 30, Math.sin(i * Math.PI / 2) * 50],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 1,
                    delay: i * 0.1,
                    ease: "easeOut"
                  }}
                >
                  <Heart 
                    size={scale(isMobile ? 20 : 30)}
                    weight="regular" 
                    className="text-[#854dff]"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

