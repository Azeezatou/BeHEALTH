import { formatCurrency } from '../../utils/format'

export default function CampaignProgress({ raisedAmount, targetAmount }) {
  const percentage = Math.min(Math.round((Number(raisedAmount) / Number(targetAmount)) * 100), 100)

  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="font-semibold text-secondary">{formatCurrency(raisedAmount)} raised</span>
        <span className="text-[#63546c]">{percentage}% of {formatCurrency(targetAmount)}</span>
      </div>
      <div className="mt-3 h-3 overflow-hidden rounded-full bg-[#eadff3]">
        <div className="h-full rounded-full bg-primary" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  )
}
