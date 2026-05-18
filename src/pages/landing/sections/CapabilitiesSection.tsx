import { useResponsiveScale, useIsMobile } from '@/hooks/useResponsiveScale'
import { AutoAccordion } from '@/components/AutoAccordion'
import voiceDemoSrc from '@/assets/new-design/voice-demo.mp4'

const CAPABILITIES = [
  { title: 'Voice', content: 'Build your todo lists and manage your daily tasks with your voice, no more manual entry in sight' },
  { title: 'Kudos', content: "Send and receive recognition when it matters. Nothing beats a friend noticing your progress." },
  { title: 'Blueprints', content: 'Goal templates built for student life — finals week, job apps, passion projects. Start fast.' },
  { title: 'Measurable Activity', content: "You never stuck with your habits because you could never see them form. Now you can." },
]

export function CapabilitiesSection() {
  const scale = useResponsiveScale()
  const isMobile = useIsMobile()

  return (
    <section className="w-full bg-white" style={{ padding: isMobile ? '40px 16px' : `${scale(0)} ${scale(64)}` }}>
      <div
        className="bg-surface rounded-[56px] w-full max-w-[1600px] mx-auto overflow-clip"
        style={{ padding: isMobile ? '48px 24px' : `${scale(89)} ${scale(37)}` }}
      >
        {/* Header */}
        <div className="flex flex-col items-center gap-8 text-center" style={{ maxWidth: isMobile ? '100%' : scale(1086), margin: '0 auto' }}>
          <p className="font-outfit text-primary text-xs tracking-[-0.12px] uppercase">01 - Capabilities</p>
          <p className="font-outfit capitalize leading-none text-black tracking-[-0.48px]" style={{ fontSize: isMobile ? '28px' : scale(48) }}>
            not another todo list. an environment that keeps you going with tools and people you'll love
          </p>
          <p className="font-outfit text-text-muted leading-[1.2] tracking-[-0.2px]" style={{ fontSize: isMobile ? '16px' : `clamp(16px, ${scale(20)}, 20px)`, maxWidth: isMobile ? '100%' : scale(714) }}>
            Its fun, its a tool with personality. Built for the way you actually want to get things done — with your people by your side.
          </p>
        </div>

        {/* Content: Accordion + Product Demo */}
        {isMobile ? (
          <div className="flex flex-col gap-8 mt-8">
            <AutoAccordion items={CAPABILITIES} autoAdvanceDelay={5000} />
            <div className="bg-light-foreground rounded-tl-[24px] rounded-tr-[24px] w-full overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
              <video autoPlay loop muted playsInline className="w-full h-auto object-contain">
                <source src={voiceDemoSrc} type="video/mp4" />
              </video>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-12 gap-x-[20px] w-full" style={{ marginTop: scale(64) }}>
            {/* Accordion: columns 1-7 */}
            <div className="col-span-7">
              <AutoAccordion items={CAPABILITIES} autoAdvanceDelay={5000} />
            </div>
            {/* Spacer: column 8 */}
            <div className="col-span-1" />
            {/* Product Demo: columns 9-12 */}
            <div className="col-span-4">
              <div
                className="bg-light-foreground rounded-tl-[24px] rounded-tr-[24px] overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.08)]"
                style={{ height: scale(780), width: '85%' }}
              >
                <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                  <source src={voiceDemoSrc} type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
