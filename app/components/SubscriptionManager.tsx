"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2 } from "lucide-react"
import { subscriptionPlans, type SubscriptionPlan, type SubscriptionTier } from "../lib/subscriptions"
import type { User } from "../lib/db"

interface SubscriptionManagerProps {
  userId: string
}

export function SubscriptionManager({ userId }: SubscriptionManagerProps) {
  const [user, setUser] = useState<User | null>(null)
  const [currentPlan, setCurrentPlan] = useState<SubscriptionPlan | null>(null)
  const [billingCycle, setBillingCycle] = useState<"weekly" | "yearly">("weekly")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchUserSubscription()
  }, []) // Removed userId from dependencies

  const fetchUserSubscription = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch(`/api/user/${userId}/subscription`)
      if (!response.ok) {
        throw new Error("Failed to fetch user subscription")
      }
      const data = await response.json()
      setUser(data.user)
      setCurrentPlan(data.plan)
    } catch (err) {
      setError("Error fetching subscription data")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpgrade = async (planName: SubscriptionTier) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch(`/api/user/${userId}/subscription`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tier: planName }),
      })
      if (!response.ok) {
        throw new Error("Failed to upgrade subscription")
      }
      const data = await response.json()
      setUser(data.user)
      setCurrentPlan(data.plan)
    } catch (err) {
      setError("Error upgrading subscription")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <div>Loading subscription data...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!user || !currentPlan) {
    return <div>No subscription data available</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Subscription</CardTitle>
        <CardDescription>You are currently on the {currentPlan.name} plan.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-center space-x-4 mb-6">
            <Button
              variant={billingCycle === "weekly" ? "default" : "outline"}
              onClick={() => setBillingCycle("weekly")}
            >
              Weekly
            </Button>
            <Button
              variant={billingCycle === "yearly" ? "default" : "outline"}
              onClick={() => setBillingCycle("yearly")}
            >
              Yearly
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {subscriptionPlans.map((plan) => (
              <Card key={plan.name} className={`relative ${currentPlan.name === plan.name ? "border-primary" : ""}`}>
                {currentPlan.name === plan.name && (
                  <Badge className="absolute top-2 right-2" variant="secondary">
                    Current Plan
                  </Badge>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>
                    ${billingCycle === "weekly" ? plan.weeklyPrice : plan.yearlyPrice} per{" "}
                    {billingCycle === "weekly" ? "week" : "year"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  {currentPlan.name !== plan.name && (
                    <Button className="w-full mt-4" onClick={() => handleUpgrade(plan.name)}>
                      Upgrade
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
