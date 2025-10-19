import logo from '@/assets/logo.svg'
import { SheetTrigger } from '@/components/ui/sheet'

// Figma assets from localhost
const imgEllipse19 = "http://localhost:3845/assets/ce31d6bf44b9c83972811daf3c391d4da9e36d3f.png"
const imgImage2 = "http://localhost:3845/assets/52599c6ef47675256eed37ca203f6ce9c458a802.png"
const imgImage1 = "http://localhost:3845/assets/ef67a41175ec56236b34e4d8a30576482af23281.png"
const imgStar4 = "http://localhost:3845/assets/09c9d381c6ceca7265cd227a741bb9acf3fa4024.svg"
const imgStar7 = "http://localhost:3845/assets/ec6134324748164ecd6d0197340576d1c40a2fe8.svg"
const imgStar1 = "http://localhost:3845/assets/8194972b30dee9a0a91a7bb22c03438cf1f3f9d7.svg"
const imgStar5 = "http://localhost:3845/assets/a0717ca2ac28c0ce02f5cd7cb077f2680da382bb.svg"
const imgPolygon1 = "http://localhost:3845/assets/c744e298ffd9d733e931717b4f9b39713a08458e.svg"
const imgStar12 = "http://localhost:3845/assets/cd3c2bba69f2d705838e6034810770df5d91a00e.svg"
const imgStar10 = "http://localhost:3845/assets/5ed4f2cafe1a13137ef9479ece666d7fa8143991.svg"
const imgPolygon2 = "http://localhost:3845/assets/458195b66a2bbb312474b65498ca9eb4db650820.svg"
const imgPolygon4 = "http://localhost:3845/assets/07e51bdf0e11f001a9b29619a8242f287db1da2a.svg"
const imgEllipse18 = "http://localhost:3845/assets/02d405d4a4886053a9a71c2a256982689730f87b.svg"
const imgEllipse20 = "http://localhost:3845/assets/580fd720754a472115f2ad3cbd4bfe72d913b32c.svg"
const imgStar8 = "http://localhost:3845/assets/34d796980d89bc1f9294e136a9ef75f44b546f1c.svg"

export default function NewLanding() {
  return (
    <div className="bg-[#FFFFFF] relative w-full min-h-screen overflow-visible">
      {/* Decorative shapes background - Desktop only (hidden on mobile) */}
      <div className="hidden md:block absolute pointer-events-none w-screen z-0" style={{ left: '-165px', top: '-121px' }}>
        {/* Ellipse at 230px, 294px */}
        <div className="absolute w-[168.382px] h-[168.382px]" style={{ left: '230px', top: '294px' }}>
          <img src={imgEllipse19} alt="" className="w-full h-full" />
        </div>
        
        {/* Star rotated 340.415deg at 14.286% + 90.143px, 82px */}
        <div className="absolute w-[160.348px] h-[160.348px]" 
             style={{ left: 'calc(14.286% + 90.143px)', top: '82px', transform: 'rotate(340.415deg)' }}>
          <img src={imgStar4} alt="" className="w-full h-full" />
        </div>

        {/* Star rotated 19.472deg at 42.857% + 172.713px, 332.04px */}
        <div className="absolute w-[119.672px] h-[119.672px]" 
             style={{ left: 'calc(42.857% + 172.713px)', top: '332.04px', transform: 'rotate(19.472deg)' }}>
          <img src={imgStar7} alt="" className="w-full h-full" />
        </div>

        {/* Star rotated 30deg at 28.571% + 154.286px, 60px */}
        <div className="absolute w-[80.686px] h-[80.686px]" 
             style={{ left: 'calc(28.571% + 154.286px)', top: '60px', transform: 'rotate(30deg)' }}>
          <img src={imgStar1} alt="" className="w-full h-full" />
        </div>

        {/* Star rotated 30deg at 57.143% + 182.571px, 663px */}
        <div className="absolute w-[80.686px] h-[80.686px]" 
             style={{ left: 'calc(57.143% + 182.571px)', top: '663px', transform: 'rotate(30deg)' }}>
          <img src={imgStar1} alt="" className="w-full h-full" />
        </div>

        {/* Star rotated 30deg at 85.714% + 49.609px, 183.67px */}
        <div className="absolute w-[80.686px] h-[80.686px]" 
             style={{ left: 'calc(85.714% + 49.609px)', top: '183.67px', transform: 'rotate(30deg)' }}>
          <img src={imgStar1} alt="" className="w-full h-full" />
        </div>

        {/* Star rotated 23.038deg at 85.714% + 33.857px, 578px */}
        <div className="absolute w-[107.587px] h-[107.587px]" 
             style={{ left: 'calc(85.714% + 33.857px)', top: '578px', transform: 'rotate(23.038deg)' }}>
          <img src={imgStar5} alt="" className="w-full h-full" />
        </div>

        {/* Ellipse at 71.429% - 20.286px, -14px */}
        <div className="absolute w-[168.382px] h-[168.382px]" 
             style={{ left: 'calc(71.429% - 20.286px)', top: '-14px' }}>
          <img src={imgEllipse19} alt="" className="w-full h-full" />
        </div>

        {/* Polygon rotated 31.074deg at 57.143% + 38.318px, 210.78px */}
        <div className="absolute w-[115.011px] h-[110.77px]" 
             style={{ left: 'calc(57.143% + 38.318px)', top: '210.78px', transform: 'rotate(31.074deg)' }}>
          <img src={imgPolygon1} alt="" className="w-full h-full" />
        </div>

        {/* Star rotated 340.415deg at -18.7px, 662.59px */}
        <div className="absolute w-[160.348px] h-[160.348px]" 
             style={{ left: '-18.7px', top: '662.59px', transform: 'rotate(340.415deg)' }}>
          <img src={imgStar4} alt="" className="w-full h-full" />
        </div>

        {/* Star rotated 30deg at 57.143% + 137.571px, 949px */}
        <div className="absolute w-[124.139px] h-[124.139px]" 
             style={{ left: 'calc(57.143% + 137.571px)', top: '949px', transform: 'rotate(30deg)' }}>
          <img src={imgStar12} alt="" className="w-full h-full" />
        </div>

        {/* Star rotated 19.472deg at 14.286% + 166.143px, 881px */}
        <div className="absolute w-[119.672px] h-[119.672px]" 
             style={{ left: 'calc(14.286% + 166.143px)', top: '881px', transform: 'rotate(19.472deg)' }}>
          <img src={imgStar10} alt="" className="w-full h-full" />
        </div>

        {/* Star rotated 30deg at 14.286% + 96.143px, 578px */}
        <div className="absolute w-[80.686px] h-[80.686px]" 
             style={{ left: 'calc(14.286% + 96.143px)', top: '578px', transform: 'rotate(30deg)' }}>
          <img src={imgStar1} alt="" className="w-full h-full" />
        </div>

        {/* Ellipse at 85.714% - 8.143px, 398px */}
        <div className="absolute w-[168.382px] h-[168.382px]" 
             style={{ left: 'calc(85.714% - 8.143px)', top: '398px' }}>
          <img src={imgEllipse19} alt="" className="w-full h-full" />
        </div>

        {/* Polygon rotated 31.074deg at 28.571% + 195.286px, 718px */}
        <div className="absolute w-[115.011px] h-[110.77px]" 
             style={{ left: 'calc(28.571% + 195.286px)', top: '718px', transform: 'rotate(31.074deg)' }}>
          <img src={imgPolygon1} alt="" className="w-full h-full" />
        </div>

        {/* Small polygon rotated 342.137deg at 28.571% + 123.967px, 360.57px */}
        <div className="absolute w-[48.514px] h-[46.725px]" 
             style={{ left: 'calc(28.571% + 123.967px)', top: '360.57px', transform: 'rotate(342.137deg)' }}>
          <img src={imgPolygon2} alt="" className="w-full h-full" />
        </div>

        {/* Small polygon rotated 56.636deg at 45px, 420px */}
        <div className="absolute w-[48.514px] h-[46.725px]" 
             style={{ left: '45px', top: '420px', transform: 'rotate(56.636deg)' }}>
          <img src={imgPolygon4} alt="" className="w-full h-full" />
        </div>

        {/* Gradient ellipse top left - moved right */}
        <div className="absolute w-[449.519px] h-[442.002px]" style={{ left: '-80px', top: '-121px' }}>
          <img src={imgEllipse18} alt="" className="w-full h-full" />
        </div>

        {/* Gradient ellipse bottom right at 85.714% + 21.857px, 771px */}
        <div className="absolute w-[449.519px] h-[442.002px]" 
             style={{ left: 'calc(85.714% + 21.857px)', top: '771px' }}>
          <img src={imgEllipse20} alt="" className="w-full h-full" />
        </div>
      </div>

      {/* Mobile decorative shapes */}
      <div className="md:hidden absolute pointer-events-none w-screen z-0">
        {/* Top left triangle */}
        <div className="absolute w-[56px] h-[54px] left-[95px] top-[28px]" style={{ transform: 'rotate(31.074deg)' }}>
          <img src={imgPolygon1} alt="" className="w-full h-full" />
        </div>

        {/* Top circle */}
        <div className="absolute w-[168.382px] h-[168.382px] left-[210px] top-[-56px]">
          <img src={imgEllipse19} alt="" className="w-full h-full" />
        </div>

        {/* Top right star */}
        <div className="absolute w-[80.686px] h-[80.686px] left-[330px] top-[312px]" style={{ transform: 'rotate(30deg)' }}>
          <img src={imgStar1} alt="" className="w-full h-full" />
        </div>

        {/* Bottom right circle */}
        <div className="absolute w-[168.382px] h-[168.382px] left-[317px] top-[524px]">
          <img src={imgEllipse19} alt="" className="w-full h-full" />
        </div>

        {/* Bottom star */}
        <div className="absolute w-[107.587px] h-[107.587px] left-[260px] top-[776px]" style={{ transform: 'rotate(23.038deg)' }}>
          <img src={imgStar5} alt="" className="w-full h-full" />
        </div>
      </div>

      {/* Main content - using normal document flow with flexbox */}
      <div className="relative z-10 px-4 md:px-[13.89%] pt-[20vh] md:pt-[25vh] pb-12 md:pb-24">
        {/* Logo at top left on mobile, bottom left on desktop */}
        <div className="absolute left-4 top-8 md:left-[5vw] md:top-[90vh] w-8 h-8 md:w-16 md:h-16 z-20">
          <img src={logo} alt="Kindred" className="w-full h-full object-contain" />
        </div>

        {/* Hero section */}
        <div className="flex flex-col gap-2 mb-16 md:mb-32">
          <h1 className="font-fraunces text-[48px] md:text-[4.98vw] leading-[1.1] md:leading-none tracking-[-0.96px] md:tracking-[-1.72px] bg-white p-2 w-[90%]" 
              style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 0.78" }}>
            <span className="text-[#13121f]">Our approach to </span>
            <span className="text-[#13121f] italic" style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 0.78" }}>human centered productivity</span>
            <span className="text-[#13121f]"> keeps you </span>
            <span className="text-[#854dff]">happy</span>
            <span className="text-[#13121f]"> and </span>
            <span className="text-[#854dff]">accomplished</span>
          </h1>
          
          {/* Waitlist button */}
          <SheetTrigger asChild>
            <button className="font-outfit font-light text-lg md:text-[1.16vw] text-white bg-[#854dff] px-6 py-3 rounded-lg hover:bg-[#7340e6] transition-colors w-fit">
              join the waitlist
            </button>
          </SheetTrigger>
          
          {/* Bicycle illustration */}
          <div className="w-[311px] md:w-1/5 aspect-square -ml-6 md:ml-0">
            <img src={imgImage1} alt="Connection illustration" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </div>
  )
}
