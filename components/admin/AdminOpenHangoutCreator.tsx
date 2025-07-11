// This file was previously at app/components/admin/AdminOpenHangoutCreator.tsx
"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import type { HangoutType } from "@/app/types/hangout" // Updated import path
import { useToast } from "@/components/ui/use-toast" // Import path is already correct

// Mock users data (in a real app, this would come from an API)
const mockUsers = [
  { id: "1", name: "Alice Johnson" },
  { id: "2", name: "Bob Smith" },
  { id: "3", name: "Charlie Brown" },
]

export function AdminOpenHangoutCreator() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [type, setType] = useState<HangoutType>("Coffee")
  const [location, setLocation] = useState("")
  const [dateTime, setDateTime] = useState("")
  const [maxParticipants, setMaxParticipants] = useState("")
  const [inviteAll, setInviteAll] = useState(false)
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // In a real app, you would send this data to your API
    const hangoutData = {
      title,
      description,
      type,
      location,
      dateTime,
      maxParticipants: Number.parseInt(maxParticipants),
      isOpenEvent: true,
      createdBy: "admin",
      invitedUsers: inviteAll ? "all" : selectedUsers,
    }

    console.log("Creating open hangout:", hangoutData)

    // Simulating an API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Open Hangout Created",
      description: "The open hangout has been successfully created and invitations sent.",
    })

    // Reset form
    setTitle("")
    setDescription("")
    setType("Coffee")
    setLocation("")
    setDateTime("")
    setMaxParticipants("")
    setInviteAll(false)
    setSelectedUsers([])
  }

  const handleUserSelect = (userId: string) => {
    setSelectedUsers((prev) => (prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Open Hangout</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="type">Type</Label>
            <Select value={type} onValueChange={(value) => setType(value as HangoutType)}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Coffee">Coffee</SelectItem>
                <SelectItem value="Restaurant">Restaurant</SelectItem>
                <SelectItem value="Museum">Museum</SelectItem>
                <SelectItem value="Theater">Theater</SelectItem>
                <SelectItem value="Concert">Concert</SelectItem>
                <SelectItem value="Sport">Sport</SelectItem>
              </SelectContent>
            </Select>
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
          <div>
            <Label htmlFor="maxParticipants">Max Participants</Label>
            <Input
              id="maxParticipants"
              type="number"
              value={maxParticipants}
              onChange={(e) => setMaxParticipants(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Invite Users</Label>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="inviteAll"
                checked={inviteAll}
                onCheckedChange={(checked) => setInviteAll(checked as boolean)}
              />
              <Label htmlFor="inviteAll">Invite All Users</Label>
            </div>
            {!inviteAll && (
              <div className="grid grid-cols-2 gap-2">
                {mockUsers.map((user) => (
                  <div key={user.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`user-${user.id}`}
                      checked={selectedUsers.includes(user.id)}
                      onCheckedChange={() => handleUserSelect(user.id)}
                    />
                    <Label htmlFor={`user-${user.id}`}>{user.name}</Label>
                  </div>
                ))}
              </div>
            )}
          </div>
          <Button type="submit">Create Open Hangout</Button>
        </form>
      </CardContent>
    </Card>
  )
}
