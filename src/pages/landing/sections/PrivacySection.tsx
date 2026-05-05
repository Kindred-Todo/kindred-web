import { useResponsiveScale, useIsMobile } from '@/hooks/useResponsiveScale'

export function PrivacySection() {
  const scale = useResponsiveScale()
  const isMobile = useIsMobile()

  return (
    <section className="relative w-full bg-white" style={{ padding: isMobile ? '64px 16px' : `${scale(96)} ${scale(59)}` }}>
      <div className="flex flex-col md:flex-row" style={{ gap: isMobile ? '32px' : scale(48) }}>
        <div style={{ maxWidth: isMobile ? '100%' : scale(527) }}>
          <h2 className="font-outfit font-[350] capitalize leading-[1.25] text-black tracking-[-2.4px]" style={{ fontSize: isMobile ? '32px' : scale(48) }}>
            Your Record, Private by default, shared by choice.
          </h2>
          <p className="font-outfit font-[350] capitalize leading-[1.25] text-black tracking-[-1.2px] mt-6" style={{ fontSize: isMobile ? '18px' : scale(24), maxWidth: isMobile ? '100%' : scale(525), marginTop: isMobile ? '16px' : scale(24) }}>
            Prefer privacy? Kindred is your private journal of everything you've done: every task, every photo, every win —
            <span className="text-primary"> visible only to the people you let in.</span>
          </p>
        </div>
        <div className="bg-light-foreground rounded-[8px] overflow-clip flex items-center justify-center md:ml-auto" style={{ width: isMobile ? '100%' : scale(516), height: isMobile ? '300px' : scale(610) }}>
          <p className="font-outfit text-[18px] text-black leading-[1.25]">product photo</p>
        </div>
      </div>
    </section>
  )
}
