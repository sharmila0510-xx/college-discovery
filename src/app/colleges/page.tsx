import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function CollegesPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; type?: string; state?: string }>
}) {
  const params = await searchParams
  const search = params.search?.trim() || undefined
  const type = params.type?.trim() || undefined
  const state = params.state?.trim() || undefined

  const colleges = await prisma.college.findMany({
    where: {
      AND: [
        search ? { name: { contains: search, mode: 'insensitive' } } : {},
        type ? { type } : {},
        state ? { state: { contains: state, mode: 'insensitive' } } : {},
      ],
    },
    orderBy: { ranking: 'asc' },
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <Link href="/" className="text-xl font-bold text-blue-700">CollegeDiscover</Link>
        <div className="flex gap-4 text-sm">
          <Link href="/login" className="text-gray-600 hover:text-blue-600 font-medium">Login</Link>
          <Link href="/signup" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Sign Up</Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Explore Colleges</h1>

        {/* Search & Filters */}
        <form method="GET" className="flex flex-wrap gap-4 mb-8">
          <input
            type="text"
            name="search"
            defaultValue={search}
            placeholder="Search colleges..."
            className="flex-1 min-w-[200px] border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 text-gray-800"
          />
          <select
            name="type"
            defaultValue={type}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
          >
            <option value="">All Types</option>
            <option value="Government">Government</option>
            <option value="Private">Private</option>
          </select>
          <input
            type="text"
            name="state"
            defaultValue={state}
            placeholder="Filter by state..."
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 text-gray-800"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Search
          </button>
        </form>

        {/* College Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {colleges.map((college: any) => (
            <Link href={`/colleges/${college.id}`} key={college.id}>
              <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition cursor-pointer border border-gray-100">
                <div className="flex justify-between items-start mb-3">
                  <h2 className="text-lg font-bold text-gray-800">{college.name}</h2>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    college.type === 'Government'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-orange-100 text-orange-800'
                  }`}>
                    {college.type}
                  </span>
                </div>
                <p className="text-gray-500 text-sm mb-3">📍 {college.location}, {college.state}</p>
                <div className="flex justify-between text-sm">
                  <span className="text-yellow-600 font-medium">★ {college.rating}</span>
                  <span className="text-gray-600">₹{(college.fees / 100000).toFixed(1)}L/yr</span>
                  {college.ranking && <span className="text-blue-600 font-medium">#{college.ranking}</span>}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {colleges.length === 0 && (
          <div className="text-center py-20 text-gray-500">No colleges found. Try a different search!</div>
        )}
      </div>
    </div>
  )
}