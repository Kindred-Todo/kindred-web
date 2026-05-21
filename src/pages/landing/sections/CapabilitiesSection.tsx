import { useRef, useState } from 'react'
import {
  motion,
  useScroll,
  useMotionValueEvent,
  useTransform,
  MotionValue,
} from 'framer-motion'
import { useIsMobile, useResponsiveScale } from '@/hooks/useResponsiveScale'
import voiceDemoSrc from '@/assets/new-design/voice-demo.mp4'
import measurableDemoSrc from '@/assets/new-design/measurable-demo.mp4'
import kudosDemoSrc from '@/assets/new-design/kudos-demo.mp4'

type Capability = {
  title: string
  body: string
  videoSrc: string
}

const CAPABILITIES: Array<Capability> = [
  {
    title: 'Voice',
    body: 'Speak to build, edit, or manage your tasks. Hands free, friction free.',
    videoSrc: voiceDemoSrc,
  },
  {
    title: 'Measurable Activity',
    body: 'Close your rings, fill your graph, see your habits show up. You never stuck with habits because you could never see them form — now you can.',
    videoSrc: measurableDemoSrc,
  },
  {
    title: 'Kudos',
    body: 'Your friends are on Kindred too. Cheer their streaks, drop a congrats, send a nudge right when it counts.',
    videoSrc: kudosDemoSrc,
  },
]

const CARD_POSITIONS = [
  { left: 1086, top: 40 },   // Voice — top right (aligned with Kudos, clear of phone)
  { left: 0, top: 280 },     // Measurable Activity — middle left
  { left: 1086, top: 602 },  // Kudos — bottom right
]

const REF_WIDTH = 1517
const REF_HEIGHT = 856
const CARD_WIDTH = 370
const PHONE_WIDTH = 539.535
const PHONE_HEIGHT = 855.982
const PHONE_INNER_WIDTH = 367.219
const PHONE_INNER_HEIGHT = 789.596

function CapabilityCard({
  capability,
  isActive,
  onActivate,
  progress,
}: {
  capability: Capability
  isActive: boolean
  onActivate: () => void
  progress?: MotionValue<number>
}) {
  return (
    <div
      onMouseEnter={onActivate}
      onClick={onActivate}
      className="bg-white rounded-[8px] p-[28px] flex flex-col gap-[14px] items-start justify-center shadow-[0px_0px_24px_0px_rgba(0,0,0,0.05)] transition-all duration-500 ease-out w-full h-full cursor-pointer"
      style={{
        opacity: isActive ? 1 : 0.4,
        filter: isActive ? 'blur(0px)' : 'blur(5px)',
      }}
    >
      <p className="font-outfit font-medium text-[24px] text-black tracking-[-0.02em] leading-[1.05] whitespace-nowrap">
        {capability.title}
      </p>
      {progress ? (
        <RevealText
          text={capability.body}
          progress={progress}
          className="font-outfit text-[18px] leading-[1.45]"
        />
      ) : (
        <p className="font-outfit text-[18px] leading-[1.45] text-primary">
          {capability.body}
        </p>
      )}
    </div>
  )
}

function MobileCapabilityCard({
  capability,
  isActive,
  onActivate,
}: {
  capability: Capability
  isActive: boolean
  onActivate: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'start 0.35'],
  })
  return (
    <div ref={ref} className="w-full">
      <CapabilityCard
        capability={capability}
        isActive={isActive}
        onActivate={onActivate}
        progress={scrollYProgress}
      />
    </div>
  )
}

function RevealCharacter({
  char,
  index,
  total,
  progress,
}: {
  char: string
  index: number
  total: number
  progress: MotionValue<number>
}) {
  const threshold = index / total
  const end = Math.min(1, threshold + 2 / total)
  const color = useTransform(
    progress,
    [threshold, end],
    ['#A8A3B8', 'rgba(133, 77, 255, 1)'],
  )
  return <motion.span style={{ color }}>{char}</motion.span>
}

function RevealText({
  text,
  progress,
  className,
}: {
  text: string
  progress: MotionValue<number>
  className?: string
}) {
  const chars = text.split('')
  return (
    <p className={className}>
      {chars.map((c, i) => (
        <RevealCharacter
          key={i}
          char={c}
          index={i}
          total={chars.length}
          progress={progress}
        />
      ))}
    </p>
  )
}

// Phone rotates per active section: Voice → +5°, Measurable → -5°, Kudos → +5°.
const PHONE_ROTATIONS = [5, -5, 5]

// Scrub easing for the demo videos: scroll → video time isn't linear.
// Smoothstep eases the playhead at the start and end of each section's
// scroll window (so the first/last frames linger and read clearly) and
// runs ~1.5× linear through the middle.
const smoothstep = (t: number) => t * t * (3 - 2 * t)

function PhoneDemo({
  activeIndex,
  videoRefs,
}: {
  activeIndex: number
  videoRefs: React.MutableRefObject<Array<HTMLVideoElement | null>>
}) {
  return (
    <div
      className="absolute"
      style={{
        bottom: 0,
        left: '50%',
        height: '90%',
        aspectRatio: PHONE_WIDTH / PHONE_HEIGHT,
        transform: 'translateX(-50%)',
        filter: 'drop-shadow(0px 0px 12px rgba(0,0,0,0.16))',
      }}
    >
      <motion.div
        className="absolute left-1/2 top-1/2 h-full"
        style={{
          aspectRatio: PHONE_WIDTH / PHONE_HEIGHT,
          x: '-50%',
          y: '-50%',
        }}
        initial={false}
        animate={{ rotate: PHONE_ROTATIONS[activeIndex] ?? 5 }}
        transition={{ duration: 0.9, ease: [0.87, 0, 0.13, 1] }}
      >
        <div
          className="relative border-[12px] border-solid border-white rounded-[32px] overflow-hidden bg-black mx-auto"
          style={{
            height: `${(PHONE_INNER_HEIGHT / PHONE_HEIGHT) * 100}%`,
            aspectRatio: PHONE_INNER_WIDTH / PHONE_INNER_HEIGHT,
            marginTop: `${((PHONE_HEIGHT - PHONE_INNER_HEIGHT) / 2 / PHONE_HEIGHT) * 100}%`,
          }}
        >
          {CAPABILITIES.map((capability, index) => (
            <video
              key={capability.title}
              ref={(el) => {
                videoRefs.current[index] = el
              }}
              muted
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-out"
              style={{ opacity: activeIndex === index ? 1 : 0 }}
            >
              <source src={capability.videoSrc} type="video/mp4" />
            </video>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export function CapabilitiesSection() {
  const scale = useResponsiveScale()
  const isMobile = useIsMobile()
  const [activeIndex, setActiveIndex] = useState(0)
  const pinContainerRef = useRef<HTMLDivElement>(null)
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([])
  // Coalesce scroll-driven currentTime writes to one per animation frame.
  // Without this, useMotionValueEvent fires faster than the video element can
  // service seeks, which queues redundant work and causes scrub jank.
  const pendingScrub = useRef<{ index: number; local: number } | null>(null)
  const rafScheduled = useRef(false)

  const { scrollYProgress } = useScroll({
    target: pinContainerRef,
    offset: ['start start', 'end end'],
  })

  // Per-section local progress (0→1 within each section's scroll window).
  const voiceProgress = useTransform(scrollYProgress, [0, 1 / 3], [0, 1], {
    clamp: true,
  })
  const measurableProgress = useTransform(
    scrollYProgress,
    [1 / 3, 2 / 3],
    [0, 1],
    { clamp: true },
  )
  const kudosProgress = useTransform(scrollYProgress, [2 / 3, 1], [0, 1], {
    clamp: true,
  })
  const sectionProgress = [voiceProgress, measurableProgress, kudosProgress]

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    if (isMobile) return

    const next = progress < 1 / 3 ? 0 : progress < 2 / 3 ? 1 : 2
    setActiveIndex((prev) => (prev === next ? prev : next))

    const local =
      next === 0
        ? Math.min(1, progress * 3)
        : next === 1
          ? Math.min(1, (progress - 1 / 3) * 3)
          : Math.min(1, (progress - 2 / 3) * 3)

    pendingScrub.current = { index: next, local }
    if (rafScheduled.current) return
    rafScheduled.current = true
    requestAnimationFrame(() => {
      rafScheduled.current = false
      const target = pendingScrub.current
      if (!target) return
      pendingScrub.current = null
      const video = videoRefs.current[target.index]
      if (!video || !video.duration || isNaN(video.duration)) return
      const eased = smoothstep(target.local)
      const t = Math.max(
        0,
        Math.min(eased * video.duration, video.duration - 0.01),
      )
      if (Math.abs(video.currentTime - t) > 1 / 60) {
        video.currentTime = t
      }
    })
  })

  return (
    <section
      className="relative w-full bg-white"
      style={{ padding: isMobile ? '40px 16px' : `0 ${scale(64)}` }}
    >
      <div
        className="bg-surface rounded-[56px] w-full max-w-[1600px] mx-auto"
        style={{
          padding: isMobile ? '48px 24px' : `${scale(89)} ${scale(37)} ${scale(92)}`,
        }}
      >
        {/* Header — scrolls naturally above the pin */}
        <div
          className="flex flex-col items-center gap-8 text-center mx-auto"
          style={{ maxWidth: isMobile ? '100%' : scale(1086) }}
        >
          <p className="font-outfit text-primary text-xs uppercase">
            01 - Capabilities
          </p>
          <p
            className="font-outfit font-normal leading-none text-black tracking-[-0.02em] capitalize"
            style={{ fontSize: isMobile ? '28px' : scale(48) }}
          >
            Not Another Todo List. An Environment That Keeps You Going with Tools and People You'll Love
          </p>
          <p
            className="font-outfit font-[350] text-text-muted leading-[1.2] tracking-[-0.01em]"
            style={{
              fontSize: isMobile ? '16px' : `clamp(16px, ${scale(20)}, 20px)`,
              maxWidth: isMobile ? '100%' : scale(714),
            }}
          >
            Its fun, its a tool with personality. Built for the way you actually want to get things done — with your people by your side.
          </p>
        </div>

        {/* Phone + floating cards */}
        {isMobile ? (
          <div className="flex flex-col gap-8 mt-12 items-center">
            <div className="w-[260px] aspect-[367/789] relative">
              <div className="absolute inset-0 border-[10px] border-white rounded-[28px] overflow-hidden bg-black shadow-[0_8px_32px_rgba(0,0,0,0.15)]">
                {CAPABILITIES.map((capability, index) => (
                  <video
                    key={capability.title}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-out"
                    style={{ opacity: activeIndex === index ? 1 : 0 }}
                  >
                    <source src={capability.videoSrc} type="video/mp4" />
                  </video>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-4 w-full">
              {CAPABILITIES.map((capability, index) => (
                <MobileCapabilityCard
                  key={capability.title}
                  capability={capability}
                  isActive={activeIndex === index}
                  onActivate={() => setActiveIndex(index)}
                />
              ))}
            </div>
          </div>
        ) : (
          // Pin container — taller so each of the 3 sections gets its own scroll window.
          // 900vh = 300vh per section, slow enough to read each video's detail
          // without fast-forwarding through the demo.
          <div
            ref={pinContainerRef}
            style={{
              marginTop: scale(64),
              height: '720vh',
            }}
          >
            {/* Sticky child — pins 64px below viewport top once the phone reaches that line */}
            <div className="sticky top-[64px] h-screen w-full">
              <div
                className="relative mx-auto w-full"
                style={{ height: 'min(90vh, 1100px)' }}
              >
                <PhoneDemo activeIndex={activeIndex} videoRefs={videoRefs} />

                {CAPABILITIES.map((capability, index) => {
                  const position = CARD_POSITIONS[index]
                  return (
                    <div
                      key={capability.title}
                      className="absolute"
                      style={{
                        left: `${(position.left / REF_WIDTH) * 100}%`,
                        top: `${(position.top / REF_HEIGHT) * 100}%`,
                        width: `${(CARD_WIDTH / REF_WIDTH) * 100}%`,
                      }}
                    >
                      <CapabilityCard
                        capability={capability}
                        isActive={activeIndex === index}
                        onActivate={() => setActiveIndex(index)}
                        progress={sectionProgress[index]}
                      />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
