"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { authAPI } from "./api-service"

type User = {
  id: number;
  username: string;
  email?: string;
  avatar?: string;
}

type AuthContextType = {
  user: User | null;
  login: (credentials: { username: string; password: string }) => Promise<void>;
  register: (credentials: { username: string; email: string; password: string }) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
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

  const login = async (credentials: { username: string; password: string }) => {
    setIsLoading(true)
    
    try {
      const response = await authAPI.login(credentials);
      
      // API'den dönen kullanıcı bilgilerini kullanın
      // Not: API yanıtınıza göre bu kısmı düzenleyin
      const userData = {
        id: response.user.id,
        username: response.user.username,
        email: response.user.email,
        avatar: `/placeholder.svg?height=40&width=40`,
      };
      
      setUser(userData);
      router.push("/");
    } catch (error) {
      console.error("Login error:", error);
      // Hata işleme kodunu buraya ekleyin
    } finally {
      setIsLoading(false);
    }
  }

  const register = async (credentials: { username: string; email: string; password: string }) => {
    setIsLoading(true)
    
    try {
      await authAPI.register(credentials);
      
      // Kayıt başarılı olduktan sonra otomatik giriş yapın
      await login({
        username: credentials.username,
        password: credentials.password
      });
    } catch (error) {
      console.error("Registration error:", error);
      // Hata işleme kodunu buraya ekleyin
    } finally {
      setIsLoading(false);
    }
  }

  const logout = () => {
    authAPI.logout();
    setUser(null);
    localStorage.removeItem("gtuverse-user");
    router.push("/login");
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