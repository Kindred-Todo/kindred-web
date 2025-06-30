import { createFileRoute } from '@tanstack/react-router'
import { Toaster } from '@/components/ui/sonner'
import LandingCard from '@/pages/landing/LandingCard'
import TopNav from '@/components/topnav'
import ProblemCard from '@/pages/landing/ProblemCard'
import HowItWorks from '@/pages/landing/HowItWorks'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import Waitlist from '@/pages/landing/Waitlist'
import { useMobile } from '@/contexts/MobileContext'
import Privacy from '@/pages/landing/Privacy'
import Footer from '@/components/footer'
import { BentoWrapper } from '@/pages/landing/bento-wrapper'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const { isMobile } = useMobile()

  return (
    <div className="w-screen h-screen overflow-none">
      <Sheet>
        <TopNav />
        <Toaster />
        <div className="w-screen pb-32 md:h-screen">
          <LandingCard />
        </div>
        <div>
          <ProblemCard />
        </div>
        <div className="bg-light-bg">
          <HowItWorks />
        </div>
        <div className="bg-dark-bg">
          <BentoWrapper />
        </div>
        <div className="h-32 bg-dark-bg"> .</div>
        {/* <div>
          <Privacy />
        </div> */}
        <div className="h-96 bg-dark-bg"> .</div>
        <Footer />
        <SheetContent
          side={isMobile ? 'bottom' : 'right'}
          className={`rounded-xl p-12 ${isMobile ? 'h-11/12' : ''}`}
        >
          <Waitlist />
        </SheetContent>
      </Sheet>
    </div>
  )
}
