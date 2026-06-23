'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function SaveButton({ collegeId }: { collegeId: string }) {
  const { data: session } = useSession()
  const router = useRouter()
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSave = async () => {
    if (!session) {
      router.push('/login')
      return
    }

    setLoading(true)
    const res = await fetch('/api/saved', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ collegeId }),
    })
    const data = await res.json()
    setSaved(data.saved)
    setLoading(false)
  }

  return (
    <button
      onClick={handleSave}
      disabled={loading}
      className={`px-6 py-2 rounded-lg transition border ${saved ? 'bg-green-50 border-green-600 text-green-600' : 'border-blue-600 text-blue-600 hover:bg-blue-50'}`}
    >
      {loading ? 'Saving...' : saved ? 'Saved!' : 'Save College'}
    </button>
  )
}