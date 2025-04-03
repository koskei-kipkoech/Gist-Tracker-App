
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
  return await Gist.find({ user: userId }).sort({ createdAt: -1 })
}

export default async function DashboardPage() {
  const user = await getCurrentUser()
  const gists = await getGists(user._id)

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <div >
          <h1 className="ml-4 text-3xl font-bold tracking-tight">Your Gists</h1>
          <p className="ml-4 ext-muted-foreground">Manage and organize your code snippets</p>
        </div>
        <Link href="/dashboard/gists/new">
          <Button className="cursor-pointer bg-amber-900">
            <PlusIcon className=" mr-3 h-4 w-4" />
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
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {gists.map((gist) => (
            <Card key={gist._id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-medium">{gist.title}</CardTitle>
                  <Badge variant={gist.isPublic ? "default" : "secondary"}>
                    {gist.isPublic ? "Public" : "Private"}
                  </Badge>
                </div>
                <CardDescription className="line-clamp-2 h-10">
                  {gist.description || "No description provided"}
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="rounded-md bg-muted p-2">
                  <pre className="text-xs overflow-x-auto">
                    <code className="line-clamp-3">{gist.content}</code>
                  </pre>
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center">
                  <Badge variant="outline" className="mr-2">
                    {gist.language}
                  </Badge>
                </div>
                <div className="flex items-center">
                  <ClockIcon className="mr-1 h-3 w-3" />
                  {new Date(gist.createdAt).toLocaleDateString()}
                </div>
              </CardFooter>
              <CardFooter className="pt-1">
                <Link href={`/dashboard/gists/${gist._id}`} className="w-full">
                  <Button variant="outline" className="cursor-pointer bg-amber-900 w-full">
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

