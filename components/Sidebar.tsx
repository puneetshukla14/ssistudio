'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import {
  HiOutlineHome,
  HiOutlinePlusCircle,
  HiOutlineTemplate,
  HiOutlinePhotograph,
  HiOutlineCog,
  HiOutlineChevronDown,
  HiOutlineChevronRight,
  HiOutlineLogout,
  HiOutlineMenuAlt3,
  HiOutlineX,
} from 'react-icons/hi'

import Logo from './Logo'

type MenuItem = {
  name: string
  icon: any
  path?: string
  children?: { name: string; path: string }[]
}

const menu: MenuItem[] = [
  {
    name: 'Dashboard',
    icon: HiOutlineHome,
    path: '/dashboard',
  },
  {
    name: 'New Poster',
    icon: HiOutlinePlusCircle,
    children: [
      { name: 'Public Upload', path: '/poster/new/public' },
      { name: 'Private Upload', path: '/poster/new/private' },
    ],
  },
  {
    name: 'Templates',
    icon: HiOutlineTemplate,
    path: '/templates',
  },
  {
    name: 'Logo Uploads',
    icon: HiOutlinePhotograph,
    path: '/uploads',
  },
  {
    name: 'Settings',
    icon: HiOutlineCog,
    children: [
      { name: 'Team', path: '/settings/team' },
      { name: 'Access', path: '/settings/access' },
    ],
  },
]

export default function Sidebar() {
  const router = useRouter()
  const pathname = usePathname()

  const [expanded, setExpanded] = useState<string[]>([])
  const [mobileOpen, setMobileOpen] = useState(false)

  const toggle = (name: string) => {
    setExpanded((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    )
  }

  const isParentActive = (item: MenuItem) => {
    if (item.path && pathname === item.path) return true
    if (item.children) return item.children.some((c) => pathname === c.path)
    return false
  }

  const isChildActive = (path: string) => pathname === path

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' })
    router.push('/login')
  }

  const SidebarContent = (
    <aside className="w-64 min-h-screen bg-[#0b0b0b] text-white flex flex-col justify-between border-r border-white/10">
      <div>
        <div className="p-5 bg-[#111111] border-b border-white/10 sticky top-0 z-20">
          <Logo />
        </div>

        <nav className="px-4 py-4">
          {menu.map((item) => {
            const Icon = item.icon
            const isOpen = expanded.includes(item.name)
            const active = isParentActive(item)

            return (
              <div key={item.name} className="mb-2">
                <button
                  onClick={() =>
                    item.children
                      ? toggle(item.name)
                      : (router.push(item.path || '/'), setMobileOpen(false))
                  }
                  className={`group flex items-center justify-between w-full px-3 py-2 rounded-md transition ${
                    active
                      ? 'bg-white text-black font-semibold'
                      : 'text-white/70 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={18} className="group-hover:scale-110 transition-transform" />
                    <span className="text-sm">{item.name}</span>
                  </div>
                  {item.children &&
                    (isOpen ? (
                      <HiOutlineChevronDown size={16} className="text-white/40" />
                    ) : (
                      <HiOutlineChevronRight size={16} className="text-white/40" />
                    ))}
                </button>

                {item.children && (
                  <div
                    className={`ml-5 mt-1 border-l border-white/10 pl-2 transition-all duration-300 ease-in-out ${
                      isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    {item.children.map((child) => (
                      <button
                        key={child.path}
                        onClick={() => {
                          router.push(child.path)
                          setMobileOpen(false)
                        }}
                        className={`block w-full text-left px-3 py-1.5 text-sm rounded-md transition-all ${
                          isChildActive(child.path)
                            ? 'bg-white text-black font-medium'
                            : 'text-white/50 hover:bg-white/10'
                        }`}
                      >
                        {child.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-white/10 bg-[#111111]">
        <div className="text-white/30 text-xs mb-3 text-center">SSISTUDIO v.1.08.25</div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition"
        >
          <HiOutlineLogout size={16} />
          Logout
        </button>
      </div>
    </aside>
  )

  return (
    <>
      {/* Mobile Toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 bg-[#111214]/80 rounded-md border border-gray-800 text-white backdrop-blur-sm hover:bg-[#1a1b1f] transition"
        >
          {mobileOpen ? <HiOutlineX size={20} /> : <HiOutlineMenuAlt3 size={20} />}
        </button>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block">{SidebarContent}</div>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 flex">
          <div className="w-64 bg-[#0e0f12]/90 backdrop-blur-md shadow-lg">
            {SidebarContent}
          </div>
          <div
            className="flex-1 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
        </div>
      )}
    </>
  )
}
