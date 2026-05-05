import { useResponsiveScale, useIsMobile } from '@/hooks/useResponsiveScale'
import { typography } from '@/lib/design-system'

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
          {/* Empty: columns 5-8 */}
          <div className="col-span-4" />
          {/* Image: columns 9-12 */}
          <div className="col-span-4 bg-light-foreground rounded-[8px] overflow-clip flex items-center justify-center" style={{ height: scale(610) }}>
            <p className="font-outfit text-[18px] text-black leading-[1.25]">product photo</p>
          </div>
        </div>
      )}
    </section>
  )
}
