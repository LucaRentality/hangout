"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { PersonalityBadge } from "@/app/components/PersonalityBadge"
import { VerifiedBadge } from "@/app/components/VerifiedBadge"
import { UserScores } from "@/app/components/UserScores"
import { ThumbsUp, ThumbsDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"

interface User {
  id: string
  name: string
  avatar: string
  age: number
  bio: string
  distance: number
  personalityType: string
  isVerified: boolean
  scores: {
    funFactor: number
    sharedVibe: number
    respectAttitude: number
    communication: number
  }
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "Alice",
    avatar: "/placeholder.svg?height=128&width=128",
    age: 28,
    bio: "Adventure seeker and coffee enthusiast",
    distance: 5,
    personalityType: "ENFP",
    isVerified: true,
    scores: { funFactor: 4.5, sharedVibe: 4.2, respectAttitude: 4.8, communication: 4.3 },
  },
  {
    id: "2",
    name: "Bob",
    avatar: "/placeholder.svg?height=128&width=128",
    age: 32,
    bio: "Bookworm and nature lover",
    distance: 3,
    personalityType: "INTJ",
    isVerified: false,
    scores: { funFactor: 4.0, sharedVibe: 4.5, respectAttitude: 4.7, communication: 4.1 },
  },
  // Add more mock users as needed
]

const LikesCounter = ({ count }: { count: number }) => (
  <Badge variant="secondary" className="text-lg px-3 py-1">
    Remaining Likes: {count}
  </Badge>
)

export default function NearbyMatches() {
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [remainingLikes, setRemainingLikes] = useState(10)
  const { toast } = useToast()

  const getLikesByProfileType = (profileType: string) => {
    switch (profileType) {
      case "premium":
        return 20
      case "gold":
        return 15
      default:
        return 10
    }
  }

  useEffect(() => {
    // Assuming we have a way to get the user's profile type
    const userProfileType = "standard" // This should be fetched from user data
    setRemainingLikes(getLikesByProfileType(userProfileType))
  }, [])

  const handleSwipe = (liked: boolean) => {
    if (liked) {
      if (remainingLikes > 0) {
        toast({
          title: "Liked!",
          description: `You liked ${users[currentIndex].name}. If they like you back, it's a match!`,
        })
        setRemainingLikes((prev) => Math.max(0, prev - 1))
      } else {
        toast({
          title: "No more likes!",
          description: "You've used all your likes. Upgrade your profile to get more!",
          variant: "destructive",
        })
        return
      }
    } else {
      toast({
        title: "Passed",
        description: `You passed on ${users[currentIndex].name}.`,
      })
    }

    // Move to the next user
    setCurrentIndex((prevIndex) => prevIndex + 1)
  }

  const currentUser = users[currentIndex]

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Nearby Matches</h1>
        <LikesCounter count={remainingLikes} />
      </div>
      <AnimatePresence>
        {currentUser && (
          <motion.div
            key={currentUser.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="w-full max-w-md mx-auto">
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  <Avatar className="w-32 h-32 mb-4">
                    <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                    <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h2 className="text-2xl font-semibold mb-1">
                    {currentUser.name}, {currentUser.age}
                  </h2>
                  <div className="flex items-center mb-2">
                    <PersonalityBadge type={currentUser.personalityType as any} />
                    <VerifiedBadge isVerified={currentUser.isVerified} />
                  </div>
                  <p className="text-center mb-4">{currentUser.bio}</p>
                  <p className="text-sm text-muted-foreground mb-4">{currentUser.distance} km away</p>
                  <UserScores {...currentUser.scores} />
                </div>
              </CardContent>
            </Card>
            <div className="flex justify-center mt-4 space-x-4">
              <Button onClick={() => handleSwipe(false)} variant="outline" size="lg">
                <ThumbsDown className="mr-2 h-4 w-4" />
                Pass
              </Button>
              <Button onClick={() => handleSwipe(true)} variant="default" size="lg" disabled={remainingLikes === 0}>
                <ThumbsUp className="mr-2 h-4 w-4" />
                Like {remainingLikes > 0 ? `(${remainingLikes})` : "(0)"}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {currentIndex >= users.length && (
        <div className="text-center mt-8">
          <p className="text-xl mb-4">You've seen all nearby matches!</p>
          <Button onClick={() => setCurrentIndex(0)}>Start Over</Button>
        </div>
      )}
    </div>
  )
}
