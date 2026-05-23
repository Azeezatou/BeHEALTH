import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import Sidebar from '../../components/layout/Sidebar'

export default function CampaignDashboardPage() {
  return (
    <section className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:px-6 lg:grid-cols-[260px_1fr] lg:px-8">
      <Sidebar items={[{ label: 'Overview', to: '/campaigner/dashboard' }, { label: 'My campaigns', to: '/campaigner/campaigns' }, { label: 'New campaign', to: '/campaigner/campaigns/new' }]} />
      <div>
        <h1 className="text-4xl font-bold text-secondary">Campaigner dashboard</h1>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {['Drafts', 'Pending review', 'Active campaigns'].map((label, index) => (
            <Card className="p-6" key={label}>
              <p className="text-3xl font-bold text-primary">{index === 0 ? 1 : 0}</p>
              <p className="mt-2 text-sm font-semibold text-[#6a5362]">{label}</p>
            </Card>
          ))}
        </div>
        <Button className="mt-8" to="/campaigner/campaigns/new">Create campaign</Button>
      </div>
    </section>
  )
}
