import type React from "react"
import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/server-auth"
import { DashboardNav } from "@/components/dashboard-nav"
import { DashboardFooter } from "@/components/logged-footer"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardNav />
      <main className="flex-1">{children}</main>
      <DashboardFooter />
    </div>
  )
}

