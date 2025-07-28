'use client'
import { useAuthStore } from '@/stores/authStore';
import { useDataStore } from '@/stores/dataStore';

export const useManualReinit = () => {
  const authRefresh = useAuthStore(state => state.refreshSession);
  const dataInit = useDataStore(state => state.initializeStore);
  const dataReset = useDataStore(state => state.reset);
  const lang = useAuthStore(state => state.lang);

  const reinitializeAfterLogin = async () => {
    try {
      // Refresh auth session to get latest user/cart data
      await authRefresh(lang);
      
      // Get fresh auth state
      const { userId, cartId, isAuthenticated } = useAuthStore.getState();
      
      // Reinitialize data store with new auth state
      await dataInit(lang, isAuthenticated, cartId);
      
      console.log('Stores reinitialized after login');
    } catch (error) {
      console.error('Failed to reinitialize stores:', error);
    }
  };

  const reinitializeAfterLogout = async () => {
    try {
      // Reset data store first
      dataReset();
      
      // Reinitialize with no auth
      await dataInit(lang, false, null);
      
      console.log('Stores reinitialized after logout');
    } catch (error) {
      console.error('Failed to reinitialize stores after logout:', error);
    }
  };

  return {
    reinitializeAfterLogin,
    reinitializeAfterLogout
  };
};