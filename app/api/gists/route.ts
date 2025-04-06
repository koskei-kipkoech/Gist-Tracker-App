import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/server-auth"
import connectDB from "@/lib/db"
import Gist from "@/lib/models/gist"
import { GistError, UnauthorizedError } from "@/lib/errors/gist-errors"

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      throw new UnauthorizedError()
    }

    const body = await request.json()
    const { title, description, content, language, isPublic } = body

    if (!title || !content || !language) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    await connectDB()

    const gist = new Gist({
      title,
      description,
      content,
      language,
      isPublic,
      user: user._id,
    })

    await gist.save()

    return NextResponse.json({ message: "Gist created successfully", gistId: gist._id }, { status: 201 })
  } catch (error) {
    if (error instanceof GistError) {
      return NextResponse.json({ message: error.message }, { status: error.statusCode })
    }
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      throw new UnauthorizedError()
    }

    await connectDB()
    
    // Get query parameters
    const url = new URL(request.url)
    const userId = url.searchParams.get('userId')
    
    let query = {}
    
    if (userId) {
      // If userId is provided, return only that user's gists
      query = { user: userId }
    } else {
      // Otherwise, return all public gists and the user's own gists
      query = {
        $or: [
          { isPublic: true },
          { user: user._id }
        ]
      }
    }

    const gists = await Gist.find(query)
      .sort({ createdAt: -1 })
      .populate('user', 'name')

    return NextResponse.json(gists, { status: 200 })
  } catch (error) {
    if (error instanceof GistError) {
      return NextResponse.json({ message: error.message }, { status: error.statusCode })
    }
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}

