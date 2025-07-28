'use client'
import { useAuthStore } from '@/stores/authStore';
import { useEffect, useState, useRef, useCallback } from 'react';

export function AuthInitializer({ 
  children, 
  lang = 'en' 
}: { 
  children: React.ReactNode; 
  lang: string; 
}) {
  const [hasHydrated, setHasHydrated] = useState(false);
  const initRef = useRef(false);
  
  // Use stable selectors with useCallback to prevent re-renders
  const initialize = useAuthStore(useCallback((state) => state.initialize, []));
  const isInitialized = useAuthStore(useCallback((state) => state.isInitialized, []));
  const isLoading = useAuthStore(useCallback((state) => state.isLoading, []));

  // Handle hydration only once
  useEffect(() => {
    setHasHydrated(true);
  }, []);

  // Initialize store when hydrated and on language changes
  useEffect(() => {
    if (hasHydrated && !initRef.current) {
      initRef.current = true;
      const init = async () => {
        try {
          await initialize(lang);
        } catch (error) {
          console.error('Auth initialization failed:', error);
        } finally {
          initRef.current = false; // Allow reinitialization
        }
      };
      init();
    }
  }, [hasHydrated, initialize, lang]); // Removed isInitialized to allow reinit

  // Show loading state during hydration or initialization
  if (!hasHydrated || (!isInitialized && isLoading)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return <>{children}</>;
}