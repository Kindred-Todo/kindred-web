import { useEffect, useState } from 'react'
import {  motion, useSpring, useTransform } from 'framer-motion'
import {
  Airplane,
  ArrowRight,
  Barbell,
  Bell,
  BookOpen,
  Briefcase,
  CalendarBlank,
  CaretLeft,
  CaretRight,
  ChartLineUp,
  Clock,
  Code,
  Confetti,
  GearSix,
  GraduationCap,
  House,
  ListPlus,
  MusicNotes,
  Newspaper,
  Play,
  Plus,
  Repeat,
  ShoppingCart,
  SignOut,
  Sun,
  User,
  UsersThree,
  X,
} from '@phosphor-icons/react'
import { ConcentricRings } from './ConcentricRings'
import type {MotionValue} from 'framer-motion';
import checkLogoSrc from '@/assets/check-logo.svg'

const SIGNUP_URL = 'https://app.kindredtodo.com/login'

/**
 * The Kindred desktop app's Home screen, as pieces the finale can lay out and
 * transform into. Values come from the app itself — AppSidebar.tsx,
 * home/stage/HomeStage.tsx, home/QuickCapture.tsx and the tokens in
 * src/index.css (sidebar #FBFBFC, item hover #EFEFF2, muted #919090, primary
 * #854DFF, Fraunces headings).
 *
 * The layout constants below are the app's own geometry. The finale positions
 * the marketing beats against these same numbers, so the two line up exactly
 * when the screen turns into the product.
 */
export const SIDEBAR_W = 272
export const RING_SIZE = 56
export const GREETING_H = 52
export const CAPTION_H = 22
export const SELECTOR_H = 28
export const CARD_H = 232
const DOTS_H = 20
export const NUDGE_H = 46
export const NUDGE_BOTTOM = 96
export const FOOTER_BOTTOM = 48

/** Phones get the app's mobile Home: no sidebar, a tighter column, and a tab
 *  bar along the bottom in place of the sidebar's navigation. */
export const TABBAR_H = 64
export const NUDGE_BOTTOM_M = TABBAR_H + 16

/** Gaps down the Home stack: ring → greeting → streak line → workspace
 *  switcher → task stack → dots. */
const GAPS = { greeting: 30, caption: 8, selector: 36, card: 40, dots: 22 }
const GAPS_M = { greeting: 20, caption: 10, selector: 20, card: 24, dots: 16 }

export type AppLayout = {
  ringTop: number
  greetingTop: number
  captionTop: number
  selectorTop: number
  cardTop: number
  dotsTop: number
}

/**
 * Where each piece of the Home stage sits for a stage `h` tall. The app
 * centres the stack vertically (the day ring lands about a quarter of the way
 * down), lifted only as far as it takes to clear the nudge at the bottom.
 */
export function appLayout(h: number, mobile: boolean): AppLayout {
  const g = mobile ? GAPS_M : GAPS
  const stackH =
    RING_SIZE + g.greeting + GREETING_H + g.caption + CAPTION_H + g.selector +
    SELECTOR_H + g.card + CARD_H + g.dots + DOTS_H
  const floor = h - (mobile ? NUDGE_BOTTOM_M : NUDGE_BOTTOM) - NUDGE_H - 12
  const ringTop = Math.max(16, Math.min((h - stackH) / 2, floor - stackH))
  const greetingTop = ringTop + RING_SIZE + g.greeting
  const captionTop = greetingTop + GREETING_H + g.caption
  const selectorTop = captionTop + CAPTION_H + g.selector
  const cardTop = selectorTop + SELECTOR_H + g.card
  const dotsTop = cardTop + CARD_H + g.dots
  return { ringTop, greetingTop, captionTop, selectorTop, cardTop, dotsTop }
}

/** The day ring as the app shows it at the start of a day: pale tracks with
 *  short stubs of progress at twelve o'clock. */
export const DAY_RING_PROGRESS = [0.07, 0.05, 0.035]

const INK = '#13121f'
const PRIMARY = '#854dff'
const SIDEBAR_BG = '#FBFBFC'
const SIDEBAR_ACCENT = '#EFEFF2'
const MUTED = '#919090'

const NAV = [
  { icon: House, label: 'Home', hint: 'H', active: true },
  { icon: CalendarBlank, label: 'Calendar', hint: 'C' },
  { icon: Newspaper, label: 'Feed' },
  { icon: UsersThree, label: 'Together' },
  { icon: ChartLineUp, label: 'Activity' },
  { icon: User, label: 'Profile' },
]

/** Generic starter workspaces — an icon and a swatch colour each, no emoji. */
const WORKSPACES = [
  { icon: User, color: '#7C5CFC', name: 'Personal' },
  { icon: Briefcase, color: '#3B82F6', name: 'Work' },
  { icon: Barbell, color: '#EF4444', name: 'Fitness' },
  { icon: BookOpen, color: '#22C55E', name: 'Reading' },
  { icon: House, color: '#F59E0B', name: 'Home' },
  { icon: Airplane, color: '#14B8A6', name: 'Travel' },
  { icon: Code, color: '#64748B', name: 'Side project' },
  { icon: GraduationCap, color: '#EC4899', name: 'Learning' },
  { icon: MusicNotes, color: '#7C5CFC', name: 'Music' },
  { icon: ShoppingCart, color: '#3B82F6', name: 'Errands' },
]

function SidebarRow({
  icon: Icon,
  label,
  hint,
  active,
  muted,
  iconColor,
}: {
  icon: typeof House
  label: string
  hint?: string
  active?: boolean
  muted?: boolean
  iconColor?: string
}) {
  return (
    <div
      className="flex items-center"
      style={{
        height: 30,
        gap: 8,
        padding: '0 8px',
        borderRadius: 10,
        background: active ? SIDEBAR_ACCENT : 'transparent',
        color: muted ? MUTED : INK,
      }}
    >
      <Icon
        size={16}
        weight={active ? 'fill' : 'regular'}
        style={{ color: iconColor ?? 'currentColor', flexShrink: 0 }}
      />
      <span
        className="font-outfit truncate"
        style={{ fontSize: 15, fontWeight: active ? 500 : 400, letterSpacing: '-0.2px' }}
      >
        {label}
      </span>
      {hint && (
        <span className="font-outfit ml-auto shrink-0" style={{ fontSize: 12, color: 'rgba(19,18,31,0.3)' }}>
          ⇧{hint}
        </span>
      )}
    </div>
  )
}

/** The app's sidebar, full height. */
export function AppSidebar() {
  return (
    <div
      className="flex h-full flex-col"
      style={{
        width: SIDEBAR_W,
        background: SIDEBAR_BG,
        borderRight: '1px solid rgba(102,102,102,0.14)',
        padding: 12,
      }}
    >
      <div className="flex items-center justify-between" style={{ padding: '6px 8px 14px' }}>
        <span
          className="font-fraunces"
          style={{
            fontSize: 24,
            fontWeight: 600,
            letterSpacing: '-0.02em',
            color: INK,
            fontVariationSettings: "'SOFT' 50, 'WONK' 1, 'opsz' 144",
          }}
        >
          Kindred
        </span>
        <Bell size={18} style={{ color: 'rgba(19,18,31,0.6)' }} />
      </div>

      <div
        className="flex items-center text-white"
        style={{ height: 32, gap: 8, padding: '0 8px', borderRadius: 10, background: PRIMARY }}
      >
        <Plus size={16} weight="bold" />
        <span className="font-outfit" style={{ fontSize: 15, letterSpacing: '-0.2px' }}>
          New task
        </span>
        <span className="font-outfit ml-auto" style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>
          ⇧T
        </span>
      </div>

      <div className="flex flex-col" style={{ marginTop: 2, gap: 2 }}>
        <SidebarRow icon={ListPlus} label="Draft tasks" hint="A" />
        {NAV.map((item) => (
          <SidebarRow key={item.label} {...item} />
        ))}
      </div>

      {/* The workspace list is the part that scrolls when the window is short,
          so the footer rows stay pinned to the bottom. */}
      <div
        className="min-h-0 flex-1 overflow-y-auto"
        style={{
          // A short list scrolls on short windows; fade the cut so it reads
          // as "more below" rather than a clipped row.
          maskImage: 'linear-gradient(to bottom, #000 calc(100% - 28px), transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, #000 calc(100% - 28px), transparent)',
        }}
      >
        <div
          className="font-outfit"
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: 'rgba(19,18,31,0.55)',
            padding: '18px 8px 6px',
          }}
        >
          Workspaces
        </div>
        <div className="flex flex-col" style={{ gap: 1 }}>
          {WORKSPACES.map((w) => (
            <SidebarRow key={w.name} icon={w.icon} label={w.name} iconColor={w.color} />
          ))}
          <SidebarRow icon={Plus} label="New workspace" muted />
        </div>
      </div>

      <div className="flex shrink-0 flex-col" style={{ gap: 1, paddingTop: 18 }}>
        <SidebarRow icon={GearSix} label="Settings" />
        <SidebarRow icon={SignOut} label="Log out" />
        <div className="flex items-center justify-between" style={{ padding: '8px', marginTop: 4 }}>
          <span className="font-outfit" style={{ fontSize: 14, color: 'rgba(19,18,31,0.55)' }}>
            Theme
          </span>
          <span
            className="flex items-center justify-center"
            style={{ width: 28, height: 28, borderRadius: 8, background: SIDEBAR_ACCENT, color: INK }}
          >
            <Sun size={16} />
          </span>
        </div>
      </div>
    </div>
  )
}

/**
 * The app's wash, copied from StageGlow.tsx: an ellipse anchored near the top
 * (110% 70% at 50% 10%) whose edge is the tinted arc, plus a halftone lattice
 * riding that edge. The wash sinks and breathes; the dots surface then fade.
 * The keyframes live in redesign.css.
 */
const ARC = '110% 70% at 50% 10%'

export function StageGlow() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="stage-wash-drop absolute inset-0">
        <div className="stage-wash-breathe absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(${ARC}, rgb(var(--wash-tint) / 0) 62%, rgb(var(--wash-tint) / 0.3) 85%, rgb(var(--wash-tint) / 0.55) 100%)`,
            }}
          />
          <div
            className="stage-wash-dots absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle at 2.5px 2.5px, rgb(var(--wash-dot)) 1.1px, transparent 1.6px), radial-gradient(circle at 7.5px 7.5px, rgb(var(--wash-dot)) 1.1px, transparent 1.6px)',
              backgroundSize: '10px 10px',
              maskImage: `radial-gradient(${ARC}, transparent 58%, #000 70%, rgb(0 0 0 / 0.35) 84%, transparent 95%)`,
              WebkitMaskImage: `radial-gradient(${ARC}, transparent 58%, #000 70%, rgb(0 0 0 / 0.35) 84%, transparent 95%)`,
            }}
          />
        </div>
      </div>
    </div>
  )
}

export function AppRing({ progress = 0.62 }: { progress?: number }) {
  return (
    <div className="relative" style={{ width: RING_SIZE, height: RING_SIZE }}>
      {/* Soft halo, as the app shows behind the day ring */}
      <span
        className="absolute rounded-full"
        style={{
          inset: -12,
          background: 'radial-gradient(closest-side, rgba(133,77,255,0.16), rgba(133,77,255,0))',
        }}
      />
      <ConcentricRings
        size={RING_SIZE}
        strokeWidth={6}
        gap={2}
        progress={DAY_RING_PROGRESS}
      />
    </div>
  )
}

export function AppGreeting() {
  return (
    <h1
      className="font-fraunces text-[44px] max-md:text-[36px]"
      style={{
        fontWeight: 600,
        letterSpacing: '-0.03em',
        lineHeight: `${GREETING_H}px`,
        color: INK,
        fontVariationSettings: "'SOFT' 50, 'WONK' 1, 'opsz' 144",
      }}
    >
      Good afternoon
    </h1>
  )
}

export function AppCaption() {
  return (
    <span className="font-outfit text-[14px] max-md:text-[15px]" style={{ fontWeight: 300, color: MUTED }}>
      Add a task to keep your streak alive
    </span>
  )
}

export function AppSelector() {
  return (
    <div className="flex items-center" style={{ gap: 4, height: SELECTOR_H }}>
      <span
        className="flex items-center justify-center"
        style={{ width: 28, height: 28, borderRadius: 999, color: MUTED }}
      >
        <CaretLeft size={12} />
      </span>
      <span
        className="font-outfit text-center"
        style={{ fontSize: 14, fontWeight: 300, color: MUTED, minWidth: 128 }}
      >
        All workspaces
      </span>
      <span
        className="flex items-center justify-center"
        style={{ width: 28, height: 28, borderRadius: 999, color: MUTED }}
      >
        <CaretRight size={12} />
      </span>
    </div>
  )
}

/** Starter tasks: the kind of thing you'd add first, so the stack teaches. */
const TASKS = [
  { workspace: 'Work', reason: 'Due today', title: "Plan tomorrow's top 3", time: 'Today, 5:00 PM', repeat: false },
  { workspace: 'Fitness', reason: 'In progress', title: 'Walk 20 minutes after lunch', time: 'Today, 1:00 PM', repeat: true },
  { workspace: 'Personal', reason: 'Overdue', title: 'Text Sam back', time: 'Yesterday, 8:00 PM', repeat: false },
  { workspace: 'Reading', reason: 'Due today', title: 'Read 10 pages', time: 'Today, 9:00 PM', repeat: true },
  { workspace: 'Travel', reason: 'High priority', title: 'Book flights for March', time: 'Fri, 10:00 AM', repeat: false },
]

const PRIORITY: Record<string, string> = {
  Overdue: '#FF5C5F',
  'High priority': '#EF4444',
  'Due today': '#F59E0B',
  'In progress': '#2F9BFF',
  Stalled: '#919090',
}

/** The app's stack: the front card, with the next two peeking behind it. */
function TaskStack({ index }: { index: number }) {
  const n = TASKS.length
  return (
    <div className="relative" style={{ height: CARD_H, width: 'min(448px, 100vw)' }}>
      {TASKS.map((task, i) => {
        const d = (i - index + n) % n
        const hidden = d > 2
        return (
          <div
            key={task.title}
            className="absolute inset-x-0 bottom-0 flex flex-col bg-white max-md:inset-x-4"
            style={{
              borderRadius: 18,
              padding: 20,
              gap: 10,
              zIndex: 30 - d,
              opacity: hidden ? 0 : 1 - 0.05 * d,
              transform: `translate3d(0, ${-22 * d}px, 0) scale(${1 - 0.025 * d})`,
              transformOrigin: '50% 100%',
              boxShadow: '0 1px 2px rgba(0,0,0,0.03), 0 12px 40px -16px rgba(0,0,0,0.16)',
              transition:
                'transform 520ms cubic-bezier(0.2,0,0,1), opacity 520ms cubic-bezier(0.2,0,0,1)',
              pointerEvents: 'none',
            }}
          >
            <span className="font-outfit truncate" style={{ fontSize: 14, fontWeight: 300, color: MUTED }}>
              {task.reason} · {task.workspace}
            </span>
            <div className="flex items-center" style={{ gap: 8 }}>
              <span
                className="font-outfit"
                style={{ fontSize: 17, fontWeight: 500, letterSpacing: '-0.3px', color: INK }}
              >
                {task.title}
              </span>
              <span
                className="inline-block shrink-0 rounded-full"
                style={{ width: 8, height: 8, background: PRIORITY[task.reason] ?? MUTED }}
              />
            </div>
            <div className="flex items-center font-outfit" style={{ gap: 16, fontSize: 14, fontWeight: 300, color: MUTED }}>
              <span className="flex items-center" style={{ gap: 6 }}>
                <Clock size={13} />
                {task.time}
              </span>
              {task.repeat && (
                <span className="flex items-center" style={{ gap: 6 }}>
                  <Repeat size={13} />
                  Repeats
                </span>
              )}
            </div>
            <div
              className="flex items-center self-start text-white"
              style={{
                height: 40,
                gap: 8,
                padding: '0 20px',
                marginTop: 4,
                borderRadius: 999,
                background: PRIMARY,
                boxShadow: '0 6px 10px -2px rgba(133,77,255,0.3)',
              }}
            >
              <Play size={14} weight="fill" />
              <span className="font-outfit" style={{ fontSize: 14, fontWeight: 600, letterSpacing: '-0.2px' }}>
                Start
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

/** Everything in the app's main column, at the app's own coordinates. */
export function AppStage({ layout: G, compact = false }: { layout: AppLayout; compact?: boolean }) {
  const [index, setIndex] = useState(0)

  // The stack flips itself, the way it waits for a scroll or an arrow key.
  useEffect(() => {
    const t = setInterval(() => setIndex((v) => (v + 1) % TASKS.length), 4200)
    return () => clearInterval(t)
  }, [])

  return (
    <>
      <div className="absolute inset-x-0 flex justify-center" style={{ top: G.selectorTop, height: SELECTOR_H }}>
        <AppSelector />
      </div>
      <div className="absolute inset-x-0 flex justify-center" style={{ top: G.cardTop }}>
        <TaskStack index={index} />
      </div>
      <div className="absolute inset-x-0 flex justify-center" style={{ top: G.dotsTop }}>
        <AppDots index={index} count={TASKS.length} compact={compact} />
      </div>
    </>
  )
}

export function AppDots({
  index,
  count,
  compact = false,
}: {
  index: number
  count: number
  compact?: boolean
}) {
  const shown = Math.min(7, count)
  return (
    <div className="flex items-center" style={{ gap: 12 }}>
      <div className="flex items-center" style={{ gap: 6 }}>
        {Array.from({ length: shown }, (_, i) => (
          <span
            key={i}
            className="rounded-full"
            style={{
              width: i === index ? 16 : 6,
              height: 6,
              background: i === index ? PRIMARY : 'rgba(145,144,144,0.35)',
            }}
          />
        ))}
      </div>
      <span
        className="font-outfit"
        style={{ fontSize: 14, fontWeight: 300, color: MUTED, fontVariantNumeric: 'tabular-nums' }}
      >
        {index + 1} of {count}
        {compact ? '' : ' · scroll or ↑↓ to flip'}
      </span>
    </div>
  )
}

export function AppSeeDay() {
  return (
    <div className="flex items-center" style={{ gap: 4, height: 20, color: MUTED }}>
      <span className="font-outfit" style={{ fontSize: 14, fontWeight: 300 }}>
        See your whole day
      </span>
      <ArrowRight size={12} />
    </div>
  )
}

/**
 * The hand-off: once the screen is the product, ask for the account. Fades and
 * springs in with the end of the transform; dismissable.
 */
export function SignupPrompt({ progress }: { progress: MotionValue<number> }) {
  const [dismissed, setDismissed] = useState(false)
  const opacity = useTransform(progress, [0.9, 1], [0, 1])
  const scale = useSpring(useTransform(progress, [0.9, 1], [0.94, 1]), {
    stiffness: 200,
    damping: 18,
  })
  const y = useTransform(progress, [0.9, 1], [16, 0])

  if (dismissed) return null

  return (
    <motion.div
      // Phones get it as a bottom sheet, the way a native app would ask.
      className="absolute inset-0 z-40 flex items-center justify-center px-6 max-md:items-end max-md:px-0"
      style={{ opacity }}
    >
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(19,18,31,0.22)', backdropFilter: 'blur(3px)' }}
      />
      <motion.div
        className="relative flex w-full max-w-[420px] flex-col items-center rounded-[22px] bg-white px-8 py-9 text-center max-md:max-w-none max-md:rounded-b-none max-md:rounded-t-[28px] max-md:px-6 max-md:pt-8 max-md:pb-[calc(20px+env(safe-area-inset-bottom))]"
        style={{
          scale,
          y,
          boxShadow: '0 24px 70px -20px rgba(19,18,31,0.35), 0 2px 8px rgba(19,18,31,0.06)',
        }}
      >
        <span className="absolute top-2.5 left-1/2 hidden h-[5px] w-10 -translate-x-1/2 rounded-full bg-black/12 max-md:block" />
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Dismiss"
          className="absolute top-3 right-3 flex items-center justify-center rounded-full text-[#919090] transition-colors hover:bg-black/5 hover:text-[#13121f]"
          style={{ width: 30, height: 30 }}
        >
          <X size={16} />
        </button>

        {/* Kindred's own check mark, not a generic tick in a circle. */}
        <img
          src={checkLogoSrc}
          alt=""
          draggable={false}
          className="h-[42px] w-[52px] max-md:h-[45px] max-md:w-14"
        />

        {/* The page's t-* classes are display scale (they clamp up to 36/24px
            on a 1728 canvas). This card is a normal-size dialog, so keep the
            families/weights and set the sizes to the site's UI scale. */}
        <h3 className="t-rings text-ink mt-[18px] text-[22px] max-md:text-[30px]">
          Make it yours
        </h3>
        <p className="t-small text-ink/60 mt-2 text-[15px] leading-[1.45] max-md:mt-3 max-md:text-[17px]">
          Kindred is free. Create an account to keep your streaks, invite a friend, and get kudos
          when you follow through.
        </p>

        <a
          href={SIGNUP_URL}
          className="t-button mt-7 flex h-12 w-full items-center justify-center gap-2 text-[15px] text-white transition-opacity hover:opacity-95 max-md:h-14 max-md:text-[17px]"
          style={{
            borderRadius: 999,
            background: PRIMARY,
            boxShadow: '0 10px 24px -8px rgba(133,77,255,0.6)',
          }}
        >
          Create free account
          <ArrowRight size={16} />
        </a>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="t-button mt-3 text-[15px] text-[#919090] transition-colors hover:text-[#13121f] max-md:mt-2 max-md:h-12 max-md:w-full max-md:text-[16px]"
        >
          Maybe later
        </button>
      </motion.div>
    </motion.div>
  )
}

const TABS = [
  { icon: House, label: 'Home', active: true },
  { icon: CalendarBlank, label: 'Calendar' },
  { icon: Newspaper, label: 'Feed' },
  { icon: UsersThree, label: 'Together' },
  { icon: User, label: 'Profile' },
]

/** The mobile app's bottom tab bar — the sidebar's navigation, on a phone. */
export function AppTabBar() {
  return (
    <div
      className="flex items-start justify-around bg-white/90 backdrop-blur-md"
      style={{ height: TABBAR_H, paddingTop: 8, borderTop: '1px solid rgba(102,102,102,0.14)' }}
    >
      {TABS.map(({ icon: Icon, label, active }) => (
        <div
          key={label}
          className="flex flex-col items-center"
          style={{ gap: 3, width: 64, color: active ? PRIMARY : MUTED }}
        >
          <Icon size={24} weight={active ? 'fill' : 'regular'} />
          <span className="font-outfit" style={{ fontSize: 11, fontWeight: active ? 500 : 400 }}>
            {label}
          </span>
        </div>
      ))}
    </div>
  )
}

/** The nudge the app shows above the capture field. */
export function AppNudge() {
  return (
    <div
      className="flex items-center bg-white"
      style={{
        height: 46,
        gap: 10,
        padding: '0 14px 0 18px',
        borderRadius: 999,
        boxShadow: '0 1px 2px rgba(0,0,0,0.03), 0 8px 28px -14px rgba(0,0,0,0.12)',
      }}
    >
      <Confetti size={16} style={{ color: MUTED }} />
      <span className="font-outfit" style={{ fontSize: 15, fontWeight: 300, color: MUTED }}>
        8 tasks have no day planned ·
      </span>
      <span className="font-outfit" style={{ fontSize: 15, fontWeight: 500, color: PRIMARY }}>
        Tidy up
      </span>
      <X size={15} style={{ color: MUTED, marginLeft: 4 }} />
    </div>
  )
}
