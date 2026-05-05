import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useResponsiveScale, useIsMobile } from '@/hooks/useResponsiveScale'
import { decorativeShapes } from '@/assets/shapes/decorative-shapes'

interface FAQItem {
  question: string
  answer: string
}

const FAQ_ITEMS: FAQItem[] = [
  { question: "Can people see everything I'm doing?", answer: "Not at all. Your activity on Kindred is private by default. You choose exactly what to share and who to share it with — whether that's a close friend, your whole group, or no one. Your tasks, progress, and personal notes stay yours unless you decide otherwise." },
  { question: 'Do my friends need to be on the app too?', answer: "They don't have to be, but it's way better when they are. Kindred is built around shared accountability — you can use it solo, but the real magic happens when the people you care about are in it with you. Invite them and watch how much easier it becomes to stay on track." },
  { question: 'Is it free?', answer: "Yes — Kindred is completely free to download and use. All core features are included from day one, no paywalls or trials. We want everyone to have access to a productivity system that actually works." },
  { question: 'How is this different from other productivity apps?', answer: "Most productivity apps treat you like a solo machine — just organize harder and you'll get things done. Kindred flips that. It's built around the people in your life. You set goals together, celebrate wins together, and stay accountable to each other. It's not about grinding alone — it's about growing with your people." },
  { question: 'What are Blueprints?', answer: "Blueprints are ready-made goal templates designed for real life — finals prep, job applications, fitness challenges, passion projects. Instead of building a system from scratch, pick a Blueprint and start immediately. They give you structure without the overhead." },
  { question: 'Can I use Kindred for work or school?', answer: "Absolutely. Kindred works for anything you want to get done — school projects, career goals, side hustles, personal growth. The accountability model adapts to whatever you're pursuing because the people around you can support all of it." },
]

function FAQItemComponent({ item, defaultOpen = false }: { item: FAQItem; defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  return (
    <div className="w-full">
      <button className="w-full text-left cursor-pointer flex items-start justify-between gap-4" onClick={() => setIsOpen(!isOpen)}>
        <p className="font-outfit font-normal text-[32px] text-black text-shadow-[0px_0px_24px_white] tracking-[-0.96px] leading-none">{item.question}</p>
        <span className="font-outfit text-[24px] text-primary leading-none shrink-0 mt-1">{isOpen ? '-' : '+'}</span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }} className="overflow-hidden">
            <p className="font-outfit font-normal text-[18px] text-text-muted leading-[1.5] mt-8">{item.answer}</p>
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
    <section className="relative w-full bg-white" style={{ padding: isMobile ? '64px 16px' : `${scale(96)} ${scale(64)}` }}>
      {isMobile ? (
        <div className="flex flex-col gap-12">
          <p className="font-fraunces font-normal italic leading-none text-black text-shadow-[0px_0px_24px_white] tracking-[-1.92px] text-[40px]" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>
            frequently asked questions
          </p>
          <div className="flex flex-col gap-8">
            {FAQ_ITEMS.map((item, i) => (
              <div key={i}>
                <FAQItemComponent item={item} defaultOpen={i === 0} />
                {i < FAQ_ITEMS.length - 1 && (
                  <div className="mt-8">
                    <svg className="block w-full" fill="none" viewBox="0 0 421 1">
                      <path d="M0 0.5H421" stroke="var(--color-divider)" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-12 gap-x-[20px]">
          {/* Title + shapes: columns 1-5 */}
          <div className="col-span-5 relative">
            <p className="font-fraunces font-normal italic leading-none text-black text-shadow-[0px_0px_24px_white] tracking-[-1.92px]" style={{ fontSize: scale(64), fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}>
              frequently asked questions
            </p>
            <div className="mt-8" style={{ width: scale(451), height: scale(594) }}>
              <DecorativeShapes />
            </div>
          </div>
          {/* Spacer: column 6 */}
          <div className="col-span-1" />
          {/* Questions: columns 7-12 */}
          <div className="col-span-6 flex flex-col gap-8">
            {FAQ_ITEMS.map((item, i) => (
              <div key={i}>
                <FAQItemComponent item={item} defaultOpen={i === 0} />
                {i < FAQ_ITEMS.length - 1 && (
                  <div className="mt-8">
                    <svg className="block w-full" fill="none" viewBox="0 0 421 1">
                      <path d="M0 0.5H421" stroke="var(--color-divider)" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
