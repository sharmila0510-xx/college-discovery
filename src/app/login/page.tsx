import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">CollegeDiscover</h1>
        <div className="flex gap-4">
          <Link href="/login" className="text-gray-600 hover:text-blue-600 font-medium">Login</Link>
          <Link href="/signup" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Sign Up</Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="max-w-4xl mx-auto text-center py-20 px-4">
        <h2 className="text-5xl font-bold text-gray-800 mb-6">Find Your Dream College</h2>
        <p className="text-xl text-gray-500 mb-10">Search, compare and discover the best colleges across India</p>
        <Link href="/colleges" className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition">
          Explore Colleges
        </Link>
      </div>

      {/* Stats */}
      <div className="max-w-4xl mx-auto grid grid-cols-3 gap-6 px-4">
        <div className="bg-white rounded-xl p-6 text-center shadow-sm">
          <h3 className="text-3xl font-bold text-blue-600">500+</h3>
          <p className="text-gray-500 mt-1">Colleges</p>
        </div>
        <div className="bg-white rounded-xl p-6 text-center shadow-sm">
          <h3 className="text-3xl font-bold text-blue-600">50+</h3>
          <p className="text-gray-500 mt-1">Cities</p>
        </div>
        <div className="bg-white rounded-xl p-6 text-center shadow-sm">
          <h3 className="text-3xl font-bold text-blue-600">1000+</h3>
          <p className="text-gray-500 mt-1">Reviews</p>
        </div>
      </div>
    </div>
  )
}