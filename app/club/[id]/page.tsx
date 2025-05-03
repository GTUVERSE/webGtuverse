"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { MessageSquare, Users, Share2, Heart, Volume2, Music } from "lucide-react"

type Club = {
  id: string
  title: string
  host: string
  attendees: string
  thumbnail: string
  genre: string
  description: string
  videoUrl?: string
}

export default function ClubPage() {
  const params = useParams()
  const clubId = params.id as string
  const [club, setClub] = useState<Club | null>(null)
  const [loading, setLoading] = useState(true)
  const [chatMessage, setChatMessage] = useState("")
  const videoRef = useRef<HTMLVideoElement>(null)

  // Mock chat messages
  const [chatMessages, setChatMessages] = useState([
    { id: 1, user: "AvatarDancer", message: "This club is amazing tonight!" },
    { id: 2, user: "VirtualVibes", message: "Love the music selection!" },
    { id: 3, user: "DigitalDJ", message: "Who's the DJ tonight?" },
    { id: 4, user: "MetaPartyGoer", message: "The avatar animations are so smooth!" },
  ])

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      // Mock data - in a real app, this would come from an API
      const mockClub: Club = {
        id: clubId,
        title: "Neon Lounge - Weekend Party",
        host: "DJ Virtual",
        attendees: "536",
        thumbnail: "/placeholder.svg?height=720&width=1280",
        genre: "Electronic",
        description:
          "Welcome to the Neon Lounge, the hottest virtual club in GTUVERSE! Tonight we're featuring real-time avatar motion mapping with our advanced motion detection technology. Watch as our professional dancers' movements are captured and applied to virtual avatars in real-time.",
        videoUrl: "https://example.com/placeholder-video.mp4", // This would be a real video URL in production
      }
      setClub(mockClub)
      setLoading(false)
    }, 1000)
  }, [clubId])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (chatMessage.trim()) {
      setChatMessages([
        ...chatMessages,
        {
          id: chatMessages.length + 1,
          user: "You",
          message: chatMessage,
        },
      ])
      setChatMessage("")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-black">
        <Navbar />
        <div className="flex flex-1 items-center justify-center">
          <div className="animate-pulse text-purple-300">Loading club...</div>
        </div>
      </div>
    )
  }

  if (!club) {
    return (
      <div className="min-h-screen flex flex-col bg-black">
        <Navbar />
        <div className="flex flex-1 items-center justify-center">
          <div className="text-purple-300">Club not found</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-black text-purple-50">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-4 p-4 bg-gradient-to-b from-black to-zinc-900">
          {/* Video Player */}
          <div className="lg:col-span-3 space-y-4">
            <div className="relative aspect-video bg-zinc-900 rounded-lg overflow-hidden">
              {/* This is where you would embed the avatar video */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <p className="text-purple-300 mb-4">Avatar video would be displayed here</p>
                  <div className="w-full h-full bg-gradient-to-r from-purple-900/30 via-pink-800/30 to-blue-900/30 absolute inset-0"></div>
                  <img
                    src={club.thumbnail || "/placeholder.svg"}
                    alt={club.title}
                    className="w-full h-full object-cover absolute inset-0 -z-10 opacity-50"
                  />
                </div>
              </div>
              <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                LIVE
              </div>
              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                <Users className="h-3 w-3" /> {club.attendees}
              </div>

              {/* Video controls overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                      <Volume2 className="h-5 w-5" />
                    </Button>
                    <div className="h-1 w-24 bg-white/30 rounded-full">
                      <div className="h-full w-1/2 bg-purple-500 rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 text-xs">
                      HD
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Avatar className="h-12 w-12 ring-2 ring-purple-600">
                <AvatarImage src="/placeholder.svg" alt={club.host} />
                <AvatarFallback className="bg-purple-900">{club.host[0]}</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <h1 className="text-2xl font-bold text-purple-100">{club.title}</h1>
                <div className="flex items-center gap-2 text-sm text-purple-300">
                  <span>{club.host}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Music className="h-3 w-3" /> {club.genre}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" /> {club.attendees} attending
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-purple-700 text-purple-300 hover:bg-purple-900/30"
                >
                  <Heart className="h-4 w-4 mr-2" />
                  Follow
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-purple-700 text-purple-300 hover:bg-purple-900/30"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            <div className="p-4 bg-zinc-900/50 rounded-lg border border-purple-900/30">
              <h2 className="font-semibold mb-2 text-purple-200">About this Club</h2>
              <p className="text-sm text-purple-300">{club.description}</p>
            </div>
          </div>

          {/* Chat */}
          <div className="lg:col-span-1 flex flex-col h-[calc(100vh-5rem)] border border-purple-900/30 rounded-lg overflow-hidden bg-zinc-900/50">
            <div className="p-3 border-b border-purple-900/30 flex items-center gap-2 bg-zinc-900">
              <MessageSquare className="h-4 w-4 text-purple-400" />
              <h2 className="font-semibold text-purple-200">Club Chat</h2>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {chatMessages.map((msg) => (
                <div key={msg.id} className="flex gap-2">
                  <span className="font-semibold text-sm text-purple-400">{msg.user}:</span>
                  <span className="text-sm text-purple-200">{msg.message}</span>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="p-3 border-t border-purple-900/30 flex gap-2 bg-zinc-900">
              <Input
                type="text"
                placeholder="Send a message"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                className="flex-1 bg-zinc-800 border-purple-900/50 text-purple-100 placeholder:text-purple-400/50"
              />
              <Button type="submit" size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                Chat
              </Button>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}
