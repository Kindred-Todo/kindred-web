import { DotGrid } from '../components/DotGrid'

/**
 * Positive feedback loops — Figma nodes 8755:318 / 8755:319 / 8762:677 / 8789:710.
 * Big two-line Fraunces headline with the italic violet "fun", a short body
 * column, and two decorative violet halftone dot panels bleeding off the
 * right and left edges below the copy. Static, desktop-first.
 */
export function FeedbackSection() {
  return (
    <section className="relative w-full overflow-hidden bg-page min-h-[min(1089px,63.02vw)] max-md:pb-[150px]">
      {/* Decorative violet dot panels */}
      <DotGrid
        variant="violet"
        // Phones: a band under the copy instead of behind the headline.
        className="left-[56.54%] top-[min(428px,24.77vw)] h-[min(402px,23.26vw)] w-[39.76%] max-md:top-auto max-md:bottom-6 max-md:left-auto max-md:right-0 max-md:h-[86px] max-md:w-[70%]"
      />
      <DotGrid
        variant="violet"
        className="r-hide-mobile left-[-5.9%] top-[min(643px,37.21vw)] h-[min(402px,23.26vw)] w-[39.76%]"
      />

      <div className="grid7 relative pt-[clamp(64px,9.09vw,157px)] max-md:pt-20">
        {/* Heading */}
        <h2 className="t-display col-span-6 col-start-1 text-ink max-w-[min(1286px,74.42vw)] max-md:max-w-none">
          Positive feedback loops featuring your
          <br className="max-md:hidden" />{' '}
          close friends make productivity <span className="t-accent">fun</span>
        </h2>

        {/* Body */}
        <p className="t-body col-span-3 col-start-1 mt-[clamp(24px,3.7vw,64px)] max-w-[min(674px,39vw)] max-md:mt-6 max-md:max-w-none max-md:leading-[1.45] max-md:tracking-[-0.01em]">
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
