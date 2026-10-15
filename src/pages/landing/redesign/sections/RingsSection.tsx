import { memo, useEffect, useMemo, useRef, useState } from 'react'
import {
  AnimatePresence,
  
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform
} from 'framer-motion'
import { ConcentricRings } from '../components/ConcentricRings'
import {
  AppCaption,
  AppDots,
  AppGreeting,
  AppNudge,
  AppSeeDay,
  AppSelector,
  AppSidebar,
  AppStage,
  AppTabBar,
  CAPTION_H,
  CARD_H,
  DAY_RING_PROGRESS,
  FOOTER_BOTTOM,
  GREETING_H,
  NUDGE_BOTTOM,
  NUDGE_BOTTOM_M,
  RING_SIZE,
  SELECTOR_H,
  SIDEBAR_W,
  SignupPrompt,
  StageGlow,
  TABBAR_H,
  appLayout,
} from '../components/DesktopApp'
import { DotGrid } from '../components/DotGrid'
import type {MotionValue} from 'framer-motion';
import type { AppLayout } from '../components/DesktopApp'

/**
 * "Say yes to your productivity rings" — then the whole screen turns into the
 * product.
 *
 * One pinned stage, two beats:
 *   0.00 → 0.42  the app's three rings close in sequence (plan → do → share);
 *                the score counts up with them.
 *   0.42 → 0.58  the rings are complete: the confetti burst, then a beat of
 *                stillness.
 *   0.58 → 1.00  the screen transforms. The sidebar slides in from the left
 *                and everything shifts over to make room; the rings shrink
 *                into the app's day ring; the headline and sub-copy settle into
 *                the app's greeting and streak line. Nothing is a cut — every
 *                element is the same element, moved and restyled.
 *
 * The app's geometry (components/DesktopApp) is the target of every move, so
 * the two states line up exactly.
 */

const FILL_FROM = 0.08
const FILL_TO = 0.42
const STAGGER = 0.22
const MORPH_FROM = 0.58
const MORPH_TO = 0.94

/** Beat-one geometry. The morph deltas are measured from these. */
const RING_TOP_VH = 0.22
const RING_BEAT = 204
const HEAD_GAP = 40
const SUB_GAP = 20

/** Phones: a bigger ring and a two-line headline, sized off the screen height
 *  so the beat still fits a 667px-tall phone. */
const RING_BEAT_M = 232
const RING_TOP_VH_M = 0.16
const HEAD_H_M = 92
/** The desktop headline is one line; the sub-copy hangs off it, not off the
 *  (taller) app greeting it turns into. */
const HEAD_H = 40

/** The beat's copy at phone size. The t-rings / t-label steps are tuned for a
 *  line of UI; here they're the section headline and its standfirst. */
const HEAD_M = 'max-md:text-[clamp(32px,9.4vw,40px)] max-md:leading-[1.12] max-md:px-6'
const SUB_M = 'max-md:text-[19px] max-md:leading-[1.4] max-md:px-8'

const SCORE = 66

const CONFETTI_COLORS = [
  '#854dff',
  '#a87bff',
  '#c4a6ff',
  '#FFD700',
  '#FF6B6B',
  '#4ECDC4',
  '#45B7D1',
  '#FF9F43',
  '#EE5A24',
  '#7bed9f',
]

function generateConfetti(count: number) {
  return Array.from({ length: count }, (_, i) => {
    const angle = Math.random() * Math.PI * 2
    const distance = Math.random() * 600 + 200
    return {
      id: i,
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance - 150,
      rotate: Math.random() * 1080 - 540,
      scale: Math.random() * 1.2 + 0.5,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      width: Math.random() * 10 + 6,
      height: Math.random() * 16 + 6,
      delay: Math.random() * 0.5,
      shape: Math.random() > 0.5 ? 'rect' : 'circle',
    }
  })
}

function Confetti({ show }: { show: boolean }) {
  const pieces = useMemo(() => generateConfetti(80), [])

  return (
    <AnimatePresence>
      {show && (
        <div
          className="pointer-events-none absolute flex items-center justify-center"
          style={{ inset: '-200px', zIndex: 20 }}
        >
          {pieces.map((p) => (
            <motion.div
              key={p.id}
              style={{
                position: 'absolute',
                width: p.width,
                height: p.shape === 'circle' ? p.width : p.height,
                backgroundColor: p.color,
                borderRadius: p.shape === 'circle' ? '50%' : '2px',
              }}
              initial={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 0 }}
              animate={{
                opacity: [1, 1, 1, 0],
                x: p.x,
                y: p.y,
                rotate: p.rotate,
                scale: [0, p.scale, p.scale, p.scale * 0.5],
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.5, delay: p.delay, ease: [0.15, 0.85, 0.35, 1] }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  )
}

/**
 * The pieces that only exist once the screen is the app: selector, card, dots
 * and the "see your whole day" link. Memoised on motion values, so the scroll
 * re-renders above don't touch it.
 */
const AppExtras = memo(function AppExtras({
  opacity,
  y,
  sidebarW,
  mobile,
  layout,
}: {
  opacity: MotionValue<number>
  y: MotionValue<number>
  sidebarW: number
  mobile: boolean
  layout: AppLayout
}) {
  return (
    <div className="absolute inset-y-0 right-0" style={{ left: sidebarW }} aria-hidden>
      <motion.div className="absolute inset-0" style={{ opacity, y }}>
        <AppStage layout={layout} compact={mobile} />
      </motion.div>
      {/* On a phone the tab bar takes the footer's place. */}
      {!mobile && (
        <motion.div
          className="absolute inset-x-0 flex justify-center"
          style={{ opacity, bottom: FOOTER_BOTTOM }}
        >
          <AppSeeDay />
        </motion.div>
      )}
      <motion.div
        className="absolute inset-x-0 flex justify-center"
        style={{ opacity, bottom: mobile ? NUDGE_BOTTOM_M : NUDGE_BOTTOM }}
      >
        <AppNudge />
      </motion.div>
    </div>
  )
})

export function RingsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()

  const [burst, setBurst] = useState(false)
  const [fill, setFill] = useState(0)
  const [mState, setMState] = useState(0)
  const [vp, setVp] = useState({ w: 1440, h: 900 })

  useEffect(() => {
    const measure = () => setVp({ w: window.innerWidth, h: window.innerHeight })
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const mobile = vp.w < 768
  const sidebarW = mobile ? 0 : SIDEBAR_W
  const ringBeat = mobile ? Math.min(RING_BEAT_M, vp.h * 0.27) : RING_BEAT
  const appGeo = useMemo(
    () => appLayout(mobile ? vp.h - TABBAR_H : vp.h, mobile),
    [vp.h, mobile],
  )

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const fillMV = useTransform(scrollYProgress, [FILL_FROM, FILL_TO], [0, 1], { clamp: true })
  useMotionValueEvent(fillMV, 'change', (v) => {
    if (reduceMotion) return
    setFill(v)
    if (v >= 1) setBurst((b) => b || true)
    else if (v < 0.98) setBurst(false)
  })

  // m — the transform itself.
  const m = useTransform(scrollYProgress, [MORPH_FROM, MORPH_TO], [0, 1], { clamp: true })
  useMotionValueEvent(m, 'change', (v) => setMState(v))

  // Every move is the distance between the beat's position and the app's slot.
  const ringTopBeat = (mobile ? RING_TOP_VH_M : RING_TOP_VH) * vp.h
  const headTopBeat = ringTopBeat + ringBeat + HEAD_GAP
  const subTopBeat = headTopBeat + (mobile ? HEAD_H_M : HEAD_H) + SUB_GAP

  const shiftX = useTransform(m, (v) => (sidebarW / 2) * v)
  const ringY = useTransform(m, (v) => (appGeo.ringTop - ringTopBeat) * v)
  const ringScale = useTransform(m, (v) => 1 - (1 - RING_SIZE / ringBeat) * v)
  const headY = useTransform(m, (v) => (appGeo.greetingTop - headTopBeat) * v)
  const subY = useTransform(m, (v) => (appGeo.captionTop - subTopBeat) * v)
  const scoreFade = useTransform(m, [0, 0.45], [1, 0])
  const haloOpacity = useTransform(m, [0.3, 0.8], [0, 1])
  // The words change in place once the elements have landed: a threshold plus
  // a short CSS dissolve, rather than two texts overlapping for half the morph.
  const swapped = mState > 0.72
  const swap = (visible: boolean): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transition: 'opacity 240ms ease',
  })

  const sidebarX = useTransform(m, [0.08, 0.62], [-sidebarW, 0], { clamp: true })
  const sidebarOpacity = useTransform(m, [0.12, 0.5], [0, 1], { clamp: true })
  // Phones: the tab bar rises from the bottom edge where the sidebar would slide in.
  const tabY = useTransform(m, [0.08, 0.62], [TABBAR_H, 0], { clamp: true })

  const appBgOpacity = useTransform(m, [0.05, 0.5], [0, 1], { clamp: true })
  const dotOpacity = useTransform(m, [0.05, 0.5], [1, 0], { clamp: true })
  const extrasOpacity = useTransform(m, [0.6, 0.92], [0, 1], { clamp: true })
  const extrasY = useTransform(m, [0.6, 0.92], [18, 0], { clamp: true })


  // Beat one fills with scroll (plan → do → share, staggered via ConcentricRings);
  // the morph then drains the completed rings to the app's day ring: pale
  // tracks with a short stub of progress each.
  const ringProgress =
    mState > 0 ? DAY_RING_PROGRESS.map((stub) => 1 - (1 - stub) * mState) : fill

  if (reduceMotion) {
    return (
      <section
        ref={sectionRef}
        className="relative w-full overflow-hidden bg-page py-16 max-md:min-h-0 min-h-[min(1000px,57.87vw)]"
      >
        <DotGrid className="inset-0" />
        <div className="relative flex flex-col items-center text-center">
          <div className="relative mt-[clamp(72px,15.05vw,260px)]" style={{ width: 204, height: 204 }}>
            <ConcentricRings
              size={204}
              progress={1}
              stagger={STAGGER}
              center={
                <span
                  className="text-ink"
                  style={{
                    fontFamily: 'var(--font-outfit)',
                    fontSize: '40px',
                    fontWeight: 600,
                    fontVariantNumeric: 'tabular-nums',
                    lineHeight: 1,
                  }}
                >
                  {SCORE}
                </span>
              }
            />
          </div>
          <h2 className={`t-rings text-ink mt-[clamp(20px,3.59vw,62px)] max-md:mt-10 max-md:max-w-[16ch] ${HEAD_M}`}>
            Say <span className="t-accent t-accent--soft">yes</span> to your productivity rings
          </h2>
          <p className={`t-label text-ink mt-[clamp(20px,1.62vw,28px)] text-center leading-[1.25] ${SUB_M}`}>
            Closing your rings is a simple daily ritual that will
            <br className="max-md:hidden" /> 10x your output
          </p>
        </div>
      </section>
    )
  }

  return (
    <section
      ref={sectionRef}
      id="rings-stage"
      className="relative h-[380vh] w-full bg-page"
      aria-label="Productivity rings"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Page → app surface */}
        <motion.div className="absolute inset-0" style={{ opacity: dotOpacity }}>
          <DotGrid className="inset-0" />
        </motion.div>
        <motion.div className="absolute inset-0 bg-white" style={{ opacity: appBgOpacity }} />
        <motion.div className="absolute inset-0" style={{ opacity: appBgOpacity }}>
          {/* Remounted as the transform begins, so the wash's own animation —
              it sinks, then the dot lattice surfaces and fades — plays for the
              user instead of on page load. */}
          <StageGlow key={mState > 0.04 ? 'wash' : 'idle'} />
        </motion.div>

        {/* The sidebar arrives, and the screen makes room for it */}
        {sidebarW > 0 && (
          <motion.div
            className="absolute top-0 left-0 h-full"
            style={{ width: SIDEBAR_W, x: sidebarX, opacity: sidebarOpacity }}
          >
            <AppSidebar />
          </motion.div>
        )}

        {mobile && (
          <motion.div
            className="absolute inset-x-0 bottom-0 z-10"
            style={{ y: tabY, opacity: sidebarOpacity }}
            aria-hidden
          >
            <AppTabBar />
          </motion.div>
        )}

        <AppExtras
          opacity={extrasOpacity}
          y={extrasY}
          sidebarW={sidebarW}
          mobile={mobile}
          layout={appGeo}
        />

        {/* Everything that transforms */}
        <motion.div className="absolute inset-0" style={{ x: shiftX }}>
          {/* Rings → the day ring */}
          <motion.div
            className="absolute left-1/2 flex justify-center"
            style={{ top: ringTopBeat, x: '-50%', y: ringY, scale: ringScale, transformOrigin: 'top center' }}
          >
            <div className="relative" style={{ width: ringBeat, height: ringBeat }}>
              <motion.span
                className="absolute rounded-full"
                style={{
                  inset: -12,
                  opacity: haloOpacity,
                  background:
                    'radial-gradient(closest-side, rgba(133,77,255,0.16), rgba(133,77,255,0))',
                }}
              />
              <ConcentricRings
                size={ringBeat}
                // Scaled by RING_SIZE/ringBeat at the end, so these land on
                // the app's own 6px stroke and 2px gap.
                strokeWidth={6 / (RING_SIZE / ringBeat)}
                gap={2 / (RING_SIZE / ringBeat)}
                progress={ringProgress}
                stagger={STAGGER}
                center={
                  <motion.span
                    className="text-ink"
                    style={{
                      opacity: scoreFade,
                      fontFamily: 'var(--font-outfit)',
                      fontSize: 40 * (ringBeat / RING_BEAT),
                      fontWeight: 600,
                      fontVariantNumeric: 'tabular-nums',
                      lineHeight: 1,
                    }}
                  >
                    {Math.round(Math.min(1, Math.max(0, fill)) * SCORE)}
                  </motion.span>
                }
              />
              <Confetti show={burst} />
            </div>
          </motion.div>

          {/* Headline → the app's greeting */}
          <motion.div
            className="absolute left-1/2 flex w-full max-w-[92vw] flex-col items-center text-center"
            style={{ top: headTopBeat, x: '-50%', y: headY, height: GREETING_H }}
          >
            <h2 className={`t-rings text-ink absolute inset-x-0 top-0 ${HEAD_M}`} style={swap(!swapped)}>
              Say <span className="t-accent t-accent--soft">yes</span> to your productivity rings
            </h2>
            <div className="absolute inset-x-0 top-0" style={swap(swapped)}>
              <AppGreeting />
            </div>
          </motion.div>

          {/* Sub-copy → the app's streak line */}
          <motion.div
            className="absolute left-1/2 flex w-full max-w-[92vw] flex-col items-center text-center"
            style={{ top: subTopBeat, x: '-50%', y: subY, height: CAPTION_H }}
          >
            <p className={`t-label text-ink absolute inset-x-0 top-0 ${SUB_M}`} style={swap(!swapped)}>
              Closing your rings is a simple daily ritual that will
              <br className="max-md:hidden" /> 10x your output
            </p>
            <div className="absolute inset-x-0 top-0" style={swap(swapped)}>
              <AppCaption />
            </div>
          </motion.div>
        </motion.div>

        <SignupPrompt progress={m} />
      </div>
    </section>
  )
}
