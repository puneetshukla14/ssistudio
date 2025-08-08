'use client'

import { Bell, Mail } from 'lucide-react'

export default function DashboardHeader() {
  return (
    <header className="mx-auto mt-4 max-w-screen-sm backdrop-blur-lg bg-white/5 border border-white/10 px-4 py-2 flex items-center justify-between rounded-full shadow-[0_4px_24px_rgba(255,255,255,0.05)] transition-all">
      
      {/* Search Bar */}
      <div className="flex-1 mr-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-1 bg-white/5 text-white placeholder-white/40 border border-white/10 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white/20 transition"
        />
      </div>

      {/* Icons and Profile */}
      <div className="flex items-center gap-2">
        <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition">
          <Bell className="h-4 w-4 text-white" />
        </button>

        <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition">
          <Mail className="h-4 w-4 text-white" />
        </button>

        <div className="w-8 h-8 rounded-full border border-white/20 bg-white/10 ring-1 ring-white/10" />
      </div>
    </header>
  )
}
