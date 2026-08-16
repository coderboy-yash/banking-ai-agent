import { Link } from 'react-router-dom'
import { Landmark } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const navLinks = [
  { label: 'Personal', to: null },
  { label: 'Accounts', to: '/accounts' },
  { label: 'Cards', to: '/cards' },
  { label: 'Loans', to: '/loans' },
  { label: 'Policies', to: '/policies' },
]

export function PublicHeader() {
  const { user } = useAuth()

  return (
    <header className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <Landmark className="size-6 text-white" strokeWidth={1.75} />
          <span className="font-semibold text-lg tracking-tight">Yash Bank</span>
        </Link>
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) =>
            link.to ? (
              <Link
                key={link.label}
                to={link.to}
                className="text-sm text-white/70 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ) : (
              <span key={link.label} className="text-sm text-white/70 hover:text-white cursor-default transition-colors">
                {link.label}
              </span>
            ),
          )}
        </nav>
        <div className="flex items-center gap-3 shrink-0">
          {user ? (
            <Link
              to="/dashboard"
              className="inline-flex items-center rounded-full bg-maroon-700 px-4 py-2 text-sm font-semibold hover:bg-maroon-600 transition-colors"
            >
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link
                to="/signup"
                className="hidden sm:inline-flex items-center rounded-full bg-maroon-700 px-4 py-2 text-sm font-semibold hover:bg-maroon-600 transition-colors"
              >
                Open Account
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center rounded-full border border-white/30 px-4 py-2 text-sm font-semibold hover:bg-white/10 transition-colors"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
