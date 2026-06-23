import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.savedCollege.deleteMany()
  await prisma.college.deleteMany()

  const colleges = [
    { name: 'IIT Bombay', location: 'Mumbai', state: 'Maharashtra', type: 'Government', fees: 228000, rating: 4.8, ranking: 1, avgPackage: 1800000, overview: 'Premier IIT located in the financial capital of India.' },
    { name: 'IIT Delhi', location: 'New Delhi', state: 'Delhi', type: 'Government', fees: 200000, rating: 4.7, ranking: 2, avgPackage: 1700000, overview: 'Top IIT located in the capital of India.' },
    { name: 'BITS Pilani', location: 'Pilani', state: 'Rajasthan', type: 'Private', fees: 500000, rating: 4.5, ranking: 3, avgPackage: 1200000, overview: 'Premier private engineering institute.' },
    { name: 'VIT Vellore', location: 'Vellore', state: 'Tamil Nadu', type: 'Private', fees: 198000, rating: 4.2, ranking: 4, avgPackage: 800000, overview: 'One of the largest private universities in India.' },
    { name: 'NIT Trichy', location: 'Tiruchirappalli', state: 'Tamil Nadu', type: 'Government', fees: 149250, rating: 4.4, ranking: 5, avgPackage: 950000, overview: 'Top NIT known for excellent placements.' },
    { name: 'SRM Institute', location: 'Chennai', state: 'Tamil Nadu', type: 'Private', fees: 260000, rating: 3.6, ranking: 6, avgPackage: 650000, overview: 'Large private engineering college.' },
    { name: 'PSG College of Technology', location: 'Coimbatore', state: 'Tamil Nadu', type: 'Private', fees: 87000, rating: 4.5, ranking: 7, avgPackage: 750000, overview: 'Top private engineering college in Coimbatore.' },
    { name: 'IIT Madras', location: 'Chennai', state: 'Tamil Nadu', type: 'Government', fees: 200000, rating: 4.8, ranking: 8, avgPackage: 2000000, overview: 'Consistently ranked as the top engineering institute in India.' },
    { name: 'College of Engineering Anna University', location: 'Chennai', state: 'Tamil Nadu', type: 'Government', fees: 50000, rating: 4.2, ranking: 9, avgPackage: 900000, overview: 'Top government engineering college in Chennai.' },
    { name: 'SASTRA University', location: 'Thanjavur', state: 'Tamil Nadu', type: 'Private', fees: 167000, rating: 4.0, ranking: 10, avgPackage: 584500, overview: 'Leading private university in Tamil Nadu.' },
    { name: 'College of Engineering Pune', location: 'Pune', state: 'Maharashtra', type: 'Government', fees: 40500, rating: 4.3, ranking: 11, avgPackage: 900000, overview: 'One of the oldest engineering colleges in Asia.' },
    { name: 'VJTI Mumbai', location: 'Mumbai', state: 'Maharashtra', type: 'Government', fees: 84051, rating: 4.0, ranking: 12, avgPackage: 750000, overview: 'Premier government engineering college in Mumbai.' },
    { name: 'Visvesvaraya NIT Nagpur', location: 'Nagpur', state: 'Maharashtra', type: 'Government', fees: 149200, rating: 4.0, ranking: 13, avgPackage: 800000, overview: 'Top NIT in Maharashtra.' },
    { name: 'MIT World Peace University', location: 'Pune', state: 'Maharashtra', type: 'Private', fees: 310000, rating: 4.0, ranking: 14, avgPackage: 700000, overview: 'Leading private university in Pune.' },
    { name: 'Amity University Mumbai', location: 'Mumbai', state: 'Maharashtra', type: 'Private', fees: 222000, rating: 4.0, ranking: 15, avgPackage: 600000, overview: 'Large private university with diverse programs.' },
    { name: 'Delhi Technological University', location: 'New Delhi', state: 'Delhi', type: 'Government', fees: 150000, rating: 4.2, ranking: 16, avgPackage: 900000, overview: 'Premier engineering university in Delhi.' },
    { name: 'Netaji Subhas University of Technology', location: 'New Delhi', state: 'Delhi', type: 'Government', fees: 120000, rating: 4.0, ranking: 17, avgPackage: 800000, overview: 'Top government engineering college in Delhi.' },
    { name: 'Jamia Millia Islamia', location: 'New Delhi', state: 'Delhi', type: 'Government', fees: 50000, rating: 4.0, ranking: 18, avgPackage: 700000, overview: 'Central university with strong engineering programs.' },
    { name: 'IIT Kharagpur', location: 'Kharagpur', state: 'West Bengal', type: 'Government', fees: 200000, rating: 4.6, ranking: 19, avgPackage: 1600000, overview: 'The oldest and largest IIT in India.' },
    { name: 'Jadavpur University', location: 'Kolkata', state: 'West Bengal', type: 'Government', fees: 30000, rating: 4.3, ranking: 20, avgPackage: 800000, overview: 'Top government university in West Bengal.' },
    { name: 'IIT Kanpur', location: 'Kanpur', state: 'Uttar Pradesh', type: 'Government', fees: 200000, rating: 4.6, ranking: 21, avgPackage: 1600000, overview: 'Top IIT known for research and innovation.' },
    { name: 'Amity University Noida', location: 'Noida', state: 'Uttar Pradesh', type: 'Private', fees: 311000, rating: 4.1, ranking: 22, avgPackage: 700000, overview: 'Large private university with diverse programs.' },
    { name: 'Aligarh Muslim University', location: 'Aligarh', state: 'Uttar Pradesh', type: 'Government', fees: 269445, rating: 4.2, ranking: 23, avgPackage: 800000, overview: 'Historic central university with strong engineering programs.' },
    { name: 'IIT Roorkee', location: 'Roorkee', state: 'Uttarakhand', type: 'Government', fees: 200000, rating: 4.5, ranking: 24, avgPackage: 1500000, overview: 'One of the oldest technical institutes in Asia.' },
    { name: 'IIT Hyderabad', location: 'Hyderabad', state: 'Telangana', type: 'Government', fees: 200000, rating: 4.4, ranking: 25, avgPackage: 1400000, overview: 'Young IIT with strong research programs.' },
    { name: 'JNTU Hyderabad', location: 'Hyderabad', state: 'Telangana', type: 'Government', fees: 90000, rating: 4.0, ranking: 26, avgPackage: 700000, overview: 'Top state university in Telangana.' },
    { name: 'RV College of Engineering', location: 'Bangalore', state: 'Karnataka', type: 'Private', fees: 180000, rating: 4.3, ranking: 27, avgPackage: 900000, overview: 'Top private engineering college in Bangalore.' },
    { name: 'PES University', location: 'Bangalore', state: 'Karnataka', type: 'Private', fees: 350000, rating: 4.2, ranking: 28, avgPackage: 1000000, overview: 'Premier private university in Bangalore.' },
    { name: 'NIT Surathkal', location: 'Mangalore', state: 'Karnataka', type: 'Government', fees: 149250, rating: 4.3, ranking: 29, avgPackage: 900000, overview: 'Top NIT in Karnataka with excellent placements.' },
    { name: 'Manipal Institute of Technology', location: 'Manipal', state: 'Karnataka', type: 'Private', fees: 420000, rating: 4.2, ranking: 30, avgPackage: 800000, overview: 'Premier private technical institute in Karnataka.' },
    { name: 'Malaviya NIT Jaipur', location: 'Jaipur', state: 'Rajasthan', type: 'Government', fees: 149250, rating: 4.1, ranking: 31, avgPackage: 800000, overview: 'Top NIT in Rajasthan.' },
    { name: 'IIT Gandhinagar', location: 'Gandhinagar', state: 'Gujarat', type: 'Government', fees: 200000, rating: 4.4, ranking: 32, avgPackage: 1400000, overview: 'Young IIT with innovative programs.' },
    { name: 'Nirma University', location: 'Ahmedabad', state: 'Gujarat', type: 'Private', fees: 250000, rating: 4.1, ranking: 33, avgPackage: 700000, overview: 'Leading private university in Gujarat.' },
    { name: 'IIT Bhubaneswar', location: 'Bhubaneswar', state: 'Odisha', type: 'Government', fees: 200000, rating: 4.3, ranking: 34, avgPackage: 1300000, overview: 'IIT located in the temple city of India.' },
    { name: 'NIT Rourkela', location: 'Rourkela', state: 'Odisha', type: 'Government', fees: 149250, rating: 4.2, ranking: 35, avgPackage: 850000, overview: 'Top NIT in Odisha.' },
  ]

  for (const college of colleges) {
    await prisma.college.create({ data: college })
  }

  console.log(`Seeded ${colleges.length} colleges!`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())