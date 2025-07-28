'use client'
import { useEffect, useRef } from 'react';
import { useDataStore } from '../stores/dataStore';
import { useAuthStore } from '@/stores/authStore';

interface DataInitializerProps {
    children: React.ReactNode;
    lang?: string;
}

export const DataInitializer: React.FC<DataInitializerProps> = ({
    children,
    lang = 'en',
}) => {
    // Track previous auth state to detect changes
    const prevAuthRef = useRef<{
        userId: number | null;
        isAuthenticated: boolean;
        cartId: number | null;
    }>({
        userId: null,
        isAuthenticated: false,
        cartId: null
    });

    const hasInitializedRef = useRef(false);
    
    // Auth state selectors
    const authIsInitialized = useAuthStore((state) => state.isInitialized);
    const userId = useAuthStore((state) => state.userId);
    const cartId = useAuthStore((state) => state.cartId);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    
    // Data store selectors
    const initializeStore = useDataStore((state) => state.initializeStore);
    const dataLoading = useDataStore((state) => state.loading);
    const dataReset = useDataStore((state) => state.reset);

    // Main effect that handles initialization and reinitialization
    useEffect(() => {
        if (!authIsInitialized) return;

        const currentAuth = { userId, isAuthenticated, cartId };
        const prevAuth = prevAuthRef.current;

        // Detect if this is the first initialization or if auth state changed
        const isFirstInit = !hasInitializedRef.current;
        const authChanged = (
            prevAuth.userId !== currentAuth.userId ||
            prevAuth.isAuthenticated !== currentAuth.isAuthenticated ||
            prevAuth.cartId !== currentAuth.cartId
        );

        const shouldInitialize = isFirstInit || authChanged;

        if (shouldInitialize) {
            console.log('Initializing data store:', {
                reason: isFirstInit ? 'first-init' : 'auth-changed',
                prevAuth,
                currentAuth
            });

            const init = async () => {
                try {
                    // If user logged out, reset the store first
                    if (prevAuth.isAuthenticated && !currentAuth.isAuthenticated) {
                        console.log('User logged out, resetting data store');
                        dataReset();
                    }

                    // Initialize/reinitialize the store
                    await initializeStore(lang, isAuthenticated, cartId);
                    
                    // Update refs after successful initialization
                    prevAuthRef.current = currentAuth;
                    hasInitializedRef.current = true;
                    
                } catch (error) {
                    console.error('Data store initialization failed:', error);
                }
            };

            init();
        }
    }, [
        authIsInitialized,
        userId,
        isAuthenticated,
        cartId,
        initializeStore,
        dataReset,
        lang
    ]);

    return <>{children}</>;
};