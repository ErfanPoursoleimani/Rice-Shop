'use client'
import { useRouter, useSearchParams } from 'next/navigation'

export const useReturnUrl = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const getReturnUrl = () => {
    return searchParams.get('returnUrl') || '/'
  }
  
  const redirectToLogin = (lang: string, currentPath?: string) => {
    const path = currentPath || window.location.pathname + window.location.search
    router.push(`/${lang}/users/login?returnUrl=${encodeURIComponent(path)}`)
  }
  
  const redirectToReturnUrl = () => {
    const returnUrl = getReturnUrl()
    router.push(decodeURI(returnUrl))
  }
  
  return {
    getReturnUrl,
    redirectToLogin,
    redirectToReturnUrl,
  }
}