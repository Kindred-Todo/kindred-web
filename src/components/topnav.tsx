import { SheetTrigger } from '@/components/ui/sheet'
import { scale, columnStart, typography } from '@/lib/design-system'
import { Link } from '@tanstack/react-router'

export default function TopNav() {
  return (
    <nav 
      className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-0 py-6 md:py-0" 
      style={{ 
        paddingLeft: columnStart(1),
        paddingRight: columnStart(1),
        paddingTop: scale(33),
        height: scale(82)
      }}
    >
      {/* Logo/Brand - aligned with grid column 1 */}
      <div 
        className="hidden md:block font-outfit font-light text-white leading-normal"
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
            className="font-outfit font-light text-[#13121f] rounded-[40px] cursor-pointer hover:bg-gray-50 transition-colors leading-normal" 
            style={{ 
              ...typography.body.desktop,
              padding: `${scale(12)} ${scale(24)}` 
            }}
          >
            team
          </div>
        </Link>
        <div 
          className="font-outfit font-light text-[#13121f] rounded-[40px] cursor-pointer hover:bg-gray-50 transition-colors leading-normal" 
          style={{ 
            ...typography.body.desktop,
            padding: `${scale(12)} ${scale(24)}` 
          }}
        >
          about
        </div>
        <SheetTrigger asChild>
          <button 
            className="font-outfit font-light text-[#13121f] rounded-[40px] border border-black hover:bg-gray-50 transition-colors leading-normal" 
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
