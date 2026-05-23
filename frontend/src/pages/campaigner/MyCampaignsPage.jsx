import Card from '../../components/ui/Card'

export default function MyCampaignsPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-secondary">My campaigns</h1>
      <Card className="mt-8 p-6">
        <p className="text-[#6a5362]">Campaign list is ready to connect to `GET /api/campaigns/my/campaigns`.</p>
      </Card>
    </section>
  )
}
