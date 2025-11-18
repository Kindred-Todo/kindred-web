import { columnStart, columns } from '@/lib/design-system'
import { motion } from 'framer-motion'
import { useResponsiveScale } from '@/hooks/useResponsiveScale'

const features = [
  {
    number: '01',
    text: "Voice enabled by default, just say what's on your mind we'll organize it.",
  },
  {
    number: '02',
    text: 'Reminders, deadlines, alerts to keep you updated',
  },
  {
    number: '04',
    text: 'Blueprints- a marketplace of todo lists that are already made for you',
  },
  {
    number: '05',
    text: 'Build your lists with photos or integrations with other apps',
  },
  {
    number: '06',
    text: 'Streaks, activity over time, and productivity analytics',
  },
]

export function PlatformFeaturesSection() {
  const scale = useResponsiveScale()
  
  return (
    <section className="mt-32 md:mt-48 mb-32 md:mb-48" style={{ paddingLeft: '16px', paddingRight: '16px' }}>
      {/* Flexbox container for desktop 2-column layout */}
      <div className="flex flex-col md:flex-row md:justify-between gap-8 md:gap-0 md:ml-[var(--col-start-1)] md:max-w-[var(--col-7)]" style={{ '--col-start-1': columnStart(1), '--col-7': columns(7) } as React.CSSProperties}>
        {/* Left column - Title */}
        <motion.div 
          className="md:w-[30%] md:pr-8"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <p 
            className="font-outfit font-light text-[28px] md:text-[1.85vw] leading-[1.25] text-black" 
            style={{ 
              fontSize: scale(32),
              letterSpacing: scale(-0.64),
            }}
          >
            On top of this, we're a killer platform /
          </p>
        </motion.div>

        {/* Right column - Features list */}
        <div className="flex flex-col md:w-[60%]">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              {/* Feature row - flexbox with gap */}
              <div 
                className="flex items-start gap-4 md:gap-16 py-6 md:py-8"
              >
                {/* Number */}
                <p 
                  className="font-outfit font-light text-[16px] leading-[1.25] text-black shrink-0" 
                  style={{ 
                    fontSize: scale(16),
                    letterSpacing: scale(-0.32),
                  }}
                >
                  {feature.number} /
                </p>
                
                {/* Description */}
                <p 
                  className="font-outfit font-light text-[24px] md:text-[36px] lg:text-[2.78vw] leading-none text-black flex-1" 
                  style={{ 
                    fontSize: scale(48),
                    letterSpacing: scale(-0.96),
                  }}
                >
                  {feature.text}
                </p>
              </div>
              
              {/* Divider line (except for last item) */}
              {index < features.length - 1 && (
                <div className="w-full h-[1px] bg-black opacity-20" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

