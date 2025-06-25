import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PersonalityBadge } from "../components/PersonalityBadge"
import { ArrowLeft } from "lucide-react"

const personalityTypes = [
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

export default function PersonalityInfo() {
  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center mb-6">
        <Link href="/profile">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Personality Types</h1>
        <div className="w-10"></div>
      </header>

      <main className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {personalityTypes.map((type) => (
          <Card key={type}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <PersonalityBadge type={type as any} size="sm" />
                <span>{type}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                {/* Add a brief description of each personality type here */}
                This is a brief description of the {type} personality type. It includes key traits and characteristics.
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </main>
    </div>
  )
}
