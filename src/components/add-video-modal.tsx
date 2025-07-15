"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { addVideo } from "@/services/indexdb-service"
import type { VideoData } from "@/types/video"

interface AddVideoModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function AddVideoModal({ open, onOpenChange }: AddVideoModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    thumbnailUrl: "",
    duration: "",
    views: "",
    channel: "",
    publishedAt: "",
    platform: "youtube",
    videoId: "",
    url: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const extractVideoId = (url: string, platform: string) => {
    if (platform === "youtube") {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
      const match = url.match(regExp)
      return match && match[2].length === 11 ? match[2] : ""
    } else if (platform === "vimeo") {
      const regExp = /vimeo\.com\/(?:video\/)?([0-9]+)/
      const match = url.match(regExp)
      return match ? match[1] : ""
    }
    return ""
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      if (!formData.title || !formData.description || !formData.url) {
        throw new Error("Please fill in all required fields")
      }

      let videoId = formData.videoId
      if (!videoId && formData.url) {
        videoId = extractVideoId(formData.url, formData.platform)
      }

      if (!videoId) {
        throw new Error("Could not extract video ID from URL. Please check the URL or enter the video ID manually.")
      }

      let thumbnailUrl = formData.thumbnailUrl
      if (!thumbnailUrl && formData.platform === "youtube") {
        thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
      }

      const newVideo: VideoData = {
        id: `custom-${Date.now()}`,
        title: formData.title,
        description: formData.description,
        thumbnailUrl: thumbnailUrl,
        duration: formData.duration || "0:00",
        views: formData.views || "0",
        channel: formData.channel || "Custom Channel",
        publishedAt: formData.publishedAt || "Just now",
        platform: formData.platform as "youtube" | "vimeo" | "other",
        url: `https://www.youtube.com/embed/${videoId}`,
      }

      await addVideo(newVideo)

      setFormData({
        title: "",
        description: "",
        thumbnailUrl: "",
        duration: "",
        views: "",
        channel: "",
        publishedAt: "",
        platform: "youtube",
        videoId: "",
        url: "",
      })
      onOpenChange(false)
    } catch (error) {
      console.error("Error adding video:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Video</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <div className="grid gap-2">
            <Label htmlFor="url" className="required">
              Video URL
            </Label>
            <Input
              id="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
              placeholder="https://www.youtube.com/watch?v=..."
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="title" className="required">
              Title
            </Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter video title"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description" className="required">
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter video description"
              required
              rows={3}
            />
          </div>

          <br />
          <hr className="border-t border-gray-200" />


          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="duration">Duration (Optional)</Label>
              <Input
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="e.g. 10:30"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="channel">Channel (Optional)</Label>
              <Input
                id="channel"
                name="channel"
                value={formData.channel}
                onChange={handleChange}
                placeholder="Channel name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="views">Views (Optional)</Label>
              <Input id="views" name="views" value={formData.views} onChange={handleChange} placeholder="e.g. 1.5K" />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="publishedAt">Published Date (Optional)</Label>
            <Input
              id="publishedAt"
              name="publishedAt"
              value={formData.publishedAt}
              onChange={handleChange}
              placeholder="e.g. 2 weeks ago"
            />
          </div>

          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add Video"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
