"use client"

import type { VideoData } from "@/types/video"
import VideoCard from "@/components/video-card"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination"
import { useState } from "react"

interface VideoListProps {
  videos: VideoData[]
  onVideoSelect: (video: VideoData) => void
  onToggleFavorite: (videoId: string) => void
  isFavorite: (videoId: string) => boolean
}

export default function VideoList({ videos, onVideoSelect, onToggleFavorite, isFavorite }: VideoListProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const videosPerPage = 6

  const indexOfLastVideo = currentPage * videosPerPage
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage
  const currentVideos = videos.slice(indexOfFirstVideo, indexOfLastVideo)
  const totalPages = Math.ceil(videos.length / videosPerPage)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentVideos.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
            isFavorite={isFavorite(video.id)}
            onToggleFavorite={() => onToggleFavorite(video.id)}
            onSelect={() => onVideoSelect(video)}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                />
              </PaginationItem>
              {[...Array(totalPages)].map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink isActive={currentPage === i + 1} onClick={() => setCurrentPage(i + 1)}>
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  )
}
