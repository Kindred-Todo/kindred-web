import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'violet' | 'ghost'

const VARIANTS: Record<Variant, string> = {
  violet: 'bg-violet text-white shadow-[0_0_40.6px_rgba(133,77,255,0.25)]',
  ghost: 'bg-white text-violet shadow-[0_0_24px_rgba(0,0,0,0.1)]',
}

/**
 * The design's pill CTA. Fixed 247×52 at the 1728 canvas so the two hero
 * buttons read as a matched pair regardless of label length.
 */
export function PillButton({
  children,
  variant = 'violet',
  href,
  onClick,
  className,
  ariaLabel,
}: {
  children: ReactNode
  variant?: Variant
  href?: string
  onClick?: () => void
  className?: string
  ariaLabel?: string
}) {
  const classes = cn(
    't-button inline-flex h-[52px] min-w-[247px] items-center justify-center rounded-[65px] px-6',
    // Below 768px two 247px pills no longer fit side by side, so they stretch.
    'max-md:w-full max-md:min-w-0',
    'transition-transform duration-200 ease-out hover:-translate-y-px active:translate-y-0',
    VARIANTS[variant],
    className,
  )

  if (href) {
    return (
      <a href={href} className={classes} aria-label={ariaLabel}>
        {children}
      </a>
    )
  }

  return (
    <button type="button" onClick={onClick} className={classes} aria-label={ariaLabel}>
      {children}
    </button>
  )
}
