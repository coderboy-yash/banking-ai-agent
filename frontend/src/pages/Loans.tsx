import { Car, GraduationCap, Home as HomeIcon } from 'lucide-react'
import { PublicHeader } from '../components/PublicHeader'
import { PublicFooter } from '../components/PublicFooter'
import { PageBanner } from '../components/PageBanner'
import { images } from '../lib/images'
import { ProductCard, type ProductCardData } from '../components/ProductCard'

const loans: ProductCardData[] = [
  {
    icon: HomeIcon,
    title: 'Home Loan',
    tagline: 'Finance your dream home with long tenures and competitive rates.',
    rateLabel: 'Interest rate from',
    rateValue: '8.50% p.a.',
    benefits: [
      'Loan amount up to 90% of property value',
      'Repayment tenure of up to 30 years',
      'Balance transfer option from other lenders',
      'No prepayment penalty on floating-rate loans',
    ],
    requirements: [
      'Age 21–65 years at loan maturity',
      'Minimum 2 years of stable income (salaried or self-employed)',
      'Property documents and sale agreement',
      'PAN, address proof and last 6 months’ bank statements',
    ],
    ctaLabel: 'Apply now',
  },
  {
    icon: Car,
    title: 'Car Loan',
    tagline: 'Drive home a new or used car with quick approvals and flexible EMIs.',
    rateLabel: 'Interest rate from',
    rateValue: '9.00% p.a.',
    benefits: [
      'Finance up to 90% of the on-road price',
      'Repayment tenure of up to 7 years',
      'Doorstep document pickup',
      'Minimal processing time for pre-approved customers',
    ],
    requirements: [
      'Age 21–60 years',
      'Minimum annual income of ₹2.5 lakh',
      'Valid driving license (for self-use vehicles)',
      'PAN, address proof and income documents',
    ],
    ctaLabel: 'Apply now',
  },
  {
    icon: GraduationCap,
    title: 'Education Loan',
    tagline: 'Fund tuition, living expenses and travel for studies in India or abroad.',
    rateLabel: 'Interest rate from',
    rateValue: '8.75% p.a.',
    benefits: [
      'Covers tuition, hostel, books and travel costs',
      'Moratorium period until course completion plus 6 months',
      'Repayment tenure of up to 15 years',
      'Tax benefits under Section 80E',
    ],
    requirements: [
      'Confirmed admission to a recognized institution',
      'Co-applicant (parent or guardian) required',
      'Academic records and admission letter',
      'Collateral required for loans above ₹7.5 lakh',
    ],
    ctaLabel: 'Apply now',
  },
]

export default function Loans() {
  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />
      <PageBanner
        title="Loans for whatever comes next"
        subtitle="Competitive rates and flexible terms for the milestones that matter — a home, a car, an education."
        image={images.signingDocs}
      />
      <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-6">
        {loans.map((l) => (
          <ProductCard key={l.title} {...l} />
        ))}
      </section>
      <PublicFooter />
    </div>
  )
}
