import { colors } from '@/lib/design-system'
import { Link, useLocation } from '@tanstack/react-router'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Menu, X } from 'lucide-react'
import LiquidGlass from 'liquid-glass-react'
import QRCode from 'react-qr-code'
import { cn } from '@/lib/utils'
import { useMobile } from '@/contexts/MobileContext'

const DOWNLOAD_URL = 'https://apps.apple.com/us/app/kindred-todo/id6744142764'

// LiquidGlass sizes itself from the children's intrinsic width (its inner
// `.glass` div is inline-flex). The wrapper, children, and CTA all use this
// formula so the glass stays aligned with the layout.
const PILL_WIDTH = 'min(calc(100vw - 32px), 412px)'
const PILL_TOP_ROW_HEIGHT = 44
const MENU_ITEM_HEIGHT = 46 // 14px padding-top + 18px text + 14px padding-bottom
const MENU_AREA_PADDING_Y = 4
// 1px divider between top row and items + items area + dividers between items
const computeExpandedHeight = (itemCount: number) =>
  PILL_TOP_ROW_HEIGHT +
  1 +
  MENU_AREA_PADDING_Y * 2 +
  MENU_ITEM_HEIGHT * itemCount +
  Math.max(0, itemCount - 1)

type MenuItem =
  | { label: string; to: '/' | '/team'; disabled?: false }
  | { label: string; disabled: true }

const MENU_ITEMS: MenuItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Team', to: '/team' },
  { label: 'About', disabled: true },
]

export default function TopNav() {
  const location = useLocation()
  const isHome = location.pathname === '/'
  const { isMobile } = useMobile()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(!isHome)
  const [menuOpen, setMenuOpen] = useState(false)
  const [qrOpen, setQrOpen] = useState(false)
  const glassContentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      // Reveal the nav once the user has scrolled past the capabilities
      // section. Fall back to the old dark-sections threshold if the section
      // can't be found (e.g. another page that re-uses TopNav).
      const capabilitiesEl = document.getElementById('capabilities-section')
      const threshold = capabilitiesEl
        ? capabilitiesEl.offsetTop + capabilitiesEl.offsetHeight - 100
        : window.innerHeight * 4 - 100
      setIsScrolled(window.scrollY > window.innerHeight - 100)
      setIsVisible(!isHome || window.scrollY > threshold)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isHome])

  useEffect(() => {
    setMenuOpen(false)
    setQrOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = qrOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [qrOpen])

  // liquid-glass-react only re-measures its layered shadows/sheens on
  // window.resize. When the pill expands to reveal the menu, the children's
  // height changes — observe that and fan out fake resize events so the
  // library's layers track the new size.
  useEffect(() => {
    const node = glassContentRef.current
    if (!node) return
    const ro = new ResizeObserver(() => {
      window.dispatchEvent(new Event('resize'))
    })
    ro.observe(node)
    return () => ro.disconnect()
  }, [])

  const isLightMode = isHome && !isScrolled
  const textColor = isLightMode ? colors.text.white : colors.text.primary
  const menuTextColor = isLightMode ? 'rgba(255,255,255,0.92)' : colors.text.primary
  const dividerColor = isLightMode ? 'rgba(255,255,255,0.14)' : 'rgba(19,18,31,0.08)'

  const expandedHeight = computeExpandedHeight(MENU_ITEMS.length)
  const pillHeight = menuOpen ? expandedHeight : PILL_TOP_ROW_HEIGHT
  const pillTransition = { duration: 0.36, ease: [0.22, 1, 0.36, 1] as const }

  return (
    <>
      <nav
        className={cn(
          'fixed left-1/2 z-50 flex -translate-x-1/2 flex-col items-center gap-[10px] transition-all duration-300',
          isVisible ? 'opacity-100 translate-y-0' : 'pointer-events-none -translate-y-full opacity-0',
        )}
        style={{
          top: 16,
          width: PILL_WIDTH,
        }}
        aria-label="Primary navigation"
      >
        {/* The pill itself. LiquidGlass sits absolutely inside this wrapper so
            its 6 internal layers overlap (top:50% + translate(-50%,-50%))
            instead of stacking in flow. The wrapper drives its own height so
            the DownloadButton below sits at the right spot; the LiquidGlass
            children animate the same height so the layered glass tracks. */}
        <motion.div
          animate={{ height: pillHeight }}
          initial={false}
          transition={pillTransition}
          data-pill-expanded={menuOpen}
          style={{ position: 'relative', width: '100%', height: PILL_TOP_ROW_HEIGHT }}
        >
          <LiquidGlass
            cornerRadius={16}
            padding="0"
            // `overLight` stacks bg-black layers on top of the glass to
            // darken it. That defeats the refraction — keep it off so the
            // real liquid-glass texture shows through on every background.
            overLight={false}
            // Lower displacement so the SVG filter doesn't drag dark shadow
            // pixels from outside the pill back into the bottom of the glass
            // (that's what was reading as a black/gray gradient).
            displacementScale={28}
            // blurAmount feeds the library as `blur((overLight ? 12 : 4) + amount*32)px`.
            // 0.10 → ~7px frost when closed, 0.40 → ~17px when expanded.
            blurAmount={menuOpen ? 0.4 : 0.1}
            saturation={menuOpen ? 200 : 160}
            aberrationIntensity={1.2}
            elasticity={0}
            mode="standard"
            // top/left must be set explicitly: the library applies
            // positionStyles (with top/left:50% defaults) to its Fragment
            // shadow/sheen layers, but the central GlassContainer gets the
            // raw baseStyle. Without these, GlassContainer sits at flow
            // origin (0,0) translated -50% while every other layer sits at
            // parent's center translated -50% → a 50%/50% mismatch.
            style={{ position: 'absolute', top: '50%', left: '50%' }}
          >
            <motion.div
              ref={glassContentRef}
              animate={{ height: pillHeight }}
              initial={false}
              transition={pillTransition}
              className="flex flex-col"
              style={{ width: PILL_WIDTH, overflow: 'hidden', height: PILL_TOP_ROW_HEIGHT }}
            >
              <div
                className="flex shrink-0 items-center justify-between"
                style={{ height: PILL_TOP_ROW_HEIGHT, padding: '0 16px' }}
              >
                <Link
                  to="/"
                  className="font-outfit font-normal leading-none transition-colors"
                  style={{
                    fontSize: 20,
                    letterSpacing: '-0.2px',
                    color: textColor,
                  }}
                >
                  kindred
                </Link>
                <button
                  className={cn(
                    'flex items-center justify-center rounded transition-colors',
                    isLightMode ? 'hover:bg-white/15' : 'hover:bg-black/5',
                  )}
                  style={{
                    width: 28,
                    height: 28,
                    color: textColor,
                  }}
                  onClick={() => setMenuOpen(!menuOpen)}
                  aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                  aria-expanded={menuOpen}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {menuOpen ? (
                      <motion.span
                        key="x"
                        initial={{ rotate: -45, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 45, opacity: 0 }}
                        transition={{ duration: 0.18 }}
                        style={{ display: 'inline-flex' }}
                      >
                        <X size={20} strokeWidth={1.8} />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="menu"
                        initial={{ rotate: 45, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -45, opacity: 0 }}
                        transition={{ duration: 0.18 }}
                        style={{ display: 'inline-flex' }}
                      >
                        <Menu size={20} strokeWidth={1.8} />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>

              {/* Items always mounted so the LiquidGlass sees a stable
                  scrollHeight; the OUTER animated height + overflow:hidden
                  handle the reveal, and opacity fades the content in/out. */}
              <motion.div
                animate={{ opacity: menuOpen ? 1 : 0 }}
                initial={false}
                transition={{
                  duration: 0.22,
                  delay: menuOpen ? 0.08 : 0,
                  ease: 'easeOut',
                }}
                style={{
                  borderTop: `1px solid ${dividerColor}`,
                  padding: `${MENU_AREA_PADDING_Y}px 0`,
                  pointerEvents: menuOpen ? 'auto' : 'none',
                }}
              >
                {MENU_ITEMS.map((item, i) => {
                  const itemStyle: React.CSSProperties = {
                    height: MENU_ITEM_HEIGHT,
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: 18,
                    letterSpacing: '-0.2px',
                    padding: '0 20px',
                    borderTop: i === 0 ? 'none' : `1px solid ${dividerColor}`,
                    color: menuTextColor,
                  }
                  if (item.disabled) {
                    return (
                      <div
                        key={item.label}
                        style={{ ...itemStyle, opacity: 0.45 }}
                        className="font-outfit font-normal"
                      >
                        {item.label}
                      </div>
                    )
                  }
                  return (
                    <Link
                      key={item.label}
                      to={item.to}
                      onClick={() => setMenuOpen(false)}
                      style={itemStyle}
                      className={cn(
                        'font-outfit font-normal transition-colors',
                        isLightMode ? 'hover:bg-white/8' : 'hover:bg-black/4',
                      )}
                      tabIndex={menuOpen ? 0 : -1}
                    >
                      {item.label}
                    </Link>
                  )
                })}
              </motion.div>
            </motion.div>
          </LiquidGlass>
        </motion.div>

        <DownloadButton
          isMobile={isMobile}
          onDesktopClick={() => setQrOpen(true)}
        />
      </nav>

      <AnimatePresence>
        {qrOpen && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setQrOpen(false)}
          >
            <motion.div
              className="relative flex flex-col items-center gap-5 bg-white"
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.97 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              style={{
                padding: 32,
                borderRadius: 20,
                boxShadow: '0 32px 80px rgba(19, 18, 31, 0.35)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setQrOpen(false)}
                className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full text-black/60 transition-colors hover:bg-black/5"
                aria-label="Close"
              >
                <X size={18} strokeWidth={2} />
              </button>
              <span
                className="font-outfit font-normal text-black"
                style={{ fontSize: 20, letterSpacing: '-0.2px' }}
              >
                Scan to download
              </span>
              <div
                className="flex items-center justify-center bg-white"
                style={{ padding: 12, borderRadius: 12, border: '1px solid rgba(0,0,0,0.06)' }}
              >
                <QRCode value={DOWNLOAD_URL} size={208} fgColor="#13121f" bgColor="#ffffff" />
              </div>
              <span
                className="font-outfit text-black/55"
                style={{ fontSize: 13, letterSpacing: '-0.13px' }}
              >
                Open camera and point it at the code
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function AppleLogo() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  )
}

function DownloadButton({
  isMobile,
  onDesktopClick,
}: {
  isMobile: boolean
  onDesktopClick: () => void
}) {
  const sharedStyle: React.CSSProperties = {
    fontSize: 15,
    height: 40,
    borderRadius: 10,
    background: colors.primary,
    padding: '0 14px 0 14px',
    gap: 10,
  }
  const sharedClass =
    'group inline-flex items-center justify-between font-outfit font-normal text-white'

  if (isMobile) {
    return (
      <motion.a
        href={DOWNLOAD_URL}
        className={sharedClass}
        style={sharedStyle}
        whileTap={{ scale: 0.98 }}
      >
        <AppleLogo />
        <span>Download Now</span>
        <ArrowRight size={15} strokeWidth={2} />
      </motion.a>
    )
  }

  return (
    <motion.button
      type="button"
      onClick={onDesktopClick}
      className={sharedClass}
      style={sharedStyle}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
    >
      <AppleLogo />
      <span>Download Now</span>
      <ArrowRight size={15} strokeWidth={2} />
    </motion.button>
  )
}
