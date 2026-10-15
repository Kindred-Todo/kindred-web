import { cn } from '@/lib/utils'

/**
 * Repeating halftone dot field. Purely decorative — the design uses it as
 * section texture (hero panels, feedback panels, rings section).
 * Position it with the usual absolute/inset utilities at the call site.
 */
export function DotGrid({
  className,
  variant = 'gray',
}: {
  className?: string
  variant?: 'gray' | 'violet'
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'dot-grid pointer-events-none absolute',
        variant === 'violet' && 'dot-grid--violet',
        className,
      )}
    />
  )
}
