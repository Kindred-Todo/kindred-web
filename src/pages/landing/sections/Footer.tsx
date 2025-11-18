import { columnStart, columns } from '@/lib/design-system'
import { useResponsiveScale, useIsMobile } from '@/hooks/useResponsiveScale'
import logo from '@/assets/logo.svg'

export function Footer() {
  const scale = useResponsiveScale()
  const isMobile = useIsMobile()

  return (
    <footer 
      className="w-full"
      style={{
        backgroundColor: '#13121A',
        paddingTop: scale(isMobile ? 64 : 96),
        paddingBottom: scale(isMobile ? 64 : 96),
        paddingLeft: isMobile ? '16px' : '64px',
        paddingRight: isMobile ? '16px' : '64px',
      }}
    >
      <div 
        className="flex flex-col max-w-[1600px] mx-auto"
        style={{
          gap: scale(isMobile ? 32 : 64),
        }}
      >
        {/* Top row - Logo and Main Links */}
        <div 
          className="flex flex-col md:flex-row md:justify-between md:items-start"
          style={{
            gap: scale(isMobile ? 24 : 48),
          }}
        >
          {/* Logo */}
          <div className="flex items-center gap-4">
            <img 
              src={logo} 
              alt="Kindred" 
              className="object-contain"
              style={{
                width: scale(isMobile ? 48 : 64),
                height: scale(isMobile ? 48 : 64),
              }}
            />
            <span 
              className="font-fraunces font-light text-white italic"
              style={{
                fontSize: scale(isMobile ? 28 : 36),
                letterSpacing: scale(isMobile ? -0.56 : -0.72),
                fontVariationSettings: "'SOFT' 0, 'WONK' 0.78, 'opsz' 144",
              }}
            >
              kindred
            </span>
          </div>

          {/* Navigation columns */}
          <div className="grid grid-cols-2 md:flex md:flex-row gap-8 md:gap-24">
            {/* Product */}
            <div className="flex flex-col gap-3">
              <h3 
                className="font-outfit font-medium text-white mb-1"
                style={{
                  fontSize: scale(isMobile ? 16 : 18),
                  letterSpacing: scale(isMobile ? -0.16 : -0.18),
                }}
              >
                Product
              </h3>
              <a 
                href="#"
                className="font-outfit font-light text-white/40 cursor-not-allowed"
                style={{
                  fontSize: scale(isMobile ? 14 : 16),
                  letterSpacing: scale(isMobile ? -0.14 : -0.16),
                }}
              >
                Features
              </a>
              <a 
                href="#"
                className="font-outfit font-light text-white/40 cursor-not-allowed"
                style={{
                  fontSize: scale(isMobile ? 14 : 16),
                  letterSpacing: scale(isMobile ? -0.14 : -0.16),
                }}
              >
                Pricing
              </a>
              <a 
                href="#"
                className="font-outfit font-light text-white/40 cursor-not-allowed"
                style={{
                  fontSize: scale(isMobile ? 14 : 16),
                  letterSpacing: scale(isMobile ? -0.14 : -0.16),
                }}
              >
                FAQ
              </a>
            </div>

            {/* Company */}
            <div className="flex flex-col gap-3">
              <h3 
                className="font-outfit font-medium text-white mb-1"
                style={{
                  fontSize: scale(isMobile ? 16 : 18),
                  letterSpacing: scale(isMobile ? -0.16 : -0.18),
                }}
              >
                Company
              </h3>
              <a 
                href="/team"
                className="font-outfit font-light text-white/70 hover:text-white transition-colors"
                style={{
                  fontSize: scale(isMobile ? 14 : 16),
                  letterSpacing: scale(isMobile ? -0.14 : -0.16),
                }}
              >
                Team
              </a>
              <a 
                href="mailto:hello@kindred.to"
                className="font-outfit font-light text-white/70 hover:text-white transition-colors"
                style={{
                  fontSize: scale(isMobile ? 14 : 16),
                  letterSpacing: scale(isMobile ? -0.14 : -0.16),
                }}
              >
                Contact
              </a>
              <a 
                href="#"
                className="font-outfit font-light text-white/40 cursor-not-allowed"
                style={{
                  fontSize: scale(isMobile ? 14 : 16),
                  letterSpacing: scale(isMobile ? -0.14 : -0.16),
                }}
              >
                Careers
              </a>
            </div>

            {/* Download */}
            <div className="flex flex-col gap-3">
              <h3 
                className="font-outfit font-medium text-white mb-1"
                style={{
                  fontSize: scale(isMobile ? 16 : 18),
                  letterSpacing: scale(isMobile ? -0.16 : -0.18),
                }}
              >
                Download
              </h3>
              <a 
                href="#"
                className="font-outfit font-light text-white/40 cursor-not-allowed"
                style={{
                  fontSize: scale(isMobile ? 14 : 16),
                  letterSpacing: scale(isMobile ? -0.14 : -0.16),
                }}
              >
                iOS
              </a>
              <a 
                href="#"
                className="font-outfit font-light text-white/40 cursor-not-allowed"
                style={{
                  fontSize: scale(isMobile ? 14 : 16),
                  letterSpacing: scale(isMobile ? -0.14 : -0.16),
                }}
              >
                Android
              </a>
              <a 
                href="#"
                className="font-outfit font-light text-white/40 cursor-not-allowed"
                style={{
                  fontSize: scale(isMobile ? 14 : 16),
                  letterSpacing: scale(isMobile ? -0.14 : -0.16),
                }}
              >
                Web
              </a>
            </div>

            {/* Legal */}
            <div className="flex flex-col gap-3">
              <h3 
                className="font-outfit font-medium text-white mb-1"
                style={{
                  fontSize: scale(isMobile ? 16 : 18),
                  letterSpacing: scale(isMobile ? -0.16 : -0.18),
                }}
              >
                Legal
              </h3>
              <a 
                href="#"
                className="font-outfit font-light text-white/40 cursor-not-allowed"
                style={{
                  fontSize: scale(isMobile ? 14 : 16),
                  letterSpacing: scale(isMobile ? -0.14 : -0.16),
                }}
              >
                Privacy
              </a>
              <a 
                href="#"
                className="font-outfit font-light text-white/40 cursor-not-allowed"
                style={{
                  fontSize: scale(isMobile ? 14 : 16),
                  letterSpacing: scale(isMobile ? -0.14 : -0.16),
                }}
              >
                Terms
              </a>
            </div>
          </div>
        </div>

        {/* Bottom row - Copyright and Social */}
        <div 
          className="flex flex-col md:flex-row md:justify-between md:items-center pt-6 md:pt-8 border-t border-white/10"
          style={{
            gap: scale(isMobile ? 16 : 24),
          }}
        >
          <div 
            className="font-outfit font-light text-white/40"
            style={{
              fontSize: scale(isMobile ? 13 : 16),
              letterSpacing: scale(isMobile ? -0.13 : -0.16),
            }}
          >
            © 2024 Kindred. All rights reserved.
          </div>
          
          {/* Social links - disabled for now */}
          <div className="flex gap-6">
            <a 
              href="#"
              className="font-outfit font-light text-white/40 cursor-not-allowed"
              style={{
                fontSize: scale(isMobile ? 13 : 16),
                letterSpacing: scale(isMobile ? -0.13 : -0.16),
              }}
            >
              Twitter
            </a>
            <a 
              href="#"
              className="font-outfit font-light text-white/40 cursor-not-allowed"
              style={{
                fontSize: scale(isMobile ? 13 : 16),
                letterSpacing: scale(isMobile ? -0.13 : -0.16),
              }}
            >
              Instagram
            </a>
            <a 
              href="#"
              className="font-outfit font-light text-white/40 cursor-not-allowed"
              style={{
                fontSize: scale(isMobile ? 13 : 16),
                letterSpacing: scale(isMobile ? -0.13 : -0.16),
              }}
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

