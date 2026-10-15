import { cn } from '@/lib/utils'

const BAR_COUNT = 48

/**
 * Deterministic per-bar look — a sine mix so the row reads as organic
 * loudness without Math.random() (keeps renders and hot reloads stable).
 */
function barProfile(i: number) {
  const envelope = 0.35 + 0.65 * Math.sin((i / (BAR_COUNT - 1)) * Math.PI)
  const jitter =
    0.55 + 0.45 * Math.abs(Math.sin(i * 2.7) * Math.cos(i * 0.9 + 1.3))
  return {
    /** Base height in px (max 64). */
    height: Math.round(6 + envelope * jitter * 58),
    /** Per-bar pulse duration — desynced so the row shimmers like listening. */
    durationMs: 900 + Math.round(jitter * 700),
    /** Negative delay so the loop starts mid-phase, no synchronized blink. */
    delayMs: -Math.round(((i * 137) % 1600)),
  }
}

/**
 * Decorative audio waveform for the voice-capture feature card. Bars pulse
 * only while `active` (driven by useInView at the call site) and rest at a
 * low flat line otherwise.
 */
export function CaptureWaveform({
  active,
  className,
}: {
  active: boolean
  className?: string
}) {
  return (
    <div
      aria-hidden="true"
      className={cn('capture-wave', active && 'is-active', className)}
    >
      {Array.from({ length: BAR_COUNT }, (_, i) => {
        const bar = barProfile(i)
        return (
          <span
            key={i}
            className="capture-wave__bar"
            style={{
              height: `${bar.height}px`,
              '--dur': `${bar.durationMs}ms`,
              '--delay': `${bar.delayMs}ms`,
            } as React.CSSProperties}
          />
        )
      })}
    </div>
  )
}
