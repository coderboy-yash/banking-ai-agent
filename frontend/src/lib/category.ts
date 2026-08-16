import {
  Banknote,
  ShoppingCart,
  Utensils,
  Wifi,
  Zap,
  Home,
  ArrowLeftRight,
  CreditCard,
  type LucideIcon,
} from 'lucide-react'
import type { TransactionCategory } from '../types'

export const categoryMeta: Record<TransactionCategory, { label: string; icon: LucideIcon }> = {
  groceries: { label: 'Groceries', icon: ShoppingCart },
  dining: { label: 'Dining', icon: Utensils },
  rent: { label: 'Rent', icon: Home },
  utilities: { label: 'Utilities', icon: Zap },
  subscription: { label: 'Subscription', icon: Wifi },
  income: { label: 'Income', icon: Banknote },
  transfer: { label: 'Transfer', icon: ArrowLeftRight },
  other: { label: 'Other', icon: CreditCard },
}
