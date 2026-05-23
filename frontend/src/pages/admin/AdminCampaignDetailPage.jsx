import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import Modal from '../../components/ui/Modal'
import { sampleCampaigns } from '../../utils/sampleData'

const checks = ['Documents uploaded', 'Doctor contact verifiable', 'No duplicate campaign', 'Condition matches description']

export default function AdminCampaignDetailPage() {
  const { id } = useParams()
  const [rejectOpen, setRejectOpen] = useState(false)
  const campaign = sampleCampaigns.find((item) => item.id === id) || sampleCampaigns[0]

  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8">
      <div>
        <h1 className="text-4xl font-bold text-secondary">{campaign.name}</h1>
        <Card className="mt-8 p-6">
          <h2 className="text-xl font-bold text-secondary">Full campaign information</h2>
          <dl className="mt-5 grid gap-4 text-sm md:grid-cols-2">
            <div><dt className="font-bold text-secondary">Medical facility</dt><dd className="mt-1 text-[#6a5362]">{campaign.medicalFacility}</dd></div>
            <div><dt className="font-bold text-secondary">Doctor contact</dt><dd className="mt-1 text-[#6a5362]">Private field visible to admin</dd></div>
            <div><dt className="font-bold text-secondary">Family contact</dt><dd className="mt-1 text-[#6a5362]">Private field visible to admin</dd></div>
            <div><dt className="font-bold text-secondary">Wallet address</dt><dd className="mt-1 text-[#6a5362]">Required before approval</dd></div>
          </dl>
        </Card>
      </div>
      <aside>
        <Card className="p-6">
          <h2 className="text-xl font-bold text-secondary">Verification checklist</h2>
          <div className="mt-5 grid gap-3">
            {checks.map((check) => (
              <label className="flex items-center gap-3 text-sm font-semibold text-[#513448]" key={check}>
                <input className="h-4 w-4 accent-primary" type="checkbox" />
                {check}
              </label>
            ))}
          </div>
          <div className="mt-6 grid gap-3">
            <Button className="bg-emerald-600 hover:bg-emerald-700">Approve campaign</Button>
            <Button onClick={() => setRejectOpen(true)} variant="secondary">Reject campaign</Button>
          </div>
        </Card>
      </aside>
      <Modal isOpen={rejectOpen} title="Reject campaign">
        <textarea className="min-h-32 w-full rounded-md border border-[#ead1df] p-3 outline-none focus:border-primary" placeholder="Add rejection notes for the campaigner" />
        <div className="mt-4 flex gap-3">
          <Button variant="outline" onClick={() => setRejectOpen(false)}>Cancel</Button>
          <Button variant="secondary">Send rejection</Button>
        </div>
      </Modal>
    </section>
  )
}
