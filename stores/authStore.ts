'use client'
import axios from 'axios'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { devtools } from 'zustand/middleware'
import { User } from '@/types/types'

// Types

interface AuthState {
  // State
  userId: number | null
  user: User | null
  isLoading: boolean
  isInitialized: boolean
  isAuthenticated: boolean,
  error: string | null

  // Configurations
  lang: string
  
  // Actions
  initialize: (lang: string) => Promise<void>
  setUserId: (userId: number | null) => void
  setUser: (user: User | null) => void
  login: (credentials: LoginCredentials, lang: string) => Promise<void>
  logout: (lang: string) => Promise<void>
  refreshSession: (lang: string) => Promise<void>
  clearError: () => void
  reset: () => void
}

interface LoginCredentials {
  emailOrPhone: string
}

// API functions (can be moved to separate file)
const authApi = {
  getSession: async (lang: string): Promise<number | null> => {
    try {
      const response = await axios.get(`/${lang}/api/auth/session`)
      return response.data || null
    } catch (error) {
      console.error('Session fetch error:', error)
      return null
    }
  },

  login: async (credentials: LoginCredentials, lang: string): Promise<User> => {
    const locale = lang || 'en'
    const response = await axios.post(`/${locale}/api/auth/login`, credentials)
    return response.data
  },

  logout: async (lang: string): Promise<void> => {
    await axios.post(`/${lang}/api/auth/logout`)
  },

  getUser: async (userId: number, lang: string): Promise<User> => {
    const response = await axios.get(`/${lang}/api/users/${userId}`)
    return response.data
  }
}

// Initial state
const initialState = {
  userId: null,
  user: null,
  isLoading: false,
  isInitialized: false,
  isAuthenticated: false,
  lang: 'en',
  error: null,
}

// Create the store
export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      immer((set, get) => ({
        ...initialState,

        initialize: async (lang: string) => {
          const state = get()
          if (state.isInitialized) return

          set((state) => {
            state.isLoading = true
            state.error = null
            state.lang = lang
          })

          try {
            const userId = await authApi.getSession(lang)
            
            set((state) => {
              state.userId = userId
              state.isInitialized = true
              state.isLoading = false
            })

            // Fetch full user data
            if (userId) {
              try {
                const user = await authApi.getUser(userId, lang)
                set((state) => {
                  state.user = user,
                  state.isAuthenticated = true
                })
              } catch (error) {
                console.error('User fetch error:', error)
              }
            }
          } catch (error) {
            set((state) => {
              state.userId = null
              state.user = null
              state.error = error instanceof Error ? error.message : 'Failed to initialize auth'
              state.isLoading = false
              state.isInitialized = true
            })
          }
        },

        // Set user ID
        setUserId: (userId) => {
          set((state) => {
            state.userId = userId
            if (!userId) {
              state.user = null
            }
          })
        },

        // Set user data
        setUser: (user) => {
          set((state) => {
            state.user = user
            if (user) {
              state.userId = user.id
            }
          })
        },

        // Login action
        login: async (credentials, lang) => {
          set((state) => {
            state.isLoading = true
            state.error = null
          })

          try {
            const user = await authApi.login(credentials, lang)

            set((state) => {
              state.user = user
              state.userId = user.id
              state.isLoading = false
              state.error = null
            })
          } catch (error) {
            set((state) => {
              state.error = error instanceof Error ? error.message : 'Login failed'
              state.isLoading = false
            })
            throw error // Re-throw so components can handle it
          }
        },

        // Logout action
        logout: async (lang) => {
          set((state) => {
            state.isLoading = true
            state.error = null
          })

          try {
            await authApi.logout(lang)
          
            set((state) => {
              state.userId = null
              state.user = null
              state.isLoading = false,
              state.isAuthenticated = false,
              state.error = null
            })
          } catch (error) {
            set((state) => {
              state.error = error instanceof Error ? error.message : 'Logout failed'
              state.isLoading = false
            })
            // Still clear the local state even if API call fails
            set((state) => {
              state.userId = null
              state.user = null
            })
          }
        },

        // Refresh session
        refreshSession: async (lang) => {
          set((state) => {
            state.isLoading = true
            state.error = null
          })

          try {
            const userId = await authApi.getSession(lang)
            
            set((state) => {
              state.userId = userId
              state.isLoading = false
            })

            if (userId) {
              try {
                const user = await authApi.getUser(userId, lang)
                set((state) => {
                  state.user = user
                })
              } catch (error) {
                console.error('User refresh error:', error)
              }
            }
          } catch (error) {
            set((state) => {
              state.userId = null
              state.user = null
              state.error = error instanceof Error ? error.message : 'Session refresh failed'
              state.isLoading = false
            })
          }
        },

        // Clear error
        clearError: () => {
          set((state) => {
            state.error = null
          })
        },

        // Reset store to initial state
        reset: () => {
          set(() => ({ ...initialState }))
        },
      })),
      {
        name: 'auth-store',
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          userId: state.userId,
          user: state.user,
          isInitialized: state.isInitialized,
          lang: state.lang
        }),
      }
    ),
    {
      name: 'auth-store',
    }
  )
)

// Selectors for better performance
export const useAuthSelectors = {
  userId: () => useAuthStore((state) => state.userId),
  user: () => useAuthStore((state) => state.user),
  isAuthenticated: () => useAuthStore((state) => !!state.userId),
  isLoading: () => useAuthStore((state) => state.isLoading),
  isInitialized: () => useAuthStore((state) => state.isInitialized),
  error: () => useAuthStore((state) => state.error),
  
  // Combined selectors
  authStatus: () => useAuthStore((state) => ({
    isAuthenticated: !!state.userId,
    isLoading: state.isLoading,
    isInitialized: state.isInitialized,
    error: state.error,
  })),
}

// Auth actions (can be used without subscribing to state)
export const authActions = {
  initialize: (lang: string) => useAuthStore.getState().initialize(lang),
  login: (credentials: LoginCredentials, lang: string) => useAuthStore.getState().login(credentials, lang),
  logout: (lang: string) => useAuthStore.getState().logout(lang),
  refreshSession: (lang: string) => useAuthStore.getState().refreshSession(lang),
  clearError: () => useAuthStore.getState().clearError(),
  reset: () => useAuthStore.getState().reset(),
}

// Hook for auth actions (alternative to using authActions directly)
export const useAuthActions = () => {
  const store = useAuthStore()
  return {
    initialize: store.initialize,
    login: store.login,
    logout: store.logout,
    refreshSession: store.refreshSession,
    clearError: store.clearError,
    reset: store.reset,
  }
}