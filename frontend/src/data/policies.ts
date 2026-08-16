export type PolicyCategory = 'accounts' | 'cards' | 'loans'

export interface PolicySection {
  heading: string
  type: 'paragraphs' | 'list'
  items: string[]
}

export interface PolicyDoc {
  slug: string
  category: PolicyCategory
  docType: string
  title: string
  docNumber: string
  effectiveDate: string
  version: string
  sections: PolicySection[]
}

export const policies: PolicyDoc[] = [
  {
    slug: 'accounts-terms',
    category: 'accounts',
    docType: 'Terms & Conditions',
    title: 'Deposit Accounts — Terms & Conditions',
    docNumber: 'YB-ACC-TC-01',
    effectiveDate: '2026-01-01',
    version: 'v1.2',
    sections: [
      {
        heading: '1. Scope',
        type: 'paragraphs',
        items: [
          'These Terms & Conditions govern all Savings, Current, Recurring Deposit (RD), and Fixed Deposit (FD) accounts opened with Yash Bank ("the Bank"). By opening an account, the accountholder agrees to be bound by these terms.',
        ],
      },
      {
        heading: '2. Eligibility',
        type: 'paragraphs',
        items: [
          'Accounts may be opened by any Indian resident individual aged 18 years or older. Minors may hold a Savings Account jointly with a parent or legal guardian. Current Accounts require a valid business registration in the name of the applicant entity.',
        ],
      },
      {
        heading: '3. Interest Computation',
        type: 'paragraphs',
        items: [
          'Interest on Savings Accounts is computed daily on the closing balance and credited quarterly. Interest on RD and FD accounts is computed at the rate applicable on the date of deposit and is fixed for the chosen tenure, subject to the rates published on the Accounts page.',
          'Current Accounts do not earn interest on credit balances.',
        ],
      },
      {
        heading: '4. Minimum Balance & Fees',
        type: 'paragraphs',
        items: [
          'Select Savings Account variants carry a zero-balance option; where a minimum balance applies, non-maintenance may attract a fee as published in the Bank’s fee schedule, available on request. Current Accounts are subject to a minimum average balance appropriate to the account variant.',
        ],
      },
      {
        heading: '5. Withdrawals & Premature Closure',
        type: 'paragraphs',
        items: [
          'Savings and Current Account balances are payable on demand, subject to daily transaction limits communicated at account opening. RD and FD accounts may be closed prior to maturity; a reduced interest rate and, where applicable, a premature-withdrawal charge will apply as per the Bank’s prevailing policy at the time of closure.',
        ],
      },
      {
        heading: '6. Nomination',
        type: 'paragraphs',
        items: [
          'Accountholders are strongly encouraged to register a nominee at account opening. In the absence of a valid nomination, settlement of account proceeds on the death of the accountholder will follow the Bank’s standard succession process, which may require additional documentation.',
        ],
      },
      {
        heading: '7. Amendments',
        type: 'paragraphs',
        items: [
          'The Bank reserves the right to amend these terms, interest rates, or fees with prior notice published on its website. Continued use of the account after the effective date of any amendment constitutes acceptance of the revised terms.',
        ],
      },
      {
        heading: '8. Governing Law',
        type: 'paragraphs',
        items: [
          'These terms are governed by the laws of India. Disputes are subject to the jurisdiction of the courts at the Bank’s registered office.',
        ],
      },
    ],
  },
  {
    slug: 'accounts-documents',
    category: 'accounts',
    docType: 'Required Documents',
    title: 'Deposit Accounts — Documents Required',
    docNumber: 'YB-ACC-DOC-01',
    effectiveDate: '2026-01-01',
    version: 'v1.1',
    sections: [
      {
        heading: 'Savings Account (individual)',
        type: 'list',
        items: [
          'PAN card',
          'Aadhaar card or other valid address proof',
          'One recent passport-size photograph',
          'Initial deposit (as applicable to the account variant)',
        ],
      },
      {
        heading: 'Current Account (business)',
        type: 'list',
        items: [
          'Business registration certificate or GST certificate',
          'PAN card of the business and all authorized signatories',
          'Proof of business address',
          'Board resolution or partnership authorization naming account signatories',
        ],
      },
      {
        heading: 'Recurring Deposit / Fixed Deposit',
        type: 'list',
        items: [
          'An active Yash Bank Savings or Current Account',
          'PAN card',
          'Aadhaar card or other valid address proof (if not already on file)',
        ],
      },
      {
        heading: 'Notes',
        type: 'paragraphs',
        items: [
          'All documents must be current and unexpired. The Bank performs a structural format check on submitted documents (see Document Verification on the site’s AI assistant); this is not a substitute for statutory KYC verification.',
        ],
      },
    ],
  },
  {
    slug: 'cards-terms',
    category: 'cards',
    docType: 'Cardholder Agreement',
    title: 'Debit & Credit Cards — Cardholder Agreement',
    docNumber: 'YB-CRD-TC-01',
    effectiveDate: '2026-01-01',
    version: 'v1.3',
    sections: [
      {
        heading: '1. Issuance & Activation',
        type: 'paragraphs',
        items: [
          'Debit cards are issued to accountholders in good standing and are linked to a single deposit account. Credit cards are issued subject to a credit assessment. Cards must be activated by the cardholder before first use, as instructed at issuance.',
        ],
      },
      {
        heading: '2. Cardholder Liability',
        type: 'paragraphs',
        items: [
          'The cardholder is responsible for all transactions made using the card and its PIN, except where such transactions are reported as fraudulent within the timeframe specified in the Bank’s zero-liability protection terms. Cards must not be shared with any other person.',
        ],
      },
      {
        heading: '3. Fees & Charges',
        type: 'paragraphs',
        items: [
          'Annual fees, where applicable, are charged as published on the Cards page and may be waived on qualifying annual spend. Additional charges (e.g. cash advance, late payment, overlimit) are disclosed in the fee schedule provided at issuance.',
        ],
      },
      {
        heading: '4. Rewards & Cashback (Credit Cards)',
        type: 'paragraphs',
        items: [
          'Reward points and cashback accrue as described in the relevant card’s benefits and are credited within the statement cycle following the qualifying transaction. Rewards have no cash value except where explicitly stated and expire per the terms of the applicable rewards program.',
        ],
      },
      {
        heading: '5. Billing & Repayment (Credit Cards)',
        type: 'paragraphs',
        items: [
          'A monthly statement is generated for each billing cycle. The Minimum Amount Due must be paid by the due date to avoid late payment charges; interest accrues on any revolved balance at the rate disclosed at card issuance.',
        ],
      },
      {
        heading: '6. Loss, Theft & Reporting',
        type: 'paragraphs',
        items: [
          'A lost or stolen card must be reported to the Bank immediately; the cardholder is not liable for transactions made after a report is successfully logged. The Bank may issue a replacement card subject to applicable fees.',
        ],
      },
      {
        heading: '7. Termination',
        type: 'paragraphs',
        items: [
          'Either party may terminate the card agreement at any time. Outstanding dues on a credit card remain payable in full upon termination. The Bank may suspend or terminate a card for suspected fraud or breach of these terms.',
        ],
      },
    ],
  },
  {
    slug: 'cards-documents',
    category: 'cards',
    docType: 'Required Documents',
    title: 'Debit & Credit Cards — Documents Required',
    docNumber: 'YB-CRD-DOC-01',
    effectiveDate: '2026-01-01',
    version: 'v1.1',
    sections: [
      {
        heading: 'Debit Card',
        type: 'list',
        items: [
          'An active Yash Bank Savings or Current Account',
          'PAN card',
          'Valid address proof (if not already on file)',
        ],
      },
      {
        heading: 'Credit Card',
        type: 'list',
        items: [
          'PAN card',
          'Aadhaar card or other valid address proof',
          'Proof of income (salary slips, Form 16, or ITR for self-employed applicants)',
          'Existing relationship with the Bank or an active Savings/Current Account',
        ],
      },
      {
        heading: 'Notes',
        type: 'paragraphs',
        items: [
          'Credit limit is determined by the Bank’s internal eligibility rules based on declared income and is a simulated assessment for the purposes of this demo, not a real credit decision.',
        ],
      },
    ],
  },
  {
    slug: 'loans-terms',
    category: 'loans',
    docType: 'Loan Agreement Terms',
    title: 'Loans — General Loan Agreement Terms',
    docNumber: 'YB-LN-TC-01',
    effectiveDate: '2026-01-01',
    version: 'v1.2',
    sections: [
      {
        heading: '1. Sanction & Disbursement',
        type: 'paragraphs',
        items: [
          'Loan approval is subject to the Bank’s eligibility assessment, including income, existing obligations, and (where applicable) collateral value. Disbursement occurs after execution of the loan agreement and completion of any conditions precedent (e.g. property document verification for Home Loans).',
        ],
      },
      {
        heading: '2. Interest Rate',
        type: 'paragraphs',
        items: [
          'Loans are offered at the interest rate confirmed in the borrower’s sanction letter, starting from the rates published on the Loans page. Floating-rate loans are subject to periodic reset in line with the Bank’s reference rate; fixed-rate loans remain unchanged for the agreed tenure.',
        ],
      },
      {
        heading: '3. Repayment (EMI)',
        type: 'paragraphs',
        items: [
          'Loans are repaid through Equated Monthly Instalments (EMIs) comprising principal and interest, debited automatically from the borrower’s linked account on the due date each month. A missed EMI may attract a late payment charge and affect the borrower’s standing with the Bank.',
        ],
      },
      {
        heading: '4. Prepayment & Foreclosure',
        type: 'paragraphs',
        items: [
          'Borrowers may prepay part or all of the outstanding loan at any time. Floating-rate loans carry no prepayment penalty; fixed-rate loans may attract a foreclosure charge as disclosed in the sanction letter.',
        ],
      },
      {
        heading: '5. Default',
        type: 'paragraphs',
        items: [
          'Continued non-payment of EMIs constitutes default. The Bank will follow its standard collections process, which may include penal charges, reporting to credit bureaus, and, for secured loans, recovery proceedings against the pledged collateral as a last resort.',
        ],
      },
      {
        heading: '6. Insurance',
        type: 'paragraphs',
        items: [
          'Home Loan borrowers are required to maintain property insurance for the loan tenure. Loan protection insurance is optional for all loan types unless otherwise stated in the sanction letter.',
        ],
      },
      {
        heading: '7. Governing Law',
        type: 'paragraphs',
        items: [
          'These terms are governed by the laws of India. Disputes are subject to the jurisdiction of the courts at the Bank’s registered office.',
        ],
      },
    ],
  },
  {
    slug: 'loans-documents',
    category: 'loans',
    docType: 'Required Documents',
    title: 'Loans — Documents Required',
    docNumber: 'YB-LN-DOC-01',
    effectiveDate: '2026-01-01',
    version: 'v1.1',
    sections: [
      {
        heading: 'All loan applications',
        type: 'list',
        items: [
          'PAN card',
          'Aadhaar card or other valid address proof',
          'Passport-size photograph',
          'Last 6 months’ bank statements',
          'Proof of income (salary slips and Form 16, or ITR for self-employed applicants)',
        ],
      },
      {
        heading: 'Home Loan — additional documents',
        type: 'list',
        items: [
          'Property sale agreement or allotment letter',
          'Property title and encumbrance documents',
          'Approved building plan (for under-construction property)',
        ],
      },
      {
        heading: 'Car Loan — additional documents',
        type: 'list',
        items: [
          'Vehicle quotation or proforma invoice',
          'Valid driving license (for self-use vehicles)',
        ],
      },
      {
        heading: 'Education Loan — additional documents',
        type: 'list',
        items: [
          'Admission letter from a recognized institution',
          'Academic records',
          'Co-applicant (parent or guardian) KYC documents',
          'Collateral documents, where the loan amount exceeds ₹7.5 lakh',
        ],
      },
    ],
  },
]

export function getPoliciesByCategory(category: PolicyCategory) {
  return policies.filter((p) => p.category === category)
}
