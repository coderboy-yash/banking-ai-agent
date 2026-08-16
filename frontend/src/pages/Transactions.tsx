import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { AppLayout } from '../components/AppLayout'
import { TransactionRow } from '../components/TransactionRow'
import { getAccounts } from '../api/accounts'
import { getTransactions } from '../api/transactions'
import { maskAccountNumber } from '../lib/format'
import { accountTypeMeta } from '../lib/accountTypes'
import type { Account, Transaction } from '../types'

export default function Transactions() {
  const { user } = useAuth()
  const [accounts, setAccounts] = useState<Account[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [accountId, setAccountId] = useState<string>('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    getAccounts(user.id).then(setAccounts)
  }, [user])

  useEffect(() => {
    if (!user) return
    setLoading(true)
    getTransactions(user.id, accountId === 'all' ? undefined : accountId).then((txns) => {
      setTransactions(txns)
      setLoading(false)
    })
  }, [user, accountId])

  return (
    <AppLayout title="Transactions">
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm text-slate-500">Full transaction history across your accounts</p>
        <select
          value={accountId}
          onChange={(e) => setAccountId(e.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-maroon-600"
        >
          <option value="all">All accounts</option>
          {accounts.map((a) => (
            <option key={a.id} value={a.id}>
              {accountTypeMeta[a.type].label} {maskAccountNumber(a.accountNumber)}
            </option>
          ))}
        </select>
      </div>

      <div className="rounded-xl border-2 border-maroon-500 bg-white px-6 shadow-sm">
        {loading ? (
          <p className="py-6 text-sm text-slate-400">Loading transactions…</p>
        ) : transactions.length === 0 ? (
          <p className="py-6 text-sm text-slate-400">No transactions yet.</p>
        ) : (
          <div className="divide-y divide-slate-100">
            {transactions.map((t) => (
              <TransactionRow key={t.id} transaction={t} />
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  )
}
