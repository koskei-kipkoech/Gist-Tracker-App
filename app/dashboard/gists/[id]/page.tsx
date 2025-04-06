import { notFound } from "next/navigation"
import Link from "next/link"
import { getCurrentUser } from "@/lib/server-auth"
import connectDB from "@/lib/db"
import Gist from "@/lib/models/gist"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Pencil, Clock} from "lucide-react"
import DeleteGistButton from "./delete-button"
import FavoriteButton from "@/components/favorite-button"
import CommentsSection from "@/components/comments-section"
import BackToDashboardButton from "../../components/back-to-dashboard-button"

async function getGist(id: string) {
  await connectDB()
  const gist = await Gist.findById(id).populate('user', 'name')

  if (!gist) {
    notFound()
  }

  return gist
}

export default async function GistPage({ params }: { params: { id: string } }) {
  const user = await getCurrentUser()
  if (!user) {
    notFound()
  }
  
  const { id } = params
  const gist = await getGist(id)

  return (
    <div className="container mt-15 px-4 sm:px-5 py-4 sm:py-5">
      <div className="mb-4 sm:mb-6 flex items-center">
        <BackToDashboardButton />
      </div>

      <div className="grid gap-4 sm:gap-6">
        <Card className="overflow-hidden">
          <CardHeader className="px-4 sm:px-6">
            <div className="flex flex-col gap-3 sm:gap-4 relative">
              <span  className="absolute top-0 right-0 text-black cursor-pointer text-extrabold bg-blue-400 p-2 rounded-md"> By {gist.user.name} </span>
              <div className="space-y-2 mt-6">
                <CardTitle className="text-xl sm:text-2xl font-bold text-amber-800 break-words">{gist.title}</CardTitle>
                <CardDescription className="text-sm sm:text-base">{gist.description || "No description provided"}</CardDescription>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant={gist.isPublic ? "default" : "secondary"} className="cursor-pointer bg-teal-500 hover:bg-amber-900 hover:scale-105 transition-all duration-200">{gist.isPublic ? "Public" : "Private"}</Badge>
                <Badge variant="outline" className="cursor-pointer bg-teal-500 hover:bg-blue-500 hover:text-white hover:scale-105 transition-all duration-200">{gist.language}</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <div className="bg-gray-500 rounded-md bg-muted p-3 sm:p-4">
              <pre className="overflow-x-auto overflow-y-hidden text-sm sm:text-base">
                <code className="whitespace-pre-wrap break-words block">{gist.content}</code>
              </pre>
            </div>
            <div className="mt-4 text-xs sm:text-sm text-muted-foreground space-y-2">
              <div className="flex items-center">
                <Clock className="text-blue-500 mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                Created: {new Date(gist.createdAt).toLocaleString()}
              </div>
              {gist.updatedAt > gist.createdAt && (
                <div className="flex items-center">
                  <Clock className="text-blue-500 mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                  Updated: {new Date(gist.updatedAt).toLocaleString()}
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="px-4 sm:px-6 flex justify-between">
            {gist.user._id.toString() === user._id.toString() && (
              <div className="flex gap-2 w-full sm:w-auto">
                <Link href={`/dashboard/gists/${gist._id}/edit`} className="flex-1 sm:flex-none">
                  <Button variant="outline" className="w-full cursor-pointer bg-orange-400 hover:bg-orange-500 transform hover:scale-105 hover:shadow-md transition-all duration-200" size="sm">
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                </Link>
                <div className="flex-1 sm:flex-none">
                  <DeleteGistButton id={gist._id.toString()} />
                </div>
              </div>
            )}
            <FavoriteButton gistId={gist._id.toString()} />
          </CardFooter>
        </Card>
        <CommentsSection gistId={gist._id.toString()} />
      </div>
    </div>
  )
}

