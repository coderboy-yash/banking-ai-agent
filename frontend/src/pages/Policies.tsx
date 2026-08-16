import { ArrowRight, FileText } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PublicHeader } from '../components/PublicHeader'
import { PublicFooter } from '../components/PublicFooter'
import { PageBanner } from '../components/PageBanner'
import { images } from '../lib/images'
import { getPoliciesByCategory, type PolicyCategory } from '../data/policies'
import { formatDate } from '../lib/format'

const CATEGORIES: { key: PolicyCategory; label: string }[] = [
  { key: 'accounts', label: 'Accounts' },
  { key: 'cards', label: 'Cards' },
  { key: 'loans', label: 'Loans' },
]

export default function Policies() {
  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />
      <PageBanner
        title="Policies & Documents"
        subtitle="Terms and conditions, fees, and the documents you'll need — for every account, card, and loan we offer."
        image={images.signingDocs}
      />

      <section className="max-w-7xl mx-auto px-6 py-16 space-y-14">
        {CATEGORIES.map(({ key, label }) => (
          <div key={key}>
            <h2 className="text-2xl font-semibold text-slate-900">{label}</h2>
            <div className="mt-6 grid md:grid-cols-2 gap-5">
              {getPoliciesByCategory(key).map((doc) => (
                <Link
                  key={doc.slug}
                  to={`/policies/${doc.slug}`}
                  className="flex items-start gap-4 rounded-xl border-2 border-maroon-400 bg-white p-6 hover:bg-maroon-50 transition-colors"
                >
                  <div className="size-10 shrink-0 rounded-lg bg-maroon-100 text-maroon-800 flex items-center justify-center">
                    <FileText className="size-5" strokeWidth={1.75} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold uppercase tracking-wide text-maroon-700">{doc.docType}</p>
                    <h3 className="mt-1 text-base font-semibold text-slate-900">{doc.title}</h3>
                    <p className="mt-1 text-xs text-slate-400">
                      {doc.docNumber} · Effective {formatDate(doc.effectiveDate)}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-maroon-700">
                      View document
                      <ArrowRight className="size-3.5" strokeWidth={2} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>

      <PublicFooter />
    </div>
  )
}
