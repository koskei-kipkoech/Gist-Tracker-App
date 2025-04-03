"use client"

import { useState, useEffect } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Loader2 } from "lucide-react"
import { User, ApiError } from "@/types/user"

const profileSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }).optional(),
  githubUsername: z.string().optional(),
  bio: z.string().max(200, { message: "Bio must be less than 200 characters" }).optional(),
})

type ProfileValues = z.infer<typeof profileSchema>

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const form = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      email: "",
      githubUsername: "",
      bio: "",
    },
  })

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await fetch("/api/profile")

        if (!response.ok) {
          throw new Error("Failed to fetch profile")
        }

        const data = await response.json()
        setUser(data)

        form.reset({
          name: data.name || "",
          email: data.email || "",
          githubUsername: data.githubUsername || "",
          bio: data.bio || "",
        })
      } catch (error) {
        const apiError = error as ApiError
        setError(apiError.message || "An error occurred while fetching your profile")
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfile()
  }, [form])

  async function onSubmit(data: ProfileValues) {
    setIsSaving(true)
    setError(null)
    setSuccess(null)

    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || "Failed to update profile")
      }

      setSuccess("Profile updated successfully")
      // Ensure all required fields are present when updating user state
      setUser({
        ...user,
        name: data.name,
        email: user?.email || "", // Preserve the existing email since it's required
        githubUsername: data.githubUsername,
        bio: data.bio
      })
    } catch (error) {
      const apiError = error as ApiError
      setError(apiError.message || "An error occurred while updating your profile")
    } finally {
      setIsSaving(false)
    }
  }

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  if (isLoading) {
    return (
      <div className="container py-8 flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 text-3xl font-bold tracking-tight">Your Profile</h1>

        {error && <div className="mb-4 rounded-md bg-destructive/15 p-3 text-sm text-destructive">{error}</div>}

        {success && (
          <div className="mb-4 rounded-md bg-green-50 p-3 text-sm text-green-800 dark:bg-green-900/20 dark:text-green-400">
            {success}
          </div>
        )}

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 ring-2 ring-primary/20 transition-all duration-300 hover:scale-105 hover:ring-4 hover:ring-primary/40 hover:shadow-lg hover:shadow-primary/20 cursor-pointer bg-teal-500">
                  <AvatarImage src={`https://github.com/${user?.githubUsername || "ghost"}.png`} alt={user?.name} className="object-cover  transition-opacity duration-300 hover:opacity-90" />
                  <AvatarFallback className="bg-primary/5 text-lg font-extrabold text-black text-shadow-cyan-600 transition-colors duration-300 hover:bg-primary/10">{user?.name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="mb-2 cursor-pointer">{user?.name}</CardTitle>
                  <CardDescription className="cursor-pointer">{user?.email}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" disabled {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="githubUsername"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>GitHub Username</FormLabel>
                        <FormControl>
                          <Input placeholder="johndoe" {...field} value={field.value || ""} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us a little about yourself"
                            className="min-h-[100px]"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end gap-2">
                    <Button type="submit" variant="outline" className="cursor-pointer bg-gray-400 hover:bg-gray-600 hover:text-white hover:scale-105 transition-all duration-200" disabled={isSaving}>
                      {isSaving ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        "Save Changes"
                      )}
                    </Button>
                    <Button 
                      variant="outline" 
                      className="cursor-pointer bg-red-400 hover:bg-red-600 hover:text-white hover:scale-105 transition-all duration-200"
                      onClick={async () => {
                        if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                          try {
                            const response = await fetch('/api/profile', {
                              method: 'DELETE'
                            });
                            
                            if (response.ok) {
                              window.location.href = '/';
                            } else {
                              const result = await response.json();
                              throw new Error(result.message || 'Failed to delete account');
                            }
                          } catch (error) {
                            const apiError = error as ApiError;
                            setError(apiError.message || 'Failed to delete account');
                          }
                        }
                      }}
                    >
                      Delete Account
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

