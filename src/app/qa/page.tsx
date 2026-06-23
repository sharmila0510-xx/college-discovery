'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

interface Answer {
  id: string
  body: string
  createdAt: string
  user: { name: string | null }
}

interface Question {
  id: string
  title: string
  body: string | null
  tag: string | null
  createdAt: string
  user: { name: string | null }
  answers: Answer[]
}

export default function QAPage() {
  const searchParams = useSearchParams()
  const collegeId = searchParams.get('collegeId')

  const [questions, setQuestions] = useState<Question[]>([])
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [tag, setTag] = useState('')
  const [loading, setLoading] = useState(false)
  const [answerBody, setAnswerBody] = useState<Record<string, string>>({})

  useEffect(() => {
    fetch(`/api/qa${collegeId ? `?collegeId=${collegeId}` : ''}`)
      .then((res) => res.json())
      .then((data) => setQuestions(Array.isArray(data) ? data : []))
  }, [collegeId])

  const handleAskQuestion = async () => {
    if (!title) return
    setLoading(true)
    const res = await fetch('/api/qa', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, body, tag, collegeId }),
    })
    const data = await res.json()
    if (data.id) {
      setQuestions([data, ...questions])
      setTitle('')
      setBody('')
      setTag('')
    }
    setLoading(false)
  }

  const handleAnswer = async (questionId: string) => {
    const body = answerBody[questionId]
    if (!body) return
    const res = await fetch('/api/qa/answer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ questionId, body }),
    })
    const data = await res.json()
    if (data.id) {
      setQuestions(questions.map((q) =>
        q.id === questionId ? { ...q, answers: [...q.answers, data] } : q
      ))
      setAnswerBody({ ...answerBody, [questionId]: '' })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">CollegeDiscover</Link>
        <div className="flex gap-4">
          <Link href="/colleges" className="text-gray-600 hover:text-blue-600 font-medium">Colleges</Link>
          <Link href="/login" className="text-gray-600 hover:text-blue-600 font-medium">Login</Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Questions & Answers</h1>

        {/* Ask Question */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Ask a Question</h2>
          <input
            type="text"
            placeholder="Question title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="More details (optional)..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
          />
          <input
            type="text"
            placeholder="Tag (e.g. Admissions, Fees)..."
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAskQuestion}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? 'Posting...' : 'Post Question'}
          </button>
        </div>

        {/* Questions List */}
        <div className="space-y-6">
          {questions.length === 0 && (
            <div className="text-center py-12 text-gray-400">No questions yet — be the first to ask!</div>
          )}
          {questions.map((q) => (
            <div key={q.id} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-gray-800">{q.title}</h3>
                {q.tag && (
                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">{q.tag}</span>
                )}
              </div>
              {q.body && <p className="text-gray-600 text-sm mb-3">{q.body}</p>}
              <p className="text-gray-400 text-xs mb-4">Asked by {q.user?.name || 'Anonymous'}</p>

              {/* Answers */}
              {q.answers.length > 0 && (
                <div className="border-t pt-4 mb-4 space-y-3">
                  {q.answers.map((a) => (
                    <div key={a.id} className="bg-gray-50 rounded-lg p-3">
                      <p className="text-gray-700 text-sm">{a.body}</p>
                      <p className="text-gray-400 text-xs mt-1">— {a.user?.name || 'Anonymous'}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Answer Input */}
              <div className="flex gap-2 mt-3">
                <input
                  type="text"
                  placeholder="Write an answer..."
                  value={answerBody[q.id] || ''}
                  onChange={(e) => setAnswerBody({ ...answerBody, [q.id]: e.target.value })}
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => handleAnswer(q.id)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm transition"
                >
                  Answer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}