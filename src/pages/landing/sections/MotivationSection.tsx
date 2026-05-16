import { motion } from 'framer-motion'
import { useResponsiveScale, useIsMobile } from '@/hooks/useResponsiveScale'
import { typography } from '@/lib/design-system'
import { decorativeShapes } from '@/assets/shapes/decorative-shapes'
import { ConveyorBelt } from '@/components/ConveyorBelt'
import belt1 from '@/assets/new-design/belt-1.png'
import belt2 from '@/assets/new-design/belt-2.png'
import belt3 from '@/assets/new-design/belt-3.png'
import belt4 from '@/assets/new-design/belt-4.png'
import belt5 from '@/assets/new-design/belt-5.png'
import belt6 from '@/assets/new-design/belt-6.png'

const BELT_IMAGES = [
  { src: belt1, height: 283, width: 280 },
  { src: belt2, height: 280, width: 280 },
  { src: belt3, height: 283, width: 280 },
  { src: belt4, height: 280, width: 280 },
  { src: belt5, height: 283, width: 280 },
  { src: belt6, height: 280, width: 280 },
]

interface KudosCard {
  avatar: string
  name: string
  time: string
  category: string
  task: string
  comment: string
  highlighted?: boolean
}

const ENCOURAGEMENTS: KudosCard[] = [
  { avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face', name: 'Sarah', time: '2h ago', category: 'Reading', task: 'Chapter 2 of Red Rising', comment: "im might actually finish the book lol", highlighted: true },
  { avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face', name: 'Marcus', time: '3h ago', category: 'Listening', task: 'Podcast: The History of Rome', comment: 'Incredible storytelling, highly recommended', highlighted: false },
  { avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face', name: 'Sophie', time: '5h ago', category: 'Watching', task: 'Episode 5 of Stranger Things', comment: 'Plot twist blew my mind!', highlighted: true },
  { avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face', name: 'Tyler', time: '6h ago', category: 'Fitness', task: 'Morning 5k Run', comment: 'the sunrise made it worth it', highlighted: false },
  { avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face', name: 'Priya', time: '7h ago', category: 'Learning', task: 'React Native Tutorial', comment: 'finally clicked after 3 tries', highlighted: true },
  { avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face', name: 'Jake', time: '8h ago', category: 'Creative', task: 'Sketch new logo concepts', comment: 'version 4 is actually fire', highlighted: false },
  { avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face', name: 'Mia', time: '9h ago', category: 'Writing', task: 'Journal entry for today', comment: 'getting better at this honestly', highlighted: false },
  { avatar: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=80&h=80&fit=crop&crop=face', name: 'Ethan', time: '10h ago', category: 'Music', task: 'Practice guitar 30 min', comment: 'barre chords are clicking', highlighted: true },
]

const CONGRATULATIONS: KudosCard[] = [
  { avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=80&h=80&fit=crop&crop=face', name: 'Jessica', time: '4h ago', category: 'Fitness', task: 'Go to the Gym', comment: 'why is bro kinda huge', highlighted: true },
  { avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=face', name: 'Marco', time: '5h ago', category: 'Fitness', task: 'Go to the Gym', comment: 'truly LOCKED IN', highlighted: false },
  { avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop&crop=face', name: 'Lena', time: '6h ago', category: 'Cooking', task: 'Try a new recipe', comment: 'spicy and flavorful vibes', highlighted: true },
  { avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=80&h=80&fit=crop&crop=face', name: 'Devon', time: '7h ago', category: 'Travel', task: 'Plan a weekend trip', comment: 'need some fresh air fr', highlighted: false },
  { avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop&crop=face', name: 'Nina', time: '8h ago', category: 'Productivity', task: 'Clear inbox to zero', comment: 'impossible but she did it', highlighted: true },
  { avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=80&h=80&fit=crop&crop=face', name: 'Amir', time: '9h ago', category: 'Wellness', task: 'Meditate for 10 minutes', comment: 'actually felt so calm after', highlighted: false },
  { avatar: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=80&h=80&fit=crop&crop=face', name: 'Chloe', time: '10h ago', category: 'Social', task: 'Catch up with old friend', comment: 'we laughed for 2 hours straight', highlighted: false },
  { avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=80&h=80&fit=crop&crop=face', name: 'Ray', time: '11h ago', category: 'Study', task: 'Finish problem set 4', comment: 'never thought id say this but it was fun', highlighted: true },
]

function KudosCardComponent({ card }: { card: KudosCard }) {
  return (
    <div
      className="shrink-0 flex items-center gap-3 transition-opacity duration-500"
      style={{ opacity: card.highlighted ? 1 : 0.2 }}
    >
      {/* Avatar + name */}
      <div className="flex flex-col items-center shrink-0" style={{ width: '48px' }}>
        <div className="w-[56px] h-[56px] rounded-full overflow-hidden">
          <img src={card.avatar} alt="" className="w-full h-full object-cover" loading="lazy" />
        </div>
        <span className="font-outfit text-[13px] text-black mt-1 text-center whitespace-nowrap">{card.name}</span>
        <span className="font-outfit text-[11px] text-gray-400">{card.time}</span>
      </div>
      {/* Comment card */}
      <div className="bg-[#f7f7f8] rounded-[14px] px-5 py-4" style={{ minWidth: '260px' }}>
        <p className="font-outfit text-[16px] leading-[1.3] whitespace-nowrap">
          <span className="text-primary font-medium">{card.category}</span>
          <span className="text-gray-300 mx-1">•</span>
          <span className="text-black">{card.task}</span>
        </p>
        <p className="font-outfit text-[16px] text-gray-500 mt-1 whitespace-nowrap">{card.comment}</p>
      </div>
    </div>
  )
}

function LabeledBelt({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="relative">
      {children}
      {/* Left gradient overlay with label */}
      <div
        className="absolute left-0 top-0 bottom-0 flex items-center z-10 pointer-events-none"
        style={{ width: '240px' }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to right, white 30%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0.5) 75%, transparent 100%)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            maskImage: 'linear-gradient(to right, black 40%, black 60%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, black 40%, black 60%, transparent 100%)',
          }}
        />
        <p className="relative z-10 font-outfit font-medium text-black tracking-[-0.48px] text-[20px] pl-6">
          {label}
        </p>
      </div>
      {/* Right gradient fade */}
      <div
        className="absolute right-0 top-0 bottom-0 z-10 pointer-events-none"
        style={{
          width: '120px',
          background: 'linear-gradient(to left, white 10%, transparent 100%)',
        }}
      />
    </div>
  )
}

export function MotivationSection() {
  const scale = useResponsiveScale()
  const isMobile = useIsMobile()

  return (
    <section className="relative w-full bg-white overflow-hidden" style={{ padding: isMobile ? '64px 0' : `${scale(96)} 0` }}>
      {/* Decorative shape */}
      {!isMobile && (
        <motion.div
          className="absolute pointer-events-none"
          style={{ right: scale(100), top: scale(80), width: scale(45), height: scale(45), opacity: 0.1, filter: 'drop-shadow(0 0 12px rgba(133, 77, 255, 0.4))' }}
          animate={{ rotate: [30, 390] }}
          transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
        >
          <svg className="block size-full" fill="none" viewBox="0 0 46.0422 43.7887">
            <path d={decorativeShapes.filledStar} fill="var(--color-primary)" fillOpacity="0.6" stroke="var(--color-primary)" strokeWidth="0.9" />
          </svg>
        </motion.div>
      )}
      <div style={{ padding: isMobile ? '0 16px' : `0 ${scale(64)}` }}>
        {isMobile ? (
          <>
            <div>
              <p className="font-outfit font-normal capitalize leading-[1.25] text-black tracking-[-0.48px] text-[28px]">
                You've tried every productivity app.
              </p>
              <p className="font-outfit font-normal capitalize leading-[1.25] tracking-[-0.48px] text-[28px]">
                <span className="text-black">You never changed. </span>
                <span className="text-text-subtle">its not because organization was the problem. Its because of motivation and accountability</span>
              </p>
            </div>
            <div className="bg-primary" style={{ height: '3px', width: '150px', marginTop: '24px' }} />
            <p className="font-outfit text-black mt-4" style={typography.sectionBody.mobile}>
              Because doing it alone was never actually the plan. The best version of you is built with the people around you.
            </p>
          </>
        ) : (
          <div className="grid grid-cols-12 gap-x-[20px]">
            <div className="col-span-7">
              <p className="font-outfit font-normal capitalize leading-[1.25] text-black tracking-[-0.48px]" style={{ fontSize: scale(48) }}>
                You've tried every productivity app.
              </p>
              <p className="font-outfit font-normal capitalize leading-[1.25] tracking-[-0.48px]" style={{ fontSize: scale(48) }}>
                <span className="text-black">You never changed. </span>
                <span className="text-text-subtle">its not because organization was the problem. Its because of motivation and accountability</span>
              </p>
              <div className="bg-primary" style={{ height: '3px', width: scale(200), marginTop: scale(24) }} />
            </div>
            <div className="col-span-1" />
            <div className="col-span-4 flex flex-col justify-end">
              <div className="bg-primary" style={{ height: '3px', width: scale(200), marginBottom: scale(16) }} />
              <p className="font-outfit text-black" style={typography.sectionBody.desktop}>
                Because doing it alone was never actually the plan. The best version of you is built with the people around you.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col" style={{ marginTop: isMobile ? '40px' : scale(120), gap: isMobile ? '16px' : scale(20) }}>
        {/* Encouragements belt (top) */}
        <LabeledBelt label="Encouragements">
          <ConveyorBelt speed={30}>
            <div className="flex gap-[28px] items-center px-[260px]">
              {ENCOURAGEMENTS.map((card, i) => (
                <KudosCardComponent key={i} card={card} />
              ))}
            </div>
          </ConveyorBelt>
        </LabeledBelt>

        {/* Original image conveyor belt (middle) */}
        <ConveyorBelt speed={50}>
          <div className="flex gap-[23px] items-center">
            {BELT_IMAGES.map((img, i) => (
              <div key={i} className="shrink-0 rounded-[8px] overflow-hidden" style={{ width: isMobile ? '200px' : scale(img.width), height: isMobile ? '200px' : scale(img.height) }}>
                <img src={img.src} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </ConveyorBelt>

        {/* Congratulations belt (bottom) — reverse */}
        <LabeledBelt label="Congratulations">
          <ConveyorBelt speed={25} reverse>
            <div className="flex gap-[28px] items-center px-[260px]">
              {CONGRATULATIONS.map((card, i) => (
                <KudosCardComponent key={i} card={card} />
              ))}
            </div>
          </ConveyorBelt>
        </LabeledBelt>
      </div>
    </section>
  )
}
