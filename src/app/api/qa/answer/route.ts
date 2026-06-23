import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const session = await getServerSession()

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Not logged in' }, { status: 401 })
  }

  const { questionId, body } = await req.json()

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  })

  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  const answer = await prisma.answer.create({
    data: {
      body,
      questionId,
      userId: user.id,
    },
    include: {
      user: { select: { name: true } },
    },
  })

  return NextResponse.json(answer)
}