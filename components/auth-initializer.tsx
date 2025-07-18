'use client'
import { useAuthStore } from '@/stores/authStore';
import { useEffect, useState } from 'react';

export function AuthInitializer({ children, lang = 'en' }: { children: React.ReactNode, lang: string }) {
  const [isHydrated, setIsHydrated] = useState(false);
  const initialize = useAuthStore((state) => state.initialize)
  
  useEffect( () => {
    const hydrate = async () => {
      // Hydrate persisted state first
      useAuthStore.persist.rehydrate()
      
      // Then initialize auth
      await initialize(lang)
        
      setIsHydrated(true);
    };

    hydrate();
  }, [initialize, lang])



  if (!isHydrated) {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
    );
  }

  return <>{children}</>
}