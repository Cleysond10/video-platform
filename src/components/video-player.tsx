"use client"

import type { VideoData } from "@/types/video"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface VideoPlayerProps {
  video: VideoData | null
  open: boolean
  onOpenChange: (open: boolean) => void
  videos: VideoData[]
  onVideoChange: (video: VideoData) => void
}

export default function VideoPlayer({ video, open, onOpenChange, videos, onVideoChange }: VideoPlayerProps) {
  const getEmbedUrl = ({ platform, url }: VideoData) => {
    if (platform === "youtube") {
      const baseUrl = url.split('?')[0];
      return `${baseUrl}?autoplay=1&enablejsapi=1&origin=${window.location.origin}`
    } else if (platform === "vimeo") {
      const baseUrl = url.split('?')[0];
      return `${baseUrl}?autoplay=1`
    }
    return url
  }

  const getNext = () => {
    if (!video || videos.length === 0) return null

    const currentIndex = videos.findIndex((v) => v.id === video.id)
    if (currentIndex === -1 || currentIndex === videos.length - 1) {
      return videos[0]
    }

    return videos[currentIndex + 1]
  }

  const getPrev = () => {
    if (!video || videos.length === 0) return null

    const currentIndex = videos.findIndex((v) => v.id === video.id)
    if (currentIndex === 0) {
      return videos[videos.length - 1]
    }

    return videos[currentIndex - 1]
  }

  if (!video) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-xl line-clamp-1">{video.title}</DialogTitle>
          <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)} className="h-8 w-8 rounded-full hover:bg-foreground cursor-pointer">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogHeader>

        <div className="aspect-video w-full mt-2 relative">
          <iframe
            id="youtube-player"
            src={getEmbedUrl(video)}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0"
          ></iframe>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-muted-foreground">
              {video.views} views • {video.publishedAt}
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const prevVideo = getPrev()
                  if (prevVideo) onVideoChange(prevVideo)
                }}
                className="flex items-center gap-1"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Previous</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const nextVideo = getNext()
                  if (nextVideo) onVideoChange(nextVideo)
                }}
                className="flex items-center gap-1"
              >
                <span>Next Video</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div>
            <h3 className="font-medium mb-1">{video.channel}</h3>
            <p className="text-sm">{video.description}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
