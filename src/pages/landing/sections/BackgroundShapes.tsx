import { scale } from '@/lib/design-system'
import { Parallax } from 'react-scroll-parallax'
import imgEllipse19 from '@/assets/shapes/ellipse19.png'
import imgStar4 from '@/assets/shapes/star4.svg'
import imgStar7 from '@/assets/shapes/star7.svg'
import imgStar1 from '@/assets/shapes/star1.svg'
import imgStar5 from '@/assets/shapes/star5.svg'
import imgPolygon1 from '@/assets/shapes/polygon1.svg'
import imgStar12 from '@/assets/shapes/star12.svg'
import imgStar10 from '@/assets/shapes/star10.svg'
import imgPolygon2 from '@/assets/shapes/polygon2.svg'
import imgPolygon4 from '@/assets/shapes/polygon4.svg'
import imgEllipse18 from '@/assets/shapes/ellipse18.svg'
import imgEllipse20 from '@/assets/shapes/ellipse20.svg'
import imgFrame30 from '@/assets/shapes/frame30.svg'

export function BackgroundShapes() {
  return (
    <>
      {/* Desktop decorative shapes */}
      <div className="hidden md:block absolute pointer-events-none w-screen z-0 left-0" style={{ top: scale(-121) }}>
        {/* Ellipse */}
        <div className="absolute" style={{ left: scale(65), top: scale(294), width: scale(168.382), height: scale(168.382) }}>
          <img src={imgEllipse19} alt="" className="w-full h-full" />
        </div>
        
        {/* Star rotated 340.415deg */}
        <div className="absolute" 
             style={{ left: scale(337), top: scale(135.75), width: scale(160.348), height: scale(160.348), transform: 'rotate(340.415deg)' }}>
          <img src={imgStar4} alt="" className="w-full h-full" />
        </div>

        {/* Star rotated 30deg */}
        <div className="absolute" 
             style={{ left: scale(1571.095), top: scale(183.67), width: scale(80.686), height: scale(80.686), transform: 'rotate(30deg)' }}>
          <img src={imgStar1} alt="" className="w-full h-full" />
        </div>

        {/* Ellipse */}
        <div className="absolute" 
             style={{ left: scale(1049), top: scale(-14), width: scale(168.382), height: scale(168.382) }}>
          <img src={imgEllipse19} alt="" className="w-full h-full" />
        </div>

        {/* Star rotated 340.415deg */}
        <div className="absolute" 
             style={{ left: scale(-18.7), top: scale(716.342), width: scale(160.348), height: scale(160.348), transform: 'rotate(340.415deg)' }}>
          <img src={imgStar4} alt="" className="w-full h-full" />
        </div>

        {/* Star rotated 30deg */}
        <div className="absolute" 
             style={{ left: scale(1187.069), top: scale(949), width: scale(124.139), height: scale(124.139), transform: 'rotate(30deg)' }}>
          <img src={imgStar12} alt="" className="w-full h-full" />
        </div>

        {/* Star rotated 19.472deg */}
        <div className="absolute" 
             style={{ left: scale(452.891), top: scale(881), width: scale(119.672), height: scale(119.672), transform: 'rotate(19.472deg)' }}>
          <img src={imgStar10} alt="" className="w-full h-full" />
        </div>

        {/* Star rotated 30deg */}
        <div className="absolute" 
             style={{ left: scale(383.343), top: scale(578), width: scale(80.686), height: scale(80.686), transform: 'rotate(30deg)' }}>
          <img src={imgStar1} alt="" className="w-full h-full" />
        </div>

        {/* Ellipse */}
        <div className="absolute" 
             style={{ left: scale(1308), top: scale(398), width: scale(168.382), height: scale(168.382) }}>
          <img src={imgEllipse19} alt="" className="w-full h-full" />
        </div>

        {/* Polygon rotated 31.074deg */}
        <div className="absolute" 
             style={{ left: scale(746.174), top: scale(718), width: scale(115.011), height: scale(110.77), transform: 'rotate(31.074deg)' }}>
          <img src={imgPolygon1} alt="" className="w-full h-full" />
        </div>

        {/* Frame 30 - decorative shape cluster */}
        <div className="absolute" 
             style={{ left: scale(5), top: scale(1255), width: scale(258.861), height: scale(828.462) }}>
          <img src={imgFrame30} alt="" className="w-full h-full" />
        </div>

        {/* Small polygon rotated 342.137deg */}
        <div className="absolute" 
             style={{ left: scale(617.682), top: scale(375.455), width: scale(48.514), height: scale(46.725), transform: 'rotate(342.137deg)' }}>
          <img src={imgPolygon2} alt="" className="w-full h-full" />
        </div>

        {/* Small polygon rotated 56.636deg */}
        <div className="absolute" 
             style={{ left: scale(84.025), top: scale(420), width: scale(48.514), height: scale(46.725), transform: 'rotate(56.636deg)' }}>
          <img src={imgPolygon4} alt="" className="w-full h-full" />
        </div>

        {/* Gradient ellipse top left */}
        <div className="absolute" style={{ left: scale(-165), top: 0, width: scale(449.519), height: scale(442.002) }}>
          <img src={imgEllipse18} alt="" className="w-full h-full" />
        </div>

        {/* Gradient ellipse bottom right */}
        <div className="absolute" 
             style={{ left: scale(1503), top: scale(771 + 121), width: scale(449.519), height: scale(442.002) }}>
          <img src={imgEllipse20} alt="" className="w-full h-full" />
        </div>
      </div>

      {/* Frame 31 - second decorative shape cluster */}
      <div className="hidden md:block absolute pointer-events-none z-0 left-0" 
           style={{ top: scale(2176 - 121), width: scale(258.861), height: scale(828.462) }}>
        <img src={imgFrame30} alt="" className="w-full h-full" />
      </div>

      {/* Mobile decorative shapes */}
      <div className="md:hidden absolute pointer-events-none w-screen z-0">
        <div className="absolute w-[56px] h-[54px] left-[95px] top-[28px]" style={{ transform: 'rotate(31.074deg)' }}>
          <img src={imgPolygon1} alt="" className="w-full h-full" />
        </div>
        <div className="absolute w-[168.382px] h-[168.382px] left-[210px] top-[-56px]">
          <img src={imgEllipse19} alt="" className="w-full h-full" />
        </div>
        <div className="absolute w-[80.686px] h-[80.686px] left-[330px] top-[312px]" style={{ transform: 'rotate(30deg)' }}>
          <img src={imgStar1} alt="" className="w-full h-full" />
        </div>
        <div className="absolute w-[168.382px] h-[168.382px] left-[317px] top-[524px]">
          <img src={imgEllipse19} alt="" className="w-full h-full" />
        </div>
        <div className="absolute w-[107.587px] h-[107.587px] left-[260px] top-[776px]" style={{ transform: 'rotate(23.038deg)' }}>
          <img src={imgStar5} alt="" className="w-full h-full" />
        </div>
      </div>
    </>
  )
}

