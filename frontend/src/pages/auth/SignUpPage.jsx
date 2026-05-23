import { useState } from 'react'
import { FaArrowRight, FaHandHoldingHeart, FaRegHospital } from 'react-icons/fa6'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import Input from '../../components/ui/Input'
import { useAuth } from '../../hooks/useAuth'

const roles = [
  {
    icon: FaHandHoldingHeart,
    label: 'Donor',
    value: 'DONOR',
    copy: 'I want to fund health campaigns',
  },
  {
    icon: FaRegHospital,
    label: 'Campaigner',
    value: 'CAMPAIGNER',
    copy: 'I need help funding treatment',
  },
]

export default function SignUpPage() {
  const { signUp } = useAuth()
  const navigate = useNavigate()
  const [role, setRole] = useState('DONOR')
  const [step, setStep] = useState(1)
  const [message, setMessage] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    await signUp({ email: form.get('email'), password: form.get('password'), role })
    setMessage('Check your email to verify your account.')
  }

  return (
    <section className="bg-[#f9d7ea] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
        <Card className="p-6 sm:p-8">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-secondary"><span className="text-primary">Be</span>HEALTH</p>
            <div className="flex gap-1">
              <span className={`h-2 w-8 rounded-full ${step === 1 ? 'bg-primary' : 'bg-[#d7c7e7]'}`} />
              <span className={`h-2 w-8 rounded-full ${step === 2 ? 'bg-primary' : 'bg-[#d7c7e7]'}`} />
            </div>
          </div>
          <h1 className="mt-10 text-3xl font-bold text-secondary">Join BeHEALTH</h1>
          <p className="mt-2 text-[#5c5065]">Are you here to give or receive help?</p>

          {message ? (
            <div className="mt-8 rounded-lg bg-[#f9d7ea] p-5 font-semibold text-secondary">{message}</div>
          ) : (
            <>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {roles.map((item) => {
                  const Icon = item.icon
                  const selected = role === item.value
                  return (
                    <button
                      aria-pressed={selected}
                      className={`rounded-lg border p-5 text-center transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                        selected ? 'border-primary bg-[#f9d7ea] shadow-sm' : 'border-[#dccde8] bg-white hover:border-primary hover:bg-[#fff7fb]'
                      }`}
                      key={item.value}
                      onClick={() => setRole(item.value)}
                      type="button"
                    >
                      <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-white text-primary shadow-sm">
                        <Icon aria-hidden="true" />
                      </span>
                      <span className="mt-4 block font-bold text-secondary">{item.label}</span>
                      <span className="mt-2 block text-sm leading-5 text-[#5c5065]">{item.copy}</span>
                    </button>
                  )
                })}
              </div>
              <Button className="mt-6 w-full" onClick={() => setStep(2)}>
                Continue as {role === 'DONOR' ? 'donor' : 'campaigner'}
                <FaArrowRight className="ml-2" aria-hidden="true" />
              </Button>
              <p className="mt-5 text-center text-sm text-[#5c5065]">
                Already have an account? <Link className="font-semibold text-primary hover:text-[#bd2f83]" to="/auth/signin">Sign in</Link>
              </p>
            </>
          )}
        </Card>

        <Card className="p-6 sm:p-8">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-secondary"><span className="text-primary">Be</span>HEALTH</p>
            <p className="rounded-full bg-[#f9d7ea] px-3 py-1 text-xs font-bold text-secondary">Step {step} of 2</p>
          </div>
          <h2 className="mt-10 text-3xl font-bold text-secondary">Create your account</h2>
          <p className="mt-2 text-[#5c5065]">
            You are signing up as a <span className="font-bold text-primary">{role === 'DONOR' ? 'Donor' : 'Campaigner'}</span>
          </p>
          <form className="mt-8 grid gap-5" onSubmit={handleSubmit}>
            <Input label="Full name" name="fullName" placeholder="Ada Okafor" type="text" />
            <Input label="Email address" name="email" placeholder="ada@example.com" required type="email" />
            <Input label="Password" minLength="8" name="password" placeholder="Minimum 8 characters" required type="password" />
            <Button disabled={step !== 2 || Boolean(message)} type="submit">Create account</Button>
          </form>
          <div className="mt-6 border-t border-[#ead8f3] pt-5 text-center text-sm text-[#5c5065]">
            Already have an account? <button className="font-semibold text-primary hover:text-[#bd2f83]" onClick={() => navigate('/auth/signin')} type="button">Sign in</button>
          </div>
        </Card>
      </div>
    </section>
  )
}
