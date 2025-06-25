"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { HangoutInvitation, HangoutActivity } from "../types/hangout"
import { CustomHangoutForm } from "./CustomHangoutForm"

interface HangoutInvitationHandlerProps {
  invitation: HangoutInvitation
  onAccept: () => void
  onDecline: () => void
  onCounterpropose: (activity: HangoutActivity) => void
}

export function HangoutInvitationHandler({
  invitation,
  onAccept,
  onDecline,
  onCounterpropose,
}: HangoutInvitationHandlerProps) {
  const [showCustomForm, setShowCustomForm] = useState(false)

  const handleCustomActivitySubmit = (activity: HangoutActivity) => {
    onCounterpropose(activity)
    setShowCustomForm(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hangout Invitation</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold">Proposed Activity:</h3>
          <p>Type: {invitation.activity.type}</p>
          <p>Title: {invitation.activity.title}</p>
          <p>Description: {invitation.activity.description}</p>
          <p>Location: {invitation.activity.location}</p>
          <p>Date and Time: {new Date(invitation.activity.dateTime).toLocaleString()}</p>
        </div>
        {!showCustomForm && (
          <div className="flex justify-between">
            <Button onClick={onAccept} variant="default">
              Accept
            </Button>
            <Button onClick={onDecline} variant="destructive">
              Decline
            </Button>
            <Button onClick={() => setShowCustomForm(true)} variant="outline">
              Propose Alternative
            </Button>
          </div>
        )}
        {showCustomForm && <CustomHangoutForm onSubmit={handleCustomActivitySubmit} />}
      </CardContent>
    </Card>
  )
}
