import { DotGrid } from '../components/DotGrid'

/**
 * Positive feedback loops — Figma nodes 8755:318 / 8755:319 / 8762:677 / 8789:710.
 * Big two-line Fraunces headline with the italic violet "fun", a short body
 * column, and two decorative violet halftone dot panels bleeding off the
 * right and left edges below the copy. Static, desktop-first.
 */
export function FeedbackSection() {
  return (
    <section className="relative w-full overflow-hidden bg-page min-h-[min(1089px,63.02vw)]">
      {/* Decorative violet dot panels */}
      <DotGrid
        variant="violet"
        className="left-[56.54%] top-[min(428px,24.77vw)] h-[min(402px,23.26vw)] w-[39.76%]"
      />
      <DotGrid
        variant="violet"
        className="r-hide-mobile left-[-5.9%] top-[min(643px,37.21vw)] h-[min(402px,23.26vw)] w-[39.76%]"
      />

      <div className="grid7 relative pt-[clamp(64px,9.09vw,157px)]">
        {/* Heading */}
        <h2 className="t-display col-span-6 col-start-1 text-ink max-w-[min(1286px,74.42vw)]">
          Positive feedback loops featuring your
          <br />
          close friends make productivity <span className="t-accent">fun</span>
        </h2>

        {/* Body */}
        <p className="t-body col-span-3 col-start-1 mt-[clamp(24px,3.7vw,64px)] max-w-[min(674px,39vw)]">
          Traditional tools focus on organization, yet, the reason you don&rsquo;t
          do things is because of emotion. I mean, think about it- its rare
          that you didn&rsquo;t know what to do. It&rsquo;s that in the moment, you
          didn&rsquo;t want to.&nbsp; Then the shame of missing a day stopped you
          forever.
        </p>
      </div>
    </section>
  )
}
