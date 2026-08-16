import { Link } from 'react-router-dom'
import {
  ArrowLeftRight,
  Clock4,
  Landmark,
  PiggyBank,
  ShieldCheck,
  Sparkles,
  Wallet,
  Zap,
} from 'lucide-react'
import { PublicHeader } from '../components/PublicHeader'
import { PublicFooter } from '../components/PublicFooter'
import { useAuth } from '../context/AuthContext'
import { images } from '../lib/images'

const products = [
  {
    icon: Wallet,
    title: 'Checking Account',
    blurb: 'Everyday spending with zero minimum balance and instant transfers.',
    tone: 'bg-maroon-800',
  },
  {
    icon: PiggyBank,
    title: 'Savings Account',
    blurb: 'Earn interest on every rupee while keeping your money accessible.',
    tone: 'bg-slate-800',
  },
  {
    icon: ArrowLeftRight,
    title: 'Instant Transfers',
    blurb: 'Move money between accounts in seconds, at no cost.',
    tone: 'bg-maroon-700',
  },
]

const features = [
  { icon: ShieldCheck, title: 'Bank-grade security', text: 'Your data and funds, protected end to end.' },
  { icon: Zap, title: 'Instant transfers', text: 'Send and receive money in real time.' },
  { icon: Clock4, title: '24/7 access', text: 'Check balances and move money any time.' },
  { icon: Sparkles, title: 'No hidden fees', text: 'Transparent pricing, always.' },
]

export default function Home() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />

      <section className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight tracking-tight">
              Banking that keeps up with you.
            </h1>
            <p className="mt-5 text-white/70 text-lg max-w-md">
              Open a Yash Bank account in minutes. Track spending, move money instantly, and stay in control —
              all from one place.
            </p>
            <div className="mt-8 flex items-center gap-4">
              {user ? (
                <Link
                  to="/dashboard"
                  className="inline-flex items-center rounded-full bg-maroon-700 px-6 py-3 text-sm font-semibold hover:bg-maroon-600 transition-colors"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/signup"
                    className="inline-flex items-center rounded-full bg-maroon-700 px-6 py-3 text-sm font-semibold hover:bg-maroon-600 transition-colors"
                  >
                    Open Account
                  </Link>
                  <Link to="/login" className="text-sm font-semibold text-white underline underline-offset-4">
                    Log in to your account
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="relative w-full max-w-sm">
              <img
                src={images.heroPayment}
                alt="Customer paying with a card at checkout"
                className="w-full h-80 object-cover rounded-2xl border-2 border-white/25 shadow-2xl"
              />
              <div className="absolute -bottom-10 -left-6 w-56 rounded-2xl border-2 border-white/25 bg-gradient-to-br from-maroon-700 to-maroon-950 p-5 shadow-2xl">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-6 rounded-md bg-gradient-to-br from-gold-400 to-gold-500" />
                  <Landmark className="size-5 text-white/80" strokeWidth={1.5} />
                </div>
                <p className="mt-6 text-white/60 text-xs tracking-wide">CURRENT BALANCE</p>
                <p className="text-white text-2xl font-semibold tabular mt-1">$4,382.17</p>
                <p className="mt-6 text-white/50 text-xs tracking-widest">•••• •••• •••• 4821</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-semibold text-slate-900">Accounts built for how you actually bank</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-5">
          {products.map(({ icon: Icon, title, blurb, tone }) => (
            <div key={title} className={`${tone} rounded-xl border-2 border-white/25 p-6 text-white`}>
              <Icon className="size-7" strokeWidth={1.5} />
              <h3 className="mt-5 text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-white/70 leading-relaxed">{blurb}</p>
              <Link to="/signup" className="mt-5 inline-block text-sm font-semibold underline underline-offset-4">
                Open account
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-semibold text-slate-900 text-center">Why bank with us</h2>
          <div className="mt-10 grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, text }) => (
              <div key={title} className="text-center">
                <div className="mx-auto size-12 rounded-full bg-maroon-100 text-maroon-800 flex items-center justify-center">
                  <Icon className="size-5.5" strokeWidth={1.75} />
                </div>
                <h3 className="mt-4 text-sm font-semibold text-slate-900">{title}</h3>
                <p className="mt-1.5 text-sm text-slate-500">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-maroon-800 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-semibold">Ready to switch banks?</h2>
          <p className="mt-3 text-white/70">It takes less than five minutes to open an account.</p>
          <Link
            to="/signup"
            className="mt-7 inline-flex items-center rounded-full bg-white text-maroon-900 px-6 py-3 text-sm font-semibold hover:bg-maroon-50 transition-colors"
          >
            Open Account
          </Link>
        </div>
      </section>

      <PublicFooter />
    </div>
  )
}
