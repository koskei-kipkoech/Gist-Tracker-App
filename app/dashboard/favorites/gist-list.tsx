"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ClockIcon } from "lucide-react"
import LoadingButton from "../components/loading-button"
import FilterSection from "../components/filter-section"

type Gist = {
  _id: string
  title: string
  description: string
  content: string
  language: string
  isPublic: boolean
  createdAt: string
  user: {
    name: string
  }
}

type GistListProps = {
  gists: Gist[]
}

export default function FavoriteGistList({ gists }: GistListProps) {
  const [filters, setFilters] = useState({
    search: "",
    language: null as string | null,
    visibility: "all" as "all" | "public" | "private",
  })

  // Memoize languages to prevent unnecessary recalculations
  const languages = useMemo(() => Array.from(new Set(gists.map((gist) => gist.language))), [gists])

  // Memoize filtered gists
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
    <>
      <FilterSection languages={languages} onFilterChange={handleFilterChange} />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredGists.map((gist) => (
          <Card key={gist._id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium text-amber-700">{gist.title}</CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-blue-400 text-black cursor-pointer">
                    By {gist.user.name}
                  </Badge>
                  <Badge variant={gist.isPublic ? "default" : "secondary"} className="bg-teal-500 cursor-pointer">
                    {gist.isPublic ? "Public" : "Private"}
                  </Badge>
                </div>
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
              <LoadingButton href={`/dashboard/gists/${gist._id}`} className="bg-amber-700 cursor-pointer w-full">
                View Gist
              </LoadingButton>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  )
}

