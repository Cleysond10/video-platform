"use client"

import type { VideoData } from "@/types/video"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface VideoPlayerProps {
  video: VideoData | null
  open: boolean
  onOpenChange: (open: boolean) => void
  videos: VideoData[]
  onVideoChange: (video: VideoData) => void
}

export default function VideoPlayer({ video, open, onOpenChange }: VideoPlayerProps) {
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
            src={video.url}
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
