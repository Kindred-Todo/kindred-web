import { createFileRoute } from '@tanstack/react-router'
import { Toaster } from '@/components/ui/sonner'
import TopNav from '@/components/topnav'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import Waitlist from '@/pages/landing/Waitlist'
import { useMobile } from '@/contexts/MobileContext'
import TeamPage from '@/pages/team/TeamPage'

export const Route = createFileRoute('/team')({
  component: Team,
})

function Team() {
  const { isMobile } = useMobile()

  return (
    <div className="w-screen min-h-screen overflow-x-hidden">
      <Sheet>
        <TopNav />
        <Toaster />
        <TeamPage />
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

