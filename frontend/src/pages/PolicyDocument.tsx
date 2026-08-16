import { Navigate, Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { PublicHeader } from '../components/PublicHeader'
import { PublicFooter } from '../components/PublicFooter'
import { PolicyDocumentView } from '../components/PolicyDocumentView'
import { policies } from '../data/policies'

export default function PolicyDocument() {
  const { slug } = useParams()
  const doc = policies.find((p) => p.slug === slug)

  if (!doc) return <Navigate to="/policies" replace />

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="print:hidden">
        <PublicHeader />
      </div>

      <div className="max-w-4xl mx-auto px-6 pt-8 print:hidden">
        <Link to="/policies" className="inline-flex items-center gap-1.5 text-sm font-medium text-maroon-700 hover:text-maroon-900">
          <ArrowLeft className="size-4" strokeWidth={2} />
          Back to Policies & Documents
        </Link>
      </div>

      <div className="px-6 py-8 print:p-0">
        <PolicyDocumentView doc={doc} />
      </div>

      <div className="print:hidden">
        <PublicFooter />
      </div>
    </div>
  )
}
