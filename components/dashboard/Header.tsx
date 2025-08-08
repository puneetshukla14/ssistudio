'use client'

import { Bell, Mail, Search } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

export default function DashboardHeader() {
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="w-full backdrop-blur-xl bg-black/40 border border-white/10 px-6 py-4 flex items-center justify-between rounded-2xl shadow-md">
      
      {/* Search */}
      <div className="flex items-center w-full max-w-md bg-black/50 rounded-lg px-4 py-2 border border-white/20 focus-within:ring-2 focus-within:ring-white/30">
        <Search className="h-4 w-4 text-white/70" />
        <input
          type="text"
          placeholder="Search anything..."
          className="ml-3 bg-transparent text-white placeholder-white/40 focus:outline-none w-full"
        />
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4 ml-6 relative">
        {/* Notification */}
        <button className="relative p-2 rounded-full bg-black/50 hover:bg-white/10 transition duration-200">
          <Bell className="h-5 w-5 text-white" />
          <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500" />
        </button>

        {/* Messages */}
        <button className="p-2 rounded-full bg-black/50 hover:bg-white/10 transition duration-200">
          <Mail className="h-5 w-5 text-white" />
        </button>

        {/* Avatar */}
        <div
          className="w-10 h-10 rounded-full overflow-hidden border border-white/20 cursor-pointer hover:ring-2 hover:ring-white/20 transition duration-200"
          onClick={() => setShowDropdown((prev) => !prev)}
        >
          <Image
            src="/profile.jpg" // Replace with your real image path
            alt="Profile"
            width={40}
            height={40}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Dropdown */}
        {showDropdown && (
          <div
            ref={dropdownRef}
            className="absolute top-14 right-0 w-48 bg-black/80 backdrop-blur-md border border-white/20 rounded-xl shadow-2xl py-2 z-50 animate-fade-in"
          >
            <button className="w-full text-left text-sm px-4 py-2 text-white hover:bg-white/10 transition">
              My Profile
            </button>
            <button className="w-full text-left text-sm px-4 py-2 text-white hover:bg-white/10 transition">
              Settings
            </button>
            <button className="w-full text-left text-sm px-4 py-2 text-red-400 hover:bg-red-500/20 transition">
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
