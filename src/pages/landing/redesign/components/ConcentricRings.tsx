import type { ReactNode } from 'react'

/**
 * Plan / Do / Share productivity rings.
 *
 * Ported from the Kindred desktop app
 * (`Kindred/desktop/src/components/rings/ConcentricRings.tsx`) so the
 * marketing site draws the rings with the same geometry and the same
 * colours as the product — see `Kindred/shared/rings.ts`.
 *
 * Order is outer → inner: plan (violet), do (blue), share (pink).
 */

export const RING_ORDER = ['plan', 'do', 'share'] as const
export type RingKey = (typeof RING_ORDER)[number]

export const RING_COLORS: Record<RingKey, string> = {
  plan: '#854DFF',
  do: '#2F9BFF',
  share: '#FF6EC7',
}

function Ring({
  color,
  size,
  radius,
  strokeWidth,
  progress,
}: {
  color: string
  size: number
  radius: number
  strokeWidth: number
  progress: number
}) {
  const circ = 2 * Math.PI * radius
  const c = size / 2
  const fill = Math.min(Math.max(progress, 0), 1)

  return (
    <>
      {/* Track — same colour at 10% so a partially-filled ring still reads */}
      <circle cx={c} cy={c} r={radius} fill="none" strokeWidth={strokeWidth} stroke={`${color}1A`} />
      <circle
        cx={c}
        cy={c}
        r={radius}
        fill="none"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={circ * (1 - fill)}
        stroke={color}
      />
    </>
  )
}

export function ConcentricRings({
  size = 204,
  strokeWidth = 16,
  gap = 7,
  progress = 1,
  /** Fraction of the range each ring waits before it starts filling. */
  stagger = 0,
  center,
  className,
}: {
  size?: number
  strokeWidth?: number
  gap?: number
  /** One value for all three rings, or one per ring (outer → inner). */
  progress?: number | number[]
  stagger?: number
  center?: ReactNode
  className?: string
}) {
  // Ring i waits `stagger` before it starts, so the three close in sequence
  // rather than all at once; the last one still lands exactly at progress 1.
  const span = Math.max(0.05, 1 - stagger * (RING_ORDER.length - 1))
  const ringProgress = (index: number) =>
    Array.isArray(progress)
      ? progress[index] ?? 0
      : Math.min(1, Math.max(0, (progress - index * stagger) / span))

  return (
    <div className={className} style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        {RING_ORDER.map((key, index) => (
          <Ring
            key={key}
            color={RING_COLORS[key]}
            size={size}
            radius={(size - strokeWidth) / 2 - index * (strokeWidth + gap)}
            strokeWidth={strokeWidth}
            progress={ringProgress(index)}
          />
        ))}
      </svg>
      {center != null && (
        <div className="absolute inset-0 flex items-center justify-center">{center}</div>
      )}
    </div>
  )
}
