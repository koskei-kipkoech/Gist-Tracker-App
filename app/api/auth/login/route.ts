import { type NextRequest, NextResponse } from "next/server"
import { authenticateUser, generateToken, setAuthCookie } from "@/lib/auth"
import { AuthError, ValidationError } from "@/lib/errors"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      throw new ValidationError("Email and password are required")
    }

    const user = await authenticateUser(email, password)
    const token = generateToken(user)

    // Set the auth cookie
    await setAuthCookie(token)

    return NextResponse.json({ message: "Login successful" }, { status: 200 })
  } catch (error) {
    if (error instanceof ValidationError || error instanceof AuthError) {
      return NextResponse.json({ message: error.message }, { status: error.statusCode })
    }
    return NextResponse.json({ message: "Authentication failed" }, { status: 401 })
  }
}

