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
    <div className="rounded-xl border-2 border-maroon-400 bg-gradient-to-br from-maroon-800 to-maroon-950 overflow-hidden">
      <div className="p-6 border-b border-white/15">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="size-10 rounded-lg bg-white/15 text-white flex items-center justify-center">
              <Icon className="size-5" strokeWidth={1.75} />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
            <p className="mt-1 text-sm text-white/70">{tagline}</p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-xs text-white/60">{rateLabel}</p>
            <p className="text-xl font-semibold text-gold-400 tabular">{rateValue}</p>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6 p-6">
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wide text-white/50">Benefits</h4>
          <ul className="mt-3 space-y-2">
            {benefits.map((b) => (
              <li key={b} className="flex items-start gap-2 text-sm text-white/90">
                <Check className="size-4 text-gold-400 shrink-0 mt-0.5" strokeWidth={2} />
                {b}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wide text-white/50">Requirements</h4>
          <ul className="mt-3 space-y-2">
            {requirements.map((r) => (
              <li key={r} className="text-sm text-white/70">
                {r}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="px-6 pb-6">
        <Link
          to="/signup"
          className="inline-flex items-center rounded-full bg-white px-5 py-2 text-sm font-semibold text-maroon-900 hover:bg-maroon-50 transition-colors"
        >
          {ctaLabel ?? 'Open account'}
        </Link>
      </div>
    </div>
  )
}
