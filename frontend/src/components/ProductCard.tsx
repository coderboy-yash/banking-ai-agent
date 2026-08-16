import type { LucideIcon } from 'lucide-react'
import { Check } from 'lucide-react'
import { Link } from 'react-router-dom'

export interface ProductCardData {
  icon: LucideIcon
  title: string
  tagline: string
  rateLabel: string
  rateValue: string
  benefits: string[]
  requirements: string[]
  ctaLabel?: string
}

export function ProductCard({ icon: Icon, title, tagline, rateLabel, rateValue, benefits, requirements, ctaLabel }: ProductCardData) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="size-10 rounded-lg bg-maroon-100 text-maroon-800 flex items-center justify-center">
              <Icon className="size-5" strokeWidth={1.75} />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-slate-900">{title}</h3>
            <p className="mt-1 text-sm text-slate-500">{tagline}</p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-xs text-slate-400">{rateLabel}</p>
            <p className="text-xl font-semibold text-maroon-800 tabular">{rateValue}</p>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6 p-6">
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-400">Benefits</h4>
          <ul className="mt-3 space-y-2">
            {benefits.map((b) => (
              <li key={b} className="flex items-start gap-2 text-sm text-slate-700">
                <Check className="size-4 text-maroon-700 shrink-0 mt-0.5" strokeWidth={2} />
                {b}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-400">Requirements</h4>
          <ul className="mt-3 space-y-2">
            {requirements.map((r) => (
              <li key={r} className="text-sm text-slate-600">
                {r}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="px-6 pb-6">
        <Link
          to="/signup"
          className="inline-flex items-center rounded-full bg-maroon-800 px-5 py-2 text-sm font-semibold text-white hover:bg-maroon-700 transition-colors"
        >
          {ctaLabel ?? 'Open account'}
        </Link>
      </div>
    </div>
  )
}
