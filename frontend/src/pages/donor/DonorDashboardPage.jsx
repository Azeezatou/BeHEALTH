import CampaignCard from '../../components/campaign/CampaignCard'
import Card from '../../components/ui/Card'
import { sampleCampaigns } from '../../utils/sampleData'

export default function DonorDashboardPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-secondary">Donor dashboard</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <Card className="p-6"><p className="text-3xl font-bold text-primary">0</p><p className="mt-2 text-sm font-semibold text-[#6a5362]">Total donations</p></Card>
        <Card className="p-6"><p className="text-3xl font-bold text-primary">0</p><p className="mt-2 text-sm font-semibold text-[#6a5362]">Campaigns supported</p></Card>
        <Card className="p-6"><p className="text-3xl font-bold text-primary">NGN 0</p><p className="mt-2 text-sm font-semibold text-[#6a5362]">Given this month</p></Card>
      </div>
      <h2 className="mt-10 text-2xl font-bold text-secondary">Recommended campaigns</h2>
      <div className="mt-5 grid gap-6 md:grid-cols-3">
        {sampleCampaigns.map((campaign) => <CampaignCard campaign={campaign} key={campaign.id} />)}
      </div>
    </section>
  )
}
