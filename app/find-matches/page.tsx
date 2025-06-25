"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PersonalityBadge } from "@/components/PersonalityBadge"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Star, ThumbsUp, ThumbsDown } from "lucide-react"

interface MatchProfile {
  id: string
  name: string
  age: number
  personalityType: string
  photos: string[]
  bio: string
  interests: string[]
  overallRating: number
  generatedDescription?: string
}

export default function FindMatches() {
  const [currentMatch, setCurrentMatch] = useState<MatchProfile | null>(null)
  const [matchIndex, setMatchIndex] = useState(0)

  const mockMatches: MatchProfile[] = [
    {
      id: "1",
      name: "Alice",
      age: 28,
      personalityType: "ENFP",
      photos: ["/placeholder.svg?height=300&width=300", "/placeholder.svg?height=300&width=300"],
      bio: "Adventure seeker and coffee enthusiast. Always up for trying new things!",
      interests: ["Hiking", "Photography", "Cooking"],
      overallRating: 4.5,
      generatedDescription:
        "Alice is a vibrant ENFP who thrives on new experiences and connections. With a passion for hiking, photography, and cooking, she brings creativity and enthusiasm to every interaction. Her adventurous spirit and love for coffee make her an exciting match for those seeking spontaneity and depth in their relationships.",
    },
    {
      id: "2",
      name: "Bob",
      age: 32,
      personalityType: "INTJ",
      photos: ["/placeholder.svg?height=300&width=300", "/placeholder.svg?height=300&width=300"],
      bio: "Tech geek with a passion for learning. Love discussing new ideas over a good cup of tea.",
      interests: ["Programming", "Reading", "Chess"],
      overallRating: 4.2,
      generatedDescription:
        "Bob, an insightful INTJ, combines his love for technology with a thirst for knowledge. His interests in programming, reading, and chess reflect his analytical mind and strategic thinking. Bob enjoys deep, meaningful conversations over tea, making him an ideal match for those who appreciate intellectual discourse and quiet contemplation.",
    },
  ]

  useEffect(() => {
    // In a real app, you'd fetch matches from your API
    setCurrentMatch(mockMatches[matchIndex])
  }, [matchIndex])

  const handleLike = () => {
    // In a real app, you'd send this information to your API
    console.log(`Liked ${currentMatch?.name}`)
    moveToNextMatch()
  }

  const handlePass = () => {
    // In a real app, you'd send this information to your API
    console.log(`Passed on ${currentMatch?.name}`)
    moveToNextMatch()
  }

  const moveToNextMatch = () => {
    if (matchIndex < mockMatches.length - 1) {
      setMatchIndex(matchIndex + 1)
    } else {
      // In a real app, you might want to fetch more matches or show a message
      console.log("No more matches available")
    }
  }

  if (!currentMatch) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Find Your Match</h1>
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            {currentMatch.name}, {currentMatch.age}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Carousel className="w-full max-w-xs mx-auto">
            <CarouselContent>
              {currentMatch.photos.map((photo, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <div className="aspect-square relative overflow-hidden rounded-xl">
                      <img
                        src={photo || "/placeholder.svg"}
                        alt={`${currentMatch.name}'s photo ${index + 1}`}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>

          <div className="flex items-center justify-between">
            <PersonalityBadge type={currentMatch.personalityType as any} size="lg" />
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-400 mr-1" />
              <span className="font-semibold">{currentMatch.overallRating.toFixed(1)}</span>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">About Me</h3>
            <p>{currentMatch.generatedDescription || currentMatch.bio}</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Interests</h3>
            <div className="flex flex-wrap gap-2">
              {currentMatch.interests.map((interest, index) => (
                <span key={index} className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-sm">
                  {interest}
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <Button onClick={handlePass} variant="outline" size="lg">
              <ThumbsDown className="w-6 h-6 mr-2" />
              Pass
            </Button>
            <Button onClick={handleLike} size="lg">
              <ThumbsUp className="w-6 h-6 mr-2" />
              Like
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
