"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, MessageSquare } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Comment {
  _id: string
  content: string
  user: {
    _id: string
    name: string
    githubUsername?: string
  }
  createdAt: string
}

interface CommentsSectionProps {
  gistId: string
}

const commentSchema = z.object({
  content: z.string().min(1, { message: "Comment cannot be empty" }).max(1000, {
    message: "Comment cannot be more than 1000 characters",
  }),
})

type CommentValues = z.infer<typeof commentSchema>

export default function CommentsSection({ gistId }: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const form = useForm<CommentValues>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: "",
    },
  })

  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await fetch(`/api/gists/${gistId}/comments`)
        if (!response.ok) {
          throw new Error("Failed to fetch comments")
        }
        const data = await response.json()
        setComments(data)
      } catch (error) {
        console.error("Error fetching comments:", error)
        toast({
          title: "Error",
          description: "Failed to load comments",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchComments()
  }, [gistId, toast])

  async function onSubmit(values: CommentValues) {
    setIsSubmitting(true)
    try {
      const response = await fetch(`/api/gists/${gistId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        throw new Error("Failed to add comment")
      }

      const newComment = await response.json()
      setComments([newComment, ...comments])
      form.reset()

      toast({
        title: "Comment added",
        description: "Your comment has been added successfully",
      })
    } catch (error) {
      console.error("Error adding comment:", error)
      toast({
        title: "Error",
        description: "Failed to add comment",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  function formatDate(dateString: string) {
    const date = new Date(dateString)
    return date.toLocaleDateString() + " at " + date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="space-y-6">
      <div className="flex text-amber-800 items-center gap-2">
        <MessageSquare className="h-5 w-5" />
        <h2 className="text-xl font-semibold">Comments</h2>
      </div>

      <Card>
        <CardContent className="p-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea placeholder="Add a comment..." className="min-h-[100px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
                <Button type="submit" className="bg-teal-800 hover:bg-teal-600" variant="outline" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Posting...
                    </>
                  ) : (
                    "Post Comment"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">No comments yet. Be the first to comment!</div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <Card key={comment._id}>
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <Avatar className="bg-teal-500 h-10 w-10">
                    <AvatarImage
                      src={
                        comment.user.githubUsername
                          ? `https://github.com/${comment.user.githubUsername}.png`
                          : undefined
                      }
                      alt={comment.user.name}
                    />
                    <AvatarFallback className="text-black font-extrabold cursor pointer">{comment.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="font-medium text-amber-600">{comment.user.name}</div>
                      <div  className="text-blue-500 text-xs text-muted-foreground">{formatDate(comment.createdAt)}</div>
                    </div>
                    <div className="mt-2 whitespace-pre-wrap">{comment.content}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

