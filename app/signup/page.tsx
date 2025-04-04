"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { GithubIcon, Loader2 } from "lucide-react"
import { AuthError } from "@/lib/errors"

const signupSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  githubUsername: z.string().optional(),
})

type SignupValues = z.infer<typeof signupSchema>

export default function SignupPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isNavigating, setIsNavigating] = useState(false)  // Add this new state
  const [error, setError] = useState<string | null>(null)

  const form = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      githubUsername: "",
    },
  })

  async function onSubmit(data: SignupValues) {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || "Something went wrong")
      }

      router.push("/login?success=Account created successfully")
    } catch (err) {
      if (err instanceof AuthError) {
        setError(err.message)
      } else {
        setError("An error occurred during signup")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleBackClick = () => {
    setIsNavigating(true)
    router.push('/')
  }

  // Add this new state near the top with other state declarations
  const [isGithubLoading, setIsGithubLoading] = useState(false)

  // Add this new function before the return statement
  const handleGithubSignup = () => {
    if (window.confirm("You are about to be redirected to GitHub's website for signup. Do you want to continue?")) {
      setIsGithubLoading(true)
      window.location.href = "https://gist.github.com/"
    }
  }

  return (
    <div className="container flex h-screen p-8 w-screen flex-col items-center justify-center">
      <div onClick={handleBackClick}>
        <Button 
          className="absolute cursor-pointer transform hover:scale-105 hover:shadow-md duration-200 bg-blue-500 left-6 top-5 md:left-8 md:top-8 hover:bg-blue-600" 
          variant="ghost"
          disabled={isNavigating}
        >
          {isNavigating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading...
            </>
          ) : (
            "← Back"
          )}
        </Button>
      </div>
      <Card className="w-full  max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl cursor-pointer text-amber-800 font-extrabold">Sign Up</CardTitle>
          <CardDescription>Create an account to manage your GitHub gists</CardDescription>
        </CardHeader>
        <CardContent>
          {error && <div className="mb-4 rounded-md bg-destructive/15 p-3 text-sm text-destructive">{error}</div>}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Kipkoech" className="mt-2" {...field} />
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
                      <Input type="email" className="mt-2" placeholder="kipkoech@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" className="mt-2" placeholder="***********" {...field} />
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
                    <FormLabel>GitHub Username (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="kip_kipp" className="mt-2" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button variant="outline" type="submit" className="cursor-pointer mt-10 w-full  bg-amber-950 hover:bg-amber-800 transform hover:scale-105 hover:shadow-md  duration-200" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create account"
                )}
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm ">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Login
            </Link>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            variant="outline" 
            className="cursor-pointer bg-amber-950 transform hover:scale-105 hover:shadow-md duration-200 w-full" 
            disabled={isGithubLoading}
            onClick={handleGithubSignup}
          >
            <GithubIcon className="mr-2 h-4 w-4" />
            {isGithubLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Redirecting to GitHub...
              </>
            ) : (
              "Sign up with GitHub"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

