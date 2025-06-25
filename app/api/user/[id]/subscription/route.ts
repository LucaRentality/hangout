import { NextResponse } from "next/server"
import { getUser, updateUser } from "@/app/lib/db"
import { getSubscriptionPlan, type SubscriptionTier } from "@/app/lib/subscriptions"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const user = getUser(params.id)
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }
  const plan = getSubscriptionPlan(user.subscriptionTier)
  return NextResponse.json({ user, plan })
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const user = getUser(params.id)
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  const { tier } = await request.json()
  if (!["Free", "Basic", "Pro", "Ambassador"].includes(tier)) {
    return NextResponse.json({ error: "Invalid subscription tier" }, { status: 400 })
  }

  user.subscriptionTier = tier as SubscriptionTier
  const plan = getSubscriptionPlan(user.subscriptionTier)
  user.swipesRemaining = plan.swipes
  user.hangoutsRemaining = plan.hangouts
  updateUser(user)

  return NextResponse.json({ user, plan })
}
