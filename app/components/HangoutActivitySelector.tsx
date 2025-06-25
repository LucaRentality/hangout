"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { HangoutType, HangoutActivity } from "../types/hangout"
import {
  Coffee,
  Utensils,
  Theater,
  Music,
  Building,
  GraduationCap,
  Gamepad2,
  Dumbbell,
  Plane,
  SpadeIcon as Spa,
  ShoppingBag,
} from "lucide-react"
import type React from "react" // Added import for React

interface HangoutActivitySelectorProps {
  onSelect: (activity: HangoutActivity) => void
}

const activityTypes: { type: HangoutType; icon: React.ReactNode; title: string }[] = [
  { type: "Restaurant", icon: <Utensils className="h-6 w-6" />, title: "Restaurant" },
  { type: "Coffee", icon: <Coffee className="h-6 w-6" />, title: "Coffee" },
  { type: "Theater", icon: <Theater className="h-6 w-6" />, title: "Theater" },
  { type: "Concert", icon: <Music className="h-6 w-6" />, title: "Concert" },
  { type: "Museum", icon: <Building className="h-6 w-6" />, title: "Museum" },
  { type: "Class", icon: <GraduationCap className="h-6 w-6" />, title: "Class" },
  { type: "Game", icon: <Gamepad2 className="h-6 w-6" />, title: "Game" },
  { type: "Sport", icon: <Dumbbell className="h-6 w-6" />, title: "Sport" },
  { type: "Travel", icon: <Plane className="h-6 w-6" />, title: "Travel" },
  { type: "SPA", icon: <Spa className="h-6 w-6" />, title: "SPA" },
  { type: "Shopping", icon: <ShoppingBag className="h-6 w-6" />, title: "Shopping" },
]

export function HangoutActivitySelector({ onSelect }: HangoutActivitySelectorProps) {
  const [selectedType, setSelectedType] = useState<HangoutType | null>(null)

  const handleSelect = (type: HangoutType) => {
    setSelectedType(type)
    const activity: HangoutActivity = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      title: `${type} Hangout`,
      description: `Enjoy a great ${type.toLowerCase()} experience`,
      location: "To be determined",
      dateTime: new Date().toISOString(),
      createdBy: "user",
    }
    onSelect(activity)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Select a Hangout Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          {activityTypes.map(({ type, icon, title }) => (
            <Button
              key={type}
              variant={selectedType === type ? "default" : "outline"}
              className="h-24 flex flex-col items-center justify-center"
              onClick={() => handleSelect(type)}
            >
              {icon}
              <span className="mt-2">{title}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
