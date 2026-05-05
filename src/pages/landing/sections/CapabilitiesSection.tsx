import { useResponsiveScale, useIsMobile } from '@/hooks/useResponsiveScale'
import { AutoAccordion } from '@/components/AutoAccordion'

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
          <p className="font-outfit text-text-muted leading-[1.2] tracking-[-0.2px]" style={{ fontSize: isMobile ? '16px' : scale(20), maxWidth: isMobile ? '100%' : scale(714) }}>
            Its fun, its a tool with personality. Built for the way you actually want to get things done — with your people by your side.
          </p>
        </div>

        {/* Content: Accordion + Product Demo */}
        <div className="flex flex-col md:flex-row gap-8 mt-16 md:mt-32 w-full" style={{ gap: isMobile ? '32px' : scale(216) }}>
          <div className="flex-1" style={{ maxWidth: isMobile ? '100%' : scale(736) }}>
            <AutoAccordion items={CAPABILITIES} autoAdvanceDelay={5000} />
          </div>
          <div className="flex-1">
            <div
              className="bg-light-foreground rounded-tl-[24px] rounded-tr-[24px] w-full flex items-center justify-center"
              style={{ height: isMobile ? '300px' : scale(586), maxWidth: isMobile ? '100%' : scale(452) }}
            >
              <p className="font-outfit text-[24px] text-black tracking-[-0.96px] text-center leading-[1.05]">product<br/>demos</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
