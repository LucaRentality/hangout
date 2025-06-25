"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"
import Link from "next/link"

interface Match {
  id: string
  name: string
  avatar: string
  lastMessage?: string
}

const mockMatches: Match[] = [
  { id: "1", name: "Alice", avatar: "/placeholder.svg?height=64&width=64", lastMessage: "Hey, how are you?" },
  { id: "2", name: "Bob", avatar: "/placeholder.svg?height=64&width=64" },
  // Add more mock matches as needed
]

export function Matches() {
  const [matches, setMatches] = useState<Match[]>(mockMatches)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Matches</CardTitle>
      </CardHeader>
      <CardContent>
        {matches.length > 0 ? (
          <ul className="space-y-4">
            {matches.map((match) => (
              <li key={match.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={match.avatar} alt={match.name} />
                    <AvatarFallback>{match.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{match.name}</p>
                    {match.lastMessage && <p className="text-sm text-muted-foreground">{match.lastMessage}</p>}
                  </div>
                </div>
                <Link href={`/chat/${match.id}`}>
                  <Button variant="outline" size="sm">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Chat
                  </Button>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-muted-foreground">No matches yet. Keep swiping!</p>
        )}
      </CardContent>
    </Card>
  )
}
