import { Landmark, PiggyBank } from 'lucide-react'
import type { Account } from '../types'
import { formatCurrency, maskAccountNumber } from '../lib/format'

const typeMeta = {
  checking: { label: 'Checking Account', icon: Landmark },
  savings: { label: 'Savings Account', icon: PiggyBank },
}

export function AccountCard({ account }: { account: Account }) {
  const { label, icon: Icon } = typeMeta[account.type]

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-500">
          <Icon className="size-4.5" strokeWidth={1.75} />
          <span className="text-sm font-medium">{label}</span>
        </div>
        <span className="text-xs text-slate-400 tabular">{maskAccountNumber(account.accountNumber)}</span>
      </div>
      <p className="mt-4 text-3xl font-semibold text-slate-900 tabular">
        {formatCurrency(account.balance, account.currency)}
      </p>
    </div>
  )
}
