import { Banknote, Building2, CalendarClock, PiggyBank } from 'lucide-react'
import { PublicHeader } from '../components/PublicHeader'
import { PublicFooter } from '../components/PublicFooter'
import { PageBanner } from '../components/PageBanner'
import { ProductCard, type ProductCardData } from '../components/ProductCard'

const accounts: ProductCardData[] = [
  {
    icon: PiggyBank,
    title: 'Savings Account',
    tagline: 'For everyday banking — keep your money safe and earn interest on your balance.',
    rateLabel: 'Interest rate',
    rateValue: '3.00–3.50% p.a.',
    benefits: [
      'Free debit card with no first-year fee',
      'Unlimited free NEFT, RTGS and IMPS transfers',
      'Free mobile and net banking with instant alerts',
      'Zero-balance option available for select accounts',
    ],
    requirements: [
      'Indian resident, 18 years or older (minor accounts available with a guardian)',
      'PAN card',
      'Aadhaar card or other valid address proof',
      'Passport-size photograph',
    ],
  },
  {
    icon: Building2,
    title: 'Current Account',
    tagline: 'Built for businesses and high transaction volumes, with no cap on daily transfers.',
    rateLabel: 'Interest rate',
    rateValue: 'Nil',
    benefits: [
      'Unlimited transactions with no monthly cap',
      'Overdraft facility against approved limits',
      'Dedicated relationship manager for business accounts',
      'Free cash and cheque deposit up to a monthly limit',
    ],
    requirements: [
      'Valid business registration or GST certificate',
      'PAN card of the business and authorized signatories',
      'Proof of business address',
      'Minimum average balance as per account variant',
    ],
  },
  {
    icon: CalendarClock,
    title: 'Recurring Deposit (RD)',
    tagline: 'Invest a fixed amount every month and build savings with disciplined, guaranteed returns.',
    rateLabel: 'Interest rate',
    rateValue: '6.00–7.25% p.a.',
    benefits: [
      'Flexible tenure from 6 months up to 10 years',
      'Loan/overdraft facility of up to 90% of deposit value',
      'Auto-debit from your linked savings account',
      'Senior citizens earn an additional 0.50% p.a.',
    ],
    requirements: [
      'An active Yash Bank savings account',
      'Minimum monthly instalment of ₹500',
      'KYC documents (PAN and address proof)',
    ],
  },
  {
    icon: Banknote,
    title: 'Fixed Deposit (FD)',
    tagline: 'Deposit a lump sum for a fixed tenure and lock in a guaranteed rate of return.',
    rateLabel: 'Interest rate',
    rateValue: '6.50–7.50% p.a.',
    benefits: [
      'Tenure options from 7 days up to 10 years',
      'Choice of monthly, quarterly or cumulative payout',
      'Loan against FD up to 90% of deposit value',
      'Senior citizens earn an additional 0.50% p.a.',
    ],
    requirements: [
      'Minimum deposit of ₹1,000',
      'PAN card',
      'Aadhaar card or other valid address proof',
    ],
  },
]

export default function Accounts() {
  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />
      <PageBanner
        title="Accounts built for how you actually bank"
        subtitle="Whether you're saving for the everyday or planning years ahead, there's a Yash Bank account for it."
      />
      <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-6">
        {accounts.map((a) => (
          <ProductCard key={a.title} {...a} />
        ))}
      </section>
      <PublicFooter />
    </div>
  )
}
