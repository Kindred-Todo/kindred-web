import { useRef, useState, useEffect } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  MotionValue,
} from 'framer-motion'
import { useResponsiveScale, useIsMobile } from '@/hooks/useResponsiveScale'
import kudosPostImage from '@/assets/new-design/kudos-post-image.png'
import avatarAbhik from '@/assets/new-design/avatar-abhik.png'
import avatarSophia from '@/assets/new-design/avatar-sophia.png'
import avatarMarcus from '@/assets/new-design/avatar-marcus.png'
import avatarPriya from '@/assets/new-design/avatar-priya.png'
import avatarJordan from '@/assets/new-design/avatar-jordan.png'

function useIsLargeDesktop() {
  const [isLarge, setIsLarge] = useState(false)
  useEffect(() => {
    const check = () => setIsLarge(window.innerWidth >= 1200)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])
  return isLarge
}

function AnimatedCount({ value }: { value: MotionValue<number> }) {
  const [display, setDisplay] = useState(0)
  useMotionValueEvent(value, 'change', (v) => setDisplay(Math.round(v)))
  return <>{display}</>
}

function ReactionPill({
  emoji,
  count,
  active = false,
}: {
  emoji: string
  count: React.ReactNode
  active?: boolean
}) {
  return (
    <div
      className="flex items-center gap-[6px] rounded-full font-outfit font-light"
      style={{
        paddingLeft: 9,
        paddingRight: 11,
        paddingTop: 4,
        paddingBottom: 4,
        background: active ? '#543596' : '#996daa',
        border: active ? '1.4px solid #854dff' : 'none',
      }}
    >
      <span className="text-[20px] leading-none size-[21px] flex items-center justify-center">
        {emoji}
      </span>
      <span className="text-[15px] text-white leading-none">{count}</span>
    </div>
  )
}

function AddPill() {
  return (
    <div
      className="flex items-center justify-center rounded-full"
      style={{ background: '#996daa', padding: '4px 9px' }}
    >
      <span className="text-[20px] text-white leading-none font-outfit font-light">
        +
      </span>
    </div>
  )
}

function CommentCard({
  name,
  time,
  text,
  avatar,
  style,
}: {
  name: string
  time: string
  text: string
  avatar: string
  style?: React.CSSProperties
}) {
  return (
    <div
      className="rounded-lg flex gap-3 items-start"
      style={{
        padding: '20px 20px 16px',
        boxShadow: '0px 4px 6px rgba(0,0,0,0.1)',
        background: '#ffffff',
        ...style,
      }}
    >
      <img
        src={avatar}
        alt=""
        className="rounded-full shrink-0 object-cover"
        style={{ width: 35, height: 35 }}
      />
      <div className="flex flex-col" style={{ width: 261 }}>
        <div className="flex items-center">
          <span className="font-outfit font-light text-[14px] text-[#13121f] flex-1">
            {name}
          </span>
          <span className="font-outfit font-light text-[11px] text-[#838383]">
            {time}
          </span>
        </div>
        <p className="font-outfit font-light text-[14px] text-[#13121f]">
          {text}
        </p>
        <span className="font-outfit font-light text-[11px] text-[#838383]">
          Reply
        </span>
      </div>
    </div>
  )
}

function ActivityCard() {
  return (
    <div className="flex gap-6 items-start" style={{ width: 381 }}>
      <div
        className="flex flex-col gap-2 items-start justify-center shrink-0"
        style={{ filter: 'drop-shadow(0px 1px 2px rgba(0,0,0,0.1))' }}
      >
        <img
          src={avatarSophia}
          alt=""
          className="rounded-full object-cover"
          style={{ width: 48, height: 48 }}
        />
        <div className="font-outfit font-normal whitespace-nowrap">
          <p className="text-[14px] text-[#13121f]">Sophia</p>
          <p className="text-[10px] text-[#838383]">30m ago</p>
        </div>
      </div>
      <div
        className="flex-1 min-w-0"
        style={{ filter: 'drop-shadow(0px 1px 2px rgba(0,0,0,0.1))' }}
      >
        <div
          className="rounded-xl overflow-hidden"
          style={{
            padding: '16px 17px 13px 16px',
            boxShadow: '0px 1px 4px rgba(0,0,0,0.1)',
            background: '#ffffff',
          }}
        >
          <div className="flex flex-col gap-3">
            <div className="flex gap-2 items-center">
              <span className="font-outfit font-normal text-[16px] text-[#854dff] tracking-[-0.16px]">
                Watching
              </span>
              <span className="inline-block rounded-full bg-[#854dff] size-1" />
              <span className="font-outfit font-normal text-[16px] text-[#13121f] tracking-[-0.16px]">
                Episode 5 of Stranger Things
              </span>
            </div>
            <p className="font-outfit font-light text-[16px] text-[#13121f]">
              Plot twist blew my mind!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function SparkleIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2L14.09 8.26L20 10L14.09 11.74L12 18L9.91 11.74L4 10L9.91 8.26L12 2Z"
        fill="#13121f"
      />
    </svg>
  )
}

const COMMENTS = [
  { name: 'Sophia', time: '1hr', text: "This is so good, you're killing it!", avatar: avatarSophia },
  { name: 'Marcus', time: '45m', text: 'Need to hear this, share a clip!', avatar: avatarMarcus },
  { name: 'Priya', time: '30m', text: "You've gotten so much better at this", avatar: avatarPriya },
  { name: 'Jordan', time: '15m', text: 'Inspiring me to pick mine up again', avatar: avatarJordan },
] as const

export function KudosSection() {
  const scale = useResponsiveScale()
  const isMobile = useIsMobile()
  const isLargeDesktop = useIsLargeDesktop()
  const sectionRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  // ── Post card: slide in from left ──
  const cardX = useTransform(scrollYProgress, [0.0, 0.15], ['-110%', '0%'])
  const cardOp = useTransform(scrollYProgress, [0.0, 0.1], [0, 1])

  // ── Comments: staggered fade in ──
  const c1Op = useTransform(scrollYProgress, [0.15, 0.22], [0, 1])
  const c2Op = useTransform(scrollYProgress, [0.20, 0.27], [0, 1])
  const c3Op = useTransform(scrollYProgress, [0.25, 0.32], [0, 1])
  const c4Op = useTransform(scrollYProgress, [0.30, 0.37], [0, 1])
  const commentOps = [c1Op, c2Op, c3Op, c4Op]

  // ── Reaction pills in post: scale pop ──
  const pillsScale = useTransform(scrollYProgress, [0.34, 0.44], [0, 1])

  // ── Floating pills: staggered scale pop ──
  const fp1Scale = useTransform(scrollYProgress, [0.38, 0.44], [0, 1])
  const fp2Scale = useTransform(scrollYProgress, [0.40, 0.46], [0, 1])
  const fp3Scale = useTransform(scrollYProgress, [0.42, 0.48], [0, 1])
  const fp4Scale = useTransform(scrollYProgress, [0.44, 0.50], [0, 1])
  const fpScales = [fp1Scale, fp2Scale, fp3Scale, fp4Scale]

  // ── Animated counts ──
  const count1 = useTransform(scrollYProgress, [0.34, 0.48], [0, 4])
  const count2 = useTransform(scrollYProgress, [0.36, 0.50], [0, 3])
  const count3 = useTransform(scrollYProgress, [0.38, 0.52], [0, 1])
  const fCount = useTransform(scrollYProgress, [0.40, 0.52], [0, 4])

  // ── Activity cards: pop in ──
  const act1Op = useTransform(scrollYProgress, [0.50, 0.57], [0, 1])
  const act1Scale = useTransform(scrollYProgress, [0.50, 0.57], [0.8, 1])
  const act2Op = useTransform(scrollYProgress, [0.55, 0.62], [0, 1])
  const act2Scale = useTransform(scrollYProgress, [0.55, 0.62], [0.8, 1])

  // ── Heading: always visible (no animation) ──

  // ── Mobile: static with viewport-enter animations ──
  if (isMobile) {
    return (
      <section className="relative w-full bg-white overflow-hidden" style={{ padding: '64px 16px' }}>
        <div className="flex flex-col gap-10">
          <h2
            className="font-outfit font-normal text-black text-right tracking-[-3px]"
            style={{ fontSize: 40, lineHeight: 1 }}
          >
            Kudos Before
            <br />
            &amp; After
          </h2>
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <MobilePostCard />
          </motion.div>
        </div>
      </section>
    )
  }

  // ── Medium (768–1199): scroll-locked, simplified two-column ──
  if (!isLargeDesktop) {
    return (
      <section ref={sectionRef} className="relative w-full bg-white" style={{ height: '250vh' }}>
        <div
          className="sticky top-0 w-full h-screen overflow-hidden flex items-center"
          style={{ padding: `0 ${scale(64)}` }}
        >
          <div className="flex items-center gap-12 w-full">
            <motion.div style={{ x: cardX, opacity: cardOp, width: '55%', maxWidth: 520, flexShrink: 0 }}>
              <MobilePostCard />
            </motion.div>
            <div className="flex-1 flex flex-col items-end gap-8">
              <h2
                className="font-outfit font-normal text-black text-right tracking-[-3px]"
                style={{
                  fontSize: 'clamp(36px, 4vw, 64px)',
                  lineHeight: 1,
                }}
              >
                Kudos Before
                <br />
                &amp; After
              </h2>
              <motion.div style={{ opacity: c1Op }}>
                <CommentCard {...COMMENTS[0]} />
              </motion.div>
              <motion.div style={{ opacity: act1Op, scale: act1Scale, transformOrigin: 'right center' }}>
                <div style={{ transform: 'rotate(2deg)' }}>
                  <ActivityCard />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // ── Large desktop (≥1200): scroll-locked, full composition ──
  const commentPositions = [
    { left: scale(682), top: scale(100) },
    { left: scale(822), top: scale(221) },
    { left: scale(651), top: scale(354) },
    { left: scale(791), top: scale(487) },
  ]
  const floatingPills = [
    { emoji: '🔥', left: scale(996), top: scale(178), rotate: 0 },
    { emoji: '☕️', left: scale(807), top: scale(302), rotate: 0 },
    { emoji: '😛', left: scale(886), top: scale(435), rotate: 0 },
    { emoji: '🤨', left: scale(762), top: scale(468), rotate: -22.76 },
  ]

  return (
    <section ref={sectionRef} className="relative w-full bg-white" style={{ height: '400vh' }}>
      <div
        className="sticky top-0 w-full h-screen overflow-hidden flex items-center"
        style={{ padding: `0 ${scale(64)}` }}
      >
        <div className="relative w-full" style={{ height: scale(790) }}>
          {/* ── Post card ── */}
          <motion.div
            className="absolute"
            style={{
              left: 0,
              top: scale(49),
              width: scale(516),
              height: scale(741),
              x: cardX,
              opacity: cardOp,
            }}
          >
            <div
              className="flex flex-col gap-3 w-full h-full"
              style={{
                borderBottom: '1.5px solid #f1f1f1',
                boxShadow: '0px 2px 12px rgba(0,0,0,0.1)',
                background: '#ffffff',
                padding: `${scale(30)} 0`,
              }}
            >
              <div className="flex flex-col gap-6 flex-1 min-h-0">
                {/* Header */}
                <div className="flex gap-3 items-center shrink-0" style={{ padding: `0 ${scale(20)}` }}>
                  <img src={avatarAbhik} alt="" className="rounded-full shrink-0 object-cover" style={{ width: scale(35), height: scale(35) }} />
                  <div className="flex-1 min-w-0 flex flex-col gap-[3px]">
                    <p className="font-outfit font-normal text-[#13121f]" style={{ fontSize: scale(16) }}>Abhik Ray</p>
                    <p className="font-outfit font-light text-[#838383]" style={{ fontSize: scale(14) }}>@beak</p>
                  </div>
                  <span className="font-outfit font-light text-[#838383]" style={{ fontSize: scale(11) }}>2h ago</span>
                </div>

                {/* Image */}
                <div className="flex-1 min-h-0">
                  <img src={kudosPostImage} alt="Playing guitar" className="w-full h-full object-cover" />
                </div>

                {/* Categories & congratulate */}
                <div className="flex items-center justify-between shrink-0" style={{ padding: `0 ${scale(20)}` }}>
                  <div className="flex gap-2 items-center">
                    <span className="font-outfit font-normal text-[#854dff] tracking-[-0.16px]" style={{ fontSize: scale(16) }}>Music</span>
                    <span className="inline-block rounded-full bg-[#854dff]" style={{ width: scale(4), height: scale(4) }} />
                    <span className="font-outfit font-normal text-[#13121f] tracking-[-0.16px]" style={{ fontSize: scale(16) }}>Daily Practice</span>
                  </div>
                  <div className="flex gap-3 items-center">
                    <SparkleIcon />
                    <span className="font-outfit font-normal text-[#13121f] tracking-[-0.14px]" style={{ fontSize: scale(14) }}>Congratulate</span>
                  </div>
                </div>
              </div>

              {/* Bottom section */}
              <div className="flex flex-col gap-4 shrink-0" style={{ padding: `0 ${scale(20)}` }}>
                <p className="font-outfit font-normal text-[#13121f]" style={{ fontSize: scale(16) }}>
                  Lowkey just finished jamming on my guitar, learned a few new songs too
                </p>

                {/* Animated reaction pills */}
                <motion.div
                  className="flex gap-2 items-center"
                  style={{ scale: pillsScale, opacity: pillsScale, transformOrigin: 'left center' }}
                >
                  <ReactionPill emoji="🔥" count={<AnimatedCount value={count1} />} active />
                  <ReactionPill emoji="💸" count={<AnimatedCount value={count2} />} />
                  <ReactionPill emoji="😃" count={<AnimatedCount value={count3} />} />
                  <AddPill />
                </motion.div>

                <p className="font-outfit font-normal" style={{ fontSize: scale(14) }}>
                  <span>💬 </span>
                  <span className="text-[#838383]">Leave a comment</span>
                </p>
              </div>
            </div>
          </motion.div>

          {/* ── Floating comments ── */}
          {COMMENTS.map((comment, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                ...commentPositions[i],
                opacity: commentOps[i],
              }}
            >
              <CommentCard {...comment} />
            </motion.div>
          ))}

          {/* ── Floating reaction pills ── */}
          {floatingPills.map((pill, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: pill.left,
                top: pill.top,
                scale: fpScales[i],
                opacity: fpScales[i],
                rotate: pill.rotate,
                transformOrigin: 'center',
              }}
            >
              <ReactionPill emoji={pill.emoji} count={<AnimatedCount value={fCount} />} active />
            </motion.div>
          ))}

          {/* ── Activity card top-right ── */}
          <motion.div
            className="absolute"
            style={{
              left: scale(1165),
              top: 0,
              rotate: 3.02,
              opacity: act1Op,
              scale: act1Scale,
              transformOrigin: 'center',
            }}
          >
            <ActivityCard />
          </motion.div>

          {/* ── Activity card bottom-right ── */}
          <motion.div
            className="absolute"
            style={{
              left: scale(1038),
              top: scale(650),
              rotate: -2.95,
              opacity: act2Op,
              scale: act2Scale,
              transformOrigin: 'center',
            }}
          >
            <ActivityCard />
          </motion.div>

          {/* ── Heading ── */}
          <div
            className="absolute font-outfit font-normal text-black text-right tracking-[-3px]"
            style={{
              right: scale(64),
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: scale(64),
              lineHeight: 1,
            }}
          >
            Kudos Before
            <br />
            &amp; After
          </div>
        </div>
      </div>
    </section>
  )
}

/** Simple static post card for mobile and medium layouts */
function MobilePostCard() {
  return (
    <div
      className="flex flex-col gap-3 w-full"
      style={{
        borderBottom: '1.5px solid #f1f1f1',
        boxShadow: '0px 2px 12px rgba(0,0,0,0.1)',
        background: '#ffffff',
        padding: '30px 0',
      }}
    >
      <div className="flex gap-3 items-center px-5">
        <img src={avatarAbhik} alt="" className="rounded-full shrink-0 object-cover" style={{ width: 35, height: 35 }} />
        <div className="flex-1 min-w-0 flex flex-col gap-[3px]">
          <p className="font-outfit font-normal text-[16px] text-[#13121f]">Abhik Ray</p>
          <p className="font-outfit font-light text-[14px] text-[#838383]">@beak</p>
        </div>
        <span className="font-outfit font-light text-[11px] text-[#838383]">2h ago</span>
      </div>
      <div className="w-full" style={{ height: 400 }}>
        <img src={kudosPostImage} alt="Playing guitar" className="w-full h-full object-cover" />
      </div>
      <div className="flex items-center justify-between px-5">
        <div className="flex gap-2 items-center">
          <span className="font-outfit font-normal text-[16px] text-[#854dff] tracking-[-0.16px]">Music</span>
          <span className="inline-block rounded-full bg-[#854dff] size-1" />
          <span className="font-outfit font-normal text-[16px] text-[#13121f] tracking-[-0.16px]">Daily Practice</span>
        </div>
        <div className="flex gap-3 items-center">
          <SparkleIcon />
          <span className="font-outfit font-normal text-[14px] text-[#13121f] tracking-[-0.14px]">Congratulate</span>
        </div>
      </div>
      <div className="flex flex-col gap-4 px-5">
        <p className="font-outfit font-normal text-[16px] text-[#13121f]">
          Lowkey just finished jamming on my guitar, learned a few new songs too
        </p>
        <div className="flex gap-2 items-center flex-wrap">
          <ReactionPill emoji="🔥" count={4} active />
          <ReactionPill emoji="💸" count={3} />
          <ReactionPill emoji="😃" count={1} />
          <AddPill />
        </div>
        <p className="font-outfit font-normal text-[14px]">
          <span>💬 </span>
          <span className="text-[#838383]">Leave a comment</span>
        </p>
      </div>
    </div>
  )
}
