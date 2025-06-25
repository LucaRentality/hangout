"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Stepper, Step, StepLabel, StepContent } from "@/components/ui/stepper"

interface VerificationProcessProps {
  userId: string
  onVerificationComplete: () => void
}

export function VerificationProcess({ userId, onVerificationComplete }: VerificationProcessProps) {
  const [activeStep, setActiveStep] = useState(0)
  const [isRecording, setIsRecording] = useState(false)
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null)
  const [idNumber, setIdNumber] = useState("")
  const [fullName, setFullName] = useState("")
  const videoRef = useRef<HTMLVideoElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const { toast } = useToast()

  const steps = [
    {
      label: "Personal Information",
      content: (
        <div className="space-y-4">
          <div>
            <Label htmlFor="fullName">Full Name (as it appears on your ID)</Label>
            <Input
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="John Doe"
            />
          </div>
          <div>
            <Label htmlFor="idNumber">ID Number</Label>
            <Input
              id="idNumber"
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
              placeholder="ID12345678"
            />
          </div>
        </div>
      ),
    },
    {
      label: "Record Verification Video",
      content: (
        <div className="space-y-4">
          <div className="aspect-video bg-muted">
            <video ref={videoRef} className="w-full h-full" autoPlay muted playsInline />
          </div>
          <div className="flex justify-between">
            {!isRecording && !videoBlob && <Button onClick={startRecording}>Start Recording</Button>}
            {isRecording && (
              <Button variant="destructive" onClick={stopRecording}>
                Stop Recording
              </Button>
            )}
            {videoBlob && <Button onClick={() => setVideoBlob(null)}>Re-record</Button>}
          </div>
          <div className="text-sm text-muted-foreground">
            Please record a short video of yourself holding your ID next to your face. Clearly state your name and
            today's date. The video will automatically stop after 15 seconds.
          </div>
        </div>
      ),
    },
    {
      label: "Review and Submit",
      content: (
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">Personal Information</h3>
            <p>Full Name: {fullName}</p>
            <p>ID Number: {idNumber}</p>
          </div>
          {videoBlob && (
            <div>
              <h3 className="font-semibold">Verification Video</h3>
              <video src={URL.createObjectURL(videoBlob)} controls className="w-full" />
            </div>
          )}
          <Button onClick={uploadVerification}>Submit for Verification</Button>
        </div>
      ),
    },
  ]

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      const chunks: BlobPart[] = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "video/webm" })
        setVideoBlob(blob)
        if (videoRef.current) {
          videoRef.current.src = URL.createObjectURL(blob)
        }
      }

      mediaRecorder.start()
      setIsRecording(true)

      // Stop recording after 15 seconds
      setTimeout(() => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
          mediaRecorderRef.current.stop()
          setIsRecording(false)
        }
      }, 15000)
    } catch (error) {
      console.error("Error accessing media devices:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Unable to access camera and microphone. Please check your permissions.",
      })
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  const uploadVerification = async () => {
    if (!videoBlob || !fullName || !idNumber) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please complete all steps before submitting.",
      })
      return
    }

    const formData = new FormData()
    formData.append("video", videoBlob, "verification.webm")
    formData.append("userId", userId)
    formData.append("fullName", fullName)
    formData.append("idNumber", idNumber)

    try {
      const response = await fetch("/api/verify", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Verification upload failed")
      }

      const result = await response.json()
      toast({
        title: "Verification Submitted",
        description: "Your verification has been submitted for review. We'll notify you once it's processed.",
      })
      onVerificationComplete()
    } catch (error) {
      console.error("Error uploading verification:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit verification. Please try again later.",
      })
    }
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Verify Your Account</CardTitle>
        <CardDescription>Complete the following steps to verify your account.</CardDescription>
      </CardHeader>
      <CardContent>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel>{step.label}</StepLabel>
              <StepContent>
                {step.content}
                <div className="mt-4">
                  <Button disabled={index === 0} onClick={handleBack} className="mr-2">
                    Back
                  </Button>
                  <Button variant="default" onClick={index === steps.length - 1 ? uploadVerification : handleNext}>
                    {index === steps.length - 1 ? "Finish" : "Continue"}
                  </Button>
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </CardContent>
    </Card>
  )
}
