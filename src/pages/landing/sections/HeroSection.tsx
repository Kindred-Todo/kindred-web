import { motion } from 'framer-motion'
import { useResponsiveScale, useIsMobile } from '@/hooks/useResponsiveScale'
import { decorativeShapes } from '@/assets/shapes/decorative-shapes'
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

      {/* Decorative shapes */}
      {!isMobile && (
        <div className="absolute inset-0 pointer-events-none z-[1]">
          {/* Filled star - top right area */}
          <motion.div
            className="absolute"
            style={{ right: '12%', top: '14%', width: '50px', height: '50px' }}
            animate={{ opacity: [0.08, 0.2, 0.08], scale: [0.95, 1.05, 0.95] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg className="block size-full rotate-[15deg]" fill="none" viewBox="0 0 46.0422 43.7887">
              <path d={decorativeShapes.filledStar} fill="var(--color-primary)" stroke="var(--color-primary)" strokeWidth="0.9" />
            </svg>
          </motion.div>
          {/* Dashed star - upper left */}
          <motion.div
            className="absolute"
            style={{ left: '8%', top: '22%', width: '60px', height: '60px' }}
            animate={{ opacity: [0.1, 0.22, 0.1], scale: [1, 1.08, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
          >
            <svg className="block size-full -rotate-[20deg]" fill="none" viewBox="0 0 65.1557 62.234">
              <path d={decorativeShapes.dashedStar} stroke="var(--color-primary)" strokeDasharray="18.04 18.04" strokeWidth="1.8" />
            </svg>
          </motion.div>
          {/* Small polygon - center right */}
          <motion.div
            className="absolute"
            style={{ right: '22%', top: '45%', width: '36px', height: '40px' }}
            animate={{ opacity: [0.06, 0.18, 0.06], scale: [0.98, 1.04, 0.98] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
          >
            <svg className="block size-full rotate-[30deg]" fill="none" viewBox="0 0 50 56">
              <path d={decorativeShapes.polygon} fill="var(--color-primary)" transform="translate(-155, -88)" />
            </svg>
          </motion.div>
          {/* Filled star - mid left */}
          <motion.div
            className="absolute"
            style={{ left: '18%', top: '55%', width: '35px', height: '35px' }}
            animate={{ opacity: [0.1, 0.25, 0.1], scale: [1, 1.06, 1] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
          >
            <svg className="block size-full rotate-[45deg]" fill="none" viewBox="0 0 46.0422 43.7887">
              <path d={decorativeShapes.filledStar} fill="var(--color-primary)" stroke="var(--color-primary)" strokeWidth="0.9" />
            </svg>
          </motion.div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 w-full h-full flex flex-col justify-end px-6 md:px-[64px] pb-[48px]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-[20px] items-end">
          {/* Wordmark: Spans 5 columns */}
          <div className="col-span-1 md:col-span-5 relative flex items-end">
            <img
              src={wordmarkSrc}
              alt="Kindred"
              className="w-[70%] md:w-full md:max-w-full h-auto object-contain object-bottom origin-bottom-left"
            />
          </div>

          {/* Spacer: 1 column */}
          <div className="hidden md:block md:col-span-1" />

          {/* Content: 6 columns */}
          <div className="col-span-1 md:col-span-6 flex flex-col justify-end gap-6 md:pb-4">
            {/* Buttons */}
            <div className="order-2 md:order-1 flex gap-2 mt-8 md:mt-0">
              <motion.a
                href="#"
                className="px-5 py-3 bg-primary rounded-[12px] font-outfit text-base text-white shadow-[0_0_40px_var(--color-primary-glow)] text-center whitespace-nowrap"
                style={{ width: isMobile ? '100%' : '247px' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Download Free
              </motion.a>
              <motion.a
                href="#"
                className="px-5 py-3 rounded-[12px] font-outfit text-base text-white border border-primary shadow-[0_0_40px_var(--color-primary-glow)] text-center whitespace-nowrap"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                See how it works
              </motion.a>
            </div>

            {/* Copy */}
            <div className="order-1 md:order-2 space-y-4">
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
