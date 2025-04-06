import { getCurrentUser } from "@/lib/server-auth"
import connectDB from "@/lib/db"
import Favorite from "@/lib/models/favorite"
import Gist from "@/lib/models/gist"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import LoadingButton from "../components/loading-button"
import FavoriteGistList from "./gist-list"

// In app/dashboard/favorites/page.tsx

async function getFavoriteGists(userId: string) {
  await connectDB()

  const favorites = await Favorite.find({ user: userId })
    .populate({
      path: "gist",
      model: Gist,
      populate: {
        path: "user",
        select: "name"
      }
    })
    .sort({ createdAt: -1 })

  // Convert Mongoose documents to plain objects
  return favorites.map(favorite => {
    const gist = favorite.gist.toObject()
    gist.user = gist.user.toObject ? gist.user.toObject() : gist.user
    return gist
  })
}

export default async function FavoritesPage() {
  const user = await getCurrentUser()
  const gists = await getFavoriteGists(user._id)
  return (
    <div className="container mt-15 p-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-amber-800 cursor-pointer tracking-tight">Favorite Gists</h1>
          <p className="text-muted-foreground">Your collection of favorite code snippets</p>
        </div>
      </div>

      {gists.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="rounded-full bg-muted p-3">
            <Star className="h-6 w-6 text-amber-900" />
          </div>
          <h2 className="mt-4 text-lg font-semibold">No favorites found</h2>
          <p className="mt-2  mb-5 text-center text-muted-foreground">
            You haven&apos;t added any gists to your favorites yet.
          </p>
          <LoadingButton
            href="/dashboard"
            className="cursor-pointer bg-amber-800 hover:bg-amber-500 transform hover:scale-105 hover:shadow-md transition-all duration-200"
          >
            Browse your gists
          </LoadingButton>
        </div>
      ) : (
        <FavoriteGistList gists={gists} />
      )}
    </div>
  )
}

