import { scale, columnStart, typography } from '@/lib/design-system'
import { Link, useLocation } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

export default function TopNav() {
  const location = useLocation()
  const isHome = location.pathname === '/'
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(!isHome)

  useEffect(() => {
    const handleScroll = () => {
      // Hero (100vh) + ScrollReveal (300vh) = 400vh before white sections
      const darkSectionsEnd = window.innerHeight * 4
      setIsScrolled(window.scrollY > window.innerHeight - 100)
      setIsVisible(!isHome || window.scrollY > darkSectionsEnd - 100)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isHome])

  const isLightMode = isHome && !isScrolled

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-0 py-6 md:py-0 transition-all duration-300",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none",
        isLightMode
          ? "bg-black/10 backdrop-blur-sm rounded-full mx-[62px] mt-[58px]"
          : "bg-white/60 backdrop-blur-sm border-b border-white/20 shadow-sm supports-[backdrop-filter]:bg-white/30"
      )}
      style={{
        paddingLeft: isLightMode ? scale(24) : columnStart(1),
        paddingRight: isLightMode ? scale(24) : columnStart(1),
        paddingTop: isLightMode ? scale(12) : scale(16),
        paddingBottom: isLightMode ? scale(12) : scale(24),
      }}
    >
      <Link to="/">
        <div
          className={cn(
            "hidden md:block font-outfit font-light leading-normal transition-colors duration-300 cursor-pointer",
            isLightMode ? "text-white" : "text-dark-bg"
          )}
          style={typography.body.desktop}
        >
          kindred
        </div>
      </Link>

      <div className="md:hidden" />

      <div className="hidden md:flex items-center" style={{ gap: scale(20) }}>
        <Link to="/team">
          <div
            className={cn(
              "font-outfit font-light rounded-[40px] cursor-pointer hover:bg-gray-50/10 transition-colors leading-normal",
              isLightMode ? "text-white hover:bg-white/10" : "text-dark-bg hover:bg-gray-50"
            )}
            style={{ ...typography.body.desktop, padding: `${scale(12)} ${scale(24)}` }}
          >
            team
          </div>
        </Link>
        <div
          className={cn(
            "font-outfit font-light rounded-[40px] cursor-pointer transition-colors leading-normal",
            isLightMode ? "text-white hover:bg-white/10" : "text-dark-bg hover:bg-gray-50"
          )}
          style={{ ...typography.body.desktop, padding: `${scale(12)} ${scale(24)}` }}
        >
          about
        </div>
        <a
          href="#"
          className={cn(
            "font-outfit font-light leading-normal transition-colors",
            isLightMode ? "text-primary" : "text-primary"
          )}
          style={{ ...typography.body.desktop, padding: `${scale(12)} ${scale(24)}` }}
        >
          Download
        </a>
      </div>
    </nav>
  )
}
