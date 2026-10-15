import { useEffect, useRef, useState } from 'react'
import { motion, motionValue, useReducedMotion, useTransform } from 'framer-motion'
import { FinaleStage } from './FinaleSection'
import { cn } from '@/lib/utils'

/**
 * The cryptic statement — Figma frames 8748:6 → 8755:304 → 8760:361.
 *
 * The carrier text is (almost) the same across all three frames; what changes
 * is WHICH words are emphasised. Read just the emphasised words in order and
 * you get the actual argument:
 *
 *   "Productivity is broken and our approach is flawed. They're overwhelming,
 *    hard to maintain. So I stopped using them. Each tool just makes me feel
 *    shame for even missing one day."
 *
 * So the section is a scroll-driven dialogue: the key words light up violet one
 * at a time, and when a frame's set is exhausted the copy cross-fades to the
 * next frame's set. The three frames differ only in emphasis, which is why the
 * hand-off reads as the sentence re-forming rather than the text being swapped.
 *
 * LINE COUNT: the frames carry 8 / 10 / 12 emphasised words, so at the full
 * 1728 canvas they wrap to 11 / 12 / 12 lines and the block jumps on hand-off.
 * Measured in Chrome, all three settle on exactly 12 lines when the paragraph
 * is 1640–1720px wide, so the measure is capped at 1680px (see MEASURE_WIDTH).
 */

/** Emphasis weight as authored in Figma: m = Medium 500, r = Regular 400, b = Bold 700. */
type KeyWeight = 'm' | 'r' | 'b'
type Part = { t: string; w?: KeyWeight }

const FRAMES: Part[][] = [
  // ── Frame 1 (8748:6) — "Productivity is broken and our approach is flawed."
  [
    { t: 'the speed of dark? half of 0? Nothing. SOME SHIT. WORDS. The essence of an empty door. ' },
    { t: 'Productivity', w: 'm' },
    { t: ' The clock swallowed its hands. Who noticed? A name without a mouth. ' },
    { t: 'Is', w: 'm' },
    { t: '. A key without a room. Yesterday arrives disguised as tomorrow. Count ' },
    { t: 'Broken', w: 'r' },
    { t: ' the silence. ' },
    { t: 'And', w: 'r' },
    { t: '. The seventh echo is yours.The mirror remembers what you ' },
    { t: 'Our', w: 'r' },
    { t: ' never were.  ' },
    { t: 'Approach.', w: 'r' },
    { t: ' Under the floor, a sun rehearses its absence. ' },
    { t: 'Is', w: 'm' },
    { t: '. Do not wake . ' },
    { t: 'Flawed', w: 'm' },
    { t: '.', w: 'b' },
    {
      t: ' the answer. It dreams in reverse. At the end of nothing, someone knocks twice. an then another sentence to finish IT',
    },
  ],
  // ── Frame 2 (8755:304) — "They're overwhelming, hard to maintain. So I stopped using them."
  [
    { t: 'the speed of dark? half of 0? Nothing. SOME SHIT. WORDS. The essence of an empty door. ' },
    { t: 'THEYRE', w: 'm' },
    { t: ' The clock swallowed its hands. Who noticed? A name without a mouth. ' },
    { t: 'OVERWHELMING,', w: 'm' },
    { t: '. A key without a room. Yesterday arrives disguised as tomorrow. Count the silence. ' },
    { t: 'HARD TO MAINTAIN', w: 'm' },
    { t: '. The seventh echo is yours.The mirror remembers what you ' },
    { t: 'SO I', w: 'm' },
    { t: ' never were' },
    { t: '.', w: 'r' },
    { t: ' Under the floor, a sun rehearses its absence. ' },
    { t: 'STOPPED', w: 'm' },
    { t: '. Do not wake . ' },
    { t: 'USING THEM', w: 'm' },
    { t: '.', w: 'b' },
    {
      t: ' the answer. It dreams in reverse. At the end of nothing, someone knocks twice. an then another sentence to finish IT',
    },
  ],
  // ── Frame 3 (8760:361) — "Each tool just makes me feel shame for even missing one day."
  [
    { t: 'the speed of dark? half of 0? Nothing. SOME SHIT. WORDS. The essence of an empty door. ' },
    { t: 'EACH', w: 'm' },
    { t: ' The clock swallowed its hands. Who noticed? A name without a mouth. ' },
    { t: 'TOOL', w: 'm' },
    { t: '. A key without a room. Yesterday arrives disguised as tomorrow. Count ' },
    { t: 'JUST', w: 'r' },
    { t: ' the silence. ' },
    { t: 'MAKES ME', w: 'r' },
    { t: '. The seventh echo is yours.The mirror remembers what you ' },
    { t: 'FEEL', w: 'r' },
    { t: ' never were.  ' },
    { t: 'SHAME.', w: 'r' },
    { t: ' Under the floor, a sun rehearses its absence. ' },
    { t: 'FOR EVEN MISSING', w: 'm' },
    { t: '. Do not wake . ' },
    { t: 'ONE DAY', w: 'm' },
    { t: '.', w: 'b' },
    {
      t: ' the answer. It dreams in reverse. At the end of nothing, someone knocks twice. an then another sentence to finish IT',
    },
  ],
]

/** Index of each key part within its frame, in reading order. */
const KEY_ORDER: number[][] = FRAMES.map((parts) =>
  parts.reduce<number[]>((acc, part, i) => (part.w ? [...acc, i] : acc), []),
)

/** Width that lands every frame on the same line count (measured, see header). */
const MEASURE_WIDTH = 'min(1680px, 97.3vw)'
const VH_PER_FRAME = 120
/** Extra pinned scroll after the words: the cyclist's ride + kudos + hand-off. */
const FINALE_VH = 460

export function StatementSection() {
  const ref = useRef<HTMLElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const finale = useRef(motionValue(0)).current
  // The words dim as she rides and are gone by the time she exits.
  const textOpacity = useTransform(finale, [0, 0.34, 0.76], [1, 0.45, 0])

  // `frame` is which copy is showing; `lit` is how many of its key words have
  // turned violet. Only these two numbers re-render, not the scroll position.
  const [phase, setPhase] = useState({ frame: 0, lit: 0 })

  // Measured straight off the section's rect rather than through
  // framer-motion's `useScroll({ target })` — Lenis drives native window
  // scroll, so a plain scroll listener is both simpler and dependable here.
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const measure = () => {
      const rect = el.getBoundingClientRect()
      const scrolled = Math.max(0, -rect.top)
      const wordsPx = ((FRAMES.length * VH_PER_FRAME - 100) * window.innerHeight) / 100
      const finalePx = (FINALE_VH * window.innerHeight) / 100
      const p = Math.min(1, scrolled / wordsPx)
      finale.set(Math.min(1, Math.max(0, (scrolled - wordsPx) / finalePx)))

      const total = FRAMES.length
      const clamped = Math.min(0.9999, p)
      const frame = Math.floor(clamped * total)
      const local = clamped * total - frame
      const keys = KEY_ORDER[frame].length
      // Spread the keys across the frame's scroll segment and land the last
      // one just before the hand-off, so each sentence finishes before it
      // re-forms into the next.
      const lit = Math.min(keys, Math.floor(local * (keys + 0.85)))
      setPhase((prev) => (prev.frame === frame && prev.lit === lit ? prev : { frame, lit }))
    }

    // Scroll events are already throttled to one per frame by the browser, so
    // measure inline rather than deferring through requestAnimationFrame.
    measure()
    window.addEventListener('scroll', measure, { passive: true })
    window.addEventListener('resize', measure, { passive: true })
    return () => {
      window.removeEventListener('scroll', measure)
      window.removeEventListener('resize', measure)
    }
  }, [finale])

  // Tell the finale where the last line of text ends so the cyclist rides
  // along it: distance from the viewport bottom up to the text's bottom edge.
  useEffect(() => {
    const sticky = stickyRef.current
    const text = textRef.current
    if (!sticky || !text) return
    const place = () => {
      const gap = sticky.getBoundingClientRect().bottom - text.getBoundingClientRect().bottom
      sticky.style.setProperty('--text-gap', `${Math.max(0, gap)}px`)
    }
    place()
    const ro = new ResizeObserver(place)
    ro.observe(text)
    window.addEventListener('resize', place)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', place)
    }
  }, [])

  const finalFrame = FRAMES.length - 1

  return (
    <section
      ref={ref}
      className="relative mx-auto w-full max-w-[1728px]"
      style={{ height: reduceMotion ? undefined : `${FRAMES.length * VH_PER_FRAME + FINALE_VH}vh` }}
    >
      {/* The dialogue, for anyone not seeing the animation. */}
      <p className="sr-only">
        Productivity is broken and our approach is flawed. They&rsquo;re overwhelming, hard to
        maintain. So I stopped using them. Each tool just makes me feel shame for even missing one
        day.
      </p>

      <div
        ref={stickyRef}
        data-frame={phase.frame}
        data-lit={phase.lit}
        className={cn(
          'flex items-center overflow-hidden',
          // Clear the floating nav pill, which sits ~122px down.
          'pt-[clamp(72px,7.1vw,122px)]',
          reduceMotion ? 'py-24' : 'sticky top-0 h-screen',
        )}
      >
        <motion.div
          ref={textRef}
          className="mx-auto grid w-full"
          style={{ maxWidth: MEASURE_WIDTH, opacity: reduceMotion ? 1 : textOpacity }}
          aria-hidden="true"
        >
          {FRAMES.map((parts, frameIndex) => {
            const isActive = reduceMotion ? frameIndex === finalFrame : frameIndex === phase.frame
            const litCount = reduceMotion ? KEY_ORDER[frameIndex].length : phase.lit
            const keyPosition = new Map(
              KEY_ORDER[frameIndex].map((partIndex, order) => [partIndex, order]),
            )

            return (
              <p
                key={frameIndex}
                className={cn(
                  't-statement col-start-1 row-start-1 w-full text-ink',
                  'transition-[opacity,transform] duration-[520ms] ease-[cubic-bezier(0.22,1,0.36,1)]',
                  isActive ? 'opacity-100' : 'pointer-events-none translate-y-2 opacity-0',
                )}
              >
                {parts.map((part, partIndex) => {
                  if (!part.w) return <span key={partIndex}>{part.t}</span>
                  const order = keyPosition.get(partIndex) ?? 0
                  return (
                    <span
                      key={partIndex}
                      data-w={part.w}
                      className={cn('t-key', order < litCount && 'is-on')}
                    >
                      {part.t}
                    </span>
                  )
                })}
              </p>
            )
          })}
        </motion.div>
        {!reduceMotion && <FinaleStage progress={finale} />}
      </div>
    </section>
  )
}
