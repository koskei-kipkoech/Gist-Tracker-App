"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { GithubIcon, Loader2, ArrowRight } from "lucide-react"

export default function Home() {
  const router = useRouter()
  const [isLoginLoading, setIsLoginLoading] = useState(false)
  const [isSignUpLoading, setIsSignUpLoading] = useState(false)

  const handleLogin = () => {
    setIsLoginLoading(true)
    router.push("/login")
  }

  const handleSignUp = () => {
    setIsSignUpLoading(true)
    router.push("/signup")
  }

  // Add this new state with existing states
  const [isGetStartedLoading, setIsGetStartedLoading] = useState(false)
  
  // Add this new handler function
  const handleGetStarted = () => {
    setIsGetStartedLoading(true)
    router.push('/signup')
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between px-5">
          <div className="cursor-pointer text-amber-800 flex items-center ml-5 gap-2 font-extrabold animate-pulse-scale hover:text-primary transition-colors duration-300">
            <GithubIcon className="h-5 w-5" />
            <span>Gist Tracker</span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="cursor-pointer bg-gray-500 hover:bg-primary hover:text-primary-foreground transform hover:scale-105 hover:shadow-md transition-all duration-200"
              onClick={handleLogin}
              disabled={isLoginLoading}
            >
              {isLoginLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                "Login"
              )}
            </Button>
            <Button
              variant="outline"
              className="cursor-pointer bg-gray-500 hover:bg-primary/90 hover:text-foreground transform hover:scale-105 hover:shadow-md transition-all duration-200"
              onClick={handleSignUp}
              disabled={isSignUpLoading}
            >
              {isSignUpLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full p-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Manage Your GitHub Gists
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Create, update, and track your GitHub gists in one place. Organize your code snippets efficiently.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <div onClick={handleGetStarted}>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="mt-10 cursor-pointer bg-amber-900 hover:bg-amber-600 transform hover:scale-105 hover:shadow-md transition-all duration-200 w-full flex items-center justify-center gap-2"
                    disabled={isGetStartedLoading}
                  >
                    {isGetStartedLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      <>
                        Get Started <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full p-10 md:py-26 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <div className="rounded-lg border bg-card p-6 shadow-sm transition-all duration-300 cursor-pointer hover:bg-amber-900 hover:shadow-lg hover:scale-105 hover:bg-card/80">
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-bold transition-colors hover:text-primary">Create Gists</h3>
                  <p className="text-sm text-muted-foreground transition-colors hover:text-foreground">Create and save code snippets directly from the app.</p>
                </div>
              </div>
              <div className="rounded-lg border bg-card p-6 shadow-sm transition-all hover:bg-amber-900 cursor-pointer duration-300 hover:shadow-lg hover:scale-110 hover:bg-card/80">
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-bold transition-colors hover:text-primary">Track Changes</h3>
                  <p className="text-sm text-muted-foreground transition-colors hover:text-foreground">Keep track of all your gist updates and modifications.</p>
                </div>
              </div>
              <div className="rounded-lg border bg-card p-6 shadow-sm transition-all duration-300 hover:bg-amber-900 cursor-pointer hover:shadow-lg hover:scale-105 hover:bg-card/80">
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-bold transition-colors hover:text-primary">Manage Profile</h3>
                  <p className="text-sm text-muted-foreground transition-colors hover:text-foreground">Update your profile and preferences easily.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-8 px-8 bg-gradient-to-r from-background to-muted">
        <div className="container flex flex-col items-center justify-center gap-6 md:flex-row md:justify-between md:gap-8">
          <div className="flex items-center gap-2">
            <GithubIcon className="h-5 w-5 text-muted-foreground transform hover:scale-105 hover:shadow-md  duration-200 cursor-pointer text-amber-900 hover:text-primary transition-all" />
            <span className="text-sm font-medium text-muted-foreground cursor-pointer transform hover:scale-105 hover:shadow-md transition-all duration-200 hover:text-primary text-amber-600 ">GitHub Gist Tracker</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="https://github.com" className="text-muted-foreground transform hover:scale-105 hover:shadow-md  duration-200 text-amber-600 hover:text-primary transition-all">
              <GithubIcon className="h-5 w-5" />
            </Link>
          </div>
          <p className="text-center cursor-pointer transform hover:scale-105 hover:shadow-md  duration-200 text-sm text-muted-foreground text-amber-600 hover:text-primary transition-colors">
            © {new Date().getFullYear()} Patrick Kipkoech. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}



