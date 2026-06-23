import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="border-b border-gray-200 px-6 py-3 flex justify-between items-center bg-white sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <h1 className="text-xl font-bold text-blue-700">CollegeDiscover</h1>
          <div className="hidden md:flex gap-6 text-sm text-gray-600">
            <Link href="/colleges" className="hover:text-blue-600">Colleges</Link>
            <Link href="/compare" className="hover:text-blue-600">Compare</Link>
            <Link href="/qa" className="hover:text-blue-600">Q&A</Link>
          </div>
        </div>
        <div className="flex gap-3 text-sm">
          <Link href="/login" className="border border-gray-300 px-4 py-2 rounded-md text-gray-700 hover:border-blue-500 hover:text-blue-600">Login</Link>
          <Link href="/signup" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Register</Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="bg-blue-700 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Find the Best College for You</h2>
          <p className="text-blue-100 text-lg mb-8">Search from 500+ colleges across India. Compare fees, rankings, placements and more.</p>
          <div className="flex gap-3 max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search colleges, courses, locations..."
              className="flex-1 px-4 py-3 rounded-md text-gray-800 focus:outline-none"
            />
            <Link href="/colleges" className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-medium transition">
              Search
            </Link>
          </div>
        </div>
      </div>

      {/* Study Goals */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Select Your Study Goal</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Engineering', count: '6424 Colleges', courses: ['BE/B.Tech', 'Diploma', 'ME/M.Tech'] },
            { label: 'Management', count: '8101 Colleges', courses: ['MBA/PGDM', 'BBA/BMS', 'Executive MBA'] },
            { label: 'Medical', count: '3200 Colleges', courses: ['MBBS', 'BDS', 'BAMS'] },
            { label: 'Arts', count: '5753 Colleges', courses: ['BA', 'MA', 'BFA'] },
          ].map((goal) => (
            <Link href="/colleges" key={goal.label}>
              <div className="border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-blue-300 transition cursor-pointer">
                <h4 className="text-lg font-bold text-gray-800 mb-1">{goal.label}</h4>
                <p className="text-sm text-gray-400 mb-3">{goal.count}</p>
                <div className="space-y-2">
                  {goal.courses.map((c) => (
                    <p key={c} className="text-sm text-gray-600 border-t border-gray-100 pt-2">{c}</p>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Explore Programs */}
      <div className="bg-gray-50 py-10 px-6">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Explore Programs</h3>
          <div className="flex flex-wrap gap-3">
            {['All', 'BE/B.Tech', 'MBA/PGDM', 'MBBS', 'BCA', 'B.Com', 'BA', 'BBA', 'M.Tech', 'MCA', 'B.Sc'].map((p, i) => (
              <Link href="/colleges" key={p}>
                <span className={`px-4 py-2 rounded-full text-sm border cursor-pointer transition ${i === 0 ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400 hover:text-blue-600'}`}>
                  {p}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-3 gap-6">
        {[
          { label: 'Colleges Listed', value: '500+' },
          { label: 'Cities Covered', value: '50+' },
          { label: 'Student Reviews', value: '1000+' },
        ].map((stat) => (
          <div key={stat.label} className="text-center border border-gray-100 rounded-xl p-6 shadow-sm">
            <p className="text-3xl font-bold text-blue-600">{stat.value}</p>
            <p className="text-gray-500 mt-1 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-6 text-center text-sm text-gray-400">
        CollegeDiscover © 2026 — Find your dream college
      </footer>
    </div>
  )
}