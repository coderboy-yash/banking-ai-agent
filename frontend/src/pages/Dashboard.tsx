import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { AppLayout } from '../components/AppLayout'
import { AccountCard } from '../components/AccountCard'
import { TransactionRow } from '../components/TransactionRow'
import { getAccounts } from '../api/accounts'
import { getTransactions } from '../api/transactions'
import { formatCurrency } from '../lib/format'
import type { Account, Transaction } from '../types'

export default function Dashboard() {
  const { user } = useAuth()
  const [accounts, setAccounts] = useState<Account[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    Promise.all([getAccounts(user.id), getTransactions(user.id)]).then(([acc, txns]) => {
      setAccounts(acc)
      setTransactions(txns.slice(0, 5))
      setLoading(false)
    })
  }, [user])

  const firstName = user?.name.split(' ')[0]

  return (
    <AppLayout title="Dashboard">
      <p className="text-sm text-slate-500 mb-6">Welcome back, {firstName}.</p>

      {loading ? (
        <p className="text-sm text-slate-400">Loading accounts…</p>
      ) : (
        <>
          <div className="rounded-xl border-2 border-maroon-400 bg-gradient-to-br from-maroon-800 to-maroon-950 p-6 text-white mb-5">
            <p className="text-sm text-white/70">Total balance across all accounts</p>
            <p className="mt-1 text-3xl font-semibold tabular">
              {formatCurrency(accounts.reduce((sum, a) => sum + a.balance, 0))}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {accounts.map((account) => (
              <AccountCard key={account.id} account={account} />
            ))}
          </div>

          <div className="mt-8 rounded-xl border-2 border-maroon-500 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-base font-semibold text-slate-900">Recent Transactions</h2>
              <Link
                to="/transactions"
                className="flex items-center gap-1 text-sm font-medium text-maroon-700 hover:text-maroon-900"
              >
                View all
                <ArrowRight className="size-3.5" strokeWidth={2} />
              </Link>
            </div>
            <div className="divide-y divide-slate-100">
              {transactions.map((t) => (
                <TransactionRow key={t.id} transaction={t} />
              ))}
            </div>
          </div>
        </>
      )}
    </AppLayout>
  )
}
