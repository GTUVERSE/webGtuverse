"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

type User = {
  id: string
  username: string
  email?: string
  avatar?: string
}

type AuthContextType = {
  user: User | null
  login: (credentials: { username: string; password: string }) => void
  register: (credentials: { username: string; email: string; password: string }) => void
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("gtuverse-user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  // Save user to localStorage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("gtuverse-user", JSON.stringify(user))
    }
  }, [user])

  const login = (credentials: { username: string; password: string }) => {
    // TEMPORARY LOGIN FUNCTIONALITY
    // -----------------------------------------
    // NOTE FOR BACKEND DEVELOPERS:
    // This is a temporary implementation for demonstration purposes.
    // Replace this with actual authentication API calls to the auth_service.h backend.
    // The backend should:
    // 1. Call validateCredentials() to check username/password
    // 2. Call generateToken() to create a JWT token
    // 3. Return user data and authentication token
    // 4. Handle error cases (invalid credentials, account locked, etc.)
    // -----------------------------------------

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      // Mock successful login
      const mockUser = {
        id: "user-" + Math.random().toString(36).substr(2, 9),
        username: credentials.username,
        avatar: `/placeholder.svg?height=40&width=40`,
      }

      setUser(mockUser)
      setIsLoading(false)
      router.push("/")
    }, 1000)
  }

  const register = (credentials: { username: string; email: string; password: string }) => {
    // TEMPORARY REGISTRATION FUNCTIONALITY
    // -----------------------------------------
    // NOTE FOR BACKEND DEVELOPERS:
    // This is a temporary implementation for demonstration purposes.
    // Replace this with actual registration API calls to the auth_service.h backend.
    // The backend should:
    // 1. Validate input data (username availability, email format, password strength)
    // 2. Create user in the database
    // 3. Call generateToken() to create a JWT token
    // 4. Return success/error response
    // -----------------------------------------

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      // Mock successful registration
      const mockUser = {
        id: "user-" + Math.random().toString(36).substr(2, 9),
        username: credentials.username,
        email: credentials.email,
        avatar: `/placeholder.svg?height=40&width=40`,
      }

      setUser(mockUser)
      setIsLoading(false)
      router.push("/")
    }, 1000)
  }

  const logout = () => {
    // TEMPORARY LOGOUT FUNCTIONALITY
    // -----------------------------------------
    // NOTE FOR BACKEND DEVELOPERS:
    // This is a temporary implementation for demonstration purposes.
    // Replace this with actual logout API calls to the auth_service.h backend.
    // The backend should:
    // 1. Call the logout() function to invalidate the user's token
    // 2. Clear cookies or other auth storage
    // -----------------------------------------

    setUser(null)
    localStorage.removeItem("gtuverse-user")
    router.push("/login")
  }

  return <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
