import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Landmark } from 'lucide-react'

export function AuthLayout({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <Landmark className="size-6 text-maroon-900" strokeWidth={1.75} />
          <span className="text-maroon-900 font-semibold text-lg tracking-tight">Yash Bank</span>
        </Link>
        <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-xl font-semibold text-slate-900">{title}</h1>
          <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
          <div className="mt-6">{children}</div>
        </div>
      </div>
    </div>
  )
}
