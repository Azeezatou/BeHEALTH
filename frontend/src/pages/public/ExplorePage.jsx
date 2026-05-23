import CampaignCard from '../../components/campaign/CampaignCard'
import Input from '../../components/ui/Input'
import Select from '../../components/ui/Select'
import { healthConditions } from '../../utils/healthConditions'
import { sampleCampaigns } from '../../utils/sampleData'

export default function ExplorePage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <h1 className="text-4xl font-bold text-secondary">Explore campaigns</h1>
          <p className="mt-3 max-w-2xl text-[#5c5065]">Discover active medical campaigns reviewed for trust and privacy.</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <Input aria-label="Search campaigns" placeholder="Search campaigns" />
          <Select aria-label="Filter by condition">
            <option>All conditions</option>
            {healthConditions.map((condition) => <option key={condition}>{condition}</option>)}
          </Select>
        </div>
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {sampleCampaigns.map((campaign) => <CampaignCard campaign={campaign} key={campaign.id} />)}
      </div>
    </section>
  )
}
