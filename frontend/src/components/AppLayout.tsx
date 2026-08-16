import type { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { ArrowLeftRight, Landmark, LayoutDashboard, ListOrdered, LogOut, User as UserIcon } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { initials } from '../lib/format'

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/transactions', label: 'Transactions', icon: ListOrdered, end: false },
  { to: '/transfer', label: 'Transfer', icon: ArrowLeftRight, end: false },
  { to: '/profile', label: 'Profile', icon: UserIcon, end: false },
]

export function AppLayout({ title, children }: { title: string; children: ReactNode }) {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside className="w-64 shrink-0 bg-navy-950 text-navy-100 flex flex-col">
        <div className="flex items-center gap-2 px-6 py-6">
          <Landmark className="size-6 text-white" strokeWidth={1.75} />
          <span className="text-white font-semibold text-lg tracking-tight">Meridian Bank</span>
        </div>
        <nav className="flex-1 px-3 space-y-1">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-navy-800 text-white'
                    : 'text-navy-100/70 hover:bg-navy-900 hover:text-white'
                }`
              }
            >
              <Icon className="size-4.5" strokeWidth={1.75} />
              {label}
            </NavLink>
          ))}
        </nav>
        <button
          onClick={logout}
          className="flex items-center gap-3 mx-3 mb-6 rounded-lg px-3 py-2.5 text-sm font-medium text-navy-100/70 hover:bg-navy-900 hover:text-white transition-colors"
        >
          <LogOut className="size-4.5" strokeWidth={1.75} />
          Log out
        </button>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-8 py-4">
          <h1 className="text-xl font-semibold text-slate-900">{title}</h1>
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-600">{user?.name}</span>
            <div className="size-9 rounded-full bg-navy-700 text-white text-sm font-semibold flex items-center justify-center">
              {user ? initials(user.name) : ''}
            </div>
          </div>
        </header>
        <main className="flex-1 px-8 py-8">{children}</main>
      </div>
    </div>
  )
}
