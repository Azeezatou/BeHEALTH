import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-[#ead8f3] bg-white">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 text-sm text-[#5c5065] sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="grid h-9 w-9 place-items-center rounded-full bg-primary text-xs font-black text-white ring-4 ring-[#f9d7ea]"
            >
              Be
            </span>
            <p className="text-lg font-bold text-secondary">
              <span className="text-primary">Be</span>Health
            </p>
          </div>
          <p className="mt-3 max-w-md">
            Verified medical crowdfunding for women and children, with admin review, Paystack donations, and smart-contract escrow support.
          </p>
        </div>
        <div>
          <p className="font-semibold text-secondary">Platform</p>
          <Link className="mt-3 block hover:text-primary" to="/explore">Explore campaigns</Link>
          <Link className="mt-2 block hover:text-primary" to="/campaigner/campaigns/new">Create campaign</Link>
          <Link className="mt-2 block hover:text-primary" to="/donor/donations">Donation history</Link>
        </div>
        <div>
          <p className="font-semibold text-secondary">Trust</p>
          <Link className="mt-3 block hover:text-primary" to="/admin/campaigns">Admin review</Link>
          <p className="mt-2">Private medical fields</p>
          <p className="mt-2">Escrow-backed giving</p>
        </div>
      </div>
    </footer>
  )
}
