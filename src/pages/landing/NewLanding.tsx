import logo from '@/assets/logo.svg'
import { scale, columnStart } from '@/lib/design-system'
import { BackgroundShapes } from './sections/BackgroundShapes'
import { HeroSection } from './sections/HeroSection'
import { WhatsDealSection } from './sections/WhatsDealSection'
import { VideoSection } from './sections/VideoSection'
import { ProductivityRewardingSection } from './sections/ProductivityRewardingSection'
import { ScienceSection } from './sections/ScienceSection'
import { EmpowerSection } from './sections/EmpowerSection'
import { PlatformFeaturesSection } from './sections/PlatformFeaturesSection'
import { Footer } from './sections/Footer'
export default function NewLanding() {
  return (
    <div className="bg-[#FFFFFF] w-full overflow-x-hidden">
      {/* Background decorative shapes */}
      <BackgroundShapes />

      {/* Main content */}
      <div className="relative z-10 flex gap-32 md:gap-32 flex-col">
        {/* Logo at bottom left on desktop - aligned with grid column 1 */}
        <div 
          className="hidden md:block absolute" 
          style={{ 
            left: columnStart(1),
            top: scale(1002), 
            width: scale(64), 
            height: scale(64) 
          }}
        >
          <img src={logo} alt="Kindred" className="w-full h-full object-contain" />
        </div>

        {/* Mobile logo at top left */}
        <div className="md:hidden absolute left-4 top-8 w-8 h-8 z-20">
          <img src={logo} alt="Kindred" className="w-full h-full object-contain" />
        </div>

        {/* Hero Section */}
        <HeroSection />

        {/* What's the Deal Section */}
        <WhatsDealSection />

        {/* Video Section */}
        <VideoSection />

        {/* Content that slides over video with parallax */}
        <div 
          className="relative parallax-content" 
          style={{ 
            zIndex: 20,
            marginTop: '-100vh',
            boxShadow: '0 -30px 60px rgba(0, 0, 0, 0.2)',
            willChange: 'transform',
          }}
        >
          <div className="bg-white">
              {/* Productivity Has Never Felt So Rewarding */}
              <ProductivityRewardingSection />

              {/* The Science Section */}
              <ScienceSection />

              {/* Empower Section */}
              <EmpowerSection />

              {/* Platform Features Section */}
              <PlatformFeaturesSection />
          </div>

          {/* Footer */}
          <Footer />
        </div>
      </div>
    </div>
  )
}
