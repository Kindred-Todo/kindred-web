import Bento from './bento'

export default function HowItWorks() {
  return (
    <>
      <div className="h-[110vh] flex flex-col items-center gap-16">
        <p
          className="text-3xl px-12 font-medium"
          style={{
            fontSize: '2rem',
            fontWeight: '400',
          }}
        >
          here's how kindred helps
        </p>
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
