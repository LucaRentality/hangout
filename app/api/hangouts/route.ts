import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route"

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { title, description, date, location, participantIds } = await req.json()

    const hangout = await prisma.hangout.create({
      data: {
        title,
        description,
        date,
        location,
        creator: { connect: { email: session.user?.email as string } },
        participants: {
          connect: participantIds.map((id: string) => ({ id })),
        },
      },
    })

    return NextResponse.json(hangout, { status: 201 })
  } catch (error) {
    console.error("Error creating hangout:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const hangouts = await prisma.hangout.findMany({
      where: {
        OR: [
          { creator: { email: session.user?.email as string } },
          { participants: { some: { email: session.user?.email as string } } },
        ],
      },
      include: {
        creator: { select: { id: true, name: true } },
        participants: { select: { id: true, name: true } },
      },
    })

    return NextResponse.json(hangouts)
  } catch (error) {
    console.error("Error fetching hangouts:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
