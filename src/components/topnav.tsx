import { SheetTrigger } from '@/components/ui/sheet'
import { scale, columnStart, typography } from '@/lib/design-system'
import { Link, useLocation } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

export default function TopNav() {
  const location = useLocation()
  const isHome = location.pathname === '/'
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Transition point: 90% of viewport height or smaller threshold?
      // User said "when we're on the hero", which usually means the top section.
      // If sticky, as soon as we leave the top area (or start overlapping other content), it should likely change.
      // However, the hero is 100vh. So "on the hero" means < 100vh.
      // But if it's sticky, and text is white, it might be unreadable if the next section is white and we haven't switched yet.
      // So we should switch when we are about to leave the hero.
      setIsScrolled(window.scrollY > window.innerHeight - 100)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Check initial
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isLightMode = isHome && !isScrolled

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-0 py-6 md:py-0 transition-all duration-300",
        !isLightMode && "bg-white/60 backdrop-blur-sm border-b border-white/20 shadow-sm supports-[backdrop-filter]:bg-white/30"
      )}
      style={{ 
        paddingLeft: columnStart(1),
        paddingRight: columnStart(1),
        paddingTop: isLightMode ? scale(33) : scale(16),
        paddingBottom: isLightMode ? 0 : scale(24),
        height: isLightMode ? scale(82) : 'auto'
      }}
    >
      {/* Logo/Brand - aligned with grid column 1 */}
      <div 
        className={cn(
          "hidden md:block font-outfit font-light leading-normal transition-colors duration-300",
          isLightMode ? "text-white" : "text-[#13121f]"
        )}
        style={typography.body.desktop}
      >
        kindred
      </div>
      
      {/* Mobile: hide the button */}
      <div className="md:hidden">
        {/* Empty div to maintain layout */}
      </div>
      
      {/* Desktop: show team, about and coming soon - aligned with grid column 7 (right edge) */}
      <div className="hidden md:flex items-center" style={{ gap: scale(20) }}>
        <Link to="/team">
          <div 
            className={cn(
              "font-outfit font-light rounded-[40px] cursor-pointer hover:bg-gray-50/10 transition-colors leading-normal",
              isLightMode ? "text-white hover:bg-white/10" : "text-[#13121f] hover:bg-gray-50"
            )}
            style={{ 
              ...typography.body.desktop,
              padding: `${scale(12)} ${scale(24)}` 
            }}
          >
            team
          </div>
        </Link>
        <div 
          className={cn(
            "font-outfit font-light rounded-[40px] cursor-pointer transition-colors leading-normal",
            isLightMode ? "text-white hover:bg-white/10" : "text-[#13121f] hover:bg-gray-50"
          )}
          style={{ 
            ...typography.body.desktop,
            padding: `${scale(12)} ${scale(24)}` 
          }}
        >
          about
        </div>
        <SheetTrigger asChild>
          <button 
            className={cn(
              "font-outfit font-light rounded-[40px] border transition-colors leading-normal",
              isLightMode ? "text-white border-white hover:bg-white/10" : "text-[#13121f] border-black hover:bg-gray-50"
            )}
            style={{ 
              ...typography.body.desktop,
              padding: `${scale(12)} ${scale(24)}` 
            }}
          >
            coming soon
          </button>
        </SheetTrigger>
      </div>
    </nav>
  )
}
