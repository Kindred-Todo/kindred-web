import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

interface AccordionItem {
  title: string
  content: string
}

interface AutoAccordionProps {
  items: Array<AccordionItem>
  autoAdvanceDelay?: number | null
}

function CircularProgress({ progress }: { progress: number }) {
  const radius = 6
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (progress / 100) * circumference

  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="absolute inset-0 size-full -rotate-90" viewBox="0 0 16 16">
        <circle
          cx="8"
          cy="8"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-primary/20"
        />
        <circle
          cx="8"
          cy="8"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="text-primary"
          style={{ transition: 'stroke-dashoffset 0.1s linear' }}
        />
      </svg>
    </div>
  )
}

function MinusIcon() {
  return (
    <div className="relative shrink-0 size-[16px] rounded-full border border-primary">
      <div className="flex items-center justify-center size-full">
        <span className="font-outfit text-[15px] text-primary leading-none">-</span>
      </div>
    </div>
  )
}

export function AutoAccordion({ items, autoAdvanceDelay }: AutoAccordionProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const shouldAutoAdvance = typeof autoAdvanceDelay === 'number' && autoAdvanceDelay > 0

  useEffect(() => {
    if (!shouldAutoAdvance) {
      setProgress(0)
      return
    }

    const startTime = Date.now()
    let animationFrame: number

    const updateProgress = () => {
      const elapsed = Date.now() - startTime
      const currentProgress = Math.min((elapsed / autoAdvanceDelay) * 100, 100)
      setProgress(currentProgress)

      if (currentProgress >= 100) {
        setActiveIndex((prev) => (prev + 1) % items.length)
      } else {
        animationFrame = requestAnimationFrame(updateProgress)
      }
    }

    animationFrame = requestAnimationFrame(updateProgress)
    return () => cancelAnimationFrame(animationFrame)
  }, [activeIndex, autoAdvanceDelay, items.length, shouldAutoAdvance])

  const handleClick = useCallback((index: number) => {
    setActiveIndex(index)
    setProgress(0)
  }, [])

  return (
    <div className="flex flex-col gap-[12px] w-full">
      {items.map((item, index) => {
        const isActive = index === activeIndex
        return (
          <div
            key={index}
            className="bg-white rounded-[12px] w-full cursor-pointer border border-black/8 shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition-all duration-300"
            onClick={() => handleClick(index)}
          >
            <div className={`flex flex-col px-[24px] w-full transition-all duration-300 ${
              isActive ? 'py-[32px] gap-[16px]' : 'py-[20px]'
            }`}>
              <div className="flex items-center justify-between w-full">
                <p className="font-outfit text-[24px] text-black tracking-[-0.24px] leading-[1.2]">
                  {item.title}
                </p>
                {isActive ? (
                  shouldAutoAdvance ? <CircularProgress progress={progress} /> : <MinusIcon />
                ) : (
                  <span className="font-outfit text-[20px] text-primary leading-none">-</span>
                )}
              </div>
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <p className="font-outfit text-[16px] md:text-[18px] text-text-muted tracking-[0.18px] leading-[1.4]">
                      {item.content}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )
      })}
    </div>
  )
}
