'use client'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, isInitializing } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isInitializing && !isLoggedIn) router.replace('/login')
  }, [isInitializing, isLoggedIn, router])

  if (isInitializing) return null 
  if (!isLoggedIn) return null    
  return <>{children}</>
}