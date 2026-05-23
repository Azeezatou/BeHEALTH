import { FaHandHoldingHeart } from 'react-icons/fa6'
import Button from '../ui/Button'

export default function DonateButton({ className = '' }) {
  return (
    <Button className={className}>
      <FaHandHoldingHeart className="mr-2" />
      Donate now
    </Button>
  )
}
