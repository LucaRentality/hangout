"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageCircle, AlertCircle, MapPin, Filter, ThumbsUp, ThumbsDown } from "lucide-react"
import MessageRecorder from "./MessageRecorder"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { findMatches, type User } from "../utils/matchingAlgorithm"
import { PersonalityBadge } from "./PersonalityBadge"
import { UsageTracker } from "./UsageTracker"
import { useToast } from "@/components/ui/use-toast"
import { VerificationProcess } from "./VerificationProcess"
import { VerifiedBadge } from "./VerifiedBadge"
import { ReportUserModal } from "./ReportUserModal"
import { UserReviewModal } from "./UserReviewModal"
import { UserScores } from "./UserScores"
import { HangoutInvitationHandler } from "./HangoutInvitationHandler"
import type { HangoutInvitation, HangoutActivity } from "../types/hangout"

// This would typically come from your backend API or user's session
const currentUser: User = {
  id: "current",
  name: "You",
  avatar: "/placeholder.svg?height=40&width=40",
  personalityType: "ENFP",
  gender: "Non-binary",
  genderInterest: ["Male", "Female", "Non-binary"],
  lookingFor: ["Friends", "Fun"],
  distance: 0,
  isVerified: false,
  verificationStatus: "unverified",
}

// This would typically come from your backend API
const mockUsers: User[] = [
  {
    id: "1",
    name: "Sarah L.",
    avatar: "/placeholder.svg?height=40&width=40",
    personalityType: "INFJ",
    gender: "Female",
    genderInterest: ["Non-binary"],
    lookingFor: ["Friends", "Fun"],
    distance: 2.5,
    isVerified: true,
    verificationStatus: "verified",
    scores: {
      funFactor: 8,
      sharedVibe: 7,
      respectAttitude: 9,
      communication: 6,
    },
  },
  {
    id: "2",
    name: "Mike R.",
    avatar: "/placeholder.svg?height=40&width=40",
    personalityType: "ENTJ",
    gender: "Male",
    genderInterest: ["Female", "Non-binary"],
    lookingFor: ["Long Story", "Open to Destiny"],
    distance: 4.1,
    isVerified: true,
    verificationStatus: "verified",
    scores: {
      funFactor: 6,
      sharedVibe: 9,
      respectAttitude: 7,
      communication: 8,
    },
  },
  {
    id: "3",
    name: "Emma W.",
    avatar: "/placeholder.svg?height=40&width=40",
    personalityType: "ISFP",
    gender: "Non-binary",
    genderInterest: ["Male", "Female", "Non-binary"],
    lookingFor: ["Friends", "Open to Destiny"],
    distance: 5.8,
    isVerified: false,
    verificationStatus: "pending",
    scores: {
      funFactor: 7,
      sharedVibe: 6,
      respectAttitude: 8,
      communication: 7,
    },
  },
]

export default function NearbyMatches() {
  const [matches, setMatches] = useState<User[]>([])
  const [filteredMatches, setFilteredMatches] = useState<User[]>([])
  const [selectedMatch, setSelectedMatch] = useState<User | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [genderFilter, setGenderFilter] = useState<string | null>(null)
  const [lookingForFilter, setLookingForFilter] = useState<string[]>([])
  const [showVerification, setShowVerification] = useState(false)
  const [pendingInvitation, setPendingInvitation] = useState<HangoutInvitation | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const getLocation = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log("Geolocation success:", position.coords)
            // In a real app, you would use these coordinates to fetch nearby users
            // For this example, we'll just use the mock data
            const compatibleMatches = findMatches(currentUser, mockUsers)
            setMatches(compatibleMatches)
            setFilteredMatches(compatibleMatches)
            setIsLoading(false)
            setError(null)
          },
          (error) => {
            console.error("Geolocation error:", error)
            setError(`Unable to get your location: ${error.message}`)
            setIsLoading(false)
            // Fallback to mock data even if geolocation fails
            const compatibleMatches = findMatches(currentUser, mockUsers)
            setMatches(compatibleMatches)
            setFilteredMatches(compatibleMatches)
          },
          { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
        )
      } else {
        console.error("Geolocation is not supported by this browser")
        setError("Geolocation is not supported by your browser. Showing matches from a default location.")
        setIsLoading(false)
        // Fallback to mock data if geolocation is not supported
        const compatibleMatches = findMatches(currentUser, mockUsers)
        setMatches(compatibleMatches)
        setFilteredMatches(compatibleMatches)
      }
    }

    getLocation()
  }, [])

  useEffect(() => {
    const filtered = matches.filter((match) => {
      const genderMatch = !genderFilter || match.gender === genderFilter
      const lookingForMatch =
        lookingForFilter.length === 0 || lookingForFilter.some((item) => match.lookingFor.includes(item))
      return genderMatch && lookingForMatch
    })
    setFilteredMatches(filtered)
  }, [matches, genderFilter, lookingForFilter])

  const handleSendMessage = async (match: User) => {
    if (!currentUser.isVerified) {
      toast({
        variant: "destructive",
        title: "Verification Required",
        description: "Please verify your account to send messages.",
      })
      setShowVerification(true)
      return
    }

    try {
      const response = await fetch(`/api/user/${currentUser.id}/usage`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "hangout" }),
      })
      if (!response.ok) {
        throw new Error("Failed to send hangout invitation")
      }
      setSelectedMatch(match)
      toast({
        title: "Hangout Invitation Sent",
        description: `You've sent a hangout invitation to ${match.name}.`,
      })
    } catch (err) {
      setError("Error sending hangout invitation. Please try again later.")
      console.error(err)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send hangout invitation. Please try again.",
      })
    }
  }

  const handleCloseRecorder = () => {
    setSelectedMatch(null)
  }

  const handleLookingForChange = (option: string) => {
    setLookingForFilter((prev) => (prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]))
  }

  const handleSwipe = async (liked: boolean) => {
    if (!currentUser.isVerified) {
      toast({
        variant: "destructive",
        title: "Verification Required",
        description: "Please verify your account to swipe on profiles.",
      })
      setShowVerification(true)
      return
    }

    try {
      const response = await fetch(`/api/user/${currentUser.id}/usage`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "swipe" }),
      })
      if (!response.ok) {
        throw new Error("Failed to register swipe")
      }
      // In a real app, you would handle the swipe action here (e.g., save to database, update matches)
      console.log(`Swiped ${liked ? "right" : "left"}`)
      // Remove the first match from the list
      setFilteredMatches((prev) => prev.slice(1))
      toast({
        title: liked ? "Liked" : "Passed",
        description: liked ? "You liked this profile!" : "You passed on this profile.",
      })
    } catch (err) {
      setError("Error registering swipe. Please try again later.")
      console.error(err)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to register swipe. Please try again.",
      })
    }
  }

  const handleVerificationComplete = () => {
    setShowVerification(false)
    // In a real app, you would fetch the updated user data here
    currentUser.isVerified = true
    currentUser.verificationStatus = "verified"
    toast({
      title: "Verification Submitted",
      description: "Your account is now pending verification. This process may take 1-2 business days.",
    })
  }

  const handleReviewSubmit = () => {
    // Refresh the matches or update the reviewed user's scores
    // This could involve re-fetching the matches or updating the local state
    toast({
      title: "Review Submitted",
      description: "Thank you for your feedback!",
    })
  }

  const handleSendHangoutInvitation = async (match: User, activity: HangoutActivity) => {
    if (!currentUser.isVerified) {
      toast({
        variant: "destructive",
        title: "Verification Required",
        description: "Please verify your account to send hangout invitations.",
      })
      setShowVerification(true)
      return
    }

    try {
      const response = await fetch(`/api/user/${currentUser.id}/usage`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "hangout" }),
      })
      if (!response.ok) {
        throw new Error("Failed to send hangout invitation")
      }

      // In a real app, you would send the invitation to your server here
      console.log(`Sending hangout invitation to ${match.name}:`, activity)

      toast({
        title: "Hangout Invitation Sent",
        description: `You've sent a hangout invitation to ${match.name}.`,
      })
    } catch (err) {
      setError("Error sending hangout invitation. Please try again later.")
      console.error(err)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send hangout invitation. Please try again.",
      })
    }
  }

  const handleAcceptInvitation = () => {
    if (pendingInvitation) {
      // In a real app, you would update the invitation status on your server here
      console.log("Accepted invitation:", pendingInvitation)
      toast({
        title: "Invitation Accepted",
        description: "You've accepted the hangout invitation.",
      })
      setPendingInvitation(null)
    }
  }

  const handleDeclineInvitation = () => {
    if (pendingInvitation) {
      // In a real app, you would update the invitation status on your server here
      console.log("Declined invitation:", pendingInvitation)
      toast({
        title: "Invitation Declined",
        description: "You've declined the hangout invitation.",
      })
      setPendingInvitation(null)
    }
  }

  const handleCounterproposeInvitation = (activity: HangoutActivity) => {
    if (pendingInvitation) {
      // In a real app, you would send the counterproposal to your server here
      console.log("Counterproposed invitation:", { ...pendingInvitation, activity })
      toast({
        title: "Counterproposal Sent",
        description: "You've sent a counterproposal for the hangout invitation.",
      })
      setPendingInvitation(null)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <MapPin className="mr-2 h-4 w-4" />
            Nearby Matches
          </div>
          <Button variant="outline" size="sm" onClick={() => setSelectedMatch(null)}>
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <UsageTracker userId={currentUser.id} />
        {showVerification ? (
          <VerificationProcess userId={currentUser.id} onVerificationComplete={handleVerificationComplete} />
        ) : pendingInvitation ? (
          <HangoutInvitationHandler
            invitation={pendingInvitation}
            onAccept={handleAcceptInvitation}
            onDecline={handleDeclineInvitation}
            onCounterpropose={handleCounterproposeInvitation}
          />
        ) : isLoading ? (
          <p>Loading nearby matches...</p>
        ) : error ? (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : selectedMatch ? (
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
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Gender</Label>
              <Select value={genderFilter || ""} onValueChange={(value) => setGenderFilter(value || null)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Non-binary">Non-binary</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Looking For</Label>
              <div className="flex flex-wrap gap-2">
                {["Fun", "Friends", "Long Story", "Open to Destiny"].map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <Checkbox
                      id={`looking-for-${option}`}
                      checked={lookingForFilter.includes(option)}
                      onCheckedChange={() => handleLookingForChange(option)}
                    />
                    <Label htmlFor={`looking-for-${option}`}>{option}</Label>
                  </div>
                ))}
              </div>
            </div>
            {filteredMatches.length > 0 ? (
              <div className="space-y-4">
                {filteredMatches.map((match, index) => (
                  <Card key={match.id} className={index === 0 ? "border-2 border-primary" : ""}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
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
                          <div>
                            <div className="flex items-center">
                              {match.name}
                              <VerifiedBadge isVerified={match.isVerified} />
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {match.distance.toFixed(1)} km away • {match.gender} • Looking for:{" "}
                              {match.lookingFor.join(", ")}
                            </div>
                            <div className="mt-1">
                              <PersonalityBadge type={match.personalityType} />
                            </div>
                          </div>
                        </div>
                        {index === 0 && (
                          <div className="flex space-x-2">
                            <Button size="sm" onClick={() => handleSwipe(false)}>
                              <ThumbsDown className="h-4 w-4 mr-2" />
                              Pass
                            </Button>
                            <Button size="sm" onClick={() => handleSwipe(true)}>
                              <ThumbsUp className="h-4 w-4 mr-2" />
                              Like
                            </Button>
                          </div>
                        )}
                      </div>
                      <UserScores
                        funFactor={match.scores?.funFactor || 0}
                        sharedVibe={match.scores?.sharedVibe || 0}
                        respectAttitude={match.scores?.respectAttitude || 0}
                        communication={match.scores?.communication || 0}
                      />
                      <div className="mt-4 flex justify-between">
                        <Button className="w-full mr-2" size="sm" onClick={() => setSelectedMatch(match)}>
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Send Message or Invite
                        </Button>
                        <ReportUserModal reportedUserId={match.id} reportedUserName={match.name} />
                        <UserReviewModal
                          reviewedUserId={match.id}
                          reviewedUserName={match.name}
                          onReviewSubmit={handleReviewSubmit}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p>No matches found with the current filters.</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
