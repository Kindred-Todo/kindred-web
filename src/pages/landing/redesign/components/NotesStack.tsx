import { useEffect, useState } from 'react'
import { motion, useTransform } from 'framer-motion'
import {
  Barbell,
  CalendarX,
  ChatCircleDots,
  EnvelopeSimple,
  Fire,
  Target,
  Timer,
  WarningCircle,
} from '@phosphor-icons/react'
import type { ComponentType } from 'react'
import type { MotionValue } from 'framer-motion'

/**
 * The tools answer back: a flood of push notifications over the dimmed
 * statement, styled like the banners a modern OS actually shows — frosted
 * card, red app tile, time on the right. They land faster and faster and the
 * overdue count keeps climbing, so the pile reads as pressure, not decoration.
 *
 * On desktop they burst out of the phrase that summons them — "and shame you
 * when the burst fades", which turns red — and scatter across the screen above
 * it, each new one landing on top while the older ones sink back. At the end
 * the whole cloud is pulled back into the phrase. On mobile there's no room to
 * scatter, so they stack in a centred column the way a notification centre does.
 */

/** Where the phrase sits in the pinned area, in px: its centre-x and top edge,
 *  and the area's size. Set by the statement as it lays out; all zero until
 *  it has. */
export type Anchor = { x: number; y: number; w: number; h: number }

type Note = {
  app: string
  glyph: ComponentType<{ className?: string; weight?: 'fill' }>
  title: string
  body: string
}

const NOTES: Array<Note> = [
  { app: 'Tasks', glyph: WarningCircle, title: '3 tasks overdue', body: 'Quarterly report, inbox zero, call mom' },
  { app: 'Streaks', glyph: Fire, title: 'Streak lost', body: 'You broke your 12-day streak.' },
  { app: 'Reminders', glyph: Barbell, title: 'Gym is overdue', body: 'Overdue since Monday.' },
  { app: 'Focus', glyph: Timer, title: 'You missed your focus goal', body: '0 of 4 hours today.' },
  { app: 'Mail', glyph: EnvelopeSimple, title: '48 unread emails', body: '6 marked urgent.' },
  { app: 'Tasks', glyph: WarningCircle, title: '7 tasks overdue', body: 'You’re falling behind.' },
  { app: 'Calendar', glyph: CalendarX, title: 'Missed: Weekly review', body: 'Rescheduled 3 times.' },
  { app: 'Focus', glyph: Timer, title: 'Where did you go?', body: 'You haven’t opened the app in 5 days.' },
  { app: 'Goals', glyph: Target, title: 'Goal at risk', body: 'Read 12 books · 1 of 12' },
  { app: 'Streaks', glyph: Fire, title: 'Back to day 0', body: 'Every streak you had is gone.' },
  { app: 'Team', glyph: ChatCircleDots, title: 'Still waiting on that deck', body: 'Sent 3 days ago.' },
  { app: 'Tasks', glyph: WarningCircle, title: '12 tasks overdue', body: 'Your list is out of control.' },
]

/** The notifications as one line, for screen readers. */
export const NOTE_SUMMARY = NOTES.map((note) => note.title).join('; ') + '.'

/** When each banner lands. The gaps shrink, so the flood accelerates. */
const REVEALS = NOTES.map((_, i) => 0.05 + 0.65 * (1 - (1 - i / (NOTES.length - 1)) ** 1.7))
/** How long a banner takes to land. */
const LAND = 0.06
/** The cloud is pulled back into the phrase over this window, the newest last. */
const RECALL: [number, number] = [0.82, 0.92]

const clamp01 = (t: number) => Math.min(1, Math.max(0, t))
const easeOut = (t: number) => 1 - (1 - t) ** 3
const easeIn = (t: number) => t ** 3
/** How far banner `j` has landed at `p`, 0 → 1. */
const landed = (p: number, j: number) => clamp01((p - REVEALS[j]) / LAND)
/** How many banners have landed since banner `index` — fractional while one is
 *  still landing, so the pile shifts smoothly rather than in steps. */
const newer = (p: number, index: number) => {
  let d = 0
  for (let j = index + 1; j < NOTES.length; j++) d += landed(p, j)
  return d
}

function Banner({ note }: { note: Note }) {
  const Glyph = note.glyph
  return (
    <>
      <span className="bg-red-error flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px]">
        <Glyph weight="fill" className="h-5 w-5 text-white" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <p className="text-red-error min-w-0 flex-1 truncate text-[15px] leading-tight font-medium">
            {note.title}
          </p>
          <span className="text-copy-dim shrink-0 text-xs">now</span>
        </div>
        <p className="text-copy truncate text-sm leading-snug font-light">
          <span className="text-ink">{note.app}</span> · {note.body}
        </p>
      </div>
    </>
  )
}

const CARD =
  'flex items-center gap-3 rounded-[20px] bg-white/85 px-4 py-3 shadow-[0_12px_40px_rgba(23,22,38,0.14)] backdrop-blur-xl'

// ── Desktop: the burst ───────────────────────────────────────────────────────

/** Where each banner lands, as fractions of the pinned area — scattered so each
 *  new one turns up somewhere else, all of it above the phrase and clear of the
 *  nav pill. Listed in landing order. */
const SPOTS: Array<{ x: number; y: number }> = [
  { x: 0.3, y: 0.52 },
  { x: 0.72, y: 0.38 },
  { x: 0.17, y: 0.3 },
  { x: 0.57, y: 0.6 },
  { x: 0.85, y: 0.58 },
  { x: 0.42, y: 0.34 },
  { x: 0.16, y: 0.64 },
  { x: 0.8, y: 0.24 },
  { x: 0.62, y: 0.46 },
  { x: 0.12, y: 0.47 },
  { x: 0.46, y: 0.24 },
  { x: 0.38, y: 0.66 },
]

function BurstBanner({
  note,
  index,
  progress,
  anchor,
}: {
  note: Note
  index: number
  progress: MotionValue<number>
  anchor: MotionValue<Anchor>
}) {
  const spot = SPOTS[index]
  // How far out of the phrase it is: 0 inside it, 1 at its spot. It flies out
  // as it lands and is sucked back in on recall, the newest last.
  const out = (p: number) => {
    const back = clamp01(
      (p - RECALL[0] - (index / NOTES.length) * 0.03) / (RECALL[1] - RECALL[0] - 0.03),
    )
    return easeOut(landed(p, index)) * (1 - easeIn(back))
  }
  const offset = (p: number, axis: 'x' | 'y') => {
    const a = anchor.get()
    if (!a.w) return 0
    const from = axis === 'x' ? a.x - spot.x * a.w : a.y - spot.y * a.h
    return (1 - out(p)) * from
  }
  const x = useTransform(progress, (p) => offset(p, 'x'))
  const y = useTransform(progress, (p) => offset(p, 'y'))
  // Each one that lands after it pushes it back a little further.
  const scale = useTransform(progress, (p) => {
    const depth = Math.min(newer(p, index), 6)
    return (0.3 + 0.7 * out(p)) * (1 - depth * 0.035)
  })
  const opacity = useTransform(progress, (p) => {
    const depth = Math.min(newer(p, index), 6)
    return clamp01(out(p) * 3) * (1 - depth * 0.07)
  })

  return (
    <div
      className="absolute w-[clamp(300px,22vw,360px)]"
      style={{
        left: `${spot.x * 100}%`,
        top: `${spot.y * 100}%`,
        transform: 'translate(-50%, -50%)',
        zIndex: index,
      }}
    >
      <motion.div data-note={note.app} style={{ x, y, scale, opacity }} className={CARD}>
        <Banner note={note} />
      </motion.div>
    </div>
  )
}

// ── Mobile: the stack ────────────────────────────────────────────────────────

/** Banners shown in full; older ones peek out underneath. */
const ROWS = 4
/** How much of each tucked banner still shows below the one in front. */
const PEEK_PX = 10

function StackBanner({ note, index, progress }: { note: Note; index: number; progress: MotionValue<number> }) {
  const at = REVEALS[index]
  const depth = useTransform(progress, (p) => newer(p, index))

  // Full rows step down by a card's height; past ROWS they tuck in behind.
  const y = useTransform([progress, depth], ([p, d]: Array<number>) => {
    const drop = (1 - landed(p, index)) * -28
    const rows = Math.min(d, ROWS - 1)
    const tucked = Math.max(0, d - (ROWS - 1))
    return `calc(${rows} * (100% + 10px) + ${tucked * PEEK_PX + drop}px)`
  })
  const scale = useTransform(depth, (d) => 1 - Math.max(0, d - (ROWS - 1)) * 0.05)
  const opacity = useTransform([progress, depth], ([p, d]: Array<number>) => {
    const arrive = clamp01((p - at) / (LAND * 0.5))
    const buried = clamp01(d - ROWS)
    return arrive * (1 - buried)
  })
  // Once tucked behind, only the card's edge shows — its content fades so it
  // can't bleed through the frosted card in front.
  const content = useTransform(depth, (d) => 1 - clamp01((d - (ROWS - 1)) * 2))

  return (
    <motion.div
      data-note={note.app}
      style={{ y, scale, opacity, zIndex: index, transformOrigin: '50% 100%' }}
      className={`absolute inset-x-0 top-0 ${CARD}`}
    >
      <motion.div style={{ opacity: content }} className="flex min-w-0 flex-1 items-center gap-3">
        <Banner note={note} />
      </motion.div>
    </motion.div>
  )
}

function useIsDesktop() {
  const [desktop, setDesktop] = useState(false)
  useEffect(() => {
    const query = window.matchMedia('(min-width: 768px)')
    const update = () => setDesktop(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])
  return desktop
}

export function NotesStack({
  progress,
  anchor,
}: {
  progress: MotionValue<number>
  anchor: MotionValue<Anchor>
}) {
  const desktop = useIsDesktop()
  // The stack clears as one so the next beat starts on an empty screen; the
  // burst is recalled into its phrase instead.
  const fade = useTransform(progress, [0.86, 0.96], [1, 0], { clamp: true })
  const lift = useTransform(progress, [0.86, 0.96], [0, -24], { clamp: true })

  if (desktop)
    return (
      <div
        aria-hidden="true"
        style={{ fontFamily: 'var(--font-outfit)' }}
        className="pointer-events-none absolute inset-0"
      >
        {NOTES.map((note, index) => (
          <BurstBanner key={index} note={note} index={index} progress={progress} anchor={anchor} />
        ))}
      </div>
    )

  return (
    <motion.div
      aria-hidden="true"
      style={{ opacity: fade, y: lift, fontFamily: 'var(--font-outfit)' }}
      className="pointer-events-none absolute inset-x-0 top-[calc(50%-150px)] mx-auto w-[min(420px,calc(100vw-40px))]"
    >
      {/* A sizer the height of one banner, so the stack's rows have a measure. */}
      <div className="invisible flex items-center gap-3 px-4 py-3">
        <span className="h-10 w-10" />
        <div>
          <p className="text-[15px] leading-tight">&nbsp;</p>
          <p className="text-sm leading-snug">&nbsp;</p>
        </div>
      </div>
      {NOTES.map((note, index) => (
        <StackBanner key={index} note={note} index={index} progress={progress} />
      ))}
    </motion.div>
  )
}
