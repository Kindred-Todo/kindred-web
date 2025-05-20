import Bento from './bento'

export default function HowItWorks() {
  return (
    <>
      <div className="h-screen flex flex-col items-center gap-16">
        <p className="text-4xl px-12 font-medium">how it works</p>
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
