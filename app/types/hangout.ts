export type HangoutType =
  | "Restaurant"
  | "Coffee"
  | "Theater"
  | "Concert"
  | "Museum"
  | "Class"
  | "Game"
  | "Sport"
  | "Travel"
  | "SPA"
  | "Shopping"

export interface HangoutActivity {
  id: string
  type: HangoutType
  title: string
  description: string
  location: string
  dateTime: string
  createdBy: "platform" | "user" | "admin"
  creatorId?: string
  vendorId?: string
  isOpenEvent?: boolean
  maxParticipants?: number
  currentParticipants?: number
}
