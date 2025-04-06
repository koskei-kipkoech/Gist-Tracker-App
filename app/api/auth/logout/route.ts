import { NextResponse } from "next/server"
import { removeAuthCookie } from "@/lib/server-auth"

export async function POST() {
  try {
    await removeAuthCookie()
    return NextResponse.json({ message: "Logged out successfully" }, { status: 200 })
  } catch (error) {
    console.error('Logout error:', error)
    
    return NextResponse.json(
      { message: "An error occurred during logout. Please try again." },
      { status: 500 }
    )
  }
}

