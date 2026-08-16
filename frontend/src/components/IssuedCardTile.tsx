import { CreditCard, Wallet } from 'lucide-react'
import type { IssuedCard } from '../types'
import { formatCurrency, formatDate } from '../lib/format'

export function IssuedCardTile({ card }: { card: IssuedCard }) {
  const isCredit = card.type === 'credit'
  const Icon = isCredit ? CreditCard : Wallet
  const utilizationPct =
    isCredit && card.creditLimit ? Math.round(((card.outstanding ?? 0) / card.creditLimit) * 100) : 0

  return (
    <div className="rounded-xl border-2 border-maroon-500 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-500">
          <Icon className="size-4.5" strokeWidth={1.75} />
          <span className="text-sm font-medium">{card.name}</span>
        </div>
        <span className="text-xs text-slate-400 tabular">•••• {card.last4}</span>
      </div>

      {isCredit ? (
        <div className="mt-4">
          <p className="text-2xl font-semibold text-slate-900 tabular">{formatCurrency(card.outstanding ?? 0)}</p>
          <p className="text-xs text-slate-400">outstanding of {formatCurrency(card.creditLimit ?? 0)} limit</p>
          <div className="mt-3 h-2 w-full rounded-full bg-slate-100 overflow-hidden">
            <div className="h-full rounded-full bg-maroon-600" style={{ width: `${utilizationPct}%` }} />
          </div>
        </div>
      ) : (
        <p className="mt-4 text-sm text-slate-400">Linked to your Checking Account</p>
      )}

      <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
        {card.recentActivity.map((a) => (
          <div key={a.id} className="flex items-center justify-between text-xs">
            <span className="text-slate-600">
              {a.description} <span className="text-slate-400">· {formatDate(a.date)}</span>
            </span>
            <span className="font-medium text-slate-800 tabular">{formatCurrency(a.amount)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
