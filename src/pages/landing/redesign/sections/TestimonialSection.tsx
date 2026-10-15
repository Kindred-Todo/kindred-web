import avatar from '@/assets/redesign/avatar.png'

/**
 * TestimonialSection — Figma node 8755:320.
 * Oversized violet quotation glyph, 96px Fraunces quote, avatar attribution.
 */
export function TestimonialSection() {
  return (
    <section className="relative w-full bg-white min-h-[min(600px,34.72vw)] max-md:min-h-0 max-md:pt-6 max-md:pb-14 border-t-2 border-b-2 border-hairline">
      <div className="grid7 relative pt-[min(50px,2.89vw)]">
        {/* Quotation glyph */}
        <span
          aria-hidden
          className="absolute col-start-1 top-[min(50px,2.89vw)] max-md:static max-md:mb-[-0.35em] max-md:block max-md:h-[0.75em] max-md:!text-[120px]"
          style={{
            fontFamily: 'var(--font-fraunces)',
            fontSize: 'clamp(96px,14.81vw,256px)',
            lineHeight: 1,
            fontVariationSettings: '"SOFT" 50, "WONK" 1, "opsz" 144',
            color: 'var(--color-violet)',
          }}
        >
          &ldquo;
        </span>

        {/* Quote */}
        <blockquote className="t-quote text-ink col-start-2 col-span-6 max-w-[min(1284px,74.31vw)] max-md:max-w-none max-md:text-[clamp(32px,9.2vw,40px)] max-md:leading-[1.08]">
          Getting kudos tbh is such a great feeling- kinda like Strava or
          Duolingo. I look forward to opening my list now.
        </blockquote>

        {/* Attribution */}
        <div className="col-start-2 col-span-3 flex items-center gap-[min(24px,1.39vw)] mt-[clamp(32px,5.09vw,88px)] max-md:mt-8 max-md:gap-3">
          <img
            src={avatar}
            alt="First, Last"
            className="w-[min(104px,6.02vw)] h-[min(104px,6.02vw)] object-cover max-md:size-12 max-md:rounded-full"
          />
          <div className="flex flex-col gap-[min(3px,0.17vw)] max-md:gap-1">
            <span className="t-label text-ink">First, Last</span>
            <span className="t-label text-copy-dim">Student at Hogwarts</span>
          </div>
        </div>
      </div>
    </section>
  )
}
