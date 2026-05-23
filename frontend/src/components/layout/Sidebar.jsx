import { NavLink } from 'react-router-dom'

export default function Sidebar({ items }) {
  return (
    <aside className="rounded-lg border border-[#f3d1e3] bg-white p-3">
      {items.map((item) => (
        <NavLink
          className={({ isActive }) =>
            `block rounded-md px-4 py-3 text-sm font-semibold ${isActive ? 'bg-[#fdebf5] text-primary' : 'text-[#594052] hover:bg-[#fff7fb]'}`
          }
          key={item.to}
          to={item.to}
        >
          {item.label}
        </NavLink>
      ))}
    </aside>
  )
}
