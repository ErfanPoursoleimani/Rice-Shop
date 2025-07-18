// hooks/useHydration.ts
import { useEffect, useState } from 'react';
import { useDataStore } from '@/stores/dataStore';

export const useHydration = () => {
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        // Rehydrate the store on client-side
        useDataStore.persist.rehydrate();
        setIsHydrated(true);
    }, []);

    return { isHydrated };
};