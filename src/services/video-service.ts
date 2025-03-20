import type { VideoData } from "@/types/video"
import {mockedVideos} from "../mocks/videos";

export async function fetchVideos(): Promise<VideoData[]> {
  await new Promise((resolve) => setTimeout(resolve, 800))

  return mockedVideos
}
