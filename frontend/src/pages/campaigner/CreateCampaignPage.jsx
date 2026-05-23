import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import Input from '../../components/ui/Input'
import Select from '../../components/ui/Select'
import { healthConditions } from '../../utils/healthConditions'

export default function CreateCampaignPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-secondary">Create campaign</h1>
      <p className="mt-3 text-[#6a5362]">Save medical, contact, funding, and verification details before submitting for admin review.</p>
      <Card className="mt-8 p-6">
        <form className="grid gap-8">
          <div className="grid gap-4 md:grid-cols-2">
            <Input label="Campaign name" placeholder="Emergency care for..." />
            <Select label="Health condition">
              {healthConditions.map((condition) => <option key={condition}>{condition}</option>)}
            </Select>
            <Input className="md:col-span-2" label="Description" placeholder="Describe the medical need" textarea />
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <Input label="Medical facility" />
            <Input label="Hospital ward" />
            <Input label="Doctor name" />
            <Input label="Doctor phone" />
            <Input label="Doctor email" type="email" />
            <Input label="Target amount" type="number" />
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <Input label="Patient family name" />
            <Input label="Family phone" />
            <Input label="Relationship" />
            <Input label="Bank name" />
            <Input label="Account number" />
            <Input label="Wallet address" />
          </div>
          <div className="rounded-lg border border-dashed border-[#dca8c7] bg-[#fff7fb] p-6 text-sm font-semibold text-[#6a5362]">
            Upload area prepared for supporting photos and medical documents.
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button variant="outline">Save draft</Button>
            <Button>Submit for review</Button>
          </div>
        </form>
      </Card>
    </section>
  )
}
