import { useState } from 'react'
import { FaRegUser, FaShieldHeart } from 'react-icons/fa6'
import { useParams } from 'react-router-dom'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import CampaignProgress from '../../components/campaign/CampaignProgress'
import { formatCurrency, formatDate } from '../../utils/format'
import { sampleCampaigns } from '../../utils/sampleData'

const amounts = [1000, 5000, 10000, 20000, 50000]

export default function CampaignDetailPage() {
  const { id } = useParams()
  const [amount, setAmount] = useState(5000)
  const [method, setMethod] = useState('card')
  const campaign = sampleCampaigns.find((item) => item.id === id) || sampleCampaigns[0]

  return (
    <section className="bg-[#fff7fb]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_420px] lg:px-8">
        <div className="grid gap-6">
          <Card className="overflow-hidden">
            <div className="grid min-h-72 place-items-center bg-gradient-to-br from-[#f9d7ea] via-white to-[#eee8fb] p-8">
              <div className="grid h-24 w-24 place-items-center rounded-full bg-white text-3xl font-bold text-secondary shadow-sm ring-1 ring-[#ead8f3]">
                {campaign.initials || <FaRegUser aria-hidden="true" />}
              </div>
            </div>
            <div className="p-6">
              <div className="flex flex-wrap gap-2">
                <Badge tone="purple">{campaign.healthCondition}</Badge>
                <Badge tone="urgent">Urgent</Badge>
                <Badge tone="pink"><FaShieldHeart className="mr-1" aria-hidden="true" /> Verified</Badge>
              </div>
              <h1 className="mt-5 text-3xl font-bold leading-tight text-secondary sm:text-4xl">{campaign.name}</h1>
              <p className="mt-3 text-[#5c5065]">{campaign.medicalFacility}</p>
              <div className="mt-6">
                <CampaignProgress raisedAmount={campaign.raisedAmount} targetAmount={campaign.targetAmount} />
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3 text-center text-sm">
                <div className="rounded-md bg-[#fff7fb] p-3 ring-1 ring-[#ead8f3]">
                  <p className="font-bold text-secondary">{formatCurrency(campaign.raisedAmount)}</p>
                  <p className="mt-1 text-xs text-[#63546c]">Raised</p>
                </div>
                <div className="rounded-md bg-[#fff7fb] p-3 ring-1 ring-[#ead8f3]">
                  <p className="font-bold text-secondary">{Math.round((campaign.raisedAmount / campaign.targetAmount) * 100)}%</p>
                  <p className="mt-1 text-xs text-[#63546c]">of goal</p>
                </div>
                <div className="rounded-md bg-[#fff7fb] p-3 ring-1 ring-[#ead8f3]">
                  <p className="font-bold text-secondary">{campaign.donorCount}</p>
                  <p className="mt-1 text-xs text-[#63546c]">Donors</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-bold text-secondary">About this campaign</h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-[#3b3241]">{campaign.description}</p>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-bold text-secondary">Campaign updates</h2>
            <div className="mt-5 border-l-2 border-primary pl-5">
              <p className="text-sm font-semibold text-secondary">Verification documents prepared</p>
              <p className="mt-2 text-sm leading-6 text-[#5c5065]">The campaigner has prepared medical documents and family contact details for admin review.</p>
              <p className="mt-2 text-xs font-semibold text-[#7a6c82]">May 14, 2026</p>
            </div>
          </Card>
        </div>

        <aside className="grid content-start gap-5">
          <Card className="p-6">
            <h2 className="text-xl font-bold text-secondary">Make a donation</h2>
            <div className="mt-4 grid grid-cols-2 rounded-md border border-[#dccde8] bg-[#fff7fb] p-1">
              {['card', 'crypto'].map((item) => (
                <button
                  className={`rounded px-3 py-2 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                    method === item ? 'bg-primary text-white' : 'text-[#5c5065] hover:bg-white'
                  }`}
                  key={item}
                  onClick={() => setMethod(item)}
                  type="button"
                >
                  {item === 'card' ? 'Card (fiat)' : 'Crypto'}
                </button>
              ))}
            </div>
            <div className="mt-5 grid grid-cols-3 gap-2">
              {amounts.map((value) => (
                <button
                  className={`min-h-11 rounded-md border px-3 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                    amount === value ? 'border-primary bg-[#f9d7ea] text-secondary' : 'border-[#dccde8] bg-white text-[#3b3241] hover:border-primary'
                  }`}
                  key={value}
                  onClick={() => setAmount(value)}
                  type="button"
                >
                  {formatCurrency(value)}
                </button>
              ))}
              <button className="min-h-11 rounded-md border border-[#dccde8] bg-white px-3 text-sm font-bold text-[#3b3241] transition hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" type="button">
                Custom
              </button>
            </div>
            <div className="mt-4 rounded-md border border-[#dccde8] bg-white px-4 py-3 text-lg font-bold text-secondary">
              {formatCurrency(amount)}
            </div>
            <Button className="mt-4 w-full">Donate {formatCurrency(amount)} now</Button>
            <p className="mt-3 text-center text-xs leading-5 text-[#63546c]">
              {method === 'card' ? 'Secured by Paystack. All major cards accepted.' : 'Crypto donations are held in escrow until the goal is met.'}
            </p>
          </Card>

          <Card className="p-6">
            <dl className="grid gap-4 text-sm">
              <div className="flex justify-between gap-4 border-b border-[#ead8f3] pb-3">
                <dt className="text-[#63546c]">Medical facility</dt>
                <dd className="font-bold text-secondary">{campaign.medicalFacility}</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-[#ead8f3] pb-3">
                <dt className="text-[#63546c]">Condition</dt>
                <dd className="font-bold text-secondary">{campaign.healthCondition}</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-[#ead8f3] pb-3">
                <dt className="text-[#63546c]">Target date</dt>
                <dd className="font-bold text-secondary">{formatDate(campaign.targetDate)}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-[#63546c]">Status</dt>
                <dd className="font-bold text-primary">{campaign.status}</dd>
              </div>
            </dl>
          </Card>
        </aside>
      </div>
    </section>
  )
}
