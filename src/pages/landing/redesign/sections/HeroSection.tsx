import { DotGrid } from '../components/DotGrid'
import { PillButton } from '../components/PillButton'

/**
 * Hero — Figma node 8755:305.
 * Wordmark, two-line headline and the CTA pair over decorative dot fields.
 * The floating nav is rendered separately by TopNav.
 */
export function HeroSection() {
  return (
    <section className="relative min-h-[min(903px,52.26vw)] w-full overflow-hidden bg-page">
      {/* Decorative dot fields */}
      <DotGrid className="left-[min(-91px,-5.27vw)] top-0 h-[min(311px,18vw)] w-[min(824px,47.69vw)]" />
      <DotGrid
        className="r-hide-mobile left-[min(904px,52.31vw)] top-[min(520px,30.09vw)] h-[min(267px,15.45vw)] w-[min(824px,47.69vw)] opacity-60"
      />

      <div className="grid7 pt-[clamp(140px,13.25vw,229px)]">
        {/* Wordmark */}
        <h1 className="t-wordmark text-ink col-start-2 col-span-2">kindred</h1>

        {/* Headline */}
        <p className="t-hero text-ink col-start-2 col-span-6 mt-[55px] max-w-[min(1363px,78.88vw)]">
          The feel-good productivity platform for aspirational people to follow
          through
        </p>

        {/* CTAs */}
        <div className="col-start-2 col-span-4 mt-[55px] flex gap-[13px] max-md:flex-col max-md:items-stretch">
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
