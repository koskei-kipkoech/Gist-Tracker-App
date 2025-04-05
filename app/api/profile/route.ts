import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import connectDB from "@/lib/db"
import User from "@/lib/models/user"
import { ProfileError, UnauthorizedError } from "@/lib/errors/profile-errors"

export async function GET() {
  try {
    const user = await getCurrentUser()

    if (!user) {
      throw new UnauthorizedError()
    }

    return NextResponse.json(user, { status: 200 })
  } catch (error) {
    if (error instanceof ProfileError) {
      return NextResponse.json({ message: error.message }, { status: error.statusCode })
    }
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { name, githubUsername, bio } = body

    if (!name) {
      return NextResponse.json({ message: "Name is required" }, { status: 400 })
    }

    await connectDB()

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        name,
        githubUsername,
        bio,
      },
      { new: true },
    ).select("-password")

    return NextResponse.json(updatedUser, { status: 200 })
  } catch (error) {
    if (error instanceof ProfileError) {
      return NextResponse.json({ message: error.message }, { status: error.statusCode })
    }
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}

export async function DELETE() {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    await connectDB()
    await User.findByIdAndDelete(user._id)

    return NextResponse.json({ message: "Account deleted successfully" }, { status: 200 })
  } catch (error) {
    if (error instanceof ProfileError) {
      return NextResponse.json({ message: error.message }, { status: error.statusCode })
    }
    return NextResponse.json({ message: "Failed to delete account" }, { status: 500 })
  }
}

