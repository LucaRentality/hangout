// This file was previously at app/components/ProfilePhotoGallery.tsx
// No changes needed to its content as it was already correct.
"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, X } from "lucide-react"
import Image from "next/image"

interface ProfilePhotoGalleryProps {
  initialPhotos: string[]
  onPhotosChange: (photos: string[]) => void
}

export function ProfilePhotoGallery({ initialPhotos, onPhotosChange }: ProfilePhotoGalleryProps) {
  const [photos, setPhotos] = useState<string[]>(initialPhotos)

  const handleAddPhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && photos.length < 6) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const newPhotos = [...photos, reader.result as string]
        setPhotos(newPhotos)
        onPhotosChange(newPhotos)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemovePhoto = (index: number) => {
    const newPhotos = photos.filter((_, i) => i !== index)
    setPhotos(newPhotos)
    onPhotosChange(newPhotos)
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="grid grid-cols-3 gap-4">
          {photos.map((photo, index) => (
            <div key={index} className="relative aspect-square">
              <Image
                src={photo || "/placeholder.svg"}
                alt={`Profile photo ${index + 1}`}
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2"
                onClick={() => handleRemovePhoto(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          {photos.length < 6 && (
            <div className="relative aspect-square bg-muted rounded-md flex items-center justify-center">
              <label htmlFor="add-photo" className="cursor-pointer">
                <Plus className="h-8 w-8 text-muted-foreground" />
              </label>
              <input id="add-photo" type="file" accept="image/*" className="hidden" onChange={handleAddPhoto} />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
