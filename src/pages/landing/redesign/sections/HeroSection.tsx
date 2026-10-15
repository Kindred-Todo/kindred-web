import { DotGrid } from '../components/DotGrid'
import { PillButton } from '../components/PillButton'
import checkLogoSrc from '@/assets/check-logo.svg'

/**
 * Hero — Figma node 8755:305.
 * Wordmark, two-line headline and the CTA pair over decorative dot fields.
 * The floating nav is rendered separately by TopNav.
 */
export function HeroSection() {
  return (
    <section className="relative min-h-[min(903px,52.26vw)] w-full overflow-hidden bg-page max-md:flex max-md:min-h-[100svh] max-md:flex-col">
      {/* Decorative dot fields */}
      {/* On phones the top field would sit under the nav pill, so it moves to
          the foot of the screen behind the CTAs' breathing room. */}
      <DotGrid className="left-[min(-91px,-5.27vw)] top-0 h-[min(311px,18vw)] w-[min(824px,47.69vw)] max-md:top-auto max-md:bottom-0 max-md:left-0 max-md:h-[22svh] max-md:w-full max-md:opacity-50" />
      <DotGrid
        className="r-hide-mobile left-[min(904px,52.31vw)] top-[min(520px,30.09vw)] h-[min(267px,15.45vw)] w-[min(824px,47.69vw)] opacity-60"
      />

      {/* Phones: one column that fills the first screen — wordmark under the
          nav, the headline as the dominant element, CTAs stacked beneath. */}
      <div className="grid7 pt-[clamp(140px,13.25vw,229px)] max-md:relative max-md:flex max-md:flex-1 max-md:flex-col max-md:justify-center max-md:pt-[104px] max-md:pb-[14svh]">
        {/* Wordmark */}
        <h1 className="t-wordmark text-ink col-start-2 col-span-2 max-md:flex max-md:items-center max-md:gap-2 max-md:text-[28px]">
          kindred
          {/* Phones: the Kindred check sits after the wordmark as its mark. */}
          <img
            src={checkLogoSrc}
            alt=""
            draggable={false}
            className="hidden h-[22px] w-[28px] max-md:block"
          />
        </h1>

        {/* Headline */}
        <p className="t-hero text-ink col-start-2 col-span-6 mt-[55px] max-w-[min(1363px,78.88vw)] max-md:mt-5 max-md:max-w-none max-md:text-[clamp(40px,11.4vw,48px)] max-md:leading-[1.04]">
          The feel-good productivity platform for aspirational people to follow
          through
        </p>

        {/* CTAs */}
        <div className="col-start-2 col-span-4 mt-[55px] flex gap-[13px] max-md:mt-10 max-md:flex-col max-md:items-stretch max-md:gap-3">
          <PillButton
            variant="violet"
            href="https://apps.apple.com/us/app/kindred-todo/id6744142764"
          >
            Download Free
          </PillButton>
          <PillButton variant="ghost" href="https://app.kindredtodo.com">
            Try Webapp
          </PillButton>
        </div>
      </div>
    </section>
  )
}
