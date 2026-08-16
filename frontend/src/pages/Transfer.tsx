import { useEffect, useState, type FormEvent } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { AppLayout } from '../components/AppLayout'
import { getAccounts } from '../api/accounts'
import { transfer } from '../api/transactions'
import { formatCurrency, maskAccountNumber } from '../lib/format'
import type { Account } from '../types'

const inputClass =
  'w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-maroon-600 focus:border-transparent'

export default function Transfer() {
  const { user } = useAuth()
  const [accounts, setAccounts] = useState<Account[]>([])
  const [fromAccountId, setFromAccountId] = useState('')
  const [toAccountNumber, setToAccountNumber] = useState('')
  const [amount, setAmount] = useState('')
  const [memo, setMemo] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (!user) return
    getAccounts(user.id).then((accs) => {
      setAccounts(accs)
      if (accs[0]) setFromAccountId(accs[0].id)
    })
  }, [user])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!user) return
    setError(null)
    const parsedAmount = Number(amount)
    if (!parsedAmount || parsedAmount <= 0) {
      setError('Enter a valid amount')
      return
    }
    setSubmitting(true)
    try {
      await transfer(user.id, { fromAccountId, toAccountNumber, amount: parsedAmount, memo })
      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Transfer failed')
    } finally {
      setSubmitting(false)
    }
  }

  function resetForm() {
    setSuccess(false)
    setToAccountNumber('')
    setAmount('')
    setMemo('')
  }

  return (
    <AppLayout title="Transfer">
      <div className="max-w-md">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          {success ? (
            <div className="text-center py-4">
              <CheckCircle2 className="size-10 text-emerald-600 mx-auto" strokeWidth={1.5} />
              <p className="mt-3 text-base font-semibold text-slate-900">Transfer complete</p>
              <p className="mt-1 text-sm text-slate-500">
                {formatCurrency(Number(amount))} sent to •••• {toAccountNumber}
              </p>
              <button
                onClick={resetForm}
                className="mt-5 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Make another transfer
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">From account</label>
                <select
                  value={fromAccountId}
                  onChange={(e) => setFromAccountId(e.target.value)}
                  className={inputClass}
                >
                  {accounts.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.type === 'checking' ? 'Checking' : 'Savings'} {maskAccountNumber(a.accountNumber)} —{' '}
                      {formatCurrency(a.balance)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">To account number</label>
                <input
                  type="text"
                  required
                  className={inputClass}
                  value={toAccountNumber}
                  onChange={(e) => setToAccountNumber(e.target.value)}
                  placeholder="e.g. 7734"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Amount</label>
                <input
                  type="number"
                  required
                  min="0.01"
                  step="0.01"
                  className={inputClass}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Memo (optional)</label>
                <input
                  type="text"
                  className={inputClass}
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                  placeholder="What's this for?"
                />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <button
                type="submit"
                disabled={submitting || !fromAccountId}
                className="w-full rounded-lg bg-maroon-900 py-2.5 text-sm font-semibold text-white hover:bg-maroon-800 disabled:opacity-60 transition-colors"
              >
                {submitting ? 'Sending…' : 'Send transfer'}
              </button>
            </form>
          )}
        </div>
      </div>
    </AppLayout>
  )
}
