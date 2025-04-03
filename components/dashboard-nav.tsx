"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { GithubIcon, HomeIcon, PlusIcon, UserIcon, LogOutIcon } from "lucide-react"

export function DashboardNav() {
  const pathname = usePathname()

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    })
    window.location.href = "/"
  }

  return (
    <div className="flex h-16 items-center px-4 border-b bg-background/95 backdrop-blur">
      <div className="cursor-pointer flex items-center gap-2 font-bold mr-4">
        <GithubIcon className="h-5 w-5" />
        <span>Gist Tracker</span>
      </div>
      <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
        <Link
          href="/dashboard"
          className={`cursor-pointer text-sm font-medium transition-colors hover:text-primary ${
            pathname === "/dashboard" ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <Button variant="ghost" className="cursor-pointer h-8 w-8 p-0 lg:h-9 lg:w-fit lg:px-3">
            <HomeIcon className="h-4 w-4 lg:mr-2" />
            <span className="hidden lg:inline-block">Dashboard</span>
          </Button>
        </Link>
        <Link
          href="/dashboard/gists/new"
          className={` cursor-pointer text-sm font-medium transition-colors hover:text-primary ${
            pathname === "/dashboard/gists/new" ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <Button variant="ghost" className=" cursor-pointer h-8 w-8 p-0 lg:h-9 lg:w-fit lg:px-3">
            <PlusIcon className="h-4 w-4 lg:mr-2" />
            <span className="hidden lg:inline-block">New Gist</span>
          </Button>
        </Link>
        <Link
          href="/dashboard/profile"
          className={`cursor-pointer text-sm font-medium transition-colors hover:text-primary ${
            pathname === "/dashboard/profile" ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <Button variant="ghost" className="cursor-pointer h-8 w-8 p-0 lg:h-9 lg:w-fit lg:px-3">
            <UserIcon className="h-4 w-4 lg:mr-2" />
            <span className="hidden lg:inline-block">Profile</span>
          </Button>
        </Link>
      </nav>
      <div className="ml-auto flex items-center gap-4">
        
        <Button variant="outline" className="cursor-pointer mr-5 bg-gray-500" size="sm" onClick={handleLogout}>
          <LogOutIcon className="h-4 w-4 mr-2 cursor-pointer bg-gray-500" />
          Logout
        </Button>
      </div>
    </div>
  )
}

