import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { PersonalityQuestion } from "@/app/types/personality"

interface QuestionCardProps {
  question: PersonalityQuestion
  currentAnswer: number | null
  onAnswer: (score: number) => void
}

export function QuestionCard({ question, currentAnswer, onAnswer }: QuestionCardProps) {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="pt-6">
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-center mb-6">{question.text}</h3>
          <RadioGroup
            value={currentAnswer?.toString()}
            onValueChange={(value) => onAnswer(Number.parseInt(value))}
            className="flex justify-between items-center gap-2"
          >
            <div className="flex flex-col items-center">
              <RadioGroupItem value="1" id={`q${question.id}-1`} className="peer" />
              <Label htmlFor={`q${question.id}-1`} className="mt-2 text-sm">
                Strongly Disagree
              </Label>
            </div>
            <div className="flex flex-col items-center">
              <RadioGroupItem value="2" id={`q${question.id}-2`} className="peer" />
              <Label htmlFor={`q${question.id}-2`} className="mt-2 text-sm">
                Disagree
              </Label>
            </div>
            <div className="flex flex-col items-center">
              <RadioGroupItem value="3" id={`q${question.id}-3`} className="peer" />
              <Label htmlFor={`q${question.id}-3`} className="mt-2 text-sm">
                Neutral
              </Label>
            </div>
            <div className="flex flex-col items-center">
              <RadioGroupItem value="4" id={`q${question.id}-4`} className="peer" />
              <Label htmlFor={`q${question.id}-4`} className="mt-2 text-sm">
                Agree
              </Label>
            </div>
            <div className="flex flex-col items-center">
              <RadioGroupItem value="5" id={`q${question.id}-5`} className="peer" />
              <Label htmlFor={`q${question.id}-5`} className="mt-2 text-sm">
                Strongly Agree
              </Label>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  )
}
