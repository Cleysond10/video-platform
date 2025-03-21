"use client"

import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import "@testing-library/jest-dom"
import VideoCard from "@/components/video-card"
import type { VideoData } from "@/types/video"

const mockVideo: VideoData = {
  id: "1",
  title: "Test Video",
  description: "Test description",
  thumbnailUrl: "https://example.com/thumbnail.jpg",
  duration: "10:30",
  views: "100K",
  channel: "Test Channel",
  publishedAt: "2 weeks ago",
  platform: "youtube",
  url: "https://youtube.com/watch?v=test123",
}

describe("VideoCard Component", () => {
  it("renders video title and toggles favorite when button is clicked", () => {

    const mockToggleFavorite = vi.fn()
    const mockSelect = vi.fn()

    render(
      <VideoCard video={mockVideo} isFavorite={false} onToggleFavorite={mockToggleFavorite} onSelect={mockSelect} />,
    )

    expect(screen.getByText("Test Video")).toBeInTheDocument()

    const favoriteButton = screen.getByRole("button", { name: /add to favorites/i })
    fireEvent.click(favoriteButton)
    expect(mockToggleFavorite).toHaveBeenCalledTimes(1)
  })
})
