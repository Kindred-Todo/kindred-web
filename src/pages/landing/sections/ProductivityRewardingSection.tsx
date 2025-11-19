import { columnStart, columns } from '@/lib/design-system'
import { motion } from 'framer-motion'
import { useResponsiveScale, useIsMobile } from '@/hooks/useResponsiveScale'
import { CongratulationPill } from '@/components/CongratulationPill'
import imgImage7 from '@/assets/image7.png'
import imgImage8 from '@/assets/image8.png'
import gifCinema from '@/assets/gifs/cinema.gif'
import gifKermit from '@/assets/gifs/kermit.gif'
import svgStar7 from '@/assets/shapes/star7.svg'
import svgStar8 from '@/assets/shapes/star8.svg'
import svgPolygon1 from '@/assets/shapes/polygon1.svg'
import svgStar1 from '@/assets/shapes/star1.svg'

interface MicrophoneIconProps {
  className?: string
}

function MicrophoneIcon({ className = '' }: MicrophoneIconProps) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16 2C13.7909 2 12 3.79086 12 6V16C12 18.2091 13.7909 20 16 20C18.2091 20 20 18.2091 20 16V6C20 3.79086 18.2091 2 16 2Z"
        fill="currentColor"
      />
      <path
        d="M8 14V16C8 20.4183 11.5817 24 16 24C20.4183 24 24 20.4183 24 16V14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M16 24V30M12 30H20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function ProductivityRewardingSection() {
  const scale = useResponsiveScale()
  const isMobile = useIsMobile()
  
  return (
    <section 
      className="mb-32 md:mb-48 relative overflow-hidden" 
      style={{ 
        paddingLeft: '16px',
        paddingRight: '16px',
        paddingTop: isMobile ? '4rem' : '6rem',
        minHeight: isMobile ? 'auto' : '1100px',
      }}
    >
      {/* Main container */}
      <div className="relative" style={{ minHeight: isMobile ? 'auto' : scale(1200) }}>
        {/* Header text */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }} 
          className="font-fraunces font-normal italic leading-none mb-12 md:mb-0"
          style={{
            fontSize: scale(isMobile ? 48 : 128),
            letterSpacing: scale(isMobile ? -2.4 : -3.84),
            fontVariationSettings: "'SOFT' 25, 'WONK' 1, 'opsz' 144",
            position: isMobile ? 'relative' : 'absolute',
            top: isMobile ? 0 : 0,
            left: isMobile ? 0 : 0,
            maxWidth: isMobile ? '100%' : scale(1624),
          }}
        >
          <span className="text-black">      <div className="w-24 h-[1px] bg-white inline-block" />   Productivity has never felt so </span>
          <span className="text-[#854dff]">rewarding</span>
        </motion.h2>

        {/* Description text */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
          style={{
            position: isMobile ? 'relative' : 'absolute',
            top: isMobile ? '2rem' : scale(271),
            left: isMobile ? 0 : `calc(50% + ${scale(135)})`,
            width: isMobile ? '100%' : scale(687),
          }}
        >
          <p 
            className="font-fraunces font-light leading-[1.05] text-black" 
            style={{
              fontSize: scale(isMobile ? 24 : 32),
              letterSpacing: scale(isMobile ? -0.24 : -0.32),
              fontVariationSettings: "'SOFT' 0, 'WONK' 1",
            }}
          >
            <span>Boost your </span>
            <span className="italic text-[#854dff]">intrinsic </span>
            <span className="italic text-[#854dff]">motivation</span>
            <span> through psychology to help you naturally </span>
            <span className="italic">accomplish more</span>
            <span>, and </span>
            <span className="italic text-[#854dff]">feel good</span>
            <span> about doing so.</span>
          </p>
        </motion.div>

        {/* Vertical divider line */}
        {!isMobile && (
          <div
            style={{
              position: 'absolute',
              top: scale(251),
              left: scale(927),
              width: scale(3),
              height: scale(164),
              background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0) 100%)',
            }}
          />
        )}

        {/* Matcha image with pill (left) */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-8 md:mb-0"
          style={{
            position: isMobile ? 'relative' : 'absolute',
            top: isMobile ? '3rem' : scale(395),
            left: isMobile ? 0 : 0,
            width: isMobile ? '100%' : scale(429),
            height: isMobile ? 'auto' : scale(424),
            zIndex: 2,
          }}
        >
          <motion.img 
            src={imgImage7} 
            alt="Matcha drink" 
            className="rounded-lg object-cover"
            style={{
              position: isMobile ? 'relative' : 'absolute',
              top: isMobile ? 0 : scale(30),
              left: 0,
              width: isMobile ? '70%' : scale(309),
              height: isMobile ? 'auto' : scale(394),
            }}
            whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
          />
          <CongratulationPill 
            className="md:mt-0"
            delay={0.5}
            style={{
              position: 'absolute',
              top: isMobile ? 'auto' : 0,
              bottom: isMobile ? scale(20) : 'auto',
              right: 0,
              maxWidth: scale(288),
              transform: isMobile ? 'scale(0.55)' : 'none',
              transformOrigin: 'bottom right',
            }}
          >
            Josh finished task with your encouragement! 🎉
          </CongratulationPill>
        </motion.div>

        {/* Kermit GIF with pill (center-left) */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-8 md:mb-0"
          style={{
            position: isMobile ? 'relative' : 'absolute',
            top: isMobile ? '2rem' : scale(538),
            left: isMobile ? 0 : scale(424),
            width: isMobile ? '100%' : scale(548),
            height: isMobile ? 'auto' : scale(243),
            zIndex: 2,
          }}
        >
          <CongratulationPill 
            delay={0.6}
            style={{
              position: 'absolute',
              top: isMobile ? scale(10) : 0,
              right: 0,
              transform: isMobile ? 'scale(0.85)' : 'none',
              transformOrigin: 'top right',
            }}
          >
            Joe sent an encouragement on "Practice Guitar" 🎉
          </CongratulationPill>
          <motion.img 
            src={gifKermit} 
            alt="Kermit celebration" 
            className="rounded-lg object-cover border-[4px] border-white"
            style={{
              position: isMobile ? 'relative' : 'absolute',
              top: isMobile ? 0 : scale(32),
              right: isMobile ? 0 : 0,
              width: isMobile ? '75%' : scale(332),
              height: isMobile ? 'auto' : scale(211),
              marginLeft: isMobile ? 'auto' : 0,
            }}
            whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
          />
        </motion.div>

        {/* Cinema GIF with pill (center) */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-8 md:mb-0"
          style={{
            position: isMobile ? 'relative' : 'absolute',
            top: isMobile ? '2rem' : scale(675),
            left: isMobile ? 0 : scale(195),
            width: isMobile ? '100%' : scale(558),
            height: isMobile ? 'auto' : scale(412),
            zIndex: 2,
          }}
        >
          <motion.img 
            src={gifCinema} 
            alt="Cinema celebration" 
            className="rounded-lg object-cover border-[4px] border-white"
            style={{
              position: isMobile ? 'relative' : 'absolute',
              top: 0,
              left: 0,
              width: isMobile ? '70%' : scale(398),
              height: isMobile ? 'auto' : scale(398),
            }}
            whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
          />
          <CongratulationPill 
            className="md:mt-0"
            delay={0.7}
            style={{
              position: 'absolute',
              bottom: isMobile ? scale(20) : 0,
              right: 0,
              transform: isMobile ? 'scale(0.85)' : 'none',
              transformOrigin: 'bottom right',
            }}
          >
            Emily sent you a congratulations 🎉
          </CongratulationPill>
        </motion.div>

        {/* Microphone image with pill (right) */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-8 md:mb-0"
          style={{
            position: isMobile ? 'relative' : 'absolute',
            top: isMobile ? '2rem' : scale(571),
            left: isMobile ? 0 : scale(1042),
            width: isMobile ? '100%' : scale(429),
            height: isMobile ? 'auto' : scale(424),
            zIndex: 2,
          }}
        >
          <motion.img 
            src={imgImage8} 
            alt="Microphone setup" 
            className="rounded-lg object-cover"
            style={{
              position: isMobile ? 'relative' : 'absolute',
              top: isMobile ? 0 : scale(30),
              left: isMobile ? 0 : 0,
              width: isMobile ? '75%' : scale(309),
              height: isMobile ? 'auto' : scale(394),
              marginLeft: isMobile ? 'auto' : 0,
            }}
            whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
          />
          <CongratulationPill 
            className="md:mt-0"
            delay={0.8}
            style={{
              position: 'absolute',
              bottom: isMobile ? scale(20) : 0,
              right: isMobile ? 0 : 0,
              left: isMobile ? 0 : 'auto',
              maxWidth: scale(304),
              transform: isMobile ? 'scale(0.85)' : 'none',
              transformOrigin: 'bottom right',
            }}
          >
            Reward: +3 voice credits from sending 12 Kudos! 💵
          </CongratulationPill>
        </motion.div>

        {/* AI badge (right top) */}
        {!isMobile && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            viewport={{ once: true, margin: "-100px" }}
            className="bg-[#e3d6ff] px-5 py-2 rounded-2xl"
            style={{
              position: 'absolute',
              top: scale(583),
              left: scale(1315),
              zIndex: 4,
            }}
          >
            <p 
              className="font-outfit font-light leading-[1.05] text-[#8a38f5]"
              style={{
                fontSize: scale(20),
                letterSpacing: scale(-0.8),
              }}
            >
              AI
            </p>
          </motion.div>
        )}

        {/* Decorative shapes - Desktop only */}
        {!isMobile && (
          <>
            {/* Sparkle icon (bottom left) */}
            <motion.div
              initial={{ opacity: 0, rotate: 0 }}
              whileInView={{ opacity: 1, rotate: 345 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              style={{
                position: 'absolute',
                top: scale(959.76),
                left: scale(11.76),
                width: scale(57.6),
                height: scale(57.6),
                zIndex: 1,
              }}
            >
              <img src={svgStar1} alt="" className="w-full h-full text-[#854dff]" style={{ filter: 'brightness(0) saturate(100%) invert(45%) sepia(73%) saturate(3862%) hue-rotate(243deg) brightness(101%) contrast(101%)' }} />
            </motion.div>

            {/* Star 1 (top center) */}
            <motion.div 
              initial={{ opacity: 0, rotate: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, rotate: 120, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              viewport={{ once: true, margin: "-100px" }}
              style={{
                position: 'absolute',
                top: scale(363.44),
                left: scale(739.66),
                width: scale(41.97),
                height: scale(41.97),
                zIndex: 1,
              }}
            >
              <img src={svgStar7} alt="" className="w-full h-full" />
            </motion.div>

            {/* Star 2 (top center-left) */}
            <motion.div 
              initial={{ opacity: 0, rotate: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, rotate: 120, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              viewport={{ once: true, margin: "-100px" }}
              style={{
                position: 'absolute',
                top: scale(340.03),
                left: scale(560),
                width: scale(64.58),
                height: scale(64.58),
                zIndex: 1,
              }}
            >
              <img src={svgStar8} alt="" className="w-full h-full" />
            </motion.div>

            {/* Triangle (top) */}
            <motion.div 
              initial={{ opacity: 0, rotate: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, rotate: 121.074, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              viewport={{ once: true, margin: "-100px" }}
              style={{
                position: 'absolute',
                top: scale(262),
                left: scale(655.9),
                width: scale(59.83),
                height: scale(57.63),
                zIndex: 1,
              }}
            >
              <img src={svgPolygon1} alt="" className="w-full h-full" />
            </motion.div>

          </>
        )}
      </div>
    </section>
  )
}

