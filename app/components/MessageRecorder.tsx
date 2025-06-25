"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mic, Video, Send, X } from "lucide-react"
import { HangoutActivitySelector } from "./HangoutActivitySelector"
import { CustomHangoutForm } from "./CustomHangoutForm"
import type { HangoutActivity } from "../types/hangout"

type MediaType = "audio" | "video"

interface MessageRecorderProps {
  onClose: () => void
  matchId: string
}

export default function MessageRecorder({ onClose, matchId }: MessageRecorderProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [mediaType, setMediaType] = useState<MediaType | null>(null)
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null)
  const [timer, setTimer] = useState(0)
  const [showActivitySelector, setShowActivitySelector] = useState(false)
  const [showCustomForm, setShowCustomForm] = useState(false)
  const [selectedActivity, setSelectedActivity] = useState<HangoutActivity | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current)
      }
    }
  }, [])

  const startRecording = async (type: MediaType) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: type === "video",
      })
      streamRef.current = stream

      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder

      const chunks: BlobPart[] = []
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: type === "video" ? "video/webm" : "audio/webm" })
        setRecordedBlob(blob)
      }

      mediaRecorder.start()
      setIsRecording(true)
      setMediaType(type)
      startTimer()
    } catch (error) {
      console.error("Error accessing media devices:", error)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      streamRef.current?.getTracks().forEach((track) => track.stop())
      setIsRecording(false)
      stopTimer()
    }
  }

  const startTimer = () => {
    setTimer(0)
    timerIntervalRef.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer >= 20) {
          stopRecording()
          return 20
        }
        return prevTimer + 1
      })
    }, 1000)
  }

  const stopTimer = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current)
    }
  }

  const resetRecording = () => {
    setRecordedBlob(null)
    setMediaType(null)
    setTimer(0)
  }

  const sendMessage = () => {
    if (recordedBlob) {
      // Here you would typically upload the blob to your server
      console.log(`Sending ${mediaType} message to match ${matchId}:`, recordedBlob)
      // After sending, reset the recording and close the recorder
      resetRecording()
      onClose()
    }
  }

  const handleActivitySelect = (activity: HangoutActivity) => {
    setSelectedActivity(activity)
    setShowActivitySelector(false)
  }

  const handleCustomActivitySubmit = (activity: HangoutActivity) => {
    setSelectedActivity(activity)
    setShowCustomForm(false)
  }

  const sendHangoutInvitation = () => {
    if (selectedActivity) {
      // Here you would typically send the invitation to your server
      console.log(`Sending hangout invitation to match ${matchId}:`, selectedActivity)
      onClose()
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-4">
        {!isRecording && !recordedBlob && !showActivitySelector && !showCustomForm && !selectedActivity && (
          <div className="flex justify-center space-x-4">
            <Button onClick={() => startRecording("audio")} variant="outline">
              <Mic className="mr-2 h-4 w-4" />
              Record Audio
            </Button>
            <Button onClick={() => startRecording("video")} variant="outline">
              <Video className="mr-2 h-4 w-4" />
              Record Video
            </Button>
            <Button onClick={() => setShowActivitySelector(true)} variant="outline">
              Select Activity
            </Button>
            <Button onClick={() => setShowCustomForm(true)} variant="outline">
              Create Custom
            </Button>
          </div>
        )}
        {isRecording && (
          <div className="text-center">
            <p className="mb-2">Recording {mediaType}...</p>
            <p className="text-2xl font-bold mb-4">{timer}s</p>
            <Button onClick={stopRecording} variant="destructive">
              Stop Recording
            </Button>
          </div>
        )}
        {recordedBlob && (
          <div className="space-y-4">
            {mediaType === "video" ? (
              <video src={URL.createObjectURL(recordedBlob)} controls className="w-full" />
            ) : (
              <audio src={URL.createObjectURL(recordedBlob)} controls className="w-full" />
            )}
            <div className="flex justify-center space-x-4">
              <Button onClick={sendMessage} variant="default">
                <Send className="mr-2 h-4 w-4" />
                Send
              </Button>
              <Button onClick={resetRecording} variant="outline">
                <X className="mr-2 h-4 w-4" />
                Discard
              </Button>
            </div>
          </div>
        )}
        {showActivitySelector && <HangoutActivitySelector onSelect={handleActivitySelect} />}
        {showCustomForm && <CustomHangoutForm onSubmit={handleCustomActivitySubmit} />}
        {selectedActivity && (
          <div className="space-y-4">
            <h3 className="font-semibold">Selected Activity:</h3>
            <p>Type: {selectedActivity.type}</p>
            <p>Title: {selectedActivity.title}</p>
            <p>Description: {selectedActivity.description}</p>
            <p>Location: {selectedActivity.location}</p>
            <p>Date and Time: {new Date(selectedActivity.dateTime).toLocaleString()}</p>
            <Button onClick={sendHangoutInvitation} variant="default">
              <Send className="mr-2 h-4 w-4" />
              Send Hangout Invitation
            </Button>
          </div>
        )}
        <Button onClick={onClose} variant="ghost" className="mt-4 w-full">
          Cancel
        </Button>
      </CardContent>
    </Card>
  )
}
