import { NextResponse } from "next/server"
import { getUser, updateUser, resetWeeklyLimits } from "@/app/lib/db"
import { getSubscriptionPlan } from "@/app/lib/subscriptions"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const user = getUser(params.id)
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  const lastReset = new Date(user.lastResetDate)
  const now = new Date()
  const weeksSinceReset = Math.floor((now.getTime() - lastReset.getTime()) / (7 * 24 * 60 * 60 * 1000))

  if (weeksSinceReset >= 1) {
    const updatedUser = resetWeeklyLimits(user)
    return NextResponse.json({ user: updatedUser })
  }

  return NextResponse.json({ user })
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const user = getUser(params.id)
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  const { action } = await request.json()
  if (!["swipe", "hangout"].includes(action)) {
    return NextResponse.json({ error: "Invalid action" }, { status: 400 })
  }

  const plan = getSubscriptionPlan(user.subscriptionTier)

  if (action === "swipe") {
    if (user.swipesRemaining > 0 || plan.isUnlimited) {
      user.swipesRemaining = plan.isUnlimited ? Number.POSITIVE_INFINITY : user.swipesRemaining - 1
    } else {
      return NextResponse.json({ error: "No swipes remaining" }, { status: 403 })
    }
  } else if (action === "hangout") {
    if (user.hangoutsRemaining > 0 || plan.isUnlimited) {
      user.hangoutsRemaining = plan.isUnlimited ? Number.POSITIVE_INFINITY : user.hangoutsRemaining - 1
    } else {
      return NextResponse.json({ error: "No hangouts remaining" }, { status: 403 })
    }
  }

  updateUser(user)
  return NextResponse.json({ user })
}
