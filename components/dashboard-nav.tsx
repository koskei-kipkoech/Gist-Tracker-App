"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { GithubIcon, HomeIcon, PlusIcon, UserIcon, LogOutIcon, MenuIcon,StarIcon } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function DashboardNav() {
  const pathname = usePathname()
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

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
    <div className="fixed top-0 left-0 right-0  z-50 flex h-16 items-center p-3 sm:p-5 border-b bg-background/95 backdrop-blur">
      <div className="cursor-pointer flex items-center gap-2 font-sans font-extrabold text-amber-800 mr-2 sm:mr-6">
        <GithubIcon className="h-5 w-5" />
        <span className="hidden sm:inline">Gist Tracker</span>
      </div>
      
      {/* Mobile Menu */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild className="lg:hidden">
          <Button variant="ghost" size="icon" className="text-orange-600 mr-2">
            <MenuIcon className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[240px] sm:w-[280px]">
          <nav className="flex flex-col space-y-4 mt-6">
            <Link href="/dashboard" onClick={() => setIsOpen(false)}>
              <Button
                variant="ghost"
                className={`w-full justify-start ${pathname === "/dashboard" ? "bg-amber-700 cursor-pointer hover:bg-amber-900" : ""}`}
              >
                <HomeIcon className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
            </Link>
            <Link href="/dashboard/gists/new" onClick={() => setIsOpen(false)}>
              <Button
                variant="ghost"
                className={`w-full justify-start ${pathname === "/dashboard/gists/new" ? "bg-amber-700 cursor-pointer hover:bg-amber-900" : ""}`}
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                New Gist
              </Button>
            </Link>
            <Link href="/dashboard/favorites" onClick={() => setIsOpen(false)}>
              <Button
                variant="ghost"
                className={`w-full justify-start ${pathname === "/dashboard/favorites" ? "bg-amber-700 cursor-pointer hover:bg-amber-900" : ""}`}
              >
                <StarIcon className="h-4 w-4 mr-2" />
                Favorites
              </Button>
            </Link>
            <Link href="/dashboard/profile" onClick={() => setIsOpen(false)}>
              <Button
                variant="ghost"
                className={`w-full justify-start ${pathname === "/dashboard/profile" ? "bg-amber-700 cursor-pointer hover:bg-amber-900" : ""}`}
              >
                <UserIcon className="h-4 w-4 mr-2" />
                Profile
              </Button>
            </Link>
          </nav>
        </SheetContent>
      </Sheet>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center space-x-4 lg:space-x-6 mx-6">
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
          href="/dashboard/favorites"
          className={`cursor-pointer text-sm font-medium transition-colors hover:text-primary ${
            pathname === "/dashboard/favorites" ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <Button variant="ghost" className={`cursor-pointer h-8 w-8 p-0 lg:h-9 lg:w-fit lg:px-3 ${pathname === "/dashboard/favorites" ? "bg-amber-700 hover:bg-amber-900 transform hover:scale-105 hover:shadow-md transition-all duration-200" : ""}`}>
            <StarIcon className="h-4 w-4 lg:mr-2" />
            <span className="hidden lg:inline-block">Favorites</span>
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
      <div className="ml-auto flex items-center gap-2 sm:gap-4">
        <Button 
          variant="outline" 
          className="cursor-pointer bg-gray-500 hover:bg-gray-600 transform hover:scale-105 hover:shadow-md transition-all duration-200" 
          size="sm" 
          onClick={handleLogout}
          disabled={isLoggingOut}
        >
          <LogOutIcon className="h-4 w-4 sm:mr-2" />
          <span className="hidden sm:inline">{isLoggingOut ? "Logging out..." : "Logout"}</span>
        </Button>
      </div>
    </div>
  )
}

