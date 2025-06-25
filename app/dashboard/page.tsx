"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarDays, Clock, MessageCircle } from "lucide-react"
import styles from "./dashboard.module.css"

interface UserProfile {
  name: string
  age: number
  personalityType: string
  photos: string[]
}

interface Match {
  id: string
  name: string
  avatar: string
  lastMessage: string
}

interface Hangout {
  id: string
  title: string
  date: string
  participants: string[]
}

export default function Dashboard() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [matches, setMatches] = useState<Match[]>([])
  const [upcomingHangouts, setUpcomingHangouts] = useState<Hangout[]>([])
  const [pastHangouts, setPastHangouts] = useState<Hangout[]>([])
  const router = useRouter()

  useEffect(() => {
    const storedProfile = localStorage.getItem("userProfile")
    if (storedProfile) {
      setUserProfile(JSON.parse(storedProfile))
    } else {
      router.push("/")
    }

    // In a real app, you'd fetch this data from your API
    setMatches([
      { id: "1", name: "Alice", avatar: "/placeholder.svg?height=40&width=40", lastMessage: "Hey, how are you?" },
      {
        id: "2",
        name: "Bob",
        avatar: "/placeholder.svg?height=40&width=40",
        lastMessage: "Looking forward to our hangout!",
      },
    ])
    setUpcomingHangouts([
      { id: "1", title: "Coffee Meetup", date: "2023-06-15T10:00:00", participants: ["Alice", "Bob"] },
      { id: "2", title: "Movie Night", date: "2023-06-18T19:00:00", participants: ["Charlie", "David"] },
    ])
    setPastHangouts([
      { id: "3", title: "Hiking Adventure", date: "2023-06-01T09:00:00", participants: ["Eve", "Frank"] },
      { id: "4", title: "Board Game Evening", date: "2023-05-25T18:00:00", participants: ["Grace", "Henry"] },
    ])
  }, [router])

  if (!userProfile) {
    return <div>Loading...</div>
  }

  return (
    <div className={styles.backgroundWrapper}>
      <div className={`${styles.content} space-y-6`}>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Card>
          <CardHeader>
            <CardTitle>Your Matches</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {matches.map((match) => (
                <div key={match.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={match.avatar} alt={match.name} />
                      <AvatarFallback>{match.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{match.name}</p>
                      <p className="text-sm text-muted-foreground">{match.lastMessage}</p>
                    </div>
                  </div>
                  <Button size="sm">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Chat
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Your Hangouts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Upcoming Hangouts</h3>
                <ul className="space-y-2">
                  {upcomingHangouts.map((hangout) => (
                    <li key={hangout.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{hangout.title}</p>
                        <p className="text-sm text-muted-foreground">
                          <CalendarDays className="inline-block w-4 h-4 mr-1" />
                          {new Date(hangout.date).toLocaleDateString()}
                          <Clock className="inline-block w-4 h-4 ml-2 mr-1" />
                          {new Date(hangout.date).toLocaleTimeString()}
                        </p>
                        <p className="text-sm">With: {hangout.participants.join(", ")}</p>
                      </div>
                      <Button size="sm">View Details</Button>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Past Hangouts</h3>
                <ul className="space-y-2">
                  {pastHangouts.map((hangout) => (
                    <li key={hangout.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{hangout.title}</p>
                        <p className="text-sm text-muted-foreground">
                          <CalendarDays className="inline-block w-4 h-4 mr-1" />
                          {new Date(hangout.date).toLocaleDateString()}
                        </p>
                        <p className="text-sm">With: {hangout.participants.join(", ")}</p>
                      </div>
                      <Button size="sm" variant="outline">
                        Leave Review
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
