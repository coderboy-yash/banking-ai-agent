import type { ReactNode } from 'react'
import { CheckCircle2, Landmark } from 'lucide-react'
import { PublicHeader } from './PublicHeader'
import { PublicFooter } from './PublicFooter'
import { images } from '../lib/images'

const benefits = ['No minimum balance', 'Instant transfers, no fees', 'FDIC-style protection on every account']

export function AuthLayout({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicHeader />

      <div className="flex-1 grid md:grid-cols-2">
        <div className="hidden md:flex relative flex-col justify-center bg-black text-white px-16 py-16 overflow-hidden">
          <img src={images.cafePayment} alt="" className="absolute inset-0 size-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-black/60" />
          <div className="relative">
            <Landmark className="size-8" strokeWidth={1.5} />
            <h2 className="mt-6 text-3xl font-semibold leading-tight">
              Banking that keeps up with you.
            </h2>
            <ul className="mt-8 space-y-4">
              {benefits.map((b) => (
                <li key={b} className="flex items-center gap-3 text-white/80">
                  <CheckCircle2 className="size-5 text-maroon-500 shrink-0" strokeWidth={1.75} />
                  {b}
                </li>
              ))}
            </ul>

            <div className="mt-12 w-64 rounded-2xl border-2 border-maroon-500 bg-gradient-to-br from-maroon-700 to-maroon-950 p-5 shadow-2xl">
              <div className="flex items-center justify-between">
                <div className="w-8 h-6 rounded-md bg-gradient-to-br from-gold-400 to-gold-500" />
                <Landmark className="size-5 text-white/80" strokeWidth={1.5} />
              </div>
              <p className="mt-6 text-white/60 text-xs tracking-wide">CURRENT BALANCE</p>
              <p className="text-white text-2xl font-semibold tabular mt-1">₹8,50,000</p>
              <p className="mt-6 text-white/50 text-xs tracking-widest">•••• •••• •••• 4821</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center px-6 py-16 bg-slate-50">
          <div className="w-full max-w-sm">
            <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
            <p className="mt-1.5 text-sm text-slate-500">{subtitle}</p>
            <div className="mt-7">{children}</div>
          </div>
        </div>
      </div>

      <PublicFooter />
    </div>
  )
}
