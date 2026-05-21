import { motion } from 'framer-motion'
import { useIsMobile, useResponsiveScale } from '@/hooks/useResponsiveScale'
import { typography } from '@/lib/design-system'
import { decorativeShapes } from '@/assets/shapes/decorative-shapes'
import everyoneWins1 from '@/assets/new-design/everyone-wins-1.png'
import everyoneWins2 from '@/assets/new-design/everyone-wins-2.png'
import taskCardIcecream from '@/assets/new-design/task-card-icecream.png'
import taskCardPresentation from '@/assets/new-design/task-card-presentation.png'

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
      <h2 className="font-outfit font-normal leading-[1.25] text-black tracking-[-0.02em]" style={{ fontSize: isMobile ? '32px' : scale(48), maxWidth: isMobile ? '100%' : scale(934) }}>
        On Kindred, everyone wins.
      </h2>
      <div className="bg-primary" style={{ height: '3px', width: isMobile ? '150px' : scale(234), marginTop: isMobile ? '16px' : scale(16), marginLeft: isMobile ? '0' : scale(262) }} />
      {isMobile ? (
        <div className="flex flex-col mt-8 gap-8">
          <p className="font-outfit" style={typography.sectionBody.mobile}>
            <span className="text-primary">Most productivity apps are built for one person grinding alone. </span>
            <span className="text-black">Kindred makes progress feel shared: friends can cheer each other on, celebrate completed goals, and turn one person's momentum into motivation for the whole group.</span>
          </p>
          <div className="relative flex flex-col gap-4">
            <div className="relative">
              <div className="w-full rounded-[8px] overflow-hidden">
                <img src={everyoneWins1} alt="" className="w-full h-auto object-cover" />
              </div>
              <img
                src={taskCardIcecream}
                alt="Ice Cream with groupchat"
                className="absolute"
                style={{ top: '-24px', right: '-12px', width: '85%', filter: 'drop-shadow(0px 4px 12px rgba(0,0,0,0.25))', transform: 'rotate(-3.51deg)', zIndex: 10 }}
              />
            </div>
            <div className="relative">
              <div className="w-full rounded-[8px] overflow-hidden">
                <img src={everyoneWins2} alt="" className="w-full h-auto object-cover" />
              </div>
              <img
                src={taskCardPresentation}
                alt="Finish up Presentation @ Reunion Cafe"
                className="absolute"
                style={{ bottom: '-24px', left: '-12px', width: '85%', filter: 'drop-shadow(0px 3px 10px rgba(0,0,0,0.25))', transform: 'rotate(4.48deg)', zIndex: 10 }}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-12 gap-x-[20px]" style={{ marginTop: scale(100) }}>
          {/* Text: columns 1-4 */}
          <div className="col-span-4">
            <p className="font-outfit" style={typography.sectionBody.desktop}>
              <span className="text-primary">Most productivity apps are built for one person grinding alone. </span>
              <span className="text-black">Kindred makes progress feel shared: friends can cheer each other on, celebrate completed goals, and turn one person's momentum into motivation for the whole group.</span>
            </p>
          </div>
          {/* Photos + task cards: columns 5-12 */}
          <div className="col-span-8 relative overflow-visible" style={{ height: scale(740) }}>
            {/* Left photo */}
            <div
              className="absolute overflow-hidden"
              style={{ left: '0', top: scale(60), width: '49%', height: scale(616) }}
            >
              <img src={everyoneWins1} alt="" className="w-full h-full object-cover" />
            </div>
            {/* Right photo */}
            <div
              className="absolute overflow-hidden"
              style={{ left: '51%', top: scale(60), width: '49%', height: scale(617) }}
            >
              <img src={everyoneWins2} alt="" className="w-full h-full object-cover" />
            </div>
            {/* "Ice Cream with groupchat" task card */}
            <img
              src={taskCardIcecream}
              alt="Ice Cream with groupchat"
              className="absolute"
              style={{
                right: '0',
                top: '0',
                width: '42%',
                filter: 'drop-shadow(0px 6px 18px rgba(0,0,0,0.25))',
                transform: 'rotate(-3.51deg)',
                zIndex: 10,
              }}
            />
            {/* "Finish up Presentation" task card */}
            <img
              src={taskCardPresentation}
              alt="Finish up Presentation @ Reunion Cafe"
              className="absolute"
              style={{
                left: '-4%',
                bottom: scale(50),
                width: '38%',
                filter: 'drop-shadow(0px 5px 15px rgba(0,0,0,0.25))',
                transform: 'rotate(4.48deg)',
                zIndex: 10,
              }}
            />
          </div>
        </div>
      )}
    </section>
  )
}
