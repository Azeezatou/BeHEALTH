import { Navigate, Route, Routes } from 'react-router-dom'
import AppShell from './components/layout/AppShell'
import AdminCampaignDetailPage from './pages/admin/AdminCampaignDetailPage'
import AdminCampaignQueuePage from './pages/admin/AdminCampaignQueuePage'
import AdminDashboardPage from './pages/admin/AdminDashboardPage'
import SignInPage from './pages/auth/SignInPage'
import SignUpPage from './pages/auth/SignUpPage'
import CampaignDashboardPage from './pages/campaigner/CampaignDashboardPage'
import CreateCampaignPage from './pages/campaigner/CreateCampaignPage'
import EditCampaignPage from './pages/campaigner/EditCampaignPage'
import MyCampaignsPage from './pages/campaigner/MyCampaignsPage'
import DonationHistoryPage from './pages/donor/DonationHistoryPage'
import DonorDashboardPage from './pages/donor/DonorDashboardPage'
import CampaignDetailPage from './pages/public/CampaignDetailPage'
import ExplorePage from './pages/public/ExplorePage'
import HomePage from './pages/public/HomePage'
import ProtectedRoute from './routes/ProtectedRoute'
import RoleRoute from './routes/RoleRoute'
import { useAuth } from './hooks/useAuth'

function DashboardRedirect() {
  const { user } = useAuth()
  const destinations = {
    ADMIN: '/admin',
    CAMPAIGNER: '/campaigner/dashboard',
    DONOR: '/donor/dashboard',
  }

  return <Navigate to={destinations[user?.role] || '/'} replace />
}

function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<HomePage />} />
        <Route path="explore" element={<ExplorePage />} />
        <Route path="campaigns/:id" element={<CampaignDetailPage />} />
        <Route path="auth/signup" element={<SignUpPage />} />
        <Route path="auth/signin" element={<SignInPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="dashboard" element={<DashboardRedirect />} />
          <Route element={<RoleRoute roles={['CAMPAIGNER']} />}>
            <Route path="campaigner/dashboard" element={<CampaignDashboardPage />} />
            <Route path="campaigner/campaigns/new" element={<CreateCampaignPage />} />
            <Route path="campaigner/campaigns/:id/edit" element={<EditCampaignPage />} />
            <Route path="campaigner/campaigns" element={<MyCampaignsPage />} />
          </Route>
          <Route element={<RoleRoute roles={['DONOR']} />}>
            <Route path="donor/dashboard" element={<DonorDashboardPage />} />
            <Route path="donor/donations" element={<DonationHistoryPage />} />
          </Route>
          <Route element={<RoleRoute roles={['ADMIN']} />}>
            <Route path="admin" element={<AdminDashboardPage />} />
            <Route path="admin/campaigns" element={<AdminCampaignQueuePage />} />
            <Route path="admin/campaigns/:id" element={<AdminCampaignDetailPage />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  )
}

export default App
