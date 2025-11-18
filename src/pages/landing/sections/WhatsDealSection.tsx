import { scale, columnStart, columns, typography } from '@/lib/design-system'
import { motion } from 'framer-motion'
import { Parallax } from 'react-scroll-parallax'

export function WhatsDealSection() {
  return (
    <section className="mb-64 md:mb-96 py-32 md:py-48" style={{ paddingLeft: '16px', paddingRight: '16px' }}>
      <Parallax speed={-5}>
      <div className="flex flex-col md:flex-row md:ml-[var(--col-start-1)] md:max-w-[var(--col-7)]" style={{ '--col-start-1': columnStart(1), '--col-7': columns(7) } as React.CSSProperties}>
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
            className="font-outfit font-light text-[20px] md:text-[1.16vw] tracking-[-0.8px] leading-[1.05] text-black"
            style={typography.body.desktop}
          >
            WHATS THE DEAL?
          </motion.p>

          {/* Problem statement text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }} 
            className="font-fraunces font-light text-[32px] md:text-[2.78vw] leading-[1.05] text-[#13121f]" 
            style={{
              fontSize: scale(48),
              lineHeight: '1.05',
              letterSpacing: scale(-0.96),
              fontVariationSettings: "'SOFT' 0, 'WONK' 1",
            }}
          >
            <p className="mb-8">
              <span>Productivity tools are </span>
              <span className="text-[#854dff]">broken</span>
              <span>, and they solve a legacy problem. the issue isn't organization, or elegance, its </span>
              <span className="text-[#854dff]">behavior</span>
              <span>. </span>
            </p>
            <p>
              <span>It needs another innovation. It needs </span>
              <span className="text-[#854dff]">kindred</span>
            </p>
          </motion.div>

          {/* Call to action text */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true, margin: "-100px" }} 
            className="font-fraunces font-light text-[32px] md:text-[2.78vw] leading-[1.05] text-[#13121f] mt-32 md:mt-48" 
            style={{
              fontSize: scale(48),
              lineHeight: '1.05',
              letterSpacing: scale(-0.96),
              fontVariationSettings: "'SOFT' 0, 'WONK' 1",
            }}
          >
            Its time to finally do all those things you said you would, but didn't
          </motion.p>
        </div>
      </div>
      </Parallax>
    </section>
  )
}

