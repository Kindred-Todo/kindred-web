import { motion } from 'framer-motion'
import { useIsMobile, useResponsiveScale } from '@/hooks/useResponsiveScale'
import { typography } from '@/lib/design-system'
import { decorativeShapes } from '@/assets/shapes/decorative-shapes'
import activityImg from '@/assets/new-design/privacy-activity.png'

export function PrivacySection() {
  const scale = useResponsiveScale()
  const isMobile = useIsMobile()

  return (
    <section className="relative w-full bg-white" style={{ padding: isMobile ? '64px 16px' : `${scale(96)} ${scale(64)}` }}>
      {isMobile ? (
        <div className="flex flex-col gap-8">
          <div>
            <h2 className="font-outfit font-normal leading-[1.25] text-black tracking-[-0.02em] text-[32px]">
              Your record, private by default, shared by choice.
            </h2>
            <p className="font-outfit text-black mt-4" style={typography.sectionBody.mobile}>
              Prefer privacy? Kindred is your private journal of everything you've done: every task, every photo, every win —
              <span className="text-primary"> visible only to the people you let in.</span>
            </p>
          </div>
          <img src={activityImg} alt="Activity screens" className="w-full h-auto object-contain" />
        </div>
      ) : (
        <div className="grid grid-cols-12 gap-x-[20px] items-start">
          {/* Text: columns 1-4 */}
          <div className="col-span-4">
            <h2 className="font-outfit font-normal leading-[1.25] text-black tracking-[-0.02em]" style={{ fontSize: scale(48) }}>
              Your record, private by default, shared by choice.
            </h2>
            <p className="font-outfit text-black" style={{ ...typography.sectionBody.desktop, marginTop: scale(24) }}>
              Prefer privacy? Kindred is your private journal of everything you've done: every task, every photo, every win —
              <span className="text-primary"> visible only to the people you let in.</span>
            </p>
          </div>
          {/* Activity image: columns 5-12 */}
          <div className="col-span-8 relative flex items-center justify-center" style={{ height: scale(700) }}>
            <img src={activityImg} alt="Activity screens" className="h-full object-cover" style={{ width: '80%' }} />
            {/* Decorative shapes */}
            <motion.div
              className="absolute pointer-events-none"
              style={{ left: '5%', bottom: '5%', width: scale(45), height: scale(45), opacity: 0.1, filter: 'drop-shadow(0 0 14px rgba(133, 77, 255, 0.4))' }}
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
            >
              <svg className="block size-full" fill="none" viewBox="0 0 65.1557 62.234">
                <path d={decorativeShapes.dashedStar} stroke="var(--color-primary)" strokeDasharray="18.04 18.04" strokeWidth="1.8" />
              </svg>
            </motion.div>
          </div>
        </div>
      )}
    </section>
  )
}
