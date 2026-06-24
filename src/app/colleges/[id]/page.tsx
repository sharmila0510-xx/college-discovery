import SaveButton from '@/components/SaveButton'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function CollegeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const college = await prisma.college.findUnique({
    where: { id },
    include: { courses: true },
  })

  if (!college) return notFound()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">CollegeDiscover</Link>
        <div className="flex gap-4">
          <Link href="/colleges" className="text-gray-600 hover:text-blue-600 font-medium">Colleges</Link>
          <Link href="/login" className="text-gray-600 hover:text-blue-600 font-medium">Login</Link>
          <Link href="/signup" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Sign Up</Link>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{college.name}</h1>
              <p className="text-gray-500">📍 {college.location}, {college.state}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${college.type === 'Government' ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'}`}>
              {college.type}
            </span>
          </div>
          <p className="text-gray-600 mb-6">{college.overview}</p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">⭐ {college.rating}</p>
              <p className="text-gray-500 text-sm mt-1">Rating</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-green-600">₹{(college.fees / 100000).toFixed(1)}L</p>
              <p className="text-gray-500 text-sm mt-1">Fees/year</p>
            </div>
            {college.ranking && (
              <div className="bg-purple-50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-purple-600">#{college.ranking}</p>
                <p className="text-gray-500 text-sm mt-1">Ranking</p>
              </div>
            )}
            {college.avgPackage && (
              <div className="bg-orange-50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-orange-600">₹{(college.avgPackage / 100000).toFixed(1)}L</p>
                <p className="text-gray-500 text-sm mt-1">Avg Package</p>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-6">
          <Link
            href={`/compare?college1=${college.id}`}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Compare College
          </Link>
          <SaveButton collegeId={college.id} />
        </div>

        {/* Courses */}
        {college.courses.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Courses Offered</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {college.courses.map((course: { id: string; name: string; duration: string; fees: number }) => (
                <div key={course.id} className="border border-gray-100 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800">{course.name}</h3>
                  <p className="text-gray-500 text-sm">Duration: {course.duration}</p>
                  <p className="text-blue-600 text-sm font-medium">₹{(course.fees / 100000).toFixed(1)}L/yr</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Q&A Section */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Questions & Answers</h2>
          <Link
            href={`/qa?collegeId=${college.id}`}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition inline-block"
          >
            Ask a Question
          </Link>
        </div>
      </div>
    </div>
  )
}
