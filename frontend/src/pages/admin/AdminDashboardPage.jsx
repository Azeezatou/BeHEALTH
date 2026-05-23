import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import Sidebar from '../../components/layout/Sidebar'

export default function AdminDashboardPage() {
  return (
    <section className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:px-6 lg:grid-cols-[260px_1fr] lg:px-8">
      <Sidebar items={[{ label: 'Overview', to: '/admin' }, { label: 'Campaign queue', to: '/admin/campaigns' }]} />
      <div>
        <h1 className="text-4xl font-bold text-secondary">Admin dashboard</h1>
        <p className="mt-3 text-[#6a5362]">Review submitted campaigns, protect private data, and approve campaigns for public fundraising.</p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            ['4', 'Pending review'],
            ['12', 'Active campaigns'],
            ['2', 'Rejected this week'],
          ].map(([value, label]) => (
            <Card className="p-6" key={label}>
              <p className="text-3xl font-bold text-primary">{value}</p>
              <p className="mt-2 text-sm font-semibold text-[#6a5362]">{label}</p>
            </Card>
          ))}
        </div>
        <Button className="mt-8" to="/admin/campaigns">Open review queue</Button>
      </div>
    </section>
  )
}
