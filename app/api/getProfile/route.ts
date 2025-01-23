import { NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import { prisma } from "@/lib/prisma"

export async function GET() {
  const currUser = await currentUser()

  if (!currUser) {
    return new Response('Unauthorized', { status: 401 })
  }

  const user = await prisma.user.findFirst({
    where: { email: currUser.emailAddresses[0].emailAddress },
    include: {
      videos: true
    }
  })

  return NextResponse.json({ user })
}