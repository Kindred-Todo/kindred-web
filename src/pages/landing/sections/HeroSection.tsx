import { motion } from 'framer-motion'
import { useResponsiveScale, useIsMobile } from '@/hooks/useResponsiveScale'
import videoSrc from '@/assets/landing-video/landing.mp4'
import wordmarkSrc from '@/assets/wordmark.svg'
import allShapesSrc from '@/assets/shapes/all-shape.svg'

export function HeroSection() {
  const scale = useResponsiveScale()
  const isMobile = useIsMobile()
  
  return (
    <section className="relative w-full h-[100dvh] min-h-[600px] overflow-hidden bg-[#13121f] text-white">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full mix-blend-multiply opacity-60">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      </div>

      {/* Content Container using 9-column grid */}
      <div className="relative z-10 w-full h-full flex flex-col justify-end px-6 md:px-[48px] pb-[48px]">
        
        {/* All Shapes SVG Overlay - Precisely positioned */}
        <div className="absolute inset-0 pointer-events-none z-0 w-full h-full">
             <img 
               src={allShapesSrc} 
               className="w-full h-full object-cover opacity-90"
               alt=""
             />
        </div>

        {/* Grid Layout: 9 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-9 gap-x-[20px] items-end">
            
            {/* Wordmark: Spans 4 columns */}
            <div className="col-span-1 md:col-span-4 relative flex items-end">
                 <img 
                    src={wordmarkSrc} 
                    alt="Kindred" 
                    className="w-[70%] md:w-full md:max-w-full h-auto object-contain object-bottom origin-bottom-left"
                 />
            </div>

            {/* Spacer: Spans 1 column */}
            <div className="hidden md:block md:col-span-1" />

            {/* Content: Spans 4 columns */}
            <div className="col-span-1 md:col-span-4 flex flex-col md:flex-col justify-end gap-6 md:pb-4">
                
                {/* Waitlist Button - Order changed for Mobile */}
                <motion.button 
                  className="order-2 md:order-1 mt-8 md:mt-0 px-8 py-3.5 bg-[#854dff] rounded-[12px] md:rounded-full font-outfit text-lg hover:bg-[#7340e6] transition-colors shadow-[0_0_40px_rgba(133,77,255,0.5)] w-full md:w-fit text-white"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Join our Waitlist
                </motion.button>

                <div className="order-1 md:order-2 space-y-4 max-w-2xl">
                  <h2 className="font-outfit text-3xl md:text-[48px] font-light leading-[1] tracking-tight">
                    The most rewarding, feel good productivity system.
                  </h2>
                  <p className="font-outfit text-lg md:text-xl font-light opacity-90 leading-normal">
                    Our approach to human centered social productivity keeps you happy and accomplished
                  </p>
                </div>
            </div>

        </div>
      </div>
    </section>
  )
}
