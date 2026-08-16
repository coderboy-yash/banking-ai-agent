import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { AppLayout } from '../components/AppLayout'
import { getAccounts } from '../api/accounts'
import { formatCurrency, formatDate, initials, maskAccountNumber } from '../lib/format'
import type { Account } from '../types'

export default function Profile() {
  const { user } = useAuth()
  const [accounts, setAccounts] = useState<Account[]>([])

  useEffect(() => {
    if (!user) return
    getAccounts(user.id).then(setAccounts)
  }, [user])

  if (!user) return null

  return (
    <AppLayout title="Profile">
      <div className="max-w-md space-y-6">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm flex items-center gap-4">
          <div className="size-14 rounded-full bg-navy-700 text-white text-lg font-semibold flex items-center justify-center">
            {initials(user.name)}
          </div>
          <div>
            <p className="text-base font-semibold text-slate-900">{user.name}</p>
            <p className="text-sm text-slate-500">{user.email}</p>
            <p className="text-xs text-slate-400 mt-0.5">Member since {formatDate(user.memberSince)}</p>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-base font-semibold text-slate-900 mb-4">Linked accounts</h2>
          <div className="divide-y divide-slate-100">
            {accounts.map((a) => (
              <div key={a.id} className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-medium text-slate-900">
                    {a.type === 'checking' ? 'Checking' : 'Savings'}
                  </p>
                  <p className="text-xs text-slate-500">{maskAccountNumber(a.accountNumber)}</p>
                </div>
                <span className="text-sm font-semibold text-slate-900 tabular">
                  {formatCurrency(a.balance, a.currency)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
