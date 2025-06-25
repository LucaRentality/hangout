export type PersonalityQuestion = {
  id: number
  text: string
  category: "E/I" | "S/N" | "T/F" | "J/P" // Extraversion/Introversion, Sensing/Intuition, Thinking/Feeling, Judging/Perceiving
}

export type PersonalityAnswer = {
  questionId: number
  score: number // 1-5 scale
}

export type PersonalityResult = {
  type: string // e.g., "INFJ"
  description: string
}
