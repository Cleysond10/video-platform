import type { VideoData } from "@/types/video"
import {mockedVideos} from "../mocks/videos";
import { getAllVideos } from "@/services/indexdb-service"

export async function fetchVideos(): Promise<VideoData[]> {
  try {
    const customVideos = await getAllVideos()

    const allVideos = [...mockedVideos, ...customVideos]

    return allVideos
  } catch (error) {
    console.error("Error fetching videos:", error)

    return mockedVideos
  }
}
