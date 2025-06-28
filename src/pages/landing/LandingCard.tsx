import logo from '@/assets/logo.svg'
import image from '@/assets/landing-screens.png'
import mobileLanding from '@/assets/mobile-landing.png'
import { SheetTrigger } from '@/components/ui/sheet'
import { useMobile } from '@/contexts/MobileContext'
import { AutoTextSize } from 'auto-text-size'

export default function LandingCard() {
  const { isMobile } = useMobile()

  return (
    <div className="mx-2 md:mx-12 md:h-full bg-dark-foreground p-8 pl-8 md:pl-20 pr-8 md:pr-0 rounded-xl flex flex-col md:flex-row card-shadow">
      <div className="flex flex-col h-full w-full py-6 md:py-16 text-center md:text-left justify-between">
        <div className="flex flex-col h-full w-full">
          <div className="w-full h-[40vh]">
            <AutoTextSize
              mode="box"
              className="landing-text"
              maxFontSizePx={512}
            >
              Cultivating a culture of
              <span className="text-green-success italic">
                {' '}
                mutual productivity{' '}
              </span>{' '}
              where everyone wins
            </AutoTextSize>
          </div>
          <div className="w-full h-[8vh]">
            <AutoTextSize mode="box" className="landing-text-small">
              Kindred couples a powerful productivity system with the psychology
              of social media to hit your goals
            </AutoTextSize>
          </div>
          <div className="flex flex-col gap-2 mt-4 md:flex-row md:items-center justify-center md:justify-start md:content-center align-top md:pb-12">
            <p
              className="fraunces-axis-2 text-light-bg tracking-wider"
              style={{
                fontSize: '2rem',
                paddingBottom: '0rem',
              }}
            >
              Coming Soon
            </p>
            <SheetTrigger asChild>
              <button className="h-12 hover:underline text-green-success px-6 py-3 mb-4 md:mb-0 rounded-xl max-w-48 self-center">
                Join Waitlist {'->'}
              </button>
            </SheetTrigger>
          </div>
        </div>
        <div className="w-full md:py-[2%]"></div>
        <div className="self-center md:self-start">
          <img src={logo} alt="Kindred" className="w-12 h-12" />
        </div>
      </div>

      <div className="overflow-visible w-full flex pt-12 md:pt-0">
        <img
          src={isMobile ? mobileLanding : image}
          alt="Kindred"
          className="object-left w-full self-center"
        />
      </div>
    </div>
  )
}
