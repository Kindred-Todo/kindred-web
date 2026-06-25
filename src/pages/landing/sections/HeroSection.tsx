import { motion } from 'framer-motion'
import { useResponsiveScale, useIsMobile } from '@/hooks/useResponsiveScale'
import { decorativeShapes } from '@/assets/shapes/decorative-shapes'
import videoSrc from '@/assets/kindred_final_final_4.mp4'
import wordmarkSrc from '@/assets/wordmark.svg'

export function HeroSection() {
  const scale = useResponsiveScale()
  const isMobile = useIsMobile()

  return (
    <section className="relative w-full h-[100dvh] min-h-[600px] overflow-hidden bg-dark-bg text-white">
      {/* Video Background. On mobile the multiply blend against the near-black
          bg erased the video, leaving a dead void above the bottom-anchored
          copy — so on mobile we let the (blurred) video show as atmosphere and
          rely on the scrim below for text contrast. */}
      <div className={`absolute inset-0 w-full h-full ${isMobile ? 'opacity-70' : 'mix-blend-multiply opacity-80'}`}>
        <video autoPlay loop muted playsInline className={`w-full h-full object-cover ${isMobile ? 'blur-[10px]' : 'blur-[12px]'}`}>
          <source src={videoSrc} type="video/mp4" />
        </video>
      </div>

      {/* Mobile legibility scrim: keeps the bottom-anchored copy readable while
          the top of the frame shows the video instead of dead black. */}
      {isMobile && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to top, rgba(19,18,31,1) 0%, rgba(19,18,31,1) 50%, rgba(19,18,31,0.85) 78%, rgba(19,18,31,0.6) 100%)',
          }}
        />
      )}

      {/* Purple glow blob - bottom left */}
      <div className="absolute pointer-events-none" style={{
        left: isMobile ? '-100px' : '-155px', bottom: isMobile ? '40px' : 'auto', top: isMobile ? 'auto' : '722px', width: isMobile ? '250px' : '364px', height: isMobile ? '270px' : '395px',
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
        right: isMobile ? '-80px' : 'auto', left: isMobile ? 'auto' : '1385px', top: isMobile ? '30%' : '509px', width: isMobile ? '250px' : '364px', height: isMobile ? '270px' : '395px',
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

      {/* Decorative shapes — mobile. Fewer and slightly bolder than desktop,
          placed in the upper third so they fill the space the copy doesn't. */}
      {isMobile && (
        <div className="absolute inset-0 pointer-events-none z-[1]">
          <motion.div
            className="absolute"
            style={{ right: '10%', top: '13%', width: '34px', height: '34px' }}
            animate={{ opacity: [0.18, 0.4, 0.18], scale: [0.95, 1.05, 0.95] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg className="block size-full rotate-[15deg]" fill="none" viewBox="0 0 46.0422 43.7887">
              <path d={decorativeShapes.filledStar} fill="var(--color-primary)" stroke="var(--color-primary)" strokeWidth="0.9" />
            </svg>
          </motion.div>
          <motion.div
            className="absolute"
            style={{ left: '8%', top: '21%', width: '44px', height: '44px' }}
            animate={{ opacity: [0.16, 0.34, 0.16], scale: [1, 1.08, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
          >
            <svg className="block size-full -rotate-[20deg]" fill="none" viewBox="0 0 65.1557 62.234">
              <path d={decorativeShapes.dashedStar} stroke="var(--color-primary)" strokeDasharray="18.04 18.04" strokeWidth="1.8" />
            </svg>
          </motion.div>
          <motion.div
            className="absolute"
            style={{ right: '26%', top: '31%', width: '26px', height: '28px' }}
            animate={{ opacity: [0.12, 0.26, 0.12], scale: [0.98, 1.04, 0.98] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
          >
            <svg className="block size-full rotate-[30deg]" fill="none" viewBox="0 0 50 56">
              <path d={decorativeShapes.polygon} fill="var(--color-primary)" transform="translate(-155, -88)" />
            </svg>
          </motion.div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 w-full h-full flex flex-col justify-center md:justify-end translate-y-[8dvh] md:translate-y-0 px-6 md:px-[64px] pb-[48px]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-[20px] gap-y-2 md:gap-y-0 items-end">
          {/* Wordmark: Spans 5 columns. Real <h1> text (sr-only) so crawlers
              and brand verification read the exact app name "Kindred", not just
              the wordmark image's alt. */}
          <h1 className="col-span-1 md:col-span-5 relative m-0 flex items-end justify-center md:justify-start">
            <span className="sr-only">Kindred</span>
            <img
              src={wordmarkSrc}
              alt="Kindred"
              className="w-[74%] md:w-full md:max-w-full h-auto object-contain object-bottom origin-bottom-left"
            />
          </h1>

          {/* Spacer: 1 column */}
          <div className="hidden md:block md:col-span-1" />

          {/* Content: 6 columns. Mobile order: headline → button → subtitle.
              Desktop keeps buttons on top via order overrides. */}
          <div className="col-span-1 md:col-span-6 flex flex-col justify-end gap-6 md:pb-4 text-center md:text-left">
            {/* Headline */}
            <h2 className="order-1 md:order-2 font-outfit text-[35px] md:text-[64px] font-normal leading-[1.05] tracking-[-0.03em] text-balance">
              The most rewarding, feel good productivity{' '}
              <br className="md:hidden" />
              system.
            </h2>

            {/* Buttons */}
            <div className="order-2 md:order-1 flex flex-col md:flex-row gap-3 md:gap-2">
              <motion.a
                href="https://apps.apple.com/us/app/kindred-todo/id6744142764"
                className="px-5 py-3 bg-primary rounded-[12px] font-outfit font-normal text-base text-white shadow-[0_0_22px_rgba(133,77,255,0.28)] md:shadow-[0_0_40px_var(--color-primary-glow)] flex items-center justify-center gap-2 whitespace-nowrap"
                style={{ width: isMobile ? '100%' : '247px' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg viewBox="0 0 384 512" fill="currentColor" className="w-[18px] h-[18px] -mt-0.5" aria-hidden="true">
                  <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
                </svg>
                Download on App Store
              </motion.a>
            </div>

            {/* Subtitle */}
            <p className="order-3 font-outfit text-[18px] md:text-[24px] font-[350] leading-[1.25] tracking-[-0.01em] opacity-90">
              {isMobile
                ? 'Social productivity that changes your behavior and drives real action, not just organization.'
                : 'Kindred is a social productivity app that makes your goals and everyday tasks feel good to do — because doing it alone never really worked.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
