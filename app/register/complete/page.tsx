"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Logo } from "@/app/components/Logo"
import { PersonalityBadge } from "@/app/components/PersonalityBadge"

export default function Complete() {
  const [personalityType, setPersonalityType] = useState<string>("")
  const router = useRouter()

  useEffect(() => {
    // In a real app, you'd fetch this from your backend or local storage
    // For now, we'll just set a random type
    const types = [
      "ISTJ",
      "ISFJ",
      "INFJ",
      "INTJ",
      "ISTP",
      "ISFP",
      "INFP",
      "INTP",
      "ESTP",
      "ESFP",
      "ENFP",
      "ENTP",
      "ESTJ",
      "ESFJ",
      "ENFJ",
      "ENTJ",
    ]
    setPersonalityType(types[Math.floor(Math.random() * types.length)])
  }, [])

  const handleContinue = () => {
    router.push("/register/complete-profile")
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <Logo />
      <Card className="w-full max-w-2xl mt-8">
        <CardHeader>
          <CardTitle>Personality Test Complete!</CardTitle>
          <CardDescription>Your personality type has been determined.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col items-center">
            <PersonalityBadge type={personalityType as any} />
          </div>
          <p className="text-center">
            We'll use this information to help match you with compatible people who share your interests and
            communication style.
          </p>
          <Button className="w-full" onClick={handleContinue}>
            Continue to Complete Your Profile
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
