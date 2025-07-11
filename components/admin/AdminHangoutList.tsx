// This file was previously at app/components/admin/AdminHangoutList.tsx
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { HangoutActivity } from "@/app/types/hangout" // Updated import path
import { useToast } from "@/components/ui/use-toast" // Import path is already correct

export function AdminHangoutList() {
  const [hangouts, setHangouts] = useState<HangoutActivity[]>([])
  const { toast } = useToast()

  useEffect(() => {
    fetchHangouts()
  }, [])

  const fetchHangouts = async () => {
    // In a real app, you would fetch this data from your API
    // For now, we'll use mock data
    const mockHangouts: HangoutActivity[] = [
      {
        id: "1",
        type: "Coffee",
        title: "Morning Coffee Meetup",
        description: "Start your day with a friendly coffee meetup!",
        location: "Cafe Delight, 123 Main St",
        dateTime: "2023-06-15T09:00:00",
        createdBy: "admin",
        vendorId: "1",
      },
      {
        id: "2",
        type: "Museum",
        title: "Art Gallery Tour",
        description: "Explore modern art with a guided tour.",
        location: "City Museum, 789 Oak Ave",
        dateTime: "2023-06-20T14:00:00",
        createdBy: "admin",
        isOpenEvent: true,
        maxParticipants: 20,
        currentParticipants: 5,
      },
    ]

    setHangouts(mockHangouts)
  }

  const handleDelete = async (id: string) => {
    // In a real app, you would send a delete request to your API
    console.log("Deleting hangout:", id)

    // Simulating an API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setHangouts((prev) => prev.filter((hangout) => hangout.id !== id))

    toast({
      title: "Hangout Deleted",
      description: "The hangout has been successfully deleted.",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Hangouts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {hangouts.map((hangout) => (
            <Card key={hangout.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{hangout.title}</h3>
                    <p className="text-sm text-muted-foreground">{hangout.type}</p>
                    <p>{hangout.description}</p>
                    <p className="text-sm">{new Date(hangout.dateTime).toLocaleString()}</p>
                    <p className="text-sm">{hangout.location}</p>
                    {hangout.isOpenEvent && (
                      <p className="text-sm">
                        Participants: {hangout.currentParticipants} / {hangout.maxParticipants}
                      </p>
                    )}
                  </div>
                  <Button variant="destructive" onClick={() => handleDelete(hangout.id)}>
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
