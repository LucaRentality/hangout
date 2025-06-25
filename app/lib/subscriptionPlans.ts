import type { SubscriptionTier } from "./subscriptions"

export interface SubscriptionPlan {
  name: SubscriptionTier
  weeklyPrice: number
  yearlyPrice: number
  swipes: number
  hangouts: number
  isUnlimited: boolean
  features: string[]
}
