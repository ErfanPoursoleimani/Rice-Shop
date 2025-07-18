import { useEffect, useState } from 'react';
import { useDataStore } from '@/stores/dataStore';

export const useStoreWithHydration = <T,>(
    selector: (state: any) => T,
    defaultValue?: T
) => {
    const [isHydrated, setIsHydrated] = useState(false);
    const storeValue = useDataStore(selector);

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    // Return default value during SSR or before hydration
    if (!isHydrated && defaultValue !== undefined) {
        return defaultValue;
    }

    return storeValue;
};