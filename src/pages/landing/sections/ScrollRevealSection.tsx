import { useResponsiveScale, useIsMobile } from '@/hooks/useResponsiveScale'
import { ScrollRevealText } from '@/components/ScrollRevealText'
import { decorativeShapes } from '@/assets/shapes/decorative-shapes'

export function ScrollRevealSection() {
  const scale = useResponsiveScale()
  const isMobile = useIsMobile()

  return (
    <section
      className="relative w-full overflow-clip bg-dark-bg"
      style={{ height: isMobile ? 'auto' : scale(1062), minHeight: '500px', padding: isMobile ? '80px 24px' : '0' }}
    >
      {/* Label */}
      <p
        className="text-center font-outfit font-normal text-white tracking-[-0.15px] whitespace-nowrap"
        style={{
          fontSize: scale(isMobile ? 12 : 15),
          position: isMobile ? 'relative' : 'absolute',
          top: isMobile ? 'auto' : scale(245),
          left: '50%',
          transform: 'translateX(-50%)',
          marginBottom: isMobile ? '40px' : '0',
        }}
      >
        WHAT IS IT?
      </p>

      {/* Scroll Reveal Text */}
      <ScrollRevealText
        text="Kindred is the platform for you and your friends to pursue your ambitions. "
        className="font-fraunces font-normal leading-[1.1] text-center tracking-[-1.28px]"
        containerClassName="absolute left-1/2 -translate-x-1/2"
        style={{
          fontSize: isMobile ? '32px' : scale(64),
          width: isMobile ? '90vw' : scale(1196),
          top: isMobile ? 'auto' : scale(377),
          fontVariationSettings: "'SOFT' 0, 'WONK' 1",
        }}
      />

      {/* Decorative star shapes - left side */}
      {!isMobile && (
        <>
          <div className="absolute" style={{ left: scale(171), top: scale(81), width: scale(66), height: scale(66) }}>
            <svg className="block size-full rotate-[60deg]" fill="none" viewBox="0 0 46.0422 43.7887">
              <path d={decorativeShapes.filledStar} fill="var(--color-primary)" fillOpacity="0.6" stroke="var(--color-primary)" strokeWidth="0.9" />
            </svg>
          </div>
          <div className="absolute" style={{ left: scale(51), top: scale(222), width: scale(75), height: scale(75) }}>
            <svg className="block size-full rotate-[60deg]" fill="none" viewBox="0 0 65.1557 62.234">
              <path d={decorativeShapes.dashedStar} stroke="var(--color-primary)" strokeDasharray="18.04 18.04" strokeWidth="1.8" />
            </svg>
          </div>

          {/* Right side */}
          <div className="absolute" style={{ right: scale(221), top: scale(708), width: scale(66), height: scale(66) }}>
            <svg className="block size-full -rotate-[120deg]" fill="none" viewBox="0 0 46.0422 43.7887">
              <path d={decorativeShapes.filledStar} fill="var(--color-primary)" fillOpacity="0.6" stroke="var(--color-primary)" strokeWidth="0.9" />
            </svg>
          </div>
          <div className="absolute" style={{ right: scale(100), top: scale(531), width: scale(75), height: scale(75) }}>
            <svg className="block size-full -rotate-[120deg]" fill="none" viewBox="0 0 65.1557 62.234">
              <path d={decorativeShapes.dashedStar} stroke="var(--color-primary)" strokeDasharray="18.04 18.04" strokeWidth="1.8" />
            </svg>
          </div>
        </>
      )}
    </section>
  )
}
