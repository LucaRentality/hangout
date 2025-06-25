import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const { email } = await request.json()

  // Here you would typically save the email to your database
  console.log("Received email signup:", email)

  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return NextResponse.json({ message: "Email signup received" })
}
