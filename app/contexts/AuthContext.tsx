'use client'
import axios from "axios"
import { createContext, useContext, useState, useEffect, ReactNode } from "react"

interface AuthContextType {
    userId: number | null,
/*     logout: () => void */
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    
    const [userId, setUserId] = useState(null)

    useEffect(() => {
        const fetchuserId = async () => {
            try {
                const userId = (await axios.get('/api/auth/session')).data
                setUserId(userId || null)
            } catch {
                setUserId(null)
            }
        }

        fetchuserId()
    }, [])

/*     const logout = async () => {
        await axios.get('/api/auth/logout')
        setUserId(null)
    } */
    
    return (
        <AuthContext.Provider value={{ userId/* , logout  */}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if(!context) throw new Error("useAuth must be used within an AuthProvider")
    return context
}
