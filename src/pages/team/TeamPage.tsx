import { motion } from 'framer-motion'
import type { CSSProperties } from 'react'
import { DotGrid } from '@/pages/landing/redesign/components/DotGrid'
import beakPhoto from '@/assets/beak.png'
import lokyePhoto from '@/assets/lokye.png'

/**
 * Team — white page, violet Fraunces and the landing redesign's 7-column grid
 * (`t-*`, `grid7`). The founders take two columns each on the right; the
 * columns to their left carry the story that introduces them.
 *
 * Past the 1728px canvas the grid keeps growing, but its margin grows too —
 * by a quarter of every extra pixel — so wide screens get a gentle, rising
 * gutter instead of either a centred strip or edge-to-edge content. Type
 * stops scaling at 1728 (the `--text-*` clamps), so it never balloons.
 */

const EASE = [0.22, 1, 0.36, 1] as const

const PAGE_GRID = {
  '--grid-max': 'none',
  '--grid-margin':
    'max(clamp(20px, 3.588vw, 62px), calc(62px + (100vw - 1728px) / 4))',
} as CSSProperties

type Fact = { label: string; value: string }

type TeamMember = {
  name: string
  photo: string
  role: string
  facts: Array<Fact>
}

const TEAM: Array<TeamMember> = [
  {
    name: 'Abhik Ray',
    photo: beakPhoto,
    role: 'Co-founder',
    facts: [
      { label: 'Now', value: 'Software engineer at MongoDB' },
      { label: 'Before', value: 'Founder, building consumer apps' },
      { label: 'Generate', value: 'Director at Northeastern’s product studio' },
      { label: 'Studied', value: 'CS × Interaction Design, Northeastern' },
      { label: 'Off hours', value: 'Part-time DJ' },
    ],
  },
  {
    name: 'Lok Ye Young',
    photo: lokyePhoto,
    role: 'Chief Software Designer',
    facts: [
      { label: 'Now', value: 'Software engineer at Microsoft' },
      { label: 'Before', value: 'Two years designing consumer interfaces' },
      { label: 'Generate', value: 'Software designer at Northeastern’s product studio' },
      { label: 'Studied', value: 'CS × Human-Centered Computing, Northeastern' },
    ],
  },
]

function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-page">
      <DotGrid className="r-hide-mobile right-0 top-0 h-[min(311px,18vw)] w-[min(824px,47.69vw)] opacity-60" />

      <div className="grid7 relative pt-[clamp(140px,13.25vw,229px)] pb-[min(140px,8.1vw)] max-md:pt-[120px] max-md:pb-14">
        <motion.p
          className="t-label col-start-1 col-span-3 text-violet"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          The team
        </motion.p>

        <motion.h1
          className="t-display col-start-1 col-span-5 mt-[min(40px,2.31vw)] text-violet max-md:mt-5"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.05, ease: EASE }}
        >
          Two friends building the app they{' '}
          <span className="t-accent">actually</span> wanted.
        </motion.h1>
      </div>
    </section>
  )
}

/** Label / value rows on hairlines — scannable, unlike a run-on bio. */
function Facts({ facts }: { facts: Array<Fact> }) {
  return (
    <dl className="mt-[min(28px,1.62vw)] border-t border-hairline max-md:mt-5">
      {facts.map(({ label, value }) => (
        <div
          key={label}
          className="grid grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)] gap-4 border-b border-hairline py-[min(16px,0.93vw)] max-md:py-3.5"
        >
          <dt className="t-small text-copy-dim">{label}</dt>
          <dd className="t-small text-ink">{value}</dd>
        </div>
      ))}
    </dl>
  )
}

function Member({ member, index }: { member: TeamMember; index: number }) {
  return (
    <motion.article
      className={`${index === 0 ? 'col-start-4' : 'col-start-6'} col-span-2 row-start-1 flex flex-col`}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: EASE }}
      viewport={{ once: true, margin: '-80px' }}
    >
      <img
        src={member.photo}
        alt={member.name}
        draggable={false}
        className="aspect-[4/5] w-full object-cover"
      />
      <h2 className="t-feature mt-[min(32px,1.85vw)] text-ink max-md:mt-6">
        {member.name}
      </h2>
      <p className="t-label mt-2 text-violet">{member.role}</p>
      <Facts facts={member.facts} />
    </motion.article>
  )
}

function Team() {
  return (
    <section className="w-full bg-page pb-[min(200px,11.57vw)] max-md:pb-20">
      <div className="grid7 max-md:gap-y-16">
        {/* The story, held in view beside the founders. */}
        <div className="col-start-1 col-span-3 row-start-1 pr-[min(160px,9.26vw)] max-md:pr-0">
          <div className="sticky top-[160px] max-md:static">
            <p className="t-label text-violet">Why Kindred</p>
            <p className="t-body mt-5 max-w-[560px]">
              We got tired of todo lists that didn’t care whether you finished
              anything. So we built the one that notices, and gets your friends
              to cheer you on when you do.
            </p>
            <p className="t-body mt-4 max-w-[560px]">
              We both came up through Generate, Northeastern’s student-run
              product studio.
            </p>
          </div>
        </div>

        {TEAM.map((member, index) => (
          <Member key={member.name} member={member} index={index} />
        ))}
      </div>
    </section>
  )
}

function Outro() {
  return (
    <section className="relative w-full overflow-hidden bg-page">
      <div className="grid7 pb-[min(180px,10.42vw)] max-md:pb-20">
        <div className="col-start-1 col-span-5 flex flex-col items-start">
          <p className="t-display text-ink">
            Building with us, or just want to <span className="t-accent">chat</span>?
          </p>
          <a
            href="mailto:kindred@kindredtodo.com"
            className="t-label mt-[min(40px,2.31vw)] text-violet underline underline-offset-4 max-md:mt-6"
          >
            kindred@kindredtodo.com
          </a>
        </div>
      </div>
      <div aria-hidden="true" className="h-[min(42px,2.43vw)] w-full bg-violet max-md:h-6" />
    </section>
  )
}

export default function TeamPage() {
  return (
    <main className="w-full bg-page" style={PAGE_GRID}>
      <Hero />
      <Team />
      <Outro />
    </main>
  )
}
