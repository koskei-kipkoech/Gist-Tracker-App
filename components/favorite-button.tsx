"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface FavoriteButtonProps {
  gistId: string
}

export default function FavoriteButton({ gistId }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    async function checkFavoriteStatus() {
      try {
        const response = await fetch(`/api/gists/${gistId}/favorite`)
        const data = await response.json()
        setIsFavorite(data.isFavorite)
      } catch (error) {
        console.error("Error checking favorite status:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkFavoriteStatus()
  }, [gistId])

  async function toggleFavorite() {
    setIsLoading(true)
    try {
      const method = isFavorite ? "DELETE" : "POST"
      const response = await fetch(`/api/gists/${gistId}/favorite`, {
        method,
      })

      if (!response.ok) {
        throw new Error("Failed to update favorite status")
      }

      setIsFavorite(!isFavorite)

      toast({
        title: isFavorite ? "Removed from favorites" : "Added to favorites",
        description: isFavorite
          ? "This gist has been removed from your favorites"
          : "This gist has been added to your favorites",
      })
    } catch (error) {
      console.error("Error toggling favorite:", error)
      toast({
        title: "Error",
        description: "Failed to update favorite status",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleFavorite}
      disabled={isLoading}
      className={isFavorite ? "text-yellow-500 border-yellow-500 hover:text-yellow-600 hover:border-yellow-600" : ""}
    >
      <Star className={`mr-2 h-4 w-4 ${isFavorite ? "fill-yellow-500" : ""}`} />
      {isFavorite ? "Favorited" : "Favorite"}
    </Button>
  )
}

