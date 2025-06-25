import type { PersonalityType } from "../types/personality"

// Compatibility matrix for MBTI types
const compatibilityMatrix: Record<PersonalityType, PersonalityType[]> = {
  ISTJ: ["ESTJ", "INTJ", "ISTP", "ISFJ"],
  ISFJ: ["ESFJ", "ISFP", "ISTJ", "INFJ"],
  INFJ: ["ENFJ", "INFP", "ISFJ", "INTJ"],
  INTJ: ["ENTJ", "INTP", "INFJ", "ISTJ"],
  ISTP: ["ESTP", "ISFP", "ISTJ", "INTP"],
  ISFP: ["ESFP", "ISTP", "ISFJ", "INFP"],
  INFP: ["ENFP", "INFJ", "ISFP", "INTP"],
  INTP: ["ENTP", "INTJ", "INFP", "ISTP"],
  ESTP: ["ISTP", "ESFP", "ESTJ", "ENTP"],
  ESFP: ["ISFP", "ESTP", "ESFJ", "ENFP"],
  ENFP: ["INFP", "ENFJ", "ESFP", "ENTP"],
  ENTP: ["INTP", "ENFP", "ESTP", "ENTJ"],
  ESTJ: ["ISTJ", "ENTJ", "ESTP", "ESFJ"],
  ESFJ: ["ISFJ", "ENFJ", "ESFP", "ESTJ"],
  ENFJ: ["INFJ", "ENFP", "ESFJ", "ENTJ"],
  ENTJ: ["INTJ", "ENTP", "ENFJ", "ESTJ"],
}

function calculateSharedItems(items1: string[], items2: string[]): number {
  const set1 = new Set(items1)
  const set2 = new Set(items2)
  const sharedItems = new Set([...set1].filter((x) => set2.has(x)))
  return sharedItems.size
}

// Function to calculate compatibility score
export function calculateCompatibilityScore(user1: User, user2: User): number {
  let score = 0

  // Personality type compatibility (existing logic)
  if (user1.personalityType === user2.personalityType) {
    score += 1
  } else if (compatibilityMatrix[user1.personalityType].includes(user2.personalityType)) {
    score += 0.8
  } else {
    const similarity = user1.personalityType
      .split("")
      .filter((char, index) => char === user2.personalityType[index]).length
    score += similarity / 4
  }

  // Shared interests
  const sharedInterests = calculateSharedItems(user1.interests, user2.interests)
  score += sharedInterests * 0.1 // 0.1 points for each shared interest

  // Shared favorite activities
  const sharedActivities = calculateSharedItems(user1.favoriteActivities, user2.favoriteActivities)
  score += sharedActivities * 0.15 // 0.15 points for each shared activity

  // Normalize the score to be between 0 and 1
  return Math.min(score, 1)
}

// Matching algorithm
export function findMatches(user: User, potentialMatches: User[]): User[] {
  const compatibleMatches = potentialMatches
    .map((match) => ({
      ...match,
      compatibilityScore: calculateCompatibilityScore(user, match),
    }))
    .filter(
      (match) =>
        match.compatibilityScore >= 0.5 && // Minimum compatibility threshold
        user.genderInterest.includes(match.gender) && // Gender preference
        match.genderInterest.includes(user.gender) && // Mutual gender preference
        user.lookingFor.some((interest) => match.lookingFor.includes(interest)) && // Shared relationship goals
        match.distance <= user.distance, // Within user's maximum distance
    )
    .sort((a, b) => b.compatibilityScore - a.compatibilityScore)

  return compatibleMatches
}

// Types
export interface User {
  id: string
  name: string
  avatar: string
  personalityType: PersonalityType
  gender: string
  genderInterest: string[]
  lookingFor: string[]
  distance: number
  interests: string[]
  favoriteActivities: string[]
}
