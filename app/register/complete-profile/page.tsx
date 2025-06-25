"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { InterestSelector } from "@/app/components/InterestSelector"
import { ProfilePhotoGallery } from "@/app/components/ProfilePhotoGallery"
import { useToast } from "@/components/ui/use-toast"
import type { GenderType, LookingFor } from "@/app/types/user"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const personalityDescriptions: Record<string, string> = {
  ISTJ: "Quiet, serious, earn success by thoroughness and dependability. Practical, matter-of-fact, realistic, and responsible.",
  ISFJ: "Quiet, friendly, responsible, and conscientious. Committed and steady in meeting their obligations.",
  INFJ: "Seek meaning and connection in ideas, relationships, and material possessions. Want to understand what motivates people and are insightful about others.",
  INTJ: "Have original minds and great drive for implementing their ideas and achieving their goals. Quickly see patterns in external events and develop long-range explanatory perspectives.",
  ISTP: "Tolerant and flexible, quiet observers until a problem appears, then act quickly to find workable solutions.",
  ISFP: "Quiet, friendly, sensitive, and kind. Enjoy the present moment, what's going on around them. Like to have their own space and to work within their own time frame.",
  INFP: "Idealistic, loyal to their values and to people who are important to them. Want an external life that is congruent with their values.",
  INTP: "Seek to develop logical explanations for everything that interests them. Theoretical and abstract, interested more in ideas than in social interaction.",
  ESTP: "Flexible and tolerant, they take a pragmatic approach focused on immediate results. Theories and conceptual explanations bore them - they want to act energetically to solve the problem.",
  ESFP: "Outgoing, friendly, and accepting. Exuberant lovers of life, people, and material comforts. Enjoy working with others to make things happen.",
  ENFP: "Warmly enthusiastic and imaginative. See life as full of possibilities. Make connections between events and information very quickly, and confidently proceed based on the patterns they see.",
  ENTP: "Quick, ingenious, stimulating, alert, and outspoken. Resourceful in solving new and challenging problems. Adept at generating conceptual possibilities and then analyzing them strategically.",
  ESTJ: "Practical, realistic, matter-of-fact. Decisive, quickly move to implement decisions. Organize projects and people to get things done, focus on getting results in the most efficient way possible.",
  ESFJ: "Warmhearted, conscientious, and cooperative. Want harmony in their environment, work with determination to establish it.",
  ENFJ: "Warm, empathetic, responsive, and responsible. Highly attuned to the emotions, needs, and motivations of others. Find potential in everyone, want to help others fulfill their potential.",
  ENTJ: "Frank, decisive, assume leadership readily. Quickly see illogical and inefficient procedures and policies, develop and implement comprehensive systems to solve organizational problems.",
}

const getLastKnownLocation = (): string => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("lastKnownLocation") || ""
  }
  return ""
}

export default function CompleteProfile() {
  const router = useRouter()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    dateOfBirth: "",
    genderType: "" as GenderType,
    lookingFor: [] as LookingFor[],
    location: "",
    interests: [] as string[],
    favoriteActivities: [] as string[],
    photos: [] as string[],
  })
  const [personalityType, setPersonalityType] = useState("")
  const [generatedBio, setGeneratedBio] = useState("")
  const [isLoadingLocation, setIsLoadingLocation] = useState(true)
  const [age, setAge] = useState<number | null>(null)
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)

  useEffect(() => {
    // Retrieve personality type from localStorage
    const storedPersonalityType = localStorage.getItem("personalityType")
    if (storedPersonalityType) {
      setPersonalityType(storedPersonalityType)
    }

    // Get user's location
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords
            const response = await fetch(
              `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=YOUR_OPENCAGE_API_KEY`,
            )
            const data = await response.json()
            if (data.results && data.results.length > 0) {
              const locationName = data.results[0].formatted
              setFormData((prev) => ({ ...prev, location: locationName }))
              localStorage.setItem("lastKnownLocation", locationName)
            } else {
              throw new Error("No results found")
            }
          } catch (error) {
            console.error("Error fetching location:", error)
            handleLocationError("Error fetching location details. Please enter your location manually.")
          } finally {
            setIsLoadingLocation(false)
          }
        },
        (error) => {
          console.error("Geolocation error:", error.message)
          handleLocationError(`Geolocation error: ${error.message}. Please enter your location manually.`)
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 },
      )
    } else {
      handleLocationError("Geolocation is not supported by your browser. Please enter your location manually.")
    }
  }, [toast])

  const handleLocationError = (errorMessage: string) => {
    setIsLoadingLocation(false)
    const lastKnownLocation = getLastKnownLocation()
    if (lastKnownLocation) {
      setFormData((prev) => ({ ...prev, location: lastKnownLocation }))
      toast({
        title: "Using Last Known Location",
        description: `${errorMessage} Using your last known location instead.`,
      })
    } else {
      setFormData((prev) => ({ ...prev, location: "" }))
      toast({
        title: "Location Error",
        description: errorMessage,
        variant: "destructive",
      })
    }
  }

  useEffect(() => {
    // Generate bio when form data or personality type changes
    if (personalityType && formData.name && formData.dateOfBirth && formData.interests.length > 0) {
      generateBio()
    }
  }, [formData, personalityType, age])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (name === "dateOfBirth") {
      const birthDate = new Date(value)
      const today = new Date()
      const calculatedAge = today.getFullYear() - birthDate.getFullYear()
      setAge(calculatedAge)
    }
  }

  const handleSelectChange = (name: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePhotoChange = (photos: string[]) => {
    setFormData((prev) => ({ ...prev, photos }))
  }

  const generateBio = () => {
    if (age === null) return
    const personalityDescription = personalityDescriptions[personalityType] || "Unique and interesting individual"
    const bio = `Hey there! 👋 I'm ${formData.name}, a ${age}-year-old ${personalityType} living in ${formData.location}. 
  
  My personality test says I'm ${personalityDescription.toLowerCase()} Sounds pretty spot-on to me! 😄

  I'm on this app looking for ${formData.lookingFor.join(" and ")}. When I'm not busy being a ${personalityType}, you can find me ${formData.interests.slice(0, 2).join(" or ")}. I'm also really into ${formData.favoriteActivities.slice(0, 2).join(" and ")}.

  If you think we might click, don't be shy - let's chat and see where it goes! Who knows, we might just hit it off and create some amazing memories together. 🌟`
    setGeneratedBio(bio)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.photos.length === 0) {
      toast({
        title: "Profile Picture Required",
        description: "Please upload at least one profile picture.",
        variant: "destructive",
      })
      return
    }

    if (!formData.location) {
      toast({
        title: "Location Required",
        description: "Please enter your location.",
        variant: "destructive",
      })
      return
    }

    if (!formData.dateOfBirth || !age || age < 18) {
      toast({
        title: "Invalid Age",
        description: "You must be at least 18 years old to register.",
        variant: "destructive",
      })
      return
    }

    // Show the confirmation dialog if all validations pass
    setShowConfirmDialog(true)
  }

  const handleConfirmSubmit = async () => {
    try {
      // Here you would typically send the form data to your API
      const profileData = {
        ...formData,
        personalityType,
        bio: generatedBio,
        age,
      }
      console.log("Profile data:", profileData)

      // Simulating an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Profile Completed",
        description: "Your profile has been successfully created!",
      })

      setIsConfirmed(true)
      setShowConfirmDialog(false)

      // Store user information in localStorage
      localStorage.setItem("userProfile", JSON.stringify(profileData))
      localStorage.setItem("isLoggedIn", "true")

      router.push("/dashboard")
    } catch (error) {
      console.error("Error submitting profile:", error)
      toast({
        title: "Error",
        description: "There was an error submitting your profile. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Complete Your Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <Label>Profile Photos</Label>
              <ProfilePhotoGallery initialPhotos={formData.photos} onPhotosChange={handlePhotoChange} />
            </div>
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
            </div>
            <div>
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                required
                max={new Date().toISOString().split("T")[0]}
                readOnly={isConfirmed}
              />
              {age !== null && <p className="mt-2 text-sm text-muted-foreground">Your age: {age}</p>}
            </div>
            <div>
              <Label htmlFor="genderType">Gender</Label>
              <Select name="genderType" onValueChange={(value) => handleSelectChange("genderType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Couple">Couple</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Looking For</Label>
              <div className="flex flex-wrap gap-2">
                {["Fun", "Friends", "Relation", "Open"].map((option) => (
                  <Button
                    key={option}
                    type="button"
                    variant={formData.lookingFor.includes(option as LookingFor) ? "default" : "outline"}
                    onClick={() => {
                      const newLookingFor = formData.lookingFor.includes(option as LookingFor)
                        ? formData.lookingFor.filter((item) => item !== option)
                        : [...formData.lookingFor, option as LookingFor]
                      handleSelectChange("lookingFor", newLookingFor)
                    }}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder={isLoadingLocation ? "Detecting your location..." : "Enter your location"}
                disabled={isLoadingLocation}
              />
              {formData.location === getLastKnownLocation() && formData.location && (
                <p className="mt-2 text-sm text-muted-foreground">(Last known location)</p>
              )}
            </div>
            <InterestSelector
              category="Interests"
              options={[
                "Hiking",
                "Photography",
                "Travel",
                "Cooking",
                "Music",
                "Sports",
                "Reading",
                "Dancing",
                "Painting",
                "Gardening",
                "Yoga",
                "Meditation",
                "Technology",
                "Fashion",
                "Movies",
                "Theater",
                "Volunteering",
                "Pets",
              ]}
              initialSelected={formData.interests}
              onSelectionChange={(selected) => handleSelectChange("interests", selected)}
              isEditable={true}
              maxSelections={10}
            />
            <InterestSelector
              category="Favorite Activities"
              options={[
                "Mountain climbing",
                "City exploration",
                "Beach relaxation",
                "Museum visits",
                "Concert going",
                "Food tasting",
                "Skydiving",
                "Scuba diving",
                "Wine tasting",
                "Pottery making",
                "Escape rooms",
                "Board games",
                "Karaoke",
                "Cycling",
                "Camping",
                "Fishing",
                "Surfing",
                "Skiing",
              ]}
              initialSelected={formData.favoriteActivities}
              onSelectionChange={(selected) => handleSelectChange("favoriteActivities", selected)}
              isEditable={true}
              maxSelections={10}
            />
            {generatedBio && (
              <div>
                <Label>Generated Bio</Label>
                <p className="mt-2 p-4 bg-muted rounded-md">{generatedBio}</p>
              </div>
            )}
            <Button type="submit" className="w-full" disabled={isLoadingLocation}>
              Complete Registration
            </Button>
          </form>
        </CardContent>
      </Card>

      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Profile Details</DialogTitle>
            <DialogDescription>
              Please review your profile details. Once confirmed, some information like your date of birth cannot be
              changed.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <p>
              <strong>Name:</strong> {formData.name}
            </p>
            <p>
              <strong>Date of Birth:</strong> {formData.dateOfBirth}
            </p>
            <p>
              <strong>Age:</strong> {age}
            </p>
            <p>
              <strong>Gender:</strong> {formData.genderType}
            </p>
            <p>
              <strong>Looking For:</strong> {formData.lookingFor.join(", ")}
            </p>
            <p>
              <strong>Location:</strong> {formData.location}
            </p>
            <p>
              <strong>Interests:</strong> {formData.interests.join(", ")}
            </p>
            <p>
              <strong>Favorite Activities:</strong> {formData.favoriteActivities.join(", ")}
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirmSubmit}>Confirm and Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
