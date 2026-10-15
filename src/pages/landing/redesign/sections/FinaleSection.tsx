import { useRef, useState } from 'react'
import {

  easeInOut,
  easeOut,
  motion,
  useAnimationFrame,
  useMotionValueEvent,
  useSpring,
  useTransform
} from 'framer-motion'
import { Cyclist } from '../components/Cyclist'
import type {MotionValue} from 'framer-motion';
import { useMobile } from '@/contexts/MobileContext'
import kermitGif from '@/assets/gifs/kermit.gif'
import cinemaGif from '@/assets/gifs/cinema.gif'
import avatarSophia from '@/assets/new-design/avatar-sophia.png'
import avatarMarcus from '@/assets/new-design/avatar-marcus.png'
import avatarPriya from '@/assets/new-design/avatar-priya.png'
import avatarJordan from '@/assets/new-design/avatar-jordan.png'
import logoSrc from '@/assets/redesign/logo-white.png'
import checkSrc from '@/assets/check-logo.svg'
import sheetSrc from '@/assets/redesign/cyclist-sheet.webp'

/**
 * The closing beat, played on top of the (still pinned) statement text.
 * `progress` runs 0 → 1 over the finale's scroll:
 *   0.00 → 0.62  she rides right → left across the words; a white glow around
 *                her wipes the text out as she passes, and Kindred checks fly
 *                up off the bike and fade away, endlessly.
 *   0.62 → 1.00  she stops, a kudos pill pops, and a violet panel sweeps up as
 *                the hand-off out of the page.
 */

/** Finale timeline (0 → 1 of the pinned scroll):
 *  0 → STALL_AT   she rides in from the right, then runs out of steam
 *  STALL_AT → GO  stuck: the pedals barely turn while kudos fly in and hit her
 *  GO → RIDE_END  re-energised, she surges off the left edge
 *  RIDE_END →     the violet hand-off out of the page */
const STALL_AT = 0.34
const GO = 0.6
const RIDE_END = 0.78
/** Where she gets stuck, as vw from the left edge. */
const STALL_VW = 24

/** Cyclist box width and its vertical position — shared with the pill. */
const CYCLIST_W = 'clamp(260px, 24vw, 420px)'
/** `--text-gap` (set by the statement) is the distance from the viewport
 *  bottom up to the last line of text; the sprite's ground line sits ~15% of
 *  its width above its bottom edge, so lift by that to ride on the text. */
const CYCLIST_BOTTOM = `calc(var(--text-gap, 12vh) - ${CYCLIST_W} * 0.15)`

const CHECK_SIZE = 'clamp(24px, 3.4vw, 60px)'
const CHECK_HEIGHT = `calc(${CHECK_SIZE} * 0.8)`
/** Phones: the clamp floor reads as specks next to a rider that fills most of
 *  the screen, so the checks get a fixed, chunkier size. */
const CHECK_SIZE_MOBILE = 38

/** The glow's final geometry: the end state of what used to be animated every
 *  frame (width 140% → 900% of the cyclist box, blur 50 → 350px, spread
 *  20 → 220px). It's painted once at this size and grown with `scale` instead
 *  — a transform scales the painted result, so growing it costs no layout and
 *  no per-frame re-raster of a huge blurred shadow. */
const GLOW_SIZE = '900%'
const GLOW_BLUR = 350
const GLOW_SPREAD = 220

/* -------------------------------------------------------------------------- */
/*  Check trail — imperative pool, emitted by distance ridden                  */
/* -------------------------------------------------------------------------- */

const POOL = 30
const LIFE_MS = 1900
const LIFE_MS_MOBILE = 2300

type Slot = {
  born: number
  x: number
  y: number
  drift: number
  rise: number
  r0: number
  r1: number
  s: number
}

const cyclistWidth = () =>
  Math.min(420, Math.max(260, window.innerWidth * 0.24))
const lerp = (a: number, b: number, k: number) => a + (b - a) * k
const smooth = (k: number) => k * k * (3 - 2 * k)

/** Rider's left edge in px: enters off the right, stalls, then bolts off the left. */
const riderLeft = (p: number) => {
  const iw = window.innerWidth
  const W = cyclistWidth()
  const stall = (STALL_VW / 100) * iw
  if (p <= STALL_AT) return lerp(iw, stall, smooth(Math.max(0, p) / STALL_AT))
  if (p <= GO) return lerp(stall, stall - iw * 0.03, (p - STALL_AT) / (GO - STALL_AT))
  const k = Math.min(1, (p - GO) / (RIDE_END - GO))
  return lerp(stall - iw * 0.03, -W - 40, smooth(k))
}

function Trail({ progress }: { progress: MotionValue<number> }) {
  const { isMobile } = useMobile()
  const els = useRef<Array<HTMLImageElement | null>>([])
  const slots = useRef<Array<Slot>>(
    Array.from({ length: POOL }, () => ({
      born: -1, x: 0, y: 0, drift: 0, rise: 0, r0: 0, r1: 0, s: 1,
    })),
  )
  const next = useRef(0)
  const lastX = useRef<number | null>(null)
  const prevX = useRef(0)
  const lastEmit = useRef(0)
  const seed = useRef(1)
  const rnd = () => ((seed.current = (seed.current * 16807) % 2147483647) / 2147483647)
  // How many pool slots are currently showing (or fading out) a check. When
  // it's 0 and the ride isn't running there is nothing for this loop to do,
  // so it can bail before touching the DOM.
  const liveCount = useRef(0)

  useAnimationFrame((now) => {
    const p = progress.get()

    // The finale sits below the fold for most of the page, but this callback
    // runs every frame regardless — without this bail it writes 30 dead
    // slots' styles 60 times a second for the entire page lifetime. Any live
    // check keeps the loop running (including after the ride ends, while the
    // last checks fade out).
    const riding = p > 0 && p < RIDE_END + 0.005
    if (liveCount.current === 0 && !riding) {
      lastX.current = null
      return
    }

    const W = cyclistWidth()
    const x = riderLeft(p)
    const life = isMobile ? LIFE_MS_MOBILE : LIFE_MS

    if (riding) {
      if (lastX.current == null) {
        lastX.current = x
        prevX.current = x
        lastEmit.current = now
      }
      const dx = Math.abs(x - prevX.current)
      prevX.current = x
      // The slower she goes, the tighter the spacing — the trail thickens
      // exactly when she's labouring, and thins out when she's flying.
      const spacing = W * (isMobile ? 0.05 + 0.1 * Math.min(1, dx / 8) : 0.05 + 0.2 * Math.min(1, dx / 8))

      const emit = (anchorX: number) => {
        const s = slots.current[next.current]
        next.current = (next.current + 1) % POOL
        // Recycling a dead slot brings it back to life; recycling a live one
        // just moves it, so only the former counts.
        if (s.born < 0 || now - s.born >= life) liveCount.current++
        s.born = now
        // Off the back of the bike (she faces left, so behind = right).
        if (isMobile) {
          // Phones: a tight column streaming straight up off her back, so it
          // reads as one plume behind the rider rather than scattered debris.
          s.x = anchorX + W * (0.58 + rnd() * 0.14)
          s.y = W * (0.32 + rnd() * 0.12)
          s.rise = window.innerHeight * (0.38 + rnd() * 0.16)
          s.drift = W * (0.02 + rnd() * 0.16)
          s.r0 = -14 + rnd() * 10
          s.r1 = -4 + rnd() * 14
          s.s = 0.8 + rnd() * 0.35
        } else {
          s.x = anchorX + W * (0.62 + rnd() * 0.14)
          s.y = W * (0.28 + rnd() * 0.18)
          s.rise = window.innerHeight * (0.3 + rnd() * 0.3)
          s.drift = W * (0.1 + rnd() * 0.5)
          s.r0 = -35 + rnd() * 20
          s.r1 = 5 + rnd() * 40
          s.s = 0.55 + rnd() * 0.9
        }
        lastEmit.current = now
      }

      let guard = 0
      while (Math.abs(x - lastX.current) > spacing && guard++ < 4) {
        lastX.current += Math.sign(x - lastX.current) * spacing
        emit(lastX.current)
      }

      // Nearly stopped: no distance is being covered, so fall back to a rate.
      if (dx < 0.4 && now - lastEmit.current > (isMobile ? 220 : 160)) {
        lastX.current = x
        emit(x)
      }
    } else {
      lastX.current = null
    }

    // No slot can come alive inside the loop itself, so when everything is
    // dead already (each was zeroed the frame it expired) the writes can be
    // skipped entirely.
    if (liveCount.current === 0) return

    for (let i = 0; i < POOL; i++) {
      const el = els.current[i]
      const s = slots.current[i]
      if (!el) continue
      if (s.born < 0) {
        el.style.opacity = '0'
        continue
      }
      const age = (now - s.born) / life
      if (age >= 1) {
        // Mark the slot dead so it's only counted once.
        s.born = -1
        liveCount.current--
        el.style.opacity = '0'
        continue
      }
      const e = 1 - (1 - age) * (1 - age) * (1 - age)
      const fade = Math.min(1, age / 0.1) * (1 - Math.max(0, (age - 0.3) / 0.7))
      const pop = age < 0.12 ? 0.3 + 0.7 * (age / 0.12) * 1.15 : 1
      el.style.opacity = String(Math.max(0, fade))
      el.style.transform = `translate3d(${s.x + s.drift * e}px, ${
        -(s.y + s.rise * e)
      }px, 0) rotate(${s.r0 + (s.r1 - s.r0) * e}deg) scale(${s.s * pop})`
    }
  })

  return (
    <>
      {Array.from({ length: POOL }, (_, i) => (
        <img
          key={i}
          ref={(el) => {
            els.current[i] = el
          }}
          src={checkSrc}
          alt=""
          aria-hidden
          draggable={false}
          className="pointer-events-none absolute left-0 max-w-none will-change-transform"
          style={{
            bottom: CYCLIST_BOTTOM,
            width: isMobile ? CHECK_SIZE_MOBILE : CHECK_SIZE,
            height: isMobile ? CHECK_SIZE_MOBILE * 0.8 : CHECK_HEIGHT,
            opacity: 0,
          }}
        />
      ))}
    </>
  )
}

/* -------------------------------------------------------------------------- */
/*  Kudos                                                                      */
/* -------------------------------------------------------------------------- */

/** Pedal progress: steady on the way in, a crawl while stuck, a sprint to finish. */
const PEDAL_AT = [0, STALL_AT, GO, RIDE_END]
const PEDAL_TO = [0, 0.42, 0.5, 1]

type KudosItem = {
  name: string
  avatar: string
  message?: string
  gif?: string
  from: [number, number]
}

/** Each lands on the rider from close by, a beat apart. */
const KUDOS: Array<KudosItem> = [
  { name: 'Sophia', avatar: avatarSophia, message: 'LETS GOOOOO', from: [12, -12] },
  { name: 'Marcus', avatar: avatarMarcus, gif: kermitGif, from: [14, -4] },
  { name: 'Priya', avatar: avatarPriya, message: 'holy consistency', from: [10, -16] },
  { name: 'Jordan', avatar: avatarJordan, gif: cinemaGif, from: [15, -8] },
]
const HITS = KUDOS.map((_, i) => 0.385 + 0.06 * i)

/** A kudos as it appears in the Kindred app's stage card: "Cheered you on"
 *  caption, sender avatar + name, then the message (or GIF). */
function KudosToast({
  progress,
  index,
  mobile,
}: {
  progress: MotionValue<number>
  index: number
  /** Phones: centred, full-width cards that drop in from above the screen on
   *  the Y axis only. Fixed per mount (the stage keys on it). */
  mobile: boolean
}) {
  const { name, avatar, message, gif, from } = KUDOS[index]
  const hit = HITS[index]
  const start = hit - 0.05
  // Both kudos GIFs (674 KB of animation) used to sit in the DOM from first
  // paint — opacity 0, but still decoded and stepped by the engine — hundreds
  // of vh before their beat. So the card only exists while the beat is within
  // reach: progress inside [start - 0.02, hit + 0.06]. Outside that window the
  // card is fully transparent anyway, so nothing visible changes; the state
  // only flips at the window's edges, never per frame.
  const inBeat = (v: number) => v >= start - 0.02 && v <= hit + 0.06
  const [active, setActive] = useState(() => inBeat(progress.get()))
  useMotionValueEvent(progress, 'change', (v) => {
    setActive((prev) => {
      const next = inBeat(v)
      return prev === next ? prev : next
    })
  })
  const x = useTransform(progress, [start, hit], [mobile ? '0vw' : `${from[0]}vw`, '0vw'], {
    clamp: true,
    ease: easeInOut,
  })
  const y = useTransform(progress, [start, hit], [mobile ? '-100vh' : `${from[1]}vh`, '0vh'], {
    clamp: true,
    ease: easeInOut,
  })
  const scale = useTransform(
    progress,
    [start, start + 0.015, hit - 0.008, hit + 0.02],
    [0.6, 1, 1, 0.3],
    { clamp: true },
  )
  const opacity = useTransform(
    progress,
    [start, start + 0.012, hit, hit + 0.02],
    [0, 1, 1, 0],
    { clamp: true },
  )
  const rotate = useTransform(progress, [start, hit], [mobile ? 0 : index % 2 ? 5 : -5, 0], {
    clamp: true,
  })
  // The hit: a violet ring ripples out from the rider.
  const ring = useTransform(progress, [hit, hit + 0.05], [0.3, 1.8], { clamp: true })
  const ringOpacity = useTransform(progress, [hit, hit + 0.008, hit + 0.05], [0, 0.55, 0])

  // Invisible outside the beat, so not rendering it at all changes nothing —
  // and keeps the GIF undecoded until the toast is on its way in.
  if (!active) return null

  return (
    <>
      <motion.span
        className="absolute -left-24 -top-24 h-48 w-48 rounded-full border-2 border-violet"
        style={{ scale: ring, opacity: ringOpacity }}
      />
      <motion.div
        // Phones: the card lands just above her head rather than over it.
        className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 max-md:-translate-y-full"
        style={{ x, y, scale, opacity, rotate }}
      >
        <div className="flex w-[300px] flex-col gap-3 rounded-2xl bg-white p-4 font-outfit shadow-[0_1px_2px_rgba(0,0,0,0.03),0_12px_40px_-16px_rgba(0,0,0,0.22)] ring-1 ring-black/5 max-md:w-[min(calc(100vw-48px),340px)] max-md:rounded-[20px] max-md:p-5 max-md:shadow-[0_2px_4px_rgba(0,0,0,0.04),0_20px_50px_-12px_rgba(0,0,0,0.28)]">
          <div className="text-[13px] font-light text-ink/55 max-md:text-[14px]">
            Cheered you on · just now
          </div>
          <div className="flex items-start gap-3">
            <img
              src={avatar}
              alt=""
              draggable={false}
              className="size-10 shrink-0 rounded-full object-cover max-md:size-11"
            />
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[17px] font-medium leading-tight text-ink max-md:text-[18px]">
                  {name}
                </span>
              </div>
              {gif ? (
                <img
                  src={gif}
                  alt=""
                  draggable={false}
                  className="h-24 w-auto self-start rounded-xl object-cover max-md:h-32"
                />
              ) : (
                <span className="text-[15px] font-light leading-snug text-ink max-md:text-[17px]">
                  {message}
                </span>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}

/* -------------------------------------------------------------------------- */
/*  Stage                                                                      */
/* -------------------------------------------------------------------------- */

export function FinaleStage({ progress }: { progress: MotionValue<number> }) {
  const { isMobile } = useMobile()
  const ride = useTransform(progress, PEDAL_AT, PEDAL_TO, { clamp: true })
  const x = useTransform(progress, riderLeft)
  // Straining in the stall: a slow rock back and forth, easing off once
  // she's back up to speed.
  const rock = useTransform(progress, (p) =>
    p > STALL_AT && p < GO
      ? Math.sin(p * 190) * 2.2 * Math.min(1, (GO - p) / 0.03)
      : 0,
  )

  // The glow swells with the whole ride: tight at first, wiping a wide swath
  // of words by the time she exits. Painted at its final size and shadow
  // once (see GLOW_SIZE above), then grown by `scale` from 140/900 → 1 over
  // the same range and easing the old `width` animation used — a transform
  // scales the painted result (gradient and blur alike) without laying out
  // or re-rasterising a viewport-covering shadow every scroll frame.
  // The shadow rides on its own layer purely so its opacity can still track
  // the old 0.75 → 0.95 ramp: a transform scales colour, not alpha.
  const glowK = useTransform(progress, [0, RIDE_END], [0, 1], { clamp: true })
  const glowScale = useTransform(glowK, [0, 1], [140 / 900, 1])
  const glowShadowOpacity = useTransform(glowK, (k) => 0.75 + 0.2 * k)

  const stageOpacity = useTransform(progress, [0, 0.01, 0.88, 0.96], [0, 1, 1, 0])
  const panelScale = useTransform(progress, [0.86, 1], [0, 1], { clamp: true })
  // The logo surfaces once the wipe has mostly covered the screen.
  const logoOpacity = useTransform(progress, [0.94, 0.99], [0, 1], { clamp: true })
  const logoScale = useTransform(progress, [0.94, 1], [0.85, 1], { clamp: true })

  // Kudos converge on the rider's chest where she stalls.
  // On phones they're centred on the screen instead, so the wide cards fit.
  const anchor = {
    left: isMobile ? '50%' : `calc(${STALL_VW}vw + ${CYCLIST_W} * 0.62)`,
    bottom: `calc(${CYCLIST_BOTTOM} + ${CYCLIST_W} * 0.82)`,
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden" aria-hidden>
      {/* Warm the sprite decode while the page is idle: the sheet is
          620 KB / 3840×2400, and left lazy it decodes at paint time — a
          one-off hitch exactly when the ride starts. Same file, 1px, never
          visible. */}
      <img
        src={sheetSrc}
        alt=""
        aria-hidden
        draggable={false}
        className="pointer-events-none absolute left-0 top-0 h-px w-px opacity-0"
      />
      <motion.div className="absolute inset-0" style={{ opacity: stageOpacity }}>
        {/* Rider on a soft white glow that wipes the words out as she passes. */}
        <motion.div
          className="absolute left-0"
          style={{ bottom: CYCLIST_BOTTOM, width: CYCLIST_W, x }}
        >
          {/* Shadow layer first, so it sits behind the gradient as it did
              when both lived on one element. Centring is in the motion style
              (x/y) because an inline transform would override — or, with
              Tailwind v4's `translate` property, double up on — the old
              -translate-1/2 classes. */}
          <motion.div
            className="absolute left-1/2 top-1/2 aspect-square rounded-full"
            style={{
              width: GLOW_SIZE,
              x: '-50%',
              y: '-50%',
              scale: glowScale,
              boxShadow: `0 0 ${GLOW_BLUR}px ${GLOW_SPREAD}px #fff`,
              opacity: glowShadowOpacity,
              willChange: 'transform, opacity',
            }}
          />
          <motion.div
            className="absolute left-1/2 top-1/2 aspect-square rounded-full"
            style={{
              width: GLOW_SIZE,
              x: '-50%',
              y: '-50%',
              scale: glowScale,
              background:
                'radial-gradient(closest-side, #fff 0%, #fff 60%, rgba(255,255,255,0.85) 74%, rgba(255,255,255,0) 100%)',
              willChange: 'transform',
            }}
          />
          <motion.div style={{ rotate: rock, transformOrigin: '50% 90%' }}>
            <Cyclist ride={ride} className="relative w-full" />
          </motion.div>
        </motion.div>

        {/* After the rider in the DOM, so the checks sit over the glow. */}
        <Trail progress={progress} />

        <div key={isMobile ? 'm' : 'd'} className="absolute" style={anchor}>
          {KUDOS.map((_, i) => (
            <KudosToast key={i} progress={progress} index={i} mobile={isMobile} />
          ))}
        </div>
      </motion.div>

      {/* Hand-off out of the page. */}
      <motion.div
        className="absolute inset-0 bg-violet"
        style={{ scaleY: panelScale, transformOrigin: 'bottom' }}
      />
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ opacity: logoOpacity, scale: logoScale }}
      >
        {/* The app's own white mark (splash-icon-dark). */}
        <img
          src={logoSrc}
          alt=""
          draggable={false}
          className="size-[clamp(64px,8vw,130px)]"
        />
      </motion.div>
    </div>
  )
}
