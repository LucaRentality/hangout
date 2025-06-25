export type GenderType = "Female" | "Male" | "Couple" | "Other"
export type LookingFor = "Fun" | "Friends" | "Relation" | "Open"

export interface UserProfile {
  id: string
  name: string
  username: string
  email: string
  bio: string
  genderType: GenderType
  lookingFor: LookingFor[]
  interests: string[]
  favoriteActivities: string[]
  personalityType: string
  verificationStatus: "unverified" | "pending" | "verified"
  age: number
  location: string
  // Add other fields as necessary
}
