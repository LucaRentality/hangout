import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verify } from "jsonwebtoken"
import { getUserById } from "./lib/db"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  try {
    const decoded = verify(token, JWT_SECRET) as { id: string; role: string }
    const user = await getUserById(decoded.id)

    if (!user) {
      throw new Error("User not found")
    }

    const isAdminRoute = request.nextUrl.pathname.startsWith("/admin")

    if (isAdminRoute && user.role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }

    return NextResponse.next()
  } catch (error) {
    return NextResponse.redirect(new URL("/login", request.url))
  }
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
}
