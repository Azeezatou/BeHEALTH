import { Link } from 'react-router-dom'
import Badge from '../../components/ui/Badge'
import Card from '../../components/ui/Card'
import { sampleCampaigns } from '../../utils/sampleData'

export default function AdminCampaignQueuePage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-4xl font-bold text-secondary">Campaign review queue</h1>
          <p className="mt-3 text-[#6a5362]">Default view: campaigns waiting for admin verification.</p>
        </div>
        <Badge tone="purple">PENDING_REVIEW</Badge>
      </div>
      <Card className="mt-8 overflow-hidden">
        <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr] gap-4 border-b border-[#f3d1e3] bg-[#fff7fb] p-4 text-sm font-bold text-secondary">
          <span>Campaign</span>
          <span>Condition</span>
          <span>Campaigner</span>
          <span>Status</span>
        </div>
        {sampleCampaigns.map((campaign) => (
          <Link className="grid grid-cols-[1.5fr_1fr_1fr_1fr] gap-4 border-b border-[#f7e4ee] p-4 text-sm hover:bg-[#fff7fb]" key={campaign.id} to={`/admin/campaigns/${campaign.id}`}>
            <span className="font-semibold text-secondary">{campaign.name}</span>
            <span>{campaign.healthCondition}</span>
            <span>campaigner@behealth.io</span>
            <span><Badge tone="purple">PENDING_REVIEW</Badge></span>
          </Link>
        ))}
      </Card>
    </section>
  )
}
