"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { roomsAPI } from "@/lib/api-service"
import { useAuth } from "@/lib/auth-context"
import { ProtectedRoute } from "@/components/protected-route"

export default function CreateClubPage() {
  const [clubName, setClubName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { user } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!clubName.trim()) return
    
    try {
      setIsSubmitting(true)
      
      // Yeni oda oluştur
      const newRoom = await roomsAPI.create({ name: clubName })
      
      // Kullanıcıyı odaya ekle
      if (user) {
        await roomsAPI.addUser(newRoom.id, user.id)
      }
      
      // Yeni oda sayfasına yönlendir
      router.push(`/club/${newRoom.id}`)
    } catch (error) {
      console.error("Error creating club:", error)
      alert("Failed to create club. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col bg-black text-purple-50">
        <Navbar />

        <div className="flex flex-1">
          <Sidebar />

          <main className="flex-1 p-4 md:p-6 overflow-y-auto bg-gradient-to-b from-black to-zinc-900">
            <div className="max-w-2xl mx-auto">
              <div className="bg-zinc-900/50 rounded-lg border border-purple-900/30 p-6">
                <h1 className="text-2xl font-bold mb-6 text-purple-100">Create New Club</h1>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="clubName" className="text-purple-200">
                      Club Name
                    </Label>
                    <Input
                      id="clubName"
                      value={clubName}
                      onChange={(e) => setClubName(e.target.value)}
                      placeholder="Enter a name for your club"
                      className="bg-zinc-800 border-purple-900/50 text-purple-100 placeholder:text-purple-300/50"
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Creating..." : "Create Club"}
                  </Button>
                </form>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}