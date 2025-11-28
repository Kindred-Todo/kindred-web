import { motion } from 'framer-motion'
import { useResponsiveScale, useIsMobile } from '@/hooks/useResponsiveScale'
import dealShapesSrc from '@/assets/shapes/deal-shapes.svg'

export function WhatsDealSection() {
  const scale = useResponsiveScale()
  const isMobile = useIsMobile()

  return (
    <section className="relative w-full py-32 bg-white overflow-hidden">
      {/* Decorative Background Shapes */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <img 
          src={dealShapesSrc} 
          alt="" 
          className="absolute right-[-20%] md:right-0 top-0 h-[120%] object-cover object-right"
        />
      </div>

      <div className="container mx-auto px-6 md:px-8 relative z-10">
        
        {/* First Block: Intro */}
        <div className="mb-12">
          <div className="flex items-start gap-4 mb-8">
            <span className="font-outfit text-lg font-light text-black tracking-wide">
            WHATS THE DEAL?
            </span>
            <div className="w-2 h-2 bg-[#D9D9D9] rounded-full mt-2.5" />
          </div>
          
          <div className="font-fraunces text-4xl md:text-[56px] font-light leading-tight tracking-tight gap-0 line-height-[0.8]"
               style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>
            <p className="mb-2 text-[#13121f]">You've tried every productivity app. <br />
            <span className="text-[#854dff]">You never changed.</span>
            </p>
          </div>
        </div>

        {/* Second Block: Problem Statement */}
        <div className="max-w-2xl mb-48 relative">
          <p className="font-outfit text-2xl md:text-[28px] font-light leading-[1.2] text-black">
            That's because the problem was never <span className="text-[#854dff]">organization</span> - it was <span className="text-[#854dff]">motivation</span> and <span className="text-[#854dff]">discipline</span>.
          </p>
        </div>

        {/* Third Block: Solution Statement */}
        <div className="relative mt-48 max-w-3xl">
           <p className="font-outfit mt-24 text-2xl md:text-[28px] font-light leading-[1.2] text-[#13121f]">
            Its about time you fall back in 
            <span className="relative mx-2 inline-block text-[#854dff]">
              love
              {/* Bounding Box Decoration */}
              <span className="absolute -inset-2 border-[3px] border-[#854dff] rounded-sm -rotate-1" />
              {/* Corner squares for the bounding box effect */}
              <span className="absolute -top-2.5 -left-2.5 w-1.5 h-1.5 bg-[#854dff] border border-[#854dff]" />
              <span className="absolute -top-2.5 -right-2.5 w-1.5 h-1.5 bg-white border border-[#854dff]" />
              <span className="absolute -bottom-2.5 -left-2.5 w-1.5 h-1.5 bg-white border border-[#854dff]" />
              <span className="absolute -bottom-2.5 -right-2.5 w-1.5 h-1.5 bg-white border border-[#854dff]" />
            </span>
             with your tools
          </p>
        </div>

      </div>
    </section>
  )
}
