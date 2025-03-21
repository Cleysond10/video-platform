"use client"

import type React from "react"

import { Heart } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { VideoData } from "@/types/video"
import Image from "next/image"
import { useState } from "react"

interface VideoCardProps {
  video: VideoData
  isFavorite: boolean
  onToggleFavorite: () => void
  onSelect: () => void
}

export default function VideoCard({ video, isFavorite, onToggleFavorite, onSelect }: VideoCardProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsAnimating(true)
    onToggleFavorite()

    setTimeout(() => {
      setIsAnimating(false)
    }, 500)
  }

  return (
    <Card className="overflow-hidden border-foreground bg-background hover:bg-foreground h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:border-primary/20 cursor-pointer group">
      <div className="relative aspect-video" onClick={onSelect}>
        <Image
          src={video.thumbnailUrl}
          alt={video.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
          {video.duration}
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-black/60 rounded-full p-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            >
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          </div>
        </div>
      </div>

      <CardContent className="pt-4 flex-grow" onClick={onSelect}>
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-semibold line-clamp-2 group-hover:text-text transition-colors">{video.title}</h3>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0 rounded-full overflow-hidden hover:bg-foreground cursor-pointer"
            onClick={handleFavoriteClick}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart
              className={`h-5 w-5 transition-all duration-300 ${isFavorite ? "fill-red-500 text-red-500" : ""} ${
                isAnimating ? (isFavorite ? "animate-unfavorite" : "animate-favorite") : ""
              }`}
            />
          </Button>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{video.description}</p>
      </CardContent>

      <CardFooter className="flex flex-col items-start pt-0" onClick={onSelect}>
        <p className="text-sm font-medium">{video.channel}</p>
        <div className="text-xs text-muted-foreground">
          {video.views} views • {video.publishedAt}
        </div>
      </CardFooter>
    </Card>
  )
}
