"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { personalityQuestions } from "@/app/constants/personality-questions"
import type { PersonalityAnswer } from "@/app/types/personality"
import { QuestionCard } from "@/app/components/personality-test/QuestionCard"
import { ProgressBar } from "@/app/components/personality-test/ProgressBar"
import { Logo } from "@/app/components/Logo"

export default function PersonalityTest() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<PersonalityAnswer[]>([])
  const [showIntro, setShowIntro] = useState(true)

  const handleAnswer = (score: number) => {
    setAnswers((prev) => {
      const newAnswers = [...prev]
      newAnswers[currentQuestion] = { questionId: personalityQuestions[currentQuestion].id, score }
      return newAnswers
    })

    if (currentQuestion < personalityQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    } else {
      calculatePersonalityType()
    }
  }

  const calculatePersonalityType = () => {
    const result = {
      E: 0,
      I: 0,
      S: 0,
      N: 0,
      T: 0,
      F: 0,
      J: 0,
      P: 0,
    }

    answers.forEach((answer) => {
      const question = personalityQuestions.find((q) => q.id === answer.questionId)
      if (!question) return

      switch (question.category) {
        case "E/I":
          answer.score > 3 ? result.E++ : result.I++
          break
        case "S/N":
          answer.score > 3 ? result.S++ : result.N++
          break
        case "T/F":
          answer.score > 3 ? result.T++ : result.F++
          break
        case "J/P":
          answer.score > 3 ? result.J++ : result.P++
          break
      }
    })

    const type = `${result.E > result.I ? "E" : "I"}${result.S > result.N ? "S" : "N"}${result.T > result.F ? "T" : "F"}${result.J > result.P ? "J" : "P"}`

    // In a real app, you'd save this to the user's profile
    console.log("Personality Type:", type)

    // Store the personality type in localStorage for demo purposes
    localStorage.setItem("personalityType", type)

    router.push("/register/complete")
  }

  if (showIntro) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <Logo />
        <Card className="w-full max-w-2xl mt-8">
          <CardHeader>
            <CardTitle>Discover Your Personality Type</CardTitle>
            <CardDescription>
              Take this personality assessment to help us match you with compatible people. This test will take about
              5-10 minutes to complete.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Based on the TypeFinder® Personality Test, this assessment will help understand:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>How you interact with others (Extraversion vs. Introversion)</li>
              <li>How you gather information (Sensing vs. Intuition)</li>
              <li>How you make decisions (Thinking vs. Feeling)</li>
              <li>How you organize your life (Judging vs. Perceiving)</li>
            </ul>
            <Button className="w-full mt-6" onClick={() => setShowIntro(false)}>
              Start Assessment
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <Logo />
      <div className="w-full max-w-2xl mt-8">
        <ProgressBar current={currentQuestion + 1} total={personalityQuestions.length} />
        <QuestionCard
          key={currentQuestion}
          question={personalityQuestions[currentQuestion]}
          currentAnswer={answers[currentQuestion]?.score || null}
          onAnswer={handleAnswer}
        />
        {currentQuestion > 0 && (
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => {
              setCurrentQuestion((prev) => prev - 1)
              setAnswers((prev) => {
                const newAnswers = [...prev]
                newAnswers[currentQuestion] = undefined
                return newAnswers
              })
            }}
          >
            Previous Question
          </Button>
        )}
      </div>
    </div>
  )
}
