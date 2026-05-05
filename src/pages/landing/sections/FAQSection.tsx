import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useResponsiveScale, useIsMobile } from '@/hooks/useResponsiveScale'
import { decorativeShapes } from '@/assets/shapes/decorative-shapes'

interface FAQItem {
  question: string
  answer: string
}

const FAQ_ITEMS: FAQItem[] = [
  { question: "Can people see everything I'm doing?", answer: 'No.' },
  { question: 'Do my friends need to be on the app too?', answer: "They don't have to be, but it's way better when they are. Kindred is built for shared accountability." },
  { question: 'Is it free?', answer: 'Yes — Kindred is free to download and use.' },
]

function FAQItemComponent({ item }: { item: FAQItem }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="w-full">
      <button className="w-full text-left cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <p className="font-outfit font-normal text-[32px] text-black text-shadow-[0px_0px_24px_white] tracking-[-0.96px] leading-none">{item.question}</p>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }} className="overflow-hidden">
            <p className="font-outfit font-normal text-[18px] text-black leading-[1.25] mt-8">{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function DecorativeShapes() {
  return (
    <svg className="block w-full h-full" fill="none" viewBox="0 0 450.746 594.346">
      <path d={decorativeShapes.faqStar1} fill="var(--color-primary)" fillOpacity="0.6" stroke="var(--color-primary)" strokeWidth="0.9" />
      <path d={decorativeShapes.faqDashedStar1} stroke="var(--color-primary)" strokeDasharray="18.04 18.04" strokeWidth="1.8" />
      <path d={decorativeShapes.faqPolygon1} fill="var(--color-primary)" />
      <path d={decorativeShapes.faqStar2} fill="var(--color-primary)" fillOpacity="0.6" stroke="var(--color-primary)" strokeWidth="0.9" />
      <path d={decorativeShapes.faqDashedStar2} stroke="var(--color-primary)" strokeDasharray="18.04 18.04" strokeWidth="1.8" />
      <path d={decorativeShapes.faqPolygon2} fill="var(--color-primary)" />
      <path d={decorativeShapes.faqStar3} fill="var(--color-primary)" fillOpacity="0.6" stroke="var(--color-primary)" strokeWidth="0.9" />
      <path d={decorativeShapes.faqDashedStar3} stroke="var(--color-primary)" strokeDasharray="18.04 18.04" strokeWidth="1.8" />
      <path d={decorativeShapes.faqPolygon3} fill="var(--color-primary)" />
    </svg>
  )
}

export function FAQSection() {
  const scale = useResponsiveScale()
  const isMobile = useIsMobile()

  return (
    <section className="relative w-full bg-white" style={{ padding: isMobile ? '64px 16px' : `${scale(96)} ${scale(84)}` }}>
      <div className="flex flex-col md:flex-row" style={{ gap: isMobile ? '48px' : scale(128) }}>
        <div className="relative" style={{ width: isMobile ? '100%' : scale(466) }}>
          <p className="font-fraunces font-normal italic leading-none text-black text-shadow-[0px_0px_24px_white] tracking-[-1.92px]" style={{ fontSize: isMobile ? '40px' : scale(64), fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>
            frequently asked questions
          </p>
          {!isMobile && (
            <div className="mt-8" style={{ width: scale(451), height: scale(594) }}>
              <DecorativeShapes />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-8 flex-1" style={{ maxWidth: isMobile ? '100%' : scale(543) }}>
          {FAQ_ITEMS.map((item, i) => (
            <div key={i}>
              <FAQItemComponent item={item} />
              {i < FAQ_ITEMS.length - 1 && (
                <div className="mt-8">
                  <svg className="block w-full" fill="none" viewBox="0 0 421 1" style={{ maxWidth: scale(421) }}>
                    <path d="M0 0.5H421" stroke="var(--color-divider)" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
