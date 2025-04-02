import { type NextRequest, NextResponse } from "next/server"
import { authenticateUser, generateToken, setAuthCookie } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 })
    }

    const user = await authenticateUser(email, password)
    const token = generateToken(user)

    // Set the auth cookie
    await setAuthCookie(token)

    return NextResponse.json({ message: "Login successful" }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Authentication failed" }, { status: 401 })
  }
}

