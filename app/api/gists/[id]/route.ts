import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import connectDB from "@/lib/db"
import Gist from "@/lib/models/gist"
import { GistError, UnauthorizedError, NotFoundError, ValidationError } from "@/lib/errors/gist-errors"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      throw new UnauthorizedError()
    }

    await connectDB()

    const gist = await Gist.findOne({ _id: params.id, user: user._id })

    if (!gist) {
      throw new NotFoundError()
    }

    return NextResponse.json(gist, { status: 200 })
  } catch (error) {
    if (error instanceof GistError) {
      return NextResponse.json({ message: error.message }, { status: error.statusCode })
    }
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      throw new UnauthorizedError()
    }

    const body = await request.json()
    const { title, description, content, language, isPublic } = body

    if (!title || !content || !language) {
      throw new ValidationError("Missing required fields")
    }

    await connectDB()

    const gist = await Gist.findOne({ _id: params.id, user: user._id })

    if (!gist) {
      throw new NotFoundError()
    }

    gist.title = title
    gist.description = description
    gist.content = content
    gist.language = language
    gist.isPublic = isPublic

    await gist.save()

    return NextResponse.json(gist, { status: 200 })
  } catch (error) {
    if (error instanceof GistError) {
      return NextResponse.json({ message: error.message }, { status: error.statusCode })
    }
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    if (!params?.id) {
      return NextResponse.json({ message: "Invalid gist ID" }, { status: 400 })
    }

    const user = await getCurrentUser()

    if (!user) {
      throw new UnauthorizedError()
    }

    await connectDB()

    const gist = await Gist.findOne({ _id: params.id, user: user._id })

    if (!gist) {
      throw new NotFoundError()
    }

    await gist.deleteOne()

    return NextResponse.json({ message: "Gist deleted successfully" }, { status: 200 })
  } catch (error) {
    if (error instanceof GistError) {
      return NextResponse.json({ message: error.message }, { status: error.statusCode })
    }
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}

