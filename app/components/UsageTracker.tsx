"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { User } from "../lib/db"
import type { SubscriptionPlan } from "../lib/subscriptions"

interface UsageTrackerProps {
  userId: string
}

export function UsageTracker({ userId }: UsageTrackerProps) {
  const [user, setUser] = useState<User | null>(null)
  const [plan, setPlan] = useState<SubscriptionPlan | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchUserUsage()
  }, []) // Updated dependency array

  const fetchUserUsage = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch(`/api/user/${userId}/usage`)
      if (!response.ok) {
        throw new Error("Failed to fetch user usage")
      }
      const data = await response.json()
      setUser(data.user)
      setPlan(data.plan)
    } catch (err) {
      setError("Error fetching usage data")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <div>Loading usage data...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!user || !plan) {
    return <div>No usage data available</div>
  }

  const swipesPercentage = plan.isUnlimited ? 100 : ((plan.swipes - user.swipesRemaining) / plan.swipes) * 100
  const hangoutsPercentage = plan.isUnlimited ? 100 : ((plan.hangouts - user.hangoutsRemaining) / plan.hangouts) * 100

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Usage</CardTitle>
        <CardDescription>Track your swipes and hangout invitations</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between mb-2">
            <span>Swipes</span>
            <span>{plan.isUnlimited ? "∞" : `${user.swipesRemaining} / ${plan.swipes}`}</span>
          </div>
          <Progress value={swipesPercentage} className="h-2" />
        </div>
        <div>
          <div className="flex justify-between mb-2">
            <span>Hangout Invitations</span>
            <span>{plan.isUnlimited ? "∞" : `${user.hangoutsRemaining} / ${plan.hangouts}`}</span>
          </div>
          <Progress value={hangoutsPercentage} className="h-2" />
        </div>
      </CardContent>
    </Card>
  )
}
