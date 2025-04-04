"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { GithubIcon, HomeIcon, PlusIcon, UserIcon, LogOutIcon } from "lucide-react"

export function DashboardNav() {
  const pathname = usePathname()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      })
      window.location.href = "/"
    } catch (error) {
      console.error("Logout failed:", error)
      setIsLoggingOut(false)
    }
  }

  return (
    <div className="flex h-16 items-center p-5 border-b bg-background/95 backdrop-blur">
      <div className="cursor-pointer  flex items-center gap-2 font-sans font-extrabold text-amber-800 mr-6">
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
          <Button variant="ghost" className={`cursor-pointer h-8 w-8 p-0 lg:h-9 lg:w-fit lg:px-3 ${pathname === "/dashboard" ? "bg-amber-700 hover:bg-amber-900 transform hover:scale-105 hover:shadow-md transition-all duration-200" : ""}`}>
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
          <Button variant="ghost" className={`cursor-pointer h-8 w-8 p-0 lg:h-9 lg:w-fit lg:px-3 ${pathname === "/dashboard/gists/new" ? "bg-amber-700 hover:bg-amber-900 transform hover:scale-105 hover:shadow-md transition-all duration-200" : ""}`}>
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
          <Button variant="ghost" className={`cursor-pointer h-8 w-8 p-0 lg:h-9 lg:w-fit lg:px-3 ${pathname === "/dashboard/profile" ? "bg-amber-700 hover:bg-amber-900 transform hover:scale-105 hover:shadow-md transition-all duration-200" : ""}`}>
            <UserIcon className="h-4 w-4 lg:mr-2" />
            <span className="hidden lg:inline-block">Profile</span>
          </Button>
        </Link>
      </nav>
      <div className="ml-auto flex items-center gap-4">
        
        <Button 
          variant="outline" 
          className="cursor-pointer mr-5 bg-gray-500 hover:bg-gray-600 transform hover:scale-105 hover:shadow-md transition-all duration-200" 
          size="sm" 
          onClick={handleLogout}
          disabled={isLoggingOut}
        >
          <LogOutIcon className="h-4 w-4 mr-2" />
          {isLoggingOut ? "Logging out..." : "Logout"}
        </Button>
      </div>
    </div>
  )
}

