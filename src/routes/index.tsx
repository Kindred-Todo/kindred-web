import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import Input from '@/components/input'
import PrimaryButton from '@/components/primarybutton'
import { Toaster } from '@/components/ui/sonner'
import { toast } from 'sonner'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')

  return (
    <div className="bg-background-dark w-full h-screen overflow-none">
      <div className="flex flex-col gap-2 h-screen justify-center ml-4 sm:ml-16 relative z-10 overflow-none">
        <p className="text-color text-body fraunces">Coming Soon</p>
        <h1 className="hero-text text-color md:text-8xl lg:text-9xl text-8xl">
          Kindred
        </h1>
        <p className="text-body text-color">
          Join our waitlist and become one of the first to experience Kindred!
        </p>
        <div className="flex flex-col gap-4 md:flex-row md:w-1/2 w-5/6">
          <Input
            placeholder="Full Name"
            value={fullName}
            onChange={setFullName}
          />
          <Input placeholder="Email" value={email} onChange={setEmail} />
          <Toaster />
          <PrimaryButton
            disabled={fullName === '' || email === ''}
            onClick={() => {
              fetch('http://kindredtodo.com/api/v1/Waitlist', {
                method: 'POST',
                body: JSON.stringify({
                  name: fullName,
                  email: email,
                }),
                headers: {
                  'Content-Type': 'application/json',
                },
              })
                .then(async (res) => {
                  console.log(res)
                  if (res.ok) {
                    toast.success('Successfully added to the waitlist!')
                  } else {
                    const json = await res.json()
                    if (Array.isArray(json)) {
                      for (const error of json) {
                        console.log(error)
                        if (error.Tag === 'email') {
                          toast.error(
                            'Error adding to waitlist: Invalid email address',
                          )
                        } else {
                          toast.error(
                            'Error adding to waitlist, ' +
                              error.FailedField +
                              ': ' +
                              error.Tag,
                          )
                        }
                      }
                    } else {
                      toast.error(
                        'Error adding to waitlist, ' +
                          JSON.stringify(json?.error),
                      )
                    }
                  }
                })
                .catch((err) => {
                  toast.error('Error adding to waitlist, ' + err)
                })
            }}
          >
            Join
          </PrimaryButton>
        </div>
        <div className="text-color text-body mt-24">
          Productivity Meets Social
        </div>
      </div>
      <div className="fixed top-0 left-0 w-screen max-w-screen z-0 overflow-hidden">
        <svg
          width="476"
          height="152"
          viewBox="0 0 476 152"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="198.5" cy="-185.5" r="277.5" fill="#854DFF" />
        </svg>
      </div>

      <div className="absolute top-0 right-0 max-w-screen h-screen overflow-none z-0 hidden sm:block">
        <svg
          viewBox={`0 0 880 ${window.innerHeight * 1.1}`}
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="720"
            cy={window.innerHeight * 1.1}
            r="410"
            fill="#854DFF"
          />
          <circle
            cx="872.5"
            cy={window.innerHeight * 0.4}
            r="314.5"
            fill="#854DFF"
          />
          <circle
            cx="187"
            cy={window.innerHeight * 1.15}
            r="187"
            fill="#854DFF"
          />
        </svg>
      </div>

      <div className="fixed bottom-0 right-0 max-w-screen z-0 block sm:hidden overflow-none">
        <svg
          width="274"
          height={window.innerHeight}
          viewBox={`0 0 274 ${window.innerHeight}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="115"
            cy={window.innerHeight * 1.1}
            r="115"
            fill="#854DFF"
          />
          <circle
            cx="278"
            cy={window.innerHeight * 0.96}
            r="115"
            fill="#854DFF"
          />
        </svg>
      </div>
    </div>
  )
}
