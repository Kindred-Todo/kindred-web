import avatar from '@/assets/redesign/avatar.png'

/**
 * TestimonialSection — Figma node 8755:320.
 * Oversized violet quotation glyph, 96px Fraunces quote, avatar attribution.
 */
export function TestimonialSection() {
  return (
    <section className="relative w-full bg-white min-h-[min(600px,34.72vw)] max-md:min-h-0 max-md:py-14 border-t-2 border-b-2 border-hairline">
      <div className="grid7 relative pt-[min(50px,2.89vw)]">
        {/* Quotation glyph */}
        <span
          aria-hidden
          className="absolute col-start-1 top-[min(50px,2.89vw)] max-md:static max-md:block max-md:mb-4"
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
        <blockquote className="t-quote text-ink col-start-2 col-span-6 max-w-[min(1284px,74.31vw)]">
          Getting kudos tbh is such a great feeling- kinda like Strava or
          Duolingo. I look forward to opening my list now.
        </blockquote>

        {/* Attribution */}
        <div className="col-start-2 col-span-3 flex items-center gap-[min(24px,1.39vw)] mt-[clamp(32px,5.09vw,88px)]">
          <img
            src={avatar}
            alt="First, Last"
            className="w-[min(104px,6.02vw)] h-[min(104px,6.02vw)] object-cover"
          />
          <div className="flex flex-col gap-[min(3px,0.17vw)]">
            <span className="t-label text-ink">First, Last</span>
            <span className="t-label text-copy-dim">Student at Hogwarts</span>
          </div>
        </div>
      </div>
    </section>
  )
}
