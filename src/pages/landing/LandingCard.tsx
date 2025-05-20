import logo from '@/assets/logo.svg'
import image from '@/assets/landing-screens.png'
import mobileLanding from '@/assets/mobile-landing.png'
import { SheetTrigger } from '@/components/ui/sheet'
import { useMobile } from '@/contexts/MobileContext'

export default function LandingCard() {
  const { isMobile } = useMobile()

  return (
    <div className="mx-2 md:mx-12 md:h-full bg-dark-foreground p-8 pl-8 md:pl-20 pr-8 md:pr-0 rounded-xl flex flex-col md:flex-row card-shadow">
      <div className="flex flex-col h-full w-full py-6 md:py-20 text-center md:text-left">
        <h1 className="landing-text w-full h-full ">
          Cultivating a culture of
          <span className="text-green-success italic">
            {' '}
            mutual productivity{' '}
          </span>{' '}
          where everyone wins
        </h1>
        <div className="w-full md:py-12">
          <p className="landing-text-small self-end">
            Kindred couples a powerful productivity system with the psychology
            of social media to hit your goals
          </p>
        </div>
        <div className="flex flex-col gap-2 mt-4 md:flex-row items-center justify-center md:justify-start">
          <p
            className="fraunces-axis-2 text-light-bg tracking-wider"
            style={{
              fontSize: '2rem',
            }}
          >
            Coming Soon
          </p>
          <SheetTrigger asChild>
            <button className="h-12 hover:underline text-green-success px-6 py-3 rounded-xl max-w-48">
              Join Waitlist {'->'}
            </button>
          </SheetTrigger>
        </div>

        <div className="h-full flex flex-col-reverse gap-4 md:flex-row">
          <img
            src={logo}
            alt="Kindred"
            className="w-12 h-12 self-center md:self-end"
          />
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
