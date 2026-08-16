import type { Transaction } from '../types'
import { formatCurrency, formatDate } from '../lib/format'
import { categoryMeta } from '../lib/category'

export function TransactionRow({ transaction }: { transaction: Transaction }) {
  const { label, icon: Icon } = categoryMeta[transaction.category]
  const isCredit = transaction.direction === 'credit'

  return (
    <div className="flex items-center justify-between py-3.5">
      <div className="flex items-center gap-3.5 min-w-0">
        <div className="size-9 shrink-0 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
          <Icon className="size-4.5" strokeWidth={1.75} />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-900 truncate">{transaction.description}</p>
          <p className="text-xs text-slate-500">
            {label} · {formatDate(transaction.date)}
          </p>
        </div>
      </div>
      <span
        className={`text-sm font-semibold tabular shrink-0 ${isCredit ? 'text-emerald-600' : 'text-slate-900'}`}
      >
        {isCredit ? '+' : '−'}
        {formatCurrency(transaction.amount)}
      </span>
    </div>
  )
}
