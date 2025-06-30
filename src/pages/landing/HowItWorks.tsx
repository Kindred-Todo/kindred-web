import { Bento } from './bento'
import Title from '@/components/typography/title'
import Star from '@/assets/Star.svg'
import PencilSimpleLine from '@/assets/PencilSimpleLine.svg'
import Handshake from '@/assets/Handshake.svg'

export default function HowItWorks() {
  return (
    <>
      <div className=" flex flex-col gap-16">
        <div className="w-full flex justify-center">

        <Title >Our model revolves around tools for your 
        <span className="relative inline-block">
          <svg 
            viewBox="0 0 214 112" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0 w-[140%] h-[160%] -top-3 -left-9 md:-left-10"
            preserveAspectRatio="xMidYMid meet"
            >
            <path 
              d="M100.673 3.80238C129.896 0.148733 157.026 2.831 177.248 10.0527C197.561 17.3068 210.458 28.9484 212.206 42.9288C213.953 56.9092 204.32 71.3667 186.419 83.3987C168.597 95.377 142.963 104.657 113.74 108.311C84.5173 111.965 57.387 109.281 37.1648 102.06C16.8522 94.8056 3.95582 83.1649 2.20779 69.1845C0.459836 55.2041 10.0931 40.7457 27.9945 28.7137C45.8161 16.7355 71.4509 7.45603 100.673 3.80238Z" 
              stroke="black" 
              strokeWidth="3"
              />
          </svg>
          <span className="relative z-10 px-4 py-2">todo list,</span>
        </span>social <span className="underline">connections</span>, and <span className="text-primary">blueprints</span> </Title>
              </div>
        <div className="flex flex-col gap-0">

      <HowItWorksRow title="01. Productivity" icon={<img src={Star} alt="Star" className="w-10 h-10" />}>
          <div>
          <div className="flex flex-col justify-between h-[30vh] gap-8">
            <div className="flex flex-col gap-8 h-full">
            <p>Blueprints stem off our take on 'influencers' where 
            people can follow the same habits their inspirations take</p>
            <p>We're offering a marketplace of habits for people to 
            subscribe to and build a community around it</p>
            </div>
            <p className="align-end"><span className="text-primary">oh yeah,</span> btw its super satisfying to cross stuff off</p>
          </div>
        </div>
      </HowItWorksRow>
      <HowItWorksRow title="02. Blueprints" icon={<img src={PencilSimpleLine} alt="Pencil" className="w-10 h-10" />}>
          <div>
          <div className="flex flex-col justify-between h-[30vh] gap-8">
            <div className="flex flex-col gap-8 h-full">
            <p>Blueprints stem off our take on 'influencers' where 
            people can follow the same habits their inspirations take.</p>
              <p>We're offering a marketplace of habits for people to 
              subscribe to and build a community around it  </p>
            </div>
            <p className="align-end">Bridging Productivity and Connections</p>
          </div>
        </div>
      </HowItWorksRow>
      <HowItWorksRow title="03. Connections" icon={<img src={Handshake} alt="Handshake" className="w-10 h-10" />}>
          <div>
          <div className="flex flex-col justify-between h-[30vh] gap-8">
            <div className="flex flex-col gap-8 h-full">
            <p>Kindred prioritizes connection by highlighting 
authentic moments throughout the day based on 
what you're actually doing</p>
            <p>We're flipping the psychology of social
            media around as a mechanism for good  </p>
            <p>Your close friends can encourage you to complete
            your goals and stick with you throughout the journey </p>
            </div>
          </div>
        </div>
      </HowItWorksRow>
        </div>
      </div>
      <div className="h-32"> .</div>
      <div
        className="w-screen h-16 rounded-full bg-light-bg"
        style={{
          transform: 'translateY(50%)',
        }}
      />
    </>
  )
}


const HowItWorksRow = ({title, icon, children}: {title: string, icon: React.ReactNode, children: React.ReactNode}) => {
  // left side 
  // right side 

  // Determine which pattern to use based on the title
  let pattern: React.ReactNode = null;
  if (title.includes('Productivity')) {
    // Triangles: 3, bigger and further apart
    pattern = (
      <div className="relative w-full h-full flex-1 flex items-center justify-center">
        <svg width="160" height="160" className="absolute left-[40%] top-[45%] rotate-[13deg]" viewBox="0 0 150 150"><polygon points="75,15 140,140 10,140" fill="#8854FF" /></svg>
        <svg width="130" height="130" className="absolute right-[-8%] top-[100%] rotate-[-37deg]" viewBox="0 0 130 130"><polygon points="65,10 120,120 10,120" fill="#8854FF" /></svg>
        <svg width="120" height="120" className="absolute left-[5%] bottom-[-8%] rotate-[61deg]" viewBox="0 0 120 120"><polygon points="60,10 110,110 10,110" fill="#8854FF" /></svg>
      </div>
    );
  } else if (title.includes('Blueprints')) {
    // Circles: 3, bigger and further apart (one dashed)
    pattern = (
      <div className="relative w-full h-full flex-1 flex items-center justify-center">
        <svg width="140" height="140" className="absolute left-[-6%] top-[-4%]" viewBox="0 0 140 140"><circle cx="70" cy="70" r="65" fill="#8854FF" /></svg>
        <svg width="110" height="110" className="absolute right-[-7%] top-[10%]" viewBox="0 0 110 110"><circle cx="55" cy="55" r="50" fill="#8854FF" /></svg>
        <svg width="120" height="120" className="absolute right-[8%] bottom-[10%]" viewBox="0 0 120 120"><circle cx="60" cy="60" r="50" fill="none" stroke="#8854FF" strokeWidth="8" strokeDasharray="12,12" /></svg>
      </div>
    );
  } else if (title.includes('Connections')) {
    // Stars: 3, bigger and further apart
    pattern = (
      <div className="relative w-full h-full flex-1 flex items-center justify-center">
        <svg width="120" height="120" className="absolute left-[-6%] top-[-6%] rotate-[-22deg]" viewBox="0 0 100 100"><polygon points="50,5 61,39 98,39 67,59 78,92 50,72 22,92 33,59 2,39 39,39" fill="#8854FF" /></svg>
        <svg width="100" height="100" className="absolute right-[-8%] top-[55%] rotate-[47deg]" viewBox="0 0 100 100"><polygon points="50,5 61,39 98,39 67,59 78,92 50,72 22,92 33,59 2,39 39,39" fill="#8854FF" /></svg>
        <svg width="110" height="110" className="absolute left-[60%] bottom-[-10%] rotate-[-61deg]" viewBox="0 0 100 100"><polygon points="50,5 61,39 98,39 67,59 78,92 50,72 22,92 33,59 2,39 39,39" fill="#8854FF" /></svg>
      </div>
    );
  }

  return (
    <div className="flex flex-row gap-16 w-full px-32 min-h-[40vh] my-0 py-0">
      <div className="flex flex-col gap-4 flex-start w-1/3 h-full border-r-1 border-black pr-8"> {/* 30 of element */}
        <div className="flex flex-col gap-4">   
          <div className="text-3xl font-fraunces font-regular flex flex-row gap-4">{title} <div className="">{icon}</div></div>
          <div className="flex flex-col gap-4">
            {children}
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-4 h-full w-2/3 relative min-h-[30vh]">
        {pattern}
      </div>
    </div>
  )
}
