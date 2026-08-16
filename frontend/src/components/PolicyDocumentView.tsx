import { Landmark, Printer } from 'lucide-react'
import type { PolicyDoc } from '../data/policies'
import { formatDate } from '../lib/format'

export function PolicyDocumentView({ doc }: { doc: PolicyDoc }) {
  return (
    <div className="max-w-4xl mx-auto bg-white border border-slate-300 shadow-lg print:shadow-none print:border-0">
      <div className="p-10 md:p-14">
        <div className="flex items-start justify-between gap-4 border-b-2 border-maroon-800 pb-6">
          <div className="flex items-center gap-3">
            <Landmark className="size-8 text-maroon-800 shrink-0" strokeWidth={1.5} />
            <div>
              <p className="text-lg font-semibold text-maroon-900">Yash Bank</p>
              <p className="text-xs text-slate-500">Demo Banking Corporation — not a licensed financial institution</p>
            </div>
          </div>
          <button
            onClick={() => window.print()}
            className="print:hidden shrink-0 flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <Printer className="size-3.5" strokeWidth={1.75} />
            Print
          </button>
        </div>

        <div className="mt-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-maroon-700">{doc.docType}</p>
          <h1 className="mt-1 text-2xl md:text-3xl font-semibold text-slate-900">{doc.title}</h1>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4 rounded-lg border border-slate-200 p-4 text-sm">
          <div>
            <p className="text-xs text-slate-400">Document No.</p>
            <p className="font-medium text-slate-800 tabular">{doc.docNumber}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400">Effective Date</p>
            <p className="font-medium text-slate-800">{formatDate(doc.effectiveDate)}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400">Version</p>
            <p className="font-medium text-slate-800">{doc.version}</p>
          </div>
        </div>

        <div className="mt-10 space-y-8">
          {doc.sections.map((section) => (
            <div key={section.heading}>
              <h2 className="text-base font-semibold text-slate-900">{section.heading}</h2>
              {section.type === 'paragraphs' ? (
                <div className="mt-2 space-y-3">
                  {section.items.map((p, i) => (
                    <p key={i} className="text-sm text-slate-700 leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>
              ) : (
                <ul className="mt-2 list-disc list-inside space-y-1.5">
                  {section.items.map((item, i) => (
                    <li key={i} className="text-sm text-slate-700">
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 flex items-center justify-between border-t border-slate-200 pt-6 text-xs text-slate-400">
          <span>Yash Bank — {doc.title}</span>
          <span>Page 1 of 1</span>
        </div>
        <p className="mt-3 text-xs italic text-slate-400">
          This is a demo document created for a fictional bank as part of a learning project. It is not a real
          legal or contractual document and creates no binding obligation.
        </p>
      </div>
    </div>
  )
}
