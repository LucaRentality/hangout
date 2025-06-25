"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/components/ui/use-toast"

interface UserReviewModalProps {
  reviewedUserId: string
  reviewedUserName: string
  onReviewSubmit: () => void
}

export function UserReviewModal({ reviewedUserId, reviewedUserName, onReviewSubmit }: UserReviewModalProps) {
  const [funFactor, setFunFactor] = useState<number>(0)
  const [sharedVibe, setSharedVibe] = useState<number>(0)
  const [respectAttitude, setRespectAttitude] = useState<number>(0)
  const [communication, setCommunication] = useState<number>(0)
  const { toast } = useToast()

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/submit-review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reviewedUserId,
          funFactor,
          sharedVibe,
          respectAttitude,
          communication,
        }),
      })

      if (response.ok) {
        toast({
          title: "Review Submitted",
          description: "Thank you for your feedback!",
        })
        onReviewSubmit()
      } else {
        throw new Error("Failed to submit review")
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit review. Please try again later.",
      })
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Review Hangout</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Review Hangout with {reviewedUserName}</DialogTitle>
          <DialogDescription>Please rate your experience on a scale of 0 to 5 for each factor.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="fun-factor">Fun Factor</Label>
            <Slider
              id="fun-factor"
              min={0}
              max={5}
              step={1}
              value={[funFactor]}
              onValueChange={(value) => setFunFactor(value[0])}
            />
            <span className="text-sm text-muted-foreground">{funFactor}</span>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="shared-vibe">Shared Vibe</Label>
            <Slider
              id="shared-vibe"
              min={0}
              max={5}
              step={1}
              value={[sharedVibe]}
              onValueChange={(value) => setSharedVibe(value[0])}
            />
            <span className="text-sm text-muted-foreground">{sharedVibe}</span>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="respect-attitude">Respect & Attitude</Label>
            <Slider
              id="respect-attitude"
              min={0}
              max={5}
              step={1}
              value={[respectAttitude]}
              onValueChange={(value) => setRespectAttitude(value[0])}
            />
            <span className="text-sm text-muted-foreground">{respectAttitude}</span>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="communication">Communication</Label>
            <Slider
              id="communication"
              min={0}
              max={5}
              step={1}
              value={[communication]}
              onValueChange={(value) => setCommunication(value[0])}
            />
            <span className="text-sm text-muted-foreground">{communication}</span>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Submit Review
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
