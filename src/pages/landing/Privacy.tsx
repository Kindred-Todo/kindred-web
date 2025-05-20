import eye from '@/assets/eye.svg'
import taskCreate from '@/assets/task-create.png'

export default function Privacy() {
  return (
    <div className="h-min-screen w-full flex flex-col bg-dark-bg pt-8 overflow-clip">
      <img
        src={eye}
        alt="eye"
        className="w-1/6 mix-blend-exclusion"
        style={{
          transform: 'translateY(50%) translateX(-10%)',
        }}
      />
      <p className="font-fraunces fraunces-axis-2 text-light-bg ml-12 w-3/4">
        but, i <span className="text-red-error">don’t</span> want my friends to
        see everything!
      </p>
      <div
        className="flex w-full justify-end mix-blend-exclusion"
        style={{
          transform: 'translateY(50%) translateX(-5%)',
        }}
      >
        <img src={eye} alt="eye" className="w-1/6 mix-blend-exclusion" />
      </div>
      <div className="flex flex-col md:flex-row px-6 md:px-16 gap-16 md:gap-0 justify-between">
        <img
          src={taskCreate}
          alt="task-create"
          className="w-full md:w-1/3 object-contain"
        />
        <p
          className="text-light-bg w-full md:w-2/5 font-light text-center md:text-left"
          style={{
            lineHeight: '200%',
          }}
        >
          <p className="text-light-bg font-medium text-center md:text-left">
            We get that you don’t want to share everything
          </p>
          <br />
          All your tasks & workspaces on kindred are private by default. You
          choose what your friends can see and which tasks are visible on your
          profile <br /> <br />
          Additionally, only your friends can see your posts and react to them.
          Kindred is intended to be used as a close friends app, however you can
          choose who you decide to connect with. <br /> <br />
          We plan to roll out private groups where you can choose which people
          can see which groups at a later point. Want it sooner? let us know,
          we’re listening
        </p>
      </div>
    </div>
  )
}
