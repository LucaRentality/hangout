import { NextResponse } from "next/server"
import { authenticateUser } from "@/app/lib/db"
import { sign } from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function POST(request: Request) {
  const { username, password } = await request.json()

  const user = await authenticateUser(username, password)

  if (user) {
    const token = sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: "1h" })

    const response = NextResponse.json({ success: true, role: user.role })
    response.cookies.set("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" })

    return response
  } else {
    return NextResponse.json({ success: false }, { status: 401 })
  }
}
