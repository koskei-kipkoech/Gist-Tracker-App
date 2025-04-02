import { type NextRequest, NextResponse } from "next/server"
import { removeAuthCookie } from "@/lib/auth"

export async function POST(request: NextRequest) {
  removeAuthCookie()

  return NextResponse.json({ message: "Logged out successfully" }, { status: 200 })
}

