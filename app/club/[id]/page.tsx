"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { MessageSquare, Users, Share2, Heart, Volume2, Music } from 'lucide-react'
import { roomsAPI } from "@/lib/api-service"
import { useAuth } from "@/lib/auth-context"

type Room = {
  id: number;
  name: string;
  size: number;
  capacity: number;
}

type RoomUser = {
  id: number;
  username: string;
  email: string;
}

export default function ClubPage() {
  const params = useParams()
  const roomId = parseInt(params.id as string)
  const [room, setRoom] = useState<Room | null>(null)
  const [roomUsers, setRoomUsers] = useState<RoomUser[]>([])
  const [loading, setLoading] = useState(true)
  const [chatMessage, setChatMessage] = useState("")
  const { user } = useAuth()
  
  // Mock chat messages - gerçek bir chat API'niz olduğunda bunu değiştirin
  const [chatMessages, setChatMessages] = useState([
    { id: 1, user: "AvatarDancer", message: "This club is amazing tonight!" },
    { id: 2, user: "VirtualVibes", message: "Love the music selection!" },
    { id: 3, user: "DigitalDJ", message: "Who's the DJ tonight?" },
    { id: 4, user: "MetaPartyGoer", message: "The avatar animations are so smooth!" },
  ])

  // Odayı ve kullanıcılarını yükle
  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        setLoading(true);
        const roomData = await roomsAPI.getById(roomId);
        setRoom(roomData);
        
        const usersData = await roomsAPI.getUsers(roomId);
        setRoomUsers(usersData);
      } catch (error) {
        console.error("Error fetching room data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    if (roomId) {
      fetchRoomData();
    }
  }, [roomId]);

  // Kullanıcıyı odaya ekle
  const joinRoom = async () => {
    if (!user || !room) return;
    
    try {
      await roomsAPI.addUser(roomId, user.id);
      // Kullanıcı listesini güncelle
      const usersData = await roomsAPI.getUsers(roomId);
      setRoomUsers(usersData);
    } catch (error) {
      console.error("Error joining room:", error);
    }
  };

  // Kullanıcıyı odadan çıkar
  const leaveRoom = async () => {
    if (!user || !room) return;
    
    try {
      await roomsAPI.removeUser(roomId, user.id);
      // Kullanıcı listesini güncelle
      const usersData = await roomsAPI.getUsers(roomId);
      setRoomUsers(usersData);
    } catch (error) {
      console.error("Error leaving room:", error);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (chatMessage.trim()) {
      setChatMessages([
        ...chatMessages,
        {
          id: chatMessages.length + 1,
          user: user?.username || "Guest",
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

  if (!room) {
    return (
      <div className="min-h-screen flex flex-col bg-black">
        <Navbar />
        <div className="flex flex-1 items-center justify-center">
          <div className="text-purple-300">Club not found</div>
        </div>
      </div>
    )
  }

  // Kullanıcının odada olup olmadığını kontrol et
  const isUserInRoom = user ? roomUsers.some(roomUser => roomUser.id === user.id) : false;

  return (
    <div className="min-h-screen flex flex-col bg-black text-purple-50">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-4 p-4 bg-gradient-to-b from-black to-zinc-900">
          {/* Video Player */}
          <div className="lg:col-span-3 space-y-4">
            <div className="relative aspect-video bg-zinc-900 rounded-lg overflow-hidden">
              {/* Avatar video placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <p className="text-purple-300 mb-4">Avatar video would be displayed here</p>
                  <div className="w-full h-full bg-gradient-to-r from-purple-900/30 via-pink-800/30 to-blue-900/30 absolute inset-0"></div>
                  <img
                    src="/placeholder.svg?height=720&width=1280"
                    alt={room.name}
                    className="w-full h-full object-cover absolute inset-0 -z-10 opacity-50"
                  />
                </div>
              </div>
              <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                LIVE
              </div>
              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                <Users className="h-3 w-3" /> {room.size}/{room.capacity}
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
                <AvatarImage src="/placeholder.svg" alt="Host" />
                <AvatarFallback className="bg-purple-900">H</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <h1 className="text-2xl font-bold text-purple-100">{room.name}</h1>
                <div className="flex items-center gap-2 text-sm text-purple-300">
                  <span>Host: {roomUsers[0]?.username || "Unknown"}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Music className="h-3 w-3" /> Electronic
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" /> {room.size}/{room.capacity} attending
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                {user && (
                  isUserInRoom ? (
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-red-700 text-red-300 hover:bg-red-900/30"
                      onClick={leaveRoom}
                    >
                      Leave Club
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-green-700 text-green-300 hover:bg-green-900/30"
                      onClick={joinRoom}
                      disabled={room.size >= room.capacity}
                    >
                      Join Club
                    </Button>
                  )
                )}
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
              <p className="text-sm text-purple-300">
                Welcome to {room.name}, a virtual club in GTUVERSE! Here you can experience real-time avatar motion mapping with our advanced motion detection technology.
              </p>
            </div>
            
            {/* Kullanıcı Listesi */}
            <div className="p-4 bg-zinc-900/50 rounded-lg border border-purple-900/30">
              <h2 className="font-semibold mb-2 text-purple-200">Club Members ({roomUsers.length}/{room.capacity})</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {roomUsers.map((roomUser) => (
                  <div key={roomUser.id} className="flex items-center gap-2 p-2 bg-zinc-800/50 rounded">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-purple-900 text-purple-100">
                        {roomUser.username.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-purple-200">{roomUser.username}</span>
                  </div>
                ))}
              </div>
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