import { useResponsiveScale, useIsMobile } from '@/hooks/useResponsiveScale'
import { typography } from '@/lib/design-system'
import everyoneWins1 from '@/assets/new-design/everyone-wins-1.png'
import everyoneWins2 from '@/assets/new-design/everyone-wins-2.png'

export function EveryoneWinsSection() {
  const scale = useResponsiveScale()
  const isMobile = useIsMobile()

  return (
    <section className="relative w-full bg-white" style={{ padding: isMobile ? '64px 16px' : `${scale(96)} ${scale(64)}` }}>
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
