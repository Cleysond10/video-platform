"use client"

import { useState } from "react"
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import AddVideoModal from "@/components/add-video-modal"

export default function AddVideoButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsOpen(true)} className="flex items-center gap-2">
        <PlusCircle className="h-4 w-4" />
        <span>Add Video</span>
      </Button>
      <AddVideoModal open={isOpen} onOpenChange={setIsOpen} />
    </>
  )
}
