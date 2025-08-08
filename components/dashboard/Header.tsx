'use client'

import { Bell, Mail, User, Search } from 'lucide-react'
import { useState, useEffect } from 'react'
import clsx from 'clsx'

export default function DashboardHeader() {
  const [isHovered, setIsHovered] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>

    if (isHovered) {
      setIsExpanded(true)
    } else {
      timeout = setTimeout(() => setIsExpanded(false), 300) // wait for fade-out
    }

    return () => clearTimeout(timeout)
  }, [isHovered])

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={clsx(
        'group relative z-10 mx-auto mt-6 flex items-center justify-center overflow-hidden rounded-full border border-white/10 backdrop-blur-2xl bg-gradient-to-br from-white/5 via-white/10 to-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.3)]',
        'transition-all duration-500 ease-in-out',
        'min-w-[176px]', // consistent base width (w-44)
        isExpanded ? 'max-w-[640px] px-5 py-2' : 'max-w-[176px] px-3 py-1'
      )}
      style={{ transitionProperty: 'max-width, padding' }}
    >
      {/* Glow Layer */}
      <div className="absolute inset-0 pointer-events-none before:content-[''] before:absolute before:inset-0 before:rounded-full before:bg-white/10 before:blur-lg before:opacity-30 transition-all duration-500" />

      <div className="flex items-center justify-between w-full">
        {/* Search */}
        <div
          className={clsx(
            'flex-1 mr-4 transition-opacity duration-300',
            isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
          )}
        >
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-1.5 text-sm text-white placeholder-white/50 bg-white/5 border border-white/10 rounded-full backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-300"
          />
        </div>

        {/* Icons */}
        <div
          className={clsx(
            'flex items-center gap-2 transition-opacity duration-300',
            isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
          )}
        >
          <button className="p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition duration-200">
            <Mail className="w-4 h-4 text-white" />
          </button>
          <button className="p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition duration-200">
            <Bell className="w-4 h-4 text-white" />
          </button>
          <div className="w-9 h-9 rounded-full bg-white/10 border border-white/20 ring-1 ring-white/10 backdrop-blur-sm" />
        </div>

        {/* Mini Icons */}
        <div
          className={clsx(
            'absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 transition-opacity duration-300',
            isHovered ? 'opacity-0 pointer-events-none' : 'opacity-100'
          )}
        >
          <Search className="w-4 h-4 text-white/70" />
          <Bell className="w-4 h-4 text-white/70" />
          <User className="w-4 h-4 text-white/70" />
        </div>
      </div>
    </div>
  )
}
