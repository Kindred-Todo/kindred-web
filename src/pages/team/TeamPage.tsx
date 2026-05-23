import { motion } from 'framer-motion'
import { useIsMobile, useResponsiveScale } from '@/hooks/useResponsiveScale'
import { decorativeShapes } from '@/assets/shapes/decorative-shapes'
import beakPhoto from '@/assets/beak.png'
import lokyePhoto from '@/assets/lokye.png'
import mongoLogo from '@/mongo.png'
import klaviyoLogo from '@/assets/klaviyo.png'
import microsoftLogo from '@/assets/microsoft.png'

type LogoChip = { src: string; alt: string }

type TeamMember = {
  name: string
  photo: string
  role: string
  bio: Array<string>
  funFact?: string
  logos: Array<LogoChip>
}

const TEAM: Array<TeamMember> = [
  {
    name: 'Abhik Ray',
    photo: beakPhoto,
    role: 'SWE · MongoDB',
    bio: [
      'Previously a founder building consumer apps.',
      'Director at Generate, Northeastern’s student-run product studio.',
      'CS × Interaction Design — Northeastern University.',
    ],
    funFact: 'Part-time DJ.',
    logos: [
      { src: mongoLogo, alt: 'MongoDB' },
      { src: klaviyoLogo, alt: 'Klaviyo' },
    ],
  },
  {
    name: 'Lok Ye Young',
    photo: lokyePhoto,
    role: 'SWE · Microsoft',
    bio: [
      'Two years designing consumer interfaces.',
      'Software Designer at Generate, Northeastern’s student-run product studio.',
      'CS × Human-Centered Computing — Northeastern University.',
    ],
    logos: [{ src: microsoftLogo, alt: 'Microsoft' }],
  },
]

function TeamMemberCard({
  member,
  index,
  isMobile,
  scale,
}: {
  member: TeamMember
  index: number
  isMobile: boolean
  scale: (value: number) => string
}) {
  const reversed = index % 2 === 1

  return (
    <motion.article
      className="bg-white overflow-hidden shadow-[0px_0px_24px_0px_rgba(0,0,0,0.05)]"
      style={{ borderRadius: isMobile ? 20 : 28 }}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: '-80px' }}
    >
      <div
        className={
          isMobile
            ? 'flex flex-col'
            : `flex ${reversed ? 'flex-row-reverse' : ''}`
        }
      >
        {/* Photo */}
        <div
          className={
            isMobile
              ? 'w-full overflow-hidden'
              : 'overflow-hidden flex-shrink-0'
          }
          style={{
            aspectRatio: isMobile ? '4 / 3' : undefined,
            width: isMobile ? '100%' : 260,
          }}
        >
          <img
            src={member.photo}
            alt={member.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Body */}
        <div
          className={
            isMobile
              ? 'flex flex-col gap-5'
              : 'flex-1 flex flex-col justify-center gap-6'
          }
          style={{
            padding: isMobile ? '32px 24px 36px' : '52px 56px',
          }}
        >
          <div className="flex flex-col gap-3">
            <p className="font-outfit text-primary text-xs uppercase">
              {member.role}
            </p>
            <h2
              className="font-outfit font-normal text-black leading-none tracking-[-0.02em]"
              style={{ fontSize: isMobile ? 32 : 36 }}
            >
              {member.name}
            </h2>
          </div>

          <div className="flex flex-col gap-2">
            {member.bio.map((line) => (
              <p
                key={line}
                className="font-outfit font-[350] text-text-muted leading-[1.5] tracking-[-0.01em]"
                style={{ fontSize: isMobile ? 16 : `clamp(16px, ${scale(18)}, 18px)` }}
              >
                {line}
              </p>
            ))}
          </div>

          {member.funFact && (
            <p
              className="font-outfit font-[350] text-primary leading-[1.4]"
              style={{ fontSize: isMobile ? 16 : `clamp(16px, ${scale(18)}, 18px)` }}
            >
              {member.funFact}
            </p>
          )}

          <div className="flex items-center flex-wrap gap-x-6 gap-y-3 mt-2 pt-5 border-t border-black/10">
            {member.logos.map((logo) => (
              <img
                key={logo.alt}
                src={logo.src}
                alt={logo.alt}
                className="object-contain"
                style={{
                  height: isMobile ? 28 : 36,
                  width: 'auto',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export default function TeamPage() {
  const scale = useResponsiveScale()
  const isMobile = useIsMobile()

  return (
    <div className="w-full bg-white">
      {/* Hero */}
      <section
        className="relative w-full bg-white"
        style={{ padding: isMobile ? '96px 16px 40px' : `${scale(160)} ${scale(64)} ${scale(48)}` }}
      >
        <div
          className="relative bg-surface rounded-[56px] w-full max-w-[1600px] mx-auto overflow-hidden"
          style={{
            padding: isMobile ? '64px 24px' : `${scale(120)} ${scale(64)}`,
          }}
        >
          {/* Decorative dashed star */}
          {!isMobile && (
            <motion.div
              className="absolute pointer-events-none"
              style={{
                top: scale(72),
                right: scale(96),
                width: scale(56),
                height: scale(56),
                opacity: 0.12,
                filter: 'drop-shadow(0 0 14px rgba(133, 77, 255, 0.4))',
              }}
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 38, repeat: Infinity, ease: 'linear' }}
            >
              <svg className="block size-full" fill="none" viewBox="0 0 65.1557 62.234">
                <path
                  d={decorativeShapes.dashedStar}
                  stroke="var(--color-primary)"
                  strokeDasharray="18.04 18.04"
                  strokeWidth="1.8"
                />
              </svg>
            </motion.div>
          )}

          <div
            className="flex flex-col items-center gap-8 text-center mx-auto"
            style={{ maxWidth: isMobile ? '100%' : scale(1086) }}
          >
            <motion.p
              className="font-outfit text-primary text-xs uppercase"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              The Team
            </motion.p>

            <motion.h1
              className="font-outfit font-normal leading-none text-black tracking-[-0.02em]"
              style={{ fontSize: isMobile ? 40 : scale(64) }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              Two builders making the productivity app they actually wanted.
            </motion.h1>

            <motion.p
              className="font-outfit font-[350] text-text-muted leading-[1.2] tracking-[-0.01em]"
              style={{
                fontSize: isMobile ? 16 : `clamp(16px, ${scale(20)}, 20px)`,
                maxWidth: isMobile ? '100%' : scale(720),
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              Kindred is built by a small team of friends who got tired of todo lists that
              didn’t care if you actually finished anything. Here’s who’s behind it.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Team grid */}
      <section
        className="relative w-full bg-white"
        style={{
          padding: isMobile ? '24px 16px 80px' : `${scale(24)} ${scale(64)} ${scale(120)}`,
        }}
      >
        <div
          className="w-full max-w-[960px] mx-auto flex flex-col"
          style={{ gap: isMobile ? 24 : 32 }}
        >
          {TEAM.map((member, index) => (
            <TeamMemberCard
              key={member.name}
              member={member}
              index={index}
              isMobile={isMobile}
              scale={scale}
            />
          ))}
        </div>
      </section>

      {/* Outro */}
      <section
        className="relative w-full bg-white"
        style={{ padding: isMobile ? '32px 16px 96px' : `${scale(24)} ${scale(64)} ${scale(160)}` }}
      >
        <div
          className="relative bg-surface rounded-[40px] w-full max-w-[1600px] mx-auto overflow-hidden text-center"
          style={{
            padding: isMobile ? '48px 24px' : `${scale(96)} ${scale(64)}`,
          }}
        >
          <p className="font-outfit text-primary text-xs uppercase">
            Say hi
          </p>
          <p
            className="font-outfit font-normal leading-none text-black tracking-[-0.02em] mx-auto"
            style={{
              fontSize: isMobile ? 28 : scale(48),
              marginTop: isMobile ? 16 : scale(20),
              maxWidth: isMobile ? '100%' : scale(840),
            }}
          >
            Building this with us, or just want to chat? We read every email.
          </p>
          <a
            href="mailto:kindred@kindredtodo.com"
            className="inline-block font-outfit text-primary underline underline-offset-4"
            style={{
              fontSize: isMobile ? 18 : `clamp(18px, ${scale(22)}, 22px)`,
              marginTop: isMobile ? 24 : scale(32),
              letterSpacing: '-0.01em',
            }}
          >
            kindred@kindredtodo.com
          </a>
        </div>
      </section>
    </div>
  )
}
