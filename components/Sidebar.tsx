'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Sidebar() {
  const pathname = usePathname()

  const navItems = [
    { label: 'Dashboard', href: '/dashboard' },
    // Add more later if needed
  ]

  return (
    <aside className="w-64 h-screen bg-[#121212] bg-opacity-80 backdrop-blur text-white p-6 border-r border-gray-800">
      <div className="text-2xl font-bold mb-8">SSI Studio</div>
      <nav className="flex flex-col gap-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`px-4 py-2 rounded ${
              pathname === item.href
                ? 'bg-white text-black font-semibold'
                : 'hover:bg-white/10'
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
