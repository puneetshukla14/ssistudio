'use client'

import { usePathname } from 'next/navigation'
import Sidebar from './Sidebar'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const noSidebarPaths = ['/login']
  const showSidebar = !noSidebarPaths.includes(pathname)

  // Check if login page
  const isLoginPage = pathname === '/login'

  return (
    <div className="flex min-h-screen">
      {showSidebar && <Sidebar />}
      <main
        className={`flex-1 text-white p-8 ${
          isLoginPage ? 'bg-transparent' : 'bg-black'
        }`}
      >
        {children}
      </main>
    </div>
  )
}
