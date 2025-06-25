"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { HangoutType, HangoutActivity } from "../types/hangout"

interface CustomHangoutFormProps {
  onSubmit: (activity: HangoutActivity) => void
}

export function CustomHangoutForm({ onSubmit }: CustomHangoutFormProps) {
  const [type, setType] = useState<HangoutType>("Restaurant")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState("")
  const [dateTime, setDateTime] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const activity: HangoutActivity = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      title,
      description,
      location,
      dateTime,
      createdBy: "user",
    }
    onSubmit(activity)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Custom Hangout</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="type">Type</Label>
            <Select value={type} onValueChange={(value) => setType(value as HangoutType)}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Restaurant">Restaurant</SelectItem>
                <SelectItem value="Coffee">Coffee</SelectItem>
                <SelectItem value="Theater">Theater</SelectItem>
                <SelectItem value="Concert">Concert</SelectItem>
                <SelectItem value="Museum">Museum</SelectItem>
                <SelectItem value="Class">Class</SelectItem>
                <SelectItem value="Game">Game</SelectItem>
                <SelectItem value="Sport">Sport</SelectItem>
                <SelectItem value="Travel">Travel</SelectItem>
                <SelectItem value="SPA">SPA</SelectItem>
                <SelectItem value="Shopping">Shopping</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="title">Title</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="location">Location</Label>
            <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="dateTime">Date and Time</Label>
            <Input
              id="dateTime"
              type="datetime-local"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              required
            />
          </div>
          <Button type="submit">Create Hangout</Button>
        </form>
      </CardContent>
    </Card>
  )
}
