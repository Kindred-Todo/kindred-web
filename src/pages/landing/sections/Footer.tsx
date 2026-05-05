import { motion } from 'framer-motion'
import { useResponsiveScale, useIsMobile } from '@/hooks/useResponsiveScale'
import checkLogo from '@/assets/check-logo.svg'

export function Footer() {
  const scale = useResponsiveScale()
  const isMobile = useIsMobile()

  return (
    <footer className="w-full bg-dark-bg" style={{ paddingTop: scale(isMobile ? 64 : 96), paddingBottom: scale(isMobile ? 64 : 96), paddingLeft: isMobile ? '16px' : '57px', paddingRight: isMobile ? '16px' : '57px' }}>
      <div className="flex flex-col max-w-[1600px] mx-auto text-white" style={{ gap: scale(isMobile ? 48 : 96) }}>
        {/* CTA Section */}
        <div style={{ maxWidth: isMobile ? '100%' : scale(934) }}>
          <h2 className="font-outfit font-medium capitalize leading-[1.25] text-white tracking-[-1.92px]" style={{ fontSize: isMobile ? '36px' : scale(64) }}>Lets Lock In</h2>
          <p className="font-outfit font-normal capitalize leading-[1.25] text-white tracking-[-0.72px] mt-4" style={{ fontSize: isMobile ? '18px' : scale(24) }}>
            Download Kindred and start building the life you actually want — with the people who want it for you too.
          </p>
          <div className="flex gap-2 mt-6">
            <motion.a href="#" className="px-5 py-3 bg-primary rounded-[12px] font-outfit text-base text-white shadow-[0_0_16px_var(--color-primary-glow)] text-center" style={{ width: isMobile ? '100%' : '247px' }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              Join our Waitlist
            </motion.a>
            <motion.a href="#" className="px-5 py-3 rounded-[12px] font-outfit text-base text-primary border border-primary shadow-[0_0_40px_var(--color-primary-glow)] text-center" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              Contact Us
            </motion.a>
          </div>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col md:flex-row md:justify-end gap-8 md:gap-16">
          <div className="flex flex-col gap-3 md:text-right">
            <p className="font-outfit text-[14px] tracking-[-0.14px]">FOLLOW US</p>
            <a href="#" className="font-outfit text-[16px] tracking-[-0.16px] underline">@kindredtodo</a>
          </div>
          <div className="flex flex-col gap-3 md:text-right">
            <p className="font-outfit text-[14px] tracking-[-0.14px]">CONTACT</p>
            <a href="mailto:kindred@kindredtodo.com" className="font-outfit text-[16px] tracking-[-0.16px] underline">kindred@kindredtodo.com</a>
          </div>
        </div>

        {/* Nav columns */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start border-t border-white/10 pt-8" style={{ gap: scale(isMobile ? 24 : 48) }}>
          <div className="flex flex-row items-center gap-4">
            <img src={checkLogo} alt="Kindred" className="object-contain text-white" style={{ width: scale(isMobile ? 60 : 60), height: scale(isMobile ? 48 : 48) }} />
            <span className="font-fraunces font-normal text-primary" style={{ fontSize: scale(isMobile ? 36 : 48), letterSpacing: scale(isMobile ? -1.8 : -2.4), lineHeight: 1.2, fontVariationSettings: "'SOFT' 0, 'WONK' 1, 'opsz' 80" }}>kindred</span>
          </div>
          <div className="grid grid-cols-2 md:flex md:flex-row gap-8 md:gap-24 justify-center text-white">
            <div className="flex flex-col gap-3">
              <h3 className="font-outfit font-medium text-white mb-1" style={{ fontSize: scale(isMobile ? 16 : 18) }}>Product</h3>
              <a href="#" className="font-outfit font-light text-white/40 cursor-not-allowed" style={{ fontSize: scale(isMobile ? 14 : 16) }}>Features</a>
              <a href="#" className="font-outfit font-light text-white/40 cursor-not-allowed" style={{ fontSize: scale(isMobile ? 14 : 16) }}>Pricing</a>
              <a href="#" className="font-outfit font-light text-white/40 cursor-not-allowed" style={{ fontSize: scale(isMobile ? 14 : 16) }}>FAQ</a>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="font-outfit font-medium text-white mb-1" style={{ fontSize: scale(isMobile ? 16 : 18) }}>Company</h3>
              <a href="/team" className="font-outfit font-light text-white/70 hover:text-white transition-colors" style={{ fontSize: scale(isMobile ? 14 : 16) }}>Team</a>
              <a href="mailto:hello@kindred.to" className="font-outfit font-light text-white/70 hover:text-white transition-colors" style={{ fontSize: scale(isMobile ? 14 : 16) }}>Contact</a>
              <a href="#" className="font-outfit font-light text-white/40 cursor-not-allowed" style={{ fontSize: scale(isMobile ? 14 : 16) }}>Careers</a>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="font-outfit font-medium text-white mb-1" style={{ fontSize: scale(isMobile ? 16 : 18) }}>Download</h3>
              <a href="#" className="font-outfit font-light text-white/40 cursor-not-allowed" style={{ fontSize: scale(isMobile ? 14 : 16) }}>iOS</a>
              <a href="#" className="font-outfit font-light text-white/40 cursor-not-allowed" style={{ fontSize: scale(isMobile ? 14 : 16) }}>Android</a>
              <a href="#" className="font-outfit font-light text-white/40 cursor-not-allowed" style={{ fontSize: scale(isMobile ? 14 : 16) }}>Web</a>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="font-outfit font-medium text-white mb-1" style={{ fontSize: scale(isMobile ? 16 : 18) }}>Legal</h3>
              <a href="#" className="font-outfit font-light text-white/40 cursor-not-allowed" style={{ fontSize: scale(isMobile ? 14 : 16) }}>Privacy</a>
              <a href="#" className="font-outfit font-light text-white/40 cursor-not-allowed" style={{ fontSize: scale(isMobile ? 14 : 16) }}>Terms</a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row md:justify-center md:items-center pt-6 border-t border-white/10" style={{ gap: scale(isMobile ? 16 : 24) }}>
          <div className="font-outfit font-light text-white/40 text-center" style={{ fontSize: scale(isMobile ? 13 : 16) }}>© 2025 Kindred. All rights reserved.</div>
          <div className="flex gap-6 justify-center">
            <a href="#" className="font-outfit font-light text-white/40 cursor-not-allowed" style={{ fontSize: scale(isMobile ? 13 : 16) }}>Twitter</a>
            <a href="#" className="font-outfit font-light text-white/40 cursor-not-allowed" style={{ fontSize: scale(isMobile ? 13 : 16) }}>Instagram</a>
            <a href="#" className="font-outfit font-light text-white/40 cursor-not-allowed" style={{ fontSize: scale(isMobile ? 13 : 16) }}>LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
