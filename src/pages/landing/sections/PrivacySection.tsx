import { motion } from 'framer-motion'
import { useResponsiveScale, useIsMobile } from '@/hooks/useResponsiveScale'
import { typography } from '@/lib/design-system'
import { decorativeShapes } from '@/assets/shapes/decorative-shapes'

export function PrivacySection() {
  const scale = useResponsiveScale()
  const isMobile = useIsMobile()

  return (
    <section className="relative w-full bg-white" style={{ padding: isMobile ? '64px 16px' : `${scale(96)} ${scale(64)}` }}>
      {isMobile ? (
        <div className="flex flex-col gap-8">
          <div>
            <h2 className="font-outfit font-[350] capitalize leading-[1.25] text-black tracking-[-2.4px] text-[32px]">
              Your Record, Private by default, shared by choice.
            </h2>
            <p className="font-outfit text-black mt-4" style={typography.sectionBody.mobile}>
              Prefer privacy? Kindred is your private journal of everything you've done: every task, every photo, every win —
              <span className="text-primary"> visible only to the people you let in.</span>
            </p>
          </div>
          <div className="bg-light-foreground rounded-[8px] overflow-clip flex items-center justify-center w-full h-[300px]">
            <p className="font-outfit text-[18px] text-black leading-[1.25]">product photo</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-12 gap-x-[20px] items-start">
          {/* Text: columns 1-4 */}
          <div className="col-span-4">
            <h2 className="font-outfit font-[350] capitalize leading-[1.25] text-black tracking-[-2.4px]" style={{ fontSize: scale(48) }}>
              Your Record, Private by default, shared by choice.
            </h2>
            <p className="font-outfit text-black" style={{ ...typography.sectionBody.desktop, marginTop: scale(24) }}>
              Prefer privacy? Kindred is your private journal of everything you've done: every task, every photo, every win —
              <span className="text-primary"> visible only to the people you let in.</span>
            </p>
          </div>
          {/* Empty: columns 5-8 — with a subtle decorative shape */}
          <div className="col-span-4 relative">
            <motion.div
              className="absolute"
              style={{ left: '30%', top: '20%', width: scale(55), height: scale(55), opacity: 0.1, filter: 'drop-shadow(0 0 14px rgba(133, 77, 255, 0.4))' }}
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
            >
              <svg className="block size-full" fill="none" viewBox="0 0 65.1557 62.234">
                <path d={decorativeShapes.dashedStar} stroke="var(--color-primary)" strokeDasharray="18.04 18.04" strokeWidth="1.8" />
              </svg>
            </motion.div>
            <motion.div
              className="absolute"
              style={{ right: '20%', bottom: '30%', width: scale(30), height: scale(34), opacity: 0.1, filter: 'drop-shadow(0 0 10px rgba(133, 77, 255, 0.35))' }}
              animate={{ rotate: [-20, 340] }}
              transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
            >
              <svg className="block size-full" fill="none" viewBox="155 88 52 58">
                <path d={decorativeShapes.polygon} fill="var(--color-primary)" fillOpacity="0.7" />
              </svg>
            </motion.div>
          </div>
          {/* Image: columns 9-12 */}
          <div className="col-span-4 bg-light-foreground rounded-[8px] overflow-clip flex items-center justify-center" style={{ height: scale(610) }}>
            <p className="font-outfit text-[18px] text-black leading-[1.25]">product photo</p>
          </div>
        </div>
      )}
    </section>
  )
}
