import { createFileRoute } from '@tanstack/react-router'
import { Toaster } from '@/components/ui/sonner'
import TopNav from '@/components/topnav'
import RedesignLanding from '@/pages/landing/redesign/RedesignLanding'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="w-full min-h-screen">
      <TopNav />
      <Toaster />
      <RedesignLanding />
    </div>
  )
}
