import Card from '../../components/ui/Card'

export default function DonationHistoryPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-secondary">Donation history</h1>
      <Card className="mt-8 p-6">
        <p className="text-[#6a5362]">Donation history is ready to connect to `GET /api/donations/my`.</p>
      </Card>
    </section>
  )
}
