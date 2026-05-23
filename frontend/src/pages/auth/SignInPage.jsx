import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import Input from '../../components/ui/Input'
import { useAuth } from '../../hooks/useAuth'

export default function SignInPage() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    const form = new FormData(event.currentTarget)
    try {
      const user = await signIn({ email: form.get('email'), password: form.get('password') })
      const destinations = {
        ADMIN: '/admin',
        CAMPAIGNER: '/campaigner/dashboard',
        DONOR: '/donor/dashboard',
      }
      navigate(destinations[user.role] || '/')
    } catch (caught) {
      setError(caught.message)
    }
  }

  return (
    <section className="bg-[#f9d7ea] px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-xl">
      <Card className="p-6 sm:p-8">
        <p className="text-sm font-bold text-secondary"><span className="text-primary">Be</span>HEALTH</p>
        <h1 className="text-3xl font-bold text-secondary">Sign in</h1>
        <form className="mt-8 grid gap-5" onSubmit={handleSubmit}>
          <Input label="Email address" name="email" required type="email" />
          <Input label="Password" name="password" required type="password" />
          {error ? <p className="rounded-md bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p> : null}
          <Button type="submit">Sign in</Button>
        </form>
      </Card>
      </div>
    </section>
  )
}
