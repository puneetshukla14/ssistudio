'use client'

import { Bell, Mail, User, Search } from 'lucide-react'
import { useState } from 'react'
import clsx from 'clsx'

export default function DashboardHeader() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={clsx(
        "relative z-10 mx-auto mt-6 flex items-center justify-between overflow-hidden rounded-full border border-white/10 backdrop-blur-2xl transition-all duration-500 ease-in-out shadow-[0_8px_32px_rgba(0,0,0,0.3)] bg-gradient-to-br from-white/5 via-white/10 to-white/5",
        isHovered ? "max-w-screen-sm px-5 py-2 w-full" : "w-44 px-3 py-1"
      )}
    >
      {/* Soft glow inside */}
      <div className="absolute inset-0 pointer-events-none before:content-[''] before:absolute before:inset-0 before:rounded-full before:bg-white/10 before:blur-lg before:opacity-30" />

      {/* Content */}
      <div className="flex items-center justify-between w-full relative z-10">
        {isHovered ? (
          <>
            {/* Expanded: Full Search + Icons */}
            <div className="flex-1 mr-4">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-4 py-1.5 text-sm text-white placeholder-white/50 bg-white/5 border border-white/10 rounded-full backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
              />
            </div>

            <div className="flex items-center gap-2">
              <button className="p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-all duration-200">
                <Mail className="w-4 h-4 text-white" />
              </button>
              <button className="p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-all duration-200">
                <Bell className="w-4 h-4 text-white" />
              </button>
              <div className="w-9 h-9 rounded-full bg-white/10 border border-white/20 ring-1 ring-white/10 backdrop-blur-sm" />
            </div>
          </>
        ) : (
          // Collapsed: Cute minimal icons
          <div className="flex items-center justify-center w-full gap-2">
            <Search className="w-4 h-4 text-white/70" />
            <Bell className="w-4 h-4 text-white/70" />
            <User className="w-4 h-4 text-white/70" />
          </div>
        )}
      </div>
    </div>
  )
}
