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
  } catch (error) {
    if (error instanceof ValidationError || error instanceof AuthError) {
      return NextResponse.json({ message: error.message }, { status: error.statusCode })
    }
    if (error instanceof DatabaseError) {
      return NextResponse.json({ message: "Database error occurred" }, { status: error.statusCode })
    }
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}

