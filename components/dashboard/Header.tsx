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
      timeout = setTimeout(() => setIsExpanded(false), 300)
    }

    return () => clearTimeout(timeout)
  }, [isHovered])

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={clsx(
        'group relative z-10 mx-auto mt-6 flex items-center justify-center overflow-hidden rounded-full backdrop-blur-2xl',
        'transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]',
        'min-w-[176px]',
        isExpanded ? 'max-w-[640px] px-5 py-2 scale-[1.03]' : 'max-w-[176px] px-3 py-1 scale-[1]',
        'bg-gradient-to-br from-[#ffffff0b] via-[#ffffff14] to-[#ffffff0b]',
        'border border-white/10 shadow-[inset_0_1px_4px_rgba(255,255,255,0.1),_0_8px_32px_rgba(0,0,0,0.3)]'
      )}
      style={{
        transitionProperty: 'max-width, padding, transform',
        willChange: 'max-width, padding, transform',
      }}
    >
      {/* Inner Soft Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none before:content-[''] before:absolute before:inset-0 before:rounded-full before:bg-white/10 before:blur-2xl before:opacity-20" />

      <div className="flex items-center justify-between w-full relative z-10">
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

        {/* Mini Icons (Collapsed State) */}
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
