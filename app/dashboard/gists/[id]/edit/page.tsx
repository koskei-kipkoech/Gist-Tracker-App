"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Loader2 } from "lucide-react"

interface ApiError {
  message: string;
}

const gistSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }).max(100),
  description: z.string().max(500).optional(),
  content: z.string().min(1, { message: "Content is required" }),
  language: z.string().min(1, { message: "Language is required" }),
  isPublic: z.boolean().default(true)
}) as z.ZodType<{
  title: string;
  description?: string;
  content: string;
  language: string;
  isPublic: boolean;
}>

type GistValues = z.infer<typeof gistSchema>

const languageOptions = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "csharp", label: "C#" },
  { value: "php", label: "PHP" },
  { value: "ruby", label: "Ruby" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" },
  { value: "sql", label: "SQL" },
  { value: "json", label: "JSON" },
  { value: "markdown", label: "Markdown" },
  { value: "bash", label: "Bash" },
  { value: "plaintext", label: "Plain Text" },
]

export default function EditGistPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<GistValues>({
    resolver: zodResolver(gistSchema),
    defaultValues: {
      title: "",
      description: "",
      content: "",
      language: "",
      isPublic: true,
    },
  })

  useEffect(() => {
    async function fetchGist() {
      try {
        const response = await fetch(`/api/gists/${params.id}`)

        if (!response.ok) {
          throw new Error("Failed to fetch gist")
        }

        const data = await response.json()

        form.reset({
          title: data.title,
          description: data.description || "",
          content: data.content,
          language: data.language,
          isPublic: data.isPublic,
        })
      } catch (err) {
        const error = err as ApiError;
        setError(error.message || "An error occurred while fetching the gist")
      } finally {
        setIsLoading(false)
      }
    }

    fetchGist()
  }, [form, params.id])

  async function onSubmit(data: GistValues) {
    setIsSaving(true)
    setError(null)

    try {
      const response = await fetch(`/api/gists/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || "Failed to update gist")
      }

      router.push(`/dashboard/gists/${params.id}`)
    } catch (err) {
      const error = err as ApiError;
      setError(error.message || "An error occurred while updating the gist");
      setIsSaving(false);
    }
  }

  if (isLoading) {
    return (
      <div className="container py-8 flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="mb-6 flex items-center">
        <Link href={`/dashboard/gists/${params.id}`}>
          <Button variant="outline" className="ml-3 cursor-pointer bg-blue-400 hover:bg-blue-500 hover:text-white hover:scale-105 transition-all duration-200" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Gist
          </Button>
        </Link>
      </div>

      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 text-3xl font-bold tracking-tight">Edit Gist</h1>

        {error && <div className="mb-4 rounded-md bg-destructive/15 p-3 text-sm text-destructive">{error}</div>}

        <Card>
          <CardHeader>
            <CardTitle>Edit Gist Details</CardTitle>
            <CardDescription>Update your code snippet</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="My awesome code snippet" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="A brief description of what this code does"
                          className="min-h-20"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="language"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Language</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full bg-background/50 hover:bg-accent/50 transition-colors">
                            <SelectValue placeholder="Select a language" className="text-muted-foreground" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-[300px] overflow-y-auto bg-background/95 backdrop-blur-sm border border-border/50">
                          {languageOptions.map((option) => (
                            <SelectItem 
                              key={option.value} 
                              value={option.value}
                              className="hover:bg-accent/80 cursor-pointer transition-colors py-2.5 px-3"
                            >
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Paste your code here" 
                          className="min-h-[400px] font-mono text-sm leading-relaxed tracking-wide
                            bg-zinc-950/10 dark:bg-zinc-50/10 backdrop-blur-sm
                            border border-zinc-200 dark:border-zinc-800
                            focus:border-zinc-400 dark:focus:border-zinc-600
                            focus:ring-2 focus:ring-zinc-400/20 dark:focus:ring-zinc-600/20
                            rounded-lg p-4 transition-all duration-200
                            hover:bg-zinc-950/5 dark:hover:bg-zinc-50/5"
                          spellCheck="false"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isPublic"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Public Gist</FormLabel>
                        <FormDescription>Make this gist visible to everyone</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="flex justify-end space-x-4">
                  <Button
                    className="cursor-pointer bg-gray-400  hover:bg-gray-500 hover:text-white hover:scale-105 transition-all duration-200 "
                    type="button"
                    variant="outline"
                    onClick={() => router.push(`/dashboard/gists/${params.id}`)}
                    disabled={isSaving}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSaving} className="cursor-pointer bg-red-400  hover:bg-red-500 hover:text-white hover:scale-105 transition-all duration-200">
                    {isSaving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

