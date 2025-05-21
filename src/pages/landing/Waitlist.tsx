import { useState } from 'react'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import logo from '@/assets/logo.svg'
import { SheetClose } from '@/components/ui/sheet'

export default function Waitlist() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = () => {
    console.log(name, email)
    fetch('https://kindredtodo.com/api/v1/Waitlist', {
      method: 'POST',
      body: JSON.stringify({
        name: name,
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
                toast.error('Error adding to waitlist: Invalid email address')
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
              'Error adding to waitlist, ' + JSON.stringify(json?.error),
            )
          }
        }
      })
      .catch((err) => {
        toast.error('Error adding to waitlist, ' + err)
      })
  }

  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <p className="font-fraunces italic text-4xl fraunces-axis">
        we're almost there
      </p>
      <p className="font-light text-center mt-4">
        People on our waitlist will be the first people invited to the
        platform's beta
      </p>
      <div className="flex flex-col gap-4 mt-8">
        <Input
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <SheetClose
          asChild
          className="flex flex-row items-center justify-center"
        >
          <button
            disabled={!name || !email}
            className="bg-primary h-12 hover:bg-dark-component text-light-bg px-6 py-3 rounded-xl disabled:opacity-50"
            onClick={handleSubmit}
          >
            <p className="text-light-bg">Submit</p>
          </button>
        </SheetClose>
        <p className="font-light text-center">
          You'll recieve occasional updates along the journey
        </p>
      </div>
      <div className="flex mt-12">
        <img src={logo} alt="Kindred" className="w-12 h-12 self-end" />
      </div>
    </div>
  )
}
