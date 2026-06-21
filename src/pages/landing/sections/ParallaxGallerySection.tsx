import { useIsMobile } from '@/hooks/useResponsiveScale'
import { ParallaxWrapper } from '@/components/ParallaxWrapper'
import parallax1 from '@/assets/new-design/parallax-1.png'
import parallax2 from '@/assets/new-design/parallax-2.png'
import parallax3 from '@/assets/new-design/parallax-3.png'
import parallax4 from '@/assets/new-design/parallax-4.png'
import parallax5 from '@/assets/new-design/parallax-5.png'
import parallax6 from '@/assets/new-design/parallax-6.png'
import parallax7 from '@/assets/new-design/parallax-7.png'

interface GalleryImage {
  src: string
  width: number
  height: number
  rotation: number
  speed: number
  direction: 'up' | 'down'
  left: string
  top: string
}

const GALLERY_IMAGES: GalleryImage[] = [
  { src: parallax1, width: 335, height: 447, rotation: -5.87, speed: 0.2, direction: 'down', left: '0%', top: '0%' },
  { src: parallax2, width: 375, height: 503, rotation: 11.93, speed: 0.3, direction: 'up', left: '15%', top: '20%' },
  { src: parallax3, width: 360, height: 450, rotation: -14.93, speed: 0.35, direction: 'down', left: '32%', top: '10%' },
  { src: parallax4, width: 372, height: 496, rotation: 4.19, speed: 0.25, direction: 'up', left: '50%', top: '25%' },
  { src: parallax5, width: 301, height: 452, rotation: -5, speed: 0.28, direction: 'down', left: '68%', top: '12%' },
  { src: parallax6, width: 304, height: 541, rotation: 12.5, speed: 0.32, direction: 'up', left: '80%', top: '24%' },
  { src: parallax7, width: 339, height: 424, rotation: 11.63, speed: 0.22, direction: 'down', left: '0%', top: '50%' },
]

export function ParallaxGallerySection() {
  const isMobile = useIsMobile()

  if (isMobile) {
    // Two columns that parallax in opposite directions: as the section scrolls
    // they slide against each other, recreating the desktop scatter's depth in
    // portrait. Tilt is dampened and the right column is staggered down so the
    // photos read as a tossed collage rather than grid cells.
    const clampTilt = (r: number) => Math.max(-3, Math.min(3, r))
    const columns: Array<{ imgs: GalleryImage[]; direction: 'up' | 'down'; offset: string }> = [
      { imgs: GALLERY_IMAGES.filter((_, i) => i % 2 === 0), direction: 'down', offset: '' },
      { imgs: GALLERY_IMAGES.filter((_, i) => i % 2 === 1), direction: 'up', offset: 'mt-12' },
    ]
    return (
      <section className="w-full overflow-hidden px-4 py-16">
        <div className="grid grid-cols-2 gap-3 items-start">
          {columns.map((col, c) => (
            <ParallaxWrapper key={c} speed={0.18} direction={col.direction}>
              <div className={`flex flex-col gap-4 ${col.offset}`}>
                {col.imgs.map((img, i) => (
                  <div
                    key={i}
                    className="overflow-hidden rounded-xl shadow-[0_12px_30px_rgba(19,18,31,0.12)]"
                    style={{ transform: `rotate(${clampTilt(img.rotation)}deg)` }}
                  >
                    <img src={img.src} alt="" className="w-full h-auto object-cover" loading="lazy" />
                  </div>
                ))}
              </div>
            </ParallaxWrapper>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className="relative w-full overflow-hidden" style={{ height: '900px', marginTop: '-450px' }}>
      {GALLERY_IMAGES.map((img, i) => (
        <div key={i} className="absolute" style={{ left: img.left, top: img.top }}>
          <ParallaxWrapper speed={img.speed} direction={img.direction}>
            <div className="overflow-hidden" style={{ width: `${img.width}px`, height: `${img.height}px`, transform: `rotate(${img.rotation}deg)` }}>
              <img src={img.src} alt="" className="w-full h-full object-cover" />
            </div>
          </ParallaxWrapper>
        </div>
      ))}
    </section>
  )
}
