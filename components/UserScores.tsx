// This file was previously at app/components/UserScores.tsx
// No changes needed to its content as it was already correct.
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface UserScoresProps {
  scores?: {
    funFactor: number
    sharedVibe: number
    respectAttitude: number
    communication: number
  }
}

export function UserScores({
  scores = {
    funFactor: 0,
    sharedVibe: 0,
    respectAttitude: 0,
    communication: 0,
  },
}: UserScoresProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Scores</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(scores).map(([key, value]) => (
            <div key={key} className="flex items-center space-x-4">
              <div className="relative w-12 h-12">
                <svg className="w-12 h-12 transform -rotate-90">
                  <circle cx="24" cy="24" r="20" strokeWidth="4" stroke="#e2e8f0" fill="none" />
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    strokeWidth="4"
                    stroke="#3b82f6"
                    fill="none"
                    strokeDasharray={`${value * 12.57} 126`}
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-sm font-medium">
                  {value.toFixed(1)}
                </span>
              </div>
              <span className="text-sm font-medium">{key.replace(/([A-Z])/g, " $1").trim()}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
