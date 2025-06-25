import { NextResponse } from "next/server"
import { getUser, updateUser } from "@/app/lib/db"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const video = formData.get("video") as File
    const userId = formData.get("userId") as string
    const fullName = formData.get("fullName") as string
    const idNumber = formData.get("idNumber") as string

    if (!video || !userId || !fullName || !idNumber) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const user = getUser(userId)
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // In a real app, you would process and store the video file here
    // For this example, we'll just update the user's verification status
    user.verificationStatus = "pending"
    updateUser(user)

    // Create a new verification request
    const verificationRequest = {
      id: Date.now().toString(), // Use a proper UUID in production
      userId,
      fullName,
      idNumber,
      submissionDate: new Date().toISOString(),
      status: "pending",
    }

    // In a real app, you would save this request to a database
    console.log("New verification request:", verificationRequest)

    // In a real app, you would trigger a background job to process the video
    // and update the user's verification status once complete

    return NextResponse.json({ message: "Verification request received and pending review" })
  } catch (error) {
    console.error("Error processing verification request:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
