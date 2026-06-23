import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const collegeId = searchParams.get('collegeId')

  const questions = await prisma.question.findMany({
    where: collegeId ? { collegeId } : {},
    include: {
      user: { select: { name: true } },
      answers: {
        include: { user: { select: { name: true } } },
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json(questions)
}

export async function POST(req: Request) {
  const session = await getServerSession()

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Not logged in' }, { status: 401 })
  }

  const { title, body, tag, collegeId } = await req.json()

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  })

  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  const question = await prisma.question.create({
    data: {
      title,
      body,
      tag,
      collegeId: collegeId || null,
      userId: user.id,
    },
    include: {
      user: { select: { name: true } },
      answers: { include: { user: { select: { name: true } } } },
    },
  })

  return NextResponse.json(question)
}