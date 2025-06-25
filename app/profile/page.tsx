"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ProfilePhotoGallery } from "@/app/components/ProfilePhotoGallery"
import { PersonalityBadge } from "@/app/components/PersonalityBadge"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: "",
    age: 0,
    bio: "",
    personalityType: "",
    photos: [],
    interests: [],
    favoriteActivities: [],
  })
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const userProfile = localStorage.getItem("userProfile")
    if (userProfile) {
      setProfile(JSON.parse(userProfile))
    } else {
      router.push("/")
    }
  }, [router])

  const handleSave = () => {
    setIsEditing(false)
    localStorage.setItem("userProfile", JSON.stringify(profile))
    // In a real app, you'd send the updated profile to your backend here
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    })
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Your Profile</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Profile Information</span>
            {isEditing ? (
              <Button onClick={handleSave}>Save</Button>
            ) : (
              <Button onClick={() => setIsEditing(true)}>Edit</Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ProfilePhotoGallery
            initialPhotos={profile.photos}
            onPhotosChange={(photos) => setProfile({ ...profile, photos })}
          />
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              disabled={!isEditing}
            />
          </div>
          <div>
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              value={profile.age}
              onChange={(e) => setProfile({ ...profile, age: Number(e.target.value) })}
              disabled={!isEditing}
            />
          </div>
          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              disabled={!isEditing}
            />
          </div>
          <div>
            <Label>Personality Type</Label>
            <PersonalityBadge type={profile.personalityType} />
          </div>
          <div>
            <Label>Interests</Label>
            <div className="flex flex-wrap gap-2">
              {profile.interests.map((interest, index) => (
                <span key={index} className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-sm">
                  {interest}
                </span>
              ))}
            </div>
          </div>
          <div>
            <Label>Favorite Activities</Label>
            <div className="flex flex-wrap gap-2">
              {profile.favoriteActivities.map((activity, index) => (
                <span key={index} className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-sm">
                  {activity}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
