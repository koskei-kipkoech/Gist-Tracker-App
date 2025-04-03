import { notFound } from "next/navigation"
import Link from "next/link"
import { getCurrentUser } from "@/lib/auth"
import connectDB from "@/lib/db"
import Gist from "@/lib/models/gist"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Pencil, Clock, ArrowLeft } from "lucide-react"
import DeleteGistButton from "./delete-button"

async function getGist(id: string, userId: string) {
  await connectDB()
  const gist = await Gist.findOne({ _id: id, user: userId })

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
  const gist = await getGist(id, user._id)

  return (
    <div className="container py-8">
      <div className="mb-6 flex items-center">
        <Link href="/dashboard" >
          <Button variant="outline" className="ml-3 cursor-pointer bg-blue-500 hover:bg-blue-600 transform hover:scale-105 hover:shadow-md transition-all duration-200" size="sm">
            <ArrowLeft className="bmr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <div className="m-3 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <CardTitle className="text-2xl">{gist.title}</CardTitle>
                <CardDescription className="mt-2">{gist.description || "No description provided"}</CardDescription>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant={gist.isPublic ? "default" : "secondary"} className="cursor-pointer bg-teal-500 hover:bg-amber-900 hover:scale-105 transition-all duration-200">{gist.isPublic ? "Public" : "Private"}</Badge>
                <Badge variant="outline" className="cursor-pointer bg-teal-500  hover:bg-blue-500 hover:text-white hover:scale-105 transition-all duration-200">{gist.language}</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-500 rounded-md bg-muted p-4">
              <pre className="overflow-x-auto">
                <code>{gist.content}</code>
              </pre>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Clock className="mr-1 h-4 w-4" />
                Created: {new Date(gist.createdAt).toLocaleString()}
              </div>
              {gist.updatedAt > gist.createdAt && (
                <div className="flex items-center mt-1">
                  <Clock className="mr-1 h-4 w-4" />
                  Updated: {new Date(gist.updatedAt).toLocaleString()}
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="flex gap-2">
              <Link href={`/dashboard/gists/${gist._id}/edit`}>
                <Button variant="outline" className="cursor-pointer bg-orange-400 hover:bg-orange-500 transform hover:scale-105 hover:shadow-md transition-all duration-200" size="sm">
                  <Pencil className=" mr-2 h-4 w-4" />
                  Edit
                </Button>
              </Link>
              <DeleteGistButton id={gist._id.toString()} />
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

