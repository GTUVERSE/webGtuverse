"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Music } from "lucide-react"
import Link from "next/link"

type Club = {
  id: string
  name: string
  attendees: string
  genre: string
  avatar?: string
  isLive?: boolean
}

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [showAllClubs, setShowAllClubs] = useState(false)

  const popularClubs: Club[] = [
    {
      id: "neon-lounge",
      name: "Neon Lounge",
      attendees: "398",
      genre: "Electronic",
      avatar: "/placeholder.svg?height=30&width=30",
      isLive: true,
    },
    {
      id: "virtual-beats",
      name: "Virtual Beats",
      attendees: "285",
      genre: "House",
      avatar: "/placeholder.svg?height=30&width=30",
      isLive: true,
    },
    {
      id: "digital-disco",
      name: "Digital Disco",
      attendees: "272",
      genre: "Disco",
      avatar: "/placeholder.svg?height=30&width=30",
      isLive: true,
    },
    {
      id: "cyber-jazz",
      name: "Cyber Jazz",
      attendees: "156",
      genre: "Jazz",
      avatar: "/placeholder.svg?height=30&width=30",
    },
    {
      id: "pixel-party",
      name: "Pixel Party",
      attendees: "207",
      genre: "Pop",
      avatar: "/placeholder.svg?height=30&width=30",
      isLive: true,
    },
    {
      id: "vr-techno",
      name: "VR Techno",
      attendees: "536",
      genre: "Techno",
      avatar: "/placeholder.svg?height=30&width=30",
      isLive: true,
    },
    {
      id: "meta-hiphop",
      name: "Meta Hip-Hop",
      attendees: "381",
      genre: "Hip-Hop",
      avatar: "/placeholder.svg?height=30&width=30",
    },
    {
      id: "avatar-rock",
      name: "Avatar Rock",
      attendees: "255",
      genre: "Rock",
      avatar: "/placeholder.svg?height=30&width=30",
    },
    {
      id: "digital-ambient",
      name: "Digital Ambient",
      attendees: "134",
      genre: "Ambient",
      avatar: "/placeholder.svg?height=30&width=30",
    },
    {
      id: "gtu-official",
      name: "GTU Official",
      attendees: "210",
      genre: "Various",
      avatar: "/placeholder.svg?height=30&width=30",
      isLive: true,
    },
  ]

  const displayedClubs = showAllClubs ? popularClubs : popularClubs.slice(0, 5)

  if (isCollapsed) {
    return (
      <aside className="hidden md:flex flex-col w-16 bg-zinc-900 border-r border-purple-900/50 h-[calc(100vh-3.5rem)] overflow-y-auto">
        <button
          onClick={() => setIsCollapsed(false)}
          className="p-4 hover:bg-purple-900/30 flex justify-center text-purple-300"
        >
          <ChevronDown className="h-5 w-5" />
        </button>
        {popularClubs.slice(0, 10).map((club, index) => (
          <Link href={`/club/${club.id}`} key={index}>
            <div className="p-2 hover:bg-purple-900/30 flex justify-center cursor-pointer relative" title={club.name}>
              <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center overflow-hidden">
                {club.avatar ? (
                  <img src={club.avatar || "/placeholder.svg"} alt={club.name} className="w-full h-full object-cover" />
                ) : (
                  club.name.charAt(0)
                )}
              </div>
              {club.isLive && <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>}
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
        {displayedClubs.map((club, index) => (
          <Link href={`/club/${club.id}`} key={index}>
            <div className="flex items-center justify-between px-4 py-2 hover:bg-purple-900/30 cursor-pointer">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center overflow-hidden relative">
                  {club.avatar ? (
                    <img
                      src={club.avatar || "/placeholder.svg"}
                      alt={club.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    club.name.charAt(0)
                  )}
                  {club.isLive && (
                    <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 border border-zinc-900 rounded-full"></span>
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-purple-100">{club.name}</p>
                  <p className="text-xs text-purple-400">{club.genre}</p>
                </div>
              </div>
              <span className="text-xs text-purple-400">{club.attendees}</span>
            </div>
          </Link>
        ))}

        {popularClubs.length > 5 && (
          <button
            onClick={() => setShowAllClubs(!showAllClubs)}
            className="w-full text-left px-4 py-2 text-sm text-purple-500 hover:bg-purple-900/30"
          >
            {showAllClubs ? "Show less" : "Show more"}
          </button>
        )}
      </div>

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
