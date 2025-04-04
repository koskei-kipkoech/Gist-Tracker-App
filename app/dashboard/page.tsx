
import { getCurrentUser } from "@/lib/auth"
import connectDB from "@/lib/db"
import Gist from "@/lib/models/gist"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PlusIcon, CodeIcon, ClockIcon } from "lucide-react"

async function getGists(userId: string) {
  await connectDB()
  // Fetch both user's gists and public gists from other users
  return await Gist.find({
    $or: [
      { user: userId },
      { isPublic: true }
    ]
  }).sort({ createdAt: -1 })
}

export default async function DashboardPage() {
  const user = await getCurrentUser()
  const gists = await getGists(user._id)

  return (
    <div className="container p-4 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Your Gists</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Manage and organize your code snippets</p>
        </div>
        <Link href="/dashboard/gists/new" className="w-full sm:w-auto">
          <Button className="w-full sm:w-auto cursor-pointer bg-amber-700 hover:bg-amber-900 transform hover:scale-105 hover:shadow-md transition-all duration-200">
            <PlusIcon className="mr-3 h-4 w-4"/>
            New Gist
          </Button>
        </Link>
      </div>

      {gists.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="rounded-full bg-muted p-3">
            <CodeIcon className="h-6 w-6" />
          </div>
          <h2 className="mt-4 text-lg font-semibold">No gists found</h2>
          <p className="mt-2 text-center text-muted-foreground">
            You haven&apos;t created any gists yet. Create your first gist to get started.
          </p>
          <Link href="/dashboard/gists/new" className="mt-4">
            <Button>
              <PlusIcon className="mr-2 h-4 w-4" />
              Create your first gist
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {gists.map((gist) => (
            <Card key={gist._id} className="flex flex-col">
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <CardTitle className="text-base sm:text-lg text-amber-800 font-bold break-words">{gist.title}</CardTitle>
                  <Badge className="self-start sm:self-center cursor-pointer bg-teal-600" variant={gist.isPublic ? "default" : "secondary"}>
                    {gist.isPublic ? "Public" : "Private"}
                  </Badge>
                </div>
                <CardDescription className="line-clamp-2 text-sm mt-2">
                  {gist.description || "No description provided"}
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="rounded-md bg-gray-500 bg-muted p-2">
                  <pre className="text-xs overflow-x-auto">
                    <code className="line-clamp-3">{gist.content}</code>
                  </pre>
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center">
                  <Badge variant="outline" className="mr-2 cursor-pointer bg-teal-600">
                    {gist.language}
                  </Badge>
                </div>
                <div className="flex items-center">
                  <ClockIcon className=" text-blue-400 mr-1 h-3 w-3" />
                  {new Date(gist.createdAt).toLocaleDateString()}
                </div>
              </CardFooter>
              <CardFooter className="mt-auto pt-1">
                <div className="w-full flex flex-col sm:flex-row gap-2">
                  <Link href={`/dashboard/gists/${gist._id}`} className="flex-1">
                    <Button variant="outline" className="w-full cursor-pointer bg-amber-700 hover:bg-amber-900 transform hover:scale-105 hover:shadow-md transition-all duration-200">
                      View Gist
                    </Button>
                  </Link>
                  {gist.user === user._id && (
                    <Link href={`/dashboard/gists/${gist._id}/edit`} className="flex-1">
                      <Button variant="outline" className="w-full cursor-pointer bg-orange-400 hover:bg-orange-500 transform hover:scale-105 hover:shadow-md transition-all duration-200">
                        Edit Gist
                      </Button>
                    </Link>
                  )}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

