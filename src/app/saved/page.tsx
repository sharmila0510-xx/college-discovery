'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface College {
  id: string
  name: string
  location: string
  state: string
  type: string
  fees: number
  rating: number
  ranking: number | null
}

interface SavedCollege {
  id: string
  college: College
}

export default function SavedPage() {
  const [saved, setSaved] = useState<SavedCollege[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/saved')
      .then((res) => res.json())
      .then((data) => {
        setSaved(Array.isArray(data) ? data : [])
        setLoading(false)
      })
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">CollegeDiscover</Link>
        <div className="flex gap-4">
          <Link href="/colleges" className="text-gray-600 hover:text-blue-600 font-medium">Colleges</Link>
          <Link href="/login" className="text-gray-600 hover:text-blue-600 font-medium">Login</Link>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Saved Colleges</h1>

        {loading && <p className="text-gray-500">Loading...</p>}

        {!loading && saved.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <p className="text-xl mb-4">No saved colleges yet!</p>
            <Link href="/colleges" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
              Explore Colleges
            </Link>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {saved.map(({ college }) => (
            <Link href={`/colleges/${college.id}`} key={college.id}>
              <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition border border-gray-100">
                <div className="flex justify-between items-start mb-3">
                  <h2 className="text-lg font-bold text-gray-800">{college.name}</h2>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${college.type === 'Government' ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'}`}>
                    {college.type}
                  </span>
                </div>
                <p className="text-gray-500 text-sm mb-3">📍 {college.location}, {college.state}</p>
                <div className="flex justify-between text-sm">
                  <span className="text-yellow-500 font-medium">⭐ {college.rating}</span>
                  <span className="text-gray-600">₹{(college.fees / 100000).toFixed(1)}L/yr</span>
                  {college.ranking && <span className="text-blue-600 font-medium">#{college.ranking}</span>}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}