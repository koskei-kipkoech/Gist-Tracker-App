import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import connectDB from "@/lib/db"
import Favorite from "@/lib/models/favorite"

// Add a gist to favorites
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    // Check if already favorited
    const existingFavorite = await Favorite.findOne({
      user: user._id,
      gist: params.id,
    })

    if (existingFavorite) {
      return NextResponse.json({ message: "Gist already in favorites" }, { status: 400 })
    }

    // Create new favorite
    const favorite = new Favorite({
      user: user._id,
      gist: params.id,
    })

    await favorite.save()

    return NextResponse.json({ message: "Added to favorites" }, { status: 201 })
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 })
    }
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}

// Remove a gist from favorites
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    const result = await Favorite.findOneAndDelete({
      user: user._id,
      gist: params.id,
    })

    if (!result) {
      return NextResponse.json({ message: "Favorite not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Removed from favorites" }, { status: 200 })
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 })
    }
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}

// Check if a gist is favorited
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    const favorite = await Favorite.findOne({
      user: user._id,
      gist: params.id,
    })

    return NextResponse.json({ isFavorite: !!favorite }, { status: 200 })
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 })
    }
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}

