"use client"

import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import "@testing-library/jest-dom"
import VideoList from "@/components/video-list"
import { mockedVideos } from "@/mocks/videos"

const mockVideoSelect = vi.fn()
const mockToggleFavorite = vi.fn()
const mockIsFavorite = vi.fn().mockImplementation((id) => id === "1")

vi.mock("@/components/video-card", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: ({ video, onSelect, onToggleFavorite, isFavorite }: any) => (
    <div data-testid={`video-card-${video.id}`}>
      <h3>{video.title}</h3>
      <button onClick={() => onSelect(video)}>Select</button>
      <button onClick={() => onToggleFavorite()}>{isFavorite ? "Unfavorite" : "Favorite"}</button>
    </div>
  ),
}))

describe("VideoList Component", () => {
  it("renders the correct number of video cards per page", () => {
    render(
      <VideoList
        videos={mockedVideos}
        onVideoSelect={mockVideoSelect}
        onToggleFavorite={mockToggleFavorite}
        isFavorite={mockIsFavorite}
      />,
    )

    const videoCards = screen.getAllByTestId(/video-card-\d+/)
    expect(videoCards.length).toBe(6)
  })

  it("displays pagination when there are more videos than the limit", () => {
    render(
      <VideoList
        videos={mockedVideos}
        onVideoSelect={mockVideoSelect}
        onToggleFavorite={mockToggleFavorite}
        isFavorite={mockIsFavorite}
      />,
    )

    expect(screen.getByText("1")).toBeInTheDocument()
    expect(screen.getByText("2")).toBeInTheDocument()
  })

  it("calls onVideoSelect when a video is selected", () => {
    render(
      <VideoList
        videos={mockedVideos}
        onVideoSelect={mockVideoSelect}
        onToggleFavorite={mockToggleFavorite}
        isFavorite={mockIsFavorite}
      />,
    )

    fireEvent.click(screen.getAllByText("Select")[0])
    expect(mockVideoSelect).toHaveBeenCalledTimes(1)
    expect(mockVideoSelect).toHaveBeenCalledWith(mockedVideos[0])
  })

  it("calls onToggleFavorite when favorite button is clicked", () => {
    render(
      <VideoList
        videos={mockedVideos}
        onVideoSelect={mockVideoSelect}
        onToggleFavorite={mockToggleFavorite}
        isFavorite={mockIsFavorite}
      />,
    )

    fireEvent.click(screen.getAllByText("Unfavorite")[0])
    expect(mockToggleFavorite).toHaveBeenCalledTimes(1)
    expect(mockToggleFavorite).toHaveBeenCalledWith("1")
  })
})
