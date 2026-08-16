import { Car, Home } from 'lucide-react'
import type { Loan } from '../types'
import { formatCurrency, formatDate } from '../lib/format'

const typeMeta = {
  car: { label: 'Car Loan', icon: Car },
  home: { label: 'Home Loan', icon: Home },
}

export function LoanCard({ loan }: { loan: Loan }) {
  const { label, icon: Icon } = typeMeta[loan.type]
  const paidPct = loan.principal > 0 ? Math.round((loan.amountPaid / loan.principal) * 100) : 0
  const isApproved = loan.status === 'approved'

  return (
    <div className="rounded-xl border-2 border-maroon-500 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2 text-slate-500">
          <Icon className="size-4.5" strokeWidth={1.75} />
          <span className="text-sm font-medium">{label}</span>
        </div>
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
            isApproved ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
          }`}
        >
          {isApproved ? 'Approved' : 'Pending'}
        </span>
      </div>

      <p className="mt-4 text-2xl font-semibold text-slate-900 tabular">{formatCurrency(loan.principal)}</p>
      <p className="text-xs text-slate-400">{loan.interestRate} · {loan.tenureMonths / 12}-year tenure</p>

      {isApproved ? (
        <div className="mt-4">
          <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
            <div className="h-full rounded-full bg-emerald-500" style={{ width: `${paidPct}%` }} />
          </div>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-slate-500">
              Paid <span className="font-medium text-slate-800 tabular">{formatCurrency(loan.amountPaid)}</span> ({paidPct}%)
            </span>
            <span className="text-slate-500">
              Due <span className="font-medium text-slate-800 tabular">{formatCurrency(loan.amountDue)}</span>
            </span>
          </div>
          <p className="mt-3 text-xs text-slate-400">Approved {loan.approvedDate && formatDate(loan.approvedDate)}</p>
        </div>
      ) : (
        <p className="mt-4 text-xs text-slate-400">
          Applied {formatDate(loan.appliedDate)} · Awaiting approval
        </p>
      )}
    </div>
  )
}
