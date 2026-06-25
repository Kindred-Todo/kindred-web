import { HeroSection } from './sections/HeroSection'
import { ScrollRevealSection } from './sections/ScrollRevealSection'
import { CapabilitiesSection } from './sections/CapabilitiesSection'
import { EveryoneWinsSection } from './sections/EveryoneWinsSection'
import { KudosSection } from './sections/KudosSection'
import { RingsSection } from './sections/RingsSection'
import { PrivacySection } from './sections/PrivacySection'
import { MotivationSection } from './sections/MotivationSection'
import { ParallaxGallerySection } from './sections/ParallaxGallerySection'
import { FAQSection } from './sections/FAQSection'
import { Footer } from './sections/Footer'

export default function NewLanding() {
  return (
    <div className="w-full">
      <HeroSection />
      <ScrollRevealSection />
      <ParallaxGallerySection />
      <MotivationSection />
      <EveryoneWinsSection />
      <RingsSection />
      <KudosSection />
      <PrivacySection />
      <CapabilitiesSection />
      <FAQSection />
      <Footer />
    </div>
  )
}
