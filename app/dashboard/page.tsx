'use client'

import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/logout', { method: 'POST' })
    router.push('/login') // Redirect to login after logout
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-3xl mb-6">Hello from SSI Studio Dashboard</h1>
      <button
        onClick={handleLogout}
        className="px-6 py-2 bg-white text-black rounded hover:bg-gray-300 transition"
      >
        Logout
      </button>
    </div>
  )
}
