"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Music } from "lucide-react"

type Club = {
  id: string
  title: string
  host: string
  attendees: string
  thumbnail: string
  genre: string
  tags?: string[]
}

export function ClubsGrid() {
  const clubs: Club[] = [
    {
      id: "neon-lounge",
      title: "Neon Lounge - Weekend Party",
      host: "DJ Virtual",
      attendees: "398",
      thumbnail: "/placeholder.svg?height=180&width=320",
      genre: "Electronic",
      tags: ["Dance", "Party"],
    },
    {
      id: "virtual-beats",
      title: "Virtual Beats - Avatar Dance Night",
      host: "DJ Pixel",
      attendees: "285",
      thumbnail: "/placeholder.svg?height=180&width=320",
      genre: "House",
      tags: ["Dance", "Avatars"],
    },
    {
      id: "digital-disco",
      title: "Digital Disco - Retro Night",
      host: "DJ Binary",
      attendees: "272",
      thumbnail: "/placeholder.svg?height=180&width=320",
      genre: "Disco",
      tags: ["Retro", "Dance"],
    },
    {
      id: "cyber-jazz",
      title: "Cyber Jazz - Smooth Vibes",
      host: "DJ Neural",
      attendees: "156",
      thumbnail: "/placeholder.svg?height=180&width=320",
      genre: "Jazz",
      tags: ["Chill", "Lounge"],
    },
    {
      id: "pixel-party",
      title: "Pixel Party - 8-bit Night",
      host: "DJ 8Bit",
      attendees: "207",
      thumbnail: "/placeholder.svg?height=180&width=320",
      genre: "Chiptune",
      tags: ["Retro", "Gaming"],
    },
    {
      id: "vr-techno",
      title: "VR Techno - Deep Space",
      host: "DJ Matrix",
      attendees: "536",
      thumbnail: "/placeholder.svg?height=180&width=320",
      genre: "Techno",
      tags: ["Dance", "Immersive"],
    },
    {
      id: "meta-hiphop",
      title: "Meta Hip-Hop - Avatar Cypher",
      host: "DJ Virtual MC",
      attendees: "381",
      thumbnail: "/placeholder.svg?height=180&width=320",
      genre: "Hip-Hop",
      tags: ["Urban", "Avatars"],
    },
    {
      id: "gtu-official",
      title: "GTU Official - University Night",
      host: "GTU Team",
      attendees: "210",
      thumbnail: "/placeholder.svg?height=180&width=320",
      genre: "Various",
      tags: ["University", "Social"],
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {clubs.map((club) => (
        <Link href={`/club/${club.id}`} key={club.id}>
          <Card className="overflow-hidden border-0 bg-zinc-900/50 hover:bg-zinc-800/70 transition-colors group">
            <CardContent className="p-0">
              <div className="relative">
                <img
                  src={club.thumbnail || "/placeholder.svg"}
                  alt={club.title}
                  className="w-full aspect-video object-cover rounded-t-md group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded">
                  LIVE
                </div>
                <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded flex items-center gap-1">
                  <Users className="h-3 w-3" /> {club.attendees}
                </div>
              </div>

              <div className="p-3">
                <div className="flex gap-2">
                  <div className="w-9 h-9 rounded-full bg-purple-900/50 flex-shrink-0 flex items-center justify-center text-purple-200">
                    {club.host.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-medium text-sm line-clamp-1 text-purple-100">{club.title}</h3>
                    <p className="text-xs text-purple-300">{club.host}</p>
                    <p className="text-xs text-purple-400 flex items-center gap-1">
                      <Music className="h-3 w-3" /> {club.genre}
                    </p>
                    {club.tags && (
                      <div className="flex gap-1 mt-1 flex-wrap">
                        {club.tags.map((tag, index) => (
                          <span key={index} className="text-xs bg-purple-900/30 text-purple-200 px-1.5 py-0.5 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
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
