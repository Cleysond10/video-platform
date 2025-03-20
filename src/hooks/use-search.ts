"use client"

import { useMemo } from "react"
import type { VideoData } from "@/types/video"

export function useSearch(videos: VideoData[], query: string) {
  return useMemo(() => {
    if (!query.trim()) return videos

    const lowerCaseQuery = query.toLowerCase()

    return videos.filter(
      (video) =>
        video.title.toLowerCase().includes(lowerCaseQuery) ||
        video.description.toLowerCase().includes(lowerCaseQuery) ||
        video.channel.toLowerCase().includes(lowerCaseQuery),
    )
  }, [videos, query])
}
