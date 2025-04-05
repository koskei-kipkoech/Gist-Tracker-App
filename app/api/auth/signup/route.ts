import { type NextRequest, NextResponse } from "next/server"
import { createUser } from "@/lib/auth"
import { AuthError, ValidationError, DatabaseError } from "@/lib/errors"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, password, githubUsername } = body

    if (!name || !email || !password) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    const user = await createUser({
      name,
      email,
      password,
      githubUsername: githubUsername || undefined,
    })

    return NextResponse.json({ message: "User created successfully", userId: user._id }, { status: 201 })
  } catch (error: unknown) {
    console.error('Signup error:', error)

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

    if (error instanceof DatabaseError) {
      return NextResponse.json(
        { message: "Database error occurred. Please try again later." },
        { status: error.statusCode }
      )
    }

    return NextResponse.json(
      { message: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    )
  }
}

