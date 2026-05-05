import { useResponsiveScale, useIsMobile } from '@/hooks/useResponsiveScale'
import { typography } from '@/lib/design-system'
import { ConveyorBelt } from '@/components/ConveyorBelt'
import belt1 from '@/assets/new-design/belt-1.png'
import belt2 from '@/assets/new-design/belt-2.png'
import belt3 from '@/assets/new-design/belt-3.png'
import belt4 from '@/assets/new-design/belt-4.png'
import belt5 from '@/assets/new-design/belt-5.png'
import belt6 from '@/assets/new-design/belt-6.png'

const BELT_IMAGES = [
  { src: belt1, height: 283, width: 280 },
  { src: belt2, height: 280, width: 280 },
  { src: belt3, height: 283, width: 280 },
  { src: belt4, height: 280, width: 280 },
  { src: belt5, height: 283, width: 280 },
  { src: belt6, height: 280, width: 280 },
]

export function MotivationSection() {
  const scale = useResponsiveScale()
  const isMobile = useIsMobile()

  return (
    <section className="relative w-full bg-white overflow-hidden" style={{ padding: isMobile ? '64px 0' : `${scale(96)} 0` }}>
      <div style={{ padding: isMobile ? '0 16px' : `0 ${scale(64)}` }}>
        {isMobile ? (
          <>
            <div>
              <p className="font-outfit font-normal capitalize leading-[1.25] text-black tracking-[-0.48px] text-[28px]">
                You've tried every productivity app.
              </p>
              <p className="font-outfit font-normal capitalize leading-[1.25] tracking-[-0.48px] text-[28px]">
                <span className="text-black">You never changed. </span>
                <span className="text-text-subtle">its not because organization was the problem. Its because of motivation and accountability</span>
              </p>
            </div>
            <div className="bg-primary" style={{ height: '3px', width: '150px', marginTop: '24px' }} />
            <p className="font-outfit text-black mt-4" style={typography.sectionBody.mobile}>
              Because doing it alone was never actually the plan. The best version of you is built with the people around you.
            </p>
          </>
        ) : (
          <div className="grid grid-cols-12 gap-x-[20px]">
            {/* Headline: columns 1-7 */}
            <div className="col-span-7">
              <p className="font-outfit font-normal capitalize leading-[1.25] text-black tracking-[-0.48px]" style={{ fontSize: scale(48) }}>
                You've tried every productivity app.
              </p>
              <p className="font-outfit font-normal capitalize leading-[1.25] tracking-[-0.48px]" style={{ fontSize: scale(48) }}>
                <span className="text-black">You never changed. </span>
                <span className="text-text-subtle">its not because organization was the problem. Its because of motivation and accountability</span>
              </p>
              <div className="bg-primary" style={{ height: '3px', width: scale(200), marginTop: scale(24) }} />
            </div>
            {/* Spacer: column 8 */}
            <div className="col-span-1" />
            {/* Body copy: columns 9-12 */}
            <div className="col-span-4 flex flex-col justify-end">
              <div className="bg-primary" style={{ height: '3px', width: scale(200), marginBottom: scale(16) }} />
              <p className="font-outfit text-black" style={typography.sectionBody.desktop}>
                Because doing it alone was never actually the plan. The best version of you is built with the people around you.
              </p>
            </div>
          </div>
        )}
      </div>
      <div style={{ marginTop: isMobile ? '40px' : scale(192) }}>
        <ConveyorBelt speed={50}>
          <div className="flex gap-[23px] items-center">
            {BELT_IMAGES.map((img, i) => (
              <div key={i} className="shrink-0 rounded-[8px] overflow-hidden" style={{ width: isMobile ? '200px' : scale(img.width), height: isMobile ? '200px' : scale(img.height) }}>
                <img src={img.src} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </ConveyorBelt>
      </div>
    </section>
  )
}
