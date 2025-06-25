import { NextResponse } from "next/server"
import { type AppConfig, updateAppConfig } from "@/app/config"

export async function POST(request: Request) {
  const newConfig: AppConfig = await request.json()

  // Here you would typically validate the admin's session/permissions

  try {
    updateAppConfig(newConfig)
    return NextResponse.json({ message: "State updated successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update state" }, { status: 500 })
  }
}
