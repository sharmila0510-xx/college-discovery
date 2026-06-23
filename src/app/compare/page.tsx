import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function ComparePage({
  searchParams,
}: {
  searchParams: Promise<{ college1?: string; college2?: string }>
}) {
  const { college1, college2 } = await searchParams

  const allColleges = await prisma.college.findMany({
    orderBy: { ranking: 'asc' },
  })

  const c1 = college1 ? allColleges.find((c) => c.id === college1) : null
  const c2 = college2 ? allColleges.find((c) => c.id === college2) : null

  const fields = [
    { label: 'Location', key: 'location' },
    { label: 'State', key: 'state' },
    { label: 'Type', key: 'type' },
    { label: 'Fees/year', key: 'fees', format: (v: number) => `₹${(v / 100000).toFixed(1)}L` },
    { label: 'Rating', key: 'rating', format: (v: number) => `⭐ ${v}` },
    { label: 'Ranking', key: 'ranking', format: (v: number) => `#${v}` },
    { label: 'Avg Package', key: 'avgPackage', format: (v: number) => `₹${(v / 100000).toFixed(1)}L` },
  ]

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
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Compare Colleges</h1>

        {/* College Selectors */}
        <form className="grid grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">College 1</label>
            <select
              name="college1"
              defaultValue={college1 || ''}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a college</option>
              {allColleges.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">College 2</label>
            <select
              name="college2"
              defaultValue={college2 || ''}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a college</option>
              {allColleges.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div className="col-span-2 text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-8 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Compare
            </button>
          </div>
        </form>

        {/* Comparison Table */}
        {c1 && c2 && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-blue-50">
                  <th className="text-left px-6 py-4 text-gray-600 font-medium w-1/3">Feature</th>
                  <th className="text-center px-6 py-4 text-blue-600 font-bold">{c1.name}</th>
                  <th className="text-center px-6 py-4 text-purple-600 font-bold">{c2.name}</th>
                </tr>
              </thead>
              <tbody>
                {fields.map((field, index) => {
                  const val1 = c1[field.key as keyof typeof c1]
                  const val2 = c2[field.key as keyof typeof c2]
                  return (
                    <tr key={field.key} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-6 py-4 text-gray-600 font-medium">{field.label}</td>
                      <td className="px-6 py-4 text-center text-gray-800">
                        {field.format && typeof val1 === 'number' ? field.format(val1) : String(val1 ?? '-')}
                      </td>
                      <td className="px-6 py-4 text-center text-gray-800">
                        {field.format && typeof val2 === 'number' ? field.format(val2) : String(val2 ?? '-')}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        {(!c1 || !c2) && (
          <div className="text-center py-20 text-gray-400">
            Select two colleges above to compare them side by side!
          </div>
        )}
      </div>
    </div>
  )
}