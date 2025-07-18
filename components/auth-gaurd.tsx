'use client'
import { useAuthSelectors } from '@/stores/authStore'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface AuthGuardProps {
  children: React.ReactNode
  redirectTo?: string
  fallback?: React.ReactNode
}

export function AuthGuard({ 
  children, 
  redirectTo = '/login',
  fallback = <div>Loading...</div>
}: AuthGuardProps) {
  const { isAuthenticated, isInitialized } = useAuthSelectors.authStatus()
  const router = useRouter()

  useEffect(() => {
    if (isInitialized && !isAuthenticated) {
      router.push(redirectTo)
    }
  }, [isAuthenticated, isInitialized, redirectTo, router])

  if (!isInitialized) {
    return <>{fallback}</>
  }

  if (!isAuthenticated) {
    return <>{fallback}</>
  }

  return <>{children}</>
}