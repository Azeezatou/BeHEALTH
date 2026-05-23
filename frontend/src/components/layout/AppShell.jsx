import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Navbar from './Navbar'

export default function AppShell() {
  return (
    <div className="min-h-screen bg-[#fff7fb] font-poppins text-[#1f1724]">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
