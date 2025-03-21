import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi, beforeEach } from "vitest"
import "@testing-library/jest-dom"
import VideoPlayer from "@/components/video-player"
import type { VideoData } from "@/types/video"

const mockVideo: VideoData = {
  id: "1",
  title: "Test Video Title",
  description: "Test video description",
  thumbnailUrl: "https://example.com/thumbnail.jpg",
  duration: "10:30",
  views: "100K",
  channel: "Test Channel",
  publishedAt: "2 weeks ago",
  platform: "youtube",
  url: "https://www.youtube.com/embed/test123",
}

const mockOnOpenChange = vi.fn()
const mockOnVideoChange = vi.fn()

describe("VideoPlayer Component", () => {
  beforeEach(() => {
    mockOnOpenChange.mockReset()
    mockOnVideoChange.mockReset()
  })

  it("renders video information correctly", () => {
    render(
      <VideoPlayer
        video={mockVideo}
        open={true}
        onOpenChange={mockOnOpenChange}
        onVideoChange={mockOnVideoChange}
      />,
    )

    expect(screen.getByText("Test Video Title")).toBeVisible()
    expect(screen.getByText("Test video description")).toBeVisible()
    expect(screen.getByText("Test Channel")).toBeVisible()
    expect(screen.getByText("100K views • 2 weeks ago")).toBeVisible()
  })

  it("renders iframe with correct YouTube embed URL", () => {
    render(
      <VideoPlayer
        video={mockVideo}
        open={true}
        onOpenChange={mockOnOpenChange}
        onVideoChange={mockOnVideoChange}
      />,
    )

    const iframe = screen.getByTitle("Test Video Title")
    expect(iframe).toHaveAttribute("src", expect.stringContaining("https://www.youtube.com/embed/test123"))
  })

  it("calls onOpenChange when close button is clicked", () => {
    render(
      <VideoPlayer
        video={mockVideo}
        open={true}
        onOpenChange={mockOnOpenChange}
        onVideoChange={mockOnVideoChange}
      />,
    )

    fireEvent.click(screen.getByRole("button", { name: /close/i }))
    expect(mockOnOpenChange).toHaveBeenCalledTimes(1)
    expect(mockOnOpenChange).toHaveBeenCalledWith(false)
  })

  it("does not render when video is null", () => {
    const { container } = render(
      <VideoPlayer
        video={null}
        open={true}
        onOpenChange={mockOnOpenChange}
        onVideoChange={mockOnVideoChange}
      />,
    )

    expect(container.innerHTML).toBe("")
  })
})
