"use client"

import { useState, useEffect, useCallback } from "react"
import { debounce } from "lodash-es"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, X } from "lucide-react"

type FilterProps = {
  onFilterChange: (filters: {
    search: string
    language: string | null
    visibility: "all" | "public" | "private"
  }) => void
  languages: string[]
}

export default function FilterSection({ onFilterChange, languages }: FilterProps) {
  const [search, setSearch] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null)
  const [visibility, setVisibility] = useState<"all" | "public" | "private">("all")

  // Debounce filter changes to prevent excessive updates
  const debouncedOnFilterChange = useCallback(
    debounce((filters: { search: string; language: string | null; visibility: "all" | "public" | "private" }) => {
      onFilterChange(filters)
    }, 300),
    [onFilterChange]
  )

  // Use useEffect with proper dependency handling
  useEffect(() => {
    const filters = {
      search,
      language: selectedLanguage,
      visibility,
    }
    debouncedOnFilterChange(filters)

    return () => {
      debouncedOnFilterChange.cancel()
    }
  }, [search, selectedLanguage, visibility, debouncedOnFilterChange])

  const handleSearchChange = (value: string) => {
    setSearch(value)
  }

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(selectedLanguage === language ? null : language)
  }

  const handleVisibilityChange = (newVisibility: "all" | "public" | "private") => {
    setVisibility(newVisibility)
  }

  return (
    <div className="mb-6 space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search gists..."
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        <div className="flex gap-2">
          {["all", "public", "private"].map((option) => (
            <Badge
              key={option}
              variant={visibility === option ? "default" : "outline"}
              className={`cursor-pointer ${visibility === option ? "bg-amber-700" : "hover:bg-amber-700/20"}`}
              onClick={() => handleVisibilityChange(option as "all" | "public" | "private")}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </Badge>
          ))}
        </div>
        <div className="h-6 w-px bg-border" />
        <div className="flex flex-wrap gap-2">
          {languages.map((language) => (
            <Badge
              key={language}
              variant={selectedLanguage === language ? "default" : "outline"}
              className={`cursor-pointer ${selectedLanguage === language ? "bg-teal-500" : "hover:bg-teal-500/20"}`}
              onClick={() => handleLanguageSelect(language)}
            >
              {language}
              {selectedLanguage === language && (
                <X
                  className="ml-1 h-3 w-3"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleLanguageSelect(language)
                  }}
                />
              )}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}

