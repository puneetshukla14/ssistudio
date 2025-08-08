'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Settings,
  ChevronDown,
  ChevronRight,
  LogOut,
  Menu,
  X,
} from 'lucide-react'
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
    icon: LayoutDashboard,
    path: '/dashboard',
  },
  {
    name: 'Settings',
    icon: Settings,
    children: [
      { name: 'Account', path: '/settings/account' },
      { name: 'Team', path: '/settings/team' },
      { name: 'Billing', path: '/settings/billing' },
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

  const SidebarContent = (
    <aside className="w-64 h-full bg-[#0c0c0c] text-white flex flex-col border-r border-white/10">
      {/* Logo Header */}
      <div className="p-5 border-b border-white/10 bg-[#111111] sticky top-0 z-10">
        <Logo />
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto custom-scroll">
        {menu.map((item) => {
          const Icon = item.icon
          const isOpen = expanded.includes(item.name)
          const active = isParentActive(item)

          return (
            <div key={item.name} className="mb-1">
              <button
                onClick={() =>
                  item.children
                    ? toggle(item.name)
                    : (router.push(item.path || '/'), setMobileOpen(false))
                }
                className={`flex items-center justify-between w-full px-3 py-2 rounded-md transition-all duration-150 group ${
                  active
                    ? 'bg-white text-black font-medium'
                    : 'text-white/70 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} className="group-hover:scale-110 transition-transform" />
                  <span className="text-sm">{item.name}</span>
                </div>
                {item.children &&
                  (isOpen ? (
                    <ChevronDown size={16} className="text-gray-400" />
                  ) : (
                    <ChevronRight size={16} className="text-gray-400" />
                  ))}
              </button>

              {item.children && (
                <div
                  className={`ml-4 pl-2 mt-1 overflow-hidden border-l border-white/10 transition-all duration-300 ease-in-out ${
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
                      className={`block w-full text-left px-3 py-1.5 text-sm rounded-md transition-all duration-150 ${
                        isChildActive(child.path)
                          ? 'bg-white text-black'
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

      {/* Footer */}
      <div className="p-4 border-t border-white/10 bg-[#111111]">
        <form action="/api/logout" method="POST">
          <button
            type="submit"
            className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition"
          >
            <LogOut size={16} />
            Logout
          </button>
        </form>
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
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
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

      {/* Scrollbar Styling */}
      <style jsx global>{`
        .custom-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.15);
          border-radius: 10px;
        }
      `}</style>
    </>
  )
}
