import { Fragment, memo, useEffect, useRef, useState } from 'react'
import { motion, motionValue, useReducedMotion, useTransform } from 'framer-motion'
import { NOTE_SUMMARY, NotesStack } from '../components/NotesStack'
import { FinaleStage } from './FinaleSection'
import type { Anchor } from '../components/NotesStack'
import { cn } from '@/lib/utils'

/**
 * The cryptic statement — Figma frames 8748:6 → 8755:304 → 8760:361.
 *
 * One continuous run of opaque filler ("the carrier") never changes; what
 * changes is the emphasised phrase in each of its four slots. Read just the
 * emphasised words in order and you get the argument:
 *
 *   "Productivity takes steady effort, yet most of us rely on bursts of
 *    willpower. Your tools fix your organization, not your motivation, and
 *    shame you when the burst fades. That's why you stopped opening them.
 *    Nothing changed."
 *
 * The section is a scroll-driven dialogue: phase → morph → phase → morph →
 * phase. In a phase the words light up violet one at a time; in a morph each
 * slot scrambles into flickering glyphs and resolves into the next frame's
 * phrase, slot after slot down the block (see `cipher`). Nothing fades and the
 * carrier never moves: every slot holds all three of its phrases stacked in one
 * grid cell (see .t-slot), so it is as wide as the widest of them and the line
 * breaks stay put whichever phrase is showing.
 *
 * LINE COUNT: measured in Chrome at the 1680px measure (see MEASURE_WIDTH), the
 * block holds 12 lines.
 *
 * BEATS: between the second and third frames the tools answer back — the
 * notifications burst out of "shame you when the burst fades" over the dimmed
 * text, hold, and are pulled back into it before the argument resolves. See
 * BEATS for the choreography.
 */

/** Emphasis weight as authored in Figma: m = Medium, r = Regular, b = Bold. */
type KeyWeight = 'm' | 'r' | 'b'
type Phrase = { t: string; w: KeyWeight }

/**
 * The carrier: one continuous run of opaque filler. The slots are woven into it
 * at even intervals, so the eye meets a violet phrase every couple of lines
 * instead of hunting for one across the block.
 */
const CARRIER =
  'the speed of dark? half of 0? Nothing. SOME SHIT. WORDS. The essence of an empty door. ' +
  'The clock swallowed its hands. Who noticed? A name without a mouth. A key without a room. ' +
  'Yesterday arrives disguised as tomorrow. Count the silence. The seventh echo is yours. ' +
  'The mirror remembers what you never were. Under the floor, a sun rehearses its absence. ' +
  'Do not wake. The answer. It dreams in reverse. At the end of nothing, someone knocks twice.'

/** Split `text` into `count` near-equal runs, cutting only at word boundaries. */
function carrierRuns(text: string, count: number): Array<string> {
  const runs: Array<string> = []
  let start = 0
  for (let i = 1; i < count; i++) {
    const target = Math.round((text.length * i) / count)
    const next = text.indexOf(' ', target)
    const prev = text.lastIndexOf(' ', target)
    let cut = prev === -1 ? next : next === -1 ? prev : target - prev <= next - target ? prev : next
    if (cut <= start) cut = next
    runs.push(text.slice(start, cut))
    start = cut + 1
  }
  runs.push(text.slice(start))
  return runs
}

/**
 * Three frames, one argument, one phrase per slot. Each phrase lights up in
 * turn; read in order they spell that frame's line. The grouping follows
 * clause structure.
 */
const FRAMES: Array<Array<Phrase>> = [
  // ── Frame 1 (8748:6) — "Productivity takes steady effort, yet most of us rely on bursts of willpower."
  [
    { t: 'Productivity', w: 'm' },
    { t: 'takes steady effort,', w: 'r' },
    { t: 'yet most of us', w: 'r' },
    { t: 'rely on bursts of willpower.', w: 'm' },
  ],
  // ── Frame 2 (8755:304) — "Your tools fix your organization, not your motivation, and shame you when the burst fades."
  [
    { t: 'Your tools', w: 'm' },
    { t: 'fix your organization,', w: 'r' },
    { t: 'not your motivation,', w: 'r' },
    { t: 'and shame you when the burst fades.', w: 'm' },
  ],
  // ── Frame 3 (8760:361) — "That's why you stopped opening them. Nothing changed."
  [
    { t: 'That’s why', w: 'm' },
    { t: 'you stopped', w: 'r' },
    { t: 'opening them.', w: 'r' },
    { t: 'Nothing changed.', w: 'm' },
  ],
]
const SLOTS = FRAMES[0].length

/** The carrier, cut so slot i sits after run i. */
const RUNS = carrierRuns(CARRIER, SLOTS + 1)

/** The phrase the notifications burst out of: "and shame you when the burst fades." */
const ANCHOR = { frame: 1, slot: 3 }

/** Reading order of every emphasised word, as ORDER[frame][slot][word]. */
const ORDER: Array<Array<Array<number>>> = FRAMES.map((phrases) => {
  let n = 0
  return phrases.map((phrase) => phrase.t.split(' ').map(() => n++))
})
const WORD_COUNT = ORDER.map((slots) => slots.flat().length)

/** Width that holds the block at 12 lines (measured, see header). */
const MEASURE_WIDTH = 'min(1680px, 97.3vw)'

/**
 * The pinned phase, in vh of scroll. Phases hold a frame while its words light
 * up; a morph carries one frame's phrases into the next; between the second and
 * third the notifications pile up — the tools' reply — before the argument
 * resolves.
 */
type Beat =
  | { kind: 'frame'; frame: number; vh: number }
  | { kind: 'morph'; from: number; to: number; vh: number }
  | { kind: 'notes'; vh: number }

const BEATS: Array<Beat> = [
  { kind: 'frame', frame: 0, vh: 90 },
  { kind: 'morph', from: 0, to: 1, vh: 70 },
  { kind: 'frame', frame: 1, vh: 90 },
  { kind: 'notes', vh: 200 },
  { kind: 'morph', from: 1, to: 2, vh: 70 },
  { kind: 'frame', frame: 2, vh: 90 },
]
const WORDS_VH = BEATS.reduce((sum, beat) => sum + beat.vh, 0)
/** Frame on screen during each beat — the notes beat holds the second frame up,
 *  dimmed, behind the stack, and a morph counts as the frame it leaves. */
const BEAT_FRAME = (() => {
  let last = 0
  return BEATS.map((beat) => {
    if (beat.kind === 'frame') last = beat.frame
    return last
  })
})()

/** Extra pinned scroll after the words: the cyclist's ride + kudos + hand-off. */
const FINALE_VH = 460

/** Within a morph, slot s scrambles over [s * STAGGER, s * STAGGER + SLOT_MORPH]
 *  of the beat — out of the old phrase for the first half, into the new one for
 *  the second — so the change runs down the block rather than all at once. */
const STAGGER = 0.14
const SLOT_MORPH = 1 - STAGGER * (SLOTS - 1)
/** The first frame decrypts as the section pins, over this much of its beat. */
const INTRO = 0.16
/** Width of the flickering front, in characters. */
const BAND = 6
/** Scroll (px) per re-roll of the flickering glyphs; settled noise re-rolls at a
 *  quarter of the rate. */
const FLICKER_PX = 10

// Outfit has no box-drawing or shade glyphs, so the noise sticks to ASCII.
const GLYPHS = '<>/\\|=+*#%&$01XZKQ'
/** The text dims to this behind the notifications. */
const NOTES_DIM = 0.88

const span = (t: number, a: number, b: number) => Math.min(1, Math.max(0, (t - a) / (b - a)))
const ease = (t: number) => t * t * (3 - 2 * t)
/** Stable pseudo-random integer per character (and per flicker tick). */
const shade = (i: number, salt = 0) =>
  (Math.imul(i + 1, 2654435761) ^ Math.imul(salt + 1, 40503)) >>> 0

/**
 * A word as per-character spans, so the cipher can paint over each one.
 * Memoised because the text never changes: the spans are built once, not on
 * every lit word.
 */
const Glyphs = memo(function Glyphs({ text }: { text: string }) {
  return (
    <>
      {text.split('').map((ch, i) => (
        <span key={i} className="t-char">
          {ch}
        </span>
      ))}
    </>
  )
})

/**
 * Run the cipher across one phrase. `front` (0 → 1) is how far the wave has
 * swept from its first character; `sealing` says which side of it ends up
 * scrambled — behind the front when a phrase encrypts, ahead of it when one
 * decrypts. The band at the front flickers fast; settled noise churns slowly.
 * Driven straight off the scroll rather than through React, so the spans never
 * re-render, and a character is only touched when its state changes.
 */
function cipher(chars: Array<HTMLElement>, front: number, sealing: boolean, tick: number) {
  const at = -BAND + front * (chars.length + BAND)
  for (let i = 0; i < chars.length; i++) {
    const el = chars[i]
    const hot = i >= at && i < at + BAND
    const sealed = !hot && i < at === sealing
    const state =
      hot || sealed ? GLYPHS[shade(i, hot ? tick : tick >> 2) % GLYPHS.length] : ''
    if (el.dataset.g === state) continue
    el.dataset.g = state
    el.classList.toggle('is-cipher', state !== '')
    el.classList.toggle('is-hot', hot)
  }
}

export function StatementSection() {
  const ref = useRef<HTMLElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const finale = useRef(motionValue(0)).current
  const notes = useRef(motionValue(0)).current
  // Where "shame you when the burst fades" sits in the pinned area, for the
  // notifications to burst out of.
  const anchor = useRef(motionValue<Anchor>({ x: 0, y: 0, w: 0, h: 0 })).current
  // The text fades out for good as she rides across it.
  const textOpacity = useTransform(finale, [0, 0.34, 0.76], [1, 0.45, 0])

  // `frame` is which copy is showing; `lit` is how many of its key words have
  // turned violet. Only these two numbers re-render, not the scroll position.
  const [phase, setPhase] = useState({ frame: 0, lit: 0 })

  // Measured straight off the section's rect rather than through
  // framer-motion's `useScroll({ target })` — Lenis drives native window
  // scroll, so a plain scroll listener is both simpler and dependable here.
  useEffect(() => {
    const el = ref.current
    const text = textRef.current
    if (!el || !text) return

    // Each slot's layers (one per frame), and each layer's characters.
    const layers = Array.from(text.querySelectorAll('.t-slot'), (slot) =>
      Array.from(slot.children as HTMLCollectionOf<HTMLElement>),
    )
    const chars = layers.map((slot) =>
      slot.map((node) => Array.from(node.querySelectorAll<HTMLElement>('.t-char'))),
    )
    const show = (slot: number, frame: number) =>
      layers[slot].forEach((node, f) => {
        node.style.visibility = f === frame ? 'visible' : 'hidden'
      })

    const measure = () => {
      const rect = el.getBoundingClientRect()
      const scrolled = Math.max(0, -rect.top)
      const wordsPx = (WORDS_VH * window.innerHeight) / 100
      const finalePx = (FINALE_VH * window.innerHeight) / 100
      const p = Math.min(1, scrolled / wordsPx)
      finale.set(Math.min(1, Math.max(0, (scrolled - wordsPx) / finalePx)))

      // Which beat are we in, and how far through it?
      let acc = 0
      let index = BEATS.length - 1
      let local = 1
      for (let i = 0; i < BEATS.length; i++) {
        const frac = BEATS[i].vh / WORDS_VH
        if (i === BEATS.length - 1 || p < acc + frac) {
          index = i
          local = Math.min(1, Math.max(0, (p - acc) / frac))
          break
        }
        acc += frac
      }

      // Spread the words across a frame's beat and land the last one just before
      // the morph, so each sentence finishes before it re-forms into the next.
      const beat = BEATS[index]
      const frame = BEAT_FRAME[index]
      const words = WORD_COUNT[frame]
      const lit = beat.kind === 'frame' ? Math.min(words, Math.floor(local * (words + 0.85))) : words
      notes.set(beat.kind === 'notes' ? local : 0)
      setPhase((prev) => (prev.frame === frame && prev.lit === lit ? prev : { frame, lit }))

      if (reduceMotion) return

      // Behind the notifications everything dims but the phrase they burst out
      // of, which turns alarm red (see .t-slot.is-alarm).
      const notesOn = beat.kind === 'notes' ? Math.min(span(local, 0, 0.08), 1 - span(local, 0.9, 1)) : 0
      text.style.setProperty('--dim', `${NOTES_DIM * notesOn}`)
      layers[ANCHOR.slot][ANCHOR.frame].classList.toggle('is-alarm', notesOn > 0.5)

      // The morph: only the emphasised phrases change. In a phase each slot
      // shows its frame in the clear (the first decrypting as the section
      // pins); in a morph each slot, a little after the one before, scrambles
      // out of the old phrase and resolves into the new one in place.
      const tick = Math.floor(scrolled / FLICKER_PX)
      for (let slot = 0; slot < SLOTS; slot++) {
        if (beat.kind === 'morph') {
          const q = span(local, slot * STAGGER, slot * STAGGER + SLOT_MORPH)
          const leaving = q < 0.5
          show(slot, leaving ? beat.from : beat.to)
          cipher(chars[slot][beat.from], leaving ? ease(q * 2) : 1, true, tick)
          cipher(chars[slot][beat.to], leaving ? 0 : ease(q * 2 - 1), false, tick)
        } else {
          show(slot, frame)
          cipher(chars[slot][frame], index === 0 ? ease(Math.min(1, local / INTRO)) : 1, false, tick)
        }
      }
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
  }, [finale, notes, reduceMotion])

  // Tell the finale where the last line of text ends so the cyclist rides
  // along it (distance from the viewport bottom up to the text's bottom edge),
  // and the notifications where their phrase sits.
  useEffect(() => {
    const sticky = stickyRef.current
    const text = textRef.current
    if (!sticky || !text) return
    const place = () => {
      const box = sticky.getBoundingClientRect()
      const gap = box.bottom - text.getBoundingClientRect().bottom
      sticky.style.setProperty('--text-gap', `${Math.max(0, gap)}px`)
      // The phrase itself, not its slot: the slot is as wide as its widest frame.
      const phrase = text.querySelector('.t-slot.is-anchor')?.children[ANCHOR.frame]
      if (!phrase) return
      const r = phrase.getBoundingClientRect()
      anchor.set({ x: r.left - box.left + r.width / 2, y: r.top - box.top, w: box.width, h: box.height })
    }
    place()
    const ro = new ResizeObserver(place)
    ro.observe(text)
    window.addEventListener('resize', place)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', place)
    }
  }, [anchor])

  const finalFrame = FRAMES.length - 1
  // Until the scroll takes over (see `measure`), show the frame that opens — or,
  // without motion, the one that resolves.
  const initialFrame = reduceMotion ? finalFrame : 0

  /** How many of a frame's words are violet: frames already passed stay fully
   *  lit as they scramble out; the next one arrives unlit. */
  const litFor = (frameIndex: number) =>
    reduceMotion || frameIndex < phase.frame
      ? WORD_COUNT[frameIndex]
      : frameIndex === phase.frame
        ? phase.lit
        : 0

  return (
    <section
      ref={ref}
      className="relative mx-auto w-full max-w-[1728px]"
      style={{ height: reduceMotion ? undefined : `${WORDS_VH + FINALE_VH + 100}vh` }}
    >
      {/* The dialogue, for anyone not seeing the animation. */}
      <p className="sr-only">
        Productivity takes steady effort, yet most of us rely on bursts of willpower. Your tools fix
        your organization, not your motivation, and shame you when the burst fades. That&rsquo;s why
        you stopped opening them. Nothing changed.
      </p>
      <p className="sr-only">Your tools answer back: {NOTE_SUMMARY}</p>

      <div
        ref={stickyRef}
        data-frame={phase.frame}
        data-lit={phase.lit}
        className={cn(
          'relative flex items-center overflow-hidden',
          // Clear the floating nav pill, which sits ~122px down.
          'pt-[clamp(72px,7.1vw,122px)]',
          reduceMotion ? 'py-24' : 'sticky top-0 h-screen',
        )}
      >
        <motion.div
          ref={textRef}
          className="mx-auto w-full"
          style={{ maxWidth: MEASURE_WIDTH, opacity: reduceMotion ? 1 : textOpacity }}
          aria-hidden="true"
        >
          <p className="t-statement w-full">
            {RUNS.map((carrier, slot) => (
              <Fragment key={slot}>
                <span className="t-run">{carrier}</span>
                {slot < SLOTS && (
                  <>
                    {' '}
                    {/* Every frame's phrase for this slot, stacked in one cell. */}
                    <span className={cn('t-slot', slot === ANCHOR.slot && 'is-anchor')}>
                      {FRAMES.map((phrases, frameIndex) => {
                        const phrase = phrases[slot]
                        const lit = litFor(frameIndex)
                        return (
                          <span
                            key={frameIndex}
                            className="t-layer"
                            style={{ visibility: frameIndex === initialFrame ? 'visible' : 'hidden' }}
                          >
                            {phrase.t.split(' ').map((word, wordIndex) => (
                              <Fragment key={wordIndex}>
                                {wordIndex > 0 && ' '}
                                <span
                                  data-w={phrase.w}
                                  className={cn(
                                    't-key',
                                    ORDER[frameIndex][slot][wordIndex] < lit && 'is-on',
                                  )}
                                >
                                  <Glyphs text={word} />
                                </span>
                              </Fragment>
                            ))}
                          </span>
                        )
                      })}
                    </span>{' '}
                  </>
                )}
              </Fragment>
            ))}
          </p>
        </motion.div>
        {!reduceMotion && <NotesStack progress={notes} anchor={anchor} />}
        {!reduceMotion && <FinaleStage progress={finale} />}
      </div>
    </section>
  )
}
