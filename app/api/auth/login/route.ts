import { type NextRequest, NextResponse } from "next/server"
import { authenticateUser, generateToken, setAuthCookie } from "@/lib/server-auth"
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
  } catch (error: unknown) {
    console.error('Login error:', error)

    if (error instanceof ValidationError || error instanceof AuthError) {
      return NextResponse.json({ message: error.message }, { status: error.statusCode })
    }

    if (typeof error === 'object' && error !== null && 'name' in error) {
      if (error.name === 'MongooseError' || error.name === 'MongoError') {
        return NextResponse.json(
          { message: "Database connection error. Please try again later." },
          { status: 503 }
        )
      }
    }

    return NextResponse.json(
      { message: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    )
  }
}

