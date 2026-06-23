import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const colleges = [
    {
      name: 'IIT Bombay',
      location: 'Mumbai',
      state: 'Maharashtra',
      type: 'Government',
      fees: 200000,
      rating: 4.8,
      ranking: 1,
      avgPackage: 1800000,
      overview: 'One of the premier engineering institutes in India.',
    },
    {
      name: 'IIT Delhi',
      location: 'New Delhi',
      state: 'Delhi',
      type: 'Government',
      fees: 200000,
      rating: 4.7,
      ranking: 2,
      avgPackage: 1700000,
      overview: 'Top engineering institute located in the capital of India.',
    },
    {
      name: 'BITS Pilani',
      location: 'Pilani',
      state: 'Rajasthan',
      type: 'Private',
      fees: 500000,
      rating: 4.5,
      ranking: 3,
      avgPackage: 1200000,
      overview: 'Premier private engineering institute with strong industry connections.',
    },
    {
      name: 'VIT Vellore',
      location: 'Vellore',
      state: 'Tamil Nadu',
      type: 'Private',
      fees: 400000,
      rating: 4.2,
      ranking: 4,
      avgPackage: 800000,
      overview: 'One of the largest private universities in India.',
    },
    {
      name: 'NIT Trichy',
      location: 'Tiruchirappalli',
      state: 'Tamil Nadu',
      type: 'Government',
      fees: 150000,
      rating: 4.4,
      ranking: 5,
      avgPackage: 900000,
      overview: 'Top NIT known for excellent placements and academics.',
    },
    {
      name: 'SRM Institute',
      location: 'Chennai',
      state: 'Tamil Nadu',
      type: 'Private',
      fees: 350000,
      rating: 4.0,
      ranking: 6,
      avgPackage: 650000,
      overview: 'Large private university with good infrastructure.',
    },
  ]

  for (const college of colleges) {
    await prisma.college.create({ data: college })
  }

  console.log('✅ Seeded successfully!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())