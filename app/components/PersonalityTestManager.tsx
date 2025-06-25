"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PersonalityBadge } from "./PersonalityBadge"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface PersonalityTestManagerProps {
  currentPersonalityType: string
  lastTestDate: string
  testScores?: {
    extraversion: number
    sensing: number
    thinking: number
    judging: number
  }
}

const dimensionDescriptions = {
  extraversion: "Extraversion (E) vs. Introversion (I): How you interact with the world and where you get your energy.",
  sensing: "Sensing (S) vs. Intuition (N): How you take in information and what you focus on.",
  thinking: "Thinking (T) vs. Feeling (F): How you make decisions and cope with emotions.",
  judging: "Judging (J) vs. Perceiving (P): How you deal with the outer world and structure your life.",
}

export function PersonalityTestManager({
  currentPersonalityType,
  lastTestDate,
  testScores,
}: PersonalityTestManagerProps) {
  const router = useRouter()
  const [canRetakeFree, setCanRetakeFree] = useState(false)
  const [daysUntilFreeRetake, setDaysUntilFreeRetake] = useState(0)

  useEffect(() => {
    const lastTest = new Date(lastTestDate)
    const today = new Date()
    const diffTime = Math.abs(today.getTime() - lastTest.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays >= 365) {
      setCanRetakeFree(true)
      setDaysUntilFreeRetake(0)
    } else {
      setCanRetakeFree(false)
      setDaysUntilFreeRetake(365 - diffDays)
    }
  }, [lastTestDate])

  const handleRetakeTest = (isPaid: boolean) => {
    if (isPaid) {
      // In a real app, you would implement payment processing here
      console.log("Processing $4.99 payment for personality test")
    }
    router.push("/personality-test")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Personality Profile</CardTitle>
        <CardDescription>Based on your last test on {lastTestDate}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col items-center space-y-2">
          <PersonalityBadge type={currentPersonalityType as any} size="lg" />
          <p className="text-center">
            Your current personality type is {currentPersonalityType}. This influences how we match you with others.
          </p>
        </div>
        {testScores && (
          <div className="space-y-2">
            <h3 className="font-semibold">Your Personality Dimensions</h3>
            <TooltipProvider>
              <div className="space-y-3">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="space-y-1">
                      <p className="text-sm">Extraversion - Introversion</p>
                      <Progress value={testScores.extraversion} className="h-2" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{dimensionDescriptions.extraversion}</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="space-y-1">
                      <p className="text-sm">Sensing - Intuition</p>
                      <Progress value={testScores.sensing} className="h-2" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{dimensionDescriptions.sensing}</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="space-y-1">
                      <p className="text-sm">Thinking - Feeling</p>
                      <Progress value={testScores.thinking} className="h-2" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{dimensionDescriptions.thinking}</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="space-y-1">
                      <p className="text-sm">Judging - Perceiving</p>
                      <Progress value={testScores.judging} className="h-2" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{dimensionDescriptions.judging}</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>
          </div>
        )}
        {canRetakeFree ? (
          <Button onClick={() => handleRetakeTest(false)}>Retake Test (Free)</Button>
        ) : (
          <>
            <p className="text-sm text-muted-foreground">
              You can retake the test for free in {daysUntilFreeRetake} days.
            </p>
            <Button onClick={() => handleRetakeTest(true)}>Retake Test Now ($4.99)</Button>
          </>
        )}
        <Link href="/personality-info" className="text-sm text-blue-500 hover:underline">
          Learn more about personality types
        </Link>
      </CardContent>
    </Card>
  )
}
