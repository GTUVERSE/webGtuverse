"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ProtectedRoute } from "@/components/protected-route"
import { useAuth } from "@/lib/auth-context"
import { usersAPI } from "@/lib/api-service"
import Link from "next/link"

type Room = {
  id: number;
  name: string;
  size: number;
  capacity: number;
}

export default function ProfilePage() {
  const { user } = useAuth()
  const [userRooms, setUserRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserRooms = async () => {
      if (!user) return
      
      try {
        setLoading(true)
        const rooms = await usersAPI.getUserRooms(user.id)
        setUserRooms(rooms)
      } catch (error) {
        console.error("Error fetching user rooms:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserRooms()
  }, [user])

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col bg-black text-purple-50">
        <Navbar />

        <div className="flex flex-1">
          <Sidebar />

          <main className="flex-1 p-4 md:p-6 overflow-y-auto bg-gradient-to-b from-black to-zinc-900">
            <div className="max-w-4xl mx-auto space-y-8">
              {/* Profile Header */}
              <div className="bg-zinc-900/50 rounded-lg border border-purple-900/30 p-6">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  <Avatar className="h-24 w-24 ring-4 ring-purple-600">
                    <AvatarImage src="/placeholder.svg" alt={user?.username} />
                    <AvatarFallback className="bg-purple-900 text-2xl">
                      {user?.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 text-center md:text-left">
                    <h1 className="text-2xl font-bold text-purple-100">{user?.username}</h1>
                    <p className="text-purple-300">{user?.email}</p>
                    
                    <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
                      <Button variant="outline" className="border-purple-700 text-purple-300 hover:bg-purple-900/30">
                        Edit Profile
                      </Button>
                      <Link href="/create-club">
                        <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                          Create New Club
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* User's Clubs */}
              <div>
                <h2 className="text-xl font-bold mb-4 text-purple-100">My Clubs</h2>
                
                {loading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {[...Array(3)].map((_, index) => (
                      <Card key={index} className="bg-zinc-900/50 border-purple-900/30 animate-pulse">
                        <CardContent className="p-4">
                          <div className="h-5 w-24 bg-zinc-800/50 rounded mb-2"></div>
                          <div className="h-4 w-16 bg-zinc-800/50 rounded"></div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : userRooms.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {userRooms.map((room) => (
                      <Link href={`/club/${room.id}`} key={room.id}>
                        <Card className="bg-zinc-900/50 border-purple-900/30 hover:bg-zinc-800/70 transition-colors cursor-pointer">
                          <CardContent className="p-4">
                            <h3 className="font-medium text-purple-100">{room.name}</h3>
                            <p className="text-sm text-purple-300">Members: {room.size}/{room.capacity}</p>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="bg-zinc-900/50 rounded-lg p-8 text-center">
                    <p className="text-purple-300 mb-4">You haven't joined any clubs yet.</p>
                    <Link href="/">
                      <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                        Explore Clubs
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}