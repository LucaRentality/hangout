import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PersonalityBadge } from "./PersonalityBadge"

interface PersonalityDescriptionProps {
  type: string
  description: string
  strengths: string[]
  weaknesses: string[]
  careerSuggestions: string[]
}

export function PersonalityDescription({
  type,
  description,
  strengths,
  weaknesses,
  careerSuggestions,
}: PersonalityDescriptionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Your Personality Type: <PersonalityBadge type={type as any} size="md" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold mb-2">Description</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Strengths</h3>
          <ul className="list-disc list-inside text-sm text-muted-foreground">
            {strengths.map((strength, index) => (
              <li key={index}>{strength}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Potential Weaknesses</h3>
          <ul className="list-disc list-inside text-sm text-muted-foreground">
            {weaknesses.map((weakness, index) => (
              <li key={index}>{weakness}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Career Suggestions</h3>
          <ul className="list-disc list-inside text-sm text-muted-foreground">
            {careerSuggestions.map((career, index) => (
              <li key={index}>{career}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
