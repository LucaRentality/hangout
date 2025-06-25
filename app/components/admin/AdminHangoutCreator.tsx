"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Vendor } from "../../types/hangout"
import { useToast } from "@/components/ui/use-toast"

// Mock vendors data (in a real app, this would come from an API)
const mockVendors: Vendor[] = [
  { id: "1", name: "Cafe Delight", type: "Coffee", location: "123 Main St" },
  { id: "2", name: "Pizzeria Uno", type: "Restaurant", location: "456 Elm St" },
  { id: "3", name: "City Museum", type: "Museum", location: "789 Oak Ave" },
]

export function AdminHangoutCreator() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [dateTime, setDateTime] = useState("")
  const [selectedVendor, setSelectedVendor] = useState<string>("")
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // In a real app, you would send this data to your API
    const hangoutData = {
      title,
      description,
      dateTime,
      vendorId: selectedVendor,
      createdBy: "admin",
    }

    console.log("Creating vendor hangout:", hangoutData)

    // Simulating an API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Hangout Created",
      description: "The vendor hangout has been successfully created.",
    })

    // Reset form
    setTitle("")
    setDescription("")
    setDateTime("")
    setSelectedVendor("")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Vendor Hangout</CardTitle>
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
            <Label htmlFor="vendor">Vendor</Label>
            <Select value={selectedVendor} onValueChange={setSelectedVendor}>
              <SelectTrigger>
                <SelectValue placeholder="Select vendor" />
              </SelectTrigger>
              <SelectContent>
                {mockVendors.map((vendor) => (
                  <SelectItem key={vendor.id} value={vendor.id}>
                    {vendor.name} - {vendor.type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
