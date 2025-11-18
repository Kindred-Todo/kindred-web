import { scale, columnStart, columns } from '@/lib/design-system'
import { motion } from 'framer-motion'
import { useResponsiveScale } from '@/hooks/useResponsiveScale'
import logo from '@/assets/logo.svg'
import beakPhoto from '@/assets/beak.png'
import lokyePhoto from '@/assets/lokye.png'
import mongoLogo from '@/mongo.png'
import klaviyoLogo from '@/assets/klaviyo.png'
import microsoftLogo from '@/assets/microsoft.png'

// Decorative shapes component
function DecorativeShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Stars */}
      <motion.div
        className="absolute"
        style={{ top: '8%', left: '15%', width: scale(40), height: scale(40) }}
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 100 100" fill="#C4B5FD" opacity="0.6">
          <polygon points="50,10 61,40 92,40 67,59 78,89 50,70 22,89 33,59 8,40 39,40" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute"
        style={{ top: '15%', right: '10%', width: scale(50), height: scale(50) }}
        animate={{ 
          rotate: [0, -360],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 100 100" fill="#C4B5FD" opacity="0.5">
          <polygon points="50,10 61,40 92,40 67,59 78,89 50,70 22,89 33,59 8,40 39,40" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute"
        style={{ bottom: '20%', left: '8%', width: scale(35), height: scale(35) }}
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.15, 1]
        }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 100 100" fill="#C4B5FD" opacity="0.4">
          <polygon points="50,10 61,40 92,40 67,59 78,89 50,70 22,89 33,59 8,40 39,40" />
        </svg>
      </motion.div>

      {/* Triangles */}
      <motion.div
        className="absolute"
        style={{ top: '25%', right: '18%', width: scale(60), height: scale(60) }}
        animate={{ 
          x: [0, 10, 0],
          y: [0, -10, 0]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 100 100" fill="#854dff" opacity="0.7">
          <polygon points="50,10 90,80 10,80" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute"
        style={{ bottom: '30%', right: '12%', width: scale(70), height: scale(70) }}
        animate={{ 
          x: [0, -15, 0],
          y: [0, 10, 0]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 100 100" fill="#854dff" opacity="0.6">
          <polygon points="50,10 90,80 10,80" />
        </svg>
      </motion.div>

      {/* Squiggles */}
      <motion.div
        className="absolute"
        style={{ top: '35%', left: '12%', width: scale(80), height: scale(40) }}
        animate={{ 
          rotate: [0, 5, -5, 0]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 100 50" fill="none" stroke="#C4B5FD" strokeWidth="2" opacity="0.4">
          <path d="M 10 25 Q 25 10, 40 25 T 70 25 T 90 25" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute"
        style={{ bottom: '15%', right: '20%', width: scale(60), height: scale(30) }}
        animate={{ 
          rotate: [0, -5, 5, 0]
        }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 100 50" fill="none" stroke="#C4B5FD" strokeWidth="2" opacity="0.3">
          <path d="M 10 25 Q 25 40, 40 25 T 70 25 T 90 25" />
        </svg>
      </motion.div>

      {/* Circles/Dots */}
      <motion.div
        className="absolute"
        style={{ top: '50%', left: '5%', width: scale(30), height: scale(30) }}
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 100 100" fill="none" stroke="#854dff" strokeWidth="3" opacity="0.4">
          <circle cx="50" cy="50" r="40" />
        </svg>
      </motion.div>
    </div>
  )
}

interface TeamMemberProps {
  name: string
  photo: string
  title: string
  experience: string[]
  education: string
  funFact?: string
  companyLogos?: string[]
  delay?: number
}

function TeamMember({ name, photo, title, experience, education, funFact, companyLogos, delay = 0 }: TeamMemberProps) {
  const scale = useResponsiveScale()
  
  return (
    <motion.div 
      className="flex flex-col md:flex-row gap-8 md:gap-12"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Photo */}
      <motion.div 
        className="flex-shrink-0 w-full md:w-auto"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <img 
          src={photo} 
          alt={name}
          className="w-full md:w-auto md:h-[280px] object-cover rounded-lg shadow-lg"
          style={{ maxWidth: '100%' }}
        />
      </motion.div>

      {/* Info */}
      <div className="flex-1 flex flex-col gap-6">
        <h3 
          className="font-outfit font-semibold text-black"
          style={{
            fontSize: scale(40),
            letterSpacing: scale(-0.8),
            lineHeight: '1.1',
          }}
        >
          {name}
        </h3>

        <div className="flex flex-col gap-3">
          <p 
            className="font-outfit font-medium text-black"
            style={{
              fontSize: scale(24),
              letterSpacing: scale(-0.24),
              lineHeight: '1.2',
            }}
          >
            {title}
          </p>

          {experience.map((exp, idx) => (
            <p 
              key={idx}
              className="font-outfit font-light text-black/80"
              style={{
                fontSize: scale(20),
                letterSpacing: scale(-0.2),
                lineHeight: '1.3',
              }}
            >
              {exp}
            </p>
          ))}

          <p 
            className="font-outfit font-light text-black/80"
            style={{
              fontSize: scale(20),
              letterSpacing: scale(-0.2),
              lineHeight: '1.3',
            }}
          >
            {education}
          </p>

          {funFact && (
            <p 
              className="font-outfit font-light text-black/70 italic mt-2"
              style={{
                fontSize: scale(20),
                letterSpacing: scale(-0.2),
                lineHeight: '1.3',
              }}
            >
              {funFact}
            </p>
          )}
        </div>

        {companyLogos && companyLogos.length > 0 && (
          <div className="mt-4 flex items-center gap-6 flex-wrap">
            {companyLogos.map((logo, idx) => (
              <img 
                key={idx}
                src={logo} 
                alt="Company logo" 
                className="h-10 md:h-14 w-auto object-contain"
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default function TeamPage() {
  const scale = useResponsiveScale()

  return (
    <div className="bg-[#FFFFFF] relative w-full min-h-screen">
      {/* Decorative shapes */}
      <DecorativeShapes />

      {/* Main content */}
      <div className="relative z-10 px-4 md:px-16 py-32">
        <div 
          className="max-w-7xl mx-auto"
          style={{
            paddingLeft: '16px',
            paddingRight: '16px',
          }}
        >
          {/* Header */}
          <motion.div
            className="mb-24 md:mb-32"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 
              className="font-fraunces italic text-[#854dff] mb-8"
              style={{
                fontSize: scale(86),
                lineHeight: '1',
                letterSpacing: scale(-1.72),
                fontVariationSettings: "'SOFT' 0, 'WONK' 0.78",
              }}
            >
              the team
            </h1>
          </motion.div>

          {/* Team members */}
          <div className="flex flex-col gap-24 md:gap-32">
            <TeamMember
              name="Abhik Ray"
              photo={beakPhoto}
              title="MongoDB Software Engineer"
              experience={[
                "Previous Founder",
                "Generate Software Director",
                "CS x Interaction Design @ Northeastern University",
              ]}
              education=""
              funFact="Part Time DJ"
              companyLogos={[mongoLogo, klaviyoLogo]}
              delay={0}
            />

            <TeamMember
              name="Lok Ye Young"
              photo={lokyePhoto}
              title="Incoming Microsoft SWE"
              experience={[
                "2 Years Design Experience",
                "Generate Software Designer",
                "CS & Human Centered Computing @ Northeastern University",
              ]}
              education=""
              companyLogos={[microsoftLogo]}
              delay={0.2}
            />
          </div>

          {/* Footer with logo and website */}
          <motion.div 
            className="mt-32 pt-16 border-t border-black/10 flex items-center gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <img src={logo} alt="Kindred" className="w-12 h-12 md:w-16 md:h-16" />
            <p 
              className="font-outfit text-black"
              style={{
                fontSize: scale(24),
                letterSpacing: scale(-0.24),
              }}
            >
              kindredtodo.com
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

