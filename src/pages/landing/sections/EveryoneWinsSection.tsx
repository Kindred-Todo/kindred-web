import { useResponsiveScale, useIsMobile } from '@/hooks/useResponsiveScale'
import everyoneWins1 from '@/assets/new-design/everyone-wins-1.png'
import everyoneWins2 from '@/assets/new-design/everyone-wins-2.png'

export function EveryoneWinsSection() {
  const scale = useResponsiveScale()
  const isMobile = useIsMobile()

  return (
    <section className="relative w-full bg-white" style={{ padding: isMobile ? '64px 16px' : `${scale(96)} ${scale(59)}` }}>
      <h2 className="font-outfit font-[350] capitalize leading-[1.25] text-black tracking-[-2.4px]" style={{ fontSize: isMobile ? '32px' : scale(48), maxWidth: isMobile ? '100%' : scale(934) }}>
        On Kindred, everyone wins.
      </h2>
      <div className="bg-primary" style={{ height: '3px', width: isMobile ? '150px' : scale(234), marginTop: isMobile ? '16px' : scale(16), marginLeft: isMobile ? '0' : scale(262) }} />
      <div className="flex flex-col md:flex-row mt-8" style={{ marginTop: isMobile ? '32px' : scale(100), gap: isMobile ? '32px' : '0' }}>
        <div style={{ maxWidth: isMobile ? '100%' : scale(525) }}>
          <p className="font-outfit font-[350] capitalize leading-[1.25] tracking-[-1.2px]" style={{ fontSize: isMobile ? '18px' : scale(24) }}>
            <span className="text-primary">Most productivity apps are built for one person grinding alone. </span>
            <span className="text-black">Kindred is different — when your friends grow, you grow. When you hit a goal, they feel it too. Progress isn't a competition here. It's contagious.</span>
          </p>
        </div>
        <div className="flex gap-4 md:ml-auto" style={{ gap: isMobile ? '12px' : '0' }}>
          <div className="overflow-hidden" style={{ width: isMobile ? '48%' : scale(542), height: isMobile ? '300px' : scale(616) }}>
            <img src={everyoneWins1} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="overflow-hidden" style={{ width: isMobile ? '48%' : scale(521), height: isMobile ? '300px' : scale(617) }}>
            <img src={everyoneWins2} alt="" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}
