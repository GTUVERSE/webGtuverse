"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Music } from 'lucide-react'
import { roomsAPI } from "@/lib/api-service"

type Room = {
  id: number;
  name: string;
  size: number;
  capacity: number;
}

export function ClubsGrid() {
  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true)
        const data = await roomsAPI.getAll()
        setRooms(data)
      } catch (error) {
        console.error("Error fetching rooms:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchRooms()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {[...Array(8)].map((_, index) => (
          <Card key={index} className="overflow-hidden border-0 bg-zinc-900/50 animate-pulse">
            <CardContent className="p-0">
              <div className="w-full aspect-video bg-zinc-800/50 rounded-t-md"></div>
              <div className="p-3">
                <div className="flex gap-2">
                  <div className="w-9 h-9 rounded-full bg-zinc-800/50 flex-shrink-0"></div>
                  <div className="space-y-2">
                    <div className="h-4 w-32 bg-zinc-800/50 rounded"></div>
                    <div className="h-3 w-20 bg-zinc-800/50 rounded"></div>
                    <div className="h-3 w-24 bg-zinc-800/50 rounded"></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {rooms.map((room) => (
        <Link href={`/club/${room.id}`} key={room.id}>
          <Card className="overflow-hidden border-0 bg-zinc-900/50 hover:bg-zinc-800/70 transition-colors group">
            <CardContent className="p-0">
              <div className="relative">
                <img
                  src={`/placeholder.svg?height=180&width=320&text=${encodeURIComponent(room.name)}`}
                  alt={room.name}
                  className="w-full aspect-video object-cover rounded-t-md group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded">
                  LIVE
                </div>
                <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded flex items-center gap-1">
                  <Users className="h-3 w-3" /> {room.size}/{room.capacity}
                </div>
              </div>

              <div className="p-3">
                <div className="flex gap-2">
                  <div className="w-9 h-9 rounded-full bg-purple-900/50 flex-shrink-0 flex items-center justify-center text-purple-200">
                    {room.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-medium text-sm line-clamp-1 text-purple-100">{room.name}</h3>
                    <p className="text-xs text-purple-300">Host: {room.name.split(' ')[0]}</p>
                    <p className="text-xs text-purple-400 flex items-center gap-1">
                      <Music className="h-3 w-3" /> Electronic
                    </p>
                    <div className="flex gap-1 mt-1 flex-wrap">
                      <span className="text-xs bg-purple-900/30 text-purple-200 px-1.5 py-0.5 rounded">
                        Virtual
                      </span>
                      <span className="text-xs bg-purple-900/30 text-purple-200 px-1.5 py-0.5 rounded">
                        Club
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}