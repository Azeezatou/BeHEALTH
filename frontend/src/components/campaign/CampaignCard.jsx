import { FaRegUser } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import Badge from '../ui/Badge'
import Card from '../ui/Card'
import CampaignProgress from './CampaignProgress'

export default function CampaignCard({ campaign }) {
  return (
    <Card className="group overflow-hidden transition duration-200 hover:-translate-y-1 hover:border-[#d7b7eb] hover:shadow-lg">
      <Link
        aria-label={`View ${campaign.name}`}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        to={`/campaigns/${campaign.id}`}
      >
        <div className="grid aspect-[4/3] place-items-center bg-gradient-to-br from-[#fff7fb] via-[#f9d7ea] to-[#eee8fb]">
          <div className="grid h-20 w-20 place-items-center rounded-full bg-white text-2xl font-bold text-secondary shadow-sm ring-1 ring-[#ead8f3]">
            {campaign.initials || <FaRegUser aria-hidden="true" />}
          </div>
        </div>
      </Link>
      <div className="grid gap-4 p-5">
        <div className="flex items-center justify-between gap-3">
          <Badge tone="purple">{campaign.healthCondition}</Badge>
          <span className="text-xs font-semibold text-[#63546c]">{campaign.donorCount} donors</span>
        </div>
        <div>
          <h3 className="text-lg font-bold text-secondary group-hover:text-primary">{campaign.name}</h3>
          <p className="mt-2 line-clamp-3 text-sm leading-6 text-[#5c5065]">{campaign.description}</p>
        </div>
        <CampaignProgress raisedAmount={campaign.raisedAmount} targetAmount={campaign.targetAmount} />
      </div>
    </Card>
  )
}
