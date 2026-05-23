import { FaArrowRight, FaCheck, FaHeartPulse, FaShieldHeart, FaWallet } from 'react-icons/fa6'
import CampaignCard from '../../components/campaign/CampaignCard'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import { sampleCampaigns } from '../../utils/sampleData'

const impact = [
  ['₦124M', 'Total raised'],
  ['1,840', 'Campaigns funded'],
  ['9,200+', 'Donors'],
  ['12', 'Crypto chains planned'],
]

const steps = [
  {
    icon: FaHeartPulse,
    title: 'Create your campaign',
    copy: 'Fill in medical details, contact information, proof documents, and your funding goal.',
  },
  {
    icon: FaCheck,
    title: 'Get verified',
    copy: 'Admins review the campaign before it appears publicly to donors.',
  },
  {
    icon: FaWallet,
    title: 'Receive donations',
    copy: 'Donors give by card or crypto while sensitive details stay private.',
  },
]

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#f9d7ea]">
        <div className="absolute inset-x-0 top-0 h-28 bg-white/35" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-secondary shadow-sm ring-1 ring-[#ead8f3]">
              <FaShieldHeart className="text-primary" aria-hidden="true" />
              Health funding for those who need it most
            </div>
            <h1 className="mt-7 text-4xl font-bold leading-tight text-secondary sm:text-5xl lg:text-6xl">
              Real help for women and children facing health crises
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#3b3241] sm:text-lg">
              BeHEALTH connects patients and families with donors ready to fund medical journeys through reviewed campaigns, Paystack, and crypto escrow.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button to="/campaigner/campaigns/new" variant="secondary">Start a campaign</Button>
              <Button to="/explore">Donate to a campaign</Button>
            </div>
          </div>

          <div className="mt-14 grid gap-3 rounded-lg border border-white/70 bg-white/55 p-3 shadow-sm backdrop-blur sm:grid-cols-2 lg:grid-cols-4">
            {impact.map(([value, label]) => (
              <div className="rounded-md bg-white px-5 py-5 text-center ring-1 ring-[#ead8f3]" key={label}>
                <p className="text-2xl font-bold text-primary">{value}</p>
                <p className="mt-1 text-sm font-semibold text-[#5c5065]">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <h2 className="text-3xl font-bold text-secondary">Urgent campaigns</h2>
              <p className="mt-3 max-w-2xl text-[#5c5065]">Every campaign card is designed for quick scanning: condition, urgency, donors, and funding progress.</p>
            </div>
            <Button to="/explore" variant="outline">
              See all
              <FaArrowRight className="ml-2" aria-hidden="true" />
            </Button>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {sampleCampaigns.map((campaign) => <CampaignCard campaign={campaign} key={campaign.id} />)}
          </div>
        </div>
      </section>

      <section className="bg-secondary text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold">How it works</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {steps.map((step) => {
              const Icon = step.icon
              return (
                <div className="rounded-lg border border-white/15 bg-white/10 p-6" key={step.title}>
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-[#f9d7ea] text-primary">
                    <Icon aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold">{step.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#eee8fb]">{step.copy}</p>
                </div>
              )
            })}
          </div>
          <Card className="mt-10 grid gap-4 bg-white p-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h2 className="text-2xl font-bold text-secondary">Ready to make a difference?</h2>
              <p className="mt-2 text-[#5c5065]">Join as a donor or start your own campaign today.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button to="/auth/signup">I want to donate</Button>
              <Button to="/auth/signup" variant="secondary">I need funding</Button>
            </div>
          </Card>
        </div>
      </section>
    </>
  )
}
