'use client'

import { usePathname } from 'next/navigation'
import Sidebar from './Sidebar'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const noSidebarPaths = ['/login'] // Hide sidebar here

  const showSidebar = !noSidebarPaths.includes(pathname)

  return (
    <div className="flex min-h-screen">
      {showSidebar && <Sidebar />}
      <main className="flex-1 bg-black text-white p-8">{children}</main>
    </div>
  )
}
