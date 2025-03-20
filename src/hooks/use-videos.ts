import { useQuery } from "@tanstack/react-query"
import { fetchVideos } from "@/services/video-service"

export function useVideos() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["videos"],
    queryFn: fetchVideos,
    staleTime: 1000 * 60 * 5,
  })

  return {
    videos: data || [],
    isLoading,
    error,
  }
}
