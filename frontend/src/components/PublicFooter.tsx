import { Landmark } from 'lucide-react'
import { Link } from 'react-router-dom'

const columns = [
  { heading: 'About Yash Bank', links: [{ label: 'Careers' }, { label: 'Investor Relations' }, { label: 'Corporate Governance' }, { label: 'Press' }] },
  { heading: 'Products', links: [{ label: 'Savings Account' }, { label: 'Checking Account' }, { label: 'Fixed Deposits' }, { label: 'Personal Loans' }] },
  { heading: 'Support', links: [{ label: 'Customer Care' }, { label: 'Locate a Branch' }, { label: 'Report Fraud' }, { label: 'FAQs' }] },
  {
    heading: 'Legal',
    links: [
      { label: 'Policies & Documents', to: '/policies' },
      { label: 'Terms of Service', to: '/policies' },
      { label: 'Security' },
      { label: 'Accessibility' },
    ],
  },
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
                {col.links.map((link) =>
                  link.to ? (
                    <li key={link.label}>
                      <Link to={link.to} className="text-sm text-maroon-100/60 hover:text-white transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ) : (
                    <li key={link.label} className="text-sm text-maroon-100/60">
                      {link.label}
                    </li>
                  ),
                )}
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
