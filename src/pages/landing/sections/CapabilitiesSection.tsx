import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useScroll,
  useMotionValueEvent,
  useTransform,
  MotionValue,
} from 'framer-motion'
import { useIsMobile, useResponsiveScale } from '@/hooks/useResponsiveScale'
import voice01 from '@/assets/new-design/demo-voice-01.png'
import voice02 from '@/assets/new-design/demo-voice-02.png'
import voice03 from '@/assets/new-design/demo-voice-03.png'
import voice04 from '@/assets/new-design/demo-voice-04.png'
import voice05 from '@/assets/new-design/demo-voice-05.png'
import voice06 from '@/assets/new-design/demo-voice-06.png'
import voice07 from '@/assets/new-design/demo-voice-07.png'
import voice08 from '@/assets/new-design/demo-voice-08.png'
import activity01 from '@/assets/new-design/demo-activity-01.png'
import activity02 from '@/assets/new-design/demo-activity-02.png'
import activity03 from '@/assets/new-design/demo-activity-03.png'
import activity04 from '@/assets/new-design/demo-activity-04.png'
import kudos01 from '@/assets/new-design/demo-kudos-01.png'
import kudos02 from '@/assets/new-design/demo-kudos-02.png'
import kudos03 from '@/assets/new-design/demo-kudos-03.png'
import kudos04 from '@/assets/new-design/demo-kudos-04.png'
import kudos05 from '@/assets/new-design/demo-kudos-05.png'
import kudos06 from '@/assets/new-design/demo-kudos-06.png'

type Capability = {
  title: string
  body: string
  frames: Array<string>
}

const CAPABILITIES: Array<Capability> = [
  {
    title: 'Voice',
    body: 'Speak to build, edit, or manage your tasks. Hands free, friction free.',
    frames: [voice01, voice02, voice03, voice04, voice05, voice06, voice07, voice08],
  },
  {
    title: 'Measurable Activity',
    body: 'Close your rings, fill your graph, see your habits show up. You never stuck with habits because you could never see them form — now you can.',
    frames: [activity01, activity02, activity03, activity04],
  },
  {
    title: 'Kudos',
    body: 'Your friends are on Kindred too. Cheer their streaks, drop a congrats, send a nudge right when it counts.',
    frames: [kudos01, kudos02, kudos03, kudos04, kudos05, kudos06],
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
      className="bg-white rounded-[8px] p-[24px] flex flex-col gap-[12px] items-start justify-center shadow-[0px_0px_24px_0px_rgba(0,0,0,0.05)] transition-all duration-500 ease-out w-full h-full cursor-pointer"
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
    ['#A8A3B8', 'rgba(92, 52, 184, 1)'],
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

// Map a section's 0→1 progress to the active frame index. Each frame holds
// for the slice [i / N, (i + 1) / N], with the final slice extending to 1
// so the last screenshot reads cleanly at the end of the scroll window.
function frameIndexForProgress(progress: number, frameCount: number) {
  if (frameCount <= 1) return 0
  const idx = Math.floor(progress * frameCount)
  return Math.min(frameCount - 1, Math.max(0, idx))
}

function FrameStack({
  frames,
  activeFrame,
  isActiveSection,
}: {
  frames: Array<string>
  activeFrame: number
  isActiveSection: boolean
}) {
  // Crossfade rule: every frame with index <= activeFrame stays at opacity 1.
  // Later-index frames are rendered later in the DOM, so they sit on top.
  // - Going forward (active N → N+1): frame N+1 fades 0→1 *on top of* frame N (already at 1).
  // - Going backward (active N+1 → N): frame N+1 fades 1→0, revealing frame N (still at 1) beneath.
  // The underlying layer always stays opaque, so we never fade through the black phone screen.
  return (
    <>
      {frames.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[500ms] ease-linear"
          style={{ opacity: isActiveSection && i <= activeFrame ? 1 : 0 }}
        />
      ))}
    </>
  )
}

function PhoneDemo({
  activeIndex,
  activeFrames,
}: {
  activeIndex: number
  activeFrames: Array<number>
}) {
  return (
    <div
      className="absolute"
      style={{
        top: '50%',
        left: '50%',
        height: '81%',
        aspectRatio: PHONE_WIDTH / PHONE_HEIGHT,
        transform: 'translate(-50%, -50%)',
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
            <FrameStack
              key={capability.title}
              frames={capability.frames}
              activeFrame={activeFrames[index] ?? 0}
              isActiveSection={activeIndex === index}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}

// Mobile auto-cycles each capability's frames once it's the active section.
const MOBILE_FRAME_INTERVAL_MS = 2800
// Mobile carousel auto-advances to the next capability on this cadence,
// pausing for one interval after the user last touches it.
const MOBILE_CAROUSEL_INTERVAL_MS = 6000

export function CapabilitiesSection() {
  const scale = useResponsiveScale()
  const isMobile = useIsMobile()
  const [activeIndex, setActiveIndex] = useState(0)
  const [activeFrames, setActiveFrames] = useState<Array<number>>(() =>
    CAPABILITIES.map(() => 0),
  )
  const pinContainerRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  // Timestamp of the user's last touch on the carousel, so autoplay backs off
  // instead of yanking the slide out from under a swipe.
  const lastInteractRef = useRef(0)

  const scrollToSlide = (index: number) => {
    const el = carouselRef.current
    if (!el) return
    lastInteractRef.current = Date.now()
    el.scrollTo({ left: index * el.clientWidth, behavior: 'smooth' })
  }

  const handleCarouselScroll = () => {
    const el = carouselRef.current
    if (!el) return
    const idx = Math.min(
      CAPABILITIES.length - 1,
      Math.max(0, Math.round(el.scrollLeft / el.clientWidth)),
    )
    setActiveIndex((prev) => (prev === idx ? prev : idx))
  }

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

    const frameCount = CAPABILITIES[next].frames.length
    const frame = frameIndexForProgress(local, frameCount)
    setActiveFrames((prev) =>
      prev[next] === frame ? prev : prev.map((v, i) => (i === next ? frame : v)),
    )
  })

  // Mobile: auto-advance the active section's frames on a timer.
  useEffect(() => {
    if (!isMobile) return
    const frameCount = CAPABILITIES[activeIndex].frames.length
    if (frameCount <= 1) return
    const id = window.setInterval(() => {
      setActiveFrames((prev) =>
        prev.map((v, i) =>
          i === activeIndex ? (v + 1) % frameCount : v,
        ),
      )
    }, MOBILE_FRAME_INTERVAL_MS)
    return () => window.clearInterval(id)
  }, [isMobile, activeIndex])

  // Mobile: auto-advance the carousel to the next capability. Programmatic
  // scrolls don't fire pointerdown, so they don't trip the interaction pause.
  useEffect(() => {
    if (!isMobile) return
    const id = window.setInterval(() => {
      const el = carouselRef.current
      if (!el) return
      if (Date.now() - lastInteractRef.current < MOBILE_CAROUSEL_INTERVAL_MS) return
      const next =
        (Math.round(el.scrollLeft / el.clientWidth) + 1) % CAPABILITIES.length
      el.scrollTo({ left: next * el.clientWidth, behavior: 'smooth' })
    }, MOBILE_CAROUSEL_INTERVAL_MS)
    return () => window.clearInterval(id)
  }, [isMobile])

  return (
    <section
      id="capabilities-section"
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
          <p className={`font-outfit text-primary uppercase ${isMobile ? 'text-[13px] tracking-[0.16em]' : 'text-xs'}`}>
            Capabilities
          </p>
          <p
            className="font-outfit font-normal leading-none text-black tracking-[-0.02em] capitalize"
            style={{ fontSize: isMobile ? '34px' : scale(48), lineHeight: isMobile ? 1.08 : undefined }}
          >
            Not Another Todo List. An Environment That Keeps You Going with Tools and People You'll Love
          </p>
          <p
            className="font-outfit font-[350] text-text-muted leading-[1.2] tracking-[-0.01em]"
            style={{
              fontSize: isMobile ? '18px' : `clamp(16px, ${scale(20)}, 20px)`,
              maxWidth: isMobile ? '100%' : scale(714),
            }}
          >
            Its fun, its a tool with personality. Built for the way you actually want to get things done — with your people by your side.
          </p>
        </div>

        {/* Phone + floating cards */}
        {isMobile ? (
          <div className="mt-12">
            {/* Swipeable carousel — one capability per slide. Native CSS
                scroll-snap handles the swipe; autoplay advances slides. */}
            <div
              ref={carouselRef}
              onScroll={handleCarouselScroll}
              onPointerDown={() => {
                lastInteractRef.current = Date.now()
              }}
              className="flex overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {CAPABILITIES.map((capability, index) => (
                <div
                  key={capability.title}
                  className="shrink-0 w-full snap-center flex flex-col items-center gap-8"
                >
                  <div className="w-[260px] aspect-[367/789] relative">
                    <div className="absolute inset-0 border-[10px] border-white rounded-[28px] overflow-hidden bg-black shadow-[0_8px_32px_rgba(0,0,0,0.15)]">
                      <FrameStack
                        frames={capability.frames}
                        activeFrame={activeFrames[index] ?? 0}
                        isActiveSection={activeIndex === index}
                      />
                    </div>
                  </div>
                  <div className="w-full px-1">
                    <CapabilityCard
                      capability={capability}
                      isActive={activeIndex === index}
                      onActivate={() => scrollToSlide(index)}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Dots */}
            <div className="flex gap-2 justify-center mt-6">
              {CAPABILITIES.map((capability, index) => (
                <button
                  key={capability.title}
                  type="button"
                  aria-label={`Show ${capability.title}`}
                  onClick={() => scrollToSlide(index)}
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    width: activeIndex === index ? 20 : 8,
                    background:
                      activeIndex === index
                        ? 'var(--color-primary)'
                        : 'rgba(0,0,0,0.15)',
                  }}
                />
              ))}
            </div>
          </div>
        ) : (
          // Pin container — taller so each of the 3 sections gets its own scroll window.
          // 1200vh = 400vh per section. Voice has the most frames (8), so at this
          // height each frame still holds for ~50vh — slow enough to read before
          // the next crossfade begins.
          <div
            ref={pinContainerRef}
            style={{
              marginTop: scale(64),
              height: '1200vh',
            }}
          >
            {/* Sticky child — pins 64px below viewport top once the phone reaches that line */}
            <div className="sticky top-[64px] h-screen w-full">
              <div
                className="relative mx-auto w-full"
                style={{ height: 'min(90vh, 1100px)' }}
              >
                <PhoneDemo activeIndex={activeIndex} activeFrames={activeFrames} />

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
