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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

interface ReportUserModalProps {
  reportedUserId: string
  reportedUserName: string
}

export function ReportUserModal({ reportedUserId, reportedUserName }: ReportUserModalProps) {
  const [reason, setReason] = useState<string>("")
  const [details, setDetails] = useState<string>("")
  const { toast } = useToast()

  const handleSubmit = async () => {
    if (!reason) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select a reason for reporting.",
      })
      return
    }

    try {
      const response = await fetch("/api/report-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reportedUserId,
          reason,
          details,
        }),
      })

      if (response.ok) {
        toast({
          title: "Report Submitted",
          description: "Thank you for your report. We will review it shortly.",
        })
      } else {
        throw new Error("Failed to submit report")
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit report. Please try again later.",
      })
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Report User</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Report {reportedUserName}</DialogTitle>
          <DialogDescription>
            Please provide details about why you're reporting this user. We take all reports seriously and will review
            them promptly.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <RadioGroup value={reason} onValueChange={setReason}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="inappropriate_content" id="inappropriate_content" />
              <Label htmlFor="inappropriate_content">Inappropriate Content</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="harassment" id="harassment" />
              <Label htmlFor="harassment">Harassment</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="spam" id="spam" />
              <Label htmlFor="spam">Spam</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="other" id="other" />
              <Label htmlFor="other">Other</Label>
            </div>
          </RadioGroup>
          <div className="grid gap-2">
            <Label htmlFor="details">Additional Details</Label>
            <Textarea
              id="details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Please provide any additional information about the incident."
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Submit Report
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
