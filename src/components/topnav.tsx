import { scale, columnStart, typography } from '@/lib/design-system'
import { Link, useLocation } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useMobile } from '@/contexts/MobileContext'

export default function TopNav() {
  const location = useLocation()
  const isHome = location.pathname === '/'
  const isMobile = useMobile()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(!isHome)
  const [menuOpen, setMenuOpen] = useState(false)

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

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const isLightMode = isHome && !isScrolled

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-0 py-6 md:py-0 transition-all duration-300",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none",
          isLightMode
            ? "bg-black/10 backdrop-blur-sm rounded-full mx-4 md:mx-[62px] mt-4 md:mt-[58px]"
            : "bg-white/60 backdrop-blur-sm border-b border-white/20 shadow-sm supports-[backdrop-filter]:bg-white/30"
        )}
        style={{
          paddingLeft: isMobile ? '16px' : isLightMode ? scale(24) : columnStart(1),
          paddingRight: isMobile ? '16px' : isLightMode ? scale(24) : columnStart(1),
          paddingTop: isMobile ? '12px' : isLightMode ? scale(12) : scale(16),
          paddingBottom: isMobile ? '12px' : isLightMode ? scale(12) : scale(24),
        }}
      >
        <Link to="/">
          <div
            className={cn(
              "font-outfit font-light leading-normal transition-colors duration-300 cursor-pointer",
              isLightMode ? "text-white" : "text-dark-bg"
            )}
            style={isMobile ? { fontSize: '16px' } : typography.body.desktop}
          >
            kindred
          </div>
        </Link>

        {/* Mobile hamburger */}
        <button
          className={cn(
            "md:hidden flex flex-col justify-center items-center gap-[5px] w-8 h-8 cursor-pointer",
            isLightMode ? "text-white" : "text-dark-bg"
          )}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <motion.span
            className={cn("block w-5 h-[1.5px] rounded-full transition-colors", isLightMode ? "bg-white" : "bg-dark-bg")}
            animate={menuOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className={cn("block w-5 h-[1.5px] rounded-full transition-colors", isLightMode ? "bg-white" : "bg-dark-bg")}
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.15 }}
          />
          <motion.span
            className={cn("block w-5 h-[1.5px] rounded-full transition-colors", isLightMode ? "bg-white" : "bg-dark-bg")}
            animate={menuOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.2 }}
          />
        </button>

        {/* Desktop nav */}
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

      {/* Mobile fullscreen menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-dark-bg/95 backdrop-blur-md flex flex-col items-center justify-center gap-8 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.05, duration: 0.25 }}
            >
              <Link to="/" onClick={() => setMenuOpen(false)}>
                <span className="font-outfit font-light text-white text-[28px] tracking-[-0.5px]">home</span>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.1, duration: 0.25 }}
            >
              <Link to="/team" onClick={() => setMenuOpen(false)}>
                <span className="font-outfit font-light text-white text-[28px] tracking-[-0.5px]">team</span>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.15, duration: 0.25 }}
            >
              <span className="font-outfit font-light text-white/50 text-[28px] tracking-[-0.5px]">about</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.2, duration: 0.25 }}
            >
              <a href="#" onClick={() => setMenuOpen(false)}>
                <span className="font-outfit font-light text-primary text-[28px] tracking-[-0.5px]">Download</span>
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
