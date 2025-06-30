import logo from '@/assets/logo.svg'
import image from '@/assets/landing-screens.png'
import mobileLanding from '@/assets/mobile-landing.png'
import { SheetTrigger } from '@/components/ui/sheet'
import { useMobile } from '@/contexts/MobileContext'

export default function LandingCard() {
  const { isMobile } = useMobile()

  return (
    <div className="mx-2 md:mx-12 md:h-full bg-dark-foreground p-8 pl-8 md:pl-20 pr-8 md:pr-0 rounded-xl flex flex-col md:flex-row card-shadow md:items-center">
      <div className="flex flex-col w-full text-center md:text-left justify-center relative">
        <div className="flex flex-col w-full items-center md:items-start gap-3 pb-20">
          <h1 className="landing-text w-full">
            Cultivating a culture of
            <span className="text-green-success italic"> mutual productivity</span><br />
            where everyone wins
          </h1>
          <p className="landing-text-small w-[80%] mb-6 mt-4">
            Kindred couples a powerful productivity system with the psychology
            of social media to hit your goals
          </p>
          <div className="flex flex-col gap-4 mt-10 md:flex-row md:items-center justify-center md:justify-start md:content-center align-top md:pb-12">
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
              <button className="h-12 hover:underline text-green-success px-6 mx-4 py-3 mb-4 md:mb-0 rounded-xl max-w-48 self-center border-1 border-green-success border-opacity-10">
                Join Waitlist {'->'}
              </button>
            </SheetTrigger>
          {isMobile && (
            <div className="w-full flex justify-center">
              <img src={logo} alt="Kindred" className="w-12 h-12" />
            </div>
          )}
          </div>
        </div>
      </div>
      {!isMobile && (
        <div className="absolute left-32 bottom-32">
          <img src={logo} alt="Kindred" className="w-12 h-12" />
        </div>
      )}

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
