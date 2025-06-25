import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route"

const prisma = new PrismaClient()

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const currentUser = await prisma.user.findUnique({
      where: { email: session.user?.email as string },
      include: { interests: true, favoriteActivities: true },
    })

    if (!currentUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const potentialMatches = await prisma.user.findMany({
      where: {
        NOT: { id: currentUser.id },
        personalityType: currentUser.personalityType,
      },
      include: { interests: true, favoriteActivities: true },
    })

    const matches = potentialMatches.map((match) => {
      const sharedInterests = match.interests.filter((interest) =>
        currentUser.interests.some((userInterest) => userInterest.name === interest.name),
      ).length

      const sharedActivities = match.favoriteActivities.filter((activity) =>
        currentUser.favoriteActivities.some((userActivity) => userActivity.name === activity.name),
      ).length

      const compatibilityScore =
        (sharedInterests + sharedActivities) / (currentUser.interests.length + currentUser.favoriteActivities.length)

      return {
        id: match.id,
        name: match.name,
        personalityType: match.personalityType,
        bio: match.bio,
        compatibilityScore,
      }
    })

    const sortedMatches = matches.sort((a, b) => b.compatibilityScore - a.compatibilityScore)

    return NextResponse.json(sortedMatches)
  } catch (error) {
    console.error("Error fetching matches:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
