import { useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { AuthLayout } from '../components/AuthLayout'
import type { EmploymentType } from '../types'

const inputClass =
  'w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-maroon-600 focus:border-transparent'
const sectionLabel = 'text-xs font-semibold uppercase tracking-wide text-slate-400'

export default function Signup() {
  const { user, signup } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [password, setPassword] = useState('')
  const [panNumber, setPanNumber] = useState('')
  const [annualIncome, setAnnualIncome] = useState('')
  const [employmentType, setEmploymentType] = useState<EmploymentType>('salaried')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  if (user) return <Navigate to="/dashboard" replace />

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      await signup({
        name,
        email,
        password,
        phone,
        dateOfBirth,
        panNumber: panNumber.toUpperCase(),
        annualIncome: Number(annualIncome) || 0,
        employmentType,
      })
      navigate('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthLayout title="Create your account" subtitle="Open a Yash Bank checking account in minutes">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <p className={sectionLabel}>Personal details</p>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Full name</label>
            <input
              type="text"
              required
              className={inputClass}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jamie Rivera"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
              <input
                type="email"
                required
                className={inputClass}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Mobile number</label>
              <input
                type="tel"
                required
                pattern="[0-9]{10}"
                title="10-digit mobile number"
                className={inputClass}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="9876543210"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Date of birth</label>
              <input
                type="date"
                required
                className={inputClass}
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
              <input
                type="password"
                required
                minLength={6}
                className={inputClass}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-2 border-t border-slate-200">
          <p className={`${sectionLabel} pt-4`}>Financial details</p>
          <p className="text-xs text-slate-400 -mt-2">
            For demo purposes only — enter any dummy value, nothing is verified.
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">PAN number</label>
              <input
                type="text"
                required
                maxLength={10}
                className={`${inputClass} uppercase`}
                value={panNumber}
                onChange={(e) => setPanNumber(e.target.value)}
                placeholder="ABCDE1234F"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Annual income (₹)</label>
              <input
                type="number"
                required
                min="0"
                className={inputClass}
                value={annualIncome}
                onChange={(e) => setAnnualIncome(e.target.value)}
                placeholder="1200000"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Employment type</label>
            <select
              className={inputClass}
              value={employmentType}
              onChange={(e) => setEmploymentType(e.target.value as EmploymentType)}
            >
              <option value="salaried">Salaried</option>
              <option value="self-employed">Self-employed</option>
              <option value="student">Student</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-maroon-900 py-2.5 text-sm font-semibold text-white hover:bg-maroon-800 disabled:opacity-60 transition-colors"
        >
          {submitting ? 'Creating account…' : 'Create account'}
        </button>
      </form>
      <p className="mt-5 text-sm text-slate-600 text-center">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-maroon-700 hover:text-maroon-900">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  )
}
