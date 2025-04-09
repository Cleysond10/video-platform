/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import type { VideoData } from "@/types/video"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useRef, useState } from "react"
import { Progress } from "./ui/progress"

interface VideoPlayerProps {
  video: VideoData | null
  open: boolean
  onOpenChange: (open: boolean) => void
  videos: VideoData[]
  onVideoChange: (video: VideoData) => void
}

export default function VideoPlayer({ video, open, onOpenChange, videos, onVideoChange }: VideoPlayerProps) {
  const [autoplayCountdown, setAutoplayCountdown] = useState(0)
  const [autoplayEnabled] = useState(true)
  const countdownDuration = 3
  const isFirstRender = useRef(true)
  const isCountdownActive = useRef(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const youtubeApiLoaded = useRef(false)

  const getEmbedUrl = ({ platform, url }: VideoData) => {
    if (platform === "youtube") {
      const baseUrl = url.split('?')[0];
      return `${baseUrl}?autoplay=1&enablejsapi=1&origin=${encodeURIComponent(window.location.origin)}`
    } else if (platform === "vimeo") {
      const baseUrl = url.split('?')[0];
      return `${baseUrl}?autoplay=1`
    }
    return url
  }

  const getNextVideo = () => {
    if (!video || videos.length === 0) return null

    const currentIndex = videos.findIndex((v) => v.id === video.id)
    if (currentIndex === -1 || currentIndex === videos.length - 1) {
      return videos[0]
    }

    return videos[currentIndex + 1]
  }

  const getPrevVideo = () => {
    if (!video || videos.length === 0) return null

    const currentIndex = videos.findIndex((v) => v.id === video.id)
    if (currentIndex === 0) {
      return videos[videos.length - 1]
    }

    return videos[currentIndex - 1]
  }

  const handleVideoEnded = () => {
    if (autoplayEnabled) {
      setAutoplayCountdown(countdownDuration)
      isCountdownActive.current = true
    }
  }

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null

    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    if (autoplayCountdown > 0) {
      timer = setTimeout(() => {
        setAutoplayCountdown((prev) => prev - 1)
      }, 1000)
    } else if (autoplayCountdown === 0 && isCountdownActive.current && open && autoplayEnabled) {
      const nextVideo = getNextVideo()
      if (nextVideo) {
        onVideoChange(nextVideo)
        isCountdownActive.current = false
      }
    }

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [autoplayCountdown, open, autoplayEnabled, onVideoChange, videos, video])

  useEffect(() => {
    setAutoplayCountdown(0)
    isCountdownActive.current = false

    if (!open) {
      isFirstRender.current = true
    }
  }, [video, open])

  useEffect(() => {
    if (typeof window === "undefined" || !video || !open) return

    if (!window.YT && !youtubeApiLoaded.current) {
      youtubeApiLoaded.current = true
      const tag = document.createElement("script")
      tag.src = "https://www.youtube.com/iframe_api"
      const firstScriptTag = document.getElementsByTagName("script")[0]
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)
    }

    const setupYouTubeEvents = () => {
      if (!video || video.platform !== "youtube" || !open) return

      const setupTimer = setTimeout(() => {
        try {
          if (!window.YT || !window.YT.Player) return

          const iframe = document.getElementById("youtube-player") as HTMLIFrameElement
          if (!iframe) return

          new window.YT.Player(iframe, {
            events: {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onStateChange: (event: any) => {
                if (event.data === 0) {
                  handleVideoEnded()
                }
              },
            },
          })
        } catch (error) {
          console.error("Error setting up YouTube events:", error)
        }
      }, 1000)

      return () => clearTimeout(setupTimer)
    }

    if (window.YT && window.YT.Player) {
      return setupYouTubeEvents()
    } else {
      window.onYouTubeIframeAPIReady = () => {
        setupYouTubeEvents()
      }
    }

    return () => {
      window.onYouTubeIframeAPIReady = undefined
    }
  }, [video, open])

  if (!video) return null

  const nextVideo = getNextVideo()

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
            ref={iframeRef}
            src={getEmbedUrl(video)}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0"
          ></iframe>
          {autoplayCountdown > 0 && nextVideo && (
            <div className="absolute bottom-0 right-0 left-0 bg-black/80 text-white p-3 flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <div>
                  <span>Next: {nextVideo.title}</span>
                  <div className="text-sm text-muted-foreground">Autoplay in {autoplayCountdown}s</div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => {
                      setAutoplayCountdown(0)
                      isCountdownActive.current = true
                    }}>
                    Play Now
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => {
                      setAutoplayCountdown(0)
                      isCountdownActive.current = false
                    }}>
                    Cancel
                  </Button>
                </div>
              </div>
              <Progress value={((countdownDuration - autoplayCountdown) / countdownDuration) * 100} />
            </div>
          )}
        </div>

        <span>{video.platform !== 'youtube' ? "Autoplay next video is not enabled for this type of video!" : ""}</span>

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
                  const prevVideo = getPrevVideo()
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
                  const nextVideo = getNextVideo()
                  if (nextVideo) onVideoChange(nextVideo)
                }}
                className="flex items-center gap-1"
              >
                <span>Next Video</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
              {/* <div className="flex items-center gap-2">
                <span className="text-sm">Autoplay</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={autoplayEnabled}
                    onChange={() => setAutoplayEnabled(!autoplayEnabled)}
                  />
                  <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500 border"></div>
                </label>
              </div> */}
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
