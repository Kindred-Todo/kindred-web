import { motion } from 'framer-motion'
import { useResponsiveScale, useIsMobile } from '@/hooks/useResponsiveScale'
import { typography } from '@/lib/design-system'
import { decorativeShapes } from '@/assets/shapes/decorative-shapes'
import everyoneWins1 from '@/assets/new-design/everyone-wins-1.png'
import everyoneWins2 from '@/assets/new-design/everyone-wins-2.png'

export function EveryoneWinsSection() {
  const scale = useResponsiveScale()
  const isMobile = useIsMobile()

  return (
    <section className="relative w-full bg-white" style={{ padding: isMobile ? '64px 16px' : `${scale(96)} ${scale(64)}` }}>
      {/* Decorative shapes */}
      {!isMobile && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute"
            style={{ right: scale(80), top: scale(60), width: scale(40), height: scale(40), opacity: 0.12, filter: 'drop-shadow(0 0 12px rgba(133, 77, 255, 0.4))' }}
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          >
            <svg className="block size-full" fill="none" viewBox="0 0 46.0422 43.7887">
              <path d={decorativeShapes.filledStar} fill="var(--color-primary)" fillOpacity="0.6" stroke="var(--color-primary)" strokeWidth="0.9" />
            </svg>
          </motion.div>
          <motion.div
            className="absolute"
            style={{ right: scale(200), bottom: scale(120), width: scale(50), height: scale(50), opacity: 0.08, filter: 'drop-shadow(0 0 14px rgba(133, 77, 255, 0.35))' }}
            animate={{ rotate: [45, -315] }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          >
            <svg className="block size-full" fill="none" viewBox="0 0 65.1557 62.234">
              <path d={decorativeShapes.dashedStar} stroke="var(--color-primary)" strokeDasharray="18.04 18.04" strokeWidth="1.8" />
            </svg>
          </motion.div>
        </div>
      )}
      <h2 className="font-outfit font-[350] capitalize leading-[1.25] text-black tracking-[-2.4px]" style={{ fontSize: isMobile ? '32px' : scale(48), maxWidth: isMobile ? '100%' : scale(934) }}>
        On Kindred, everyone wins.
      </h2>
      <div className="bg-primary" style={{ height: '3px', width: isMobile ? '150px' : scale(234), marginTop: isMobile ? '16px' : scale(16), marginLeft: isMobile ? '0' : scale(262) }} />
      {isMobile ? (
        <div className="flex flex-col mt-8 gap-8">
          <p className="font-outfit" style={typography.sectionBody.mobile}>
            <span className="text-primary">Most productivity apps are built for one person grinding alone. </span>
            <span className="text-black">Kindred is different — when your friends grow, you grow. When you hit a goal, they feel it too. Progress isn't a competition here. It's contagious.</span>
          </p>
          <div className="flex gap-3">
            <div className="overflow-hidden w-[48%] h-[300px]">
              <img src={everyoneWins1} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="overflow-hidden w-[48%] h-[300px]">
              <img src={everyoneWins2} alt="" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-12 gap-x-[20px]" style={{ marginTop: scale(100) }}>
          {/* Text: columns 1-4 */}
          <div className="col-span-4">
            <p className="font-outfit" style={typography.sectionBody.desktop}>
              <span className="text-primary">Most productivity apps are built for one person grinding alone. </span>
              <span className="text-black">Kindred is different — when your friends grow, you grow. When you hit a goal, they feel it too. Progress isn't a competition here. It's contagious.</span>
            </p>
          </div>
          {/* Image 1: columns 5-8 */}
          <div className="col-span-4 overflow-hidden" style={{ height: scale(616) }}>
            <img src={everyoneWins1} alt="" className="w-full h-full object-cover" />
          </div>
          {/* Image 2: columns 9-12 */}
          <div className="col-span-4 overflow-hidden" style={{ height: scale(616) }}>
            <img src={everyoneWins2} alt="" className="w-full h-full object-cover" />
          </div>
        </div>
      )}
    </section>
  )
}
