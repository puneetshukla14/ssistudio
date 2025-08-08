'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function useAuth() {
  const router = useRouter()

  useEffect(() => {
    const token = document.cookie.includes('auth_token') // or whatever your auth check is

    if (!token) {
      router.replace('/login') // Redirect if not logged in
    }
  }, [router])
}
