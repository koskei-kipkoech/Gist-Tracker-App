import { GithubIcon } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <GithubIcon className="h-10 w-10 animate-spin text-primary" />
        <p className="text-lg font-medium text-muted-foreground">Loading...</p>
      </div>
    </div>
  )
}