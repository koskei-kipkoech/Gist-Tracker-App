
"use client"

import { useState, useMemo, useEffect } from "react"
import { useUser } from "@/lib/client-auth"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PlusIcon, CodeIcon, ClockIcon } from "lucide-react"
import NewGistButton from "./components/new-gist-button"
import ViewGistButton from "./components/view-gist-button"
import FilterSection from "./components/filter-section"

export default function DashboardPage() {
  const { user, loading } = useUser()
  interface Gist {
    _id: string
    title: string
    description: string
    content: string
    language: string
    isPublic: boolean
    createdAt: string
    user: {
      _id: string
      name: string
    }
  }

  const [gists, setGists] = useState<Gist[]>([])
  const [filters, setFilters] = useState({
    search: "",
    language: null as string | null,
    visibility: "all" as "all" | "public" | "private",
  })

  useEffect(() => {
    if (user?._id) {
      // Fetch all public gists and the user's own gists
      fetch('/api/gists')
        .then(res => res.json())
        .then(setGists)
        .catch(console.error)
    }
  }, [user?._id])

  const languages = useMemo(() => Array.from(new Set(gists.map((gist) => gist.language))), [gists])

  const filteredGists = useMemo(() => {
    return gists.filter((gist) => {
      const matchesSearch = filters.search
        ? gist.title?.toLowerCase().includes(filters.search.toLowerCase()) ||
          gist.content?.toLowerCase().includes(filters.search.toLowerCase()) ||
          gist.description?.toLowerCase().includes(filters.search.toLowerCase())
        : true

      const matchesLanguage = filters.language ? gist.language === filters.language : true

      const matchesVisibility =
        filters.visibility === "all" ? true : gist.isPublic === (filters.visibility === "public")

      return matchesSearch && matchesLanguage && matchesVisibility
    })
  }, [gists, filters])

  const handleFilterChange = (newFilters: {
    search: string
    language: string | null
    visibility: "all" | "public" | "private"
  }) => {
    setFilters(newFilters)
  }

  return (
    <div className="container mt-15 p-4 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl sm:text-3xl  font-extrabold mb-3 text-amber-800 tracking-tight">Explore Gists</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Discover and manage code snippets from all users</p>
        </div>
        <div className="w-full sm:w-auto">
          <NewGistButton />
        </div>
      </div>

      <FilterSection languages={languages} onFilterChange={handleFilterChange} />

      {loading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="rounded-full bg-muted p-3">
            <CodeIcon className="h-6 w-6 animate-spin" />
          </div>
          <h2 className="mt-4 text-lg font-semibold">Loading gists...</h2>
        </div>
      ) : filteredGists.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="rounded-full bg-muted p-3">
            <CodeIcon className="h-6 w-6" />
          </div>
          <h2 className="mt-4 text-lg font-semibold">No gists found</h2>
          <p className="mt-2 text-center text-muted-foreground">
            No gists match your current filters. Try adjusting your search criteria or create your own gist.
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
          {filteredGists.map((gist) => (
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
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="cursor-pointer bg-teal-600">
                    {gist.language}
                  </Badge>
                  <span className="text-gray-400 cursor-pointer">By {gist.user.name}</span>
                </div>
                <div className="flex items-center">
                  <ClockIcon className=" text-blue-400 mr-1 h-3 w-3" />
                  {new Date(gist.createdAt).toLocaleDateString()}
                </div>
              </CardFooter>
              <CardFooter className="mt-auto pt-1">
                <div className="w-full flex flex-col sm:flex-row gap-2">
                  <div className="flex-1">
                    <ViewGistButton gistId={gist._id.toString()} />
                  </div>
                  {gist.user._id === user?._id && (
                    <Link href={`/dashboard/gists/${gist._id}/edit`} className="flex-1">
                      <Button variant="outline" className="w-full cursor-pointer bg-amber-700 hover:bg-amber-900 transform hover:scale-105 hover:shadow-md transition-all duration-200">
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

