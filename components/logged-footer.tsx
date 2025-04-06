"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { GithubIcon, StarIcon } from "lucide-react"

export function DashboardFooter() {
  const pathname = usePathname()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-background/95 backdrop-blur relative mt-auto">
      {/* Subtle background pattern */}
      <div
        className="absolute  ml-3 p-5 inset-0 bg-grid-slate-100/[0.03] dark:bg-grid-slate-700/[0.05] pointer-events-none"
        aria-hidden="true"
      />

      <div className="container py-4 md:py-8 relative">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          <div className="space-y-3">
            <div className="flex items-center text-amber-800 cursor-pointer gap-2 font-bold transform hover:scale-105 transition-all duration-200">
              <GithubIcon className="h-5 w-5" />
              <span>Gist Tracker</span>
            </div>
            <p className="text-sm text-muted-foreground">
              A better way to manage and organize your GitHub gists in one place.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm text-amber-700 font-medium">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link 
                  href="/dashboard" 
                  className={`flex items-center text-muted-foreground hover:text-amber-700 transition-colors ${
                    pathname === "/dashboard" ? "text-amber-700 font-medium" : ""
                  }`}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/favorites"
                  className={`flex items-center text-muted-foreground hover:text-amber-700 transition-colors ${
                    pathname === "/dashboard/favorites" ? "text-amber-700 font-medium" : ""
                  }`}
                >
                  <StarIcon className="h-3 w-3 mr-1" />
                  Favorites
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/gists/new"
                  className={`text-muted-foreground hover:text-amber-700 transition-colors ${
                    pathname === "/dashboard/gists/new" ? "text-amber-700 font-medium" : ""
                  }`}
                >
                  Create New Gist
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/profile"
                  className={`text-muted-foreground hover:text-amber-700 transition-colors ${
                    pathname === "/dashboard/profile" ? "text-amber-700 font-medium" : ""
                  }`}
                >
                  Profile Settings
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm text-amber-700 font-medium">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://docs.github.com/en/rest/gists"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-amber-700 hover:underline transition-colors"
                >
                  GitHub Gist API
                </a>
              </li>
              <li>
                <a
                  href="https://gist.github.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-amber-700 hover:underline transition-colors"
                >
                  GitHub Gist
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/features"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-amber-700 hover:underline transition-colors"
                >
                  GitHub Features
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm text-amber-700 font-medium">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link 
                  href="#" 
                  className="text-muted-foreground hover:text-amber-700 hover:underline transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  href="#" 
                  className="text-muted-foreground hover:text-amber-700 hover:underline transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link 
                  href="#" 
                  className="text-muted-foreground hover:text-amber-700 hover:underline transition-colors"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6  pt-4 border-t flex flex-col sm:flex-row ml-5 items-center justify-between gap-4">
          <p className="text-center text-xs sm:text-sm text-muted-foreground">
            &copy; {currentYear} GitHub Gist Tracker. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-amber-700 transform hover:scale-110 transition-all duration-200"
            >
              <GithubIcon className=" h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}