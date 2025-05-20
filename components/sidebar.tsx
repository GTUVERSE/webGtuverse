"use client"

import { useState, useEffect } from "react"
import { ChevronDown, ChevronUp, Music } from 'lucide-react'
import Link from "next/link"
import { roomsAPI } from "@/lib/api-service"
import { useAuth } from "@/lib/auth-context"

type Room = {
  id: number;
  name: string;
  size: number;
  capacity: number;
}

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [showAllRooms, setShowAllRooms] = useState(false)
  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

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

  const displayedRooms = showAllRooms ? rooms : rooms.slice(0, 5)

  if (isCollapsed) {
    return (
      <aside className="hidden md:flex flex-col w-16 bg-zinc-900 border-r border-purple-900/50 h-[calc(100vh-3.5rem)] overflow-y-auto">
        <button
          onClick={() => setIsCollapsed(false)}
          className="p-4 hover:bg-purple-900/30 flex justify-center text-purple-300"
        >
          <ChevronDown className="h-5 w-5" />
        </button>
        {rooms.slice(0, 10).map((room) => (
          <Link href={`/club/${room.id}`} key={room.id}>
            <div className="p-2 hover:bg-purple-900/30 flex justify-center cursor-pointer relative" title={room.name}>
              <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center overflow-hidden text-purple-200">
                {room.name.charAt(0)}
              </div>
              {room.size > 0 && <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>}
            </div>
          </Link>
        ))}
      </aside>
    )
  }

  return (
    <aside className="hidden md:block w-60 bg-zinc-900 border-r border-purple-900/50 h-[calc(100vh-3.5rem)] overflow-y-auto">
      <div className="p-4 flex justify-between items-center border-b border-purple-900/50">
        <h2 className="font-semibold text-sm text-purple-300">POPULAR CLUBS</h2>
        <button onClick={() => setIsCollapsed(true)} className="hover:bg-purple-900/30 p-1 rounded text-purple-300">
          <ChevronUp className="h-4 w-4" />
        </button>
      </div>

      <div className="py-2">
        {loading ? (
          // Loading state
          [...Array(5)].map((_, index) => (
            <div key={index} className="px-4 py-2">
              <div className="flex items-center gap-2 animate-pulse">
                <div className="w-8 h-8 rounded-full bg-zinc-800/50"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-3 w-24 bg-zinc-800/50 rounded"></div>
                  <div className="h-2 w-16 bg-zinc-800/50 rounded"></div>
                </div>
                <div className="h-2 w-8 bg-zinc-800/50 rounded"></div>
              </div>
            </div>
          ))
        ) : (
          // Rooms list
          displayedRooms.map((room) => (
            <Link href={`/club/${room.id}`} key={room.id}>
              <div className="flex items-center justify-between px-4 py-2 hover:bg-purple-900/30 cursor-pointer">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center overflow-hidden relative text-purple-200">
                    {room.name.charAt(0)}
                    {room.size > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 border border-zinc-900 rounded-full"></span>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-purple-100">{room.name}</p>
                    <p className="text-xs text-purple-400">Electronic</p>
                  </div>
                </div>
                <span className="text-xs text-purple-400">{room.size}/{room.capacity}</span>
              </div>
            </Link>
          ))
        )}

        {rooms.length > 5 && (
          <button
            onClick={() => setShowAllRooms(!showAllRooms)}
            className="w-full text-left px-4 py-2 text-sm text-purple-500 hover:bg-purple-900/30"
          >
            {showAllRooms ? "Show less" : "Show more"}
          </button>
        )}
      </div>

      {user && (
        <div className="p-4 border-t border-purple-900/50">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold text-sm text-purple-300">CREATE NEW CLUB</h2>
            <Link href="/create-club">
              <button className="text-xs bg-purple-600 hover:bg-purple-700 text-white px-2 py-1 rounded">
                New
              </button>
            </Link>
          </div>
        </div>
      )}

      <div className="p-4 border-t border-purple-900/50">
        <h2 className="font-semibold text-sm mb-2 text-purple-300">POPULAR GENRES</h2>
        <div className="grid grid-cols-2 gap-2">
          {["Electronic", "House", "Techno", "Hip-Hop", "Pop", "Ambient"].map((genre, index) => (
            <div
              key={index}
              className="text-xs p-1 hover:bg-purple-900/30 rounded cursor-pointer flex items-center gap-1 text-purple-200"
            >
              <Music className="h-3 w-3" />
              {genre}
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}