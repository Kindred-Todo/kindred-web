import { motion, useTransform, type MotionValue } from 'framer-motion'
import sheetSrc from '@/assets/redesign/cyclist-sheet.webp'

/**
 * The original cycling loop (40 frames), baked into an 8×5 sprite sheet and
 * scrubbed by scroll — one element, no layering, so she pedals exactly as far
 * as the user scrolls and can be reversed. The art faces left.
 */
const COLS = 8
const ROWS = 5
const FRAMES = COLS * ROWS
/** Full pedal loops over the whole ride. */
const LOOPS = 9

export function Cyclist({
  ride,
  className,
  style,
}: {
  /** 0 → 1 over the ride. */
  ride: MotionValue<number>
  className?: string
  style?: React.CSSProperties
}) {
  const backgroundPosition = useTransform(ride, (p) => {
    const f = ((Math.floor(p * LOOPS * FRAMES) % FRAMES) + FRAMES) % FRAMES
    return `${((f % COLS) / (COLS - 1)) * 100}% ${(Math.floor(f / COLS) / (ROWS - 1)) * 100}%`
  })
  return (
    <motion.div
      role="img"
      aria-label="Illustration of a person cycling"
      className={className}
      style={{
        ...style,
        aspectRatio: '1 / 1',
        backgroundImage: `url(${sheetSrc})`,
        backgroundSize: `${COLS * 100}% ${ROWS * 100}%`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition,
      }}
    />
  )
}
