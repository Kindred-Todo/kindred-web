import { motion } from 'framer-motion'
import { useIsMobile, useResponsiveScale } from '@/hooks/useResponsiveScale'
import checkLogo from '@/assets/check-logo.svg'

export function Footer() {
  const scale = useResponsiveScale()
  const isMobile = useIsMobile()

  return (
    <div className="w-full bg-light-bg" style={{ padding: isMobile ? '16px' : '24px' }}>
      <footer
        className="bg-dark-bg"
        style={{
          borderRadius: isMobile ? '16px' : '24px',
          paddingTop: scale(isMobile ? 64 : 96),
          paddingBottom: scale(isMobile ? 40 : 48),
          paddingLeft: isMobile ? '16px' : scale(64),
          paddingRight: isMobile ? '16px' : scale(64),
        }}
      >
        <div className="flex flex-col max-w-[1600px] mx-auto text-white" style={{ gap: scale(isMobile ? 48 : 64) }}>
          {/* CTA + right rail */}
          {isMobile ? (
            <div className="flex flex-col gap-10">
              <div>
                <h2 className="font-outfit font-medium leading-[1.25] text-white tracking-[-1.92px] text-[36px]">Lets lock in</h2>
                <p className="font-outfit font-normal leading-[1.25] text-white tracking-[-0.72px] mt-4 text-[18px]">
                  Download Kindred and start building the life you actually want — with the people who want it for you too.
                </p>
                <div className="flex flex-col gap-3 mt-6">
                  <motion.a href="#" className="px-5 py-3 bg-primary rounded-[12px] font-outfit text-base text-white shadow-[0_0_16px_var(--color-primary-glow)] text-center whitespace-nowrap" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    Join our Waitlist
                  </motion.a>
                  <motion.a href="#" className="px-5 py-3 rounded-[12px] font-outfit text-base text-primary border border-primary text-center whitespace-nowrap" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    Contact Us
                  </motion.a>
                </div>
              </div>
              <div className="flex gap-8">
                <div className="flex flex-col gap-2">
                  <p className="font-outfit text-[14px] text-white/50">FOLLOW</p>
                  <a href="#" className="font-outfit text-[16px] underline">@kindredtodo</a>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="font-outfit text-[14px] text-white/50">EMAIL</p>
                  <a href="mailto:kindred@kindredtodo.com" className="font-outfit text-[16px] underline">kindred@kindredtodo.com</a>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-12 gap-x-[20px]">
              {/* CTA: columns 1-7 */}
              <div className="col-span-7">
                <h2 className="font-outfit font-medium leading-[1.25] text-white tracking-[-1.92px]" style={{ fontSize: scale(64) }}>Lets lock in</h2>
                <p className="font-outfit font-normal leading-[1.25] text-white tracking-[-0.72px] mt-4" style={{ fontSize: scale(24) }}>
                  Download Kindred and start building the life you actually want — with the people who want it for you too.
                </p>
                <div className="flex gap-2 mt-6">
                  <motion.a href="#" className="px-5 py-3 bg-primary rounded-[12px] font-outfit text-base text-white shadow-[0_0_16px_var(--color-primary-glow)] text-center whitespace-nowrap" style={{ width: '247px' }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    Join our Waitlist
                  </motion.a>
                  <motion.a href="#" className="px-5 py-3 rounded-[12px] font-outfit text-base text-primary border border-primary text-center whitespace-nowrap" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    Contact Us
                  </motion.a>
                </div>
              </div>
              {/* Right rail: columns 10-12 */}
              <div className="col-span-3 col-start-10 flex flex-col justify-end gap-6">
                <div className="flex flex-col gap-2">
                  <p className="font-outfit text-[14px] text-white/50">FOLLOW</p>
                  <a href="#" className="font-outfit text-[16px] underline">@kindredtodo</a>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="font-outfit text-[14px] text-white/50">EMAIL</p>
                  <a href="mailto:kindred@kindredtodo.com" className="font-outfit text-[16px] underline">kindred@kindredtodo.com</a>
                </div>
              </div>
            </div>
          )}

          {/* Bottom strip: logo + copyright */}
          <div className="border-t border-white/10 pt-8">
            {isMobile ? (
              <div className="flex flex-col gap-4">
                <div className="flex flex-row items-center gap-4">
                  <img src={checkLogo} alt="Kindred" className="object-contain" style={{ width: '40px', height: '32px' }} />
                  <span className="font-fraunces font-normal text-primary text-[28px]" style={{ letterSpacing: '-1.4px', lineHeight: 1.2, fontVariationSettings: "'SOFT' 0, 'WONK' 1, 'opsz' 80" }}>kindred</span>
                </div>
                <div className="font-outfit font-light text-white/40 text-[13px]">&copy; 2025 Kindred. All rights reserved.</div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex flex-row items-center gap-4">
                  <img src={checkLogo} alt="Kindred" className="object-contain" style={{ width: scale(48), height: scale(38) }} />
                  <span className="font-fraunces font-normal text-primary" style={{ fontSize: scale(36), letterSpacing: scale(-1.8), lineHeight: 1.2, fontVariationSettings: "'SOFT' 0, 'WONK' 1, 'opsz' 80" }}>kindred</span>
                </div>
                <div className="font-outfit font-light text-white/40 text-[13px]">&copy; 2025 Kindred. All rights reserved.</div>
              </div>
            )}
          </div>
        </div>
      </footer>
    </div>
  )
}
