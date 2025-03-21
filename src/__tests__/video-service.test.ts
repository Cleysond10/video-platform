import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { fetchVideos } from "@/services/video-service"
import { mockedVideos } from "@/mocks/videos"

vi.mock("@/mocks/videos", () => ({
  mockedVideos: [
    {
      id: "1",
      title: "Test Video 1",
      description: "Description 1",
      thumbnailUrl: "https://example.com/thumbnail1.jpg",
      duration: "10:30",
      views: "100K",
      channel: "Channel 1",
      publishedAt: "2 weeks ago",
      platform: "youtube",
      url: "https://youtube.com/watch?v=test1",
    },
    {
      id: "2",
      title: "Test Video 2",
      description: "Description 2",
      thumbnailUrl: "https://example.com/thumbnail2.jpg",
      duration: "5:15",
      views: "200K",
      channel: "Channel 2",
      publishedAt: "1 month ago",
      platform: "youtube",
      url: "https://youtube.com/watch?v=test2",
    },
  ],
}))

describe("Video Service", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("returns mock videos data after a delay", async () => {
    const promise = fetchVideos()

    vi.advanceTimersByTime(800)

    const result = await promise

    expect(result).toEqual(mockedVideos)
    expect(result.length).toBe(2)
    expect(result[0].title).toBe("Test Video 1")
    expect(result[1].title).toBe("Test Video 2")
  })
})
