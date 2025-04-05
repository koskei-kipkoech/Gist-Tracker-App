import Link from "next/link"
import { getCurrentUser } from "@/lib/auth"
import connectDB from "@/lib/db"
import Favorite from "@/lib/models/favorite"
import Gist from "@/lib/models/gist"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, ClockIcon } from "lucide-react"

async function getFavoriteGists(userId: string) {
  await connectDB()

  // Find all favorites for the user and populate the gist data
  const favorites = await Favorite.find({ user: userId })
    .populate({
      path: "gist",
      model: Gist,
    })
    .sort({ createdAt: -1 })

  // Extract the gist data from the favorites
  return favorites.map((favorite) => favorite.gist)
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
            <Star className="h-6 w-6" />
          </div>
          <h2 className="mt-4 text-lg font-semibold">No favorites found</h2>
          <p className="mt-2 text-center text-muted-foreground">
            You haven&apos;t added any gists to your favorites yet.
          </p>
          <Link href="/dashboard" className="mt-4">
            <Button>Browse your gists</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {gists.map((gist) => (
            <Card key={gist._id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-medium text-amber-700">{gist.title}</CardTitle>
                  <Badge variant={gist.isPublic ? "default" : "secondary"} className="bg-teal-500 cursor-pointer">
                    {gist.isPublic ? "Public" : "Private"}
                  </Badge>
                </div>
                <CardDescription className="line-clamp-2 h-10">
                  {gist.description || "No description provided"}
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="bg-gray-500 rounded-md bg-muted p-2">
                  <pre className="text-xs overflow-x-auto">
                    <code className="line-clamp-3">{gist.content}</code>
                  </pre>
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center">
                  <Badge variant="outline" className="bg-teal-500 cursor-pointer mr-2">
                    {gist.language}
                  </Badge>
                </div>
                <div className="flex items-center">
                  <ClockIcon className="mr-1 h-3 w-3" />
                  {new Date(gist.createdAt).toLocaleDateString()}
                </div>
              </CardFooter>
              <CardFooter className="pt-1">
                <Link href={`/dashboard/gists/${gist._id}`} className="  w-full">
                  <Button variant="outline" className="bg-amber-700 cursor-pointer w-full">
                    View Gist
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

