"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import VideoList from "@/components/video-list"
import { useVideos } from "@/hooks/use-videos"
import { useFavorites } from "@/hooks/use-favorites"
import type { VideoData } from "@/types/video"
import { useSearch } from "@/hooks/use-search"
import { Skeleton } from "@/components/ui/skeleton"
import VideoPlayer from "@/components/video-player"
import { ThemeToggle } from "@/components/theme-toggle"
import AddVideoButton from "@/components/add-video-button"

export default function VideoHomePage() {
  const [selectedVideo, setSelectedVideo] = useState<VideoData | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const { videos, isLoading, error, refetch } = useVideos()
  const { favorites, toggleFavorite, isFavorite } = useFavorites()

  const favoriteVideos = videos.filter((video) => favorites.includes(video.id))

  const filteredAllVideos = useSearch(videos, searchQuery)
  const filteredFavoriteVideos = useSearch(favoriteVideos, searchQuery)

  const currentVideoList = activeTab === "all" ? filteredAllVideos : filteredFavoriteVideos

  const handleVideoSelect = (video: VideoData) => {
    setSelectedVideo(video)
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <h1 className="text-3xl font-bold">VideoStream</h1>
        <AddVideoButton />
        <ThemeToggle />
      </div>

      <VideoPlayer
        video={selectedVideo}
        open={!!selectedVideo}
        onOpenChange={(open) => {
          if (!open) setSelectedVideo(null)
        }}
        videos={currentVideoList}
        onVideoChange={setSelectedVideo}
      />

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="search"
          placeholder="Search videos..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs defaultValue="all" className="mb-6" onValueChange={(value) => setActiveTab(value)}>
        <TabsList className="mb-4 gap-1 bg-foreground">
          <TabsTrigger value="all">All Videos</TabsTrigger>
          <TabsTrigger value="favorites">Favorites ({favoriteVideos.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="h-[180px] w-full rounded-lg" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-10">
              <p className="text-destructive">Error loading videos. Please try again later.</p>
            </div>
          ) : filteredAllVideos.length > 0 ? (
            <VideoList
              videos={filteredAllVideos}
              onVideoSelect={handleVideoSelect}
              onToggleFavorite={toggleFavorite}
              isFavorite={isFavorite}
              onVideoAdded={refetch}
            />
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No videos found matching your search.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="favorites">
          {favoriteVideos.length > 0 ? (
            filteredFavoriteVideos.length > 0 ? (
              <VideoList
                videos={filteredFavoriteVideos}
                onVideoSelect={handleVideoSelect}
                onToggleFavorite={toggleFavorite}
                isFavorite={isFavorite}
                onVideoAdded={refetch}
              />
            ) : (
              <div className="text-center py-10">
                <p className="text-muted-foreground">No favorite videos match your search.</p>
              </div>
            )
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No favorite videos yet. Add some from the All Videos tab!</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
