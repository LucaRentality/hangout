"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageCircle } from "lucide-react"
import MessageRecorder from "./MessageRecorder"

interface Match {
  id: string
  name: string
  avatar: string
}

const matches: Match[] = [
  { id: "1", name: "Sarah L.", avatar: "/placeholder.svg?height=40&width=40" },
  { id: "2", name: "Mike R.", avatar: "/placeholder.svg?height=40&width=40" },
  { id: "3", name: "Emma W.", avatar: "/placeholder.svg?height=40&width=40" },
]

export default function MatchList() {
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null)

  const handleSendMessage = (match: Match) => {
    setSelectedMatch(match)
  }

  const handleCloseRecorder = () => {
    setSelectedMatch(null)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Matches</CardTitle>
      </CardHeader>
      <CardContent>
        {selectedMatch ? (
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Avatar>
                <AvatarImage src={selectedMatch.avatar} alt={selectedMatch.name} />
                <AvatarFallback>
                  {selectedMatch.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <span>{selectedMatch.name}</span>
            </div>
            <MessageRecorder onClose={handleCloseRecorder} matchId={selectedMatch.id} />
          </div>
        ) : (
          <ul className="space-y-4">
            {matches.map((match) => (
              <li key={match.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Avatar>
                    <AvatarImage src={match.avatar} alt={match.name} />
                    <AvatarFallback>
                      {match.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span>{match.name}</span>
                </div>
                <Button size="sm" onClick={() => handleSendMessage(match)}>
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}
