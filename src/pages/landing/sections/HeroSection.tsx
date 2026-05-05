import { motion } from 'framer-motion'
import { useResponsiveScale, useIsMobile } from '@/hooks/useResponsiveScale'
import videoSrc from '@/assets/landing-video/landing.mp4'
import wordmarkSrc from '@/assets/wordmark.svg'

export function HeroSection() {
  const scale = useResponsiveScale()
  const isMobile = useIsMobile()

  return (
    <section className="relative w-full h-[100dvh] min-h-[600px] overflow-hidden bg-dark-bg text-white">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full mix-blend-multiply opacity-60">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover">
          <source src={videoSrc} type="video/mp4" />
        </video>
      </div>

      {/* Purple glow blob - bottom left */}
      <div className="absolute pointer-events-none" style={{
        left: '-155px', top: '722px', width: '364px', height: '395px',
      }}>
        <svg className="block size-full" fill="none" viewBox="0 0 1764 1795" style={{
          position: 'absolute', inset: '-177% -192%',
        }}>
          <g filter="url(#glow-left)">
            <ellipse cx="882" cy="897.5" rx="182" ry="197.5" fill="var(--color-primary)" />
          </g>
          <defs>
            <filter id="glow-left" x="0" y="0" width="1764" height="1795" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="bg" />
              <feBlend in="SourceGraphic" in2="bg" mode="normal" result="shape" />
              <feGaussianBlur result="blur" stdDeviation="350" />
            </filter>
          </defs>
        </svg>
      </div>

      {/* Purple glow blob - right */}
      <div className="absolute pointer-events-none" style={{
        left: '1385px', top: '509px', width: '364px', height: '395px',
      }}>
        <svg className="block size-full" fill="none" viewBox="0 0 1764 1795" style={{
          position: 'absolute', inset: '-177% -192%',
        }}>
          <g filter="url(#glow-right)">
            <ellipse cx="882" cy="897.5" rx="182" ry="197.5" fill="var(--color-primary)" />
          </g>
          <defs>
            <filter id="glow-right" x="0" y="0" width="1764" height="1795" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="bg" />
              <feBlend in="SourceGraphic" in2="bg" mode="normal" result="shape" />
              <feGaussianBlur result="blur" stdDeviation="350" />
            </filter>
          </defs>
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full h-full flex flex-col justify-end px-6 md:px-[48px] pb-[48px]">
        <div className="grid grid-cols-1 md:grid-cols-9 gap-x-[20px] items-end">
          {/* Wordmark: Spans 4 columns */}
          <div className="col-span-1 md:col-span-4 relative flex items-end">
            <img
              src={wordmarkSrc}
              alt="Kindred"
              className="w-[70%] md:w-full md:max-w-full h-auto object-contain object-bottom origin-bottom-left"
            />
          </div>

          {/* Spacer: 1 column */}
          <div className="hidden md:block md:col-span-1" />

          {/* Content: 4 columns */}
          <div className="col-span-1 md:col-span-4 flex flex-col justify-end gap-6 md:pb-4">
            {/* Buttons */}
            <div className="order-2 md:order-1 flex gap-2 mt-8 md:mt-0">
              <motion.a
                href="#"
                className="px-5 py-3 bg-primary rounded-[12px] font-outfit text-base text-white shadow-[0_0_40px_var(--color-primary-glow)] text-center"
                style={{ width: isMobile ? '100%' : '247px' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Download Free
              </motion.a>
              <motion.a
                href="#"
                className="px-5 py-3 rounded-[12px] font-outfit text-base text-white border border-primary shadow-[0_0_40px_var(--color-primary-glow)] text-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                See how it works
              </motion.a>
            </div>

            {/* Copy */}
            <div className="order-1 md:order-2 space-y-4 max-w-2xl">
              <h2 className="font-outfit text-3xl md:text-[64px] font-normal leading-none tracking-[-1.92px]">
                The most rewarding, feel good productivity system.
              </h2>
              <p className="font-outfit text-lg md:text-[24px] font-normal leading-[1.25] tracking-[-0.72px] opacity-90">
                A system that actually feels good to use — because doing it alone never really worked.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
