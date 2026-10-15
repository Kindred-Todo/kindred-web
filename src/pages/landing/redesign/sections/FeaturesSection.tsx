/**
 * Features — Figma node 8755:339 "Four features".
 * Left: four index/title/body rows in one .grid7. Right: two blank placeholder
 * cards, absolutely positioned, overlapping intentionally (B over A's corner).
 * Card A carries feature 01's live waveform while the section is in view.
 */

import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { CaptureWaveform } from '../components/CaptureWaveform'

const FEATURES = [
  {
    index: '01',
    title: 'Capture as fast you can yap',
    body: 'People hated spending time getting lost in their own system, so we made it as easy as possible to just throw in ideas without navigating menus or typing a word — talk it out, and Kindred sorts the rest.',
  },
  {
    index: '02',
    title: 'Kudos at the right time',
    body: 'A cheer lands hardest the second something gets done, not a day later. Kudos catches the moment a friend checks off what mattered and makes sure they hear it.',
  },
  {
    index: '03',
    title: 'In it together',
    body: "Plans are better when they're shared. Build yours side by side, keep each other honest, and never carry the whole week alone.",
  },
  {
    index: '04',
    title: 'Memories & Analytics',
    body: 'Everything you finish becomes something to look back on — patterns, streaks, and the days that made them worth keeping.',
  },
]

export function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  // The waveform "listens" while the section is on screen, rests otherwise.
  const inView = useInView(sectionRef, { margin: '-20% 0px -20% 0px' })

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-page min-h-[min(1259px,72.86vw)] pt-[clamp(56px,7.93vw,137px)] max-md:flex max-md:flex-col max-md:pb-10"
    >
      {/* Feature cards — 01 hosts the capture waveform, B stays blank behind it */}
      <div
        aria-hidden="true"
        className="absolute left-[44.16%] top-[min(153px,8.85vw)] w-[52.14%] h-[min(468px,27.08vw)] rounded-[24px] bg-white shadow-[0_12px_56px_rgba(0,0,0,0.08)] max-md:order-2 max-md:static max-md:mt-10 max-md:h-auto max-md:w-full max-md:aspect-[901/468]"
      >
        <CaptureWaveform
          active={inView}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-md:w-[70%]"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute left-[80.27%] top-[min(393px,22.74vw)] w-[14.64%] h-[min(427px,24.71vw)] rounded-[24px] bg-white shadow-[0_12px_56px_rgba(0,0,0,0.08)] r-hide-mobile"
      />

      {/* Four rows in a single grid so numerals stay aligned with titles */}
      <div className="grid7 relative gap-y-[clamp(40px,3.7vw,64px)] max-md:order-1">
        {FEATURES.map((feature) => (
          <div
            key={feature.index}
            className="col-start-1 col-end-4 row-start-auto grid grid-cols-[subgrid] grid-rows-1 max-md:block"
          >
            <p className="t-index col-start-1 text-ink max-md:mb-3">
              {feature.index}
            </p>
            <div className="col-start-2 col-span-2 flex max-w-[min(417px,24.13vw)] max-md:max-w-none flex-col gap-[16px]">
              <h3 className="t-feature text-ink">{feature.title}</h3>
              <p className="t-small text-copy-dim">{feature.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
