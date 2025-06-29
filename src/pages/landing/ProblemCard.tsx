export default function ProblemCard() {
  return (
    <div className="h-screen flex flex-col items-center justify-space-around gap-32 px-8 md:px-32">
      <p className="font-light problem-text text-xl"></p>
      <p className="problem-statement">
        Social Media is a <span className="text-red-error">broken</span> time
        trap and is no longer designed around authentic connections
      </p>
      <p className="problem-statement">
        Its also hard to consistently meet your goals on time, form new habits,
        and stay organized
      </p>
      <p className="problem-statement">
      kindred is here to address that and shape a new model of productivity</p>
    </div>
  )
}
