import { Banknote, CalendarClock, Landmark, PiggyBank, type LucideIcon } from 'lucide-react'
import type { AccountType } from '../types'

export const accountTypeMeta: Record<AccountType, { label: string; icon: LucideIcon }> = {
  checking: { label: 'Checking', icon: Landmark },
  savings: { label: 'Savings', icon: PiggyBank },
  rd: { label: 'Recurring Deposit', icon: CalendarClock },
  fd: { label: 'Fixed Deposit', icon: Banknote },
}
