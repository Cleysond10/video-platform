"use client"

import { useState, useEffect } from "react"

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    const storedFavorites = localStorage.getItem("videoFavorites")
    if (storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites))
      } catch (e) {
        console.error("Failed to parse favorites from localStorage", e)
        localStorage.removeItem("videoFavorites")
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("videoFavorites", JSON.stringify(favorites))
  }, [favorites])

  const toggleFavorite = (videoId: string) => {
    setFavorites((prev) => (prev.includes(videoId) ? prev.filter((id) => id !== videoId) : [...prev, videoId]))
  }

  const isFavorite = (videoId: string) => favorites.includes(videoId)

  return {
    favorites,
    toggleFavorite,
    isFavorite,
  }
}
