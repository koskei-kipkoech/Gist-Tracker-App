import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GithubIcon } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="cursor-pointer flex items-center ml-5 gap-2 font-bold">
            <GithubIcon className="h-5 w-5 " />
            <span>Gist Tracker</span>
          </div>
          <div className=" flex items-center gap-2">
            <Link href="/login">
              <Button variant="outline" className="cursor-pointer bg-gray-500 transition-colors hover:bg-primary hover:text-primary-foreground">Login</Button>
            </Link>
            <Link href="/signup">
              <Button variant="outline" className="cursor-pointer bg-gray-500 transition-colors hover:bg-primary/90 hover:text-foreground">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
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
                <Link href="/signup">
                  <Button size="lg" variant="outline" className="cursor-pointer w-full">
                    Get Started
                  </Button>
                </Link>
                {/* <Link href="/login">
                  <Button size="lg" variant="outline" className="w-full">
                  Get Started
                  </Button>
                </Link> */}
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <div className="rounded-lg border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-105 hover:bg-card/80">
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-bold transition-colors hover:text-primary">Create Gists</h3>
                  <p className="text-sm text-muted-foreground transition-colors hover:text-foreground">Create and save code snippets directly from the app.</p>
                </div>
              </div>
              <div className="rounded-lg border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-105 hover:bg-card/80">
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-bold transition-colors hover:text-primary">Track Changes</h3>
                  <p className="text-sm text-muted-foreground transition-colors hover:text-foreground">Keep track of all your gist updates and modifications.</p>
                </div>
              </div>
              <div className="rounded-lg border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-105 hover:bg-card/80">
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-bold transition-colors hover:text-primary">Manage Profile</h3>
                  <p className="text-sm text-muted-foreground transition-colors hover:text-foreground">Update your profile and preferences easily.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-8 bg-gradient-to-r from-background to-muted">
        <div className="container flex flex-col items-center justify-center gap-6 md:flex-row md:justify-between md:gap-8">
          <div className="flex items-center gap-2">
            <GithubIcon className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
            <span className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">GitHub Gist Tracker</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="https://github.com" className="text-muted-foreground hover:text-primary transition-colors">
              <GithubIcon className="h-5 w-5" />
            </Link>
          </div>
          <p className="text-center text-sm text-muted-foreground hover:text-primary transition-colors">
            © {new Date().getFullYear()} Patrick Kipkoech. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

