export interface VideoData {
  id: string
  title: string
  description: string
  thumbnailUrl: string
  duration: string
  views: string
  channel: string
  publishedAt: string
  platform: "youtube" | "vimeo" | "other"
  url: string
}
