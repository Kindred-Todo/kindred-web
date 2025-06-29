import Bento from './bento'
import Title from '@/components/typography/title'

export default function HowItWorks() {
  return (
    <>
      <div className=" flex flex-col items-center gap-16">
        <Title>Our model revolves around tools for your 
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
        <Bento />
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
