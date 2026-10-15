import { HeroSection } from './sections/HeroSection'
import { StatementSection } from './sections/StatementSection'
import { FeedbackSection } from './sections/FeedbackSection'
import { FunSection } from './sections/FunSection'
import { TestimonialSection } from './sections/TestimonialSection'
import { FeaturesSection } from './sections/FeaturesSection'
import { ScienceSection } from './sections/ScienceSection'
import { RingsSection } from './sections/RingsSection'

/**
 * Landing redesign — Figma "Kindred" › Desktop Website (8755:304).
 * Composed top to bottom; each section owns its own file and layout.
 */
export default function RedesignLanding() {
  return (
    <main className="w-full bg-page">
      <HeroSection />
      {/* The cyclist rides over the statement and is the transition out of it. */}
      <StatementSection />
      <FeedbackSection />
      <FunSection />
      <TestimonialSection />
      <FeaturesSection />
      <ScienceSection />
      <RingsSection />
    </main>
  )
}
