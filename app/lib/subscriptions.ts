export type SubscriptionTier = "Free" | "Basic" | "Pro" | "Ambassador"

export interface SubscriptionPlan {
  name: SubscriptionTier
  weeklyPrice: number
  yearlyPrice: number
  swipes: number
  hangouts: number
  isUnlimited: boolean
  features: string[]
}

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    name: "Free",
    weeklyPrice: 0,
    yearlyPrice: 0,
    swipes: 5,
    hangouts: 2,
    isUnlimited: false,
    features: ["Limited swipes and hangouts", "Basic matching algorithm", "Standard profile"],
  },
  {
    name: "Basic",
    weeklyPrice: 4.99,
    yearlyPrice: 150,
    swipes: 10,
    hangouts: 5,
    isUnlimited: false,
    features: ["Increased swipes and hangouts", "Enhanced matching algorithm", "Ad-free experience"],
  },
  {
    name: "Pro",
    weeklyPrice: 7.99,
    yearlyPrice: 250,
    swipes: 25,
    hangouts: 13,
    isUnlimited: false,
    features: ["More swipes and hangouts", "Priority in search results", "See who liked you", "Advanced filters"],
  },
  {
    name: "Ambassador",
    weeklyPrice: 9.99,
    yearlyPrice: 350,
    swipes: Number.POSITIVE_INFINITY,
    hangouts: Number.POSITIVE_INFINITY,
    isUnlimited: true,
    features: [
      "Unlimited swipes and hangouts",
      "Boost your profile once a week",
      "Access to exclusive events",
      "Priority customer support",
    ],
  },
]

export function getSubscriptionPlan(tier: SubscriptionTier): SubscriptionPlan {
  return subscriptionPlans.find((plan) => plan.name === tier) || subscriptionPlans[0]
}
