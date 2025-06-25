"use client"

import { useState, useRef, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Mic, Video, Send, X } from "lucide-react"
import { HangoutActivitySelector } from "../../components/HangoutActivitySelector"
import type { HangoutActivity } from "../../types/hangout"

interface Message {
  id: string
  sender: "user" | "match"
  type: "audio" | "video"
  content: string // URL to the audio/video file
  timestamp: number
}

export default function ChatPage() {
  const params = useParams()
  const matchId = params.id as string
  const [messages, setMessages] = useState<Message[]>([])
  const [isRecording, setIsRecording] = useState(false)
  const [recordingType, setRecordingType] = useState<"audio" | "video" | null>(null)
  const [showActivitySelector, setShowActivitySelector] = useState(false)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const [timer, setTimer] = useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  const startRecording = async (type: "audio" | "video") => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: type === "video",
      })
      streamRef.current = stream

      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      chunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: type === "video" ? "video/webm" : "audio/webm" })
        const url = URL.createObjectURL(blob)
        const newMessage: Message = {
          id: Date.now().toString(),
          sender: "user",
          type,
          content: url,
          timestamp: Date.now(),
        }
        setMessages((prev) => [...prev, newMessage])
      }

      mediaRecorder.start()
      setIsRecording(true)
      setRecordingType(type)
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
      setRecordingType(null)
      stopTimer()
    }
  }

  const startTimer = () => {
    setTimer(0)
    timerRef.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer >= 15) {
          stopRecording()
          return 15
        }
        return prevTimer + 1
      })
    }, 1000)
  }

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
  }

  const handleHangoutInvitation = (activity: HangoutActivity) => {
    // Here you would typically send the invitation to your backend
    console.log("Sending hangout invitation:", activity)
    setShowActivitySelector(false)
    // You might want to add some UI feedback here
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Match Name" />
              <AvatarFallback>MN</AvatarFallback>
            </Avatar>
            <span>Chat with Match</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96 overflow-y-auto mb-4 space-y-2">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`rounded-lg p-2 ${message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                >
                  {message.type === "audio" ? (
                    <audio src={message.content} controls className="max-w-full" />
                  ) : (
                    <video src={message.content} controls className="max-w-full h-40" />
                  )}
                </div>
              </div>
            ))}
          </div>
          {isRecording ? (
            <div className="flex items-center justify-between">
              <span>
                Recording {recordingType}... {timer}s
              </span>
              <Button onClick={stopRecording} variant="destructive">
                <X className="mr-2 h-4 w-4" /> Stop
              </Button>
            </div>
          ) : (
            <div className="flex justify-between">
              <Button onClick={() => startRecording("audio")}>
                <Mic className="mr-2 h-4 w-4" /> Record Audio
              </Button>
              <Button onClick={() => startRecording("video")}>
                <Video className="mr-2 h-4 w-4" /> Record Video
              </Button>
              <Button onClick={() => setShowActivitySelector(true)}>
                <Send className="mr-2 h-4 w-4" /> Invite to Hangout
              </Button>
            </div>
          )}
          {showActivitySelector && <HangoutActivitySelector onSelect={handleHangoutInvitation} />}
        </CardContent>
      </Card>
    </div>
  )
}
