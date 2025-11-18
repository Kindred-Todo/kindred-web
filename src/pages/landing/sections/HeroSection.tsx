import { SheetTrigger } from '@/components/ui/sheet'
import { columnStart, columns, typography } from '@/lib/design-system'
import { motion } from 'framer-motion'
import imgImage1 from '@/assets/shapes/image1.png'
import { useResponsiveScale, useIsMobile } from '@/hooks/useResponsiveScale'

export function HeroSection() {
  const scale = useResponsiveScale()
  const isMobile = useIsMobile()
  const buttonWidth = columns(2)
  
  return (
    <section className="relative mb-16 md:mb-48 mt-32 md:mt-0" style={{ marginTop: scale(365) }}>
      {/* Hero text - starts at column 2, spans ~4.5 columns */}
      <motion.div 
        className="px-4 md:px-0 md:ml-[var(--col-start-2)] md:max-w-[var(--col-5)] flex flex-col"
        style={{
          '--col-start-2': columnStart(2),
          '--col-5': columns(5),
        } as React.CSSProperties}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <h1 
          className="font-fraunces p-2 bg-white w-[90%] md:w-full md:p-0 leading-[1.1] md:leading-[1]"
          style={{
            fontSize: scale(isMobile ? 48 : 86), // 72px on mobile (scales from 402px), 86px on desktop (scales from 1728px)
            letterSpacing: scale(-1.72),
            fontVariationSettings: "'SOFT' 0, 'WONK' 0.78",
          }}
        >
          <span className="text-[#13121f]">Our approach to </span>
          <span className="text-[#13121f] italic" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 0.78, 'opsz' 144" }}>
            human centered productivity
          </span>
          <span className="text-[#13121f]"> keeps you </span>
          <span className="text-[#854dff]">happy </span>
          <span className="text-[#13121f]">and </span>
          <span className="text-[#854dff]">accomplished </span>
        </h1>
        
        {/* Join the waitlist button */}
        <SheetTrigger asChild>
          <button 
            className="mt-8 px-6 md:px-8 py-3 md:py-4 bg-[#854dff] text-white rounded-full font-outfit font-medium hover:bg-[#7340e6] transition-all w-full md:w-auto"
            style={{
              maxWidth: isMobile ? '100%' : buttonWidth,
              fontSize: scale(20),
              boxShadow: '0 0 20px rgba(133, 77, 255, 0.3), 0 0 40px rgba(133, 77, 255, 0.15)',
            }}
          >
            Join the waitlist
          </button>
        </SheetTrigger>

        {/* Bicycle illustration */}
        <motion.div
          className="mt-8 w-full max-w-[311px]"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <img 
            src={imgImage1} 
            alt="Connection illustration" 
            className="w-full h-auto object-cover rounded-lg" 
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

