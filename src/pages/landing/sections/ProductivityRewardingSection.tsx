import { scaleMobile, scaleDesktop, columnStart, columns, typography } from '@/lib/design-system'
import imgImage7 from '@/assets/image7.png'
import imgImage8 from '@/assets/image8.png'
import imgImage9 from '@/assets/image9.png'
import imgImage10 from '@/assets/image10.png'
import { motion } from 'framer-motion'

export function ProductivityRewardingSection() {
  return (
    <section 
      className="mb-32 md:mb-48 relative" 
      style={{ 
        paddingLeft: '16px',
        paddingRight: '16px',
        paddingTop: '6rem'
      }}
    >
      <div className="flex flex-col gap-12 md:ml-[var(--col-start-1)] md:max-w-[var(--col-7)]" style={{ '--col-start-1': columnStart(1), '--col-7': columns(7) } as React.CSSProperties}>
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }} 
          className="font-outfit font-normal leading-none text-black"
          style={{
            fontSize: `clamp(${scaleMobile(36)}, 8vw, ${scaleDesktop(128)})`,
            letterSpacing: `clamp(${scaleMobile(-1.8)}, -0.2vw, ${scaleDesktop(-6.4)})`,
          }}
        >
          <div>PRODUCTIVITY HAS</div>
          <div>NEVER FELT SO REWARDING</div>
        </motion.h2>

        {/* Description text */}
        <motion.div 
          className="md:w-[48%]"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <p 
            className="font-fraunces font-light text-[28px] md:text-[2.08vw] leading-[1.05] text-black" 
            style={{
              ...typography.bodyLarge.desktop,
            }}
          >
            <span>We're using psychology to boost your </span>
            <span className="italic">intrinsic </span>
            <span className="italic">motivation</span>
            <span> to help you naturally </span>
            <span className="italic">accomplish more</span>
            <span>, and </span>
            <span className="italic">feel good</span>
            <span> about doing so.</span>
          </p>
        </motion.div>

        {/* Images grid with side note */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Images - 4 images side by side */}
          <div className="flex flex-wrap md:flex-nowrap gap-4 md:gap-6 md:w-[70%]">
            <motion.div 
              className="w-full md:w-[23%] aspect-[252/401]"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
            >
              <img src={imgImage7} alt="" className="w-full h-full object-cover rounded-lg" />
            </motion.div>
            <motion.div 
              className="w-full md:w-[24%] aspect-[267/401]"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
            >
              <img src={imgImage8} alt="" className="w-full h-full object-cover rounded-lg" />
            </motion.div>
            <motion.div 
              className="w-full md:w-[22%] aspect-[243/402]"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
            >
              <img src={imgImage9} alt="" className="w-full h-full object-cover rounded-lg" />
            </motion.div>
            <motion.div 
              className="w-full md:w-[24%] aspect-[268/402]"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
            >
              <img src={imgImage10} alt="" className="w-full h-full object-cover rounded-lg" />
            </motion.div>
          </div>

          {/* Side note with vertical line - to the right of images */}
          <div className="flex md:w-[25%] gap-4 md:gap-6">
            {/* Vertical line */}
            <div className="hidden md:block w-[1px] bg-black opacity-20 self-stretch" />
            
            {/* Text content */}
            <p 
              className="font-outfit font-light text-[18px] md:text-[1.16vw] leading-[1.25] text-black flex-1" 
              style={{ 
                ...typography.body.desktop,
              }}
            >
              <span>leveraging </span>
              <span className="text-[#854dff]">kudos</span>
              <span> we're building an environment that fuels your relationship with productivity with dopamine and serotonin through your close friends through </span>
              <span className="text-[#854dff]">intimacy</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

