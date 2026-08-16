import { Landmark } from 'lucide-react'

const columns = [
  { heading: 'About Yash Bank', links: ['Careers', 'Investor Relations', 'Corporate Governance', 'Press'] },
  { heading: 'Products', links: ['Savings Account', 'Checking Account', 'Fixed Deposits', 'Personal Loans'] },
  { heading: 'Support', links: ['Customer Care', 'Locate a Branch', 'Report Fraud', 'FAQs'] },
  { heading: 'Legal', links: ['Privacy Policy', 'Terms of Service', 'Security', 'Accessibility'] },
]

export function PublicFooter() {
  return (
    <footer className="bg-maroon-950 text-maroon-100">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2">
              <Landmark className="size-5 text-white" strokeWidth={1.75} />
              <span className="text-white font-semibold">Yash Bank</span>
            </div>
            <p className="mt-3 text-xs text-maroon-100/60 leading-relaxed">
              A demo banking project built with free tools — not a real financial institution.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.heading}>
              <h3 className="text-sm font-semibold text-white mb-3">{col.heading}</h3>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link} className="text-sm text-maroon-100/60">
                    {link}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-6 border-t border-maroon-800 text-xs text-maroon-100/50">
          © 2026 Yash Bank. Demo project — not a licensed bank.
        </div>
      </div>
    </footer>
  )
}
