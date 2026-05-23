import { useState } from 'react'
import { FaBars, FaHandHoldingHeart, FaXmark } from 'react-icons/fa6'
import { Link, NavLink } from 'react-router-dom'
import Button from '../ui/Button'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Explore', to: '/explore' },
  { label: 'Campaigner', to: '/campaigner/dashboard' },
  { label: 'Admin', to: '/admin' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const linkClass = ({ isActive }) =>
    `rounded-md px-3 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
      isActive ? 'bg-[#f9d7ea] text-secondary' : 'text-[#3b3241] hover:bg-white hover:text-primary'
    }`

  return (
    <header className="sticky top-0 z-40 border-b border-[#ead8f3] bg-[#fff7fb]/85 backdrop-blur-xl">
      <nav className="mx-auto flex min-h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          className="flex items-center gap-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          onClick={() => setIsOpen(false)}
          to="/"
        >
          <span
            aria-hidden="true"
            className="grid h-10 w-10 place-items-center rounded-full bg-primary text-sm font-black text-white shadow-sm ring-4 ring-[#f9d7ea]"
          >
            Be
          </span>
          <span className="text-xl font-bold text-secondary">
            <span className="text-primary">Be</span>Health
          </span>
        </Link>
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <NavLink
              className={linkClass}
              key={item.to}
              to={item.to}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
        <div className="hidden items-center gap-3 md:flex">
          <Button to="/auth/signin" variant="ghost">Sign in</Button>
          <Button to="/explore">
            <FaHandHoldingHeart className="mr-2" />
            Donate
          </Button>
        </div>
        <button
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
          className="rounded-md p-2 text-secondary transition hover:bg-[#f9d7ea] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 md:hidden"
          onClick={() => setIsOpen((value) => !value)}
          type="button"
        >
          {isOpen ? <FaXmark /> : <FaBars />}
        </button>
      </nav>
      {isOpen ? (
        <div className="border-t border-[#ead8f3] bg-[#fff7fb] px-4 py-4 shadow-sm md:hidden">
          <div className="grid gap-2">
            {navItems.map((item) => (
              <NavLink className={linkClass} key={item.to} onClick={() => setIsOpen(false)} to={item.to}>
                {item.label}
              </NavLink>
            ))}
          </div>
          <div className="mt-4 grid gap-3">
            <Button to="/auth/signin" variant="outline">Sign in</Button>
            <Button to="/explore">
              <FaHandHoldingHeart className="mr-2" />
              Donate
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  )
}
